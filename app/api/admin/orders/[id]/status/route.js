import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { createClient } from "@supabase/supabase-js";

import { authOptions } from "@/app/lib/auth";
import {
  sendOrderProcessingEmail,
  sendOrderShippedEmail,
} from "@/app/lib/email/orderEmails";

const VALID_STATUSES = [
  "pending",
  "processing",
  "shipped",
  "completed",
  "cancelled",
];

export async function PATCH(request, { params }) {
  try {
    // ---------------------------------------------------------
    // 1. Verificăm dacă utilizatorul este admin
    // ---------------------------------------------------------

    const session = await getServerSession(authOptions);

    if (!session?.user?.isAdmin) {
      return NextResponse.json(
        {
          error: "Nu ai permisiunea de a modifica comenzile.",
        },
        { status: 403 },
      );
    }

    // ---------------------------------------------------------
    // 2. ID comandă
    // ---------------------------------------------------------

    const { id } = await params;
    const orderId = Number(id);

    if (!Number.isInteger(orderId)) {
      return NextResponse.json(
        {
          error: "ID-ul comenzii este invalid.",
        },
        { status: 400 },
      );
    }

    // ---------------------------------------------------------
    // 3. Datele primite
    // ---------------------------------------------------------

    const body = await request.json();

    const { status, awb } = body;

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        {
          error: "Status invalid.",
        },
        { status: 400 },
      );
    }

    const cleanAwb = typeof awb === "string" ? awb.trim() : "";

    // AWB obligatoriu pentru expediere
    if (status === "shipped" && !cleanAwb) {
      return NextResponse.json(
        {
          error: "Numărul AWB este obligatoriu pentru expediere.",
        },
        { status: 400 },
      );
    }

    // ---------------------------------------------------------
    // 4. Conectare Supabase
    // ---------------------------------------------------------

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SECRET_KEY,
    );

    // ---------------------------------------------------------
    // 5. Luăm comanda actuală
    // ---------------------------------------------------------

    const { data: currentOrder, error: currentOrderError } = await supabase
      .from("orders")
      .select(
        `
            id,
            status,
            awb,
            processing_email_sent,
            shipped_email_sent,
            customer_name,
            email,
            total
          `,
      )
      .eq("id", orderId)
      .single();

    if (currentOrderError || !currentOrder) {
      console.error("GET ORDER ERROR:", currentOrderError);

      return NextResponse.json(
        {
          error: "Comanda nu a fost găsită.",
        },
        { status: 404 },
      );
    }

    // ---------------------------------------------------------
    // 6. Dacă statusul este deja același
    // ---------------------------------------------------------

    if (
      currentOrder.status === status &&
      !(
        (status === "processing" && !currentOrder.processing_email_sent) ||
        (status === "shipped" && !currentOrder.shipped_email_sent)
      )
    ) {
      return NextResponse.json({
        success: true,
        order: {
          id: currentOrder.id,
          status: currentOrder.status,
          awb: currentOrder.awb,
        },
        emailSent: false,
      });
    }

    // ---------------------------------------------------------
    // 7. Stabilim dacă trebuie trimis email
    // ---------------------------------------------------------

    const shouldSendProcessingEmail =
      status === "processing" && !currentOrder.processing_email_sent;

    const shouldSendShippedEmail =
      status === "shipped" && !currentOrder.shipped_email_sent;

    // ---------------------------------------------------------
    // 8. Actualizăm comanda
    // ---------------------------------------------------------

    const updateData = {
      status,
    };

    // Dacă este expediată, salvăm AWB-ul
    if (status === "shipped") {
      updateData.awb = cleanAwb;
    }

    const { data, error } = await supabase
      .from("orders")
      .update(updateData)
      .eq("id", orderId)
      .select(
        `
          id,
          status,
          awb,
          processing_email_sent,
          shipped_email_sent
        `,
      )
      .single();

    if (error) {
      console.error("UPDATE ORDER STATUS ERROR:", error);

      return NextResponse.json(
        {
          error: "Statusul comenzii nu a putut fi actualizat.",
        },
        { status: 500 },
      );
    }

    // ---------------------------------------------------------
    // 9. Trimitem emailurile
    // ---------------------------------------------------------

    let emailSent = false;

    // ---------------------------------------------------------
    // EMAIL PROCESARE
    // ---------------------------------------------------------

    if (shouldSendProcessingEmail) {
      try {
        const { data: emailData, error: resendError } =
          await sendOrderProcessingEmail({
            customerName: currentOrder.customer_name,
            customerEmail: currentOrder.email,
            orderId: currentOrder.id,
            total: currentOrder.total,
          });

        if (resendError) {
          console.error("RESEND PROCESSING EMAIL ERROR:", resendError);
        } else if (emailData?.id) {
          const { error: flagError } = await supabase
            .from("orders")
            .update({ processing_email_sent: true })
            .eq("id", orderId);

          if (flagError) {
            console.error("PROCESSING EMAIL FLAG ERROR:", flagError);
          } else {
            emailSent = true;
          }
        } else {
          console.error(
            "PROCESSING EMAIL: Resend nu a returnat un ID de email.",
          );
        }
      } catch (emailError) {
        console.error("PROCESSING EMAIL ERROR:", emailError);
      }
    }

    // ---------------------------------------------------------
    // EMAIL EXPEDIERE
    // ---------------------------------------------------------

    if (shouldSendShippedEmail) {
      try {
        const { data: emailData, error: resendError } =
          await sendOrderShippedEmail({
            customerName: currentOrder.customer_name,
            customerEmail: currentOrder.email,
            orderId: currentOrder.id,
            total: currentOrder.total,
            awb: cleanAwb,
          });

        if (resendError) {
          console.error("RESEND SHIPPED EMAIL ERROR:", resendError);
        } else if (emailData?.id) {
          const { error: flagError } = await supabase
            .from("orders")
            .update({ shipped_email_sent: true })
            .eq("id", orderId);

          if (flagError) {
            console.error("SHIPPED EMAIL FLAG ERROR:", flagError);
          } else {
            emailSent = true;
          }
        } else {
          console.error("SHIPPED EMAIL: Resend nu a returnat un ID de email.");
        }
      } catch (emailError) {
        console.error("SHIPPED EMAIL ERROR:", emailError);
      }
    }
    // ---------------------------------------------------------
    // 10. Răspuns
    // ---------------------------------------------------------

    return NextResponse.json({
      success: true,
      order: data,
      emailSent,
    });
  } catch (error) {
    console.error("ORDER STATUS ERROR:", error);

    return NextResponse.json(
      {
        error: error.message || "A apărut o eroare la actualizarea statusului.",
      },
      { status: 500 },
    );
  }
}

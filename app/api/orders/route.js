import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/lib/auth";
import { products } from "@/app/data/products";

const FREE_SHIPPING_THRESHOLD = 200;
const SHIPPING_COST = 19.99;

const MAX_ITEMS = 30;
const MAX_QUANTITY = 50;

const VALID_PAYMENT_METHODS = ["ramburs"];

export async function POST(request) {
  try {
    // =========================================
    // 1. CITIRE BODY
    // =========================================

    let body;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          error: "Datele trimise nu sunt valide.",
        },
        {
          status: 400,
        },
      );
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        {
          error: "Datele comenzii sunt invalide.",
        },
        {
          status: 400,
        },
      );
    }

    const { customer, items } = body;

    // =========================================
    // 2. VALIDARE STRUCTURĂ
    // =========================================

    if (
      !customer ||
      typeof customer !== "object" ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        {
          error: "Datele comenzii sunt incomplete.",
        },
        {
          status: 400,
        },
      );
    }

    // Limităm numărul de produse dintr-o comandă
    if (items.length > MAX_ITEMS) {
      return NextResponse.json(
        {
          error: `O comandă poate conține maximum ${MAX_ITEMS} produse.`,
        },
        {
          status: 400,
        },
      );
    }

    // =========================================
    // 3. VALIDARE DATE CLIENT
    // =========================================

    const name = typeof customer.name === "string" ? customer.name.trim() : "";

    const email =
      typeof customer.email === "string"
        ? customer.email.trim().toLowerCase()
        : "";

    const phone =
      typeof customer.phone === "string" ? customer.phone.trim() : "";

    const county =
      typeof customer.county === "string" ? customer.county.trim() : "";

    const city = typeof customer.city === "string" ? customer.city.trim() : "";

    const address =
      typeof customer.address === "string" ? customer.address.trim() : "";

    const paymentMethod =
      typeof customer.paymentMethod === "string"
        ? customer.paymentMethod.trim().toLowerCase()
        : "ramburs";

    // =========================================
    // NUME
    // =========================================

    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        {
          error: "Numele trebuie să aibă între 2 și 100 de caractere.",
        },
        {
          status: 400,
        },
      );
    }

    // =========================================
    // EMAIL
    // =========================================

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.length < 5 || email.length > 254 || !emailRegex.test(email)) {
      return NextResponse.json(
        {
          error: "Adresa de email este invalidă.",
        },
        {
          status: 400,
        },
      );
    }

    // =========================================
    // TELEFON
    // =========================================

    if (phone.length < 9 || phone.length > 30) {
      return NextResponse.json(
        {
          error: "Numărul de telefon este invalid.",
        },
        {
          status: 400,
        },
      );
    }

    const phoneRegex = /^[0-9+\s()-]+$/;

    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        {
          error: "Numărul de telefon este invalid.",
        },
        {
          status: 400,
        },
      );
    }

    // =========================================
    // JUDEȚ
    // =========================================

    if (county.length < 2 || county.length > 100) {
      return NextResponse.json(
        {
          error: "Județul este invalid.",
        },
        {
          status: 400,
        },
      );
    }

    // =========================================
    // ORAȘ
    // =========================================

    if (city.length < 2 || city.length > 100) {
      return NextResponse.json(
        {
          error: "Orașul este invalid.",
        },
        {
          status: 400,
        },
      );
    }

    // =========================================
    // ADRESĂ
    // =========================================

    if (address.length < 5 || address.length > 300) {
      return NextResponse.json(
        {
          error: "Adresa trebuie să aibă între 5 și 300 de caractere.",
        },
        {
          status: 400,
        },
      );
    }

    // =========================================
    // METODĂ DE PLATĂ
    // =========================================

    if (!VALID_PAYMENT_METHODS.includes(paymentMethod)) {
      return NextResponse.json(
        {
          error: "Metoda de plată este invalidă.",
        },
        {
          status: 400,
        },
      );
    }

    // =========================================
    // 4. SESIUNE
    // =========================================

    const session = await getServerSession(authOptions);

    const userId = session?.user?.id ?? null;

    // =========================================
    // 5. SUPABASE
    // =========================================

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SECRET_KEY,
    );

    // =========================================
    // 6. VALIDARE PRODUSE
    // =========================================

    const orderItems = [];

    for (const item of items) {
      if (!item || typeof item !== "object") {
        return NextResponse.json(
          {
            error: "Unul dintre produsele comenzii este invalid.",
          },
          {
            status: 400,
          },
        );
      }

      const product = products.find((product) => product.id === item.productId);

      if (!product) {
        return NextResponse.json(
          {
            error: "Unul dintre produsele comenzii nu există.",
          },
          {
            status: 400,
          },
        );
      }

      const quantity = Number(item.quantity);

      if (
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > MAX_QUANTITY
      ) {
        return NextResponse.json(
          {
            error: `Cantitatea pentru "${product.title}" este invalidă.`,
          },
          {
            status: 400,
          },
        );
      }

      orderItems.push({
        product_id: product.id,
        product_name: product.title,
        price: product.price,
        weight: product.weight,
        quantity,
        subtotal: product.price * quantity,
      });
    }

    // =========================================
    // 7. CALCUL SUBTOTAL
    // =========================================

    const subtotal = orderItems.reduce(
      (total, item) => total + item.subtotal,
      0,
    );

    // =========================================
    // 8. CALCUL LIVRARE
    // =========================================

    const shippingCost =
      subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;

    // =========================================
    // 9. TOTAL FINAL
    // =========================================

    const total = subtotal + shippingCost;

    // =========================================
    // 10. SALVARE COMANDĂ
    // =========================================

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: userId,

        customer_name: name,
        email,
        phone,

        county,
        city,
        address,

        payment_method: paymentMethod,

        subtotal,
        shipping_cost: shippingCost,
        total,

        status: "pending",
      })
      .select()
      .single();

    if (orderError) {
      console.error("ORDER INSERT ERROR:", orderError);

      return NextResponse.json(
        {
          error: "Comanda nu a putut fi creată.",
        },
        {
          status: 500,
        },
      );
    }

    // =========================================
    // 11. SALVARE PRODUSE COMANDĂ
    // =========================================

    const itemsToInsert = orderItems.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.product_name,
      price: item.price,
      weight: item.weight,
      quantity: item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(itemsToInsert);

    if (itemsError) {
      console.error("ORDER ITEMS INSERT ERROR:", itemsError);

      // Ștergem comanda dacă produsele nu au putut fi salvate
      await supabase.from("orders").delete().eq("id", order.id);

      return NextResponse.json(
        {
          error: "Produsele comenzii nu au putut fi salvate.",
        },
        {
          status: 500,
        },
      );
    }

    // =========================================
    // 12. RĂSPUNS
    // =========================================

    return NextResponse.json({
      success: true,
      message: "Comanda a fost creată cu succes.",
      orderId: order.id,
      subtotal,
      shippingCost,
      total,
    });
  } catch (error) {
    console.error("ORDER ERROR:", error);

    return NextResponse.json(
      {
        error: "A apărut o eroare la procesarea comenzii.",
      },
      {
        status: 500,
      },
    );
  }
}

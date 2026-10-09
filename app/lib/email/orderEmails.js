import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "Mierea Casei <comenzi@miereacasei.ro>";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const LOGO_URL = `${SITE_URL}/logo-email.png`;

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function emailLayout({ title, children }) {
  return `
    <div style="
      margin:0;
      padding:40px 16px;
      background:#F8F5EE;
      font-family:Arial,Helvetica,sans-serif;
      color:#263F6A;
    ">
      <div style="
        width:100%;
        max-width:620px;
        margin:0 auto;
      ">

        <!-- BRAND -->
        <div style="
          text-align:center;
          padding:4px 0 28px;
        ">

          <!-- LOGO -->
          <img
            src="${LOGO_URL}"
            alt="Mierea Casei"
            width="150"
            style="
              display:block;
              width:150px;
              max-width:70%;
              height:auto;
              margin:0 auto;
              border:0;
              outline:none;
              text-decoration:none;
            "
          />

          <div style="
            margin-top:12px;
            font-size:13px;
            color:#7C8491;
          ">
            Din stup, cu grijă pentru tine.
          </div>

        </div>

        <!-- CARD -->
        <div style="
          background:#FFFFFF;
          border-radius:24px;
          overflow:hidden;
          border:1px solid #EDE9E1;
          box-shadow:0 8px 30px rgba(38,63,106,0.06);
        ">

          <!-- TOP ACCENT -->
          <div style="
            height:5px;
            background:#C98A24;
            font-size:0;
            line-height:0;
          ">
            &nbsp;
          </div>

          <div style="
            padding:42px 38px 38px;
          ">

            <!-- TITLE -->
            <div style="
              text-align:center;
              padding-bottom:30px;
              border-bottom:1px solid #EEEAE3;
            ">

              <div style="
                display:inline-block;
                margin-bottom:16px;
                padding:7px 13px;
                border-radius:999px;
                background:#FBF3E4;
                color:#B47718;
                font-size:10px;
                font-weight:bold;
                letter-spacing:1.4px;
                text-transform:uppercase;
              ">
                ${escapeHtml(title)}
              </div>

              <h1 style="
                margin:0;
                color:#263F6A;
                font-size:28px;
                line-height:1.25;
                font-weight:700;
              ">
                ${escapeHtml(title)}
              </h1>

            </div>

            ${children}

          </div>
        </div>

        <!-- FOOTER -->
        <div style="
          text-align:center;
          padding:26px 20px 10px;
        ">
          <p style="
            margin:0;
            color:#7C8491;
            font-size:12px;
            line-height:1.6;
          ">
            Îți mulțumim că ai ales Mierea Casei.
          </p>

          <p style="
            margin:8px 0 0;
            color:#A4A8AE;
            font-size:11px;
          ">
            Acest email a fost trimis automat în legătură cu comanda ta.
          </p>
        </div>

      </div>
    </div>
  `;
}

export async function sendOrderProcessingEmail({
  customerName,
  customerEmail,
  orderId,
  total,
}) {
  const safeName = escapeHtml(customerName);
  const safeEmail = escapeHtml(customerEmail);
  const safeOrderId = escapeHtml(orderId);
  const formattedTotal = Number(total).toFixed(2);

  return resend.emails.send({
    from: FROM_EMAIL,
    to: [safeEmail],

    subject: `Comanda #${orderId} a fost preluată`,

    html: emailLayout({
      title: "Comanda ta a fost preluată",

      children: `
        <!-- INTRO -->
        <div style="padding:30px 0 24px;">

          <p style="
            margin:0 0 14px;
            color:#263F6A;
            font-size:16px;
            line-height:1.7;
          ">
            Salut, <strong>${safeName}</strong>!
          </p>

          <p style="
            margin:0;
            color:#596270;
            font-size:15px;
            line-height:1.8;
          ">
            Îți confirmăm că am preluat comanda ta și aceasta este acum în procesare.
          </p>

        </div>

        <!-- ORDER SUMMARY -->
        <div style="
          margin:8px 0 28px;
          padding:22px;
          background:#FCFBF8;
          border:1px solid #EEEAE3;
          border-radius:16px;
        ">

          <div style="
            font-size:10px;
            font-weight:bold;
            letter-spacing:1.2px;
            text-transform:uppercase;
            color:#9A9FA7;
          ">
            Detalii comandă
          </div>

          <div style="margin-top:18px;">

            <div style="
              padding-bottom:15px;
              border-bottom:1px solid #EAE6DE;
            ">
              <span style="color:#8A9099;font-size:13px;">
                Număr comandă
              </span>

              <span style="
                float:right;
                color:#263F6A;
                font-size:14px;
                font-weight:bold;
              ">
                #${safeOrderId}
              </span>
            </div>

            <div style="padding-top:15px;">

              <span style="
                color:#8A9099;
                font-size:13px;
              ">
                Total
              </span>

              <span style="
                float:right;
                color:#263F6A;
                font-size:17px;
                font-weight:bold;
              ">
                ${formattedTotal} lei
              </span>

            </div>

          </div>
        </div>

        <!-- STATUS -->
        <div style="
          text-align:center;
          padding:8px 0 26px;
        ">
          <div style="
            display:inline-block;
            padding:10px 18px;
            border-radius:999px;
            background:#FBF3E4;
            color:#B47718;
            font-size:11px;
            font-weight:bold;
            letter-spacing:1px;
            text-transform:uppercase;
          ">
            În procesare
          </div>
        </div>

        <p style="
          margin:0;
          color:#596270;
          font-size:14px;
          line-height:1.8;
          text-align:center;
        ">
          Îți vom trimite un nou email atunci când comanda ta va fi expediată.
        </p>

        <p style="
          margin:28px 0 0;
          color:#263F6A;
          font-size:14px;
          line-height:1.7;
          text-align:center;
          font-weight:bold;
        ">
          Mulțumim pentru comanda ta!
        </p>
      `,
    }),
  });
}

export async function sendOrderShippedEmail({
  customerName,
  customerEmail,
  orderId,
  total,
  awb,
}) {
  const safeName = escapeHtml(customerName);
  const safeEmail = escapeHtml(customerEmail);
  const safeOrderId = escapeHtml(orderId);
  const safeAwb = escapeHtml(awb);

  const formattedTotal = Number(total).toFixed(2);

  return resend.emails.send({
    from: FROM_EMAIL,
    to: [safeEmail],

    subject: `Comanda #${orderId} a fost expediată`,

    html: emailLayout({
      title: "Comanda ta a fost expediată",

      children: `
        <!-- INTRO -->
        <div style="padding:30px 0 24px;">

          <p style="
            margin:0 0 14px;
            color:#263F6A;
            font-size:16px;
            line-height:1.7;
          ">
            Salut, <strong>${safeName}</strong>!
          </p>

          <p style="
            margin:0;
            color:#596270;
            font-size:15px;
            line-height:1.8;
          ">
            Avem o veste bună: comanda ta a fost expediată și este acum în drum spre tine.
          </p>

        </div>

        <!-- ORDER SUMMARY -->
        <div style="
          margin:8px 0 20px;
          padding:22px;
          background:#FCFBF8;
          border:1px solid #EEEAE3;
          border-radius:16px;
        ">

          <div style="
            font-size:10px;
            font-weight:bold;
            letter-spacing:1.2px;
            text-transform:uppercase;
            color:#9A9FA7;
          ">
            Detalii comandă
          </div>

          <div style="margin-top:18px;">

            <div style="
              padding-bottom:15px;
              border-bottom:1px solid #EAE6DE;
            ">
              <span style="
                color:#8A9099;
                font-size:13px;
              ">
                Număr comandă
              </span>

              <span style="
                float:right;
                color:#263F6A;
                font-size:14px;
                font-weight:bold;
              ">
                #${safeOrderId}
              </span>
            </div>

            <div style="padding-top:15px;">

              <span style="
                color:#8A9099;
                font-size:13px;
              ">
                Total
              </span>

              <span style="
                float:right;
                color:#263F6A;
                font-size:17px;
                font-weight:bold;
              ">
                ${formattedTotal} lei
              </span>

            </div>

          </div>
        </div>

        <!-- AWB -->
        <div style="
          margin:0 0 26px;
          padding:22px;
          background:#FBF3E4;
          border:1px solid #EAD5AE;
          border-radius:16px;
          text-align:center;
        ">

          <div style="
            font-size:10px;
            font-weight:bold;
            letter-spacing:1.4px;
            text-transform:uppercase;
            color:#B47718;
          ">
            Număr AWB
          </div>

          <div style="
            margin-top:9px;
            color:#263F6A;
            font-size:22px;
            line-height:1.3;
            font-weight:bold;
            letter-spacing:1px;
          ">
            ${safeAwb}
          </div>

          <div style="
            margin-top:8px;
            color:#8A9099;
            font-size:12px;
          ">
            Folosește acest număr pentru urmărirea coletului.
          </div>

        </div>

        <!-- STATUS -->
        <div style="
          text-align:center;
          padding:4px 0 26px;
        ">
          <div style="
            display:inline-block;
            padding:10px 18px;
            border-radius:999px;
            background:#FBF3E4;
            color:#B47718;
            font-size:11px;
            font-weight:bold;
            letter-spacing:1px;
            text-transform:uppercase;
          ">
            Expediată
          </div>
        </div>

        <p style="
          margin:0;
          color:#596270;
          font-size:14px;
          line-height:1.8;
          text-align:center;
        ">
          Comanda ta este acum în drum spre tine.
          Sperăm să te bucuri de produsele Mierea Casei!
        </p>

        <p style="
          margin:28px 0 0;
          color:#263F6A;
          font-size:14px;
          line-height:1.7;
          text-align:center;
          font-weight:bold;
        ">
          Îți mulțumim pentru încredere!
        </p>
      `,
    }),
  });
}

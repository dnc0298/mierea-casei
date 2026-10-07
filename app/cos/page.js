import CartClient from "../components/CartClient";

export const metadata = {
  title: "Coșul tău",
  description:
    "Verifică produsele selectate și finalizează comanda la Mierea Casei.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <CartClient />;
}

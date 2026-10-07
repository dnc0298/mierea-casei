import { Roboto, Playfair_Display } from "next/font/google";

import "./globals.css";

import Navigation from "./components/Navigation";
import Logo from "./components/Logo";
import MobileMenu from "./components/MobileMenu";
import SmoothScroll from "./components/SmoothScroll";
import Footer from "./components/Footer";
import Providers from "./components/Providers";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-roboto",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
});

export const metadata = {
  title: {
    default: "Mierea Casei | Miere naturală ",
    template: "%s | Mierea Casei",
  },

  description:
    "Descoperă miere naturală și produse apicole de la Mierea Casei.",

  keywords: [
    "miere naturală",
    "miere de albine",
    "miere de salcâm",
    "miere poliflorală",
    "miere de tei",
    "produse apicole",
    "polen",
    "lăptișor de matcă",
  ],

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ro"
      className={`
        
        ${roboto.variable}
        ${playfair.variable}
        h-full
        antialiased
      `}
    >
      <body className="bg-white">
        <Providers>
          <SmoothScroll />

          <header className="sticky top-0 z-50 w-full bg-white">
            <div className="flex justify-center bg-mierealbastru py-1.5 text-xs font-bold text-white md:py-2 md:text-base">
              <span>
                Comenzile de peste 200 lei{" "}
                <span className="text-mieregri">au transport gratuit</span>
              </span>
            </div>

            <div className="mx-auto grid h-12 max-w-[1400px] grid-cols-3 items-center px-3 md:h-15 xl:flex xl:justify-between xl:px-10">
              <div className="flex justify-start xl:hidden">
                <MobileMenu />
              </div>

              <div className="flex justify-center xl:justify-start">
                <Logo />
              </div>

              <div className="flex justify-end xl:justify-start">
                <Navigation />
              </div>
            </div>
          </header>
          <main>{children}</main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}

import Image from "next/image";

function ProductsHero() {
  return (
    <div className="relative min-h-[38dvh] lg:min-h-[15dvh] overflow-hidden">
      <Image
        src="/produs-hero5.png"
        alt="Produse Mierea Casei"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/60 to-gray-950/20" />

      <div className="relative z-10 flex flex-col justify-end h-full min-h-[38dvh] lg:min-h-[45dvh] px-5 lg:px-16 md:max-w-[1400px] mx-auto pb-8 lg:pb-12">
        <p className="font-roboto text-xs mb-2 font-medium uppercase">
          Colecția Completă
        </p>
        <h1 className="font-playfair font-extralight text-4xl md:text-4xl lg:text-5xl text-white max-w-md">
          Toate produsele, dintr-un singur loc.
        </h1>
        <h3 className="font-roboto text-lg text-blue-400 lg:text-xl text-violet mt-4 max-w-md">
          Miere, polen, lăptișor de matcă și produse de îngrijire alese cu
          grijă, direct din stup.
        </h3>
      </div>
    </div>
  );
}

export default ProductsHero;

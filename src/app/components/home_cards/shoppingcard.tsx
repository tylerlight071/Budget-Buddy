import Image from "next/image";
import Link from "next/link";

export default function Shopping_Card() {
  return (
    <Link href="/shopping" passHref>
      <div className="card w-full sm:w-72 h-full bg-[#F9DEC9] shadow-2xl flex flex-col p-6 rounded-lg transform transition duration-500 hover:scale-110 border border-[#6D6875]">
        <div className="card-body flex flex-col items-center">
          <h2 className="card-title text-3xl font-extrabold mb-2 text-[#CB997E] ">
            Shopping List
          </h2>
          <p className="text-lg text-[#6D6875]">
            Plan and manage your shopping list with ease.
          </p>
        </div>
        <figure className="mt-4">
          <Image
            src="/shopping_card_image.png"
            width={120}
            height={120}
            alt="Shopping Image"
          />
        </figure>
      </div>
    </Link>
  );
}

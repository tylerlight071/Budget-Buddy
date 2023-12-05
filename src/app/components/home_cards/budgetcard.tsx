import Link from "next/link";
import Image from "next/image";

export default function Shopping_Card() {
  return (
    <Link href="/budget" passHref>
      <div className="card w-full sm:w-72 bg-[#F9DEC9] shadow-2xl flex flex-col p-6 rounded-lg transform transition duration-500 hover:scale-110 border border-[#6D6875] ">
        <div className="card-body flex flex-col items-center">
          <h2 className="card-title text-2xl font-bold mb-2 text-[#CB997E]">
            Budget Tracker
          </h2>
          <p className="text-lg text-[#6D6875]">
            Manage your income and expenses in a clear and organized manner.
          </p>
        </div>
        <figure className="mt-4">
          <Image
            src="/budget_card_image.png"
            width={100}
            height={100}
            alt="Shopping Image"
          />
        </figure>
      </div>
    </Link>
  );
}

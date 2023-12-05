import Image from "next/image";
import Link from "next/link";

export default function Settings_Card() {
  return (
    <Link href="/settings" passHref>
      <div className="card w-full sm:w-72 h-full bg-[#F9DEC9] shadow-2xl flex flex-col p-6 rounded-lg transform transition duration-500 hover:scale-110 border border-[#6D6875]">
        <div className="card-body flex flex-col items-center">
          <h2 className="card-title text-2xl font-bold mb-2 text-[#CB997E]">
            Settings
          </h2>
          <p className="text-lg text-[#6D6875]">
            Customize your preferences and manage your app settings.
          </p>
        </div>
        <figure className="mt-4">
          <Image
            src="/settings_card_image.png"
            width={100}
            height={100}
            alt="Settings Image"
          />
        </figure>
      </div>
    </Link>
  );
}

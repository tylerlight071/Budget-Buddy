import { SignIn } from "@clerk/nextjs";

const theme = {
  colors: {
    primary: "#CB997E",
  },
};

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gradient-to-r from-[#f0dfd6] to-[#c9a795]">
      <SignIn  />;
    </div>
  );
}

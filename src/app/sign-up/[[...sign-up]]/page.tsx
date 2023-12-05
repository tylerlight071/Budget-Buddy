import { SignUp } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gradient-to-r from-[#f0dfd6] to-[#c9a795]">
      <SignUp />;
    </div>
  )
}
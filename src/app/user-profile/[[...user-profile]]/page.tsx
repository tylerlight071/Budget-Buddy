import { UserProfile } from "@clerk/nextjs";
 
const UserProfilePage = () => (
  <div className="min-h-screen w-full flex justify-center items-stretch text-black p-8 bg-gradient-to-r from-[#f0dfd6] to-[#c9a795]">
    <UserProfile path="/user-profile" routing="path" />
  </div>
);

export default UserProfilePage;

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ProfilePage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#F2F0E9] pt-32 pb-20 flex justify-center items-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
          <div className="w-24 h-24 bg-[#2C3324] text-[#F2F0E9] rounded-full mx-auto flex items-center justify-center text-4xl mb-4 font-serif-display">
            W
          </div>
          <h2 className="text-2xl font-bold text-[#2C3324]">Member</h2>
          <p className="text-gray-500 mb-6">Gold Tier - Webie Cellar</p>
          <button className="w-full border border-[#E05D48] text-[#E05D48] py-2 rounded-lg font-bold hover:bg-[#E05D48] hover:text-white transition-colors">
            Edit Profile
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

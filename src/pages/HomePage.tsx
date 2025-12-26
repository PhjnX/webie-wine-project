import HeroCarousel from "../components/HeroCarousel";
import BrandStory from "../components/BrandStory"; 
import CategoryShowcase from "../components/CategoryShowcase"; 
import BestSellers from "../components/BestSellers"; 
import ExclusiveOffer from "../components/ExclusiveOffer"; 

export default function Home() {
  return (
    <div className="bg-[#050505] min-h-screen">

      <main>
        <HeroCarousel />

        <BrandStory />

        <CategoryShowcase />

        <BestSellers />

        <ExclusiveOffer />
      </main>

    </div>
  );
}

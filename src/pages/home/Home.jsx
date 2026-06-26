import HeroReplica from "@/pages/home/sections/HeroReplica"
import InstagramSection from "@/pages/home/sections/InstagramSection"
import JourneySection from "@/pages/home/sections/JourneySection"
import MomosteSection from "@/pages/home/sections/MomosteSection"
import OurStorySection from "@/pages/home/sections/OurStorySection"
import RootsSection from "@/pages/home/sections/RootsSection"
import UpdatesSection from "@/pages/home/sections/UpdatesSection"
import YakClubSection from "@/pages/home/sections/YakClubSection"

export default function Home() {
  return (
    <div className="bg-white">
      <HeroReplica />
      <MomosteSection />
      <JourneySection />
      <RootsSection />
      <OurStorySection />
      <UpdatesSection />
      <InstagramSection />
      <YakClubSection />
    </div>
  )
}

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MoodExplorer from "@/components/MoodExplorer";
import StorySection from "@/components/StorySection";
import InteractiveMenu from "@/components/InteractiveMenu";
import PhotoStory from "@/components/PhotoStory";
import GoogleReviews from "@/components/GoogleReviews";
import InstagramFeed from "@/components/InstagramFeed";
import VisitUs from "@/components/VisitUs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Floating Header */}
      <Navbar />

      {/* Main Flow */}
      <main className="flex-1">
        {/* Section 1: Hero — Cinematic Experience */}
        <Hero />

        {/* Section 2: Interactive Mood Canvas (Cursor Trail) */}
        <MoodExplorer />

        {/* Section 3: Brand Story — Editorial Storytelling */}
        <StorySection />

        {/* Section 4: Interactive Food & Drink Menu */}
        <InteractiveMenu />

        {/* Section 5: Signature Experience Photo Story */}
        <PhotoStory />

        {/* Section 6: Google Reviews Interactive Corkboard */}
        <GoogleReviews />

        {/* Section 7: Instagram Visual Feed */}
        <InstagramFeed />

        {/* Section 8: Visit Us & Contact Section */}
        <VisitUs />
      </main>

      {/* Section 9: Oversized Editorial Footer */}
      <Footer />
    </div>
  );
}

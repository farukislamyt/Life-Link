import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import WhyChoose from "@/components/home/WhyChoose";
import HowItWorks from "@/components/home/HowItWorks";
import BloodGroups from "@/components/home/BloodGroups";
import EmergencyCTA from "@/components/home/EmergencyCTA";
import Features from "@/components/home/Features";
import CommunityStories from "@/components/home/CommunityStories";
import LiveRequests from "@/components/home/LiveRequests";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <WhyChoose />
      <HowItWorks />
      <BloodGroups />
      <EmergencyCTA />
      <Features />
      <CommunityStories />
      <LiveRequests />
      <Footer />
    </>
  );
}
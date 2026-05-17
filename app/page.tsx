import { Navbar }       from "@/components/sections/Navbar";
import { Hero }         from "@/components/sections/Hero";
import { SocialProof }  from "@/components/sections/SocialProof";
import { HowItWorks }   from "@/components/sections/HowItWorks";
import { ForWhom }      from "@/components/sections/ForWhom";
import { Product }      from "@/components/sections/Product";
import { WaitlistForm } from "@/components/sections/WaitlistForm";
import { Testimonials } from "@/components/sections/Testimonials";
// import { Pricing }      from "@/components/sections/Pricing";
import { FAQ }          from "@/components/sections/FAQ";
import { ContactForm }  from "@/components/sections/ContactForm";
import { Footer }       from "@/components/sections/Footer";
import { StickyBottomBar } from "@/components/shared/StickyBottomBar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <HowItWorks />
        <ForWhom />
        <Product />
        <WaitlistForm />
        <Testimonials />
        {/* <Pricing /> */}
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
      <StickyBottomBar />
    </>
  );
}

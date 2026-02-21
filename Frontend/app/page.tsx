"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Volume2, Zap, CheckCircle2, Smartphone, Send } from "lucide-react";
import SchemeChatbot from "@/components/Schemeschatbot";
import InsuranceChatbot from "@/components/InsuranceChatbot";
import FinanceChatbot from "@/components/FinancialChatbot";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const heroImages = ["/slide1.jpeg","/htpSlide3.jpg"];

export default function Home() {
  const [showChatbot, setShowChatbot] = useState(false);
  const [activeBot, setActiveBot] = useState<"schemes" | "insurance" | "finance" | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const chatbotRef = useRef(null);

  const { t, i18n } = useTranslation(); // i18next hook
  const language = i18n.language || "en";

  // Hero Section Text
  const heroTitle =
    language === "hi"
      ? "एक प्रोफाइल। सभी योजनाएं। कोई भ्रम नहीं।"
      : language === "mr"
        ? "एक प्रोफाइल। सर्व योजना। कोई भ्रम नाही।"
        : "Bridging Farmers to Government Support";

  const heroSubtitle =
    language === "hi"
      ? "सरकारी योजनाएं, बीमा, और वित्तीय सहायता — एक ही जगह।"
      : language === "mr"
        ? "सरकारी योजना, विमे, आर्थिक मदत — एक ठिकाणी।"
        : "Government schemes, insurance, and financial support — all in one place.";

  // Auto-change hero image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showChatbot && chatbotRef.current) {
      chatbotRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showChatbot, activeBot]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">

      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[70vh] min-h-[480px] max-h-[600px] overflow-hidden">
        <img
          src={heroImages[currentIndex]}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 flex flex-col justify-center h-full max-w-6xl px-6 text-white">
          <div className="mb-6 inline-flex w-fit items-center rounded-full bg-white/20 backdrop-blur-md px-5 py-2 border border-white/30">
            {t("Helping 2M+ farmers discover schemes")}
          </div>
          <h1 className="text-5xl font-bold mb-6">{t("Farmer Miss Benefits")} <br /> {t("Worth 50000 Every Year")}</h1>
          <p className="text-lg mb-8 max-w-xl">{t("Find all government")} <br /> {t("schemes in one place")}</p>
          <Button className="bg-orange-500 hover:bg-orange-600 w-fit" onClick={() => router.push("/access")}>
            {t("Continue with Mobile")}
          </Button>
        </div>
      </section>

      {/* 3 Main Cards Section */}
      <section className="relative px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-3">{t("Choose What You Need Help With")}</h2>
          <p className="text-muted-foreground text-lg">{t("Instantly discover your eligible benefits in 30 seconds")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* SCHEMES */}
          <div onClick={() => { setActiveBot("schemes"); setShowChatbot(true); }}
               className="group cursor-pointer relative overflow-hidden rounded-2xl bg-[#608A1C] p-8 text-white shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 border-[#DAA520]">
            <h3 className="text-2xl font-bold mb-2">{t("Government Schemes")}</h3>
            <p className="text-white/90 mb-6">{t("Get ₹6,000 – ₹50,000 yearly support from government schemes")}</p>
            <div className="space-y-2 text-sm mb-6">
              <p>{t("PM Kisan")}</p>
              <p>{t("Subsidy Programs")}</p>
              <p>{t("Equipment Support")}</p>
            </div>
            <button className="bg-[#FF7A1A] hover:bg-[#E66A00] text-white font-semibold py-3 px-6 rounded-lg">{t("Select")}</button>
          </div>

          {/* INSURANCE */}
          <div onClick={() => { setActiveBot("insurance"); setShowChatbot(true); }}
               className="group cursor-pointer relative overflow-hidden rounded-2xl bg-[#608A1C] p-8 text-white shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 border-[#DAA520]">
            <h3 className="text-2xl font-bold mb-2">{t("Insurance Coverage")}</h3>
            <p className="text-white/90 mb-6">{t("Protect crops & get ₹10,000 – ₹2,00,000 claim support")}</p>
            <div className="space-y-2 text-sm mb-6">
              <p>✔ {t("Crop Insurance")}</p>
              <p>✔ {t("Health Coverage")}</p>
              <p>✔ {t("Accident Protection")}</p>
            </div>
            <button className="bg-[#FF7A1A] hover:bg-[#E66A00] text-white font-semibold py-3 px-6 rounded-lg">{t("Select")}</button>
          </div>

          {/* FINANCE */}
          <div onClick={() => { setActiveBot("finance"); setShowChatbot(true); }}
               className="group cursor-pointer relative overflow-hidden rounded-2xl bg-[#608A1C] p-8 text-white shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 border-[#DAA520]">
            <h3 className="text-2xl font-bold mb-2">{t("Financial Support")}</h3>
            <p className="text-white/90 mb-6">{t("Get loans up to ₹3,00,000 at lowest interest")}</p>
            <div className="space-y-2 text-sm mb-6">
              <p>✔ {t("Kisan Credit Card")}</p>
              <p>✔ {t("Farm Loans")}</p>
              <p>✔ {t("Interest Subsidy")}</p>
            </div>
            <button className="bg-[#FF7A1A] hover:bg-[#E66A00] text-white font-semibold py-3 px-6 rounded-lg">{t("Select")}</button>
          </div>
        </div>
      </section>

      {/* Chatbot Sections */}
      {showChatbot && activeBot === "schemes" && <section ref={chatbotRef} className="px-4 py-16 bg-secondary/30"><SchemeChatbot /></section>}
      {showChatbot && activeBot === "insurance" && <section ref={chatbotRef} className="px-4 py-16 bg-secondary/30"><InsuranceChatbot /></section>}
      {showChatbot && activeBot === "finance" && <section ref={chatbotRef} className="px-4 py-16 bg-secondary/30"><FinanceChatbot /></section>}

      {/* How It Works */}
      <section className="relative px-4 py-16 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">{t("How It Works")}</h2>
            <p className="text-lg text-muted-foreground">{t("Three simple steps to discover your schemes")}</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[t("Create Profile"), t("Auto Matching"), t("Apply Instantly")].map((step, idx) => (
              <div key={idx} className="relative text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#608A1C] border border-[#DAA520] text-primary-foreground mx-auto text-2xl font-bold">{idx + 1}</div>
                <h3 className="mb-2 text-xl font-bold text-foreground">{step}</h3>
                <p className="text-muted-foreground">
                  {idx === 0 && t("Share basic information about your farm and eligibility criteria.")}
                  {idx === 1 && t("Our system instantly matches you with all eligible government schemes.")}
                  {idx === 2 && t("Get complete guidance and apply directly through our platform.")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative px-4 py-16 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-center mb-4">{t("Trusted by Millions of Farmers")}</h2>
            <p className="text-center text-muted-foreground mb-10">{t("Real adoption numbers from government schemes")}</p>
          </div>
          {/* Testimonials grid (example static data, wrap t() around needed text) */}
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-[#DAA520] bg-gradient-to-r from-primary/5 to-accent/10 p-8 text-center sm:p-12">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">{t("Ready to Discover Your Schemes?")}</h2>
          <p className="mb-8 text-lg text-muted-foreground">{t("Join thousands of farmers who are now getting the government support they deserve.")}</p>
          <Button onClick={() => router.push("/profile")} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
            {t("Get Started Now")}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"><Smartphone className="h-5 w-5" /></div>
                <span className="font-bold text-foreground">Kisan Sahay</span>
              </div>
              <p className="text-sm text-muted-foreground">{t("Empowering farmers with government support discovery.")}</p>
            </div>
            <div>
              <h4 className="mb-3 font-semibold text-foreground">{t("Product")}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">{t("Features")}</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">{t("Pricing")}</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">{t("Blog")}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 font-semibold text-foreground">{t("Company")}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">{t("About")}</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">{t("Contact")}</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">{t("Careers")}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 font-semibold text-foreground">{t("Legal")}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">{t("Privacy")}</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">{t("Terms")}</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">{t("Security")}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">© 2026 Kisan Sahay. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Twitter</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Facebook</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

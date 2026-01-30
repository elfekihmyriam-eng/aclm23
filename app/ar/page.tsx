"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Header from "../../components/Header";
import CarouselDots from "../../components/CarouselDots";
import Footer from "../../components/Footer";
import Image from "next/image";
import BooksShowcase from "./BooksShowcase";
import WriterSubscribeTrigger from "../../components/WriterSubscribeTrigger";
import FeaturedAuthors from "../../components/FeaturedAuthors";

import { supabase } from "../../lib/supabase";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // 🔐 Écoute officielle Supabase (v2)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session) {
          router.replace("/admin");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  return (
    <>
      <Header />

      <main>
        {/* ===== IMAGE PRINCIPALE ===== */}
        <section className="hero-page">
          <Image
            src="/images/hero-livres-v4.png"
            alt="Livres et lettres"
            width={1600}
            height={2400}
            priority
            className="heroImage"
          />

          <div className="hero-overlay">
            <h1 className="hero-title">
              الجمعية الكندية للأدب المهجري
            </h1>

            <WriterSubscribeTrigger />
          </div>
        </section>

        {/* ===== نبذة ===== */}
        <section id="about" className="content-page">
          <h2 className="content-title-sm">نبذة عن الجمعيّة</h2>
          <p className="content-text">
            تهدف الجمعيّة الكنديّة للأدب المهجريّ إلى تعزيز حضور الأدب
            المهجريّ بوصفه جزءًا لا يتجزّأ من التنوّع الأدبيّ الكنديّ...
          </p>
        </section>

        {/* ===== أنشطة ===== */}
        <section id="activities" className="content-page activities-section">
          <h2 className="content-title-sm">أنشطة الجمعيّة</h2>
        </section>

        {/* ===== المنتدى ===== */}
        <section id="forum" className="content-page">
          <h2 className="content-title-sm">
            المنتدى الوطنيّ للأدب المهجريّ
          </h2>
        </section>

        {/* ===== الإصدارات ===== */}
        <section id="books" className="content-page books-carousel-section">
          <h2 className="content-title-sm">الإصدارات من المهجر</h2>
          <BooksShowcase />
        </section>

        {/* ===== الكتّاب ===== */}
        <section id="authors" className="content-page">
          <h2 className="content-title-sm">الكتّاب من المهجر</h2>
          <FeaturedAuthors />
        </section>

        <CarouselDots />
      </main>

      <Footer />
    </>
  );
}



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
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
       if (event === "SIGNED_IN" && session && window.location.pathname === "/login") {
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

        <section id="about" className="content-page">
          <h2 className="content-title-sm">نبذة عن الجمعيّة</h2>
          <p className="content-text">
            تهدف الجمعيّة الكنديّة للأدب المهجريّ إلى تعزيز حضور الأدب
            المهجريّ بوصفه جزءًا لا يتجزّأ من التنوّع الأدبيّ الكنديّ.
            وتدْعمُ الجمعيّة هذا الأدب وعيًا منها بأهميّة الأصوات
            المنبثقة من تجارب الهجرة باعتبارها مكوّنًا أساسيًّا من
            التّراث الثّقافيّ للبلاد، وتسعى إلى إبرازها ونشرها من خلال
            أنشطة النّشر والتّرجمة والتّكوين والبحث واللّقاءات
            والاحتفاء بالمعرفة وتيسير سُبل نقْلها.
          </p>
        </section>

        <section id="activities" className="content-page activities-section">
          <h2 className="content-title-sm">أنشطة الجمعيّة</h2>
          <ul className="activities-list">
            <li>عرض مؤلّفات الكتّاب المهاجرين...</li>
          </ul>
        </section>

        <section id="forum" className="content-page">
          <h2 className="content-title-sm">
            المنتدى الوطنيّ للأدب المهجريّ
          </h2>
          <p className="content-text">...</p>
        </section>

        <section id="books" className="content-page books-carousel-section">
          <h2 className="content-title-sm">الإصدارات من المهجر</h2>
          {/* <BooksShowcase /> */}
        </section>

        <section id="authors" className="content-page">
          <h2 className="content-title-sm">الكتّاب من المهجر</h2>
          {/* <FeaturedAuthors /> */}
        </section>

        <CarouselDots />
      </main>

      <Footer />
    </>
  );
}



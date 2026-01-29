import Header from "../../components/Header";
import CarouselDots from "../../components/CarouselDots";
import Footer from "../../components/Footer";
import Image from "next/image";
import BooksShowcase from "./BooksShowcase";
import WriterSubscribeTrigger from "../../components/WriterSubscribeTrigger";
import FeaturedAuthors from "../../components/FeaturedAuthors";


export default function HomePage() {
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

          {/* TITRE + BOUTON */}
          <div className="hero-overlay">
            <h1 className="hero-title">
              الجمعية الكندية للأدب المهجري
            </h1>

            {/* Bouton qui ouvre la fenêtre */}
            <WriterSubscribeTrigger />
          </div>
        </section>

        {/* ===== نبذة عن الجمعيّة ===== */}
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

        {/* ===== أنشطة الجمعيّة ===== */}
        <section
          id="activities"
          className="content-page activities-section"
        >
          <h2 className="content-title-sm">أنشطة الجمعيّة</h2>

          <ul className="activities-list">
            <li>
              عرض مؤلّفات الكتّاب المهاجرين والتعريف بها عبر الصفحات
              الرقميّة الرسميّة للجمعيّة
            </li>
            <li>
              مرافقة الكتّاب في مسار نشر كتبهم ضمن مشاريع النشر التي
              تشرف عليها الجمعيّة
            </li>
            <li>
              إتاحة الكتب في المكتبات العربيّة في أمريكا الشماليّة
            </li>
            <li>
              دعم ترجمة الأعمال إلى الفرنسيّة أو الإنجليزيّة وفق برامج
              الجمعيّة
            </li>
            <li>تنظيم لقاءات وندوات أدبيّة</li>
            <li>ورشات كتابة وبحث</li>
            <li>الاحتفاء بالإبداع المهاجر</li>
          </ul>
        </section>

        {/* ===== المنتدى ===== */}
        <section id="forum" className="content-page">
          <h2 className="content-title-sm">
            المنتدى الوطنيّ للأدب المهجريّ
          </h2>

          <p className="content-text">
            تنظّم الجمعيّة منتدى وطنيّا سنويّا يوميْ 21 و22 مايو،
            تزامنًا مع اليوم العالميّ للتنوّع الثّقافيّ التّابع
            لليونسكو. يجمع المنتدى كتّابًا مهاجرين ونقّادًا وباحثين
            لمناقشة قضايا الأدب المهجريّ.
          </p>
        </section>

        {/* ===== الإصدارات ===== */}
        <section
          id="books"
          className="content-page books-carousel-section"
        >
          <h2 className="content-title-sm">الإصدارات من المهجر</h2>
          <BooksShowcase />
        </section>

        {/* ===== الكتّاب ===== */}{/* ===== الكتّاب من المهجر ===== */}
<section id="authors" className="content-page">
  <h2 className="content-title-sm">الكتّاب من المهجر</h2>

  {/* Auteurs dynamiques depuis Supabase */}
  <FeaturedAuthors />
</section>


        <CarouselDots />
      </main>

      <Footer />
    </>
  );
}



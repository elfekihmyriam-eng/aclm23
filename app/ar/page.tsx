import Header from "../../components/Header";
import CarouselDots from "../../components/CarouselDots";
import Footer from "../../components/Footer";
import Image from "next/image";
import BooksShowcase from "./BooksShowcase";
import WriterSubscribeTrigger from "../../components/WriterSubscribeTrigger";
import FeaturedAuthors from "../../components/FeaturedAuthors";

export const dynamic = "force-dynamic";


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
 الاتحاد الكندي للكتّاب المهاجرين العرب
            </h1>

            {/* Bouton qui ouvre la fenêtre */}
            <WriterSubscribeTrigger />
          </div>
        </section>

        {/* ===== نبذة عن الجمعيّة ===== */}
        <section id="about" className="content-page">
          <h2 className="content-title-sm">لمحة عن الاتحاد الكندي للكتّاب المهاجرين العرب</h2>

          <p className="content-text">
       يهدف الاتحاد الكندي للكتّاب المهاجرين العرب إلى تعزيز حضور الأدب المهجري بوصفه جزءًا لا يتجزّأ من التنوّع الأدبي في كندا. ويدعم الاتحاد هذا الأدب انطلاقًا من وعيه العميق بأهميّة الأصوات المنبثقة من تجارب الهجرة، باعتبارها مكوّنًا أساسيًّا من التراث الثقافي الحيّ للبلاد. ويسعى إلى إبراز هذه الأصوات ونقلها من خلال مبادرات في النشر، الترجمة، التكوين، البحث، اللقاءات الأدبية، والاحتفاء بالمعرفة وتيسير سُبل تداولها.
          </p>
        </section>

        {/* ===== أنشطة الاتحاد ===== */}
        <section
          id="activities"
          className="content-page activities-section"
        >
          <h2 className="content-title-sm">أنشطة الجمعيّة</h2>

          <ul className="activities-list">
            <li>

لأنّ تحسين الظروف الاجتماعية والاقتصادية للكتّاب والكاتبات من أصول مهاجرة يمرّ أيضًا عبر الاعتراف الفعلي بإنتاجهم الأدبي، فإنّ اتحادنا يلتزم بالنهوض بالأدب المهجري من خلال مجموعة من البرامج والفعاليات الممتدة على امتداد التراب الكندي.

نعمل على توفير فرص ملموسة للمبدعين والمبدعات لمشاركة نصوصهم مع جمهور واسع، وتمكينهم من نشر أعمالهم وترجمتها إلى اللغتين الرسميتين في كندا: الفرنسية والإنجليزية.
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

        {/* ===== الكتّاب ===== */}{/* ===== كتّاب من المهجر ===== */}
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




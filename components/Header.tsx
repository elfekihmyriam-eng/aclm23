export default function Header() {
  return (
    <header className="header-fixed">
      <nav className="nav-fixed">

        {/* Liens principaux */}
        <div className="nav-links">
          <a href="#about">نبذة عن الجمعيّة</a>
          <a href="#activities">أنشطة الجمعيّة</a>
          <a href="#forum">المنتدى</a>
          <a href="#books">الإصدارات</a>
          <a href="#authors">الكتّاب</a>
        </div>

        {/* Actions (UN SEUL اشتراك) */}
        <div className="nav-actions">
          
          <a href="/ar/subscribe" className="nav-btn">اشتراك</a>
        <a href="/ar/support" className="nav-btn nav-btn-primary">دعم</a>
       <a href="/fr" className="nav-btn">FR</a>

        </div>

      </nav>
    </header>
  );
}

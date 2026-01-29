import Link from "next/link";

export default function AdminTopBar() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 99999,
        background: "#000",
        color: "#fff",
        padding: "12px 24px",
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        fontSize: "14px",
      }}
    >
      <Link href="/admin/authors" style={{ color: "#fff", textDecoration: "none" }}>
        👥 إدارة الكتّاب
      </Link>

      <Link href="/admin/books" style={{ color: "#fff", textDecoration: "none" }}>
        📚 إدارة الإصدارات
      </Link>

      <Link href="/admin/crm" style={{ color: "#fff", textDecoration: "none" }}>
        📧 البريد الإلكتروني
      </Link>

      <Link href="/ar" style={{ color: "#fff", textDecoration: "none" }}>
        🏠 الموقع
      </Link>
    </nav>
  );
}


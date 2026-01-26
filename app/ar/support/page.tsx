"use client";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

export default function SupportPage() {
  return (
    <>
      <Header />

      <main className="support-page">
        {/* Retour */}
        <div className="back-link">
          <a href="/ar">← العودة إلى الصفحة الرئيسيّة</a>
        </div>

        {/* Titre */}
        <h1 className="support-title">دعم الجمعيّة</h1>

        <p className="support-intro">
          يساهم دعمكم في تعزيز حضور الأدب المهجريّ،
          ودعم الكتّاب والمبادرات الثقافيّة التي تشرف عليها الجمعيّة.
        </p>

        {/* Formulaire obligatoire */}
        <form className="support-form">
          {/* Type de donateur */}
          <div className="form-row">
            <select required>
              <option value="">اختر صفة الداعم</option>
              <option value="individual">فرد</option>
              <option value="company">مؤسسة / شركة</option>
            </select>
          </div>

          {/* Informations personnelles */}
          <div className="form-row">
            <input
              type="text"
              placeholder="الاسم"
              required
            />
            <input
              type="text"
              placeholder="اللقب"
              required
            />
          </div>

          {/* Informations entreprise */}
          <div className="form-row">
            <input
              type="text"
              placeholder="اسم المؤسسة / الشركة"
              required
            />
            <input
              type="text"
              placeholder="عنوان المؤسسة"
              required
            />
          </div>

          <div className="form-row">
            <input
              type="tel"
              placeholder="رقم الهاتف"
              required
            />
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              required
            />
          </div>
        </form>

        {/* Bloc paiement */}
        <div
          className="payment-box"
          style={{
            border: "1px solid rgba(0,0,0,0.15)",
            borderRadius: "14px",
            padding: "32px",
            marginTop: "40px",
            textAlign: "center",
          }}
        >
          <p className="payment-note" style={{ marginBottom: "28px" }}>
            سيتم تحويلكم إلى PayPal لإتمام عملية الدعم
            (بطاقة بنكيّة أو حساب PayPal).
          </p>

          {/* Bouton PayPal cadré en bleu */}
          <a
            href="https://paypal.me/aclmqc"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{
              border: "2px solid #2563eb",
              backgroundColor: "transparent",
              color: "#2563eb",
              padding: "14px 36px",
              borderRadius: "999px",
              fontWeight: 600,
              display: "inline-block",
            }}
          >
            الدفع عبر PayPal
          </a>
        </div>
      </main>

      <Footer />
    </>
  );
}


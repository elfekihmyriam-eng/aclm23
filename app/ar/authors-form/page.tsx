"use client";

import { useState } from "react";
import Link from "next/link";

export default function AuthorsFormPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="content-page authors-form-page" dir="rtl">
      {/* Bouton retour */}
     <Link href="/ar" className="back-link">


        ← العودة إلى الصفحة الرئيسيّة
      </Link>

      {!submitted ? (
        <>
          <h1 className="subscribe-title">استمارة الكاتب</h1>

          <p className="subscribe-intro">
            يرجى ملء هذه الاستمارة لتقديم معلوماتكم ومشاركة أغلفة أعمالكم
            الأدبية. جميع الحقول إلزامية.
          </p>

          <form onSubmit={handleSubmit} className="authors-form">
            <div className="authors-form-box">

              {/* الاسم / اللقب */}
              <div className="form-row">
                <input type="text" placeholder="الاسم" required />
                <input type="text" placeholder="اللقب" required />
              </div>

              {/* البريد / الهاتف */}
              <div className="form-row">
                <input type="email" placeholder="البريد الإلكتروني" required />
                <input type="tel" placeholder="رقم الهاتف" required />
              </div>

              {/* العنوان */}
              <div className="form-row full">
                <input type="text" placeholder="العنوان الكامل" required />
              </div>

              {/* النبذة */}
              <div className="form-row full">
                <textarea
                  placeholder="يرجى كتابة نبذة عنكم مع ذكر عناوين أعمالكم المنشورة أو المقترحة"
                  required
                />
              </div>

              {/* تحميل الأغلفة */}
              <div className="upload-box">
                📎 تحميل أغلفة الكتب
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  required
                />
              </div>

              {/* إرسال */}
              <div className="authors-submit">
                <button type="submit">
                  إرسال الاستمارة
                </button>
              </div>

            </div>
          </form>
        </>
      ) : (
        <>
          <h2 className="subscribe-title">تم إرسال الاستمارة بنجاح</h2>
          <p className="subscribe-intro">
            نشكركم على اهتمامكم. سيتم التواصل معكم في أقرب وقت ممكن.
          </p>
        </>
      )}
    </div>
  );
}


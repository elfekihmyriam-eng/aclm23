"use client";

import { useState } from "react";
import Link from "next/link";

/* ================== LIMITES (mobile friendly) ================== */
const MAX_PHOTO_SIZE = 5 * 1024 * 1024; // 5 Mo
const MAX_COVER_SIZE = 5 * 1024 * 1024; // 5 Mo
const MAX_COVERS = 10;

/* ================== TYPES ================== */
type PreviewFile = {
  file: File;
  preview: string;
};

export default function AuthorsFormPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [photo, setPhoto] = useState<PreviewFile | null>(null);
  const [covers, setCovers] = useState<PreviewFile[]>([]);

  /* ================== HANDLERS ================== */

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_PHOTO_SIZE) {
      setError("الصورة كبيرة جدًا. يرجى اختيار صورة أقل من 5 ميغابايت.");
      e.target.value = "";
      return;
    }

    setError(null);
    setPhoto({
      file,
      preview: URL.createObjectURL(file),
    });
  }

  function handleRemovePhoto() {
    if (photo) URL.revokeObjectURL(photo.preview);
    setPhoto(null);
  }

  function handleCoversChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    const accepted: PreviewFile[] = [];

    for (const file of files) {
      if (covers.length + accepted.length >= MAX_COVERS) break;

      if (file.size > MAX_COVER_SIZE) {
        setError(`الغلاف «${file.name}» كبير جدًا (الحد الأقصى 5 ميغابايت).`);
        continue;
      }

      accepted.push({
        file,
        preview: URL.createObjectURL(file),
      });
    }

    if (accepted.length > 0) setError(null);
    setCovers((prev) => [...prev, ...accepted]);
    e.target.value = "";
  }

  function removeCover(index: number) {
    URL.revokeObjectURL(covers[index].preview);
    setCovers((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!photo) {
      setError("يرجى إضافة صورة للكاتب.");
      return;
    }

    if (covers.length === 0) {
      setError("يرجى إضافة غلاف واحد على الأقل.");
      return;
    }

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.append("photo", photo.file);
    covers.forEach((c) => formData.append("covers", c.file));

    try {
      const res = await fetch("/api/authors/submit", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        if (res.status === 413) {
          throw new Error("413");
        }
        throw new Error("submit");
      }

      setSubmitted(true);
    } catch (err: any) {
      if (err.message === "413") {
        setError(
          "تعذّر إرسال الاستمارة بسبب حجم الملفات. يرجى تقليل حجم الصور والمحاولة مرة أخرى."
        );
      } else {
        setError("حدث خطأ أثناء إرسال الاستمارة. يرجى المحاولة مرة أخرى.");
      }
    } finally {
      setLoading(false);
    }
  }

  /* ================== RENDER ================== */

  return (
    <div className="content-page authors-form-page" dir="rtl">
      <Link href="/ar" className="back-link">
        ← العودة إلى الصفحة الرئيسيّة
      </Link>

      {/* رسالة الخطأ */}
      {error && (
        <div
          style={{
            margin: "16px 0",
            padding: "12px 14px",
            borderRadius: "10px",
            background: "#fde8e8",
            color: "#7a1a1a",
            fontSize: "14px",
            lineHeight: 1.6,
          }}
        >
          {error}
        </div>
      )}

      {!submitted ? (
        <>
          <h1 className="subscribe-title">استمارة الكاتب</h1>

          <form onSubmit={handleSubmit} className="authors-form">
            <div className="authors-form-box">

              {/* الاسم */}
              <div className="form-row">
                <input name="first_name" placeholder="الاسم" required />
                <input name="last_name" placeholder="اللقب" required />
              </div>

              {/* البريد / الهاتف */}
              <div className="form-row">
                <input name="email" type="email" placeholder="البريد الإلكتروني" required />
                <input name="phone" placeholder="رقم الهاتف" required />
              </div>

              {/* البلد */}
              <div className="form-row full">
                <input name="country" placeholder="البلد" required />
              </div>

              {/* النبذة */}
              <div className="form-row full">
                <textarea name="bio" placeholder="نبذة عنكم" required />
              </div>

              {/* تنبيه الهاتف */}
              <p style={{ fontSize: "14px", opacity: 0.8, marginBottom: "10px" }}>
                📱 ملاحظة: صور الهاتف غالبًا تكون كبيرة. يُفضّل اختيار صور أقل من 5 ميغابايت.
              </p>

              {/* PHOTO */}
              <div className="upload-box">
                📷 صورة الكاتب (حتى 5MB)
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </div>

              {photo && (
                <div className="preview-single" style={{ marginTop: "10px" }}>
                  <img
                    src={photo.preview}
                    alt="photo auteur"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      border: "1px solid #ddd",
                    }}
                  />
                  <div>
                    <button type="button" onClick={handleRemovePhoto}>
                      ✖ حذف
                    </button>
                  </div>
                </div>
              )}

              {/* COVERS */}
              <div className="upload-box">
                📎 أغلفة الكتب (حتى 10 – 5MB لكل غلاف)
                <input
                  type="file"
                  name="covers"
                  accept="image/*"
                  multiple
                  onChange={handleCoversChange}
                />
              </div>

              {covers.length > 0 && (
                <div className="preview-grid" style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "10px" }}>
                  {covers.map((c, i) => (
                    <div key={i} style={{ textAlign: "center" }}>
                      <img
                        src={c.preview}
                        alt={`cover-${i}`}
                        style={{
                          width: "100px",
                          height: "140px",
                          objectFit: "cover",
                          borderRadius: "6px",
                          border: "1px solid #ddd",
                        }}
                      />
                      <div>
                        <button type="button" onClick={() => removeCover(i)}>
                          ✖
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* إرسال */}
              <div className="authors-submit">
                <button type="submit" disabled={loading}>
                  {loading ? "⏳ جارٍ الإرسال… الرجاء الانتظار" : "إرسال الاستمارة"}
                </button>
              </div>

            </div>
          </form>
        </>
      ) : (
        <h2 className="subscribe-title">تم إرسال الاستمارة بنجاح</h2>
      )}
    </div>
  );
}



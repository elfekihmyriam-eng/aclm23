"use client";

import { useState } from "react";
import Link from "next/link";

/* ================== LIMITS (mobile friendly) ================== */
const MAX_PHOTO_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_COVER_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_COVERS = 10;

/* ================== TYPES ================== */
type PreviewFile = {
  file: File;
  preview: string;
};

export default function AuthorsFormPageEn() {
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
      setError("The author’s photo is too large. Please choose an image under 5 MB.");
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
        setError(`The cover “${file.name}” is too large (maximum 5 MB).`);
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
      setError("Please add an author photo.");
      return;
    }

    if (covers.length === 0) {
      setError("Please add at least one book cover.");
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
          "The files are too large to be uploaded. Please reduce the image size and try again."
        );
      } else {
        setError("An error occurred while submitting the form. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  /* ================== RENDER ================== */

  return (
    <div className="content-page authors-form-page" dir="ltr">
      <Link href="/en" className="back-link">
        ← Back to home
      </Link>

      {/* Error message */}
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
          <h1 className="subscribe-title">Author Registration Form</h1>

          <form onSubmit={handleSubmit} className="authors-form">
            <div className="authors-form-box">

              {/* Name */}
              <div className="form-row">
                <input name="first_name" placeholder="First name" required />
                <input name="last_name" placeholder="Last name" required />
              </div>

              {/* Email / Phone */}
              <div className="form-row">
                <input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  required
                />
                <input name="phone" placeholder="Phone number" required />
              </div>

              {/* Country */}
              <div className="form-row full">
                <input name="country" placeholder="Country of residence" required />
              </div>

              {/* Bio */}
              <div className="form-row full">
                <textarea
                  name="bio"
                  placeholder="Short biography"
                  required
                />
              </div>

              {/* Mobile hint */}
              <p style={{ fontSize: "14px", opacity: 0.8, marginBottom: "10px" }}>
                📱 Note: Photos taken with a mobile phone are often large.
                Please use images under 5 MB.
              </p>

              {/* PHOTO */}
              <div className="upload-box">
                📷 Author photo (up to 5 MB)
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
                    alt="author photo"
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
                      ✖ Remove
                    </button>
                  </div>
                </div>
              )}

              {/* COVERS */}
              <div className="upload-box">
                📎 Book covers (up to 10 – 5 MB each)
                <input
                  type="file"
                  name="covers"
                  accept="image/*"
                  multiple
                  onChange={handleCoversChange}
                />
              </div>

              {covers.length > 0 && (
                <div
                  className="preview-grid"
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    marginTop: "10px",
                  }}
                >
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

              {/* Submit */}
              <div className="authors-submit">
                <button type="submit" disabled={loading}>
                  {loading ? "⏳ Submitting… please wait" : "Submit the form"}
                </button>
              </div>

            </div>
          </form>
        </>
      ) : (
        <h2 className="subscribe-title">
          The form has been successfully submitted
        </h2>
      )}
    </div>
  );
}



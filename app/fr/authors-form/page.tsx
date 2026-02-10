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

export default function AuthorsFormPageFr() {
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
      setError("La photo de l’auteur·e est trop lourde. Veuillez choisir une image de moins de 5 Mo.");
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
        setError(`La couverture « ${file.name} » est trop lourde (maximum 5 Mo).`);
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
      setError("Veuillez ajouter une photo de l’auteur·e.");
      return;
    }

    if (covers.length === 0) {
      setError("Veuillez ajouter au moins une couverture de livre.");
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
          "Les fichiers sont trop volumineux pour être envoyés. Veuillez réduire la taille des images et réessayer."
        );
      } else {
        setError("Une erreur est survenue lors de l’envoi du formulaire. Veuillez réessayer.");
      }
    } finally {
      setLoading(false);
    }
  }

  /* ================== RENDER ================== */

  return (
    <div className="content-page authors-form-page" dir="ltr">
      <Link href="/fr" className="back-link">
        ← Retour à la page d’accueil
      </Link>

      {/* Message d’erreur */}
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
          <h1 className="subscribe-title">Formulaire auteur·e</h1>

          <form onSubmit={handleSubmit} className="authors-form">
            <div className="authors-form-box">

              {/* Nom */}
              <div className="form-row">
                <input name="first_name" placeholder="Prénom" required />
                <input name="last_name" placeholder="Nom" required />
              </div>

              {/* Email / Téléphone */}
              <div className="form-row">
                <input
                  name="email"
                  type="email"
                  placeholder="Adresse courriel"
                  required
                />
                <input name="phone" placeholder="Numéro de téléphone" required />
              </div>

              {/* Pays */}
              <div className="form-row full">
                <input name="country" placeholder="Pays de résidence" required />
              </div>

              {/* Bio */}
              <div className="form-row full">
                <textarea
                  name="bio"
                  placeholder="Brève biographie"
                  required
                />
              </div>

              {/* Indication mobile */}
              <p style={{ fontSize: "14px", opacity: 0.8, marginBottom: "10px" }}>
                📱 Les photos prises avec un téléphone sont souvent volumineuses.
                Veuillez utiliser des images de moins de 5 Mo.
              </p>

              {/* PHOTO */}
              <div className="upload-box">
                📷 Photo de l’auteur·e (jusqu’à 5 Mo)
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
                      ✖ Supprimer
                    </button>
                  </div>
                </div>
              )}

              {/* COVERS */}
              <div className="upload-box">
                📎 Couvertures de livres (jusqu’à 10 – 5 Mo chacune)
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

              {/* Envoi */}
              <div className="authors-submit">
                <button type="submit" disabled={loading}>
                  {loading ? "⏳ Envoi en cours… veuillez patienter" : "Envoyer le formulaire"}
                </button>
              </div>

            </div>
          </form>
        </>
      ) : (
        <h2 className="subscribe-title">
          Le formulaire a été envoyé avec succès
        </h2>
      )}
    </div>
  );
}



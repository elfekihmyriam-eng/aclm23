"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";


export default function SupportPageFr() {
  return (
    <>
      <Header />

      <main className="support-page" dir="ltr">
        {/* Retour */}
        <div className="back-link">
          <a href="/fr">← Retour à la page d’accueil</a>
        </div>

        {/* Titre */}
        <h1 className="support-title">Soutenir l’association</h1>

        <p className="support-intro">
          Votre soutien contribue à renforcer la présence de la littérature
          migrante et à appuyer les écrivaines, écrivains et initiatives
          culturelles portés par l’association.
        </p>

        {/* Formulaire */}
        <form className="support-form">
          {/* Type de donateur */}
          <div className="form-row">
            <select required>
              <option value="">Choisir le profil du donateur</option>
              <option value="individual">Particulier</option>
              <option value="company">Organisation / Entreprise</option>
            </select>
          </div>

          {/* Informations personnelles */}
          <div className="form-row">
            <input
              type="text"
              placeholder="Prénom"
              required
            />
            <input
              type="text"
              placeholder="Nom"
              required
            />
          </div>

          {/* Informations organisation */}
          <div className="form-row">
            <input
              type="text"
              placeholder="Nom de l’organisation / entreprise"
              required
            />
            <input
              type="text"
              placeholder="Adresse de l’organisation"
              required
            />
          </div>

          <div className="form-row">
            <input
              type="tel"
              placeholder="Numéro de téléphone"
              required
            />
            <input
              type="email"
              placeholder="Adresse courriel"
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
            Vous serez redirigé·e vers PayPal pour finaliser votre soutien
            (carte bancaire ou compte PayPal).
          </p>

          {/* Bouton PayPal */}
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
            Payer via PayPal
          </a>
        </div>
      </main>

      <Footer />
    </>
  );
}


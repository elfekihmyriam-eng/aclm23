"use client";

import HeaderEn from "../components/HeaderEn";
import FooterEn from "../components/FooterEn";

export default function SupportPageEn() {
  return (
    <>
      <HeaderEn />

      <main className="support-page" dir="ltr">
        {/* Back */}
        <div className="back-link">
          <a href="/en">← Back to home</a>
        </div>

        {/* Title */}
        <h1 className="support-title">Support the Association</h1>

        <p className="support-intro">
          Your support helps strengthen the presence of migrant literature and
          supports the writers and cultural initiatives carried by the
          association.
        </p>

        {/* Form */}
        <form className="support-form">
          {/* Donor type */}
          <div className="form-row">
            <select required>
              <option value="">Select donor profile</option>
              <option value="individual">Individual</option>
              <option value="company">Organization / Company</option>
            </select>
          </div>

          {/* Personal information */}
          <div className="form-row">
            <input
              type="text"
              placeholder="First name"
              required
            />
            <input
              type="text"
              placeholder="Last name"
              required
            />
          </div>

          {/* Organization information */}
          <div className="form-row">
            <input
              type="text"
              placeholder="Organization / Company name"
              required
            />
            <input
              type="text"
              placeholder="Organization address"
              required
            />
          </div>

          <div className="form-row">
            <input
              type="tel"
              placeholder="Phone number"
              required
            />
            <input
              type="email"
              placeholder="Email address"
              required
            />
          </div>
        </form>

        {/* Payment block */}
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
            You will be redirected to PayPal to complete your support
            (credit/debit card or PayPal account).
          </p>

          {/* PayPal button */}
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
            Pay via PayPal
          </a>
        </div>
      </main>

      <FooterEn />
    </>
  );
}



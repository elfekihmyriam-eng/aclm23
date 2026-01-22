"use client";

import { useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { PayPalButtons } from "@paypal/react-paypal-js";

export default function SubscribePage() {
  const [plan, setPlan] = useState<"monthly" | "yearly">("monthly");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const isFormValid =
    form.firstName &&
    form.lastName &&
    form.email &&
    form.phone;

  return (
    <>
      <Header />

      <main className="subscribe-page">
        {/* RETOUR */}
        <div className="back-link">
          <a href="/ar">← العودة إلى الصفحة الرئيسيّة</a>
        </div>

        {/* TITRE */}
        <h1 className="subscribe-title">الاشتراك</h1>

        <p className="subscribe-intro">
          يرجى ملء الاستمارة ثم اختيار نوع الاشتراك.
        </p>

        {/* ===== FORMULAIRE ===== */}
        <form className="subscribe-form">
          <div className="form-row">
            <input
              type="text"
              placeholder="الاسم"
              required
              value={form.firstName}
              onChange={(e) =>
                setForm({ ...form, firstName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="اللقب"
              required
              value={form.lastName}
              onChange={(e) =>
                setForm({ ...form, lastName: e.target.value })
              }
            />
          </div>

          <div className="form-row">
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              required
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
            <input
              type="tel"
              placeholder="رقم الهاتف"
              required
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />
          </div>
        </form>

        {/* ===== CHOIX DU PLAN ===== */}
        <div className="plans">
          <div
            className={plan === "monthly" ? "plan active" : "plan"}
            role="button"
            tabIndex={0}
            onClick={() => setPlan("monthly")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setPlan("monthly");
            }}
          >
            <strong>اشتراك شهري</strong>
            <span>15 $</span>
          </div>

          <div
            className={plan === "yearly" ? "plan active" : "plan"}
            role="button"
            tabIndex={0}
            onClick={() => setPlan("yearly")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setPlan("yearly");
            }}
          >
            <strong>اشتراك سنوي</strong>
            <span>80 $</span>
          </div>
        </div>

        {/* ===== PAYPAL ===== */}
        <div className="payment-box">
          {!isFormValid && (
            <p className="form-warning">
              يرجى ملء جميع الحقول قبل الدفع
            </p>
          )}

          {isFormValid && (
            <div style={{ marginTop: "30px" }}>
              <PayPalButtons
                key={plan} // 🔴 force le re-render quand le plan change
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                  const amount =
                    plan === "monthly" ? "15.00" : "80.00";

                  return actions.order.create({
                    purchase_units: [
                      {
                        description:
                          plan === "monthly"
                            ? "Abonnement mensuel – ACLM"
                            : "Abonnement annuel – ACLM",
                        amount: {
                          currency_code: "USD",
                          value: amount,
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order!.capture().then(() => {
                    alert(
                      plan === "monthly"
                        ? "Paiement mensuel effectué avec succès ✅"
                        : "Paiement annuel effectué avec succès ✅"
                    );
                  });
                }}
                onError={(err) => {
                  console.error("PayPal error:", err);
                  alert("Erreur PayPal. Merci de réessayer.");
                }}
              />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}


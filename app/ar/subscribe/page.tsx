"use client";

import { useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { PayPalButtons } from "@paypal/react-paypal-js";

export default function SubscribePage() {
  const [plan, setPlan] = useState<"monthly" | "yearly">("monthly");

  // champs formulaire
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
            onClick={() => setPlan("monthly")}
          >
            <strong>اشتراك شهري</strong>
            <span>15 $</span>
          </div>

          <div
            className={plan === "yearly" ? "plan active" : "plan"}
            onClick={() => setPlan("yearly")}
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
            <PayPalButtons
              style={{ layout: "vertical" }}
              createSubscription={(data, actions) => {
                if (!actions.subscription) {
                  return Promise.reject("Subscriptions not supported");
                }

                return actions.subscription.create({
                  // ⚠️ REMPLACE PAR TES VRAIS PLAN IDs PAYPAL
                  plan_id:
                    plan === "monthly"
                      ? "P-MONTHLY_PLAN_ID"
                      : "P-YEARLY_PLAN_ID",
                });
              }}
              onApprove={(data) => {
                return Promise.resolve().then(() => {
                  alert("تم تفعيل الاشتراك بنجاح ✅");

                  console.log("SUBSCRIPTION:", {
                    subscriptionId: data.subscriptionID,
                    plan,
                    ...form,
                  });
                });
              }}
              onError={(err) => {
                console.error("PayPal error:", err);
                alert("حدث خطأ أثناء تفعيل الاشتراك");
              }}
            />
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

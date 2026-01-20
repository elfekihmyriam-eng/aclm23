"use client";

import { useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { PayPalButtons } from "@paypal/react-paypal-js";

export default function SubscribePage() {
  const [plan, setPlan] = useState<"monthly" | "yearly">("monthly");

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
          يرجى ملء الاستمارة أدناه ثم اختيار نوع الاشتراك المناسب.
        </p>

        {/* ===== FORMULAIRE ===== */}
        <form className="subscribe-form">
          <div className="form-row">
            <input type="text" placeholder="الاسم" required />
            <input type="text" placeholder="اللقب" required />
          </div>

          <div className="form-row">
            <input type="email" placeholder="البريد الإلكتروني" required />
            <input type="tel" placeholder="رقم الهاتف" required />
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

        {/* ===== PAYPAL ABONNEMENT ===== */}
        <div className="payment-box">
          <PayPalButtons
            style={{ layout: "vertical", color: "black" }}
            createSubscription={(data, actions) => {
              return actions.subscription.create({
                plan_id:
                  plan === "monthly"
                    ? "PLAN_MENSUEL_ID_ICI"
                    : "PLAN_ANNUEL_ID_ICI",
              });
            }}
onApprove={(data): Promise<void> => {
  return Promise.resolve().then(() => {
    alert("تم تفعيل الاشتراك بنجاح ✅");
    console.log("Subscription ID:", data.subscriptionID);
  });
}}


            onError={(err) => {
              console.error("PayPal error:", err);
              alert("حدث خطأ أثناء تفعيل الاشتراك");
            }}
          />
        </div>
      </main>

      <Footer />
    </>
  );
}


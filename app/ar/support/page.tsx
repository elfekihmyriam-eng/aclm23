"use client";

import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

declare global {
  interface Window {
    paypal: any;
  }
}

export default function SupportPage() {
  const [amount, setAmount] = useState(25);

  useEffect(() => {
    const scriptId = "paypal-sdk";

    if (document.getElementById(scriptId)) {
      renderButtons();
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`;
    script.async = true;

    script.onload = () => {
      renderButtons();
    };

    document.body.appendChild(script);

    function renderButtons() {
      if (!window.paypal) return;

      window.paypal
        .Buttons({
          style: {
            layout: "vertical",
          },
          createOrder: (_data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount.toFixed(2),
                  },
                },
              ],
            });
          },
          onApprove: () => {
            alert("تمّت عملية الدعم بنجاح ✅");
          },
          onError: (err: any) => {
            console.error("PayPal error", err);
            alert("حدث خطأ أثناء عملية الدفع");
          },
        })
        .render("#paypal-button-container");
    }
  }, [amount]);

  return (
    <>
      <Header />

      <main className="support-page">
        {/* Retour */}
        <div className="back-link">
          <a href="/ar">← العودة إلى الصفحة الرئيسيّة</a>
        </div>

        {/* Titre */}
        <h1 className="support-title">شكرًا لدعمكم</h1>

        <p className="support-intro">
          يساهم دعمكم في تعزيز حضور الأدب المهجريّ،
          ودعم الكتّاب والمبادرات الثقافيّة التي تشرف عليها الجمعيّة.
        </p>

        {/* Formulaire */}
        <form className="support-form">
          <div className="form-row">
            <input type="text" placeholder="الاسم (اختياري)" />
            <input type="text" placeholder="اللقب (اختياري)" />
          </div>

          <div className="form-row">
            <input type="email" placeholder="البريد الإلكتروني (اختياري)" />
            <input type="tel" placeholder="رقم الهاتف (اختياري)" />
          </div>
        </form>

        {/* Choix du montant */}
        <section className="amount-section">
          <h2 className="amount-title">اختيار مبلغ الدعم</h2>

          <div className="amount-options">
            {[10, 25, 50, 100].map((value) => (
              <button
                key={value}
                type="button"
                className={amount === value ? "amount-btn active" : "amount-btn"}
                onClick={() => setAmount(value)}
              >
                {value} $
              </button>
            ))}
          </div>

          <input
            type="number"
            className="custom-amount"
            min={1}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </section>

        {/* PayPal */}
        <div className="payment-box">
          <p className="payment-note">
            سيتم تحويلكم إلى بايبال لإتمام عملية الدفع
            (بطاقة بنكيّة أو حساب بايبال).
          </p>

          <div
            id="paypal-button-container"
            style={{ marginTop: 30 }}
          />
        </div>
      </main>

      <Footer />
    </>
  );
}


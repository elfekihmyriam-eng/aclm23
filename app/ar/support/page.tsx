"use client";

import { useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { PayPalButtons } from "@paypal/react-paypal-js";

export default function SupportPage() {
  const [amount, setAmount] = useState<number>(25);

  return (
    <>
      <Header />

      <main className="support-page">
        {/* RETOUR */}
        <div className="back-link">
          <a href="/ar">← العودة إلى الصفحة الرئيسيّة</a>
        </div>

        {/* TITRE */}
        <h1 className="support-title">شكرًا لدعمكم</h1>

        <p className="support-intro">
          يساهم دعمكم في تعزيز حضور الأدب المهجريّ،
          ودعم الكتّاب والمبادرات الثقافيّة التي تشرف عليها الجمعيّة.
        </p>

        {/* FORMULAIRE */}
        <form className="support-form">
          <div className="form-row">
            <input type="text" placeholder="الاسم" required />
            <input type="text" placeholder="اللقب" required />
          </div>

          <div className="form-row">
            <input type="email" placeholder="البريد الإلكتروني" required />
            <input type="tel" placeholder="رقم الهاتف" />
          </div>

          <div className="form-row">
            <input
              type="text"
              placeholder="اسم المؤسّسة (اختياري)"
            />
          </div>

          {/* CHOIX DU MONTANT */}
          <div className="amount-section">
            <h2 className="amount-title">اختيار مبلغ الدعم</h2>

            <div className="amount-options">
              {[10, 25, 50, 100].map((value) => (
                <button
                  type="button"
                  key={value}
                  className={
                    amount === value ? "amount-btn active" : "amount-btn"
                  }
                  onClick={() => setAmount(value)}
                >
                  {value} $
                </button>
              ))}
            </div>

            <input
              type="number"
              className="custom-amount"
              placeholder="أو أدخل مبلغًا آخر"
              value={amount}
              min={1}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>

          {/* PAIEMENT PAYPAL */}
          <div className="payment-box">
            <p className="payment-note">
              سيتم تحويلكم إلى بايبال لإتمام عملية الدفع
              (بطاقة بنكيّة أو حساب بايبال).
            </p>

            {amount > 0 && (
              <PayPalButtons
                style={{ layout: "vertical", color: "black" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: amount.toFixed(2),
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then(() => {
                    alert("شكرًا جزيلًا لدعمكم 🙏");
                  });
                }}
                onError={(err) => {
                  console.error("PayPal error:", err);
                  alert("حدث خطأ أثناء عملية الدفع. يرجى المحاولة مرة أخرى.");
                }}
              />
            )}
          </div>
        </form>
      </main>

      <Footer />
    </>
  );
}


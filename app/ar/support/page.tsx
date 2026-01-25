"use client";

import { PayPalButtons } from "@paypal/react-paypal-js";

export default function SupportPage() {
  return (
    <div style={{ padding: 40 }}>
      <h1>TEST PAYPAL</h1>

      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) =>
          actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: "5.00",
                },
              },
            ],
          })
        }
      />
    </div>
  );
}

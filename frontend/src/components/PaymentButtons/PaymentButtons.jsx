import {
    PayPalButtons,
    PayPalScriptProvider,
    usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../../hooks/useCart";
import { useLoading } from "../../hooks/useLoading";
import { pay } from "../../services/orderService";

export default function PaymentButtons({ order }) {
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "AawTp_BLkHrAEqenYrYLf8oEUHXeH5YRC-OkbpiopoYJPq6lBNiWTrVQahEy1vIofAPLH8_y6q_zU6O2",
      }}
    >
      <Buttons order={order} />
    </PayPalScriptProvider>
  );
}

function Buttons({ order }) {
  const [{ isPending }] = usePayPalScriptReducer();
  const { showLoading, hideLoading } = useLoading();
  const { clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    isPending ? showLoading() : hideLoading();
  });

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: order.totalPrice,
          },
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    try {
      const payment = await actions.order.capture();
      const orderId = await pay(payment.id);
      clearCart();
      toast("payment successful", "Success");
      console.log("orderId: "+orderId);
      navigate(`/track/${orderId}`);
    } catch (error) {
      toast.error("Payment Save Failed", "Error");
    }
  };

  const onError = (err) => {
    toast.error("Payment Failed", "Error");
  };

  return (
    <PayPalButtons
      createOrder={createOrder}
      onApprove={onApprove}
      onError={onError}
    />
  );
}

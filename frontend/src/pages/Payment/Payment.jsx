import React, { useEffect, useState } from "react";
import Title from "../../components/Title/Title";
import classes from "./payment.module.css";
import OrderItemList from "../../components/OrderItemList/OrderItemList";
import PaymentButtons from "../../components/PaymentButtons/PaymentButtons";
const { getNewOrderForCurrentUser } = require("../../services/orderService");

export default function Payment() {
  const [order, setOrder] = useState();

  useEffect(() => {
    getNewOrderForCurrentUser().then((data) => setOrder(data));
  }, []);

  if (!order) return;

  return (
    <>
      <div className={classes.container}>
        <div className={classes.content}>
          <Title title="Order" fontSize="1.6rem" />
          <div className={classes.summary}>
            <div>
              <h3>Name: </h3>
              <span>{order.name}</span>
            </div>
            <div>
              <h3>Address: </h3>
              <span>{order.address}</span>
            </div>
          </div>
          <OrderItemList order={order} />
        </div>
        <div className={classes.buttons_container}>
          <div className={classes.buttons}>
          <PaymentButtons order={order} />
          </div>
        </div>
      </div>
    </>
  );
}

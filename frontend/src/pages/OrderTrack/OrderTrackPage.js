import React, {useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { trackOrderbyId } from "../../services/orderService";
import NotFound from "../../components/NotFound/NotFound";
import classes from './orderTrackPage.module.css'
import DateTime from '../../components/DateTime/DateTime'
import OrderItemList from '../../components/OrderItemList/OrderItemList';

export default function OrderTrackPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState();

  useEffect(() => {
    orderId &&
      trackOrderbyId(orderId).then((order) => {
        setOrder(order);
      });
  }, []);

  if(!orderId) {
    return <NotFound message="You ordered nothing!" linkText="Lets order"/>
  }
  return (
    order && (
      <div className={classes.container}>
        <div className={classes.content}>
          <h1>Order #{order.id}</h1>
          <div className={classes.header}>
            <div>
              <strong>Date</strong>
              <DateTime date={order.createdAt} />
            </div>
            <div>
              <strong>Name</strong>
              {order.name}
            </div>
            <div>
              <strong>Address</strong>
              {order.address}
            </div>
            <div>
              <strong>State</strong>
              {order.status}
            </div>
            {order.paymentId && (
              <div>
                <strong>Payment ID</strong>
                {order.paymentId}
              </div>
            )}
          </div>

          <OrderItemList order={order} />
        </div>
        {order.status === 'NEW' && (
          <div className={classes.payment}>
            <Link to="/payment">Go To Payment</Link>
          </div>
        )}
      </div>
    )
  );
}

import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createOrder } from "../../services/orderService";
import classes from "./checkoutPage.module.css";
import Title from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import OrderItemList from "../../components/OrderItemList/OrderItemList";
import Map from "../../components/Map/Map";

export default function CheckoutPage() {
  const { user } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const [order, setOrder] = useState({ ...cart });
  const [address, setAddress] = useState(user.address || "");

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm();

  const submit = async (data) => {
    // console.log(order);
    // if (order.address == null) {
    //   toast.warning("Please select your location");
    //   return;
    // }

    await createOrder({ ...order, name: user.name, address: data.address });
    navigate("/payment");
  };

  const handleAddressChange = (newAddress) => {
    setAddress(newAddress);
    setValue("address", newAddress);
    setOrder({ ...order, address: address });
  };

  return (
    <>
      <form className={classes.container} onSubmit={handleSubmit(submit)}>
        <div className={classes.content}>
          <Title title="Order Form" fontSize="1.6rem" />
          <div className={classes.inputs}>
            <Input
              defaultValue={user.name}
              label="Name"
              {...register("name")}
              error={errors.name}
            />
            <Input
              defaultValue={user.address}
              label="Delivery Address"
              {...register("address")}
              error={errors.address}
            />
          </div>
          <OrderItemList order={order} />
        </div>
        <div>
          <Title title="Choose your location" fontSize="1.6rem" />
          <Map
            location={order.address}
            onChange={handleAddressChange}
          />
        </div>
        <div className={classes.button_container}>
          <div className={classes.buttons}>
            <Button
              type="submit"
              text="Go to Payment"
              width="100%"
              height="3rem"
            />
          </div>
        </div>
      </form>
    </>
  );
}

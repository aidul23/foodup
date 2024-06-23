import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import classes from "./registerPage.module.css";
import Title from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

export default function RegisterPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const { user } = auth;
  const [params] = useSearchParams();
  const returnUrl = params.get("returnUrl");

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!user) return;

    returnUrl ? navigate(returnUrl) : navigate("/");
  }, [user]);

  const submit = async (data) => {
    await auth.register(data);
  };

  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <Title title="Register" />
        <form onSubmit={handleSubmit(submit)} noValidate>
          <Input
            type="text"
            label="Name"
            {...register("name", {
              required: true,
            })}
            error={errors.name}
          />

          <Input
            type="email"
            label="Email"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,63}$/i,
                message: "Email is not valid",
              },
            })}
            error={errors.email}
          />

          <Input
            type="password"
            label="Password"
            {...register("password", {
              required: true,
              minLength: 6,
            })}
            error={errors.password}
          />

          <Input
            type="password"
            label="Confirm Password"
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value !== getValues("password")
                  ? "password is not matched"
                  : true,
            })}
            error={errors.confirmPassword}
          />

          <Input
            type="text"
            label="Address"
            {...register("address", {
              required: true,
            })}
            error={errors.address}
          />

          <Button type="submit" text="Register" />

          <div className={classes.register}>
            Already Register? &nbsp;
            <Link to={`/login${returnUrl ? "?returnUrl=" + returnUrl : ""}`}>
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

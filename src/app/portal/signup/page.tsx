"use client";

import { Button, Field, Input, Label } from "@headlessui/react";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/use-auth.hook";
import { FcGoogle } from "react-icons/fc";
import withPublic from "@/HOC/public.route";
import Link from "next/link";

type TSignupForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

function SignupPage() {
  const { signUp, signInWithGoogle } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignupForm>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    reValidateMode: "onChange",
  });

  async function onSubmit(values: TSignupForm) {
    await signUp(values.email, values.password);
  }

  return (
    <div className="flex flex-col max-w-md mx-auto px-4">
      <div className="py-6">
        <h1 className="text-xl md:text-2xl font-extrabold line-clamp-2 flex flex-col gap-1 mb-2">
          Get Started - Sign Up for Free!
        </h1>
        <p className="text-slate-500 dark:text-white/70">
          Ready to plan smarter?
        </p>
        <p className="text-slate-500 dark:text-white/70">
          Sign up now and start voting in seconds.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Field>
          <Label htmlFor="email" className="text-sm/6 font-medium">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Your best email"
            autoComplete="username"
            {...register("email", {
              required: "Email is required.",
            })}
            className={classNames(
              "mt-1 block w-full rounded-lg border-none dark:bg-neutral-800 bg-slate-200 py-2.5 px-3 text-sm/6 dark:text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 dark:data-[focus]:outline-white/25 data-[focus]:outline-slate-400"
            )}
          />
          {!!errors.email && (
            <p role="alert" className="text-red-500 text-xs mt-1">
              {errors.email.message}
            </p>
          )}
        </Field>
        <Field>
          <Label htmlFor="password" className="text-sm/6 font-medium">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            autoComplete="current-password"
            {...register("password", {
              required: "Password is required.",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long.",
              },
            })}
            className={classNames(
              "mt-1 block w-full rounded-lg border-none dark:bg-neutral-800 bg-slate-200 py-2.5 px-3 text-sm/6 dark:text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 dark:data-[focus]:outline-white/25 data-[focus]:outline-slate-400"
            )}
          />
          {!!errors.password && (
            <p role="alert" className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </Field>
        <Field>
          <Label htmlFor="confirm-password" className="text-sm/6 font-medium">
            Confirm Password
          </Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="********"
            autoComplete="current-password"
            {...register("confirmPassword", {
              required: "Password confirmation is required.",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long.",
              },
              validate: (value, values) =>
                value === values.password || "Passwords do not match.",
            })}
            className={classNames(
              "mt-1 block w-full rounded-lg border-none dark:bg-neutral-800 bg-slate-200 py-2.5 px-3 text-sm/6 dark:text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 dark:data-[focus]:outline-white/25 data-[focus]:outline-slate-400"
            )}
          />
          {!!errors.confirmPassword && (
            <p role="alert" className="text-red-500 text-xs mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </Field>
        <Button
          type="submit"
          className="w-full rounded-md bg-teal-600 py-2.5 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[hover]:bg-teal-700 data-[open]:bg-teal-700 data-[focus]:outline-1 data-[focus]:outline-white"
        >
          Sign Up
        </Button>
        <Button
          type="button"
          onClick={signInWithGoogle}
          className="w-full flex justify-center gap-2 rounded-md bg-red-500 py-2.5 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[hover]:bg-red-600 data-[open]:bg-red-600 data-[focus]:outline-1 data-[focus]:outline-white"
        >
          <FcGoogle className="size-6 bg-white rounded-full" />
          <span>Sign up with Google</span>
        </Button>
        <Field>
          <p className="text-sm/6 font-medium w-full text-center block">
            Already have an account?{" "}
            <Link
              href="/portal/login"
              className="text-teal-600 hover:text-teal-700"
            >
              Sign in now!
            </Link>
          </p>
        </Field>
      </form>
    </div>
  );
}

export default withPublic(SignupPage);

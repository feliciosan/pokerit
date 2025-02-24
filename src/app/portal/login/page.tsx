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
};

function LoginPage() {
  const { signIn, signInWithGoogle } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignupForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    reValidateMode: "onChange",
  });

  async function onSubmit(values: TSignupForm) {
    await signIn(values.email, values.password);
  }

  return (
    <div className="flex flex-col max-w-md mx-auto px-4">
      <div className="py-6">
        <h1 className="text-xl md:text-2xl font-extrabold line-clamp-2 flex flex-col gap-1 mb-2">
          Log in now to get started!
        </h1>
        <p className="text-slate-500 dark:text-white/70">
          Create and manage free planning rooms in seconds.
        </p>
        <p className="text-slate-500 dark:text-white/70">
          Plan Smarter, Vote Faster!
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
        <Button
          type="submit"
          className="w-full rounded-md bg-teal-600 py-2.5 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[hover]:bg-teal-700 data-[open]:bg-teal-700 data-[focus]:outline-1 data-[focus]:outline-white"
        >
          Sign In
        </Button>
        <Button
          type="button"
          onClick={signInWithGoogle}
          className="w-full flex justify-center gap-2 rounded-md bg-red-500 py-2.5 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[hover]:bg-red-600 data-[open]:bg-red-600 data-[focus]:outline-1 data-[focus]:outline-white"
        >
          <FcGoogle className="size-6 bg-white rounded-full" />
          <span>Sign in with Google</span>
        </Button>
        <Field>
          <p className="text-sm/6 font-medium w-full text-center block">
            New here?{" "}
            <Link
              href="/portal/signup"
              className="text-teal-600 hover:text-teal-700"
            >
              Sign up now!
            </Link>
          </p>
        </Field>
      </form>
    </div>
  );
}

export default withPublic(LoginPage);

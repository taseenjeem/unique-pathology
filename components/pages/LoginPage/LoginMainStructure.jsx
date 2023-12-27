"use client";
import React, { useState } from "react";
import { Button, Divider, Input } from "@nextui-org/react";
import { IoEye, IoEyeOff, IoLogoGoogle } from "react-icons/io5";
import Link from "next/link";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Loading from "@/components/utilities/Loading";
import app from "@/providers/firebase.init";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LoginMainStructure = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    setIsLoading(true);

    const auth = getAuth(app);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      if (result.user) {
        router.push("/");
        setIsLoading(false);
        toast.success("Login Successful!");
      }
    } catch (error) {
      if (error.message === "Firebase: Error (auth/invalid-credential).") {
        setIsLoading(false);
        toast.error("User not found! Try again");
      } else {
        setIsLoading(false);
        console.error("Login failed:", error);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="min-h-screen gradient-bg">
          <div className="wrapper w-full min-h-[90vh] flex items-center justify-center">
            <div className="bg-white p-5 max-w-md w-full rounded-lg shadow-lg">
              <h4 className="text-center font-semibold text-primary">
                Welcome back!
              </h4>
              <Divider className="my-2 w-20 mx-auto" />
              <h1 className="text-center text-2xl font-bold text-primary">
                Unique Pathology <br />
                Customer Portal
              </h1>
              <form className="mt-5" onSubmit={handleSubmit}>
                <Input
                  color="primary"
                  type="email"
                  variant="underlined"
                  label="Email"
                  name="email"
                  autoComplete={false}
                  className="max-w-md w-full"
                  isRequired
                />

                <Input
                  color="primary"
                  type={isVisible ? "text" : "password"}
                  variant="underlined"
                  label="Password"
                  className="w-full max-w-md"
                  name="password"
                  isRequired
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => setIsVisible(!isVisible)}
                    >
                      {isVisible ? (
                        <IoEye className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <IoEyeOff className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                />
                <span className="flex justify-between mt-2">
                  <Link
                    href="/reset-password"
                    className="text-xs font-semibold hover:underline text-right"
                  >
                    Forgot Password?
                  </Link>
                </span>

                <Button
                  type="submit"
                  color="primary"
                  className="text-white font-semibold mt-5 w-full"
                >
                  Log In
                </Button>
              </form>
              <span className="relative flex justify-center my-5">
                <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-primary to-transparent opacity-75"></div>

                <span className="relative z-10 bg-white px-6 font-semibold text-primary">
                  OR
                </span>
              </span>

              <Button
                color="primary"
                variant="bordered"
                className="text-primary font-semibold w-full"
              >
                <span className="flex items-center gap-2">
                  <IoLogoGoogle className="text-xl" />
                  Continue with Google
                </span>
              </Button>

              <p className="text-sm text-center mt-5">
                Do not have an account? Then{" "}
                <Link
                  href="/create-a-new-account"
                  className="underline underline-offset-2 font-semibold"
                >
                  create an account
                </Link>
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default LoginMainStructure;

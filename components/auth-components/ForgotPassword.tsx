"use client";
import { ForgotPasswordRequest } from "@/app/services/auth-service/auth.request";
import BrandLogo from "@/public/assets/alive-home-logo.png";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import * as yup from "yup";
import Image from "next/image";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email(" Invalid Email format"),
});

export default function ForgotPassword() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // REACT HOOK FORM LOGIC
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  //Forgot Password User submission Logic
  const onSubmitHandler = async (data: any) => {
    setIsLoading(true);
    const body = {
      email: data?.email,
    };
    try {
      const response = await ForgotPasswordRequest(body);
      toast.success(response?.data?.message);
      setTimeout(() => {
        router.push("/login");
      }, 5000);
    } catch (error: any) {
      console.log(error, "this is error here===");
      toast.error(error?.response?.data?.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-[#FDFDFD] overflow-y-scroll w-full md:w-1/2 h-full pt-10 pb-20 px-6 lg:p-20">
        <Link href="/" className="flex items-center relative w-20 h-10">
          <Image
            src={BrandLogo}
            alt="Alive Home brand logo"
            width={100}
            height={100}
            priority
            className="object-contain absolute"
          />
        </Link>
        <div className="px- w-ful max-w-[540px] mx-auto mt-14">
          <p className="text-[24px] text-[#141414] font-bold">
            Forgot Password
          </p>
          <p className="text-[#7C8898]">Kindly enter your email</p>

          <form onSubmit={handleSubmit(onSubmitHandler)}>
            {/* =======Email ===== */}
            <div className="mt-4">
              <label htmlFor="email" className="text-base">
                Email
              </label>
              <input
                type="email"
                placeholder="E-mail"
                {...register("email")}
                maxLength={40}
                className={`${
                  errors.email
                    ? "border-red-500 bg-[#FEF3F2]"
                    : "border-[#E9EDF0]"
                } p-3 border-[1.3px] focus:outline-none placeholder:text-sm cursor-text flex justify-between rounded-3xl w-full`}
              />
            </div>
            <button
              disabled={isLoading}
              className="px-8 py-3 cursor-pointer  mt-8 bg-[#C77D01] hover:bg-[#C77D01]/90 text-[16px] text-white rounded-3xl w-full  transition duration-500 ease-in-out"
            >
              {isLoading ? (
                <Loader className="size-6 animate-spin mx-auto" />
              ) : (
                "Proceed"
              )}
            </button>
          </form>

          {/* ====== Don't have an account ======  */}
          {/* ====== Don't have an account ======  */}
          <div className="mt-4 text-center text-sm">
            <p>
              Don&apos;t have an account?
              <Link
                href="/signup"
                className="ml-2 font-semibold text-[#C77D01]"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

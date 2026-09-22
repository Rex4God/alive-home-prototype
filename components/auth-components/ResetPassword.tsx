"use client";
import { ResetPasswordRequest } from "@/app/services/auth-service/auth.request";
import BrandLogo from "@/public/assets/alive-home-logo.png";
import { yupResolver } from "@hookform/resolvers/yup";
import { BiHide, BiShow } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import * as yup from "yup";

interface ResetPasswordProps {
  token: string;
  userId: string;
}

const schema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password must not exceed 15 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .min(6, "Confirm Password must be at least 6 characters")
    .max(32, "Confirm Password must not exceed 15 characters"),
});

export default function ResetPassword({ token, userId }: ResetPasswordProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // REACT HOOK FORM LOGIC
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  //Reset Password User submission Logic
  const onSubmitHandler = async (data: any) => {
    setIsLoading(true);
    if (data?.password !== data?.confirmPassword) {
      toast.error("Password does not match");
      setIsLoading(false);
      return;
    }
    const body = {
      password: data?.password,
    };
    try {
      const response = await ResetPasswordRequest(body, token, userId);
      toast.success(response?.message || "Reset Password successful");
      setTimeout(() => {
        router.push("/login");
      }, 5000);
    } catch (error: any) {
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
          <p className="text-[#7C8898]">Enter a new password</p>

          <form onSubmit={handleSubmit(onSubmitHandler)}>
            {/* =======  Password ======== */}
            <div className="mt-4 relative">
              <div>
                <label htmlFor="password" className="text-base">
                  Password
                </label>
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  placeholder="New Password"
                  {...register("password")}
                  maxLength={32}
                  className={`${
                    errors.password
                      ? "border-red-500 bg-[#FEF3F2]"
                      : "border-[#E9EDF0]"
                  } pr-12 pl-3 py-3 border-[1.3px] focus:outline-none placeholder:text-sm cursor-text flex justify-between rounded-3xl w-full`}
                />
              </div>
              <span
                className="absolute cursor-pointer bottom-4 right-2 pt-4 flex items-center mr-[0.25rem] text-[#FF8447]"
                onClick={() => setShowPassword(!showPassword)}
              >
                <BiHide
                  size={18}
                  className={
                    showPassword === false
                      ? "hidden items-center cursor-pointer"
                      : "text-gray-500"
                  }
                />
                <BiShow
                  size={18}
                  className={
                    showPassword === true
                      ? "hidden items-center cursor-pointer"
                      : "text-gray-500"
                  }
                />
              </span>
            </div>

            {/* ======= Confirm Password ======== */}
            <div className="mt-4 relative">
              <div>
                <label htmlFor="confirmPassword" className="text-base">
                  Re-enter Password
                </label>
                <input
                  type={`${showConfirmPassword ? "text" : "password"}`}
                  placeholder="Confirm Password"
                  {...register("confirmPassword")}
                  maxLength={32}
                  className={`${
                    errors.confirmPassword
                      ? "border-red-500 bg-[#FEF3F2]"
                      : "border-[#E9EDF0]"
                  } pr-12 pl-3 py-3 border-[1.3px] focus:outline-none placeholder:text-sm cursor-text flex justify-between rounded-3xl w-full`}
                />
              </div>
              <span
                className="absolute cursor-pointer bottom-4 right-2 pt-4 flex items-center mr-[0.25rem] text-[#FF8447]"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <BiHide
                  size={18}
                  className={
                    showConfirmPassword === false
                      ? "hidden items-center cursor-pointer"
                      : "text-gray-500"
                  }
                />
                <BiShow
                  size={18}
                  className={
                    showConfirmPassword === true
                      ? "hidden items-center cursor-pointer"
                      : "text-gray-500"
                  }
                />
              </span>
            </div>

            <button
              disabled={isLoading}
              className="px-8 py-3 cursor-pointer  mt-8 bg-[#C77D01] hover:bg-[#C77D01]/90 text-[16px] text-white rounded-3xl w-full  transition duration-500 ease-in-out"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          {/* ====== Don't have an account ======  */}
          <div className="mt-4 text-center text-sm">
            {/* <p>Don&apos;t have an account yet? </p> */}
            <Link
              href="/login"
              className="underline flex items-center justify-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

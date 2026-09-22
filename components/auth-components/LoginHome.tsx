"use client";
import BrandLogo from "@/public/assets/alive-home-logo.png";
import { yupResolver } from "@hookform/resolvers/yup";
import { getSession, signIn } from "next-auth/react";
import { BiHide, BiShow } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email(" Invalid Email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password must not exceed 15 characters"),
});

export default function LoginHome() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // REACT HOOK FORM LOGIC
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // Handle Login Form Submission LOGIC
  const onSubmitHandler = async (params: any) => {
    setIsLoading(true);
    const response = await signIn("credentials", {
      email: params.email,
      password: params.password,
      redirect: false,
      callbackUrl: "/",
    });

    // Error Handling
    if (response?.error) {
      if (response.error.startsWith("NEXT_AUTH_ERROR:")) {
        const message = response.error.replace("NEXT_AUTH_ERROR:", "");
        toast.error(message);
      } else if (response.error === "fetch failed") {
        toast.error("Network Error or No Internet Connection");
      } else {
        toast.error("Invalid Email/Password");
      }
      setIsLoading(false);
      return;
    }

    // Success Handling
    setIsLoading(false);
    toast.success("Login Successful");
    const session = await getSession();
    const role = session?.user?.role;
    const user = session?.user;

    if (
      (role === "BUYER" && !user?.isBuyerProfileFiled) ||
      (role === "HOMEOWNER" && !user?.isHomeownerProfileFiled) ||
      (role === "REALTOR" && !user?.isRealtorProfileFiled) ||
      (role === "DEVELOPER" && !user?.isDeveloperProfileFiled)
    ) {
      router.push("/consent-form");
      router.refresh();
    } else {
      switch (role) {
        case "BUYER":
          router.push("/buyer");
          break;
        case "HOMEOWNER":
          router.push("/homeowner");
          break;
        case "REALTOR":
          router.push("/realtor");
          break;
        case "DEVELOPER":
          router.push("/developer");
          break;
        default:
          router.push("/not-found");
      }
      router.refresh();
    }
  };

  return (
    <>
      <div className="bg-[#FDFDFD] overflow-y-scroll w-full md:w-1/2 h-full pt-10 pb-20 px-6 lg:px-20">
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
        <div className="max-w-[540px] mx-auto mt-14">
          <p className="text-[24px] text-[#141414] font-bold">Welcome Back!</p>
          <p className="text-[#7C8898]">
            Login back to your account and continue thriving
          </p>

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

            {/* =======  Password ======== */}
            <div className="mt-4 relative">
              <div>
                <label htmlFor="password" className="text-base">
                  Password
                </label>
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  placeholder="Password"
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
            {/* ====Forget Password ===== */}
            <div className="flex justify-between text-sm text-[#3D414F] ml-4 mt-2">
              <div>
                <input
                  className="py-0.5 focus:outline-none cursor-pointer mr-2 "
                  type="checkbox"
                />
                <span className="mb-2 font-light">Remember me</span>
              </div>
              <Link
                href="/forgot-password"
                className="hover:underline block text-xs text-[#C77D01] font-semibold"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              disabled={isLoading}
              className="px-8 py-3 cursor-pointer  mt-8 bg-[#C77D01] hover:bg-[#C77D01]/90 text-[16px] text-white rounded-3xl w-full  transition duration-500 ease-in-out"
            >
              {isLoading ? "Authenticating...." : "Login"}
            </button>
          </form>

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

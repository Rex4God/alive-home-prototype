"use client";
import { RegisterRequest } from "@/app/services/auth-service/auth.request";
import BrandLogo from "@/public/assets/alive-home-logo.png";
import { yupResolver } from "@hookform/resolvers/yup";
import { BiHide, BiShow } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import * as yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid Email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password must not exceed 32 characters"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .min(7, "Phone number must be at least 7 characters")
    .max(14, "Phone number must not exceed 14 characters"),
  role: yup.string().required("Please select a role"),
});

type FormData = yup.InferType<typeof schema>;

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [step, setStep] = useState(1);
  const router = useRouter();

  const roleMapping: Record<string, string> = {
    Buyer: "buyer",
    Realtor: "realtor",
    Developer: "developer",
    "Property Owner": "homeowner",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    getValues,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  // Select role
  const handleRoleSelect = (role: string) => {
    setValue("role", role, { shouldValidate: true });
  };

  // Submission Handler
  const onSubmitHandler = async (data: FormData) => {
    setIsSaving(true);
    try {
      const payload = {
        ...data,
        role: roleMapping[data.role] || data.role,
      };
      const response = await RegisterRequest(payload);
      toast.success(response?.message || "Registration successful!");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Registration failed.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
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
      <div className="max-w-[540px] mx-auto mt-1">
        {/* ======== Step Indicator ========  */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-4">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                step === 1
                  ? "bg-[#C77D01] text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              1
            </div>
            <div className="w-12 border-t-2 border-gray-300"></div>
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                step === 2
                  ? "bg-[#C77D01] text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              2
            </div>
          </div>
        </div>

        {/* ========  Step 1 ========  */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p className="text-[24px] text-[#141414] font-bold">
              Create Your Account
            </p>
            <p className="text-[#7C8898]">
              Join Alive Home to access premium real estate services
            </p>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const valid = await trigger([
                  "firstName",
                  "lastName",
                  "email",
                  "phoneNumber",
                  "password",
                ]);
                if (valid) setStep(2);
              }}
              className="space-y-4"
            >
              <div className="md:grid md:grid-cols-2 md:space-x-2">
                <div className="mt-4">
                  <label htmlFor="firstName" className="text-base">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    {...register("firstName")}
                    maxLength={40}
                    className={`${
                      errors.firstName
                        ? "border-red-500 bg-[#FEF3F2]"
                        : "border-[#E9EDF0]"
                    } p-3 border-[1.3px] focus:outline-none placeholder:text-sm cursor-text flex justify-between rounded-3xl w-full`}
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="lastName" className="text-base">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    {...register("lastName")}
                    maxLength={40}
                    className={`${
                      errors.lastName
                        ? "border-red-500 bg-[#FEF3F2]"
                        : "border-[#E9EDF0]"
                    } p-3 border-[1.3px] focus:outline-none placeholder:text-sm cursor-text flex justify-between rounded-3xl w-full`}
                  />
                </div>
              </div>

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

              <div className="mt-4">
                <label htmlFor="phoneNumber" className="text-base">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="Phone Number"
                  {...register("phoneNumber")}
                  maxLength={40}
                  className={`${
                    errors.phoneNumber
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

              <button
                type="submit"
                className="px-8 py-3 cursor-pointer  mt-8 bg-[#C77D01] hover:bg-[#C77D01]/90 text-[16px] text-white rounded-3xl w-full  transition duration-500 ease-in-out"
              >
                Next
              </button>
            </form>
            <div className="mt-4 text-center text-sm">
              <p>
                Already have an account?
                <Link
                  href="/login"
                  className="ml-2 font-semibold text-[#C77D01]"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </motion.div>
        )}

        {/* =========Step 2 ======== */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-center mb-6">
              Choose Role
            </h2>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    role: "Buyer",
                    desc: "Browse, save, contact, schedule",
                  },
                  {
                    role: "Realtor",
                    desc: "List, manage clients, track leads",
                  },
                  {
                    role: "Developer",
                    desc: "Project management, sales, insights",
                  },
                  {
                    role: "Property Owner",
                    desc: "Manage listings, bookings, income",
                  },
                ].map((r) => (
                  <div
                    key={r.role}
                    className={`p-4 cursor-pointer rounded-xl border-2 transition ${
                      getValues("role") === r.role
                        ? "border-[#C77D01]"
                        : "border-gray-200"
                    }`}
                    onClick={() => handleRoleSelect(r.role)}
                  >
                    <h3 className="font-semibold">{r.role}</h3>
                    <p className="text-sm text-gray-500">{r.desc}</p>
                  </div>
                ))}
              </div>
              {errors.role && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.role.message}
                </p>
              )}

              <div className="grid grid-cols-2 gap-6 md:flex justify-between  mt-6">
                <button
                  type="button"
                  className="px-2 py-3 cursor-pointer  mt-8 w-full md:w-[200px] border-[1.5px] border-[#C77D01] hover:bg-[#C77D01]/90 hover:text-white text-[16px] text-[#C77D01] rounded-xl transition duration-500 ease-in-out"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-2 py-3 cursor-pointer mt-8 w-full md:w-[200px] bg-[#C77D01] hover:bg-[#C77D01]/90 text-[16px] text-white rounded-xl  transition duration-500 ease-in-out"
                >
                  {isSaving ? "Registering..." : "Complete Registration"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
}

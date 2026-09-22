"use client";
import BrandLogo from "@/public/assets/alive-home-logo.png";
import { motion, AnimatePresence } from "framer-motion";
import { IoSparklesSharp } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";
import { useRouter } from "next/navigation";
import Chatbot from "../chatbot/ChatBot";
import { Modal } from "../modals/Modal";
import { Landmark } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const routes = [
  {
    name: "Market Place",
    href: "/market-place",
    icon: Landmark,
  },
];

const mobileRoutes = [
  {
    name: "Log in",
    href: "/login",
  },
  {
    name: "Sign Up",
    href: "/signup",
  },
  {
    name: "Market Place",
    href: "/market-place",
  },
];

export default function Navbar() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [dropNav, setDropNav] = useState(false);
  const router = useRouter();
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <nav className="fixed w-full z-20 top-0 left-0  py-2 md:py-2.5 border-b-[0.5px] bg-[#FDFDFD]">
        <div className="max-w-[1300px] mx-auto p-2 pr-4 md:px-2 flex justify-between items-center">
          {/* =======Company LOGO ==== */}
          <Link href="/" className="flex items-center relative  w-20 h-10">
            <Image
              src={BrandLogo}
              alt="Alive Home brand logo"
              width={100}
              height={100}
              priority
              className="object-contain absolute"
            />
          </Link>

          {/* ===== LINKS (about, FAQs, Contact-US) ===== */}
          <div
            className="items-center justify-between hidden w-full lg:flex lg:w-auto"
            id="navbar-sticky"
          >
            <p
              onClick={() => toggleChat()}
              className="bg-[#F2F6F6] border-[#014751] px-3 py-1.5 font-medium cursor-pointer rounded-md mx-4 hover:text-[#014751] hidden lg:flex items-center gap-3"
            >
              <IoSparklesSharp size={18} className="blink-animation" />{" "}
              <span>Ask AI</span>
            </p>
            <ul className="p-2 md:p-0 mt-2 text-[#000000] font-medium rounded-lg md:space-x-5 lg:space-x-8 md:mt-0 md:border-0 hidden md:flex flex-row">
              {routes.map((route, index) => {
                const Icon = route.icon;
                return (
                  <li
                    key={index}
                    className="relative hover:text-[#C77D01] flex items-center gap-2 w-fit px-2.5 py-1.5 rounded-lg group cursor-pointer"
                    onClick={() => router.push(`${route.href}`)}
                  >
                    <Icon className="size-4" />
                    <span className="cursor-pointer">{route.name}</span>
                    <span className="absolute left-0 -bottom-0.5 h-0.5 w-full scale-x-0 bg-muted-foreground origin-left transition-transform duration-200 group-hover:scale-x-100" />
                  </li>
                );
              })}
            </ul>
            {/* ======== Login & Sign Up ====== */}
            <Link
              href="/login"
              className="relative group p-3 font-medium rounded-md mx-2 text-black hover:text-[#C77D01] dark:hover:text-secondary-foreground"
            >
              Login
              <span className="absolute left-0 -bottom-0.5 h-0.5 w-full scale-x-0 bg-muted-foreground origin-left transition-transform duration-200 group-hover:scale-x-100" />
            </Link>

            <motion.div
              whileHover={{
                scale: 1.03,
              }}
              className="w-fit"
            >
              <Link
                href="/signup"
                className="bg-[#C77D01] hover:bg-[#C77D01]/90 dark:bg-muted dark:border px-3 py-2 text-sm font-normal text-[#FFFFFF] rounded-md"
              >
                Get Started
              </Link>
            </motion.div>
          </div>

          {/* ======= Menu button ======*/}

          {!dropNav && (
            <div className="flex items-center gap-4 lg:hidden">
              <div className="flex lg:hidden bg-[#F2F6F6] dark:bg-secondary dark:border-muted-foreground dark:border-[0.1px]   border border-slate-200 p-2 rounded-lg">
                <HiMenu
                  className="text-lg transition text-[#C77D01] dark:text-secondary-foreground"
                  size={32}
                  onClick={() => {
                    setDropNav(true);
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/*====== Mobile Side view ======*/}
        <section className="lg:hidden text-black ">
          <AnimatePresence>
            {dropNav && (
              <motion.div
                initial={{ x: "90vw" }}
                animate={{ x: 0 }}
                exit={{ x: "90vw" }}
                transition={{ type: "tween", duration: 1 }}
                className="fixed top-0 right-0 w-[80%] min-h-screen z-30 bg-[#F8F8F8]"
              >
                <div className="flex justify-between p-3 pr-6">
                  <span className="flex items-center relative w-20 h-10">
                    <Image
                      src={BrandLogo}
                      alt="Alive Home brand logo"
                      width={100}
                      height={100}
                      priority
                      className="object-contain absolute"
                    />
                  </span>
                  <HiX
                    className="text-lg transition mt-2 text-[#C77D01] dark:text-secondary-foreground"
                    size={32}
                    onClick={() => {
                      setDropNav(false);
                    }}
                  />
                </div>
                <ul className="flex flex-col p-2 font-medium rounded-lg space-y-2">
                  {mobileRoutes.map((route, index) => (
                    <li
                      key={index}
                      className="block py-2 pl-1.5 mx-4 pr-3 border-b border-slate-200 dark:border-muted"
                    >
                      <Link href={route.href} className="w-full block">
                        {route.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </nav>
      <div
        onClick={() => toggleChat()}
        className="bg-[#ffffff] border-[0.5px] border-slate-200 text-black p-2  px-3.5 h-fit w-fit flex justify-center items-center gap-2 rounded-3xl font-normal  fixed bottom-10 right-4 z-[999] lg:hidden animate-bounce"
      >
        <div className="bg-[#019734] p-2 rounded-full flex items-center w-8 h-8">
          <IoSparklesSharp
            color="#FFFFFF"
            size={24}
            className="blink-animation"
          />
        </div>
        Ask AI
      </div>

      {/* === MODALS === */}
      <Modal show={isChatOpen} onClose={() => setIsChatOpen(false)}>
        <Chatbot toggleChat={toggleChat} />
      </Modal>
    </>
  );
}

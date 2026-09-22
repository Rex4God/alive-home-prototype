"use client";
import { GetUserNotifications } from "@/app/services/users-service/notifications.request";
import { useUserProfile } from "@/app/services/users-service/users.request";
import BrandLogo from "@/public/assets/alive-home-logo.png";
import { buyerMobileRoutes } from "@/utils/sidebarLinks";
import Logout from "@/components/auth-components/Logout";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, LogOut, Settings } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Modal } from "@/components/modals/Modal";
import Chatbot from "@/components/chatbot/ChatBot";
import { IoSparklesSharp } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { HiMenu, HiX } from "react-icons/hi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function BuyerNavBar({ session }: { session: any }) {
  const token = session?.user?.token as string;
  const userId = session?.user?.id as string;
  const [dropNav, setDropNav] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const router = useRouter();
  const [currentPage] = useState(1);
  const [limit] = useState(6);

  const { data: userProfileData } = useUserProfile(token, userId);
  const { data: notificationData } = useQuery({
    queryKey: ["getUserNotificationApi", currentPage],
    queryFn: () => GetUserNotifications(token, currentPage, limit),
  });

  // dropdown handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowActions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle Chatbot handler
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <nav className="bg-white text-[#414242] fixed px-6 z-[1000] lg:px-12 xl:px-20 py-[20px] top-0 left-0 right-0 border-b border-slate-200">
        <div className="flex justify-between items-center lg:block">
          <div className="lg:flex justify-between items-center">
            <div className="flex items-center">
              <div onClick={() => router.push("/")} className="cursor-pointer">
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
              </div>
              <div className="border-l border-slate-300 pl-3 ml-3 space-y-3 hidden md:inline-block">
                <p className="text-xs font-light">
                  Hi {userProfileData?.basicInfo?.firstName ?? "Alive Home"}
                </p>
                <p>Welcome 👋</p>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-x-2 text-sm md:text-base cursor-pointer font-light w-fit">
              <div className="flex items-center space-x-3 ml-4">
                <p
                  onClick={() => toggleChat()}
                  className="bg-[#F2F6F6] border-[#014751] px-3 py-1.5 font-medium cursor-pointer rounded-md mx-4 hover:text-[#014751] hidden lg:flex items-center gap-3"
                >
                  <IoSparklesSharp size={18} className="blink-animation" />{" "}
                  <span>Ask AI</span>
                </p>
                <Link
                  href={`/buyer/notifications`}
                  className="p-2 rounded-lg flex items-center justify-center"
                >
                  <div className="relative">
                    <Bell size={32} />
                    <div className="absolute -top-4 -right-4 bg-[#DE3024] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {notificationData?.meta?.totalUnreadNotifications || 0}
                    </div>
                  </div>
                </Link>

                <div
                  onClick={() => setShowActions((prevState) => !prevState)}
                  className="flex justify-start"
                >
                  <div className="relative cursor-pointer">
                    {!userProfileData?.basicInfo?.profilePicture ? (
                      <div className="w-[50px] h-[50px] border-[1.3px] border-slate-200 items-center justify-center flex rounded-full text-[20px] bg-[#C77D01] text-white font-bold">
                        {userProfileData?.basicInfo?.firstName
                          ?.charAt(0)
                          ?.toUpperCase() ?? "AT"}
                      </div>
                    ) : (
                      <Image
                        src={userProfileData?.basicInfo?.profilePicture}
                        alt="user avatar pics"
                        width={100}
                        height={100}
                        className="w-[48px] h-[48px] border-[1.3px] border-slate-200 items-center justify-center flex rounded-full object-cover"
                      />
                    )}
                    <div
                      ref={dropdownRef}
                      className={`${
                        showActions === true ? "block" : "hidden"
                      } bg-white py-3 shadow-md rounded-lg text-sm border border-[#213f7d0f] space-y-2 absolute right-[-1px] lg:right-[-18px] z-[1] top-[50px]`}
                    >
                      <Link
                        href={`/buyer/settings/account`}
                        className="hover:bg-gray-100 flex items-center gap-x-2 cursor-pointer p-2 pr-10 pl-4"
                      >
                        <Settings size={18} className="text-gray-600" />
                        Settings
                      </Link>
                      <div
                        className="hover:bg-gray-100 flex items-center gap-x-2 cursor-pointer text-red-600 p-2 pr-20 pl-4"
                        onClick={() => {
                          setShowActions(false);
                          setShowLogOut(true);
                        }}
                      >
                        <LogOut size={20} />
                        Logout
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ======= Menu button (Hamburger button) ======*/}
          <div className="lg:hidden flex space-x-3">
            <Link
              href={`/buyer/notifications`}
              className="bg-slate-300 dark:hover:bg-muted p-2 rounded-lg flex items-center justify-center"
            >
              <div className="relative">
                <Bell size={18} />
                {notificationData?.meta?.totalUnreadNotifications >= 0 && (
                  <div className="absolute -top-4 -right-4 bg-[#DE3024] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notificationData?.meta?.totalUnreadNotifications}
                  </div>
                )}
              </div>
            </Link>

            <HiMenu
              className="transition"
              size={32}
              onClick={() => {
                setDropNav(true);
              }}
            />
          </div>
        </div>

        {/*====== Mobile view ======*/}
        <section className="lg:hidden text-black">
          <AnimatePresence>
            {dropNav && (
              <motion.div
                initial={{ x: "90vw" }}
                animate={{ x: 0 }}
                exit={{ x: "90vw" }}
                transition={{ type: "tween", duration: 1 }}
                className="fixed top-0 right-0 w-[80%] min-h-screen bg-[#F6F8FD] z-30 pl-4 "
              >
                <div className="flex justify-between p-3 pr-6">
                  <a href="#" className="flex items-center relative w-20 h-10">
                    <Image
                      src={BrandLogo}
                      alt="Alive Home brand logo"
                      width={100}
                      height={100}
                      priority
                      className="object-contain absolute"
                    />
                  </a>
                  <HiX
                    className="text-lg transition mt-2"
                    size={32}
                    onClick={() => {
                      setDropNav(false);
                    }}
                  />
                </div>
                <ul className="flex flex-col mt-4 font-light text-sm rounded-lg space-y-3">
                  {buyerMobileRoutes.map((route, index) => (
                    <li
                      key={index}
                      className="block py-2 pl-1.5 mx-2 pr-3 border-b border-slate-200"
                    >
                      <Link
                        onClick={() => {
                          setDropNav(false);
                        }}
                        href={route.href}
                        className="w-full inline-block"
                      >
                        {route.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div
                  onClick={() => setShowLogOut(true)}
                  className="mt-10 ml-3 text-sm flex items-center space-x-4 hover:bg-[#C77D01]/90 p-2 pr-3  cursor-pointer rounded-lg w-fit font-light text-white shadow-sm bg-[#C77D01]"
                >
                  <LogOut size={16} />
                  <p>Log out</p>
                </div>
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

      <Modal show={showLogOut} onClose={() => setShowLogOut(false)}>
        <Logout setShowLogOut={setShowLogOut} />
      </Modal>
      <Modal show={isChatOpen} onClose={() => setIsChatOpen(false)}>
        <Chatbot toggleChat={toggleChat} />
      </Modal>
    </>
  );
}

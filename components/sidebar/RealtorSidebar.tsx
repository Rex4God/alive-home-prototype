"use client";
import { useUserProfile } from "@/app/services/users-service/users.request";
import { ChevronDown, ChevronRight, LogOut, Settings } from "lucide-react";
import { realtorNavItems } from "@/utils/sidebarLinks";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/utils/utils";
import Link from "next/link";

export function RealtorSidebar({ session }: { session: any }) {
  const token = session?.user?.token;
  const userId = session?.user?.id as string;
  const [showSignOutProfile, setShowSignOutProfile] = useState(false);
  const pathname = usePathname();
  const addSignOutProfileRef = useRef(null);
  const activeSegment = pathname.split("/")[2];
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const { data: userProfileData } = useUserProfile(token, userId);

  const toggleMenu = (name: string) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        addSignOutProfileRef.current &&
        !(addSignOutProfileRef.current as HTMLDivElement).contains(
          event.target as Node
        )
      ) {
        setShowSignOutProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [addSignOutProfileRef]);

  return (
    <>
      <div className="flex flex-col justify-between min-h-screen">
        <nav className="grid items-start gap-2">
          {realtorNavItems.map((item, index) => {
            const itemSegment = item.href.split("/")[2];
            const isActive = activeSegment === itemSegment;

            if (item.subLinks) {
              return (
                <div key={index}>
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className={cn(
                      "w-full cursor-pointer flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium",
                      isActive
                        ? "bg-[#C77D01] hover:bg-[#C77D01]/80 text-white"
                        : "text-[#7C8898] hover:bg-[#F9FAFB]"
                    )}
                  >
                    <span className="flex items-center">
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </span>
                    {openMenu === item.name ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>

                  {openMenu === item.name && (
                    <div className="ml-6 mt-1 space-y-2 flex flex-col gap-1 border-l border-slate-200">
                      {item.subLinks.map((subLink, idx) => {
                        const isChildActive = pathname === subLink.href;
                        return (
                          <Link key={idx} href={subLink.href}>
                            <span
                              className={cn(
                                "group flex items-center rounded-md px-3 py-1 ml-2 text-sm",
                                isChildActive
                                  ? "bg-[#C77D01] hover:bg-[#C77D01]/80 text-white"
                                  : "text-[#7C8898] hover:bg-[#F9FAFB]"
                              )}
                            >
                              <subLink.icon className="mr-2 h-4 w-4" />
                              {subLink.name}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link key={index} href={item.href}>
                <span
                  className={cn(
                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-[#F9FAFB] dark:hover:bg-muted",
                    isActive
                      ? "bg-[#C77D01] hover:bg-[#C77D01]/80 text-white"
                      : "bg-transparent text-[#7C8898] hover:bg-[#F9FAFB]"
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.name}</span>
                </span>
              </Link>
            );
          })}
        </nav>
        {/* ============ Settings dropdown & Log out ========== */}
        <div>
          <div
            onClick={() => setShowSignOutProfile((prevState) => !prevState)}
            className="pb-40 hidden md:block"
          >
            <div className="flex items-center gap-2  cursor-pointer">
              <p className="bg-[#C77D01] p-1 xl:p-2 rounded-md text-sm text-[#FFFFFF]">
                AT
              </p>
              <div className="flex items-center justify-between space-x-4 w-full">
                <div className="text-sm space-y-2">
                  <p>AliveHome</p>
                  <p className="whitespace-normal break-words overflow-hidden text-ellipsis  line-clamp-1">
                    {userProfileData?.basicInfo?.firstName ?? "Alive"}
                  </p>
                </div>
                <ChevronRight size={32} />
              </div>
            </div>
            {/* ===drop down === */}
            <div
              ref={addSignOutProfileRef}
              className={`${
                showSignOutProfile === true ? "block" : "hidden"
              }  bg-white h-fit absolute left-48 bottom-36 border-[1.3px] border-gray-400 dark:border-muted w-[200px] rounded-lg mt-2 py-3 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] space-y-2 text-[#24252D]`}
            >
              <div className="flex items-center space-x-4 dark:text-accent-foreground hover:bg-gray-100 dark:hover:bg-accent p-2 pr-3 cursor-pointer">
                <Settings size={16} />
                <Link className="block" href="/admin/settings/account">
                  Settings
                </Link>
              </div>
              <div
                onClick={() => signOut()}
                className="flex items-center space-x-4 hover:bg-gray-100 dark:hover:bg-accent text-red-600 p-2 pr-3 cursor-pointer"
              >
                <LogOut size={16} />
                <p>Log out</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

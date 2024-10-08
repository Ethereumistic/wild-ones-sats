"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./sidebar";
import {
  IconBrandTabler,
  IconSettings,
  IconShoppingCart,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import LoginNostr from "../nostr/LoginNostr";
import { useStore } from "@/app/store/useStore";
import Shop from "../shop/ShopDashboard";
import MainDashboard from "../main/MainDashboard";
import SingleDash from "../single/SingleDash";

export function SidebarDemo() {
    const { user } = useStore();
    const [activeTab, setActiveTab] = useState<string>("Dashboard");

  const links = [
    {
      label: "Multiplayer",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-24 w-24 flex-shrink-0" />
      ),
      tab: "Dashboard",
    },
    {
      label: "Singleplayer",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-24 w-24 flex-shrink-0" />
      ),
      tab: "Singleplayer",
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-24 w-24 flex-shrink-0" />
      ),
      tab: "Settings",
    },
    {
      label: "Shop",
      href: "#",
      icon: (
        <IconShoppingCart className="text-neutral-700 dark:text-neutral-200 h-24 w-24 flex-shrink-0" />
      ),
      tab: "Shop",
      show: !!user,
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-[100%] mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-[100vh]" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) =>
                link.show !== false ? (
                  <SidebarLink
                    key={idx}
                    link={link}
                    onClick={() => setActiveTab(link.tab)}
                  />
                ) : null
              )}
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <LoginNostr />
          </div>
        </SidebarBody>
      </Sidebar>
      {activeTab === "Shop" ? <Shop /> : activeTab === "Singleplayer" ? <SingleDash /> : <MainDashboard />}
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Acet Labs
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

// Dummy dashboard component with content
const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex gap-2">
          {[...new Array(4)].map((i) => (
            <div
              key={"first-array" + i}
              className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
        <div className="flex gap-2 flex-1">
          {[...new Array(1)].map((i) => (
            <div
              key={"second-array" + i}
              className="h-full w-full rounded-lg flex items-center justify-center bg-gray-100 dark:bg-neutral-800 "
            >
                <div className="text-center text-2xl items-center  justify-center">test</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Dummy dashboard component with content
const ShopDashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex gap-2">
          {[...new Array(4)].map((i) => (
            <div
              key={"first-array" + i}
              className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
        <div className="flex gap-2 flex-1">
          {[...new Array(1)].map((i) => (
            <div
              key={"second-array" + i}
              className="h-full w-full rounded-lg flex items-center justify-center bg-gray-100 dark:bg-neutral-800 "
            >
                <div className="text-center text-2xl items-center  justify-center">Shop</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

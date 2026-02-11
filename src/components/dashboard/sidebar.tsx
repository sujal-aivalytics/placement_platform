<<<<<<< HEAD

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FileQuestion,
  GraduationCap,
  Users,
  BarChart3,
  Settings,
  LogOut,
  BookOpen,
  Mic,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Zap,
  HelpCircle,
  MonitorPlay,
  AudioLines,
  FileText,
  Code,
  Brain,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

/* -------------------- Types -------------------- */

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  role?: "user" | "admin";
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

interface SidebarItemProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  href: string;
  active: boolean;
  collapsed: boolean;
}

interface SidebarContentProps {
  role: "user" | "admin";
  collapsed: boolean;
  pathname: string;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

/* -------------------- Sidebar Item -------------------- */


const SidebarItem = ({
  icon: Icon,
  label,
  href,
  active,
  collapsed,
}: SidebarItemProps) => (
  <Link href={href} className="block mb-1.5 group relative">
    <div
      className={cn(
        "relative flex items-center gap-3 px-4 py-3 rounded-none transition-all duration-500 overflow-hidden",
        active
          ? "bg-primary text-white font-black shadow-xl shadow-primary/20"
          : "text-gray-400 hover:text-gray-900 hover:bg-gray-50 font-bold hover:shadow-md"
      )}
    >
      {/* Animated background on hover */}
      {!active && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      
      <Icon className={cn(
        "w-5 h-5 relative z-10 transition-all duration-500", 
        active ? "text-white" : "text-gray-400 group-hover:text-primary group-hover:scale-110"
      )} />
      
      {!collapsed && (
        <span className="text-ui-sm uppercase tracking-wide relative z-10 transition-all duration-300 font-medium">
          {label}
        </span>
      )}
      
      {active && !collapsed && (
         <motion.div 
           layoutId="active-glow" 
           className="absolute inset-0 bg-white/10 blur-sm pointer-events-none"
         />
      )}

      {/* Active indicator line */}
      {active && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-white" />
      )}
    </div>
  </Link>
);

/* -------------------- Sidebar Content -------------------- */

const SidebarContent = ({
  role,
  collapsed,
  pathname,
  user,
}: SidebarContentProps) => {
  const userLinks = [
    { href: "/dashboard", label: "Home", icon: LayoutDashboard },
    { href: "/dashboard/topics", label: "Curriculum", icon: BookOpen },
    { href: "/dashboard/mock-tests", label: "Simulations", icon: MonitorPlay },
    { href: "/dashboard/interview-suite", label: "AI Interview", icon: Mic },
    { href: "/dashboard/voice-assessment", label: "Voice Engine", icon: AudioLines },
    { href: "/dashboard/programming", label: "Compiler", icon: Code },
    { href: "/dashboard/resume-simulator", label: "Portfolio", icon: FileText },
    { href: "/dashboard/results", label: "Analytics", icon: BarChart3 },
    { href: "/dashboard/profile", label: "Dossier", icon: User },
  ];

  const adminLinks = [
    { href: "/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/mcq-generator", label: "MCQ Engine", icon: Brain },
    { href: "/admin/problems", label: "Registry", icon: FileQuestion },
    { href: "/admin/tests", label: "Curriculum", icon: GraduationCap },
    { href: "/admin/subtopics", label: "Modules", icon: BookOpen },
    { href: "/admin/mock-tests", label: "Drives", icon: MonitorPlay },
    { href: "/admin/users", label: "Members", icon: Users },
    { href: "/admin/analytics", label: "Intelligence", icon: BarChart3 },
    { href: "/dashboard/profile", label: "Settings", icon: Settings },
  ];

  const links = role === "admin" ? adminLinks : userLinks;

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-100">
      <div className="h-20 flex items-center px-6 border-b border-gray-50">
        {!collapsed ? (
          <div className="flex flex-col group cursor-pointer transition-all duration-500 hover:scale-105">
            <span className="text-h3 tracking-tight text-gray-900 leading-none text-primary transition-all duration-300 group-hover:tracking-tighter">AiValytics</span>
            <span className="text-caption font-semibold text-gray-400 uppercase tracking-wider mt-1 transition-all duration-300 group-hover:text-primary">Analytical Suite</span>
          </div>
        ) : (
          <div className="w-11 h-11 rounded-none bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center text-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110 cursor-pointer group">
            <span className="font-black text-lg group-hover:scale-110 transition-transform duration-300">Ai</span>
          </div>
        )}
      </div>

      <nav className="flex-1 px-3 space-y-1 py-4">
        {links.map((link) => (
          <SidebarItem
            key={link.href}
            {...link}
            active={pathname === link.href}
            collapsed={collapsed}
          />
        ))}
      </nav>


      {!collapsed && (
        <div className="p-5 border-t border-gray-50 space-y-5 bg-gradient-to-b from-transparent to-gray-50/50">
          {/* User Profile Section */}
          <div className="flex items-center gap-3 group cursor-pointer">
             <div className="relative">
                <div className="h-10 w-10 rounded-none bg-primary/5 flex items-center justify-center overflow-hidden border border-primary/10 transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-lg">
                  {user?.image ? (
                    <img src={user.image} alt={user.name || 'User'} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <User className="h-5 w-5 text-primary transition-transform duration-500 group-hover:scale-110" />
                  )}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-primary border-2 border-white rounded-none transition-all duration-300 group-hover:scale-125"></div>
             </div>
             <div className="flex-1 overflow-hidden">
               <p className="text-ui-sm font-semibold uppercase tracking-wide text-gray-900 truncate transition-colors duration-300 group-hover:text-primary">{user?.name || 'Academic Member'}</p>
               <p className="text-caption font-medium text-gray-400 truncate mt-0.5">{user?.email || 'verified'}</p>
             </div>
          </div>

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-12 rounded-none text-gray-400 hover:bg-red-50 hover:text-red-600 text-ui-sm font-semibold uppercase tracking-wide transition-all duration-500 group hover:shadow-md"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            <LogOut className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            Sign Out
          </Button>
        </div>
      )}
    </div>
  );
};

/* -------------------- Main Sidebar -------------------- */

export default function Sidebar({
  mobileOpen,
  setMobileOpen,
  collapsed,
  setCollapsed,
  role = "user",
  user,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop */}
      <aside
        className={cn(
          "hidden lg:flex fixed inset-y-0 left-0 bg-white transition-all duration-500 z-40",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <SidebarContent role={role} collapsed={collapsed} pathname={pathname} user={user} />

        <Button
          size="icon"
          variant="outline"
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3.5 top-8 h-7 w-7 rounded-none bg-white border-gray-100 shadow-xl hover:bg-primary hover:text-white transition-all text-gray-400"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </aside>

      {/* Mobile Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed bottom-8 right-8 z-50 w-14 h-14 bg-gray-900 text-white rounded-none shadow-2xl flex items-center justify-center transition-transform active:scale-95"
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed inset-y-0 left-0 w-64 bg-white z-50 shadow-2xl"
            >
              <SidebarContent
                role={role}
                collapsed={false}
                pathname={pathname}
                user={user}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
=======

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FileQuestion,
  GraduationCap,
  Users,
  BarChart3,
  Settings,
  LogOut,
  BookOpen,
  Mic,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Zap,
  HelpCircle,
  MonitorPlay,
  AudioLines,
  FileText,
  Code,
  Brain,
  User,
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

/* -------------------- Types -------------------- */

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  role?: "user" | "admin";
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

interface SidebarItemProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  href: string;
  active: boolean;
  collapsed: boolean;
}

interface SidebarContentProps {
  role: "user" | "admin";
  collapsed: boolean;
  pathname: string;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

/* -------------------- Sidebar Item -------------------- */

const SidebarItem = ({
  icon: Icon,
  label,
  href,
  active,
  collapsed,
}: SidebarItemProps) => (
  <Link href={href} className="block mb-1 group relative">
    <div
      className={cn(
        "relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
        active
          ? "bg-gray-100 text-gray-900 font-semibold"
          : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
      )}
    >
      {active && (
        <motion.div
          layoutId="active-indicator"
          className="absolute left-0 h-8 w-1 bg-gray-900 rounded-r-full"
        />
      )}
      <Icon className="w-5 h-5" />
      {!collapsed && <span className="text-sm">{label}</span>}
    </div>
  </Link>
);

/* -------------------- Sidebar Content -------------------- */

const SidebarContent = ({
  role,
  collapsed,
  pathname,
  user,
}: SidebarContentProps) => {
  const userLinks = [
    { href: "/dashboard", label: "Home", icon: LayoutDashboard },
    { href: "/dashboard/topics", label: "Topics", icon: BookOpen },
    // { href: "/dashboard/mock-tests", label: "Mock Tests", icon: MonitorPlay },
    { href: "/dashboard/interview-suite", label: "AI Interview", icon: Mic },

    { href: "/dashboard/voice-assessment", label: "Voice", icon: AudioLines },
    { href: "/dashboard/programming", label: "Programming", icon: Code },
    { href: "/dashboard/resume-simulator", label: "Resume Simulator", icon: FileText },
    { href: "/dashboard/results", label: "Results", icon: BarChart3 },
    { href: "/dashboard/profile", label: "Profile", icon: User },
    // New Mock Drive Link
    { href: "/placement/mock-drives", label: "Mock Drives", icon: Briefcase },
  ];

  const adminLinks = [
    { href: "/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/mcq-generator", label: "MCQ Generator", icon: Brain },
    { href: "/admin/problems", label: "Problems", icon: FileQuestion },
    { href: "/admin/tests", label: "Tests", icon: GraduationCap },
    { href: "/admin/subtopics", label: "Subtopics", icon: BookOpen },
    // { href: "/admin/mock-tests", label: "Manage Mock Tests", icon: MonitorPlay },
    { href: "/admin/mock-drives", label: "Company Drives", icon: Briefcase },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/dashboard/profile", label: "Settings", icon: Settings },
  ];

  const links = role === "admin" ? adminLinks : userLinks;

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="h-20 flex items-center px-6">
        {!collapsed ? (
          <span className="font-bold text-xl">AiValytics</span>
        ) : (
          <Zap />
        )}
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {links.map((link) => (
          <SidebarItem
            key={link.href}
            {...link}
            active={pathname === link.href}
            collapsed={collapsed}
          />
        ))}
      </nav>

      {!collapsed && (
        <div className="p-4 border-t space-y-4">
          {/* User Profile Section */}
          <div className="flex items-center gap-3 px-2">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
              {user?.image ? (
                <img src={user.image} alt={user.name || 'User'} className="h-full w-full object-cover" />
              ) : (
                <User className="h-6 w-6 text-blue-600" />
              )}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate text-gray-900">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
            </div>
          </div>

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            <LogOut className="w-5 h-5" />
            Log out
          </Button>
        </div>
      )}
    </div>
  );
};

/* -------------------- Main Sidebar -------------------- */

export default function Sidebar({
  mobileOpen,
  setMobileOpen,
  collapsed,
  setCollapsed,
  role = "user",
  user,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop */}
      <aside
        className={cn(
          "hidden lg:flex fixed inset-y-0 left-0 bg-white transition-all border-r z-40",
          collapsed ? "w-24" : "w-64"
        )}
      >
        <SidebarContent role={role} collapsed={collapsed} pathname={pathname} user={user} />

        <Button
          size="icon"
          variant="outline"
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-8 h-6 w-6 rounded-full"
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </aside>

      {/* Mobile Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 w-12 h-12 bg-gray-900 text-white rounded-full"
      >
        {mobileOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            className="lg:hidden fixed inset-y-0 left-0 w-64 bg-white z-50 shadow-xl"
          >
            <SidebarContent
              role={role}
              collapsed={false}
              pathname={pathname}
              user={user}
            />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
>>>>>>> 88523f22e704b7df36f7eb974c0dc7462a97faf5

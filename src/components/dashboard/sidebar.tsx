"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FileQuestion,
    GraduationCap,
    Users,
    BarChart3,
    Briefcase,
    Settings,
    LogOut,
    Building2,
    BookOpen,
    Trophy,
    UserCircle,
    ChevronLeft,
    ChevronRight,
    Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

/* -------------------------------- Sidebar Item -------------------------------- */

interface SidebarItemProps {
    icon: any;
    label: string;
    href: string;
    active: boolean;
    collapsed: boolean;
    theme: "blue" | "emerald";
}

const SidebarItem = ({
    icon: Icon,
    label,
    href,
    active,
    collapsed,
    theme,
}: SidebarItemProps) => {
    const activeStyles =
        theme === "blue"
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30"
            : "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-600/30";

    const hoverStyles =
        theme === "blue"
            ? "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
            : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700";

    const iconActive = "text-white";
    const iconInactive = "group-hover:scale-110 group-hover:rotate-6";

    const labelPopup =
        "absolute left-full ml-2 px-2 py-1 bg-slate-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50";

    return (
        <Link href={href}>
            <div
                className={cn(
                    "relative flex items-center gap-3 px-4 py-3 rounded-xl overflow-hidden transition-all duration-300 group",
                    active ? activeStyles : hoverStyles
                )}
            >
                {active && (
                    <motion.span
                        layoutId="active-indicator"
                        className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r bg-white"
                    />
                )}

                <Icon
                    className={cn(
                        "w-5 h-5 flex-shrink-0 transition-all duration-300",
                        active ? iconActive : iconInactive
                    )}
                />

                {!collapsed && (
                    <span className="text-sm font-medium whitespace-nowrap">
                        {label}
                    </span>
                )}

                {collapsed && <div className={labelPopup}>{label}</div>}
            </div>
        </Link>
    );
};

/* -------------------------------- Sidebar -------------------------------- */

interface SidebarProps {
    mobileOpen: boolean;
    setMobileOpen: (open: boolean) => void;
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}

export function Sidebar({
    mobileOpen,
    setMobileOpen,
    collapsed,
    setCollapsed,
}: SidebarProps) {
    const pathname = usePathname();

    const isAdmin = pathname.startsWith("/admin");
    const theme = isAdmin ? "blue" : "emerald";

    const adminLinks = [
        { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
        { icon: FileQuestion, label: "Questions", href: "/admin/placement-questions" },
        { icon: GraduationCap, label: "Tests", href: "/admin/tests" },
        { icon: Briefcase, label: "Placements", href: "/admin/placements" },
        { icon: Users, label: "Users", href: "/admin/users" },
        { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
        { icon: Settings, label: "Settings", href: "/admin/settings" },
    ];

    const studentLinks = [
        { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
        { icon: Building2, label: "Companies", href: "/dashboard/companies" },
        { icon: Briefcase, label: "Placements", href: "/dashboard/placements" },
        { icon: BookOpen, label: "Topics", href: "/dashboard/topics" },
        { icon: GraduationCap, label: "My Tests", href: "/dashboard/my-tests" },
        { icon: Trophy, label: "Results", href: "/dashboard/results" },
        { icon: UserCircle, label: "Profile", href: "/dashboard/profile" },
    ];

    const links = isAdmin ? adminLinks : studentLinks;

    const logoGradient =
        theme === "blue"
            ? "from-blue-600 to-indigo-600 shadow-blue-600/30"
            : "from-emerald-500 to-emerald-700 shadow-emerald-600/30";

    return (
        <>
            {/* Mobile Backdrop */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setMobileOpen(false)}
                        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed left-0 top-0 h-full z-50 flex flex-col transition-all duration-300",
                    "bg-white/80 backdrop-blur-xl border-r border-slate-200",
                    theme === "blue" ? "shadow-xl shadow-blue-900/5" : "shadow-xl shadow-emerald-900/5",
                    collapsed ? "w-20" : "w-72",
                    mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                )}
            >
                {/* Brand */}
                <div className="h-20 flex items-center px-6 border-b border-slate-100 relative">
                    <Link href="/" className="flex items-center gap-3">
                        <div
                            className={cn(
                                "w-10 h-10 rounded-xl bg-gradient-to-br text-white font-extrabold text-xl flex items-center justify-center shadow-lg",
                                logoGradient
                            )}
                        >
                            A
                        </div>

                        {!collapsed && (
                            <div className="flex flex-col leading-tight">
                                <span className="font-bold text-lg text-slate-800">
                                    Aivalytics
                                </span>
                                <span className="text-[10px] text-slate-400">
                                    Smart Placement Prep
                                </span>
                            </div>
                        )}
                    </Link>

                    {/* Collapse Button */}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className={cn(
                            "hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border border-slate-200 items-center justify-center text-slate-400 transition shadow-sm",
                            theme === "blue"
                                ? "hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50"
                                : "hover:text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50"
                        )}
                    >
                        {collapsed ? (
                            <ChevronRight className="w-3.5 h-3.5" />
                        ) : (
                            <ChevronLeft className="w-3.5 h-3.5" />
                        )}
                    </button>
                </div>

                {/* Nav */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2 py-6">
                    {links.map((link) => (
                        <SidebarItem
                            key={link.href}
                            {...link}
                            collapsed={collapsed}
                            theme={theme}
                            active={
                                pathname === link.href ||
                                (link.href !== "/admin" &&
                                    link.href !== "/dashboard" &&
                                    pathname.startsWith(link.href))
                            }
                        />
                    ))}
                </div>

                {/* PRO Card - Only for Students */}
                {!isAdmin && !collapsed && (
                    <div className="px-4 mb-6">
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 p-4">
                            <motion.div
                                animate={{ scale: [1, 1.4, 1] }}
                                transition={{ repeat: Infinity, duration: 6 }}
                                className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-400/20 rounded-full blur-3xl"
                            />

                            <div className="relative z-10 flex flex-col gap-3">
                                <div className="flex items-center gap-2 text-emerald-300">
                                    <Sparkles className="w-4 h-4" />
                                    <span className="text-[10px] font-bold tracking-widest uppercase">
                                        Go PRO
                                    </span>
                                </div>

                                <p className="text-xs text-white/90">
                                    Unlock AI mock interviews, premium tests & insights.
                                </p>

                                <Link href="/pricing">
                                    <Button
                                        size="sm"
                                        className="w-full bg-white text-emerald-900 hover:bg-emerald-50 rounded-lg text-[11px] font-bold h-8"
                                    >
                                        Upgrade Now
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                    <button
                        className={cn(
                            "flex items-center gap-3 w-full p-3 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition group text-sm font-medium",
                            collapsed && "justify-center"
                        )}
                    >
                        <LogOut className="w-5 h-5 group-hover:scale-110 transition" />
                        {!collapsed && <span>Sign Out</span>}
                    </button>
                </div>
            </aside>
        </>
    );
}

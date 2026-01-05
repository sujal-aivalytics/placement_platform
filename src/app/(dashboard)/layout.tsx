
"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="flex h-screen w-full bg-slate-50/50 overflow-hidden">
            {/* Sidebar - Fixed on desktop, sliding on mobile under layout control */}
            <Sidebar
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            {/* Main Content Area */}
            <main className="flex-1 h-screen overflow-y-auto overflow-x-hidden md:ml-0 transition-all duration-300">
                <div className={`transition-all duration-300 min-h-screen flex flex-col ${collapsed ? 'md:pl-20' : 'md:pl-72'}`}>
                    <DashboardHeader setMobileOpen={setMobileOpen} />

                    <div className="flex-1 w-full relative">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}

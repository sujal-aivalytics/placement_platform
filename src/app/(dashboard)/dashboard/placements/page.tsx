'use client';

import { ApplicationsTable } from "@/components/placements/applications-table";
import { PlacementFilters } from "@/components/placements/placement-filters";
import { ProUpgradeCard } from "@/components/dashboard/pro-upgrade-card";
import { ChevronRight, LayoutDashboard, Briefcase, TrendingUp, Clock, Award, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PlacementsPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen p-6 md:p-10 max-w-[1600px] mx-auto space-y-8">

      {/* Header & Breadcrumbs */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-white/50 w-fit px-3 py-1 rounded-full border border-gray-200/50 backdrop-blur-sm">
          <Link href="/dashboard" className="flex items-center gap-1 hover:text-emerald-600 transition-colors">
            <LayoutDashboard className="w-3.5 h-3.5" />
            Dashboard
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-300" />
          <span className="font-medium text-gray-900">Placements</span>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 to-teal-800 text-white p-8 shadow-xl shadow-emerald-900/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>

          <div className="relative z-10 flex justify-between items-end">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-200 font-medium mb-1">

                <span>Placement Drive 2025</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight">Application Portal</h1>
              <p className="text-emerald-100/80 text-lg max-w-xl">
                Track your applications, manage assessments, and maximize your career opportunities all in one place.
              </p>
            </div>

            {/* Abstract Decor */}
            <div className="hidden md:block">
              <div className="flex gap-3">
                <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium">
                  🎯  92% Success Rate
                </div>
                <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium">
                  🚀  500+ Companies
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 xl:grid-cols-4 gap-8 items-start"
      >
        {/* Main Content Area */}
        <motion.div variants={item} className="xl:col-span-3 space-y-6">
          <div className="backdrop-blur-sm bg-white/60 p-1 rounded-2xl border border-gray-100/50">
            <PlacementFilters />
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden ring-1 ring-gray-200/50">
            <ApplicationsTable />
          </div>
        </motion.div>

        {/* Sidebar / Extras */}
        <motion.div variants={item} className="xl:col-span-1 space-y-6 sticky top-8">
          <ProUpgradeCard />

          {/* Quick Stats */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-gray-900 text-lg">Your Insights</h4>
            </div>

            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <span className="text-sm text-gray-600 font-medium">Applications</span>
                </div>
                <span className="font-bold text-gray-900 text-lg">1,248</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="text-sm text-gray-600 font-medium">Selection Rate</span>
                </div>
                <span className="font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full text-xs">+ 14.2%</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span className="text-sm text-gray-600 font-medium">Pending</span>
                </div>
                <span className="font-bold text-amber-600">45</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-gray-500 font-medium">Profile Completion</span>
                <span className="text-emerald-600 font-bold">75%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="bg-emerald-500 h-full rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                ></motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

<<<<<<< HEAD
"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ListFilter, Circle, Trophy, Code2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ProblemsListProps {
    problems: any[];
}

export default function ProblemsList({ problems }: ProblemsListProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("All");

    const categories = ["All", "Arrays", "Strings", "DP", "Graphs", "Math"];

    // Filter logic
    const filteredProblems = useMemo(() => {
        return problems.filter((problem) => {
            // 1. Search Filter
            const matchesSearch =
                problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                problem.id.toString().includes(searchQuery);

            // 2. Category Filter
            let matchesCategory = true;
            if (activeTab !== "All") {
                const type = problem.type || "";
                matchesCategory =
                    type.toLowerCase() === activeTab.toLowerCase() ||
                    problem.title.toLowerCase().includes(activeTab.toLowerCase());
            }

            return matchesSearch && matchesCategory;
        });
    }, [problems, searchQuery, activeTab]);

    return (
        <div className="animate-in fade-in duration-1000">
            {/* HEADER SECTION */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div className="space-y-4">
                    <p className="text-primary font-black uppercase tracking-[0.3em] text-[10px]">Development Environment</p>
                    <h1 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tighter leading-none flex items-center gap-4">
                        <Code2 className="w-10 h-10 text-primary" />
                        Engineering <span className="text-primary italic">Registry</span>
                    </h1>
                    <p className="text-gray-500 font-medium text-lg max-w-xl">
                        A centralized database of logic challenges designed to audit architectural thinking and algorithmic precision.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                    <div className="relative group w-full sm:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="QUERY DATABASE..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 pr-6 h-14 bg-white border border-gray-100 rounded-none text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-primary/50 transition-all w-full shadow-sm"
                        />
                    </div>
                </div>
            </div>

            {/* CATEGORIES SECTION */}
            <div className="flex items-center gap-2 mb-12 overflow-x-auto pb-4 scrollbar-hide border-b border-gray-100">
                <div className="flex items-center gap-2 px-6 border-r border-gray-100 mr-4">
                    <ListFilter className="w-4 h-4 text-gray-400" />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Modules</span>
                </div>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveTab(cat)}
                        className={cn(
                            "px-8 py-3 rounded-none border text-[10px] font-black transition-all uppercase tracking-widest whitespace-nowrap",
                            activeTab === cat
                                ? "bg-gray-900 border-gray-900 text-white shadow-xl shadow-gray-900/10"
                                : "bg-white border-gray-100 text-gray-400 hover:border-primary/30 hover:text-primary"
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* PROBLEMS TABLE */}
            <div className="bg-white border-0 rounded-none shadow-sm hover:shadow-2xl transition-all duration-700 overflow-hidden aivalytics-card">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-50">
                            <th className="px-10 py-6 font-black text-[10px] uppercase tracking-widest text-gray-400 w-24 text-center">
                                Status
                            </th>
                            <th className="px-10 py-6 font-black text-[10px] uppercase tracking-widest text-gray-400">
                                Challenge Index
                            </th>
                            <th className="px-10 py-6 font-black text-[10px] uppercase tracking-widest text-gray-400 w-44">
                                Audit Difficulty
                            </th>
                            <th className="px-10 py-6 w-20"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filteredProblems.map((problem) => (
                            <tr
                                key={problem.id}
                                className="group hover:bg-slate-50 transition-all relative"
                            >
                                <td className="px-10 py-8 text-center">
                                   <div className="w-8 h-8 rounded-none bg-gray-50 border border-gray-100 flex items-center justify-center mx-auto transition-all group-hover:bg-primary/5 group-hover:border-primary/20">
                                        <Circle
                                            className="text-gray-200 group-hover:text-primary transition-colors"
                                            size={12}
                                            strokeWidth={3}
                                        />
                                   </div>
                                </td>
                                <td className="px-10 py-8">
                                    <div className="flex flex-col">
                                        <Link
                                            href={`/dashboard/programming/${problem.id}`}
                                            className="font-black text-xl text-gray-900 tracking-tight group-hover:text-primary transition-colors flex items-center gap-4 after:absolute after:inset-0"
                                        >
                                            <span className="text-gray-300 font-black text-[10px] uppercase tracking-widest pt-1">
                                                ID: {problem.id}
                                            </span>
                                            {problem.title}
                                        </Link>
                                        <div className="flex gap-3 mt-3">
                                            {problem.type && (
                                                <Badge className="rounded-none bg-gray-50 text-gray-400 border border-gray-100 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 shadow-none">
                                                    {problem.type}
                                                </Badge>
                                            )}
                                            <Badge className="rounded-none bg-primary/5 text-primary border border-primary/10 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 shadow-none">
                                                Active Environment
                                            </Badge>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-10 py-8">
                                    <Badge
                                        className={cn(
                                            "rounded-none text-[8px] font-black uppercase tracking-widest px-4 py-1.5 border-0 shadow-sm transition-all duration-500",
                                            problem.difficulty === "Easy"
                                                ? "bg-primary text-white shadow-primary/20"
                                                : problem.difficulty === "Medium"
                                                    ? "bg-amber-400 text-white shadow-amber-400/20"
                                                    : "bg-gray-900 text-white shadow-gray-900/20"
                                        )}
                                    >
                                        {problem.difficulty}
                                    </Badge>
                                </td>
                                <td className="px-10 py-8 text-right">
                                    <ChevronRight className="w-5 h-5 text-gray-200 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredProblems.length === 0 && (
                    <div className="py-40 text-center bg-gray-50/20">
                        <Trophy className="w-16 h-16 text-gray-100 mx-auto mb-6" />
                        <p className="text-gray-300 font-black uppercase tracking-[0.2em] text-sm italic">
                            No records matched your search parameters.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
=======
"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ListFilter, Circle, Trophy, Code2, ChevronRight } from "lucide-react";

interface ProblemsListProps {
    problems: any[];
}

export default function ProblemsList({ problems }: ProblemsListProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("All");

    const categories = ["All", "Arrays", "Strings", "DP", "Graphs", "Math"];

    // Filter logic
    const filteredProblems = useMemo(() => {
        return problems.filter((problem) => {
            // 1. Search Filter
            const matchesSearch =
                problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                problem.id.toString().includes(searchQuery);

            // 2. Category Filter
            let matchesCategory = true;
            if (activeTab !== "All") {
                // Check 'type' field first, then fallback to title search or basic heuristics
                // Adjust this based on your actual data structure in usage
                const type = problem.type || "";
                matchesCategory =
                    type.toLowerCase() === activeTab.toLowerCase() ||
                    problem.title.toLowerCase().includes(activeTab.toLowerCase());
            }

            return matchesSearch && matchesCategory;
        });
    }, [problems, searchQuery, activeTab]);

    return (
        <>
            {/* HEADER SECTION - Now includes interactive Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white flex items-center gap-3">
                        <Code2 className="w-8 h-8 text-emerald-500" />
                        Practice Arena
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">
                        Master your coding skills with handpicked challenges.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search problems..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all w-full md:w-64 shadow-sm"
                        />
                    </div>
                    <button className="p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all shadow-sm">
                        <ListFilter className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                    </button>
                </div>
            </div>

            {/* QUICK STATS CHIPS (Visual Appeal) - Interactive */}
            <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveTab(cat)}
                        className={`px-4 py-1.5 rounded-full border text-xs font-medium transition-all whitespace-nowrap shadow-sm ${activeTab === cat
                                ? "bg-emerald-500 border-emerald-500 text-white shadow-emerald-500/20"
                                : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-emerald-500 hover:text-emerald-500"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* PROBLEMS TABLE */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-zinc-50/50 dark:bg-zinc-800/30 border-b border-zinc-200 dark:border-zinc-800">
                            <th className="p-5 font-semibold text-xs uppercase tracking-widest text-zinc-500 w-20 text-center">
                                Status
                            </th>
                            <th className="p-5 font-semibold text-xs uppercase tracking-widest text-zinc-500">
                                Problem Title
                            </th>
                            <th className="p-5 font-semibold text-xs uppercase tracking-widest text-zinc-500 w-32">
                                Difficulty
                            </th>
                            <th className="p-5 font-semibold text-xs uppercase tracking-widest text-zinc-500 w-20"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                        {filteredProblems.map((problem) => (
                            <tr
                                key={problem.id}
                                className="group hover:bg-emerald-50/30 dark:hover:bg-emerald-500/5 transition-all relative"
                            >
                                <td className="p-5 text-center">
                                    <Circle
                                        className="text-zinc-300 dark:text-zinc-700 mx-auto group-hover:text-emerald-400 transition-colors"
                                        size={20}
                                        strokeWidth={1.5}
                                    />
                                </td>
                                <td className="p-5">
                                    <div className="flex flex-col">
                                        <Link
                                            href={`/dashboard/programming/${problem.id}`}
                                            className="font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center gap-2 after:absolute after:inset-0"
                                        >
                                            <span className="text-zinc-400 font-mono text-xs w-6">
                                                {problem.id}.
                                            </span>
                                            {problem.title}
                                        </Link>
                                        <div className="flex gap-2 mt-1.5">
                                            {problem.type && (
                                                <span className="text-[10px] px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 rounded uppercase tracking-tighter">
                                                    {problem.type}
                                                </span>
                                            )}

                                            <span className="text-[10px] px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 rounded uppercase tracking-tighter">
                                                JS / C++
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-5">
                                    <span
                                        className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm border ${problem.difficulty === "Easy"
                                                ? "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
                                                : problem.difficulty === "Medium"
                                                    ? "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20"
                                                    : "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20"
                                            }`}
                                    >
                                        {problem.difficulty}
                                    </span>
                                </td>
                                <td className="p-5 text-right">
                                    <ChevronRight className="w-4 h-4 text-zinc-300 dark:text-zinc-700 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredProblems.length === 0 && (
                    <div className="p-20 text-center">
                        <Trophy className="w-12 h-12 text-zinc-200 dark:text-zinc-800 mx-auto mb-4" />
                        <p className="text-zinc-500 dark:text-zinc-400 font-medium">
                            No problems found {searchQuery ? `matches "${searchQuery}"` : "in this category"}.
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}
>>>>>>> 88523f22e704b7df36f7eb974c0dc7462a97faf5

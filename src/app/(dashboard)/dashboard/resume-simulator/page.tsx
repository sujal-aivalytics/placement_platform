<<<<<<< HEAD
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Upload, Sparkles, FileCheck, Target, Zap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* -------------------- 3D Tilt Card Component -------------------- */
// Midnight-Mint Theme Update

const ResumeCard3D = () => {
    return (
        <div className="relative w-full h-full flex items-center justify-center perspective-1000">
            {/* Background Texture */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="absolute w-[120%] h-[120%] opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] grayscale" />
                <div className="absolute w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
            </div>

            {/* Sharp AiValytics Resume Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="group relative"
            >
                <div className="relative transform transition-all duration-700 ease-out group-hover:-translate-y-4 group-hover:rotate-1">
                    {/* Architectural Resume Card */}
                    <div className="relative w-72 md:w-80 bg-white rounded-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] group-hover:shadow-[0_80px_150px_-30px_rgba(0,0,0,0.25)] transition-all duration-700 overflow-hidden border border-gray-100 aivalytics-card">
                        {/* Card Header */}
                        <div className="bg-gray-900 p-6 border-b-4 border-primary">
                            <div className="flex items-center gap-4">
                                {/* Profile Avatar */}
                                <div className="w-16 h-16 rounded-none bg-primary flex items-center justify-center text-white font-black text-2xl shadow-xl">
                                    YR
                                </div>
                                <div className="text-white">
                                    <h3 className="font-black text-xl tracking-tighter leading-none">Yashodip Randive</h3>
                                    <p className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mt-2 italic">Senior Engine Architect</p>
                                </div>
                            </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-6 space-y-6">
                            {/* Experience Section */}
                            <div>
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4">Professional History</h4>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-1.5 h-6 bg-primary shrink-0" />
                                        <div className="flex-1 space-y-2">
                                            <div className="h-2.5 bg-gray-100 rounded-none w-full" />
                                            <div className="h-2 bg-gray-50 rounded-none w-3/4" />
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-1.5 h-6 bg-gray-200 shrink-0" />
                                        <div className="flex-1 space-y-2">
                                            <div className="h-2.5 bg-gray-100 rounded-none w-5/6" />
                                            <div className="h-2 bg-gray-50 rounded-none w-2/3" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Skills Section */}
                            <div>
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-3">Core Competencies</h4>
                                <div className="flex flex-wrap gap-2">
                                    {["React", "Node.js", "Python", "AWS"].map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1 bg-gray-50 text-gray-900 text-[10px] rounded-none font-black uppercase tracking-widest border border-gray-100 hover:border-primary/30 transition-colors"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* ATS Score */}
                            <div className="pt-4 border-t border-gray-50">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Compliance Rating</span>
                                    <div className="flex items-center gap-3">
                                        <div className="w-24 h-1.5 bg-gray-50 rounded-none overflow-hidden">
                                            <div className="h-full w-[85%] bg-primary" />
                                        </div>
                                        <span className="text-xs font-black text-primary italic">85%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Feature Tags */}
                    <div className="hidden md:block">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="absolute -left-8 top-1/4 transform -translate-x-full"
                        >
                            <div className="bg-gray-900 px-6 py-3 rounded-none shadow-2xl border-l-4 border-primary flex items-center gap-3">
                                <Sparkles className="w-4 h-4 text-primary" />
                                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">AI Refinement Active</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            className="absolute -right-8 top-1/3 transform translate-x-full"
                        >
                            <div className="bg-white px-6 py-3 rounded-none shadow-2xl border-l-4 border-primary flex items-center gap-3">
                                <Target className="w-4 h-4 text-primary" />
                                <span className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em]">Compliance Optimized</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default function ResumeSimulatorPage() {
    return (
        <div className="min-h-screen bg-white p-6 md:p-12 animate-in fade-in duration-1000">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-20 items-center min-h-[80vh]">
                    
                    {/* Left Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-2 space-y-10"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-3 px-5 py-2 bg-[#f0f9f8] rounded-none border-l-4 border-primary">
                            <FileCheck className="w-4 h-4 text-primary" />
                            <span className="text-caption text-primary font-semibold uppercase tracking-wide">Credential Engineering Core</span>
                        </div>

                        {/* Headline */}
                        <div className="space-y-3">
                            <h1 className="text-h1 text-gray-900 leading-tight tracking-tight">
                                Architect Your <span className="text-primary italic">Professional</span> Dossier
                            </h1>
                            <div className="w-16 h-1 bg-gray-900" />
                        </div>

                        {/* Subtext */}
                        <p className="text-body text-gray-500 leading-relaxed max-w-xl">
                            Utilize industrial-grade architectural tools and standardized templates to construct 
                            a high-compliance resume designed for top-tier institutional acquisition.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link href="/dashboard/resume-simulator/templates" className="flex-1">
                                <Button
                                    className="w-full h-12 rounded-none bg-gray-900 text-white text-ui font-semibold uppercase tracking-wide shadow-lg hover:bg-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl border-b-2 border-primary"
                                >
                                    Initialize Builder
                                </Button>
                            </Link>

                            <Link href="/dashboard/resume-simulator/templates?mode=upload" className="flex-1">
                                <Button
                                    variant="outline"
                                    className="w-full h-12 rounded-none border border-gray-200 bg-white text-gray-900 text-ui font-semibold uppercase tracking-wide shadow-md hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2"
                                >
                                    <Upload className="w-4 h-4 text-primary" />
                                    Import Registry
                                </Button>
                            </Link>
                        </div>

                        {/* Feature List */}
                        <div className="pt-6 grid grid-cols-1 gap-3">
                            {[
                                { icon: Zap, text: "AI Content Distillation" },
                                { icon: Target, text: "Compliance Alignment" },
                                { icon: FileCheck, text: "Institutional Templates" },
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                                    className="flex items-center gap-4 group"
                                >
                                    <div className="w-10 h-10 rounded-none bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all">
                                        <feature.icon className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors" />
                                    </div>
                                    <span className="text-caption text-gray-400 font-semibold uppercase tracking-wide group-hover:text-gray-900 transition-colors">{feature.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column */}
                    <div className="lg:col-span-3 h-[600px] flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
                        <ResumeCard3D />
                    </div>
                </div>
            </div>
        </div>
    );
}

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' }>(
    ({ className, variant = 'default', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
                    variant === 'default' ? "bg-primary text-white hover:bg-primary/90" : "bg-transparent border border-gray-200 hover:bg-gray-50",
                    className
                )}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"
=======
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Upload, Sparkles, FileCheck, Target, Zap } from "lucide-react";
import Link from "next/link";

/* -------------------- 3D Tilt Card Component -------------------- */
// Midnight-Mint Theme Update

const ResumeCard3D = () => {
    return (
        <div className="relative w-full h-full flex items-center justify-center perspective-1000">
            {/* Floating Blob Background */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-80 h-80 bg-gradient-to-br from-teal-200/40 to-slate-200/40 rounded-full blur-3xl animate-pulse" />
                <div className="absolute w-72 h-72 bg-gradient-to-tr from-teal-100/30 to-blue-100/30 rounded-full blur-3xl animate-pulse delay-700 translate-x-10 translate-y-10" />
                <div className="absolute w-64 h-64 bg-gradient-to-bl from-slate-50/25 to-teal-50/25 rounded-full blur-3xl animate-pulse delay-1000 -translate-x-8 -translate-y-8" />
            </div>

            {/* 3D Tilt Resume Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group relative"
            >
                <div className="relative transform transition-all duration-500 ease-out group-hover:-translate-y-3 group-hover:rotate-1">
                    {/* Glassmorphism Resume Card */}
                    <div className="relative w-72 md:w-80 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/50">
                        {/* Card Header */}
                        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4">
                            <div className="flex items-center gap-3">
                                {/* Profile Avatar */}
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                    YR
                                </div>
                                <div className="text-white">
                                    <h3 className="font-semibold text-lg">Yashodip Randive</h3>
                                    <p className="text-slate-300 text-sm">AI/ML Engineer</p>
                                </div>
                            </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-4 space-y-3">
                            {/* Experience Section */}
                            <div>
                                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Experience</h4>
                                <div className="space-y-2">
                                    <div className="flex items-start gap-2">
                                        <div className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 flex-shrink-0" />
                                        <div className="flex-1">
                                            <div className="h-2.5 bg-slate-200 rounded-full w-full" />
                                            <div className="h-2 bg-slate-100 rounded-full w-3/4 mt-1.5" />
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="w-2 h-2 rounded-full bg-slate-500 mt-1.5 flex-shrink-0" />
                                        <div className="flex-1">
                                            <div className="h-2.5 bg-slate-200 rounded-full w-5/6" />
                                            <div className="h-2 bg-slate-100 rounded-full w-2/3 mt-1.5" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Skills Section */}
                            <div>
                                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Skills</h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {["React", "Node.js", "Python", "AWS"].map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-2 py-0.5 bg-gradient-to-r from-slate-50 to-slate-100 text-slate-700 text-xs rounded-full font-medium"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* ATS Score */}
                            <div className="pt-2 border-t border-slate-100">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-slate-600">ATS Score</span>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full w-[85%] bg-gradient-to-r from-teal-500 to-teal-400 rounded-full" />
                                        </div>
                                        <span className="text-xs font-bold text-teal-600">85%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Feature Tags */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="absolute -left-4 top-1/4 transform -translate-x-full"
                    >
                        <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-white/50 flex items-center gap-1.5 animate-bounce-slow">
                            <Sparkles className="w-3.5 h-3.5 text-teal-500" />
                            <span className="text-xs font-medium text-slate-700">Enhance with AI</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="absolute -right-4 top-1/3 transform translate-x-full"
                    >
                        <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-white/50 flex items-center gap-1.5 animate-bounce-slow delay-300">
                            <Target className="w-3.5 h-3.5 text-teal-500" />
                            <span className="text-xs font-medium text-slate-700">ATS Optimized</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1 }}
                        className="absolute -right-2 bottom-8 transform translate-x-full"
                    >
                        <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-white/50 flex items-center gap-1.5 animate-bounce-slow delay-500">
                            <Zap className="w-3.5 h-3.5 text-teal-600" />
                            <span className="text-xs font-medium text-slate-700">Instant Export</span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

/* -------------------- Main Page Component -------------------- */

export default function ResumeSimulatorPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30 p-6 md:p-10">
            <div className="max-w-7xl mx-auto">
                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center min-h-[80vh]">
                    {/* Left Column - Typography & Actions (40%) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-teal-50 to-slate-50 rounded-full border border-teal-200"
                        >
                            <FileCheck className="w-4 h-4 text-teal-600" />
                            <span className="text-sm font-medium text-teal-800">AI-Powered Resume Builder</span>
                        </motion.div>

                        {/* Headline */}
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                            Create Your{" "}
                            <span className="bg-gradient-to-r from-teal-500 to-slate-900 bg-clip-text text-transparent">
                                Job-Winning
                            </span>{" "}
                            Resume
                        </h1>

                        {/* Subtext */}
                        <p className="text-lg text-slate-500 leading-relaxed">
                            Leverage our AI-powered tools and professional templates to build a standout resume
                            that gets you noticed by top recruiters. Start from scratch or optimize your existing document.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            {/* Primary Button - Create New Resume */}
                            <Link href="/dashboard/resume-simulator/templates">
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 text-white font-semibold rounded-full shadow-lg shadow-teal-500/20 hover:bg-teal-600 transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    Create new resume
                                </motion.button>
                            </Link>

                            {/* Secondary Button - Upload Resume */}
                            <Link href="/dashboard/resume-simulator/templates?mode=upload">
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto px-8 py-3.5 bg-white text-slate-800 font-semibold rounded-full border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <Upload className="w-5 h-5" />
                                    Upload my resume
                                </motion.button>
                            </Link>
                        </div>

                        {/* Feature List */}
                        <div className="pt-6 space-y-3">
                            {[
                                { icon: Zap, text: "AI-powered content suggestions" },
                                { icon: Target, text: "ATS-friendly formatting" },
                                { icon: FileCheck, text: "Multiple professional templates" },
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-50 to-slate-50 flex items-center justify-center">
                                        <feature.icon className="w-4 h-4 text-teal-600" />
                                    </div>
                                    <span className="text-slate-600">{feature.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column - 3D Animated Resume (60%) */}
                    <div className="lg:col-span-3 relative h-[500px] md:h-[600px]">
                        <ResumeCard3D />
                    </div>
                </div>
            </div>

            {/* Custom Animation Styles */}
            <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .delay-300 {
          animation-delay: 300ms;
        }
        .delay-500 {
          animation-delay: 500ms;
        }
        .delay-700 {
          animation-delay: 700ms;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
        </div>
    );
}
>>>>>>> 88523f22e704b7df36f7eb974c0dc7462a97faf5

<<<<<<< HEAD
"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MonitorPlay, Lock, ArrowRight, Info, ShieldAlert, Eye, MousePointerClick, AlertTriangle, CheckCircle2, PlayCircle, Loader2 } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { Loader } from "@/components/ui/loader";

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

export default function MockTestsPage() {
    const [tests, setTests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const fetchTests = async () => {
            try {
                const res = await fetch('/api/tests?type=mock');
                const data = await res.json();
                setTests(data.tests || []);
            } catch (error) {
                console.error("Failed to fetch mock tests", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTests();
    }, []);

    const getCompanyStyle = (companyName: string) => {
        const name = companyName?.toLowerCase() || '';
        if (name.includes('tcs')) return { color: 'bg-[#0067b1]', borderColor: '#0067b1', textColor: 'text-[#0067b1]' };
        if (name.includes('wipro')) return { color: 'bg-primary', borderColor: '#1eb2a6', textColor: 'text-primary' };
        return { color: 'bg-gray-900', borderColor: '#111827', textColor: 'text-gray-900' };
    };

    return (
        <div className="space-y-12 pb-20 animate-in fade-in duration-1000">

            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
            >
                <div className="space-y-4">
                    <p className="text-ui-sm text-primary font-semibold uppercase tracking-wider">Institutional Assessments</p>
                    <h1 className="text-h1 text-gray-900 tracking-tight leading-none">Corporate <span className="text-primary italic">Simulations</span></h1>
                    <p className="text-body text-gray-500 mt-3 max-w-2xl">Premium proctored assessments simulating official recruitment environments and corporate standards.</p>
                </div>
                <div className="flex items-center gap-3 bg-primary/10 text-primary px-6 py-3 rounded-none text-caption font-semibold uppercase tracking-wide border border-primary/20 shadow-inner">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    AI Surveillance Active
                </div>
            </motion.div>

            {/* Warning / Guidelines Banner */}
            <motion.div
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <Alert className="bg-gray-900 text-white border-0 shadow-2xl rounded-none p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                    <ShieldAlert className="h-8 w-8 text-primary relative z-10" />
                    <div className="relative z-10 ml-4">
                        <AlertTitle className="text-ui-sm font-semibold uppercase tracking-wider text-primary mb-2">Strict Proctored Protocol</AlertTitle>
                        <AlertDescription className="text-body-sm text-gray-400 font-medium max-w-3xl leading-relaxed">
                            These sessions are strictly monitored by our proprietary AI Surveillance System.
                            <span className="text-white mx-1">Browser tab transitions, unauthorized facial presence, or window resizing</span>
                            will result in immediate termination of the attempt.
                        </AlertDescription>
                    </div>
                </Alert>
            </motion.div>

            {/* Tests Grid */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="w-10 h-10 animate-spin text-primary" />
                </div>
            ) : (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                >
                    {tests.map((test) => {
                        const style = getCompanyStyle(test.company);
                        const isInProgress = test.status === 'IN_PROGRESS';
                        const isCompleted = test.status === 'COMPLETED';

                        return (
                            <motion.div key={test.id} variants={itemVariants}>
                                <Card className="h-full flex flex-col border-0 shadow-sm hover:shadow-2xl transition-all duration-500 group overflow-hidden rounded-none relative aivalytics-card">
                                    <div className={`absolute top-0 left-0 w-full h-1.5 ${style.color}`} />
                                    
                                    <div className="p-6 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="h-12 px-5 bg-gray-50 border border-gray-100 flex items-center justify-center shadow-inner group-hover:bg-primary/5 transition-colors">
                                                <span className={`font-black text-sm uppercase tracking-widest ${style.textColor}`}>{test.company || "AiValytics"}</span>
                                            </div>
                                            {isCompleted ? (
                                                <Badge className="bg-primary text-white font-black uppercase tracking-widest text-[8px] px-3 py-1 rounded-none border-0">Vaulted</Badge>
                                            ) : isInProgress ? (
                                                <Badge className="bg-amber-400 text-white font-black uppercase tracking-widest text-[8px] px-3 py-1 rounded-none border-0">Active</Badge>
                                            ) : (
                                                <Badge className="bg-gray-900 text-white font-black uppercase tracking-widest text-[8px] px-3 py-1 rounded-none border-0">New</Badge>
                                            )}
                                        </div>

                                        <div className="mb-5">
                                            <p className="text-caption text-gray-300 font-semibold uppercase tracking-wide mb-2">Recruitment Drive</p>
                                            <h3 className="card-title text-gray-900 group-hover:text-primary transition-colors">{test.title}</h3>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 mb-5">
                                            <div className="bg-gray-50 p-3 border border-gray-100">
                                                <span className="text-gray-400 block text-caption font-semibold uppercase tracking-wide mb-1">Standard</span>
                                                <span className="text-ui-sm font-semibold text-gray-900 uppercase">{test.difficulty}</span>
                                            </div>
                                            <div className="bg-gray-50 p-3 border border-gray-100">
                                                <span className="text-gray-400 block text-caption font-semibold uppercase tracking-wide mb-1">Duration</span>
                                                <span className="text-ui-sm font-semibold text-gray-900 uppercase">{test.duration} MINS</span>
                                            </div>
                                        </div>

                                        <div className="space-y-2 mb-6">
                                            <div className="flex items-center gap-2 text-caption font-semibold text-gray-400 uppercase tracking-wide">
                                                <MonitorPlay className="w-4 h-4 text-primary/40" /> {test._count?.questions || 0} MODULES
                                            </div>
                                            <div className="flex items-center gap-2 text-caption font-semibold text-gray-400 uppercase tracking-wide">
                                                <Lock className="w-4 h-4 text-primary/40" /> PROCTORED ACCESS
                                            </div>
                                        </div>

                                        <div className="mt-auto">
                                            <Link href={`/exam/${test.id}/dashboard`} className="w-full block">
                                                <Button className={`w-full h-12 rounded-none text-ui font-semibold uppercase tracking-wide shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl flex items-center justify-center gap-2 ${isInProgress ? 'bg-amber-500 hover:bg-amber-600 text-white' : isCompleted ? 'bg-primary hover:bg-primary/90 text-white' : 'bg-gray-900 hover:bg-black text-white'}`}>
                                                    <span>{isInProgress ? 'Resume Attempt' : isCompleted ? 'Audit Results' : 'Initialize Start'}</span>
                                                    <ArrowRight className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        );
                    })}
                    {tests.length === 0 && (
                        <div className="col-span-full text-center py-32 bg-white border-2 border-dashed border-gray-100 shadow-inner">
                            <h3 className="text-h4 text-gray-400 uppercase tracking-tight">No Drives Scheduled</h3>
                        </div>
                    )}
                </motion.div>
            )}

            {/* Rules Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20"
            >
                <div className="bg-white p-10 border border-gray-100 shadow-xl rounded-none relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <h3 className="text-h5 mb-8 flex items-center gap-3 text-gray-900 uppercase tracking-tight">
                        <AlertTriangle className="text-primary w-6 h-6" /> Malpractice Code
                    </h3>
                    <ul className="space-y-6">
                        {[
                            'Unauthorized window/tab transitions are strictly logged.',
                            'Usage of secondary electronic apparatus is forbidden.',
                            'Voice AI detects and flags unauthorized background conversations.'
                        ].map((rule, i) => (
                            <li key={i} className="flex gap-4">
                                <div className="w-2 h-2 bg-primary mt-1.5 shrink-0" />
                                <p className="text-caption font-semibold text-gray-400 uppercase tracking-wide leading-relaxed">{rule}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-white p-10 border border-gray-100 shadow-xl rounded-none relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <h3 className="text-h5 mb-8 flex items-center gap-3 text-gray-900 uppercase tracking-tight">
                        <CheckCircle2 className="text-primary w-6 h-6" /> Hardware Protocol
                    </h3>
                    <ul className="space-y-6">
                        {[
                            'Broadband Stability: Consistent 2Mbps+ Uplink.',
                            'Optical Sensor: Verified webcam for active proctoring.',
                            'Client Environment: Latest Chrome/Edge Stable Build.'
                        ].map((rule, i) => (
                            <li key={i} className="flex gap-4">
                                <div className="w-2 h-2 bg-primary mt-1.5 shrink-0" />
                                <p className="text-caption font-semibold text-gray-400 uppercase tracking-wide leading-relaxed">{rule}</p>
                            </li>
                        ))}
                    </ul>
                </div>

            </motion.div>

            {/* LEGAL DISCLAIMER */}
            <div className="pt-20 text-center max-w-4xl mx-auto px-10">
                <p className="text-caption text-gray-300 font-medium tracking-wider uppercase italic leading-relaxed">
                    Legal Disclaimer: AiValytics is an independent practice platform. Corporate entities mentioned (TCS, WIPRO) are proprietary trademarks of their respective owners. No affiliation or endorsement is implied.
                </p>
            </div>
        </div>
    );
}
=======
"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MonitorPlay, Lock, ArrowRight, Info, ShieldAlert, Eye, MousePointerClick, AlertTriangle, CheckCircle2, PlayCircle } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { Loader } from "@/components/ui/loader";

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

export default function MockTestsPage() {
    const [tests, setTests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const fetchTests = async () => {
            try {
                // Fetch tests and user progress in parallel or assume API returns aggregated data
                // For now, let's assume /api/tests returns user specific progress if authenticated
                // If not, we might need a separate call. checking existing patterns...
                // Assuming /api/tests?type=mock includes a 'status' or 'currentRound' field if updated backend.
                // If not, we will need to fetch sessions.
                // Let's standardly fetch tests then fetch progress if needed. 
                // Currently assume the standard endpoint might need modification or we handle it here.

                // Let's fetch tests first
                const res = await fetch('/api/tests?type=mock');
                const data = await res.json();

                // If the API doesn't return progress (it likely doesn't yet), we mock it or fetch sessions.
                // For this implementation, let's assume we can fetch active sessions.
                // But to be safe and quick, let's just use what we have, if 'progress' is missing, show Start.

                setTests(data.tests || []);
            } catch (error) {
                console.error("Failed to fetch mock tests", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTests();
    }, []);

    // Helper to get styling based on company name (fallback for dynamic tests)
    // NOTE: Official logos are strictly prohibited for legal compliance. Use colors only.
    const getCompanyStyle = (companyName: string) => {
        const name = companyName?.toLowerCase() || '';
        if (name.includes('tcs')) return { color: 'bg-blue-600', borderColor: '#1d4ed8', textColor: 'text-blue-600' };
        if (name.includes('wipro')) return { color: 'bg-purple-600', borderColor: '#9333ea', textColor: 'text-purple-600' };
        if (name.includes('ibm')) return { color: 'bg-indigo-800', borderColor: '#3730a3', textColor: 'text-indigo-800' };
        return { color: 'bg-gray-800', borderColor: '#1f2937', textColor: 'text-gray-800' };
    };

    return (
        <div className="p-4 md:p-8 space-y-6 md:space-y-8 min-h-screen bg-gray-50/50 pb-20">

            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Company Specific Mock Tests</h1>
                    <p className="text-sm md:text-base text-gray-500 mt-1">Premium proctored assessments simulating real-world recruitment drives.</p>
                </div>
                <div className="flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium border border-red-100 self-start md:self-auto">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    AI Surveillance Active
                </div>
            </motion.div>

            {/* Warning / Guidelines Banner */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <Alert className="bg-gradient-to-r from-gray-900 to-gray-800 text-white border-0 shadow-lg">
                    <ShieldAlert className="h-5 w-5 text-red-400 !text-red-400" />
                    <AlertTitle className="ml-2 font-bold text-red-400">Strict Proctored Environment</AlertTitle>
                    <AlertDescription className="ml-2 text-gray-300 text-xs md:text-sm">
                        These tests are monitored by AI Anti-Cheating System.
                        <span className="font-bold text-white mx-1">Tab switching, minimizing window, or multiple faces</span>
                        will lead to immediate disqualification. Please ensure you are in a well-lit room.
                    </AlertDescription>
                </Alert>
            </motion.div>

            {/* Tests Grid */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader text="Loading Tests..." />
                </div>
            ) : (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {tests.map((test) => {
                        const style = getCompanyStyle(test.company);
                        // Mock progress if not available yet (in real app, use test.progress or similar)
                        const isInProgress = test.status === 'IN_PROGRESS';
                        const isCompleted = test.status === 'COMPLETED';

                        return (
                            <motion.div key={test.id} variants={itemVariants}>
                                <Card className="h-full flex flex-col border-t-4 hover:shadow-2xl transition-all duration-300 group overflow-hidden"
                                    style={{ borderTopColor: style.borderColor }}>
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div className="h-12 w-24 relative flex items-center">
                                                <span className={`font-bold text-lg ${style.textColor}`}>{test.company || "MOCK TEST"}</span>
                                            </div>
                                            {isCompleted ? (
                                                <Badge className="bg-green-600 hover:bg-green-700">Completed</Badge>
                                            ) : isInProgress ? (
                                                <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200">Resuming...</Badge>
                                            ) : (
                                                <Badge variant="default" className="bg-blue-600 hover:bg-blue-700">New</Badge>
                                            )}
                                        </div>
                                        <CardTitle className="mt-4 text-xl">{test.title}</CardTitle>
                                        <CardDescription className="line-clamp-2 min-h-[2.5rem]">{test.description || "No description provided."}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div className="bg-gray-50 p-2 rounded border border-gray-100">
                                                <span className="text-gray-500 block text-xs uppercase">Difficulty</span>
                                                <span className="font-medium text-gray-900">{test.difficulty}</span>
                                            </div>
                                            <div className="bg-gray-50 p-2 rounded border border-gray-100">
                                                <span className="text-gray-500 block text-xs uppercase">Duration</span>
                                                <span className="font-medium text-gray-900">{test.duration} Mins</span>
                                            </div>
                                        </div>

                                        <div className="space-y-2 pt-2">
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <Eye className="w-4 h-4 text-gray-400" /> {test._count?.questions || 0} Questions
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <MousePointerClick className="w-4 h-4 text-gray-400" /> Proctored Mode
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="mt-auto">
                                        <Link href={`/exam/${test.id}/dashboard`} className="w-full">
                                            <Button className={`w-full font-bold shadow-lg ${style.color} hover:opacity-90`}>
                                                {isInProgress ? 'Resume Attempt' : isCompleted ? 'View Analysis' : 'Start Drive'} <ArrowRight className="ml-2 w-4 h-4" />
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        );
                    })}
                    {tests.length === 0 && (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            No active mock tests available at the moment.
                        </div>
                    )}
                </motion.div>
            )}

            {/* Rules Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-12 mb-12"
            >
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <AlertTriangle className="text-amber-500" /> Malpractice Code
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                        <li className="flex gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                            Leaving the test window at any time is recorded as a violation.
                        </li>
                        <li className="flex gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                            Using external devices (mobile phones, tablets) is strictly prohibited.
                        </li>
                        <li className="flex gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                            Background noise or speaking during the test will flag the session using Voice AI.
                        </li>
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <CheckCircle2 className="text-green-500" /> System Requirements
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                        <li className="flex gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                            Internet Speed: Minimum 2 Mbps stable connection.
                        </li>
                        <li className="flex gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                            Webcam: Functional webcam for continuous proctoring.
                        </li>
                        <li className="flex gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                            Browser: Latest version of Chrome or Edge (No private/incognito).
                        </li>
                    </ul>
                </div>

            </motion.div>

            {/* LEGAL DISCLAIMER */}
            <div className="border-t border-gray-200 pt-8 mt-12 text-center max-w-4xl mx-auto px-4">
                <p className="text-[10px] md:text-xs text-gray-400 mb-2 font-semibold tracking-wider uppercase">Disclaimer</p>
                <p className="text-[10px] md:text-xs text-gray-400 leading-relaxed">
                    This platform is an independent educational tool designed for practice purposes only. All company names (e.g., TCS, Wipro, Infosys) are trademarks™ or registered® trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them. Test patterns are based on publicly available information to simulate the exam environment.
                </p>
            </div>
        </div>
    );
}
>>>>>>> 88523f22e704b7df36f7eb974c0dc7462a97faf5


'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="max-w-[480px] mx-auto w-full space-y-8 animate-in fade-in slide-in-from-right-10 duration-500">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">Welcome Back!</h1>
                <p className="text-gray-500 font-medium">Please enter your details to sign in.</p>
            </div>

            <form className="space-y-6">
                <div className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Email Address</label>
                        <Input type="email" placeholder="name@company.com" className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white transition-all focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Password</label>
                            <Link href="#" className="text-xs font-bold text-emerald-600 hover:text-emerald-700">Forgot password?</Link>
                        </div>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white transition-all focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 pr-12"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Checkbox id="remember" className="border-gray-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600 rounded-md" />
                        <label htmlFor="remember" className="text-sm font-medium text-gray-600 cursor-pointer">
                            Remember me for 30 days
                        </label>
                    </div>
                </div>

                <div className="space-y-4">
                    <Button className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]">
                        Sign In
                    </Button>

                    <div className="flex items-center gap-4 py-2">
                        <div className="h-px bg-gray-100 flex-1" />
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">or</span>
                        <div className="h-px bg-gray-100 flex-1" />
                    </div>

                    <Button variant="outline" className="w-full h-12 rounded-xl border-gray-200 hover:bg-gray-50 font-bold text-gray-700 flex items-center justify-center gap-3 transition-all">
                        <img src="https://www.vectorlogo.zone/logos/google/google-icon.svg" className="w-5 h-5" alt="Google" />
                        Sign in with Google
                    </Button>
                </div>

                <div className="text-center text-sm text-gray-600">
                    Don't have an account? <Link href="/signup" className="text-emerald-600 font-bold hover:underline">Create Account</Link>
                </div>
            </form>
        </div>
    );
}

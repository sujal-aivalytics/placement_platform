
'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function SignupPage() {
  const [userType, setUserType] = useState<string>("college");

  return (
    <div className="max-w-[480px] mx-auto w-full space-y-6 animate-in fade-in slide-in-from-right-10 duration-500">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-6">Sign up as candidate</h1>
      </div>

      <form className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-500 uppercase">Email <span className="text-red-500">*</span></label>
            <Input type="email" placeholder="john@example.com" className="h-11 rounded-lg border-gray-200 bg-gray-50/50 focus:bg-white transition-colors" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase">First Name <span className="text-red-500">*</span></label>
              <Input placeholder="John" className="h-11 rounded-lg border-gray-200 bg-gray-50/50 focus:bg-white transition-colors" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase">Last Name</label>
              <Input placeholder="Doe" className="h-11 rounded-lg border-gray-200 bg-gray-50/50 focus:bg-white transition-colors" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-500 uppercase">Mobile <span className="text-red-500">*</span></label>
            <div className="flex gap-2">
              <button type="button" className="h-11 px-3 border border-gray-200 rounded-lg flex items-center gap-2 bg-white text-sm text-gray-700 min-w-[80px]">
                +91 <ChevronDown className="w-3 h-3 opacity-50 ml-auto" />
              </button>
              <Input type="tel" placeholder="9876543210" className="h-11 rounded-lg border-gray-200 bg-gray-50/50 focus:bg-white transition-colors flex-1" />
            </div>
          </div>

          {/* User Type Chips */}
          <div className="pt-2">
            <label className="text-xs font-medium text-gray-500 uppercase block mb-3">User type <span className="text-red-500">*</span></label>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setUserType('school')}
                className={`h-10 px-6 rounded-full text-sm font-medium border transition-all ${userType === 'school' ? 'border-emerald-500 text-emerald-600 bg-emerald-50' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
              >
                School Student
              </button>
              <button
                type="button"
                onClick={() => setUserType('college')}
                className={`h-10 px-6 rounded-full text-sm font-medium border transition-all ${userType === 'college' ? 'border-emerald-500 text-emerald-600 bg-emerald-50' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
              >
                College Student
              </button>
              <button
                type="button"
                onClick={() => setUserType('fresher')}
                className={`h-10 px-6 rounded-full text-sm font-medium border transition-all ${userType === 'fresher' ? 'border-emerald-500 text-emerald-600 bg-emerald-50' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
              >
                Fresher
              </button>
              <button
                type="button"
                onClick={() => setUserType('professional')}
                className={`h-10 px-6 rounded-full text-sm font-medium border transition-all ${userType === 'professional' ? 'border-emerald-500 text-emerald-600 bg-emerald-50' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
              >
                Professional
              </button>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-3 pt-4">
            <div className="flex items-start gap-2">
              <Checkbox id="terms" className="mt-1 border-gray-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600" />
              <label htmlFor="terms" className="text-xs text-gray-500 leading-tight">
                All your information is collected, stored and processed as per our data processing guidelines. By signing up on Unstop, you agree to our <a href="#" className="text-emerald-600 hover:underline">Privacy Policy</a> and <a href="#" className="text-emerald-600 hover:underline">Terms of Use</a>
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="updates" className="border-gray-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600" />
              <label htmlFor="updates" className="text-xs text-gray-500">
                Stay in the loop - Get relevant updates curated just for <i>you!</i>
              </label>
            </div>
          </div>

        </div>

        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 pt-6">
          <div className="text-sm text-gray-600">
            Already have an account? <Link href="/login" className="text-emerald-600 font-medium hover:underline">Login</Link>
          </div>
          <Button className="w-full md:w-auto min-w-[140px] h-11 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 font-bold shadow-lg shadow-emerald-500/20">
            Continue
          </Button>
          {/* Note: The image uses a "Continue" button style that looks outlined but prominent. Using white/outline to match image roughly, or could be filled if primary. */}
        </div>
      </form>
    </div>
  );
}

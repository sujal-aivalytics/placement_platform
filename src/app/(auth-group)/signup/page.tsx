<<<<<<< HEAD


'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
// import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [userType, setUserType] = useState<string>("college");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // OTP State
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);

  const router = useRouter();

  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }
    setSendingOtp(true);
    try {
      const response = await fetch('/api/auth/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Failed to send OTP');

      setOtpSent(true);
      toast.success("OTP sent to your email!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error(error instanceof Error ? error.message : "Failed to send OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }
    setVerifyingOtp(true);
    try {
      const response = await fetch('/api/auth/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Invalid OTP');

      setIsVerified(true);
      toast.success("Email verified successfully!");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) {
      toast.error("Please verify your email first");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`.trim(),
          email,
          phone,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      toast.success("Account created successfully!");
      router.push('/login');
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error instanceof Error ? error.message : "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[480px] mx-auto w-full space-y-10 animate-in fade-in slide-in-from-right-10 duration-700">

      {/* Header */}
      <div className="space-y-4">
        <p className="text-ui-sm text-primary font-semibold uppercase tracking-wider">Enrollment</p>
        <h1 className="text-h1 text-gray-900 tracking-tight leading-none">Create <span className="text-primary italic">Account</span></h1>
        <p className="text-body text-gray-500">Start your journey with AiValytics today.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-5">
          <div className="space-y-3">
            <label className="text-caption text-gray-400 font-semibold uppercase tracking-wide">Institutional Email <span className="text-primary">*</span></label>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="student@university.edu"
                className="h-14 rounded-none border-gray-100 bg-gray-50 focus:bg-white transition-all focus:ring-4 focus:ring-primary/10 focus:border-primary text-ui font-medium text-gray-900"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (isVerified) setIsVerified(false);
                  if (otpSent) setOtpSent(false);
                }}
                disabled={isVerified}
                required
              />
              {!isVerified && (
                <Button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={sendingOtp || otpSent || !email}
                  className="h-14 px-6 rounded-none bg-primary text-white hover:bg-primary/90 text-ui-sm font-semibold uppercase tracking-wide"
                >
                  {sendingOtp ? <Loader2 className="w-4 h-4 animate-spin" /> : (otpSent ? "Resend" : "Verify")}
                </Button>
              )}
              {isVerified && (
                <div className="h-14 px-6 flex items-center justify-center bg-primary/10 text-primary border border-primary/20 rounded-none">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              )}
            </div>

            {/* OTP Input */}
            {otpSent && !isVerified && (
              <div className="mt-2 flex gap-2 animate-in fade-in slide-in-from-top-2">
                <Input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  className="h-14 rounded-none border-gray-100 bg-gray-50 focus:bg-white transition-all focus:ring-4 focus:ring-primary/10 focus:border-primary text-ui font-medium text-gray-900"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <Button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={verifyingOtp || !otp}
                  className="h-14 px-6 rounded-none bg-primary text-white hover:bg-primary/90 text-ui-sm font-semibold uppercase tracking-wide"
                >
                  {verifyingOtp ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm"}
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="text-caption text-gray-400 font-semibold uppercase tracking-wide">First Name <span className="text-primary">*</span></label>
              <Input
                placeholder="John"
                className="h-14 rounded-none border-gray-100 bg-gray-50 focus:bg-white transition-all focus:ring-4 focus:ring-primary/10 focus:border-primary text-ui font-medium text-gray-900"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-3">
              <label className="text-caption text-gray-400 font-semibold uppercase tracking-wide">Last Name</label>
              <Input
                placeholder="Doe"
                className="h-14 rounded-none border-gray-100 bg-gray-50 focus:bg-white transition-all focus:ring-4 focus:ring-primary/10 focus:border-primary text-ui font-medium text-gray-900"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-caption text-gray-400 font-semibold uppercase tracking-wide">Mobile Number <span className="text-primary">*</span></label>
            <div className="flex gap-2">
              <button type="button" className="h-14 px-4 border border-gray-100 rounded-none flex items-center gap-2 bg-gray-50 text-ui-sm font-semibold text-gray-700 min-w-[90px]">
                +91 <ChevronDown className="w-4 h-4 opacity-30 ml-auto" />
              </button>
              <Input
                type="tel"
                placeholder="9876543210"
                className="h-14 rounded-none border-gray-100 bg-gray-50 focus:bg-white transition-all focus:ring-4 focus:ring-primary/10 focus:border-primary text-ui font-medium text-gray-900 flex-1"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-caption text-gray-400 font-semibold uppercase tracking-wide">Access Password <span className="text-primary">*</span></label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="h-14 rounded-none border-gray-100 bg-gray-50 focus:bg-white transition-all focus:ring-4 focus:ring-primary/10 focus:border-primary pr-12 text-ui font-medium text-gray-900"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-primary transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* User Type Chips */}
          <div className="pt-4">
            <label className="text-caption text-gray-400 font-semibold uppercase tracking-wide block mb-4">Select Category <span className="text-primary">*</span></label>
            <div className="flex flex-wrap gap-2">
              {['school', 'college', 'fresher', 'professional'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setUserType(type)}
                  className={`h-11 px-6 rounded-none text-caption font-semibold uppercase tracking-wide border transition-all ${userType === type ? 'border-primary text-primary bg-primary/5' : 'border-gray-100 text-gray-400 hover:border-primary/30'}`}
                >
                  {type === 'school' ? 'School' : type === 'college' ? 'University' : type === 'fresher' ? 'Graduate' : 'Professional'}
                </button>
              ))}
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-3">
              <Checkbox id="terms" className="mt-1 rounded-none border-gray-200 data-[state=checked]:bg-primary data-[state=checked]:border-primary" required />
              <label htmlFor="terms" className="text-caption text-gray-400 font-medium leading-relaxed uppercase tracking-wide">
                I agree to the <a href="#" className="text-primary hover:opacity-70 border-b border-primary/20">Privacy Policy</a> and <a href="#" className="text-primary hover:opacity-70 border-b border-primary/20">Terms of Use</a>
              </label>
            </div>
          </div>

        </div>

        <div className="flex flex-col gap-6 pt-4">
          <Button
            type="submit"
            disabled={loading || !isVerified}
            className="relative w-full h-16 rounded-none bg-gradient-to-r from-primary via-primary to-[#0d9488] text-white hover:shadow-2xl hover:shadow-primary/30 text-ui font-bold uppercase tracking-wider transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:scale-100 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d9488] via-primary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
            <span className="relative z-10 flex items-center justify-center gap-3">
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Complete Registration</span>
                  <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </span>
          </Button>
          <div className="text-center text-caption text-gray-400 font-semibold uppercase tracking-wide">
            Already registered? <Link href="/login" className="text-primary hover:opacity-70 border-b-2 border-primary/20 pb-0.5 ml-2 transition-all">Portal Login</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
=======


'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { Spinner } from "@/components/ui/loader";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
// import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [userType, setUserType] = useState<string>("college");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // OTP State
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);

  const router = useRouter();

  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }
    setSendingOtp(true);
    try {
      const response = await fetch('/api/auth/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Failed to send OTP');

      setOtpSent(true);
      toast.success("OTP sent to your email!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error(error instanceof Error ? error.message : "Failed to send OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }
    setVerifyingOtp(true);
    try {
      const response = await fetch('/api/auth/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Invalid OTP');

      setIsVerified(true);
      toast.success("Email verified successfully!");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) {
      toast.error("Please verify your email first");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`.trim(),
          email,
          phone,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      toast.success("Account created successfully!");
      router.push('/login');
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error instanceof Error ? error.message : "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[480px] mx-auto w-full space-y-6 animate-in fade-in slide-in-from-right-10 duration-500">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-6">Sign up as candidate</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-500 uppercase">Email <span className="text-red-500">*</span></label>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="john@example.com"
                className="h-11 rounded-lg border-gray-200 bg-gray-50/50 focus:bg-white transition-colors"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (isVerified) setIsVerified(false); // Reset verification if email changes
                  if (otpSent) setOtpSent(false);
                }}
                disabled={isVerified}
                required
              />
              {!isVerified && (
                <Button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={sendingOtp || otpSent || !email}
                  className="h-11 px-4 bg-slate-900 text-white hover:bg-slate-800"
                >
                  {sendingOtp ? <Spinner size={16} /> : (otpSent ? "Resend" : "Verify")}
                </Button>
              )}
              {isVerified && (
                <div className="h-11 px-4 flex items-center justify-center bg-green-50 text-green-600 border border-green-200 rounded-lg">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              )}
            </div>

            {/* OTP Input */}
            {otpSent && !isVerified && (
              <div className="mt-2 flex gap-2 animate-in fade-in slide-in-from-top-2">
                <Input
                  type="text"
                  placeholder="Enter OTP"
                  className="h-11 rounded-lg border-gray-200 bg-gray-50/50 focus:bg-white transition-colors"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <Button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={verifyingOtp || !otp}
                  className="h-11 px-4 bg-green-600 text-white hover:bg-green-700"
                >
                  {verifyingOtp ? <Spinner size={16} /> : "Confirm"}
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase">First Name <span className="text-red-500">*</span></label>
              <Input
                placeholder="John"
                className="h-11 rounded-lg border-gray-200 bg-gray-50/50 focus:bg-white transition-colors"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase">Last Name</label>
              <Input
                placeholder="Doe"
                className="h-11 rounded-lg border-gray-200 bg-gray-50/50 focus:bg-white transition-colors"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-500 uppercase">Mobile <span className="text-red-500">*</span></label>
            <div className="flex gap-2">
              <button type="button" className="h-11 px-3 border border-gray-200 rounded-lg flex items-center gap-2 bg-white text-sm text-gray-700 min-w-[80px]">
                +91 <ChevronDown className="w-3 h-3 opacity-50 ml-auto" />
              </button>
              <Input
                type="tel"
                placeholder="9876543210"
                className="h-11 rounded-lg border-gray-200 bg-gray-50/50 focus:bg-white transition-colors flex-1"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-500 uppercase">Password <span className="text-red-500">*</span></label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="h-11 rounded-lg border-gray-200 bg-gray-50/50 focus:bg-white transition-colors pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* User Type Chips */}
          <div className="pt-2">
            <label className="text-xs font-medium text-gray-500 uppercase block mb-3">User type <span className="text-red-500">*</span></label>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setUserType('school')}
                className={`h-10 px-6 rounded-full text-sm font-medium border transition-all ${userType === 'school' ? 'border-blue-500 text-blue-600 bg-blue-50' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
              >
                School Student
              </button>
              <button
                type="button"
                onClick={() => setUserType('college')}
                className={`h-10 px-6 rounded-full text-sm font-medium border transition-all ${userType === 'college' ? 'border-blue-500 text-blue-600 bg-blue-50' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
              >
                College Student
              </button>
              <button
                type="button"
                onClick={() => setUserType('fresher')}
                className={`h-10 px-6 rounded-full text-sm font-medium border transition-all ${userType === 'fresher' ? 'border-blue-500 text-blue-600 bg-blue-50' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
              >
                Fresher
              </button>
              <button
                type="button"
                onClick={() => setUserType('professional')}
                className={`h-10 px-6 rounded-full text-sm font-medium border transition-all ${userType === 'professional' ? 'border-blue-500 text-blue-600 bg-blue-50' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
              >
                Professional
              </button>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-3 pt-4">
            <div className="flex items-start gap-2">
              <Checkbox id="terms" className="mt-1 border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" required />
              <label htmlFor="terms" className="text-xs text-gray-500 leading-tight">
                All your information is collected, stored and processed as per our data processing guidelines. By signing up on Aivalytics, you agree to our <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and <a href="#" className="text-blue-600 hover:underline">Terms of Use</a>
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="updates" className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
              <label htmlFor="updates" className="text-xs text-gray-500">
                Stay in the loop - Get relevant updates curated just for <i>you!</i>
              </label>
            </div>
          </div>

        </div>

        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 pt-6">
          <div className="text-sm text-gray-600">
            Already have an account? <Link href="/login" className="text-blue-600 font-medium hover:underline">Login</Link>
          </div>
          <Button
            type="submit"
            disabled={loading || !isVerified}
            className="w-full md:w-auto min-w-[140px] h-11 rounded-full bg-blue-600 text-white hover:bg-blue-700 font-bold shadow-lg shadow-blue-500/20"
          >
            {loading ? <Spinner size={20} className="text-white" /> : "Continue"}
          </Button>
        </div>
      </form>
    </div>
  );
}
>>>>>>> 88523f22e704b7df36f7eb974c0dc7462a97faf5

<<<<<<< HEAD
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Zap,
  MoreHorizontal,
  CheckCircle2,
  Search,
  Building2,
  Trophy,
  Target,
  ArrowUpRight,
  TrendingUp,
  BrainCircuit,
  LayoutDashboard,
  Clock3,
  Settings2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/* ----------------------------------------------------------------------------------
 *  TYPES
 * ---------------------------------------------------------------------------------- */
interface UserStats {
  testsTaken: number;
  avgScore: number;
  accuracy: number;
  strongestTopic: string;
}

interface RecentTest {
  id: string;
  name: string;
  score: number;
  percentage: number;
  date: string;
  status: 'Done' | 'In progress' | 'On hold';
}

/* ----------------------------------------------------------------------------------
 *  COMPONENT: UserDashboard
 * ---------------------------------------------------------------------------------- */
export default function UserDashboard() {
  const [profile, setProfile] = useState({
    name: "User",
    image: null as string | null,
    role: "student",
    accountType: "Regular"
  });

  const [stats, setStats] = useState<UserStats>({
    testsTaken: 0,
    avgScore: 0,
    accuracy: 0,
    strongestTopic: "N/A",
  });

  const [recentTests, setRecentTests] = useState<RecentTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<any[]>([]);

  // Visibility State
  const [visibleSections, setVisibleSections] = useState({
    stats: true,
    performance: true,
    activity: true,
    profile: true,
    upcoming: true
  });

  /* ----------------------------------------------------------------------------------
   *  DATA FETCHING
   * ---------------------------------------------------------------------------------- */
  const fetchData = useCallback(async () => {
    try {
      const profileRes = await fetch('/api/user/profile');
      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setProfile({
          name: profileData.name || "User",
          image: profileData.image || null,
          role: profileData.role || "student",
          accountType: profileData.accountType || "Regular"
        });
      }

      const resultsRes = await fetch('/api/results');
      const resultsData = await resultsRes.json();

      if (resultsData.results && resultsData.results.length > 0) {
        interface ApiResult {
          id: string;
          score: number;
          total: number;
          createdAt: string;
          test?: {
            title?: string;
            topic?: string;
            company?: string;
          };
        }
        const results = resultsData.results;

        // Stats Calculation
        const testsTaken = results.length;
        const totalPercentage = results.reduce((sum: number, r: ApiResult) => sum + (r.score / r.total) * 100, 0);
        const avgScore = Math.round(totalPercentage / testsTaken);

        setStats({ testsTaken, avgScore, accuracy: avgScore, strongestTopic: "Logic" }); // Mock logic for topic

        // Recent Tests
        setRecentTests(results.slice(0, 5).map((r: ApiResult) => ({
          id: r.id,
          name: r.test?.title || 'Assessment',
          score: r.score,
          percentage: Math.round((r.score / r.total) * 100),
          date: new Date(r.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
          status: 'Done'
        })));

        // Chart Data
        setChartData(results.slice(0, 7).reverse().map((r: ApiResult, i: number) => ({
          name: `Test ${i + 1}`,
          score: Math.round((r.score / r.total) * 100),
        })));
      }
    } catch (error) {
      console.error('Failed load dashboard', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  /* ----------------------------------------------------------------------------------
   *  ANIMATIONS
   * ---------------------------------------------------------------------------------- */
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants: any = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-[#f8fcfb] p-6 lg:p-10 font-sans text-slate-900 animate-in fade-in duration-1000">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto space-y-12"
      >

        {/* HEADER SECTION */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-primary font-black text-[10px] uppercase tracking-[0.3em] mb-2">
              <Calendar className="w-4 h-4" />
              {currentDate}
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-gray-900 leading-none">
              Welcome back, <span className="text-primary italic">{profile.name.split(' ')[0]}</span>
            </h1>
            <p className="text-slate-500 mt-6 max-w-2xl font-medium text-lg">
              Explore your analytical trajectory and continue your transformation through our advanced assessment suite.
            </p>
          </div>


          <div className="flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-12 px-6 rounded-none border border-gray-200 bg-white hover:bg-slate-50 hover:border-gray-300 text-gray-400 text-ui-sm font-semibold uppercase tracking-wide shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                  <Settings2 className="w-4 h-4 mr-2" />
                  Interface
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 rounded-none border-gray-100 shadow-2xl" align="end">
                <DropdownMenuLabel className="font-black uppercase tracking-widest text-[10px] py-4">Dashboard Modules</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={visibleSections.stats}
                  onCheckedChange={(checked) => setVisibleSections(prev => ({ ...prev, stats: checked }))}
                  onSelect={(e) => e.preventDefault()}
                  className="font-bold text-[11px] py-3"
                >
                  Statistics
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={visibleSections.performance}
                  onCheckedChange={(checked) => setVisibleSections(prev => ({ ...prev, performance: checked }))}
                  onSelect={(e) => e.preventDefault()}
                  className="font-bold text-[11px] py-3"
                >
                  Growth Chart
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={visibleSections.activity}
                  onCheckedChange={(checked) => setVisibleSections(prev => ({ ...prev, activity: checked }))}
                  onSelect={(e) => e.preventDefault()}
                  className="font-bold text-[11px] py-3"
                >
                  Recent Audits
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={visibleSections.profile}
                  onCheckedChange={(checked) => setVisibleSections(prev => ({ ...prev, profile: checked }))}
                  onSelect={(e) => e.preventDefault()}
                  className="font-bold text-[11px] py-3"
                >
                  Identity Card
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/dashboard/topics">
              <Button className="h-12 px-8 rounded-none bg-gray-900 hover:bg-black text-white text-ui-sm font-semibold uppercase tracking-wide shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
                New Assessment
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* STATS OVERVIEW CARDS */}
        {visibleSections.stats && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <StatCard
              icon={<Target className="w-6 h-6" />}
              label="Assessed Modules"
              value={stats.testsTaken}
              trend="+12%"
              color="primary"
            />
            <StatCard
              icon={<Trophy className="w-6 h-6" />}
              label="Average Precision"
              value={`${stats.avgScore}%`}
              trend="Top 15%"
              color="primary"
            />
            <StatCard
              icon={<BrainCircuit className="w-6 h-6" />}
              label="Dominant Skill"
              value={stats.strongestTopic || "Logic"}
              trend="92%"
              color="primary"
            />
            <StatCard
              icon={<Clock className="w-6 h-6" />}
              label="Engagement Time"
              value="12h 4m"
              trend="+2.5h"
              color="primary"
            />
          </motion.div>
        )}

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

          {/* LEFT COLUMN (Chart & Activity) */}
          <motion.div variants={itemVariants} className="lg:col-span-3 space-y-12">

            {/* Performance Chart */}
            {visibleSections.performance && (
              <div className="bg-white rounded-none p-12 border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-2xl transition-all duration-700">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="flex justify-between items-center mb-16 relative z-10">
                  <div>
                    <p className="text-primary font-black text-[10px] uppercase tracking-[0.3em] mb-2">Longitudinal Analysis</p>
                    <h3 className="text-3xl font-black text-gray-900 tracking-tighter">Growth Trajectory</h3>
                  </div>
                  <Button variant="ghost" size="sm" className="text-slate-200 hover:text-primary">
                    <MoreHorizontal className="w-6 h-6" />
                  </Button>
                </div>

                <div className="h-[350px] w-full relative z-10" style={{ minHeight: '350px', minWidth: '100px' }}>
                  {chartData.length > 0 && (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData.length ? chartData : [{ name: 'T1', score: 0 }]} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1eb2a6" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#1eb2a6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#cbd5e1', fontSize: 10, fontWeight: 900 }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#cbd5e1', fontSize: 10, fontWeight: 900 }} />
                      <Tooltip
                        contentStyle={{ borderRadius: '0', border: 'none', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', padding: '16px', backgroundColor: '#111827', color: '#fff' }}
                        itemStyle={{ color: '#1eb2a6', fontWeight: 'bold' }}
                      />
                      <Area
                        type="monotone"
                        dataKey="score"
                        stroke="#1eb2a6"
                        strokeWidth={5}
                        fillOpacity={1}
                        fill="url(#colorScore)"
                        activeDot={{ r: 10, strokeWidth: 0, fill: '#1eb2a6' }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                  )}
                </div>
              </div>
            )}

            {/* Recent Activity List */}
            {visibleSections.activity && (
              <div className="bg-white rounded-none p-12 border border-gray-100 shadow-sm transition-all duration-700 hover:shadow-2xl">
                <div className="flex justify-between items-center mb-12">
                   <div>
                    <p className="text-primary font-black text-[10px] uppercase tracking-[0.3em] mb-2">Audit Logs</p>
                    <h3 className="text-3xl font-black text-gray-900 tracking-tighter">Recent Assessment Records</h3>
                   </div>
                  <Link href="/dashboard/results" className="text-[10px] font-black text-primary hover:opacity-70 uppercase tracking-[0.2em] border-b-2 border-primary/20 pb-2 transition-all">View Full Registry</Link>
                </div>

                <div className="space-y-4">
                  {recentTests.length > 0 ? (
                    recentTests.map((test, i) => (
                      <div key={i} className="group flex items-center justify-between p-8 rounded-none border border-transparent hover:border-gray-100 hover:bg-slate-50 transition-all duration-500 cursor-pointer">
                        <div className="flex items-center gap-8">
                          <div className={`w-16 h-16 rounded-none flex items-center justify-center transition-all duration-500 group-hover:bg-primary group-hover:text-white shadow-inner ${test.score >= 80 ? 'bg-primary/5 text-primary' : 'bg-gray-50 text-gray-300'}`}>
                            {test.score >= 80 ? <Trophy className="w-8 h-8" /> : <BrainCircuit className="w-8 h-8" />}
                          </div>
                          <div>
                            <h4 className="font-black text-gray-900 text-xl group-hover:text-primary transition-colors tracking-tight">{test.name}</h4>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-2">{test.date} &bull; COMPLETED</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-black text-gray-900 tracking-tighter">{test.score}%</div>
                          {test.score >= 70 ? (
                            <span className="text-[8px] font-black text-primary bg-primary/10 px-4 py-1.5 rounded-none uppercase tracking-widest mt-2 inline-block border border-primary/10">Distinction</span>
                          ) : (
                            <span className="text-[8px] font-black text-amber-600 bg-amber-50 px-4 py-1.5 rounded-none uppercase tracking-widest mt-2 inline-block border border-amber-100">Proficiency</span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-32 bg-gray-50/50 rounded-none border border-dashed border-gray-100">
                       <p className="text-gray-300 font-black uppercase tracking-[0.2em] text-sm">No activity records identified.</p>
                       <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest mt-2">Initialize your first assessment to generate audit logs.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

          </motion.div>

          {/* RIGHT COLUMN (Profile & Upcoming) */}
          <motion.div variants={itemVariants} className="lg:col-span-1 space-y-12">

            {/* Identity Card */}
            {visibleSections.profile && (
              <div className="bg-white rounded-none p-12 border border-gray-100 shadow-sm flex flex-col items-center text-center relative overflow-hidden group hover:shadow-2xl transition-all duration-700">
                <div className="absolute top-0 w-full h-48 bg-gradient-to-b from-primary/5 to-transparent"></div>
                <div className="relative z-10 w-full">
                  <div className="relative inline-block mb-10">
                    <Avatar className="w-40 h-40 rounded-none border-[10px] border-white shadow-2xl transition-transform duration-700 group-hover:scale-105">
                      <AvatarImage src={profile.image || undefined} />
                      <AvatarFallback className="bg-primary text-white text-5xl font-black">{profile.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary border-4 border-white rounded-none shadow-xl"></div>
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 tracking-tighter leading-none">{profile.name}</h2>
                  <p className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mt-4 italic">{profile.role === 'student' ? 'Institutional Member' : 'Faculty curator'}</p>

                  <div className="mt-12 space-y-4 w-full">
                    <div className="bg-[#f0f9f8] p-6 rounded-none border border-primary/5 flex items-center justify-between">
                      <div className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Global Rank</div>
                      <div className="text-2xl font-black text-gray-900">#42</div>
                    </div>
                    <div className="bg-[#f0f9f8] p-6 rounded-none border border-primary/5 flex items-center justify-between">
                      <div className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Membership</div>
                      <div className="text-2xl font-black text-primary">{profile.accountType}</div>
                    </div>
                  </div>

                  <Link href="/dashboard/profile" className="w-full mt-12 block">
                    <Button className="w-full rounded-none bg-gray-900 text-white hover:bg-black h-12 text-ui-sm font-semibold uppercase tracking-wide shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
                      Identity Dossier
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {/* Announcement Card */}
            {visibleSections.upcoming && (
              <div className="bg-gray-900 rounded-none p-12 text-white relative overflow-hidden group shadow-2xl transition-all duration-700 hover:shadow-primary/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:opacity-40 transition-opacity duration-700"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10 w-full">
                  <div className="flex justify-between items-start mb-12">
                    <div className="bg-white/5 backdrop-blur-xl p-5 rounded-none border border-white/10 shadow-inner">
                      <Building2 className="w-8 h-8 text-primary" />
                    </div>
                    <Badge className="bg-primary text-white border-0 font-black uppercase tracking-widest text-[9px] px-4 py-2 rounded-none">Event</Badge>
                  </div>

                  <p className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-3">Upcoming assessment</p>
                  <h3 className="text-4xl font-black leading-none mb-4 tracking-tighter">Google SDE <br /><span className="text-primary italic">Hackathon</span></h3>
                  <div className="flex items-center gap-3 text-white/50 mb-12 font-black uppercase tracking-widest text-[10px]">
                    <Clock3 className="w-5 h-5 text-primary/40" />
                    Aug 15  &bull;  14:00 GMT
                  </div>

                  <Button className="w-full bg-white text-gray-900 hover:bg-primary hover:text-white h-12 rounded-none text-ui-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-xl">
                    Register Now
                  </Button>
                </div>
              </div>
            )}

            <div className="bg-primary/5 rounded-none p-10 border border-primary/20 border-dashed">
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">Support & Feedback</p>
                <p className="text-[11px] font-bold text-gray-500 leading-relaxed uppercase tracking-widest">Encountering anomalies? Contact the administration department.</p>
                <Button variant="link" className="text-primary p-0 h-auto mt-4 font-black text-[10px] uppercase tracking-widest">Reach Support &rarr;</Button>
            </div>

          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}

function StatCard({ icon, label, value, trend, color }: any) {
  return (
    <div className="bg-white p-10 rounded-none border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 group aivalytics-card overflow-hidden relative">
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
      <div className="flex justify-between items-start mb-10 relative z-10">
        <div className={`p-5 rounded-none transition-all duration-700 group-hover:bg-primary group-hover:text-white shadow-inner bg-primary/10 text-primary`}>
          {icon}
        </div>
        {trend && (
          <div className="flex items-center gap-2 text-[10px] font-black text-primary bg-[#f0f9f8] px-4 py-2 rounded-none uppercase tracking-widest border border-primary/10">
            <TrendingUp className="w-4 h-4" />
            {trend}
          </div>
        )}
      </div>
      <div className="relative z-10">
        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2">{label}</p>
        <h3 className="text-5xl font-black text-gray-900 tracking-tighter group-hover:text-primary transition-colors">{value}</h3>
      </div>
    </div>
  );
}
=======
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Zap,
  MoreHorizontal,
  CheckCircle2,
  Search,
  Building2,
  Trophy,
  Target,
  ArrowUpRight,
  TrendingUp,
  BrainCircuit,
  LayoutDashboard,
  Clock3,
  Settings2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/* ----------------------------------------------------------------------------------
 *  TYPES
 * ---------------------------------------------------------------------------------- */
interface UserStats {
  testsTaken: number;
  avgScore: number;
  accuracy: number;
  strongestTopic: string;
}

interface RecentTest {
  id: string;
  name: string;
  score: number;
  percentage: number;
  date: string;
  status: 'Done' | 'In progress' | 'On hold';
}

/* ----------------------------------------------------------------------------------
 *  COMPONENT: UserDashboard
 * ---------------------------------------------------------------------------------- */
export default function UserDashboard() {
  const [profile, setProfile] = useState({
    name: "User",
    image: null as string | null,
    role: "student",
    accountType: "Regular"
  });

  const [stats, setStats] = useState<UserStats>({
    testsTaken: 0,
    avgScore: 0,
    accuracy: 0,
    strongestTopic: "N/A",
  });

  const [recentTests, setRecentTests] = useState<RecentTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<any[]>([]);

  // Visibility State
  const [visibleSections, setVisibleSections] = useState({
    stats: true,
    performance: true,
    activity: true,
    profile: true,
    upcoming: true
  });

  /* ----------------------------------------------------------------------------------
   *  DATA FETCHING
   * ---------------------------------------------------------------------------------- */
  const fetchData = useCallback(async () => {
    try {
      const profileRes = await fetch('/api/user/profile');
      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setProfile({
          name: profileData.name || "User",
          image: profileData.image || null,
          role: profileData.role || "student",
          accountType: profileData.accountType || "Regular"
        });
      }

      const resultsRes = await fetch('/api/results');
      const resultsData = await resultsRes.json();

      if (resultsData.results && resultsData.results.length > 0) {
        interface ApiResult {
          id: string;
          score: number;
          total: number;
          createdAt: string;
          test?: {
            title?: string;
            topic?: string;
            company?: string;
          };
        }
        const results = resultsData.results;

        // Stats Calculation
        const testsTaken = results.length;
        const totalPercentage = results.reduce((sum: number, r: ApiResult) => sum + (r.score / r.total) * 100, 0);
        const avgScore = Math.round(totalPercentage / testsTaken);

        setStats({ testsTaken, avgScore, accuracy: avgScore, strongestTopic: "Logic" }); // Mock logic for topic

        // Recent Tests
        setRecentTests(results.slice(0, 5).map((r: ApiResult) => ({
          id: r.id,
          name: r.test?.title || 'Assessment',
          score: r.score,
          percentage: Math.round((r.score / r.total) * 100),
          date: new Date(r.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
          status: 'Done'
        })));

        // Chart Data
        setChartData(results.slice(0, 7).reverse().map((r: ApiResult, i: number) => ({
          name: `Test ${i + 1}`,
          score: Math.round((r.score / r.total) * 100),
        })));
      }
    } catch (error) {
      console.error('Failed load dashboard', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  /* ----------------------------------------------------------------------------------
   *  ANIMATIONS
   * ---------------------------------------------------------------------------------- */
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants: any = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] p-6 lg:p-10 font-sans text-slate-900">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto space-y-8"
      >

        {/* HEADER SECTION */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <div className="flex items-center gap-2 text-slate-500 font-medium mb-1">
              <Calendar className="w-4 h-4" />
              {currentDate}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Welcome back, {profile.name.split(' ')[0]} 👋
            </h1>
            <p className="text-slate-500 mt-2 max-w-xl">
              Here's what's happening with your job applications and assessments today.
            </p>
          </div>


          <div className="flex gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-11 px-6 rounded-xl border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold shadow-sm">
                  <Settings2 className="w-4 h-4 mr-2" />
                  Customize
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>Dashboard Content</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={visibleSections.stats}
                  onCheckedChange={(checked) => setVisibleSections(prev => ({ ...prev, stats: checked }))}
                  onSelect={(e) => e.preventDefault()}
                >
                  Stats Overview
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={visibleSections.performance}
                  onCheckedChange={(checked) => setVisibleSections(prev => ({ ...prev, performance: checked }))}
                  onSelect={(e) => e.preventDefault()}
                >
                  Performance Chart
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={visibleSections.activity}
                  onCheckedChange={(checked) => setVisibleSections(prev => ({ ...prev, activity: checked }))}
                  onSelect={(e) => e.preventDefault()}
                >
                  Recent Activity
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={visibleSections.profile}
                  onCheckedChange={(checked) => setVisibleSections(prev => ({ ...prev, profile: checked }))}
                  onSelect={(e) => e.preventDefault()}
                >
                  Profile Card
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={visibleSections.upcoming}
                  onCheckedChange={(checked) => setVisibleSections(prev => ({ ...prev, upcoming: checked }))}
                  onSelect={(e) => e.preventDefault()}
                >
                  Upcoming Events
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button className="h-11 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-600/20">
              Start Assessment
            </Button>
          </div>
        </motion.div>

        {/* STATS OVERVIEW CARDS */}
        {visibleSections.stats && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <StatCard
              icon={<Target className="w-6 h-6 text-indigo-600" />}
              label="Tests Completed"
              value={stats.testsTaken}
              trend="+12% this week"
              color="indigo"
            />
            <StatCard
              icon={<Trophy className="w-6 h-6 text-emerald-600" />}
              label="Average Score"
              value={`${stats.avgScore}%`}
              trend="Top 15% of class"
              color="emerald"
            />
            <StatCard
              icon={<BrainCircuit className="w-6 h-6 text-purple-600" />}
              label="Strongest Skill"
              value={stats.strongestTopic || "Logic"}
              trend="92% accuracy"
              color="purple"
            />
            <StatCard
              icon={<Clock className="w-6 h-6 text-orange-600" />}
              label="Learning Time"
              value="12h 4m"
              trend="+2.5h vs last week"
              color="orange"
            />
          </motion.div>
        )}

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT COLUMN (Chart & Activity) */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">

            {/* Performance Chart */}
            {visibleSections.performance && (
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Performance Trend</h3>
                    <p className="text-sm text-slate-500">Your score progression over the last 7 tests</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-slate-400">
                    <MoreHorizontal className="w-5 h-5" />
                  </Button>
                </div>

                <div className="h-[300px] w-full" style={{ minHeight: '300px', minWidth: '100px' }}>
                  {chartData.length > 0 && (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData.length ? chartData : [{ name: 'T1', score: 0 }]} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                        <Tooltip
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                        />
                        <Area
                          type="monotone"
                          dataKey="score"
                          stroke="#4f46e5"
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#colorScore)"
                          activeDot={{ r: 6, strokeWidth: 0, fill: '#4f46e5' }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            )}

            {/* Recent Activity List */}
            {visibleSections.activity && (
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-slate-900">Recent Assessments</h3>
                  <Link href="/dashboard/history" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">View All</Link>
                </div>

                <div className="space-y-1">
                  {recentTests.length > 0 ? (
                    recentTests.map((test, i) => (
                      <div key={i} className="group flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${test.score >= 80 ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                            {test.score >= 80 ? <Trophy className="w-6 h-6" /> : <TrendingUp className="w-6 h-6" />}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">{test.name}</h4>
                            <p className="text-sm text-slate-500">{test.date} &bull; {test.status}</p>
                          </div>
                        </div>
                        <div className="text-right flex flex-col items-end gap-2">
                          <div className="text-lg font-bold text-slate-900">{test.score}%</div>
                          {test.status === 'Done' ? (
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">PASSED</span>
                              <Link href={`/exam/${test.id}/result`}>
                                <Button size="sm" variant="outline" className="h-6 text-[10px] px-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50">View Result</Button>
                              </Link>
                            </div>
                          ) : (
                            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">{test.status}</span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-slate-400">No recent activity found.</div>
                  )}
                </div>
              </div>
            )}

          </motion.div>

          {/* RIGHT COLUMN (Profile & Upcoming) */}
          <motion.div variants={itemVariants} className="space-y-8">

            {/* Profile Card */}
            {visibleSections.profile && (
              <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
                <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-slate-50 to-transparent"></div>
                <div className="relative z-10 -mt-2">
                  <div className="relative inline-block">
                    <Avatar className="w-28 h-28 border-4 border-white shadow-xl">
                      <AvatarImage src={profile.image || undefined} />
                      <AvatarFallback className="bg-slate-900 text-white text-3xl font-bold">{profile.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full"></div>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mt-4">{profile.name}</h2>
                  <p className="text-slate-500 font-medium">{profile.role}</p>

                  <div className="mt-6 flex gap-2 w-full">
                    <div className="flex-1 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Rank</div>
                      <div className="text-xl font-black text-slate-900">#42</div>
                    </div>
                    <div className="flex-1 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Plan</div>
                      <div className="text-xl font-black text-indigo-600">{profile.accountType}</div>
                    </div>
                  </div>

                  <Link href="/dashboard/settings" className="w-full mt-6 block">
                    <Button className="w-full rounded-xl bg-slate-900 text-white hover:bg-slate-800 h-12 font-semibold">
                      Edit Profile
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {/* Upcoming Event Card */}
            {visibleSections.upcoming && (
              <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden group">
                {/* Decorative Circles */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2 group-hover:opacity-30 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-600 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl">
                      <Building2 className="w-6 h-6 text-indigo-300" />
                    </div>
                    <Badge className="bg-indigo-500 text-white border-0">Upcoming</Badge>
                  </div>

                  <h3 className="text-2xl font-bold mb-2">Google SDE Assessment</h3>
                  <div className="flex items-center gap-2 text-slate-300 mb-6 font-medium">
                    <Clock3 className="w-4 h-4" />
                    Aug 15 &bull; 2:00 PM
                  </div>

                  <Button className="w-full bg-white text-black hover:bg-slate-100 font-bold h-12 rounded-xl">
                    Register Now
                  </Button>
                </div>
              </div>
            )}

          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}

/* ----------------------------------------------------------------------------------
 *  HELPER COMPONENTS
 * ---------------------------------------------------------------------------------- */
function StatCard({ icon, label, value, trend, color }: any) {
  const colorStyles = {
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${colorStyles[color as keyof typeof colorStyles]}`}>
          {icon}
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
            <TrendingUp className="w-3 h-3" />
            {trend.includes('%') ? trend.split(' ')[0] : 'Up'}
          </div>
        )}
      </div>
      <div>
        <h3 className="text-3xl font-medium text-slate-900 tracking-tight">{value}</h3>
        <p className="text-sm font-semibold text-slate-500 mt-1">{label}</p>
      </div>
    </div>
  );
}
>>>>>>> 88523f22e704b7df36f7eb974c0dc7462a97faf5

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Building2, Loader2, FileText, Code, Mic, MessageSquare, Award, Clock } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { motion } from "framer-motion";

interface Test {
  id: string;
  title: string;
  company?: string;
  duration: number;
  _count: {
    questions: number;
  };
}

interface PlacementTest {
  id: string;
  company: string;
  title: string;
  description: string;
  icon: any;
  duration: string;
  questions: number;
  route: string;
  color: string;
}

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
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function CompaniesPage() {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch company-specific tests
    fetch('/api/tests?type=company')
      .then(res => res.json())
      .then(data => {
        if (data.tests) {
          setTests(data.tests);
        }
      })
      .catch(err => console.error('Failed to fetch company tests:', err))
      .finally(() => setLoading(false));
  }, []);

  // Placement Tests - Direct Access
  const placementTests: PlacementTest[] = [
    // TCS Tests
    {
      id: 'tcs-foundation',
      company: 'TCS',
      title: 'TCS Foundation Test',
      description: 'Numerical, Verbal & Reasoning Ability',
      icon: FileText,
      duration: '90 min',
      questions: 65,
      route: '/dashboard/placement-test/tcs-foundation',
      color: 'from-blue-600 to-cyan-600',
    },
    {
      id: 'tcs-advanced',
      company: 'TCS',
      title: 'TCS Advanced Test',
      description: 'Quantitative & Logical Reasoning',
      icon: Award,
      duration: '45 min',
      questions: 15,
      route: '/dashboard/placement-test/tcs-advanced',
      color: 'from-purple-600 to-pink-600',
    },
    {
      id: 'tcs-coding',
      company: 'TCS',
      title: 'TCS Coding Test',
      description: 'Programming & Problem Solving',
      icon: Code,
      duration: '90 min',
      questions: 3,
      route: '/dashboard/placement-test/tcs-coding',
      color: 'from-green-600 to-emerald-600',
    },
    // Wipro Tests
    {
      id: 'wipro-aptitude',
      company: 'Wipro',
      title: 'Wipro Aptitude Test',
      description: 'Quant, Logical & Verbal Ability',
      icon: FileText,
      duration: '60 min',
      questions: 48,
      route: '/dashboard/placement-test/wipro-aptitude',
      color: 'from-orange-600 to-red-600',
    },
    {
      id: 'wipro-essay',
      company: 'Wipro',
      title: 'Wipro Essay Writing',
      description: 'Written Communication Skills',
      icon: MessageSquare,
      duration: '30 min',
      questions: 1,
      route: '/dashboard/placement-test/wipro-essay',
      color: 'from-indigo-600 to-purple-600',
    },
    {
      id: 'wipro-coding',
      company: 'Wipro',
      title: 'Wipro Coding Test',
      description: 'Programming Challenges',
      icon: Code,
      duration: '60 min',
      questions: 2,
      route: '/dashboard/placement-test/wipro-coding',
      color: 'from-teal-600 to-cyan-600',
    },
    {
      id: 'wipro-voice',
      company: 'Wipro',
      title: 'Wipro Voice Assessment',
      description: 'Communication & Fluency',
      icon: Mic,
      duration: '2 min',
      questions: 1,
      route: '/dashboard/placement-test/wipro-voice',
      color: 'from-pink-600 to-rose-600',
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-8"
    >
      <motion.div variants={item}>
        <PageHeader
          title="Company Specific Tests"
          description="Practice with company-specific placement tests and assessments"
        />
      </motion.div>

      {/* Info Card - Glass Effect */}
      <motion.div variants={item}>
        <Card className="border-none bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-sm shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-100/50 rounded-xl backdrop-blur-sm">
                <Building2 className="w-6 h-6 text-emerald-700" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">About Placement Tests</h3>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                  These tests simulate actual company placement assessments. Practice as many times as you want to improve your skills.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-emerald-500" /> Timed tests to simulate pressure</div>
                  <div className="flex items-center gap-2"><Award className="w-4 h-4 text-emerald-500" /> Comprehensive result analysis</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Placement Tests Section */}
      <div className="space-y-8">
        {/* TCS Tests */}
        <motion.div variants={item} className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 bg-blue-600 rounded-full" />
            <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900">TCS Recruitment Drive</h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {placementTests.filter(t => t.company === 'TCS').map((test, i) => {
              const Icon = test.icon;
              return (
                <Card key={test.id} className="group hover:-translate-y-1 duration-300 border-gray-100 hover:shadow-lg hover:border-blue-100 bg-white/50 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${test.color} text-white shadow-md`}>
                        {test.company}
                      </span>
                      <div className="flex items-center text-xs font-medium text-muted-foreground bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                        <Clock className="w-3 h-3 mr-1" />
                        {test.duration}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mb-1">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${test.color} bg-opacity-10 opacity-80`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle className="text-lg line-clamp-1">{test.title}</CardTitle>
                    </div>
                    <CardDescription className="line-clamp-2">{test.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mt-2 pt-4 border-t border-gray-100">
                      <span className="text-sm font-medium text-gray-500">
                        {test.questions} Questions
                      </span>
                      <Button asChild size="sm" className="rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all">
                        <Link href={test.route}>
                          Start Test
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </motion.div>

        {/* Wipro Tests */}
        <motion.div variants={item} className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 bg-orange-600 rounded-full" />
            <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900">Wipro NTH Drive</h3>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {placementTests.filter(t => t.company === 'Wipro').map((test) => {
              const Icon = test.icon;
              return (
                <Card key={test.id} className="group hover:-translate-y-1 duration-300 border-gray-100 hover:shadow-lg hover:border-orange-100 bg-white/50 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${test.color} text-white shadow-md`}>
                        {test.company}
                      </span>
                      <div className="flex items-center text-xs font-medium text-muted-foreground bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                        <Clock className="w-3 h-3 mr-1" />
                        {test.duration}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mb-1">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${test.color} bg-opacity-10 opacity-80`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle className="text-lg line-clamp-1">{test.title}</CardTitle>
                    </div>
                    <CardDescription className="line-clamp-2">{test.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mt-2 pt-4 border-t border-gray-100">
                      <span className="text-sm font-medium text-gray-500">
                        {test.questions} Questions
                      </span>
                      <Button asChild size="sm" className="rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all">
                        <Link href={test.route}>
                          Start Test
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Admin Created Company Tests */}
      {tests.length > 0 && (
        <motion.div variants={item} className="space-y-4 mt-12">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 bg-emerald-600 rounded-full" />
            <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900">Additional Company Tests</h3>
          </div>
          <p className="text-gray-500 -mt-2">
            Custom company tests created by administrators
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tests.map((test) => (
              <Card key={test.id} className="group hover:-translate-y-1 duration-300 border-gray-100 hover:shadow-lg hover:border-emerald-200 bg-white/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="p-3 bg-emerald-50 rounded-xl group-hover:bg-emerald-100 transition-colors">
                    <Building2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{test.company || test.title}</CardTitle>
                    <CardDescription className="text-xs font-medium bg-gray-50 inline-block px-2 py-0.5 rounded mt-1 border border-gray-100">
                      {test.title}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="flex justify-between items-center mb-4 text-sm font-medium text-gray-500 bg-gray-50 p-2 rounded-lg border border-gray-100">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {test.duration} mins</span>
                    <span>{test._count?.questions || 0} Qs</span>
                  </div>
                  <Button asChild className="w-full rounded-full shadow-md hover:shadow-lg transition-all bg-blue-600 hover:bg-blue-700 text-white">
                    <Link href={`/dashboard/test/${test.id}`}>
                      Start Test
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

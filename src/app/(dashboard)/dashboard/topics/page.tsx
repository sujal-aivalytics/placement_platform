'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2, BookOpen, Clock, HelpCircle } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { motion } from "framer-motion";

interface Test {
  id: string;
  title: string;
  _count: {
    questions: number;
  };
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

export default function TopicsPage() {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch only topic/aptitude tests
    fetch('/api/tests?type=topic')
      .then(res => res.json())
      .then(data => {
        if (data.tests) {
          setTests(data.tests);
        }
      })
      .catch(err => console.error('Failed to fetch tests:', err))
      .finally(() => setLoading(false));
  }, []);

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
          title="Aptitude Tests by Topic"
          description="Practice aptitude questions organized by topics"
        />
      </motion.div>

      {tests.length === 0 ? (
        <motion.div variants={item} className="text-center py-12">
          <p className="text-gray-500">No aptitude tests available yet.</p>
        </motion.div>
      ) : (
        <motion.div variants={item} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tests.map((test) => (
            <Card key={test.id} className="group h-full flex flex-col border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden hover:border-emerald-200 bg-white/50 backdrop-blur-sm">
              <div className="h-2 w-full bg-gradient-to-r from-emerald-500 to-teal-500" />
              <CardHeader className="pb-3">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-100/50 rounded-xl group-hover:scale-105 transition-transform backdrop-blur-sm">
                    <BookOpen className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl group-hover:text-emerald-700 transition-colors">{test.title}</CardTitle>
                    <CardDescription className="mt-1">Practice Set</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col pt-0">
                <div className="mt-4 pt-4 border-t border-gray-100 flex-1">
                  <div className="flex justify-between items-center text-sm font-medium text-gray-500 mb-6">
                    <span className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-emerald-500" />
                      {test._count?.questions || 0} Questions
                    </span>
                  </div>
                  <Button asChild className="w-full shadow-md hover:shadow-lg transition-all rounded-xl bg-blue-600 hover:bg-blue-700 text-white border-none">
                    <Link href={`/dashboard/test/${test.id}`}>
                      Start Practice
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

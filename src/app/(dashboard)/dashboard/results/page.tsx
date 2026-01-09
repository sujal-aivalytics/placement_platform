'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/page-header";

import {
  Trophy,
  Calendar,
  Target,
  Award,
  ArrowUpRight
} from "lucide-react";

/* ---------------- animations ---------------- */

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

/* ---------------- types ---------------- */

interface ResultData {
  id: string;
  score: number;
  total: number;
  percentage: number;
  createdAt: string;
  test: {
    title: string;
    type: string;
    difficulty: string;
  };
}

/* ---------------- page ---------------- */

export default function ResultsHistoryPage() {
  const router = useRouter();
  const [results, setResults] = useState<ResultData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch("/api/results");
        if (!res.ok) throw new Error("Failed to fetch results");

        const data = await res.json();
        setResults(data.results || []);
      } catch (error) {
        console.error("Results fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-8"
    >
      {/* ---------- Header ---------- */}
      <motion.div variants={item}>
        <PageHeader
          title="My Results"
          description="Track your performance and test history"
        >
          <Button
            variant="outline"
            className="gap-2 border-blue-200 text-blue-700 hover:bg-blue-50"
          >
            <ArrowUpRight className="w-4 h-4" />
            Export Report
          </Button>
        </PageHeader>
      </motion.div>

      {/* ---------- Table ---------- */}
      <motion.div variants={item}>
        <Card className="rounded-2xl border border-gray-100 overflow-hidden">
          <CardHeader className="border-b">
            <CardTitle>Recent Performance</CardTitle>
            <CardDescription>
              Click any row to view AI analysis
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {results.map((result) => (
                  <TableRow
                    key={result.id}
                    onClick={() =>
                      router.push(`/dashboard/results/${result.id}`)
                    }
                    className="cursor-pointer hover:bg-emerald-50/40"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600">
                          <Award className="w-4 h-4" />
                        </div>
                        {result.test.title}
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge variant="outline">
                        {result.test.type}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-sm text-gray-500">
                      <Calendar className="inline w-4 h-4 mr-1" />
                      {new Date(result.createdAt).toLocaleDateString()}
                    </TableCell>

                    <TableCell className="font-semibold">
                      {result.score}/3
                    </TableCell>

                    <TableCell className="text-right">
                      <Badge
                        className={
                          result.percentage >= 75
                            ? "bg-emerald-100 text-emerald-700"
                            : result.percentage >= 50
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }
                      >
                        {result.percentage >= 75
                          ? "Excellent"
                          : result.percentage >= 50
                          ? "Average"
                          : "Needs Improvement"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}

                {!loading && results.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center text-muted-foreground py-6"
                    >
                      No results found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

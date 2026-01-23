import Link from "next/link";

import React from "react";
import { Search, ListFilter, ArrowDownUp, CheckCircle2, Circle } from "lucide-react";
import { prisma } from "@/lib/prisma";



export default  async function  ProgrammingPage() {

  const CodingProblems=await prisma.problem.findMany({
    orderBy:{
      id:'asc'
    }
  });

  
 return (
    <div className="min-h-screen bg-white text-gray-900 p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* ... (Keep your Category Chips and Search UI the same) ... */}

        <div className="w-full overflow-hidden border border-gray-200 rounded-xl shadow-sm">
          <table className="w-full text-left border-collapse bg-white">
            <thead>
              <tr className="text-gray-500 text-xs uppercase tracking-wider bg-gray-50 border-b border-gray-200">
                <th className="p-4 font-semibold w-16 text-center">Status</th>
                <th className="p-4 font-semibold">Title</th>
                <th className="p-4 font-semibold text-right pr-6">Difficulty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {CodingProblems.map((problem) => (
                <tr key={problem.id} className="group hover:bg-blue-50/40 transition-colors relative">
                  <td className="p-4 text-center">
                     {/* Logic for status icon (can be connected to Submissions table later) */}
                     <Circle className="text-gray-300 mx-auto" size={18} />
                  </td>
                  <td className="p-4">
                    <Link 
                      href={`/dashboard/programming/${problem.id}`} 
                      className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors after:absolute after:inset-0"
                    >
                      {problem.id}. {problem.title}
                    </Link>
                  </td>
                  <td className={`p-4 text-right pr-6 text-sm font-bold ${
                    problem.difficulty === "Easy" ? "text-teal-600" : 
                    problem.difficulty === "Medium" ? "text-amber-500" : "text-rose-600"
                  }`}>
                    {problem.difficulty}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
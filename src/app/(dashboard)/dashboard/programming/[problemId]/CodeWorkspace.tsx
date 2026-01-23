"use client";

import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Panel, Group, Separator } from "react-resizable-panels";
import { Play, Send, ChevronLeft, Sun, Moon } from 'lucide-react';
import { LANGUAGES, LangaugeKey } from '@/config/languages';
import ReactMarkdown from 'react-markdown';

export default function CodeWorkspace({ problem }: any) {
  const [language, setLanguage] = useState<LangaugeKey>("cpp");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState<any[] | null>(null);
  const [activeTestCase, setActiveTestCase] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const testCases = typeof problem.testCases === 'string' ? JSON.parse(problem.testCases) : problem.testCases;

  useEffect(() => {
    if (problem.starterTemplate?.[language]) {
      setCode(problem.starterTemplate[language]);
    }
  }, [language, problem]);

  const decodeBase64 = (encoded: string) => {
    if (!encoded) return "";
    try { return atob(encoded); } catch { return "Decode Error"; }
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput(null);
    try {
      const res = await fetch("/api/problems/run", {
        method: "POST",
        body: JSON.stringify({ problemId: problem.id, userCode: code, language }),
      });
      const data = await res.json();
      console.log(data);
      setOutput(Array.isArray(data) ? data : data.submissions || []);
      console.log(output);
      setActiveTestCase(0);
    } catch (err) {
      console.error(err);
    } finally { setIsRunning(false); }
  };

  return (
    <div className={`h-screen flex flex-col ${isDarkMode ? 'dark' : ''} bg-slate-50 dark:bg-[#1a1a1a]`}>
      <nav className="h-12 border-b flex items-center justify-between px-4 bg-white dark:bg-[#282828] dark:border-gray-700">
        <div className="flex items-center gap-4 dark:text-gray-200">
          <ChevronLeft className="w-5 h-5 cursor-pointer" />
          <span className="font-medium text-sm">{problem.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleRun} disabled={isRunning} className="flex items-center gap-1 px-3 py-1 bg-slate-100 dark:bg-gray-700 rounded text-sm dark:text-gray-200">
            <Play className={`w-3 h-3 ${isRunning ? 'text-gray-400' : 'text-green-600'}`} /> {isRunning ? "Running..." : "Run"}
          </button>
          <button className="px-3 py-1 bg-green-600 text-white rounded text-sm font-bold"><Send className="w-3 h-3 inline mr-1" /> Submit</button>
          <select value={language} onChange={(e) => setLanguage(e.target.value as LangaugeKey)} className="px-2 py-1 text-sm rounded bg-slate-100 dark:bg-gray-700 dark:text-gray-200">
            {Object.entries(LANGUAGES).map(([key, lang]) => <option key={key} value={key}>{lang.label}</option>)}
          </select>
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-1.5 dark:text-gray-200">
            {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <Group orientation="horizontal">
        <Panel defaultSize={40} className="bg-white dark:bg-[#282828] overflow-y-auto p-6 border-r dark:border-transparent">
          <h1 className="text-2xl font-bold mb-4 dark:text-white">{problem.id}. {problem.title}</h1>
          <div className="prose prose-sm dark:prose-invert"><ReactMarkdown>{problem.description}</ReactMarkdown></div>
        </Panel>
        <Separator className="w-1.5 bg-slate-100 dark:bg-black hover:bg-blue-500" />
        <Panel defaultSize={60}>
          <Group orientation="vertical">
            <Panel defaultSize={70}><Editor height="100%" theme={isDarkMode ? "vs-dark" : "light"} language={language} value={code} onChange={(v) => setCode(v || "")} /></Panel>
            <Separator className="h-1.5 bg-slate-100 dark:bg-black hover:bg-blue-500" />
            <Panel defaultSize={30} className="bg-white dark:bg-[#282828] p-4 overflow-y-auto">
              <div className="border-b dark:border-gray-700 mb-4 pb-2 text-blue-600 dark:text-white font-medium">Result</div>
              {output ? (
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2">
                    {output.map((res, i) => (
                      <button key={i} onClick={() => setActiveTestCase(i)} className={`px-3 py-1 rounded text-sm ${activeTestCase === i ? 'bg-slate-200 dark:bg-gray-700' : 'text-gray-500'}`}>
                        <span className={res.status?.id === 3 ? "text-green-500 mr-1" : "text-red-500 mr-1"}>●</span> Case {i + 1}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <div className={output[activeTestCase].status?.id === 3 ? "text-green-500 font-bold" : "text-red-500 font-bold"}>{output[activeTestCase].status?.description}</div>
                    <div><p className="text-xs text-gray-500">Input</p><pre className="bg-slate-50 dark:bg-[#1e1e1e] p-2 rounded text-sm dark:text-gray-300">{JSON.stringify(testCases[activeTestCase].input)}</pre></div>
                    <div><p className="text-xs text-gray-500">Output</p><pre className="bg-slate-50 dark:bg-[#1e1e1e] p-2 rounded text-sm dark:text-gray-300">{decodeBase64(output[activeTestCase].stdout) || "No output"}</pre></div>
                    <div><p className="text-xs text-gray-500">Expected</p><pre className="bg-slate-50 dark:bg-[#1e1e1e] p-2 rounded text-sm dark:text-gray-300">{testCases[activeTestCase].output}</pre></div>
                  </div>
                </div>
              ) : <div className="text-gray-400 italic text-sm">Click Run to see results...</div>}
            </Panel>
          </Group>
        </Panel>
      </Group>
    </div>
  );
}
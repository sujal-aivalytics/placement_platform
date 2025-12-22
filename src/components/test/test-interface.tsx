'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Question } from '@/types';

interface TestInterfaceProps {
    topicOrCompany?: string;
    type: 'topic' | 'company' | 'id';
    testId?: string;
}

export default function TestInterface({ topicOrCompany, type, testId }: TestInterfaceProps) {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(900); // 15 mins
  const [loading, setLoading] = useState(true);
  const [testTitle, setTestTitle] = useState(topicOrCompany || '');
  const [monitoringEvents, setMonitoringEvents] = useState<Array<{ eventType: string; metadata?: any }>>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (type === 'id' && testId) {
      // Fetch real test from API
      fetch(`/api/tests?id=${testId}`)
        .then(res => res.json())
        .then(data => {
          if (data.test) {
            // Check if test has questions
            if (!data.test.questions || data.test.questions.length === 0) {
              setError('This test has no questions yet. Please contact your instructor or try again later.');
              setLoading(false);
              return;
            }

            // Normalize questions to match the component's expected format
            const normalizedQuestions = data.test.questions.map((q: any) => {
                // Ensure options is an array and has items
                const optionsArray = Array.isArray(q.options) ? q.options : [];
                
                return {
                    id: q.id,
                    text: q.text || 'Question text not available',
                    // Extract text from option objects, with fallback
                    options: optionsArray.map((o: any) => o?.text || 'Option not available'),
                    // Find correct option text
                    correctOption: optionsArray.find((o: any) => o?.isCorrect)?.text || '',
                    explanation: q.explanation || '',
                    topic: q.topic || 'General',
                    difficulty: q.difficulty || 'Medium',
                    section: q.section || 'General'
                };
            });
            
            // Filter out questions with no options
            const validQuestions = normalizedQuestions.filter((q: Question) => q.options.length > 0);
            
            if (validQuestions.length === 0) {
                setError('This test has invalid questions. Please contact your instructor.');
                setLoading(false);
                return;
            }
            
            setQuestions(validQuestions);
            setTestTitle(data.test.title);
            
            if (data.test.duration) {
                setTimeLeft(data.test.duration * 60);
            }
          } else {
            setError('Test not found. Please check the URL or contact your instructor.');
          }
        })
        .catch(err => {
          console.error('Failed to fetch test:', err);
          setError('Failed to load test. Please check your internet connection and try again.');
        })
        .finally(() => setLoading(false));
    } else {
        // For topic/company views without testId, show error
        setError('No test selected. Please select a test from the available tests.');
        setLoading(false);
    }
  }, [topicOrCompany, type, testId]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      submitTest();
    }
  }, [timeLeft]);

  const handleMonitoringEvent = (eventType: string, metadata?: any) => {
    setMonitoringEvents(prev => [...prev, { eventType, metadata }]);
  };

  const handleAnswer = (option: string) => {
    setAnswers({ ...answers, [questions[currentQIndex].id]: option });
  };

  const submitTest = async () => {
    // Calculate score locally for demo
    let score = 0;
    let correctCount = 0;
    questions.forEach(q => {
        if (answers[q.id] === q.correctOption) {
            score++;
            correctCount++;
        }
    });
    
    const accuracy = (correctCount / questions.length) * 100;
    const finalScore = (score / questions.length) * 100;

    // If we have a testId, submit to API
    if (testId) {
      try {
        const submitRes = await fetch(`/api/tests/${testId}/submit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            answers,
          }),
        });

        if (submitRes.ok) {
          const submitData = await submitRes.json();
          const createdResultId = submitData.result?.id;

          // Log monitoring events
          if (createdResultId && monitoringEvents.length > 0) {
            await Promise.all(
              monitoringEvents.map(event =>
                fetch('/api/monitoring', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    resultId: createdResultId,
                    eventType: event.eventType,
                    metadata: event.metadata,
                  }),
                })
              )
            );
          }

          router.push(`/dashboard/results/${createdResultId}`);
          return;
        }
      } catch (error) {
        console.error('Error submitting test:', error);
      }
    }

    // Fallback to localStorage for demo
    localStorage.setItem('lastTestResult', JSON.stringify({
        score: finalScore,
        accuracy,
        totalQuestions: questions.length,
        answers,
        questions
    }));

    router.push('/dashboard/results/latest');
  };

  if (loading) return <div className="p-8">Loading test...</div>;

  // Show error state if there's an error
  if (error) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 p-8">
        <Card className="border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="text-red-600 dark:text-red-400 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Test Not Available
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{error}</p>
            <div className="flex gap-2">
              <Button onClick={() => router.back()} variant="outline">
                Go Back
              </Button>
              <Button onClick={() => router.push('/dashboard/my-tests')}>
                View My Tests
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentQIndex];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{type === 'topic' ? 'Topic' : type === 'company' ? 'Company' : 'Test'}: {testTitle}</h1>
        <div className="text-xl font-mono bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded">
          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Question {currentQIndex + 1} of {questions.length}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg">{currentQuestion.text}</p>
          <div className="grid gap-3">
            {currentQuestion.options.map((opt, idx) => (
              <Button
                key={idx}
                variant={answers[currentQuestion.id] === opt ? "default" : "outline"}
                className="justify-start h-auto py-3 text-left"
                onClick={() => handleAnswer(opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          disabled={currentQIndex === 0}
          onClick={() => setCurrentQIndex(currentQIndex - 1)}
        >
          Previous
        </Button>
        {currentQIndex === questions.length - 1 ? (
          <Button onClick={submitTest}>Submit Test</Button>
        ) : (
          <Button onClick={() => setCurrentQIndex(currentQIndex + 1)}>Next</Button>
        )}
      </div>
    </div>
  );
}

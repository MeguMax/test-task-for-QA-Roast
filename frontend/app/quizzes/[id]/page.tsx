'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Quiz } from '@/types';
import { api } from '@/services/api';

export default function QuizDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuiz();
  }, []);

  const loadQuiz = async () => {
    try {
      const id = parseInt(params.id as string);
      const data = await api.getQuizById(id);
      setQuiz(data);
    } catch (error) {
      console.error('Failed to load quiz', error);
      alert('Quiz not found');
      router.push('/quizzes');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <nav className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              href="/"
              className="text-2xl font-bold text-slate-900 hover:text-primary-600 transition"
            >
              Quiz Builder
            </Link>
          </div>
        </nav>
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading quiz...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="text-2xl font-bold text-slate-900 hover:text-primary-600 transition"
          >
            Quiz Builder
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg border border-slate-200 p-8 mb-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {quiz.title}
          </h1>
          <p className="text-slate-600">
            {quiz.questions.length} question
            {quiz.questions.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="space-y-4">
          {quiz.questions.map((question, index) => (
            <div
              key={question.id || index}
              className="bg-white rounded-lg border border-slate-200 p-6"
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-lg font-semibold text-slate-900 mb-3">
                    {question.text}
                  </p>
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium capitalize">
                      {question.type}
                    </span>
                  </div>

                  {question.type === 'boolean' && (
                    <div className="flex gap-3">
                      <div className="px-5 py-2.5 border-2 border-accent-500 text-accent-700 bg-accent-50 rounded-lg font-medium">
                        True
                      </div>
                      <div className="px-5 py-2.5 border-2 border-red-500 text-red-700 bg-red-50 rounded-lg font-medium">
                        False
                      </div>
                    </div>
                  )}

                  {question.type === 'input' && (
                    <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-500">
                      <input
                        type="text"
                        disabled
                        placeholder="Answer will be entered here..."
                        className="w-full bg-transparent outline-none"
                      />
                    </div>
                  )}

                  {question.type === 'checkbox' && question.options && (
                    <div className="space-y-2">
                      {question.options.map((option, optIndex) => (
                        <label
                          key={optIndex}
                          className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition"
                        >
                          <input
                            type="checkbox"
                            disabled
                            className="w-4 h-4 text-primary-600 rounded"
                          />
                          <span className="text-slate-800">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            href="/quizzes"
            className="flex-1 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-semibold text-center transition"
          >
            ← Back to All Quizzes
          </Link>
          <Link
            href="/"
            className="flex-1 py-3 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-semibold text-center transition"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}

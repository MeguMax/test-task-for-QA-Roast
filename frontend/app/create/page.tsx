'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Question } from '@/types';
import { api } from '@/services/api';
import QuestionForm from '@/components/QuestionForm';
import Toast from '@/components/Toast';

export default function CreateQuizPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    { type: 'boolean', text: '' },
  ]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const handleQuestionChange = (index: number, question: Question) => {
    const updated = [...questions];
    updated[index] = question;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { type: 'boolean', text: '' }]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.createQuiz({ title, questions });
      setToast({ message: 'Quiz created successfully!', type: 'success' });
      setTimeout(() => {
        router.push('/quizzes');
      }, 1500);
    } catch (error) {
      setToast({ message: 'Failed to create quiz', type: 'error' });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

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
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Create New Quiz
          </h1>
          <p className="text-slate-600">
            Build your custom quiz with multiple question types
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Quiz Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              placeholder="e.g., JavaScript Fundamentals Quiz"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-900">
                Questions
              </h2>
              <span className="text-sm text-slate-600">
                {questions.length} question{questions.length !== 1 ? 's' : ''}
              </span>
            </div>

            {questions.map((question, index) => (
              <QuestionForm
                key={index}
                question={question}
                index={index}
                onChange={handleQuestionChange}
                onRemove={removeQuestion}
              />
            ))}

            <button
              type="button"
              onClick={addQuestion}
              className="w-full py-4 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50 font-medium transition"
            >
              + Add Another Question
            </button>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-semibold disabled:bg-slate-400 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Creating Quiz...' : 'Create Quiz'}
            </button>
            <Link
              href="/"
              className="px-8 py-3 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-semibold transition text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

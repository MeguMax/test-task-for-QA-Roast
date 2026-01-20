'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { QuizListItem } from '@/types';
import { api } from '@/services/api';
import Toast from '@/components/Toast';
import ConfirmModal from '@/components/ConfirmModal';

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<QuizListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [deleteModal, setDeleteModal] = useState<{
    id: number;
    title: string;
  } | null>(null);

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      const data = await api.getAllQuizzes();
      setQuizzes(data);
    } catch (error) {
      console.error('Failed to load quizzes', error);
      setToast({ message: 'Failed to load quizzes', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: number, title: string) => {
    setDeleteModal({ id, title });
  };

  const handleConfirmDelete = async () => {
    if (!deleteModal) return;

    try {
      await api.deleteQuiz(deleteModal.id);
      setQuizzes(quizzes.filter((q) => q.id !== deleteModal.id));
      setToast({ message: 'Quiz deleted successfully', type: 'success' });
    } catch (error) {
      setToast({ message: 'Failed to delete quiz', type: 'error' });
      console.error(error);
    } finally {
      setDeleteModal(null);
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
            <p className="text-slate-600">Loading quizzes...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {deleteModal && (
        <ConfirmModal
          title="Delete Quiz"
          message={`Are you sure you want to delete "${deleteModal.title}"? This action cannot be undone.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteModal(null)}
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

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-1">
              All Quizzes
            </h1>
            <p className="text-slate-600">
              {quizzes.length} quiz{quizzes.length !== 1 ? 'zes' : ''} available
            </p>
          </div>
          <Link
            href="/create"
            className="px-5 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-semibold transition inline-flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Quiz
          </Link>
        </div>

        {quizzes.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No quizzes yet
            </h3>
            <p className="text-slate-600 mb-6">
              Get started by creating your first quiz
            </p>
            <Link
              href="/create"
              className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-semibold transition"
            >
              Create Your First Quiz
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white border border-slate-200 rounded-lg p-5 hover:border-primary-300 hover:shadow-md transition-all group"
              >
                <div className="flex justify-between items-start gap-4">
                  <Link href={`/quizzes/${quiz.id}`} className="flex-1">
                    <h2 className="text-xl font-semibold text-slate-900 group-hover:text-primary-600 mb-2 transition">
                      {quiz.title}
                    </h2>
                    <div className="flex items-center gap-2 text-slate-600">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-sm">
                        {quiz.questionCount} question
                        {quiz.questionCount !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(quiz.id, quiz.title)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Delete quiz"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-primary-600 font-medium transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

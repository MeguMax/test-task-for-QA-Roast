import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-slate-900">Quiz Builder</h1>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-slate-900 mb-4">
            Build Custom Quizzes
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Create, manage, and organize quizzes with multiple question types.
            Perfect for educators, trainers, and content creators.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <Link
            href="/create"
            className="group bg-white p-8 rounded-xl border-2 border-slate-200 hover:border-primary-400 transition-all"
          >
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 transition">
              <svg
                className="w-6 h-6 text-primary-600"
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
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Create New Quiz
            </h3>
            <p className="text-slate-600">
              Build a quiz with custom questions and answer types
            </p>
          </Link>

          <Link
            href="/quizzes"
            className="group bg-white p-8 rounded-xl border-2 border-slate-200 hover:border-accent-500 transition-all"
          >
            <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent-200 transition">
              <svg
                className="w-6 h-6 text-accent-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              View All Quizzes
            </h3>
            <p className="text-slate-600">
              Browse and manage your existing quizzes
            </p>
          </Link>
        </div>

        <div className="mt-16 bg-white rounded-xl border border-slate-200 p-8 max-w-3xl mx-auto">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Supported Question Types
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="font-medium text-slate-900">Boolean</div>
              <div className="text-sm text-slate-600 mt-1">True/False</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="font-medium text-slate-900">Input</div>
              <div className="text-sm text-slate-600 mt-1">Text Answer</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="font-medium text-slate-900">Checkbox</div>
              <div className="text-sm text-slate-600 mt-1">Multiple Choice</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

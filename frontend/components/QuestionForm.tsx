'use client';

import { Question } from '@/types';
import { useState } from 'react';

interface QuestionFormProps {
  question: Question;
  index: number;
  onChange: (index: number, question: Question) => void;
  onRemove: (index: number) => void;
}

export default function QuestionForm({
  question,
  index,
  onChange,
  onRemove,
}: QuestionFormProps) {
  const [localQuestion, setLocalQuestion] = useState<Question>(question);

  const handleChange = (field: keyof Question, value: any) => {
    const updated = { ...localQuestion, [field]: value };
    setLocalQuestion(updated);
    onChange(index, updated);
  };

  const handleOptionChange = (optIndex: number, value: string) => {
    const newOptions = [...(localQuestion.options || [])];
    newOptions[optIndex] = value;
    handleChange('options', newOptions);
  };

  const addOption = () => {
    const newOptions = [...(localQuestion.options || []), ''];
    handleChange('options', newOptions);
  };

  const removeOption = (optIndex: number) => {
    const newOptions = (localQuestion.options || []).filter(
      (_, i) => i !== optIndex
    );
    handleChange('options', newOptions);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 mb-4">
      <div className="flex justify-between items-start mb-5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-100 text-slate-700 rounded-full flex items-center justify-center font-semibold text-sm">
            {index + 1}
          </div>
          <h3 className="text-lg font-semibold text-slate-900">
            Question {index + 1}
          </h3>
        </div>
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded-md font-medium transition"
        >
          Remove
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Question Type
          </label>
          <select
            value={localQuestion.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
          >
            <option value="boolean">Boolean (True/False)</option>
            <option value="input">Input (Text Answer)</option>
            <option value="checkbox">Checkbox (Multiple Choice)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Question Text *
          </label>
          <input
            type="text"
            value={localQuestion.text}
            onChange={(e) => handleChange('text', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
            placeholder="Enter your question"
          />
        </div>

        {localQuestion.type === 'checkbox' && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Answer Options
            </label>
            <div className="space-y-2">
              {(localQuestion.options || []).map((option, optIndex) => (
                <div key={optIndex} className="flex gap-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(optIndex, e.target.value)
                    }
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                    placeholder={`Option ${optIndex + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeOption(optIndex)}
                    className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-medium transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addOption}
              className="mt-3 px-4 py-2 bg-accent-50 text-accent-700 hover:bg-accent-100 rounded-lg font-medium transition"
            >
              + Add Option
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

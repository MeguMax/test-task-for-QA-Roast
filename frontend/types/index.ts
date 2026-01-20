export interface Question {
  id?: number;
  type: 'boolean' | 'input' | 'checkbox';
  text: string;
  options?: string[];
}

export interface Quiz {
  id?: number;
  title: string;
  questions: Question[];
}

export interface QuizListItem {
  id: number;
  title: string;
  questionCount: number;
}

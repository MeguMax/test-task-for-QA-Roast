import axios from 'axios';
import { Quiz, QuizListItem } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const api = {
  async createQuiz(quiz: Quiz): Promise<Quiz> {
    const response = await axios.post(`${API_URL}/quizzes`, quiz);
    return response.data;
  },

  async getAllQuizzes(): Promise<QuizListItem[]> {
    const response = await axios.get(`${API_URL}/quizzes`);
    return response.data;
  },

  async getQuizById(id: number): Promise<Quiz> {
    const response = await axios.get(`${API_URL}/quizzes/${id}`);
    return response.data;
  },

  async deleteQuiz(id: number): Promise<void> {
    await axios.delete(`${API_URL}/quizzes/${id}`);
  },
};

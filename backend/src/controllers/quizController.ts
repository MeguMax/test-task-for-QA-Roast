import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface QuestionInput {
  type: string;
  text: string;
  options?: string[];
}

interface CreateQuizInput {
  title: string;
  questions: QuestionInput[];
}

interface QuestionData {
  id: number;
  quizId: number;
  type: string;
  text: string;
  options: string | null;
}

export const createQuiz = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, questions }: CreateQuizInput = req.body;

    const quiz = await prisma.quiz.create({
      data: {
        title,
        questions: {
          create: questions.map((q: QuestionInput) => ({
            type: q.type,
            text: q.text,
            options: q.options ? JSON.stringify(q.options) : null,
          })),
        },
      },
      include: {
        questions: true,
      },
    });

    // Parse options back to array
    const quizWithParsedOptions = {
      ...quiz,
      questions: quiz.questions.map((q: QuestionData) => ({
        ...q,
        options: q.options ? JSON.parse(q.options) : null,
      })),
    };

    res.status(201).json(quizWithParsedOptions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create quiz' });
  }
};

export const getAllQuizzes = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: {
        _count: {
          select: { questions: true },
        },
      },
    });

    const result = quizzes.map((quiz: any) => ({
      id: quiz.id,
      title: quiz.title,
      questionCount: quiz._count.questions,
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
};

export const getQuizById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const quiz = await prisma.quiz.findUnique({
      where: { id: parseInt(id) },
      include: {
        questions: true,
      },
    });

    if (!quiz) {
      res.status(404).json({ error: 'Quiz not found' });
      return;
    }

    // Parse options back to array
    const quizWithParsedOptions = {
      ...quiz,
      questions: quiz.questions.map((q: QuestionData) => ({
        ...q,
        options: q.options ? JSON.parse(q.options) : null,
      })),
    };

    res.json(quizWithParsedOptions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
};

export const deleteQuiz = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.quiz.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete quiz' });
  }
};

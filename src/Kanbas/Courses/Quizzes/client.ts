import axios from 'axios';
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

export const deleteQuiz = async (quizID : string) => {
  const response = await axios.delete(`${QUIZZES_API}/${quizID}`);
  return response.data;
};

export const createQuizzes = async (courseId : string, quiz : any) => {
  const response = await axios.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
  return response.data;
};

export const findQuizzesForCourse = async (courseId : string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};

export const findQuizzes = async (courseId : string, qid : string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/quizzes/${qid}`);
  return response.data;
};

export const updateQuiz = async (quiz : any) => {
  const response = await axios.put(`${QUIZZES_API}/${quiz.id}`, quiz);
  return response.data;
};

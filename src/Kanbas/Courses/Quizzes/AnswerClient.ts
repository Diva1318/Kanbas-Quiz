import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const ANSWERS_API = `${REMOTE_SERVER}/api/answers`;

export const createAnswer = async (answer: any) => {
  try {
    const response = await axios.post(`${ANSWERS_API}/answers`, answer);
    return response.data;
  } catch (error) {
    console.error('Error creating answer:', error);
    throw error;
  }
};
 
export const updateAnswer = async (userId: string, quizId: string, questionId: string, answer: any) => {
  try {
    const response = await axios.put(`${ANSWERS_API}/answers/${userId}/${quizId}/${questionId}`, answer);
    return response.data;
  } catch (error) {
    console.error('Error updating answer:', error);
    throw error;
  }
};
 
export const fetchAnswer = async (userId: string, quizId: string, questionId: string) => {
  try {
    const response = await axios.get(`${ANSWERS_API}/answers/${userId}/${quizId}/${questionId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching answer:', error);
    throw error;
  }
};
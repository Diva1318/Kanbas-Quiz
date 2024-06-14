import axios from 'axios';
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

export const deleteAssignment = async (assignmentID : string) => {
  const response = await axios.delete(`${ASSIGNMENTS_API}/${assignmentID}`);
  return response.data;
};

export const createAssignment = async (courseId : string, assignment : any) => {
  const response = await axios.post(`${COURSES_API}/${courseId}/assignments`, assignment);
  return response.data;
};

export const findAssignmentsForCourse = async (courseId : string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};

export const findAssignment = async (courseId : string, aid : string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/assignments/${aid}`);
  return response.data;
};

export const updateAssignment = async (assignment : any) => {
  const response = await axios.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
  return response.data;
};

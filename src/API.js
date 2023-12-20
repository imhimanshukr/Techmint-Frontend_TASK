import axios from 'axios';


export const getUserData = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getUserPost = async (id) => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const getAllPost = async () => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const getCountryList = async () => {
  try {
    const response = await axios.get('https://worldtimeapi.org/api/timezone');
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const getCurrentTime = async (region) => {
  try {
    const response = await axios.get(`https://worldtimeapi.org/api/timezone/${region}`);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

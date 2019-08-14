import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-1fced.firebaseio.com/'
});

export default instance;

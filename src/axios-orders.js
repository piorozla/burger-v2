import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger2-8f90c.firebaseio.com/',
});

export default instance;

import axios from 'axios';

export default axios.create({
    baseURL: 'http://copafilmes.azurewebsites.net',
    timeout: 1000
});
import axios from 'axios';

const baseURL = 'http://localhost:3437/api/';

const Axios = axios.create({
        
    baseURL: baseURL,
    timeout: 10000,
});
export default Axios;
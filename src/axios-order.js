import axios from 'axios';

let instance = axios.create({
    baseURL: 'https://reactprojectburger-default-rtdb.firebaseio.com/',
    
});



export default instance;
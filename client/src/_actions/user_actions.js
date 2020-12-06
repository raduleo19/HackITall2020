import axios from 'axios';
import {
    LOGIN_USER,
} from './types';

export function loginUser(dataToSubmit) {
    console.log(dataToSubmit);
    const request = axios.post(`localhost:5000/api/user/login`, "FUTUTI")
        .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

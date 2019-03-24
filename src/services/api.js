import AJAX from './ajax';
import { AUTHEN_PARAMS } from '../config';

export default class API {

    static async getToken() {
        let token = localStorage.getItem('token');

        if (!token) {
            const response = await AJAX.post('/oath/token', { body: AUTHEN_PARAMS });
            console.log(response);
            // localStorage.setItem('token', response.token);
        }

        return token;
    }

    static async getZipUrl(file) {
        const token = await API.getToken();
        const params = {
            headers: {
                "Authorization": `Token ${token}`
            },
            body: {
                template: file
            }
        };

        return AJAX.post('/printproof', params);
    }
}

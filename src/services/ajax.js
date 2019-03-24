import { BASE_URL } from '../config';

const fetch = require('node-fetch');

export default class AJAX {

    static async request(url, params) {
        const { method, ...userParams } = params;
        const finalParams = {
            headers: {
                'Content-Type': 'application/json'
            },
            method,
            ...userParams
        };
        console.log(finalParams);

        const response = await fetch(`${BASE_URL}${url}`, finalParams);
        let result;

        try {
            result = await response.json();
        } catch (e) {
            result = response;
        }

        return result;
    }

    static async get(url, params) {
        return AJAX.request(url, {
            method: 'GET',
            ...params
        });
    }

    static async post(url, params) {
        return AJAX.request(url, {
            method: 'POST',
            ...params
        });
    }
}

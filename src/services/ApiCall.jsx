import axios from 'axios';
const baseURL = 'http://localhost:8080/icleaf/rest/loginservice/';

export const PostApi = async (method, url, data, headers) => {
    try {
        const response = await axios({
            method: method,
            url: baseURL + url,
            data: data,
            headers: headers
        })
        return response;
    }
    catch (error) {
        throw error
    }
}

export const GetApi = async (method, url, params, headers = null) => {
    try {
        const response = await axios({
            method: method,
            url: baseURL + url,
            params: params,
            headers: headers,
        });
        console.log(params,"param")
        return response;

    } catch (error) {
        console.error('API Error:', error.message);
        throw error;
    }
}

const ApiCall ={
    PostApi,
    GetApi
}


export default ApiCall;
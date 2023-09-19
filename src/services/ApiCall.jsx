import axios from 'axios';
const baseURL = 'http://localhost:8080/icleaf/rest/loginservice/';

const PostApi = async (method, url, data, headers) => {
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


// const RequestFormdata = async (method, url, data, headers) => {
//     try {
//         const response = await axios({
//             method: method,
//             url: baseURL + url,
//             data: data,
//             headers: headers
//         });
//         return response;
//     } catch (error) {
//         throw error;
//     }
// };



const ApiCall = {
    PostApi,
};
export default ApiCall;
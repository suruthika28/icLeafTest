import axios from 'axios';
// const URL = 'https://courses.icleaf.in/testleaf/rest/loginservice/';
const URL = 'http://192.168.2.41:8080/icleaf/rest/loginservice/'
const URL1 = 'http://192.168.2.41:8080/icleaf/rest/loginservice/'
const GetUserPurchaseElearn = (token) => {
    const api = axios.create({
        baseURL: URL,
        headers: { Authorization: `Bearer ${token}` }
    });
    return api
        .post('getUserPurchaseElearn')
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log('Error');
            return error;
        });
};
const GetAllMyCourses = (token) => {
    const api = axios.create({
        baseURL: URL,
        headers: { Authorization: `Bearer ${token}` }
    });
    return api
        .get('getAllMyCourses')
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log('Error');
            return error;
        });
};
const Gettopiclistforelearn = (token, subjectId) => {
    const api = axios.create({
        baseURL: URL,
        headers: { Authorization: `Bearer ${token}` }
    });
    return api
        .post('gettopiclistforelearn?subjectId=' + subjectId)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log('Error');
            return error;
        });
};
const getAllELearnContent = (token, subjectId, topicId, elearnContentType) => {
    var formdata = new FormData();
    formdata.append('subjectId', subjectId);
    formdata.append('topicId', topicId);
    formdata.append('elearnContentType', elearnContentType)
    const api = axios.create({
        baseURL: URL,
        headers: { Authorization: `Bearer ${token}` }
    });
    return api
        .post('getAllELearnContent', formdata)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log('Error');
            return error;
        });
};
const GetServerDateTime = () => {
    const api = axios.create({
        baseURL: URL1
    });
    return api
        .get('getserverdatetime')
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log('Error');
            return error;
        });
};
const ActiveExamsDto = (token) => {
    const api = axios.create({
        baseURL: URL,
        headers: { Authorization: `Bearer ${token}` }
    });
    return api
        .post('activeexamsDto')
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log('Error');
            return error;
        });
};
const ActiveExamPack = (token, categoryid) => {
    const api = axios.create({
        baseURL: URL,
        headers: { Authorization: `Bearer ${token}` }
    });
    return api
        .post('activeexampack?categoryid=' + categoryid)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log('Error');
            return error;
        });
};
const ActiveExamEdit = (token, examPackId) => {
    const api = axios.create({
        baseURL: URL,
        headers: { Authorization: `Bearer ${token}` }
    });
    return api
        .post('activeexamedit?examPackId=' + examPackId)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log('Error');
            return error;
        });
};
const ActiveExamDetails = (token, examid, exampackid) => {
    const api = axios.create({
        baseURL: URL,
        headers: { Authorization: `Bearer ${token}` }
    });
    return api
        .post('activeexamdetails?examid=' + examid + '&exampackid=' + exampackid)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log('Error');
            return error;
        });
};
const getExamInstructions = (token, examid) => {
    var formdata = new FormData();
    formdata.append('examId', examid);
    const api = axios.create({
        baseURL: URL,
        headers: { Authorization: `Bearer ${token}` }
    });
    return api
        .post('getExamInstructions', formdata)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log('Error');
            return error;
        });
};
const reviewexamAjax = (reivewexamId, reivewexamPackId) => {
    const api = axios.create({
        baseURL: URL
    });
    return api
        .post('gettopiclistforelearn?reivewexamId=' + reivewexamId + '&reivewexamPackId=' + reivewexamPackId)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log('Error');
            return error;
        });
};
const startExamDto = (token, examId, examPackId, examTakenId) => {
    var formdata = new FormData();
    formdata.append('examId', examId);
    formdata.append('examPackId', examPackId);
    formdata.append('examTakenId', examTakenId);

    const api = axios.create({
        baseURL: URL,
        headers: { Authorization: `Bearer ${token}` }
    });
    return api
        .post('startExamDto', formdata)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log('Error');
            return error;
        });
};
const getQuestionAnswerDetail = (token, examId, examPackId, examTakenId, elearnFlag, activeexam) => {
    var formdata = new FormData();
    formdata.append('examId', examId)
    formdata.append('examPackId', examPackId);
    formdata.append('examTakenId', examTakenId);
    formdata.append('elearnFlag', elearnFlag);
    formdata.append('activeexam', activeexam)
    const api = axios.create({
        baseURL: URL,
        headers: { Authorization: `Bearer ${token}` }
    });
    return api
        .post('getQuestionAnswerDetails', formdata)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log('Error');
            return error;
        });
};
const userService = {
    GetUserPurchaseElearn,
    Gettopiclistforelearn,
    getAllELearnContent,
    GetServerDateTime,
    ActiveExamsDto,
    ActiveExamPack,
    ActiveExamEdit,
    ActiveExamDetails,
    getExamInstructions,
    reviewexamAjax,
    startExamDto,
    getQuestionAnswerDetail,
    GetAllMyCourses
    // updateCurrentQuestion,
    // suspendOrsubmitExam
};
export default userService;
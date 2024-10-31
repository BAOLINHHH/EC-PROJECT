

import axios  from "./axios";

const apiTag =  {
    getAllCategory (){
        const url = 'categories';
        return axios.get(url);
    },
    getAllPublicCompany(){
        const url = 'publiccompanies';
        return axios.get(url);
    },
    getAllForm(){
        const url = 'forms';
        return axios.get(url)
    },
    getAllLanguage(){
        const url = 'languages';
        return axios.get(url);
    }
};
export default apiTag


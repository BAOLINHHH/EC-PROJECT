

import AddCategory from "../screens/admin/AddCategory";
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
    },
    addPublicCompany(){
        const url = 'publiccompanies';
        return axios.post(url);
    },
    addForm(){
        const url = 'forms'
        return axios.post(url);
    },
    addLanguage(){
        const url = 'languages'
        return axios.post(url);
    },
    AddCategory(data){
        console.log(4894,data)
        const url = 'categories';
        // return axios.post(url,data)
    }
};
export default apiTag


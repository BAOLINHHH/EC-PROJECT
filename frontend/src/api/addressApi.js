

import axios  from "./axios";

const addressApi =  {
    update(data){
        const url = 'shippingaddress'
        return axios.post(url,data);
    }
    
};
export default addressApi


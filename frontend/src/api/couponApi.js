

import axios  from "./axios";

const couponApi =  {
 
    getAll(){
        const url = 'coupon'
        return axios.get(url);
    },
    create(data){
        const url ='coupon/create'
        return axios.post(url,data)
    },
    update(id, data){
        console.log(id)
        const url = `coupon/${id}`
        return axios.put(url,data)
    }
    
    
};
export default couponApi


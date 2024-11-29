

import axios  from "./axios";

const couponApi =  {
 
    getAll(){
        const url = 'coupon'
        return axios.get(url);
    },
    
    
};
export default couponApi


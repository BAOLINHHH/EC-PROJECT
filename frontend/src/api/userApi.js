import axios  from "./axios";
const userApi={
    loginUser(data){
        const url = 'users/auth' 
        return axios.post(url,data)
       .then(response =>{
        console.log('Response from server: ', response); // Logs the response body
            return response;  // Return only the response body
       })
    },

    registerUser(data){
        const url = 'users'
        return axios.post(url,data);
    }
};
export default userApi;
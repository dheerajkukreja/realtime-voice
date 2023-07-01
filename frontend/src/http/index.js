import axios from 'axios';


export const sendOtp = (data) =>{
    return new Promise((resolve, reject)=>{
        let config = {
            method: 'post',
            url: process.env.REACT_APP_API_URL + '/api/user/sendOtp',
            headers: { 
                'Content-Type': 'application/json'
            },
            data
        }
        axios(config).then((response)=>{
            resolve(response)
        }).catch(err=>{
            reject(err)
        })
    })    
}

export const verifyOtp = (data)=>{
    return new Promise((resolve, reject)=>{
        let config = {
            method: 'post',
            url: process.env.REACT_APP_API_URL + '/api/user/verify-otp',
            headers: { 
                'Content-Type': 'application/json'
            },
            data,
            withCredentials: true,
        }
        axios(config).then((response)=>{
            resolve(response)
        }).catch(err=>{
            reject(err)
        })
    })    
}


export const activate = (data)=>{
    return new Promise((resolve, reject)=>{
        let config = {
            method: 'post',
            url: process.env.REACT_APP_API_URL + '/api/user/activate',
            headers: { 
                'Content-Type': 'application/json'
            },
            data,
            withCredentials: true,
        }
        axios(config).then((response)=>{
            resolve(response)
        }).catch(err=>{
            reject(err)
        })
    })
}

export const logout = ()=>{
    return new Promise((resolve, reject)=>{
        let config = {
            method: 'post',
            url: process.env.REACT_APP_API_URL + '/api/user/logout',
            headers: { 
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        axios(config).then((response)=>{
            resolve(response)
        }).catch(err=>{
            reject(err)
        })
    })
}

export const createRoom =(data) =>{
    return new Promise((resolve, reject)=>{
        let config = {
            method: 'post',
            url: process.env.REACT_APP_API_URL + '/api/rooms',
            headers: { 
                'Content-Type': 'application/json'
            },
            data,
            withCredentials: true
        }
        axios(config).then((response)=>{
            resolve(response)
        }).catch(err=>{
            reject(err)
        })
    })
}

export const getAllRooms =() =>{
    return new Promise((resolve, reject)=>{
        let config = {
            method: 'get',
            url: process.env.REACT_APP_API_URL + '/api/rooms',
            headers: { 
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        axios(config).then((response)=>{
            resolve(response)
        }).catch(err=>{
            reject(err)
        })
    })
}




// axios.interceptors.response.use(
//     (config) => {
//         return config;
//     },
//     async (error) => {
//         const originalRequest = error.config;
//         if (
//             error.response.status === 401 &&
//             originalRequest &&
//             !originalRequest._isRetry
//         ) {
//             originalRequest.isRetry = true;
//             try {
//                 await axios.get(
//                     `${process.env.REACT_APP_API_URL}/api/user/refresh-token`,
//                     {
//                         withCredentials: true,
//                     }
//                 );
//                 axios.defaults.headers.common['Content-Type'] = "application/json";
//                 return axios.request(error.config);
//             } catch (err) {
//                 console.log(err.message);
//             }
//         }
//         throw error;
//     }
// );
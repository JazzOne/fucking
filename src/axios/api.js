import axios from 'axios';
import Vue from 'vue'
axios.defaults.headers.post['Content-Type'] = 'application/json'
// axios.defaults.headers.post['Content-Type'] = 'application/x-requested-with';
// 172.21.92.62
// 172.21.92.62
axios.defaults.baseURL = 'http://172.21.92.62:8080';
const ajax = {
    post(url, data = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                 .then(response => {
                    resolve(response.data);
                 })
                 .catch(error => {
                    //  if(error.data) {
                    //     throw new Error(error.data.message);
                    //  }else {
                    //     throw new Error(error.data.message);
                    //  }
                     reject(error)
                 })
        }) 
            
        
    },
    get(url, params = {}) {
        return new Promise((resolve, reject) =>{
            axios.get(url, { params })
                 .then(response => {
                     resolve(response.data)
                 })
                 .catch(error => {
                    reject(error)
                 })
        })
    },

    
}

Vue.prototype.$http = ajax
export default ajax;
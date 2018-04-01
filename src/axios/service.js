import api from './api'
import axios from 'axios';

// 首页ajax基础参数
let indexUrl = 'http://172.21.92.62:8080';
let datetime = new Date(),
    year = datetime.getFullYear(),
    month = datetime.getMonth() + 1,
    day = datetime.getDate();





const fetch = {
    //
    //  获取企业列表
    //  @type   企业类型：水质站（2）、空气站（）、污染企业（1）
    //  @pageNo 
    // 
    getEnterpiseList(type, pageNo = 1, pageSize = 5) {
        return new Promise((resolve, reject) => {
            api.get('http://172.21.92.215:8080/enterpiseInfo/list', {
                type: type,
                pageNo: pageNo,
                pageSize: pageSize
            }).then(res => {
                // console.log(res)
                resolve(res)
            })
        })
    },
    
    // 获取空气质量AQI
    getAQI(size = 1) {
        return new Promise((resolve, reject) => {
 
            api.post(`${indexUrl}/airinfo/getaqi`,{
                years: String(year),
                month: "3",
                day: "21",
                areaCode: "2",
                length: String(size)
            }).then(res => {
                console.log('空气质量AQI：', res.data)
                resolve(res.data)
            });

        })
    },

    // 获取主页面板
    getDashBoard() {
        return new Promise((resolve, reject) => {

        
            axios.all([getAQIRank(), getGoodDay(), getPmAvg()])
            .then(axios.spread(function (rank, day, avg) {
                let results = { 
                    rank: rank.data, 
                    day: day.data, 
                    avg: avg.data 
                };
                resolve(results)
            }));

        })
    }


}

// 主页请求

// 获取AQI排名
// 默认获取今年本月的AQI排名
export function getAQIRank() {
    return api.post(`${indexUrl}/airinfo/getaqipm`,{
        "month": "3",
        "areaId":"2",
        "years": String(year)
    })
};

// 获取优良天数
export function getGoodDay() {
    return api.post(`${indexUrl}/airinfo/getgooddays`,{
        "areaId":"2",
        "years": String(year)
    })
}

// 获取平均浓度
export function getPmAvg() {
    // 先获取所有地区的areaid
    // fetch.getAQI().then(res => {
    //     let areaIds = [],
    //         obj = {};
    //     res.forEach(element => {
    //         if(Object.prototype.toString.call(element) !== '[object Null]') {
    //             obj = {
    //                 areaId: String(element.areaId),
    //                 years: element.years
    //             } 
    //             areaIds.push(obj)
    //         }
    //     });

    //     // console.log(areaIds)

        
        return api.post(`${indexUrl}/airinfo/getavgpmofyears`, [{
            "years": String(year),
            "areaId": "2" // 默认返回荣昌的pm2.5浓度
        }]);


    // })
    
}


export default fetch
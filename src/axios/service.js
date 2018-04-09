import api from './api'
import axios from 'axios';

// 首页ajax基础参数
// 172.21.92.62
let indexUrl = 'http://172.21.92.62:8080',
    otherUrl = 'http://172.21.92.62:8080/enterpiseInfo';
let datetime = new Date(),
    year = datetime.getFullYear(),
    // month = datetime.getMonth() + 1,
    month = (datetime.getMonth() + 1) < 10 ? '0' + (datetime.getMonth() + 1) : (datetime.getMonth() + 1),
    day = datetime.getDate();

    

const fetch = {
    //
    //  获取企业列表
    //  @type   企业类型：水质站（2）、空气站（）、污染企业（1）
    //  @pageNo 
    // 
    getEnterpiseList(type, pageNo = 1, pageSize = 5) {
        return new Promise((resolve, reject) => {
            api.get(`${otherUrl}/list`, {
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
                month: String(month),
                day: String(day),
                areaCode: "500153",
                length: String(size)
            }).then(res => {
                resolve(res.data)
            });

        })
    },

    getAreaId() {
        return api.get(`${indexUrl}/airinfo/getAllAreaId`);
    },

    getTable(params) {
        return api.get(`${otherUrl}/req/find`, params);
    },

    getCWQI() {
        // console.log(month)
        return this.getAreaId().then(res => {
            
            let obj = {
                "years": String(year),
                "month": "03",
                "areaId": ""
            };
            let arr = [];
            res.data.forEach(value => {
                obj.areaId = value.areaId;
                arr.push(obj)
            });
            
            // console.log(arr, 'cwqi请求参数')

            return api.post('http://172.21.92.62:8080/waterinfo/getcqwiInfolist', arr)
            //    .then(res => {
            //      console.log(res, 'cwqi排名')
            //    });


        })

    }
}

// 主页请求

// 获取AQI排名
// 默认获取今年本月的AQI排名
export function getAQIRank() {
    return api.post(`${indexUrl}/airinfo/getaqipm`,{
        "month": String(month),
        "areaId":"500153",
        "years": String(year)
    })
};

// 获取优良天数
export function getGoodDay() {
    return api.post(`${indexUrl}/airinfo/getgooddays`,{
        "areaId":"500153",
        "years": String(year)
    })
}

// 获取平均浓度
export function getPmAvg(params) {
    // 先获取所有地区的areaid
    // return fetch.getAQI().then(res => {
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
    //     // return api.post(`${indexUrl}/airinfo/getavgpmofyears`, areaIds);
    // })

    return api.post(`${indexUrl}/airinfo/getavgpmofyears`, [{
        years: String(year),
        areaId: '500153'
    }]);
    
}

// 获取cqwi排名
export function getCqwiRank() {
    return api.post(`${indexUrl}/waterinfo/getcqwipm`, {
        "years": String(year),
        "month": "03",
        "areaId": "500153"
    })
}

// 获取超标指数
// 默认获取地表
export function getPoint() {
    return axios.post('http://172.21.92.62:8080/waterinfo/getchaobiaoyz', {
        "mn":"98333426611001"
    })
}
// 获取水质达标率
// 默认获取地表水达标率
export function getRate() {
    return axios.post('http://172.21.92.62:8080/waterinfo/getwaterrate', {
        years: String(year),
        areaId: "500153",
        // type: type  // 地表水（1） 饮用水（2）
    })
}



export default fetch
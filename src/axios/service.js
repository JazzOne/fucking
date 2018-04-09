import api from './api'
import axios from 'axios';

// 首页ajax基础参数
// 172.21.92.62
let indexUrl = 'http://172.21.92.62:8080',
    otherUrl = '/enterpiseInfo';
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
            api.get(`${indexUrl}/airinfo/getallavgpmofyears`).then(res => {
                console.log(res)
            })
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
            
            
            let arr = [];
            res.data.forEach(value => {
                var obj = {
                    "years": String(year),
                    "month": String(month),
                    "areaId": ""
                };
                obj.areaId = value.areaId;
                arr.push(obj)
            });
            
            // console.log(arr, 'cwqi请求参数')

            return api.post('/waterinfo/getcqwiInfolist', arr)
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
    //先获取所有地区的areaid
    return fetch.getAQI('13').then(res => {
        let areaIds = [];
        res.forEach(element => {
            if(Object.prototype.toString.call(element) !== '[object Null]') {
                var obj = {
                    areaId: String(element.areaId),
                    years: element.years
                } 
                areaIds.push(obj)
            }
        });
        console.log(areaIds);
        return api.post(`${indexUrl}/airinfo/getavgpmofyears`, areaIds);
        // return api.post(`${indexUrl}/airinfo/getavgpmofyears`, areaIds);
    })

    // return api.post(`${indexUrl}/airinfo/getavgpmofyears`, [{
    //     years: String(year),
    //     areaId: '500153'
    // }]);
    
}

// 获取cqwi排名
export function getCqwiRank() {
    return api.post(`${indexUrl}/waterinfo/getcqwipm`, {
        "years": String(year),
        "month": String(month),
        "areaId": "500153"
    })
}

// 获取超标指数
// 默认获取地表
export function getPoint() {
    return axios.post('/waterinfo/getchaobiaoyz', {
        "mn":"98333426611001"
    })
}
// 获取水质达标率
// 默认获取地表水达标率
export function getRate() {
    
    return axios.post('/waterinfo/getratelist', {
        years: String(year),
        areaId: "500153",
        // type: type  // 地表水（1） 饮用水（2）
    })

    
}



export default fetch
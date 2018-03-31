import api from './api'
//
//  获取企业列表
//  @type   企业类型：水质站（2）、空气站（）、污染企业（1）
//  @pageNo 
// 
const fetch = {

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
    }
}


export default fetch
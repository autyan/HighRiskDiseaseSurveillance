/*
 * @Author: Alex
 * @Date: 2022-05-17 10:31:14
 * @LastEditors: Alex
 * @LastEditTime: 2022-05-17 11:16:54
 * @Description: file content
 */
var env = require('../utils/env.js');

let serviceCall = null;

if (typeof __wxConfig =="object"){
  let version = __wxConfig.envVersion;
  console.log("当前环境:" + version)
  if (version =="develop"){
    //工具或者真机 开发环境
    // var cloud = new wx.cloud.Cloud({resourceEnv:'prod-0g7y3h923f261408'});
    // cloud.init();
    // serviceCall = function(url, data, method, tokenType, token, resolve, reject){
    //   cloud.callContainer({
    //     "config": {
    //       "env": "prod-0g7y3h923f261408"
    //     },
    //     "path": url,
    //     "header": {
    //       "X-WX-SERVICE": "dotnet-0ngd",
    //       'Content-type': 'application/json',
    //       'Authorization': tokenType + token
    //     },
    //     "method": method,
    //     "data": data,
    //     "success":function(res){
    //       wx.hideLoading();
    //       resolve(res.data);
    //     },
    //     "fail":reject
    //   });
    // }
    serviceCall = function(url, data, method, tokenType, token, resolve, reject){
    let fullUrl = `${env.baseUrl}${url}`;
      wx.request({
        url: fullUrl,
        method,
        data,
        header: {
          'Content-type': 'application/json',
          'Authorization': tokenType + token
        },
        // 成功的回调函数
        success(res) {
          if (res.statusCode === 200) {
            // 将response的数据resolve出去
            resolve(res.data)
            wx.hideLoading()
          } else {
            if(env.showErrDetial){
              wx.showModal({
                title:'请求失败',
                content:res.statusCode + '\r\n' + res.errMsg + '\r\n' + fullUrl
              })
            }else{
              wx.showToast({
                title: '请求失败',
                icon: 'error'
              })
            }
            reject(res);
          }
        },
        fail(error) {
          if(env.showErrDetial){
            console.log(error);
            wx.showModal({
              title:'请求失败',
              content:error.errMsg + '\r\n' + fullUrl
            })
          }else{
            wx.showToast({
              title: '请求失败',
              icon: 'error'
            })
          }
          reject(error);
        }
      })
    }
  }else if (version =="trial"){
    //测试环境(体验版)
    var cloud = new wx.cloud.Cloud({resourceEnv:'prod-0g7y3h923f261408'});
    cloud.init();
    serviceCall = function(url, data, method, tokenType, token, resolve, reject){
      cloud.callContainer({
        "config": {
          "env": "prod-0g7y3h923f261408"
        },
        "path": url,
        "header": {
          "X-WX-SERVICE": "dotnet-0ngd",
          'Content-type': 'application/json',
          'Authorization': tokenType + token
        },
        "method": method,
        "data": data,
        "success":function(res){
          wx.hideLoading();
          resolve(res.data);
        },
        "fail":reject
      });
    }
  }else if (version =="release"){
    //正式环境
  }
}

module.exports = {
  serviceCall: serviceCall,
  tokenType: 'Bearer ',
  token: null,
  request: function (url, data = {}, method = 'GET') {
    // 此处baseUrl需要从定义的env.js文件中import
    wx.showLoading({
      title: '加载中',
    })
    let me = this;
    // 使用Promise封装一层
    return new Promise((resolve, reject) => {
      this.serviceCall(url, data, method,me.tokenType, me.token, resolve, reject);
    })
  }
}
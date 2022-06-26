/*
 * @Author: Alex
 * @Date: 2022-05-17 10:31:14
 * @LastEditors: Alex
 * @LastEditTime: 2022-05-17 11:16:54
 * @Description: file content
 */
var env = require('../utils/env.js');

let serviceCall = null;
var distributorId = null;

if (typeof __wxConfig == "object") {
  let version = __wxConfig.envVersion;
  console.log("当前环境:" + version)
  if (version == "develop") {
    serviceCall = function (url, data, method, tokenType, token, resolve, reject) {
      let fullUrl = `${env.baseUrl}${url}`;
      var header = null;
      if (token.length > 0) {
        header = {
          'Content-type': 'application/json',
          'Authorization': tokenType + token
        };
      } else {
        header = {
          'Content-type': 'application/json',
        };
      }
      wx.request({
        url: fullUrl,
        method,
        data,
        header: header,
        // 成功的回调函数
        success(res) {
          if (res.statusCode === 200) {
            // 将response的数据resolve出去
            resolve(res.data)
            wx.hideLoading()
          } else {
            if (env.showErrDetial) {
              wx.showModal({
                title: '请求失败',
                content: res.statusCode + '\r\n' + res.errMsg + '\r\n' + fullUrl
              })
            } else {
              wx.showToast({
                title: '请求失败',
                icon: 'error'
              })
            }
            reject(res);
          }
        },
        fail(error) {
          if (env.showErrDetial) {
            console.log(error);
            wx.showModal({
              title: '请求失败',
              content: error.errMsg + '\r\n' + fullUrl
            })
          } else {
            wx.showToast({
              title: '请求失败',
              icon: 'error'
            })
          }
          reject(error);
        }
      })
    }
  } else if (version == "trial") {
    //测试环境(体验版)
    var cloud = new wx.cloud.Cloud({
      resourceEnv: 'prod-0g7y3h923f261408'
    });
    cloud.init();
    serviceCall = function (url, data, method, tokenType, token, resolve, reject) {
      var header = null;
      if (token.length > 0) {
        header = {
          "X-WX-SERVICE": "dotnet-0ngd",
          'Content-type': 'application/json',
          'Authorization': tokenType + token
        };
      } else {
        header = {
          "X-WX-SERVICE": "dotnet-0ngd",
          'Content-type': 'application/json'
        };
      }
      cloud.callContainer({
        "config": {
          "env": "prod-0g7y3h923f261408"
        },
        "path": url,
        "header": header,
        "method": method,
        "data": data,
        "success": function (res) {
          wx.hideLoading();
          resolve(res.data);
        },
        "fail": reject
      });
    }
  } else if (version == "release") {
    //正式环境
  }
}

module.exports = {
  serviceCall: serviceCall,
  tokenType: 'Bearer ',
  loginUser: null,
  token: null,
  request: function (url, data = {}, method = 'GET') {
    if (this.loginUser == null && url != '/api/auth') {
      wx.showToast({
        title: '请先登录',
      })
      return;
    }
    // 此处baseUrl需要从定义的env.js文件中import
    wx.showLoading({
      title: '加载中',
    })
    let me = this;
    // 使用Promise封装一层
    return new Promise((resolve, reject) => {
      var token = '';
      if (me.token != null) {
        token = me.token;
      }
      this.serviceCall(url, data, method, me.tokenType, token, resolve, reject);
    })
  },
  logout(){
    wx.removeStorageSync('me');
    this.loginUser = null;
    this.token = null;
  },
  updateUserInfo(userInfo){
    var loginUser = wx.getStorageSync("me");
    loginUser.userInfo = userInfo;
    wx.setStorageSync("me", loginUser);
    this.loginUser = userInfo;
  },
  loadUserInfo(call) {
    let service = this;
    this.distributorId = wx.getStorageSync('distributor');
    wx.checkSession({
      success: function () {
        var userInfo = wx.getStorageSync("me");
        if (userInfo != null && new Date(userInfo.expiresAt) > new Date()) {
          service.loginUser = userInfo.userInfo;
          service.token = userInfo.accessToken;
          call();
        } else {
          service.login(call);
        }
      },
      fail(res) {
        service.login(call);
      },
    });
  },
  login(call) {
    let service = this;
    wx.login({
      success(res) {
        if (res.code) {
          let par = {
            Code: res.code,
            DistributorId: service.distributorId
          };
          service.request("/api/auth", par, "POST").then((response) => {
            // 开启加密存储
            wx.setStorage({
              key: "me",
              data: response, // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
              success() {
                var userInfo = wx.getStorageSync("me");
                service.loginUser = userInfo.userInfo;
                service.token = userInfo.accessToken;
                call();
              }
            });
          });
        } else {
          console.log('登录失败！' + res.errMsg);
        }
      }
    })
  }
}
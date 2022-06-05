/*
 * @Author: Alex
 * @Date: 2022-05-17 10:31:14
 * @LastEditors: Alex
 * @LastEditTime: 2022-05-17 11:16:54
 * @Description: file content
 */
var env = require('../utils/env.js');

module.exports = {
  tokenType: 'Bearer ',
  token: null,
  request: function (url, data = {}, method = 'GET') {
    // 此处baseUrl需要从定义的env.js文件中import
    let fullUrl = `${env.baseUrl}${url}`;
    wx.showLoading({
      title: '加载中',
    })
    let me = this;
    // 使用Promise封装一层
    return new Promise((resolve, reject) => {
      wx.request({
        url: fullUrl,
        method,
        data,
        header: {
          'Content-type': 'application/json',
          'Authorization': me.tokenType + me.token
        },
        // 成功的回调函数
        success(res) {
          if (res.statusCode === 200) {
            // 将response的数据resolve出去
            resolve(res.data)
            wx.hideLoading()
          } else {
            wx.showToast({
              title: '请求失败',
              icon: 'error'
            })
            reject(res);
          }
        },
        fail(error) {
          wx.showToast({
            title: '请求失败',
            icon: 'error'
          })
          reject(error);
        }
      })
    })
  },
}
/*
 * @Author: Alex
 * @Date: 2022-04-23 10:23:33
 * @LastEditors: Alex
 * @LastEditTime: 2022-05-22 10:10:14
 * @Description: file content
 */

var hdService = require('../../utils/service.js');

// pages/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginUser: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setStorage({key:'me', data:null});
    let me = this;
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      });
    };
    wx.checkSession({
      success: function () {
        wx.getStorage({
          key: "me", // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
          success(res) {
            if (res.data != null && new Date(res.data.expiresAt) > new Date()) {
              me.setData({
                loginUser: res.data.userInfo,
                hasUserInfo: true
              });
            }
          }
        });
      },
      fail: function () {

      },
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  userLogin(userInfo) {
    let me = this;
    wx.login({
      success(res) {
        if (res.code) {
          let par = {
            Code: res.code,
            NickName: userInfo.nickName,
            AvatarUrl: userInfo.avatarUrl
          };
          hdService.request("/api/auth", par, "POST").then((response) => {
            // 开启加密存储
            wx.setStorage({
              key: "me",
              data: response, // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
              success() {
                wx.getStorage({
                  key: "me", // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
                  success(res) {
                    hdService.token = res.data.accessToken;
                    me.setData({
                      loginUser: res.data.userInfo,
                      hasUserInfo: true
                    });
                  }
                });
              }
            });
          });
        } else {
          console.log('登录失败！' + res.errMsg);
        }
      }
    });
  },
  getUserProfile(e) {
    let me = this;
    // 推荐使用 wx.getUserProfile 获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        me.userLogin(res.userInfo);
      }
    });
  },
  toRecords() {
    wx.navigateTo({
      url: '/pages/records/records'
    })
  },
  toqrCode(){
    wx.navigateTo({
      url: '/pages/distributorQrCode/distributorQrCode'
    })
  }
});
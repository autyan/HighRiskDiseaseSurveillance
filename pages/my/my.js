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
    canIUseGetUserProfile: false,
    distributor: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadUser();
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      });
    };
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
  loadUser() {
    let me = this;
    hdService.loadUserInfo(function () {
      me.setData({
        loginUser: hdService.loginUser
      });
    });
  },
  userLogin(userInfo) {
    let me = this;
    var par = {
      nickName: userInfo.nickName,
      avatar: userInfo.avatarUrl
    }
    hdService.request("/api/user/syncwechatprofile", par, "POST").then((response) => {
      hdService.updateUserInfo(response);
      this.setData({
        loginUser: response
      });
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
  toqrCode() {
    wx.navigateTo({
      url: '/pages/distributorQrCode/distributorQrCode'
    })
  }
});
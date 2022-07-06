// pages/category.js
var util = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
      userHasLogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let me = this;
    util.checkLogin(function(loginResult){
      me.setData({
        userHasLogin: loginResult
      });
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
  toHyperlipidemiaSurveillance(){
    this.checklogin(function(){
      wx.navigateTo({
        url: '/pages/HyperlipidemiaSurveillance/HyperlipidemiaSurveillance'
      })
    })
  },
  toHypertensionSurveillance(){
    this.checklogin(function(){
      wx.navigateTo({
        url:'/pages/HypertensionSurveillance/HypertensionSurveillance'
      })
    })
  },
  toanginaPectoris(){
    this.checklogin(function(){
      wx.navigateTo({
        url:'/pages/anginaPectoris/anginaPectoris'
      })
    })
  },
  tocardiacInsufficiency(){
    this.checklogin(function(){
      wx.navigateTo({
        url:'/pages/cardiacInsufficiency/cardiacInsufficiency'
      })
    })
  },
  toatrialFibrillationBleeding(){
    this.checklogin(function(){
      wx.navigateTo({
        url:'/pages/atrialFibrillationBleeding/atrialFibrillationBleeding'
      })
    })
  },
  toatrialFibrillationIschemia(){
    this.checklogin(function(){
      wx.navigateTo({
        url:'/pages/atrialFibrillationIschemia/atrialFibrillationIschemia'
      })
    })
  },
  toAtherosclerosis(){
    this.checklogin(function(){
      wx.navigateTo({
        url:'/pages/atherosclerosis/atherosclerosis'
      })
    })
  },
  checklogin(call){
    if(!this.data.userHasLogin){
      wx.showModal({
        title:'提示',
        content:'健康自测需要您登录后才能使用，是否为您跳转到登录页面？',
        success(res){
          if(res.confirm){
            wx.switchTab({
              url:'../my/my'
            })
          }
        }
      })
    }else{
      call();
    }
  }
})
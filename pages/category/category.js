// pages/category.js
var hdService = require('../../utils/service.js');

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
    hdService.loadUserInfo(function(){
      me.setData({
        userHasLogin: loginResult
      });
    })
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
    let me = this;
    if(!this.data.userHasLogin){
      hdService.loadUserInfo(function(){
        me.setData({
          userHasLogin: true
        });
        call();
      })
    }
  }
})
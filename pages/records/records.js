// pages/records/records.js
var hdService = require('../../utils/service.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    queryStatus: 0,
    records: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadRecords();
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
  toDetail(e) {
    switch (e.currentTarget.dataset.typename) {
      case 'Hyperlipidemia':
        wx.navigateTo({
          url: '/pages/HyperlipidemiaSurveillance/HyperlipidemiaSurveillance?mode=readonly&id=' + e.currentTarget.dataset.id
        })
        break;
      case 'Hypertension':
        wx.navigateTo({
          url: '/pages/HypertensionSurveillance/HypertensionSurveillance?mode=readonly&id=' + e.currentTarget.dataset.id
        })
        break;
      case 'AnginaPectoris':
        wx.navigateTo({
          url: '/pages/anginaPectoris/anginaPectoris?mode=readonly&id=' + e.currentTarget.dataset.id
        })
        break;
        case 'CardiacInsufficiency':
        wx.navigateTo({
          url: '/pages/cardiacInsufficiency/cardiacInsufficiency?mode=readonly&id=' + e.currentTarget.dataset.id
        })
        break;
        case 'AtrialFibrillationBleeding':
        wx.navigateTo({
          url: '/pages/atrialFibrillationBleeding/atrialFibrillationBleeding?mode=readonly&id=' + e.currentTarget.dataset.id
        })
        break;
        case 'AtrialFibrillationIschemia':
        wx.navigateTo({
          url: '/pages/atrialFibrillationIschemia/atrialFibrillationIschemia?mode=readonly&id=' + e.currentTarget.dataset.id
        })
        break;
    }
  },
  loadRecords() {
    let me = this;
    let par = {
      pageNumber: 0,
      pageSize: 10,
      status: me.data.queryStatus,
    }
    hdService.request("/api/record/history", par, "GET").then((response) => {
      me.setData({
        records: response
      })
    })
  },
  switchNav(e) {
    var me = this;
    if (this.data.currentTab === e.currentTarget.dataset.current) {
      return false;
    } else {
      me.setData({
        currentTab: e.currentTarget.dataset.current,
        queryStatus: e.currentTarget.dataset.current
      }, function () {
        me.loadRecords();
      })
    }
  }
})
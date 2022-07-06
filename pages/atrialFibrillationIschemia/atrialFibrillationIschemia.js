// pages/atrialFibrillationIschemia/atrialFibrillationIschemia.js
var hdService = require('../../utils/service.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mode: 'edit',
    score: null,
    formData:{
      congestiveHeartFailure:false,
      hypertension:false,
      overAge:false,
      diabetes:false,
      historyOfPreviousStrokeOrThrombosis:false,
      vascularDisease:false,
      ageAmount:false,
      female:false,
      none:false
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options != null && options.mode != null) {
      this.setData({
        mode: options.mode,
        id: options.id
      });
      if (this.data.id != null && this.data.id.length > 0) {
        let me = this;
        hdService.request("/api/record/" + this.data.id, "GET").then((response) => {
          console.log(response);
          me.setData({
            formData: JSON.parse(response.surveillanceContent),
            score: response.score
          })
        })
      }
    }
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
  onformDataChange(e){
    e.detail.value = this.filterNoneValues(e.detail.value);
    console.log(e.detail.value);
    for (var prop in this.data.formData) {
      let keyName = 'formData.' + prop;
      if (e.detail.value.indexOf(prop) > -1) {
        this.setData({
          [keyName]: true
        })
      } else {
        this.setData({
          [keyName]: false
        })
      }
    }
  },
  submitForm() {
    var par = {
      RecordTypeName: 'AtrialFibrillationIschemia',
      RecordContent: JSON.stringify(this.data.formData)
    }
    hdService.request("/api/record", par, "POST").then(() => {
      wx.navigateTo({
        url: '/pages/records/records'
      })
    });
  },
  filterNoneValues(values) {
    let lastChoice = values[values.length - 1];
    if (lastChoice == 'none') {
      values = ['none'];
    } else {
      values = values.filter(function (item) {
        return item != 'none';
      });
    }
    return values;
  }
})
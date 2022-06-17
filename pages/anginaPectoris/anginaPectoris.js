// pages/anginaPectoris/anginaPectoris.js
var hdService = require('../../utils/service.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mode: 'edit',
    step:0,
    formData: {
      basicActivity: {
        walk:false,
        climbStairs: false
      },
      commonActivity:{
        briskWalk:false,
        walkAfterMeal:false,
        walkInWind:false,
        walkOverRange:false,
        goUpOneStairs:false
      },
      normalActivity:{
        walkOverRange:false,
        goUpOneStairs:false,
        walkOnGround:false,
        houseClean:false,
        babySet:false
      },
      casualActivity:{
        metting:false,
        driving:false,
        typing:false,
        listenMusic:false,
        painting:false
      }
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
  start(){
    this.setData({
      step:1
    })
  },
  nextStep(){
    let nextStep = this.data.step += 1;
    this.setData({
      step:nextStep
    })
  },
  onBasicActivityChange(e) {
    for (var prop in this.data.formData.basicActivity) {
      let keyName = 'formData.basicActivity.' + prop;
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
  onCommonActivityChange(e) {
    for (var prop in this.data.formData.commonActivity) {
      let keyName = 'formData.commonActivity.' + prop;
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
  onNormalActivityChange(e) {
    for (var prop in this.data.formData.normalActivity) {
      let keyName = 'formData.normalActivity.' + prop;
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
  onCasualActivityChange(e) {
    for (var prop in this.data.formData.casualActivity) {
      let keyName = 'formData.casualActivity.' + prop;
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
  submit(){
    var par = {
      RecordTypeName: 'AnginaPectoris',
      RecordContent: JSON.stringify(this.data.formData)
    }
    hdService.request("/api/record", par, "POST").then(() => {
      wx.navigateTo({
        url: '/pages/records/records'
      })
    });
  }
})
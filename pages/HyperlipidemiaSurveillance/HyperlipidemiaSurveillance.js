// pages/HyperlipidemiaSurveillance/HyperlipidemiaSurveillance.js
var hdService = require('../../utils/service.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mode: 'edit',
    id: null,
    error: null,
    score: null,
    formData: {
      age: null,
      gender: null,
      height: null,
      weight: null,
      smoke: null,
      ldlc: null,
      hdlc: null,
      tc: null,
      sbp: null,
      dbp: null,
      basicDisease: {
        hypertension: false,
        diabetes: false,
        acuteMyocardialInfarction: false,
        unstableAngina: false,
        stableCoronaryHeartDisease: false,
        afterRevascularization: false,
        ischemicCardiomyopathy: false,
        ischemicStroke: false,
        transientIschemicAttack: false,
        carotidArteryStenosis: false,
        renalArteryStenosis: false,
        arterialStenosisInExtremities: false,
        abdominalAorticAneurysm: false
      }
    },
    rules: [{
        name: 'age',
        rules: [{
          required: true,
          message: '必须填写年龄'
        }, {
          range: [0, 150],
          message: '请填写有效的年龄'
        }]
      },
      {
        name: 'height',
        rules: [{
          required: true,
          message: '必须填写身高'
        }, {
          range: [0, 250],
          message: '请填写有效的身高'
        }]
      },
      {
        name: 'weight',
        rules: [{
          required: true,
          message: '必须填写体重'
        }, {
          range: [0, 200],
          message: '请填写有效的体重'
        }]
      },
      {
        name: 'gender',
        rules: {
          required: true,
          message: '请选择您的性别'
        }
      },
      {
        name: 'smoke',
        rules: {
          required: true,
          message: '请选择您的吸烟史'
        }
      },
      {
        name: 'ldlc',
        rules: {
          required: true,
          message: '请填写您的低密度脂蛋白指标'
        }
      },
      {
        name: 'hdlc',
        rules: {
          required: true,
          message: '请填写您的高密度脂蛋白指标'
        }
      },
      {
        name: 'tc',
        rules: {
          required: true,
          message: '请填写您的总胆固醇指标'
        }
      },
      {
        name: 'sbp',
        rules: {
          required: true,
          message: '请填写您的收缩压指标'
        }
      },
      {
        name: 'dbp',
        rules: {
          required: true,
          message: '请填写您的扩张压指标'
        }
      }
    ]
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
  onUnload() {},

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
  submitForm() {
    this.selectComponent('#form').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })

        }
        console.log(this.data);
      } else {
        console.log("start upload record")
        var par = {
          RecordTypeName: 'Hyperlipidemia',
          RecordContent: JSON.stringify(this.data.formData)
        }
        hdService.request("/api/record", par, "POST").then(() => {
          wx.navigateTo({
            url: '/pages/records/records'
          })
        });
      }
    })
  },
  formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  genderChange(e) {
    this.setData({
      'formData.gender': e.detail.value
    })
  },
  smokeChange(e) {
    this.setData({
      'formData.smoke': e.detail.value == 'true'
    })
    console.log(this.data.formData);
  },
  onDiseaseChange(e) {
    for (var prop in this.data.formData.basicDisease) {
      let keyName = 'formData.basicDisease.' + prop;
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
  }
})
// pages/HypertensionSurveillance/HypertensionSurveillance.js
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
      waistline: null,
      smoke: null,
      ldlc: null,
      hdlc: null,
      tc: null,
      sbp: null,
      dbp: null,
      riskFactors: {
        impairedSugarAdhesion: false,
        abnormalFastingBloodGlucose: false,
        familyHistoryOfEarlyonsetCardiovascularDisease: false,
        hyperhomocysteine: false,
        none: false
      },
      concomitantClinicalDisorders: {
        cerebralHaemorrhage: false,
        ischemicStroke: false,
        transientIschemicAttack: false,
        historyOfMyocardialInfarction: false,
        angina: false,
        historyOfCoronaryBloodCirculationReconstruction: false,
        congestiveHeartFailure: false,
        diabeticNephropathy: false,
        impairedRenalFunction: false,
        elevatedSerumCreatinine: false,
        aorticDissection: false,
        peripheralVascularDisease: false,
        severeHypertensiveRetinopathy: false,
        diabetes: false,
        none: false
      },
      targetOrganDamage: {
        leftVentricularHypertrophy: false,
        atheroscleroticPlaques: false,
        retinalArteryFocalPointOrExtensiveStenosis: false,
        none: false
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
        name: 'waistline',
        rules: [{
          required: true,
          message: '必须填写腰围'
        }, {
          range: [0, 150],
          message: '请填写有效的腰围'
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
          RecordTypeName: 'Hypertension',
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
    console.log(this.data);
  },
  genderChange(e) {
    this.setData({
      'formData.gender': e.detail.value
    })
  },
  smokeChange(e) {
    if (e.detail.value.length > 0) {
      this.setData({
        'formData.smoke': true
      })
    } else {
      this.setData({
        'formData.smoke': false
      })
    }
  },
  onRiskFactorsChange(e) {
    e.detail.value = this.filterNoneValues(e.detail.value);
    console.log(e.detail.value);
    for (var prop in this.data.formData.riskFactors) {
      let keyName = 'formData.riskFactors.' + prop;
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
  onConcomitantClinicalDisordersChange(e) {
    e.detail.value = this.filterNoneValues(e.detail.value);
    for (var prop in this.data.formData.concomitantClinicalDisorders) {
      let keyName = 'formData.concomitantClinicalDisorders.' + prop;
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
  onTargetOrganDamageChange(e) {
    e.detail.value = this.filterNoneValues(e.detail.value);
    for (var prop in this.data.formData.targetOrganDamage) {
      let keyName = 'formData.targetOrganDamage.' + prop;
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
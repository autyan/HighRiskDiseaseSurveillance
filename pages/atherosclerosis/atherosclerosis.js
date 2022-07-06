// pages/atherosclerosis/atherosclerosis.js
var hdService = require('../../utils/service.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mode: 'edit',
    score: null,
    risk: null,
    formData: {
      age: null,
      gender: null,
      height: null,
      weight: null,
      smoke: null,
      tc: null,
      sbp: null,
      diabetes: null
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
          me.setData({
            formData: JSON.parse(response.surveillanceContent),
            score: response.score
          })
          me.calcRisk();
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
          RecordTypeName: 'Atherosclerosis',
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
  },
  diabetesChange(e) {
    this.setData({
      'formData.diabetes': e.detail.value == 'true'
    })
  },
  calcRisk() {
    debugger;
    let maleRisk = {
      0: 0.5,
      1: 0.6,
      2: 0.8,
      3: 1.1,
      4: 1.5,
      5: 2.1,
      6: 2.9,
      7: 3.9,
      8: 5.4,
      9: 7.3,
      10: 9.7,
      11: 12.8,
      12: 16.8,
      13: 21.7,
      14: 27.7,
      15: 35.3,
      16: 44.3
    };
    let femaleRisk = {
      0: 0.2,
      1: 0.2,
      3: 0.5,
      4: 1.5,
      5: 2.1,
      6: 2.9,
      7: 3.9,
      8: 5.4,
      9: 7.3,
      10: 9.7,
      11: 12.8,
      12: 16.8
    }
    if (this.data.formData.gender == 0) {
      if (this.data.score <= -1) {
        this.setData({
          risk: 0.3
        })
        return;
      }
      if (this.data.score >= 17) {
        this.setData({
          risk: 52.6
        })
        return;
      }
      this.setData({
        risk: maleRisk[this.data.score]
      })
      return;
    }

    if (this.data.formData.gender == 1) {
      if (this.data.score == -2) {
        this.setData({
          risk: 0.1
        })
        return;
      }
      if (this.data.score == -1) {
        this.setData({
          risk: 0.2
        })
        return;
      }
      if (this.data.score >= 13) {
        this.setData({
          risk: 21.7
        })
        return;
      }
      this.setData({
        risk: femaleRisk[this.data.score]
      })
      return;
    }

    return 0;
  }
})
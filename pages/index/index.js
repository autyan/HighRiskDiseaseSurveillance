// index.js
// 获取应用实例
const app = getApp()

var hdService = require('../../utils/service.js');

Page({
  data: {

  },
  onLoad(query) {
    if(query && query.scene){
      const scene = decodeURIComponent(query.scene)
      wx.setStorage({key:'distributor', data:scene});
      var par = {distributorId:scene}
      hdService.request("/api/user/binddistributor", par, "POST").then((response) => {
        console.log("bind distributor result:" + response);
      });
    }
  },
  toCategory(){
    wx.navigateTo({
      url: '/pages/category/category'
    })
  }
})

// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {

  },
  onLoad(query) {
    if(query && query.scene){
      const scene = decodeURIComponent(query.scene)
      wx.setStorage({key:'distributor', data:scene})
      console.log('distributorid:' + scene);
    }
  },
  toCategory(){
    wx.navigateTo({
      url: '/pages/category/category'
    })
  }
})

/*
 * @Author: Alex
 * @Date: 2022-05-17 11:14:59
 * @LastEditors: Alex
 * @LastEditTime: 2022-05-17 11:40:03
 * @Description: file content
 */

let serviceUrl = "";
if (typeof __wxConfig =="object"){
  let version = __wxConfig.envVersion;
  console.log("当前环境:" + version)
  if (version =="develop"){
    //工具或者真机 开发环境
    serviceUrl = "https://localhost:5001";
 
  }else if (version =="trial"){
    //测试环境(体验版)
 
  }else if (version =="release"){
    //正式环境
 
  }
}
module.exports = {
    baseUrl : serviceUrl
};
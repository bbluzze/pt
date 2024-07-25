// 云函数 getWXUserInfo.js

const cloud = require('../saveUserInfo/node_modules/wx-server-sdk');
cloud.init();

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const code = event.code;

  try {
    // 使用 wx-server-sdk 获取用户信息
    const wxUserInfo = await cloud.getOpenData({
      list: [{
        type: 'wx_user_info',
        lang: 'zh_CN'
      }]
    });

    return {
      code: 0,
      msg: '获取微信用户信息成功',
      userInfo: wxUserInfo
    };
  } catch (err) {
    return {
      code: -1,
      msg: '获取微信用户信息失败',
      err: err
    };
  }
};

// cloudfunctions/saveUserInfo/index.js

const cloud = require('wx-server-sdk');
cloud.init();

const db = cloud.database();

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const userInfo = event.userInfo;

  try {
    const result = await db.collection('users').where({
      _openid: wxContext.OPENID
    }).update({
      data: {
        userInfo: userInfo,
        updateTime: db.serverDate()
      }
    });

    return result;
  } catch (err) {
    console.error('保存用户信息失败', err);
    throw err;
  }
};

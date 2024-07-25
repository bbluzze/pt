const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const userInfo = event.userInfo;

  try {
    // 检查数据库中是否已有该用户
    const checkUser = await db.collection('users').where({
      openid: wxContext.OPENID
    }).get();

    if (checkUser.data.length > 0) {
      // 用户已存在，更新用户信息
      await db.collection('users').doc(checkUser.data[0]._id).update({
        data: {
          ...userInfo,
          updatedAt: new Date()
        }
      });
    } else {
      // 用户不存在，添加用户信息
      await db.collection('users').add({
        data: {
          ...userInfo,
          openid: wxContext.OPENID,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
    }

    return {
      success: true
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      errorMessage: err.message
    };
  }
};

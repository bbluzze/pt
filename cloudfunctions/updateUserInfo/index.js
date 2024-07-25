// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();
const db = wx.cloud.database();
const usersCollection = db.collection('users');

// 云函数入口函数
exports.main = async (event, context) => {
  const { userInfo, code } = event;

  try {
    // 调用微信登录接口，获取用户的 openid
    const wxContext = cloud.getWXContext();
    const openid = wxContext.OPENID;

    // 查询用户是否已经存在
    const userQuery = await usersCollection.where({
      openid: openid
    }).get();

    let userRecord = userQuery.data.length > 0 ? userQuery.data[0] : null;

    if (!userRecord) {
      // 如果用户不存在，则创建新用户记录
      userRecord = {
        openid: openid,
        userInfo: userInfo,
        isAdmin: false, // 默认不是管理员
        isSuperAdmin: false, // 默认不是超级管理员，可以根据需要更改
        isNormalUser: true
      };

      // 将新用户信息插入到数据库中
      await usersCollection.add({
        data: userRecord
      });
    }

    // 返回用户角色信息
    return {
      success: true,
      userRole: {
        
        isAdmin: userRecord.isAdmin || false,
        isSuperAdmin: userRecord.isSuperAdmin || false,
        isNormalUser: userRecord.isNormalUser || true

      }
    };

  } catch (error) {
    console.error('更新用户信息失败', error);
    return {
      success: false,
      error: error.message
    };
  }
};

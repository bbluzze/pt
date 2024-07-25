Page({
  data: {
    avatarUrl: '/image/logo.png' // 默认头像
  },

  onGetUserInfo(e) {
    const userInfo = e.detail.userInfo;
    if (userInfo) {
      this.setData({
        avatarUrl: userInfo.avatarUrl
      });
      this.saveUserInfo(userInfo);
    }
  },

  saveUserInfo(userInfo) {
    wx.cloud.init({
      env: 'cloud1-5g5a92k95bac218d'
    });

    const db = wx.cloud.database();
    const usersCollection = db.collection('users');

    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        const openid = res.result.openid;
        usersCollection.where({
          _openid: openid
        }).get().then(result => {
          if (result.data.length === 0) {
            usersCollection.add({
              data: {
                avatarUrl: userInfo.avatarUrl,
                nickName: userInfo.nickName,
                gender: userInfo.gender,
                province: userInfo.province,
                city: userInfo.city,
                country: userInfo.country
              }
            }).then(res => {
              wx.showToast({
                title: '登录成功',
                icon: 'success'
              });
            }).catch(err => {
              wx.showToast({
                title: '登录失败',
                icon: 'none'
              });
            });
          } else {
            wx.showToast({
              title: '您已登录',
              icon: 'success'
            });
          }
        });
      },
      fail: err => {
        wx.showToast({
          title: '调用云函数失败',
          icon: 'none'
        });
      }
    });
  }
});

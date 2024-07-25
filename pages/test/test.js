Page({
  onGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      // 用户同意授权
      const userInfo = e.detail.userInfo;
      wx.cloud.callFunction({
        name: 'test',
        data: {
          userInfo: userInfo
        },
        success: res => {
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000
          });
          // 可以根据需要跳转到其他页面
          // wx.navigateTo({
          //   url: '../somepage/somepage',
          // });
        },
        fail: err => {
          console.error('[云函数] [test] 调用失败', err);
          wx.showToast({
            title: '登录失败',
            icon: 'none',
            duration: 2000
          });
        }
      });
    } else {
      wx.showToast({
        title: '用户拒绝授权',
        icon: 'none',
        duration: 2000
      });
    }
  }
});

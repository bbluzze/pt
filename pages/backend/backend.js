Page({
  data: {
    users: [] // 存储用户列表
  },

  onLoad: function () {
    this.fetchUsers();
  },

  fetchUsers: function () {
    wx.cloud.callFunction({
      name: 'getUsers', // 替换为获取用户列表的云函数名称
      success: res => {
        this.setData({
          users: res.result.data
        });
      },
      fail: err => {
        console.error('获取用户列表失败', err);
      }
    });
  },

  setAdmin: function (e) {
    const userId = e.currentTarget.dataset.id;
    wx.cloud.callFunction({
      name: 'setAdmin',
      data: {
        userId: userId,
        isAdmin: true
      },
      success: res => {
        wx.showToast({
          title: '设置管理员成功',
          icon: 'success'
        });
        this.fetchUsers(); // 重新获取用户列表
      },
      fail: err => {
        console.error('设置管理员失败', err);
      }
    });
  },

  removeAdmin: function (e) {
    const userId = e.currentTarget.dataset.id;
    wx.cloud.callFunction({
      name: 'setAdmin',
      data: {
        userId: userId,
        isAdmin: false
      },
      success: res => {
        wx.showToast({
          title: '移除管理员成功',
          icon: 'success'
        });
        this.fetchUsers(); // 重新获取用户列表
      },
      fail: err => {
        console.error('移除管理员失败', err);
      }
    });
  }
});

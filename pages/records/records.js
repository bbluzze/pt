Page({
  data: {
    userId: '', // 用户ID
    applications: []
  },

  onLoad: function(options) {
    this.setData({
      userId: options.userId
    });
    this.fetchApplications();
  },

  fetchApplications: function() {
    const userId = this.data.userId;
    wx.request({
      url: `https://your-backend-api.com/get-applications?userId=${userId}`,
      method: 'GET',
      success: (res) => {
        this.setData({
          applications: res.data.applications //申请记录包含展会的宣传图、创作者名字、申请的场次时间和状态等信息
        });
      },
      fail: (err) => {
        wx.showToast({
          title: '获取申请记录失败',
          icon: 'none'
        });
      }
    });
  },

  bindSearchInput: function(e) {
    // 搜索功能逻辑
  },

  showAllApplications: function() {
    // 显示全部申请记录的逻辑
  },

  showApprovedApplications: function() {
    // 显示已通过申请记录的逻辑
  },

  showRejectedApplications: function() {
    // 显示未通过申请记录的逻辑
  }
});

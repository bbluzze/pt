Page({
  data: {
    id: '', // 用户ID
    applications: [],
    filteredApplications: [],
    currentTab: 'approved' // 当前选中的标签
  },

  onLoad: function(options) {
    this.setData({
      id: options.id
    });
    this.fetchApplications();
  },

  fetchApplications: function() {
    const id = this.data.id;
    wx.request({
      url: `https://your-backend-api.com/get-applications?id=${id}`,
      method: 'GET',
      success: (res) => {
        const applications = res.data.applications.map(app => {
          return {
            ...app,
            statusStyle: `color: ${app.status === '已通过' ? 'green' : 'gray'}`,
            buttonStyle: `background-color: ${app.status === '已通过' ? 'green' : 'gray'}`
          };
        });
        this.setData({
          applications: applications
        });
        this.filterApplications();
      },
      fail: (err) => {
        wx.showToast({
          title: '获取申请记录失败',
          icon: 'none'
        });
      }
    });
  },

  filterApplications: function() {
    const currentTab = this.data.currentTab;
    const filteredApplications = this.data.applications.filter(app => {
      return currentTab === 'approved' ? app.status === '已通过' : app.status === '未通过';
    });
    this.setData({ filteredApplications });
  },

  toggleApproval: function(e) {
    const id = e.currentTarget.dataset.id;
    const applications = this.data.applications.map(app => {
      if (app.id === id) {
        app.status = app.status === '已通过' ? '未通过' : '已通过';
        app.statusStyle = `color: ${app.status === '已通过' ? 'green' : 'gray'}`;
        app.buttonStyle = `background-color: ${app.status === '已通过' ? 'green' : 'gray'}`;
        wx.request({
          url: `https://your-backend-api.com/update-application-status`,
          method: 'POST',
          data: { id: app.id, status: app.status },
          success: (res) => {
            wx.showToast({
              title: '状态更新成功',
              icon: 'success'
            });
            this.filterApplications();
          },
          fail: (err) => {
            wx.showToast({
              title: '状态更新失败',
              icon: 'none'
            });
          }
        });
      }
      return app;
    });
    this.setData({ applications });
  },

  showApprovedApplications: function() {
    this.setData({ currentTab: 'approved' }, this.filterApplications);
  },

  showRejectedApplications: function() {
    this.setData({ currentTab: 'rejected' }, this.filterApplications);
  }
});

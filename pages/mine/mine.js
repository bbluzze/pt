Page({
  data: {
    user: {
      avatar: '/image/logo.png', // 默认头像路径
      nickname: '点击登录', // 默认昵称
      id: '000000000', // 初始化为空，等待从后端获取
      role: 'user' // 初始化为普通用户
    },
    showManageAppointments: false, // 是否显示预约管理功能
    showVerification: false // 是否显示核销功能
  },
  onLoad: function() {
    // 调用方法获取用户信息
    this.getUserInfo();
  },
  getUserInfo: function() {
    let that = this;
    // 调用微信API获取用户信息
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        // 假设我们有一个后端API可以根据微信用户信息查找或创建用户记录
        wx.request({
          url: 'https://your-backend-api.com/api/user', // 你的后端API地址
          method: 'POST',
          data: {
            avatarUrl: res.avatarUrl,
            nickName: res.nickName,
            openId: res.openId,
            // 可以添加其他必要信息
          },
          success: function(dbRes) {
            if (dbRes.statusCode === 200) {
              // 假设后端返回的用户信息结构与页面data中一致
              let role = dbRes.data.role || 'user';
              that.setData({
                user: {
                  avatar: dbRes.data.avatar || res.avatarUrl,
                  nickname: dbRes.data.nickname || res.nickName,
                  id: dbRes.data.id ,
                  role: role
                },
                showManageAppointments: role === 'creator',
                showVerification: role === 'admin'
              });
            } else {
              // 处理错误情况
              console.error('Failed to get user info from backend:', dbRes);
            }
          },
          fail: function(err) {
            // 处理请求失败情况
            console.error('Request failed', err);
          }
        });
      },
      fail: (err) => {
        console.error('Failed to get user profile', err);
      }
    });
  },
  
  changeAvatar: function() {
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          user: {
            avatar: res.tempFilePaths[0]
          }
        });
      }
    });
  },
  changeNickname: function() {
    wx.getUserProfile({
      desc: '用于更新昵称',
      success: (res) => {
        this.setData({
          user: {
            nickname: res.nickName
          }
        });
      }
    });
  },
  navigateToOrders: function() {
    wx.navigateTo({
      url: '/pages/orders/orders'
    });
  },
  navigateToManageAppointments: function() {
    if (this.data.showManageAppointments) {
      wx.navigateTo({
        url: '/pages/manageAppointments/manageAppointments'
      });
    } else {
      wx.showToast({
        title: '您没有权限访问此页面',
        icon: 'none'
      });
    }
  },
  navigateToVerification: function() {
    if (this.data.showVerification) {
      wx.navigateTo({
        url: '/pages/verification/verification'
      });
    } else {
      wx.showToast({
        title: '您没有权限访问此页面',
        icon: 'none'
      });
    }
  },
  contactCustomerService: function() {
    wx.makePhoneCall({
      phoneNumber: '114' // 客服电话号码
    });
  },
  submitFeedback: function() {
    wx.navigateTo({
      url: '/pages/feedback/feedback'
    });
  },
  viewApplicationRecords: function() {
    wx.navigateTo({
      url: '/pages/records/records'
    });
  }
});

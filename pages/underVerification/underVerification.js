Page({
  data: {
    qrcodeUrl: '' // 初始化二维码URL为空
  },

  onLoad: function() {
    // 页面加载时调用 fetchQRCode 函数获取二维码数据
    this.fetchQRCode();
  },

  fetchQRCode: function() {
    let that = this;
    wx.request({
      url: 'https://your-backend-api.com/api/qrcode', // 后端API地址
      method: 'GET',
      success: function(res) {
        if (res.statusCode === 200) {
          // 请求成功，更新二维码URL
          that.setData({
            qrcodeUrl: res.data.qrcodeUrl // 设置 qrcodeUrl 为从后端获取的数据
          });
        } else {
          // 处理失败响应
          console.error('Failed to fetch QR code:', res);
        }
      },
      fail: function(err) {
        // 处理请求失败
        console.error('Request failed', err);
      }
    });
  },

  navigateToRefund: function() {
    wx.navigateTo({
      url: '/pages/refund/refund' // 跳转到退款详情页
    });
  }
});

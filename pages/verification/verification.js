Page({
  data: {
    // 可以在这里添加其他需要的页面数据
  },
  scanQRCode: function() {
    let that = this;
    wx.scanCode({
      success: (res) => {
        // 获取二维码内容
        let qrCodeContent = res.result;
        // 发送请求到后台进行核销
        wx.request({
          url: 'https://your-backend-api.com/api/verify', // 你的后端API地址
          method: 'POST',
          data: {
            qrCode: qrCodeContent
          },
          success: function(dbRes) {
            if (dbRes.statusCode === 200 && dbRes.data.success) {
              // 核销成功，弹出提示
              wx.showToast({
                title: '已核销',
                icon: 'success',
                duration: 2000
              });
              // 继续扫描下一个二维码
              that.scanQRCode();
            } else {
              // 核销失败，弹出提示
              wx.showToast({
                title: '请重新扫码',
                icon: 'none',
                duration: 2000
              });
            }
          },
          fail: function(err) {
            // 请求失败，弹出提示
            wx.showToast({
              title: '请求失败，请重试',
              icon: 'none',
              duration: 2000
            });
          }
        });
      },
      fail: (err) => {
        // 扫码失败，弹出提示
        wx.showToast({
          title: '扫码失败，请重试',
          icon: 'none',
          duration: 2000
        });
      }
    });
  }
});

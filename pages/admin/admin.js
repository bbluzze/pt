Page({
  data: {
    qrCodeResult: ''
  },

  // 扫描二维码
  scanQRCode() {
    wx.scanCode({
      success: (res) => {
        console.log(res.result); // 输出扫描结果
        this.setData({ qrCodeResult: res.result });

        // 判断二维码内容，这里假设正确的二维码以 "http://" 开头
        if (res.result.startsWith("http://")) {
          // 跳转到核销页面，假设核销页面路径为 pages/verification/verification
          wx.navigateTo({
            url: '/pages/verification/verification?qrCode=' + encodeURIComponent(res.result)
          });
        } else {
          // 弹出提示，无效的二维码
          wx.showToast({
            title: '无效的二维码',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: (err) => {
        console.error(err);
        wx.showToast({
          title: '扫码失败，请重试',
          icon: 'none',
          duration: 2000
        });
      }
    });
  }
});

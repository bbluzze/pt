Page({
  data: {
    ticket: null
  },
  scanCode() {
    wx.scanCode({
      success: (res) => {
        const code = res.result;
        // 验证二维码
        wx.cloud.callFunction({
          name: 'verifyCode',
          data: { code: code }
        }).then(res => {
          this.setData({ ticket: res.result });
        });
      }
    });
  }
});


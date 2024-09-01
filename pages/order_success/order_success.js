Page({
  data: {
    code: '',      // 保存二维码的code
    qrCodeUrl: ''  // 保存二维码的URL
  },

  onLoad(options) {
    // 获取从上一个页面传递的code参数
    const code = options.code;

    // 拼接生成二维码的URL
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${code}`;
    
    // 设置数据
    this.setData({ 
      code: code,
      qrCodeUrl: qrCodeUrl 
    });
  },

  onImageError(e) {
    // 当二维码图片加载失败时的处理
    console.error('二维码图片加载失败', e.detail.errMsg);
    wx.showToast({
      title: '二维码加载失败，请稍后重试',
      icon: 'none'
    });
  },

  goToHomePage() {
    // 跳转回首页
    wx.reLaunch({
      url: '/pages/home/home'  // 替换为你的小程序首页路径
    });
  }
});

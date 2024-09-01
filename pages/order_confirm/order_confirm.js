Page({
  data: {
    ticket: {}
  },

  onLoad(options) {
    const ticketId = options.id;
    // 获取票务详情并设置到 data 中
    wx.cloud.database().collection('ticket').doc(ticketId).get().then(res => {
      this.setData({
        ticket: res.data
      });
    }).catch(err => {
      console.error('获取票务信息失败', err);
    });
  },

  submitOrder() {
    const ticketId = this.data.ticket._id;
    const userId = wx.getStorageSync('userId');  // 获取用户ID
    const code = Math.floor(Math.random() * 900000) + 100000; // 生成6位随机码

    // 提交订单信息
    wx.cloud.database().collection('order').add({
      data: {
        code: code,
        ticketId: ticketId,
        userId: userId,
        status: '未使用',
        purchaseDate: new Date(),
        quantity: 1
      }
    }).then(res => {
      console.log('订单提交成功，订单ID:', res._id);
      // 跳转到订单成功页面，并携带二维码信息
      wx.navigateTo({
        url: `/pages/order_success/order_success?code=${code}`
      });
    }).catch(err => {
      console.error('订单提交失败:', err);
      wx.showToast({
        title: '订单提交失败，请重试',
        icon: 'none'
      });
    });
  }
});

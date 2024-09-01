Page({
  data: {
    ticket: {}
  },
  onLoad(options) {
    const id = options.id;
    // 获取票务详情
    wx.cloud.database().collection('ticket').doc(id).get().then(res => {
      this.setData({ ticket: res.data });
    });
  },
  goBack() {
    wx.navigateBack();
  },
  goToOrderConfirm(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/order_confirm/order_confirm?id=${id}`
    });
  }
});

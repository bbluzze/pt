Page({
  data: {
    tickets: [],
    showPopup: false,  // 控制悬浮窗显示
    role: 'normal'     // 角色: normal, admin, superadmin
  },
  onLoad() {
    // 获取票务信息
    wx.cloud.database().collection('ticket').get().then(res => {
      this.setData({ tickets: res.data });
    });
  },
  goToTicketDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/ticket_detail/ticket_detail?id=${id}`
    });
  },
  goToOrderConfirm(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/order_confirm/order_confirm?id=${id}`
    });
  },
  // 打开/关闭悬浮窗
  togglePopupMenu() {
    this.setData({ showPopup: !this.data.showPopup });
  },
  closePopupMenu() {
    this.setData({ showPopup: false });
  },
  // 阻止冒泡
  stopPropagation() {
    // 阻止点击事件向上冒泡
  },
  // 各功能选项的跳转
  goToFreeTravel() {
    wx.navigateTo({
      url: '/pages/free_travel/free_travel'
    });
  },
  goToPhotoBooking() {
    wx.navigateTo({
      url: '/pages/photo_booking/photo_booking'
    });
  },
  goToVerification() {
    wx.navigateTo({
      url: '/pages/verification/verification'
    });
  },
  goToBackend() {
    wx.navigateTo({
      url: '/pages/backend/backend'
    });
  }
});

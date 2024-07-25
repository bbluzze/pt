Page({
  goToTicketDetail: function() {
    wx.navigateTo({
      url: '/pages/ticket_detail/ticket_detail'  // 替换为实际的票务详情页路径
    });
  }
});

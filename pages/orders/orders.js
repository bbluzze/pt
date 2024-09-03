Page({
  data: {
    orders: [], // 初始化为空数组orders: [
        //sessionImage: '/path/to/exhibition1.jpg', // 展会图片路径
        //title: '展会1名称', // 展会名称
        //location: '地点A', // 地点
        //price: 100, // 价格
        //status: '待核销' // 状态
    page: 1, // 当前页码
    pageSize: 10, // 每页加载的数据量
    hasMore: true // 是否还有更多数据
  },

  onLoad: function() {
    // 页面加载时调用 fetchOrders 函数获取订单数据
    this.fetchOrders();
  },

  fetchOrders: function() {
    if (!this.data.hasMore) return;

    let that = this;
    wx.request({
      url: `https://your-backend-api.com/api/orders?page=${this.data.page}&pageSize=${this.data.pageSize}`, // 后端API地址
      method: 'GET',
      success: function(res) {
        if (res.statusCode === 200) {
          const newOrders = res.data.orders;
          that.setData({
            orders: that.data.orders.concat(newOrders), // 追加新数据到 orders
            page: that.data.page + 1, // 增加页码
            hasMore: newOrders.length === that.data.pageSize // 判断是否还有更多数据
          });
        } else {
          console.error('Failed to fetch orders:', res);
        }
      },
      fail: function(err) {
        console.error('Request failed', err);
      }
    });
  },

  loadMoreOrders: function() {
    this.fetchOrders();
  },

  navigateToQRCode: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/qrcode/qrcode?id=${id}` // 跳转到二维码页面，并传递订单ID
    });
  }
});

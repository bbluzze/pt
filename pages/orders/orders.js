Page({
  data: {
    orders: [
      {
        sessionImage: '/path/to/exhibition1.jpg', // 展会图片路径
        title: '展会1名称', // 展会名称
        location: '地点A', // 地点
        price: 100, // 价格
        status: '待核销' // 状态
      },
      {
        sessionImage: '/path/to/exhibition2.jpg',
        title: '展会2名称',
        location: '地点B',
        price: 150,
        status: '正在退款'
      }
      // 更多订单...
    ]
  },
  data: {
    orders: [] // 初始化为空数组
  },
  onLoad: function() {
    // 页面加载时调用 fetchOrders 函数获取订单数据
    this.fetchOrders();
  },
  fetchOrders: function() {
    let that = this;
    wx.request({
      url: 'https://your-backend-api.com/api/orders', // 后端API地址
      method: 'GET',
      // 如果需要用户ID，可以通过 data 传递
      // data: { userId: '用户的唯一ID' },
      success: function(res) {
        if (res.statusCode === 200) {
          // 请求成功，更新订单数据
          that.setData({
            orders: res.data // 设置 orders 为从后端获取的数据
          });
        } else {
          // 处理失败响应
          console.error('Failed to fetch orders:', res);
        }
      },
      fail: function(err) {
        // 处理请求失败
        console.error('Request failed', err);
      }
    });
  },
});
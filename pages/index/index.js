// index.js

Page({
  data: {
    images: [
      '/image/B站横幅.jpg',  // 图片1的路径，根据实际情况替换
      '/image/给QF11.jpg'  // 图片2的路径，根据实际情况替换
      ],
    currentImageIndex: 0    // 当前显示的图片索引
  },

  onLoad: function() {
    // 启动定时器，每隔一定时间切换图片
    this.intervalId = setInterval(this.changeImage, 3000); // 3000ms即3秒钟切换一次
  },

  changeImage: function() {
    let currentIndex = this.data.currentImageIndex;
    let nextIndex = (currentIndex + 1) % this.data.images.length;  // 计算下一张图片的索引

    this.setData({
      currentImageIndex: nextIndex
    });
  },

  onUnload: function() {
    // 页面卸载时清除定时器，避免内存泄漏
    clearInterval(this.intervalId);
  }
});

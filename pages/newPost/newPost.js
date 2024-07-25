// pages/newPost/newPost.js
Page({
  data: {
    images: [], // 存储上传的图片地址
    title: '', // 帖子标题
    content: '', // 帖子内容
  },

  // 处理标题输入
  onTitleInput(e) {
    this.setData({
      title: e.detail.value
    });
  },

  // 处理内容输入
  onContentInput(e) {
    this.setData({
      content: e.detail.value
    });
  },

  // 上传图片
  onUploadImage() {
    wx.chooseImage({
      count: 9, // 最多可选 9 张图片
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePaths = res.tempFilePaths;
        this.setData({
          images: tempFilePaths
        });
      }
    });
  },

  // 删除帖子（假设未实现删除逻辑）
  onDeletePost() {
    // 此处可以添加删除帖子的逻辑
  },

  // 发布帖子
  onPublishPost() {
    const { title, content, images } = this.data;
    if (!title || images.length === 0) {
      wx.showToast({
        title: '请填写标题和至少添加一张图片',
        icon: 'none',
        duration: 1500
      });
      return;
    }

    // 模拟提交帖子到服务器的逻辑
    const newPost = {
      id: Date.now(), // 假设生成唯一 ID
      title: title,
      image: images[0], // 假设只取第一张图片作为封面
      content: content,
      likes: 0,
      liked: false
    };

    // 触发发现页面事件，将新帖子传递过去
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.emit('newPost', { post: newPost });

    // 返回上一页
    wx.navigateBack();
  },

  // 处理返回按钮点击事件
  onBack() {
    wx.navigateBack();
  }
});

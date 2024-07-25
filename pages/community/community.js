// discover.js
Page({
  data: {
    activeTab: 'discover', // 当前活跃的标签
    tabs: [
      { key: 'follow', text: '关注', active: false },
      { key: 'discover', text: '发现', active: true }
    ],
    posts: [
      {
        id: 1,
        image: 'https://example.com/image1.jpg',
        title: '南京江宁找搭子',
        description: '江宁义乌找搭子',
        avatar: 'https://example.com/avatar1.jpg',
        author: '池鱼',
        likes: 37,
        liked: false
      },
      {
        id: 2,
        image: 'https://example.com/image2.jpg',
        title: '想找亲友（最好是南京的）',
        description: 'infp净身高167 各种番看过',
        avatar: 'https://example.com/avatar2.jpg',
        author: '蔓越莓',
        likes: 52,
        liked: false
      }
      // 可以继续添加更多帖子数据
    ],
    followList: [] // 关注列表
  },

  onLoad() {
    this.loadFollowList(); // 加载关注列表数据

    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('newPost', (data) => {
      // 添加新发布的帖子到页面顶部
      this.setData({
        posts: [data.post, ...this.data.posts]
      });

      // 自动跳转到详情页
      wx.navigateTo({
        url: `/pages/postDetail/postDetail?id=${data.post.id}`
      });
    });
  },

  // 加载关注列表数据
  loadFollowList() {
    // 假设从本地缓存获取关注列表数据
    let followList = wx.getStorageSync('followList');
    if (!followList) {
      // 如果本地缓存中没有关注列表数据，初始化一个空数组
      followList = [];
    }

    this.setData({
      followList: followList
    });
  },

  onAddPost() {
    wx.navigateTo({
      url: '/pages/newPost/newPost'
    });
  },

  onLikePost(e) {
    const { id } = e.currentTarget.dataset;
    const updatedPosts = this.data.posts.map(post => {
      if (post.id === id) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked
        };
      }
      return post;
    });
    this.setData({
      posts: updatedPosts
    });
  },

  onSearch() {
    wx.navigateTo({
      url: '/pages/search/search',
      success: (res) => {
        res.eventChannel.emit('sendPosts', { posts: this.data.posts });
      }
    });
  },

  switchTab(e) {
    const { tab } = e.currentTarget.dataset;
    const updatedTabs = this.data.tabs.map(item => {
      if (item.key === tab) {
        return { ...item, active: true };
      } else {
        return { ...item, active: false };
      }
    });
    this.setData({
      tabs: updatedTabs,
      activeTab: tab
    });
  },

  // 点击卡片进入详情页面
  onCardTap(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/postDetail/postDetail?id=${id}`
    });
  },

  // 切换关注状态
  toggleFollow(e) {
    const { id } = e.currentTarget.dataset;
    const updatedFollowList = this.data.followList.map(item => {
      if (item.id === id) {
        return {
          ...item,
          followed: !item.followed
        };
      }
      return item;
    });
    this.setData({
      followList: updatedFollowList
    });

    // 更新本地缓存中的关注列表数据
    wx.setStorageSync('followList', updatedFollowList);
  },

  // 下拉刷新
  onPullDownRefresh() {
    // 加载最新的帖子数据或者其他需要刷新的数据
    this.loadFollowList(); // 加载关注列表数据
    wx.stopPullDownRefresh(); // 停止下拉刷新动画
  }
});

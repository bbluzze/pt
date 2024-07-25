// pages/search/search.js
Page({
  data: {
    query: '',
    posts: [], // 从发现页面获取的帖子
    filteredPosts: []
  },

  onLoad(options) {
    // 从发现页面获取数据
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('sendPosts', (data) => {
      this.setData({
        posts: data.posts,
        filteredPosts: data.posts
      });
    });
  },

  onSearchInput(e) {
    const query = e.detail.value.toLowerCase();
    this.setData({ query });
    this.filterPosts();
  },

  filterPosts() {
    const filteredPosts = this.data.posts.filter(post => 
      post.title.toLowerCase().includes(this.data.query)
    );
    this.setData({ filteredPosts });
  },

  onLikePost(e) {
    const { id } = e.currentTarget.dataset;
    const updatedPosts = this.data.filteredPosts.map(post => {
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
      filteredPosts: updatedPosts
    });
  }
});

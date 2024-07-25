// postDetail.js
Page({
  data: {
    post: {
      id: 1,
      author: '池鱼',
      followed: false,
      title: '南京江宁找搭子',
      likes: 37,
      liked: false,
      images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
      content: '江宁义乌找搭子，欢迎大家一起来交流。'
    }
  },

  onFollow() {
    const { post } = this.data;
    this.setData({
      'post.followed': !post.followed
    });
  },

  onLike() {
    const { post } = this.data;
    this.setData({
      'post.likes': post.liked ? post.likes - 1 : post.likes + 1,
      'post.liked': !post.liked
    });

    // 更新社区发现页面中对应帖子的点赞数和状态
    const pages = getCurrentPages();
    if (pages.length > 1) {
      const discoverPage = pages[pages.length - 2];
      if (discoverPage && discoverPage.data && discoverPage.data.posts) {
        const updatedPosts = discoverPage.data.posts.map(p => {
          if (p.id === post.id) {
            return {
              ...p,
              likes: post.liked ? p.likes - 1 : p.likes + 1,
              liked: post.liked
            };
          }
          return p;
        });
        discoverPage.setData({
          posts: updatedPosts
        });
      }
    }
  }
});

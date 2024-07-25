Page({
  data: {
    followList: [
      { id: 1, name: '张三', followed: true },
      { id: 2, name: '李四', followed: false },
      { id: 3, name: '王五', followed: true }
      // 可根据实际情况添加更多关注列表项
    ]
  },

  toggleFollow(e) {
    const { id } = e.currentTarget.dataset;
    const { followList } = this.data;

    const index = followList.findIndex(item => item.id === id);
    if (index !== -1) {
      followList[index].followed = !followList[index].followed;
      this.setData({
        followList: [...followList]
      });
    }
  }
});

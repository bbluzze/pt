Page({
  data: {
    feedback: '',
    isSubmitDisabled: true
  },

  goBack: function() {
    wx.navigateBack();
  },

  submitFeedback: function() {
    const feedback = this.data.feedback;
    if (feedback.length >= 8) {
      wx.request({
        url: 'https://your-backend-api.com/submit-feedback',
        method: 'POST',
        data: { feedback: feedback },
        success: function(res) {
          wx.showToast({
            title: '提交成功',
            icon: 'success'
          });
        },
        fail: function(err) {
          wx.showToast({
            title: '提交失败',
            icon: 'none'
          });
        }
      });
    } else {
      wx.showToast({
        title: '请至少输入8个字',
        icon: 'none'
      });
    }
  },

  bindInput: function(e) {
    const feedback = e.detail.value;
    this.setData({
      feedback: feedback,
      isSubmitDisabled: feedback.length < 8
    });
  }
});

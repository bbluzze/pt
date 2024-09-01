// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { ticketId } = event
  const order = {
    ticketId: ticketId,
    code: Math.floor(100000 + Math.random() * 900000).toString(), // 生成6位随机数
    createTime: new Date()
  }
  const res = await db.collection('order').add({
    data: order
  })
  return {
    code: order.code
  }
}

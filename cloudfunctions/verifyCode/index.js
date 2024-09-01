// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { code } = event
  const res = await db.collection('order').where({
    code: code
  }).get()

  if (res.data.length > 0) {
    const order = res.data[0]
    const ticketRes = await db.collection('ticket').doc(order.ticketId).get()
    return {
      id: ticketRes.data._id,
      title: ticketRes.data.title,
      description: ticketRes.data.description,
      status: '有效'
    }
  } else {
    return {
      status: '无效'
    }
  }
}

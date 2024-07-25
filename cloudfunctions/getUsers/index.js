const cloud = require('wx-server-sdk');

cloud.init();
const db = cloud.database();
const usersCollection = db.collection('users');

exports.main = async (event, context) => {
  return await usersCollection.get();
};

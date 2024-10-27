
const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";

const mongoAPI = {
  async getItem(args) {
    const client = new MongoClient(uri,{});
    await client.connect();
    const database = client.db(args.db);
    const data = database.collection(args.collection);
    const resp = await data.findOne(args.query).then(res => {
      return res
    }).catch(error => {
      console.log(error)
      return {status:error}
    });
    await client.close()
    return resp
  },
  async getItems(args) {
    const client = new MongoClient(uri, {  });
    await client.connect();
    const database = client.db(args.db);
    const data = database.collection(args.collection);
    const resp = await data.find(args.query, { sort: {  } }).toArray().then(res => {
      return res
    }).catch(error => {
      return {status:error}
    });
    await client.close()
    return resp

  },
  async writeItem(args) {
    const client = new MongoClient(uri,{});
    await client.connect();
    const database = client.db(args.db);
    const data = database.collection(args.collection);
    const resp = await data.insertOne(args.data).then(res => {
      return res.ops
    }).catch(error => {
      return {status:error}
    });
    await client.close()
    return resp
  },
  async updateItem(args) {
    const client = new MongoClient(uri,{useUnifiedTopology: true });
    await client.connect();
    const database = client.db(args.db);
    const data = database.collection(args.collection);
    const resp = await data.updateOne(
      args.query, { $set: args.data }, { upsert: true }     
    ).then(res => {
      return res
    }).catch(error => {
      return {status:error}
    });
    await client.close()
    return resp
    
  }
};

module.exports = mongoAPI;

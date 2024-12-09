const { MongoClient } = require("mongodb");
dotenv.config({ path: "../.env" });

// MongoDB Atlas URI
const uri = process.env.MONGO_URI;


// The publicKey for which to fetch transactions
const targetPublicKey = "4tJwNhUAujwDpn8AGqQXRwxqgDbvGfzXeQ9t1mJ38F1J";

(async () => {
  const client = new MongoClient(mongoConfig.uri);

  try {
    await client.connect();
    const db = client.db(mongoConfig.dbName);
    const collection = db.collection(mongoConfig.collectionName);

    console.log("Connected to MongoDB for fetching transactions.");

    // Create an index on transactions.value.inputs.owners_before for optimized querying
    const indexName = await collection.createIndex({
      "transactions.value.inputs.owners_before": 1,
    });
    console.log(
      `Index created: ${indexName} on transactions.value.inputs.owners_before`
    );

    // Define aggregation pipeline to fetch all transactions for the specified publicKey in owners_before
    const pipeline = [
      { $unwind: "$transactions" },
      { $unwind: "$transactions.value.inputs" },
      {
        $match: {
          "transactions.value.inputs.owners_before": targetPublicKey,
        },
      },
      { $sort: { "transactions.value.asset.data.timestamp": -1 } },
      { $project: { transaction: "$transactions", _id: 0 } },
    ];

    const cursor = collection.aggregate(pipeline);
    const transactions = await cursor.toArray();

    if (transactions.length > 0) {
      console.log(
        "Transactions with the specified publicKey in owners_before:",
        JSON.stringify(transactions, null, 2)
      );
    } else {
      console.log(`No transactions found for publicKey: ${targetPublicKey}`);
    }
  } catch (error) {
    console.error("Error fetching transactions:", error);
  } finally {
    await client.close();
  }
})();

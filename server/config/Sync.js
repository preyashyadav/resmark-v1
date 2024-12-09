const { MongoClient, ServerApiVersion } = require("mongodb");
const { WebSocketMongoSync } = require("resilient-node-cache");

dotenv.config({ path: "../.env" });



const mongoConfig = {
  uri : process.env.MONGO_URI,
  dbName: "test",
  collectionName: "testit",
};

const resilientDBConfig = {
  //   baseUrl: "resilientdb://crow.resilientdb.com",
  baseUrl: "resilientdb://localhost:18000",
  httpSecure: false, //set to true for cloud url
  wsSecure: false, // set to true for cloud url
};

// Create a new instance of WebSocketMongoSync
const sync = new WebSocketMongoSync(mongoConfig, resilientDBConfig);

// Event listener for WebSocket connection
sync.on("connected", () => {
  console.log("WebSocket connected.");
});

// Event listener for incoming data
sync.on("data", (newBlocks) => {
  console.log("Received new blocks:", newBlocks);
});

// Event listener for errors
sync.on("error", (error) => {
  console.error("Error:", error);
});

// Event listener for WebSocket close
sync.on("closed", () => {
  console.log("Connection closed.");
});

(async () => {
  try {
    // Initialize the sync connection
    await sync.initialize();
    console.log("Synchronization initialized.");

    // Optional: you can also connect to the MongoDB database using MongoClient
    const client = new MongoClient(mongoConfig.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    });

    await client.connect();
    console.log("Connected successfully to MongoDB Atlas");

    // You can now perform operations with the MongoDB client if needed, e.g., fetching data or inserting

    // Close the client when done
    await client.close();
    console.log("MongoDB connection closed.");
  } catch (error) {
    console.error("Error during sync initialization:", error);
  }
})();

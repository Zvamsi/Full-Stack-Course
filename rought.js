const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

mongoose.connection.on("error", (error) =>
  console.error("Connection error:", error)
);
mongoose.connection.on("disconnected", () =>
  console.log("Disconnected from MongoDB")
);

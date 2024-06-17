const mongoose = require("mongoose");

const connection = () => {
  mongoose
    .connect(process.env.MONGO_DB)
    .then(() => {
      console.log("Connected Successfully with database");
    })
    .catch((err) => {
      console.log(err);
    });
};

mongoose.connection.on("connected", () => {
  console.log("Connected Successfully");
});
mongoose.connection.on("error", (err) => {
  console.log("Not Connected Successfully");
});
mongoose.connection.on("disconnected", () => {
  console.log("Disconnected Successfully");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Mongoose connection is disconnected from terminal");
  process.exit(0);
});

module.exports = connection;

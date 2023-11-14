const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(
      process.env.DB_URI ||
        "mongodb+srv://mohamed:mohamed@cluster0.maiv9qs.mongodb.net/?retryWrites=true&w=majority"
    )
    .then((data) => {
      console.log(`connected with database in host: ${data.connection.host}`);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

module.exports = connectDatabase;

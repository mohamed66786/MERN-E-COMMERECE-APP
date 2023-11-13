const app = require("./app");

// Handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log("Error: " + err.message);
  console.log("shutting down server for handling uncaught exceptions");
});

// config
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

// create the server
const server = app.listen(process.env.PORT || 8000, () => {
  console.log(
    "Server runing on port " + "http://localhost:" + process.env.PORT || 8000
  );
});

//unhandled promis rejection
process.on("unhandledRejection", (err) => {
  console.log(`Sutting down server for ${err.message}`);
  console.log(`Sutting down server for unhandled promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});

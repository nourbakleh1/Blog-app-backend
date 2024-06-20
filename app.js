const express = require("express");
const connectToDb = require("./config/connectToDb");
const xss=require("xss-clean");
const rateLimiting = require("express-rate-limit");
const helmet = require("helmet");

const { notFound, errorHandler } = require("./middlewares/error");
require("dotenv").config();
const cors=require("cors");




// Connection To Db
connectToDb();

// Init App
const app = express();

// Middlewares
app.use(express.json());

// prevent xss attack
app.use(xss());
// limit request
app.use(rateLimiting({
  windowMs: 10*60*1000,
  max:200,
}));
// helmet headers security
app.use(helmet());
// Cors policy
app.use(cors({
  origin:"http://localhost:5173"
}));


// // Routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/usersRoute"));
app.use("/api/posts", require("./routes/postsRoute"));
app.use("/api/comments", require("./routes/commentsRoute"));
app.use("/api/categories", require("./routes/categoriesRoute"));

// Error Handler Middleware
app.use(notFound);
app.use(errorHandler);


// Running The Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
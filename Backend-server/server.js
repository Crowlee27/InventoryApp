import dotenv from "dotenv";
import express from "express";
import { postgraphile } from "postgraphile";
import pkg from "pg";

dotenv.config();

const app = express();

const PORT = 9000;

const pool = new pkg.Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to the database", err);
  } else {
    console.log("Connected to database at", res.rows[0].now);
  }
});

app.use(
  postgraphile(pool, "public", {
    graphiql: true,
    enhanceGraphiql: true,
  })
);

app.listen({ port: PORT }, () => {
  console.log("Server is running on PORT 9000");
  console.log("Server is running on http://localhost:9000/");
  console.log("PostGraphiQL is running on http://localhost:9000/graphiql");
});

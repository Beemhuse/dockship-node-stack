import express from "express";
import Redis from "ioredis";

const app = express();
const redis = new Redis(process.env.REDIS_URL!);

app.set("trust proxy", process.env.TRUST_PROXY === "true");

app.get("/", async (_, res) => {
  const pong = await redis.ping();
  res.json({
    status: "DockShip running 🚢",
    redis: pong,
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`DockShip API listening on port ${port}`)
);

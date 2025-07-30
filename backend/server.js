const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const contactRoutes = require("./routes/contactRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Proper CORS for frontend from Vercel
app.use(
  cors({
    origin: 'https://nakul-zeta.vercel.app',
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Use Atlas or other remote DB URI
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api", contactRoutes);

app.get("/", (req, res) => {
  res.send("✅ Server is working ✅");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

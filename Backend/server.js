import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import errorHandler from "./middleware/errorHandler.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

// ✅ CORS ENABLE
app.use(
  cors({
    origin: "http://localhost:5173", // React / Vite URL
    credentials: true,
  })
);

app.use(cors());
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

// Error Handler (LAST MIDDLEWARE)
app.use(errorHandler);

// DB
connectDB();

app.listen(9001, () => {
  console.log("Server running on port 9001");
  console.log("MongoDB connected");

});

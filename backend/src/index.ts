import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import errorHandler from "./middlewares/errorHandler";
import dotenv from "dotenv";
import { log } from "node:console";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 30001;

// Simple CORS for development - allows all origins
app.use(cors());

app.use(express.json());

// Health check
app.get("/", (_req, res) => {
  res.json({ message: "API is running 🚀" });
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

// Error handler (must be last)
app.use(errorHandler);

app
  .listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    console.error("Server error:", err);
    console.log("Trying alternative port...");

    // Try a different port on error
    const altPort = 30001;
    app.listen(altPort, () => {
      console.log(
        `🚀 Server running on http://localhost:${altPort} as fallback`
      );
    });
  });

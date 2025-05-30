import express from 'express';
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
import petRoutes from "./routes/pet.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // allows us to accept json data in the req.body

app.use('/api/pets', petRoutes);
app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on port 5000');
});

// uuXsUIL73rOelmH7

// mongodb+srv://vishnusubramanyan2004:uuXsUIL73rOelmH7@cluster0.05fpzxo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
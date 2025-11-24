import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import path from "path";
import jobRoutes from "./routes/job.routes.js";
import userRoutes from "./routes/user.routes.js";
import { config } from "dotenv";
import { initiateEmailTransporter } from "./middleware/emailService.js";

config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "jobportal",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
  })
);

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "views"));

// Serve static files
app.use(express.static(path.join(path.resolve(), "public")));
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// Routes
app.use("/users", userRoutes);
app.use("/jobs", jobRoutes);

app.get("/", (req, res) => {
  res.render("layout/header");
});

// Start server
const PORT = 3000;
export const transporter = await initiateEmailTransporter(
  process.env.EMAIL_USER,
  process.env.EMAIL_PASS
);
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import path from "path";
import jobRoutes from "./routes/job.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({ secret: "jobportal", resave: false, saveUninitialized: true })
);

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "views"));

// Routes
app.use("/users", userRoutes);
app.use("/jobs", jobRoutes);

app.get("/", (req, res) => {
  res.render("layout/header");
});

// Start server
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

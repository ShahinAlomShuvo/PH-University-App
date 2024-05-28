import express, { Request, Response } from "express";
import { StudentRoutes } from "./modules/student/student.routes";
const app = express();

app.use(express.json());
app.use("/api/v1/students", StudentRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;

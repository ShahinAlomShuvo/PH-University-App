import express, { Request, Response } from "express";
import { StudentRoutes } from "./modules/student/student.routes";
import { UserRoutes } from "./modules/user/user.routes";
import errorHandler from "./middleware/errorHandler.middleware";
import notFound from "./middleware/notFound.middleware";
const app = express();

app.use(express.json());
app.use("/api/v1/students", StudentRoutes);
app.use("/api/v1/users", UserRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(notFound);
app.use(errorHandler);
export default app;

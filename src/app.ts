import express, { Request, Response } from "express";
import errorHandler from "./middleware/errorHandler.middleware";
import notFound from "./middleware/notFound.middleware";
import router from "./routes";
const app = express();

app.use(express.json());
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.json({
    status: "success",
    message: "Welcome to Ph-University API",
  });
});

app.use(notFound);
app.use(errorHandler);
export default app;

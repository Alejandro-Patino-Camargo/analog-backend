import { port } from "./config/index.js";
import loader from "./loaders/index.js";
import app from "./app.js";

loader(app);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return err;
  }
  console.log(`Server is running on ${port}`);
});

export default app;

import { app } from "./app.js";
import { connectDB } from "./db/db.js";
const port = process.env.PORT || 2000

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running on port ${process.env.PORT}`);
    })
  })
  .catch((error) => {
    console.log("MongoDB connection failed due to", error);
  })
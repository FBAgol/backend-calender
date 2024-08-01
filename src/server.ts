// src/server.ts
import { app } from "./app";

const port = process.env.PORT;

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
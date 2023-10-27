const express = require("express");
const cors = require("cors");
const config = require("./utils/config");
const logger = require("./utils/logger");
const notesRouter = require("./controllers/notes");
const middleware = require("./utils/middleware");

const app = express();
const Note = require("./models/note");

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use("/api/notes", notesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

const PORT = config.PORT || 3001;
app.listen(PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});

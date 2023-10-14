require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const Note = require("./models/note");

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", async (request, response) => {
  const notes = await Note.find({});

  response.json(notes);
});

app.get("/api/notes/:id", async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id);

    if (note) {
      response.json(note);
    } else {
      response.status(404).json({
        error: "Not found",
      });
    }
  } catch (err) {
    next(err);
  }
});

app.post("/api/notes", async (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  const savedNote = await note.save();

  response.json(savedNote);
});

app.put("/api/notes/:id", async (request, response, next) => {
  try {
    const body = request.body;

    const note = {
      content: body.content,
      important: body.important,
    };

    const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true });

    if (!updatedNote) {
      return response.status(404).json({ error: "Note not found" });
    }

    response.json(updatedNote);
  } catch (err) {
    next(err);
  }
});

app.delete("/api/notes/:id", async (request, response, next) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(request.params.id);

    if (!deletedNote) {
      return response.status(404).json({ error: "Note not found" });
    }

    response.status(204).end();
  } catch (err) {
    next(err);
  }
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

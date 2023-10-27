const mongoose = require("mongoose");

const main = async () => {
  if (process.argv.length < 3) {
    console.log("give password as argument");
    process.exit(1);
  }

  const password = process.argv[2];

  const url = `mongodb+srv://spook11:${password}@phonebook-notes-db.vx96f28.mongodb.net/noteApp?retryWrites=true&w=majority`;

  mongoose.set("strictQuery", false);
  mongoose.connect(url);

  const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
  });

  const Note = mongoose.model("Note", noteSchema);

  const result = await Note.find({});

  result.forEach(note => {
    console.log(note);
  });

  mongoose.connection.close();
};

if (require.main === module) {
  (async () => {
    await main();
  })();
}

const mongoose = require("mongoose");
const MONGO_URI =
  "mongodb+srv://connorkeyes:D36U8CGSL5maEh9h@cluster0.volzs1e.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to Mongo DB."))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  cookieID: { type: String, required: true, sparse: true },
  createdAt: { type: String, expires: 1, default: Date.now(), sparse: true },
});

const Session = mongoose.model("Sessions", sessionSchema);

module.exports = {
  Session,
};

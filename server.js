const express = require('express');
urlRouter = require('./routes/url');
const connectDB  = require('./config/db');
const URL = require('./models/url')

const app = express();
const PORT = 3000;

connectDB();

app.use(express.json());

app.use("/url", urlRouter);
app.get('/:shortID', async(req, res) => {
  const shortID = req.params.shortID;
  const entry = await URL.findOneAndUpdate({
    shortID
  },
{
  $push : {
    cntClicks : {timestamp : Date.now()},
  }
});
res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
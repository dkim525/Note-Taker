const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

require('./routes/routes')(app);

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
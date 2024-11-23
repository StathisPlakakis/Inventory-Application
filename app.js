const express = require('express');
const indexRouter = require('./routes/indexRouter');
const path = require('path');
const app = express();
const PORT = 3000;

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`)
})
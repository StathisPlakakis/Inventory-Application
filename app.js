const express = require('express');
const indexRouter = require('./routes/indexRouter');
const dashboardRouter = require('./routes/dashboardRouter');
const path = require('path');
const {CustomNotFoundError} = require('./errors/customNotFoundError')
const app = express();
const PORT = 3000;

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.urlencoded({ extended: true }));
app.use('/dashboard', dashboardRouter);
app.use('/', indexRouter);
app.use((req, res, next) => {
  next(new CustomNotFoundError('Page not found'));
})
app.use((err, req, res, next) => {
  console.error(err);
  if (err.statusCode === 404) {
    res.render('error404');
  }else {
    res.send(err.message);
  }
})
app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`)
})
const express = require('express');
const indexRouter = require('./routes/indexRouter');
const dashboardRouter = require('./routes/dashboardRouter');
const apiRouter = require('./routes/apiRouter');

const path = require('path');
const {CustomNotFoundError} = require('./errors/customNotFoundError')
const app = express();
const PORT = 3000;
const db = require('./db/queries')

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.get('/images/:boat_id', async (req, res) => {
  const {boat_id} = req.params;
  const imageBuffer = await db.getImageByBoatId(boat_id);
  const imageBase64 = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
  res.render('images', { image: imageBase64 });
});
app.use('/dashboard', dashboardRouter);
app.use('/api', apiRouter);
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
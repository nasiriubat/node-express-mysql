const express = require('express');
const postRoutes = require('./routes/postRoute');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api', postRoutes)


const port = 3000; // Change to your desired port number

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
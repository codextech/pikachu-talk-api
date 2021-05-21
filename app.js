const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const path = require('path')

const app = express();
const {postRouter} = require('./routes/posts.routes')
const {authRouter} = require('./routes/auth.routes')


app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/uploads', express.static (path.join(__dirname, './uploads'))); /* TO SERVE STATIC CONTENT */


/* conection with database */
// mongoose.connect('mongodb://localhost:27017/blog-site', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// }).then(result=> {
//     console.log('db is connected');
//     app.listen(3000 , () =>{
//         console.log('app is running on port 3000');
//     });
// }).catch(err => {
//     console.log('error ', err);
// })

/* live */
mongoose.connect('mongodb+srv://tanzeel:codex850@cluster0.8k3yz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(result=> {
    console.log('db is connected');
    app.listen(process.env.PORT || 3000 , () =>{
        console.log('app is running on port 3000');
    });
}).catch(err => {
    console.log('error ', err);
})


app.use(authRouter) /* auth routes */
app.use(postRouter) /* post routes */


const express =  require('express');
const multer  = require('multer');



// --------------multer file upload settings -------------
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads");
    },
  
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    }
});
// -------------- END multer file upload settings -------------

const upload = multer({ storage: fileStorage });




const router = express.Router();

const {Post} =  require('../models/posts')
const {checkAuth} =  require('../middlewares/check-auth')

router.get('/api/posts' ,  async (req , res) => {
    let posts = await Post.find({});
    res.status(200).json(posts)
});


router.get('/api/posts/me' ,checkAuth,  async (req , res) => {
  let user = req.user;
  let posts = await Post.find({userId : user.id});
  res.status(200).json(posts)
});

router.get('/api/posts/:id' ,  async (req , res) => {
  let id =  req.params.id;
  let post = await Post.findById(id);
  res.status(200).json(post)
});

router.post('/api/posts' , checkAuth , upload.single('image') , async (req, res) => {
    let body =  req.body;
    let user = req.user; /* id email name <<<< jwt create*/
    console.log("🚀 > >> >> >> >>  user", user)
    console.log("", user)
    if (req.file) {
        body.imageUrl = req.file.path
    }
    body.userId = user.id /* attacth curent logged in user */

    let result = await Post.create(body);
    res.status(200).json(result)
});

/* image upload */
router.post('/image' , upload.single('image') , async (req, res) => {
   console.log(req.file);
   res.status(200).json(req.file)
});

module.exports.postRouter = router;



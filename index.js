const express = require('express');
const app = new express();
const ejs = require('ejs');
const expressSession = require('express-session');
const flash = require('connect-flash');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const fileUpload = require('express-fileupload');
const customMiddleWare = (req,res,next)=>{
    console.log('Custom Middleware was called!');
    next();
};
const authMiddleWare = require('./middleware/authMiddleWare');
const redirectIfAuthenticatedMiddleWare = require('./middleware/redirectIfAuthenticatedMiddleWare');
app.use(flash());

global.loggedIn = null;

const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');


const validateMiddleWare = require("./middleware/validateMiddleWare");

mongoose.connect('mongodb+srv://admin-00:Is0lation1@cluster0-motsb.mongodb.net/my_database', {useNewUrlParser: true, useUnifiedTopology: true});

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());
app.use(expressSession({
    secret: 'keyboard cat'
}));
app.use("*", (req,res,next)=>{
    loggedIn = req.session.userId;
    next();
});


app.use('/posts/store',validateMiddleWare);
app.use(customMiddleWare);

app.get('/', homeController);
app.get('/post/:id', getPostController);
app.get('/posts/new', authMiddleWare, newPostController);
app.post('/posts/store', authMiddleWare, storePostController);
app.get('/auth/register', redirectIfAuthenticatedMiddleWare, newUserController);
app.post('/users/register', redirectIfAuthenticatedMiddleWare, storeUserController);
app.get('/auth/login', redirectIfAuthenticatedMiddleWare, loginController);
app.post('/users/login', redirectIfAuthenticatedMiddleWare, loginUserController);
app.get('/auth/logout', logoutController);
app.use((req,res)=> res.render('notfound'));

let port = process.env.PORT;
if (port == null || port == "") {
    port = 4000;
}

app.listen(port, ()=>{
    console.log('App listening on port 4000');
});
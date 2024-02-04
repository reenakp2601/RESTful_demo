const express = require('express'); 
const app = express();
const path = require('path');
const {v4 : uuid }  = require('uuid');
const methodOverride = require('method-override');
 
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs') 

let comments = [
    { id :uuid(), 
      username : 'reena',
      comment : 'its too good picture' },
      { id:uuid(),
        username : 'nidhi',
      comment : 'its a nice picture' },
      { id :uuid(),
        username : 'mokshi',
      comment : 'its an average picture' } 
]

app.get('/comments',(req, res)=>{
    res.render('comments/index', {comments}) 
})
app.get('/comments/new', (req,res) =>{
     res.render('comments/new')
})

app.post('/comments', (req,res) =>{
    const {username, comment} = req.body;
    comments.push({username, comment, id: uuid()});
    res.redirect('/comments');
}) 
app.delete('/comments/:id',(req,res) =>{
    const {id} = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})
app.get('/comments/:id/edit', (req,res) =>{
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', {comment});
})
app.patch('/comments/:id', (req, res) => {
    const {id} = req.params;
    const newText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newText;
    res.redirect('/comments');
})
app.get('/comments/:id', (req,res) =>{
    const {id }= req.params;
    const comment = comments.find(c => c.id === id);
   res.render('comments/show', {comment});
})
app.get('/tacos', (req, res)=>{
     res.send("get /tacos response")
})
app.post('/tacos', (req, res)=>{
    console.log(req.body);
    res.send("post /tacos rersponse")
})

//app.listen(3000, ()=>{
//    console.log('listening on port 3000')
//})
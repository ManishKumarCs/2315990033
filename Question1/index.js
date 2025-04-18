const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());

const PORT= process.env.PORT || 5000; // take PORT from .env file otherwise default to 3000

app.post('/calculateAverage',(req,res)=>{  // endpoint api/calculateAverage to calculate average
    const numbersArray =req.body.numbers;
    let totalSum=0;
    for(let i=0;i<numbersArray.length;i++){
        if(typeof numbersArray[i] !== 'number'){
            return res.status(400).json({error:'All inputs should be number'});
        }
        totalSum+=numbersArray[i];
    }
    const average = totalSum/numbersArray.length;
    return res.status(200).json({average:average});
});

const users = [
    { id: 1, name: 'User1', email: 'user1@gmail.com' },
    { id: 2, name: 'User2', email: 'user2@gmail.com' },
    { id: 3, name: 'User3', email: 'user3@gmail.com' },
    { id: 4, name: 'User4', email: 'user4@gmail.com' }
  ];
  
  const posts = [
    { id: 1, userId: 1, title: 'First Post', body: 'This is my first post content' },
    { id: 2, userId: 1, title: 'Second Post', body: 'This is another post' },
    { id: 3, userId: 2, title: 'User3 Post', body: 'Hello from User3' },
    { id: 4, userId: 3, title: 'User4 Post', body: 'Some thoughts from User4' }
  ];
  
  const comments = [
    { id: 1, postId: 1, name: 'User2', body: 'Great post!' },
    { id: 2, postId: 1, name: 'User4', body: 'I agree with this' },
    { id: 3, postId: 2, name: 'User1', body: 'Interesting perspective' },
    { id: 4, postId: 3, name: 'User1', body: 'Thanks for sharing' }
  ];
  

  app.get('/users', (req, res) => {
    res.json({ users });
  });
  
  app.get('/users/:userId/posts', (req, res) => {
    const userId = parseInt(req.params.userId);
    const userPosts = posts.filter(post => post.userId === userId);
    res.json({ posts: userPosts });
  });
  
  app.get('/posts/:postId/comments', (req, res) => {
    const postId = parseInt(req.params.postId);
    const postComments = comments.filter(comment => comment.postId === postId);
    res.json({ comments: postComments });
  });

app.listen(PORT,()=>{
    console.log(`Server is running on port number ${PORT}`);
});
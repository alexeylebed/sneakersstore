const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const path = require('path');


const app = express();
app.use(cookieParser());
app.use(session({
    name: 'session',
    keys: ['key1']
  }))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use((req, res) =>{
//     let n = req.session.views || 0;
//     req.session.views = ++n;
//     res.json(n + ' views')
//     //res.sendFile(path.join(__dirname, "./cookies.html"));
//     console.log(req.cookies);
//     console.log("================")
//     console.log(req.session);
// })

// app.use(function (req, res, next) {
    
// })

  app.get("/" , (req, res) =>{
      res.sendFile(path.join(__dirname, "./cookies.html"));
  })

   
  app.post("/senddata" , (req, res) =>{
     let userData = req.body;
     console.log(userData)
     var n = req.session.views || 0
     req.session.views = ++n;
     req.session.data = userData
     let toSend = [req.session.views, req.session.data];
     req.session = null
     res.json(toSend)


 })

app.listen(3002)

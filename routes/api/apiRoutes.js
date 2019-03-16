const db = require("../../models")
const config = require('../../config');

//Load database from config file
const loadDB = (finalRes) =>{
  createItem = (config) =>{
    config.forEach(item =>{
      db.Item.create(item)
      .then(res =>{
        console.log(res)
      });
    });
  };
  
  db.Item.remove().then(res => {
    console.log(res)
    createItem(config).then(response =>{
      finalRes.json(response)
    });
  });
}
 
module.exports = function(app) {
    app.get("/loadb", (req, res) =>{
        console.log('db load request is gotten')
        loadDB(res);
      })

    app.get('/api', (req, res) =>{
        db.Item.find().then(response =>{res.json(response)})
    });

    app.get('/api/catalog/:param', (req, res) =>{
        db.Item
            .find({category: req.params.param})
            .then(response =>{res.json(response)
        })
    });

    app.get('/api/:itemId', (req, res) =>{
        db.Item
            .find({id: req.params.itemId})
            .then(response =>{res.json(response)
        })
    });

    app.post('/register' , (req, res) => {
        //console.log(req.body)
        db.User.findOne({
            email: req.body.email
        }).then(result =>{
            if(!result){
                db.User.create(req.body).then( newUser => {
                    console.log(newUser)
                    req.session.user = newUser
                    res.json(newUser)
                })
            } else {
                res.json("exists")
            }
        })

    })

}




const db = require("../../models");

module.exports = function(app) {
    app.post('/cartupdated' , (req, res) =>{
        if(req.session.user){
            req.session.user.cart  = req.body.body;
            req.session.cart = req.body.body;
            db.User.findOneAndUpdate(
                {email: req.session.user.email}, 
                req.session.user,
                {returnNewDocument: true})
            .then(() =>{
                res.json(req.session.user);
            });
        } else {
            req.session.cart = req.body.body;
            res.json(req.session.cart);
        }
    });

    app.post('/checkout' , (req, res) =>{
        if(req.session.user){
            req.session.user.cart  = [];
            req.session.cart = [];
            if(!req.session.user.orders){
                req.session.user.orders = [];
            }
            db.Order.create({
                    cart: req.body.cart,
                    subtotal: req.body.subtotal,
                    tax: req.body.tax,
                    total: req.body.total
                }).then( order =>{
                    req.session.user.orders.push(order)
                    db.User.findOneAndUpdate(
                        {email: req.session.user.email}, 
                        req.session.user,
                        {returnNewDocument: true})
                    .then(() =>{
                        res.json(req.session.user);
                    });
                })
        } else {
            req.session.cart = req.body.body;
            res.json(req.session.cart);
        }
    });



    app.get('/loadcart' , (req, res) =>{
        if(req.session.user){
            res.json(req.session.user.cart || []);
        } else {
            res.json(req.session.cart || []);
        }
    });

    app.get('/loaduser' , (req, res) =>{
        //req.session = null;
        if(req.session.user){
            res.json(req.session.user);
        } else {
            res.json("nouser");
        }
    });

    app.get("/logout", (req, res) => {
        req.session = null;
        res.json('logout is successful')
    })

    app.get("/logout", (req, res) => {
        req.session = null;
        res.json('logout is successful')
    })

    app.post("/changeaddress" , (req, res) => {
        if(req.session.user){
            req.session.user.address = req.body.address;
            console.log(req.session.user)
            db.User.findOneAndUpdate({email: req.session.user.email},req.session.user)
            .then(result => {
                console.log(result)
                res.json(req.session.user)})
            .catch(err => {
                  console.log(err)
                res.json(err)});
        } else {
            res.json('nouser')
        }
    })

    app.post("/changename" , (req, res) => {
        if(req.session.user){
            req.session.user.name = req.body.name;
            console.log(req.session.user)
            db.User.findOneAndUpdate({email: req.session.user.email},req.session.user)
            .then(result => {
                console.log(result)
                res.json(req.session.user)})
            .catch(err => {
                  console.log(err)
                res.json(err)});
        } else {
            res.json('nouser')
        }
    })

    

    app.post("/changeuser" , (req, res) => {
        if(req.session.user){
            req.session.user = req.body.user;
            console.log(req.session.user)
            db.User.findOneAndUpdate({email: req.session.user.email},req.session.user)
            .then(result => {
                console.log(result)
                res.json(req.session.user)})
            .catch(err => {
                  console.log(err)
                res.json(err)});
        } else {
            res.json('nouser')
        }
    })


    app.post('/auth' , (req, res) =>{
        console.log(req.session.user)
        if(!req.session.user){
            db.User.findOne({
                email: req.body.email
            }).then( result =>{
                if(result){
                    if(result.password === req.body.password){
                        console.log('succcessfull auth')
                        req.session.user = result
                        if(req.body.cart.length > 0){
                            req.session.user.cart = req.body.cart;
                            db.User.findOneAndUpdate({email: req.session.user.email},req.session.user)
                                   .then(result => {
                                       //console.log(result)
                                       console.log(req.session.user)
                                       res.json(result)})
                                   .catch(err => {
                                         console.log(err)
                                       res.json(err)});
                        } else {
                            res.json(req.session.user)
                        }
                    } else {
                        console.log('Unsucccessfull auth/Password is wrong')
                        res.json("failed");
                    }
                } else {
                    console.log('Unsucccessfull auth/Login is wrong')
                    res.json("failed");
                }
            })
        } else {
            db.User.findOne({
                email: req.session.user.email
            }).then(result =>{
                res.json(result);
            })
            
        }
       
    });
};
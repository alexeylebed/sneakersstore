const path = require('path')

module.exports = function(app) {
    app.get('/icons/logo', (req, res) =>{
        res.sendFile(path.join(__dirname, "../../assets/logo.png"))
    });

    app.get('/icons/profile', (req, res) =>{
        res.sendFile(path.join(__dirname, "../../assets/profile.svg"))
    });

    app.get('/icons/profilecart', (req, res) =>{
        res.sendFile(path.join(__dirname, "../../assets/profilecart.png"))
    });

    app.get('/icons/locationcart', (req, res) =>{
        res.sendFile(path.join(__dirname, "../../assets/locationcart.svg"))
    });

    app.get('/icons/cart', (req, res) =>{
        res.sendFile(path.join(__dirname, "../../assets/bag.svg"))
    });

    app.get('/catalog/polygon', (req, res) =>{
        res.sendFile(path.join(__dirname, "../../assets/polygon.svg"))
    });

    app.get('/catalog/staractiveicon', (req, res) =>{
        res.sendFile(path.join(__dirname, "../../assets/staractive.svg"))
    });

    app.get('/catalog/starpassiveicon', (req, res) =>{
        res.sendFile(path.join(__dirname, "../../assets/starpassive.svg"))
    });

    app.get('/catalog/img/:id' , (req, res) =>{
        res.sendFile(path.join(__dirname, `../../database/images/${req.params.id}.png`)) 
    });

    app.get('/catalog/arrowleft', (req, res) =>{
        res.sendFile(path.join(__dirname, "../../assets/arrowleft.svg"))
    });

    app.get('/catalog/arrowright', (req, res) =>{
        res.sendFile(path.join(__dirname, "../../assets/arrowright.svg"))
    });

    app.get('/catalog/socials', (req, res) =>{
        res.sendFile(path.join(__dirname, "../../assets/socials.svg"))
    });

    app.get('/item/closemodal', (req, res) =>{
        res.sendFile(path.join(__dirname, "../../assets/closeModal.png"))
    });
    app.get('/icons/profile/contact', (req, res) =>{
        res.sendFile(path.join(__dirname, "../../assets/profile/profile.svg"))
    });
    app.get('/icons/profile/contactblack', (req, res) =>{
        res.sendFile(path.join(__dirname, "../../assets/profile/profileblack.svg"))
    });
    app.get('/icons/profile/addressblack', (req, res) =>{
        res.sendFile(path.join(__dirname, "../../assets/profile/locationblack.svg"))
    });
    app.get('/icons/profile/ordersblack', (req, res) =>{
        res.sendFile(path.join(__dirname, "../../assets/profile/ordersblack.svg"))
    });
}

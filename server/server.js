
const express = require('express');
const cors = require('cors'); //Cors
const app = express();
const cookieParser = require('cookie-parser');

require('dotenv').config();
const axios = require('axios');
require('./settings/mongoose.config');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));


//
function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}
//categories
const Category = require('./models/category.model');
axios.get('https://dummyjson.com/products/categories')
    .then((response) => {
        response.data.forEach(element => {
            const update = { description: capitalizeFirstLetter(element) };
            const query = { name: capitalizeFirstLetter(element) }
            const options = { upsert: true, new: true, setDefaultsOnInsert: true };
            Category.findOneAndUpdate(query, update, options, (error, result) => {
                if (error) {
                    console.log(error);
                    return;
                };
            });
        });
    })
    .catch((error) => {
        console.log(error);
        this.image_url = 'https://dummyimage.com/220x150/dee2e6/6c757d.jpg';
    });
//
//products
const getRandomArbitrary = (min, max) => {
    return parseInt(Math.random() * (max - min) + min);
}
const Product = require('./models/product.model');
axios.get('https://dummyjson.com/products')
    .then((response) => {
        response.data.products.forEach(async (element) => {
            const category = await Category.findOne({ name: capitalizeFirstLetter(element.category) });
            const query = { name: capitalizeFirstLetter(element.title) }
            const update = {
                barcode: Array(10).fill().map((_, i) => getRandomArbitrary(0, 9)).join(''),
                description: capitalizeFirstLetter(element.description),
                price: new Number(element.price) * 7300,
                stock: element.stock,
                categories: [category._id],
                images: element.images
            };
            const options = { upsert: true, new: true, setDefaultsOnInsert: true };
            Product.findOneAndUpdate(query, update, options, (error, result) => {
                if (error) {
                    console.log(error);
                    return;
                };
            });
        });
    })
    .catch((error) => {
        console.log(error);
    });

//Routes
require('./routes/product.route')(app);
require('./routes/category.route')(app);
require('./routes/cart.route')(app);
require('./routes/wishList.route')(app);
require('./routes/user.route')(app);

const server = app.listen(8000, () => {
    console.log("Listening at Port 8000");
})

const io = require("socket.io")(server);

io.on('connection', socket => {
    console.log(socket.id)
})

io.on('connection', socket => {
    socket.on('event_from_client', data => {
        socket.broadcast.emit('send_data_to_all_other_clients', data);
    })
})


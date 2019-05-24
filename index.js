	// Require the Express Module
	const express = require('express');
	// Create an Express App
	const app = express();
	// Require body-parser (to receive post data from clients)
	const bodyParser = require('body-parser');
	// Integrate body-parser with our App
	const flash = require('express-flash');
	const mongoose = require('mongoose');
	// Require path
	const path = require('path');
	const session = require('express-session');
	const uniqueValidator = require('mongoose-unique-validator');

	// Setting our Static Folder Directory
	app.use(express.static(path.join(__dirname, 'public/dist/public')));
	// Setting our Views Folder Directory
	// app.set('views', path.join(__dirname, './views'));
	// // Setting our View Engine set to EJS
	// app.set('view engine', 'ejs');
	// Routes
	app.use(bodyParser.json());

	app.use(flash());
	// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
	//   our db in mongodb -- this should match the name of the db you are going to use for your project.

	app.use(bodyParser.urlencoded({
		extended: true
	}));
	//new code:

	app.use(session({
		secret: 'whatever',
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 60000 //only save for 60 seconds
		}
	}))
	const DB_NAME = "product_db";
	const MAIN_TB = 'Product';
	// const featureCollection = 'User'
	const FEATURE_TB = 'Review';
	const PORT_NUM = 6868;

	mongoose.connect(`mongodb://localhost/${DB_NAME}`); // use or create databases
	// const UserSchema = new mongoose.Schema({
	// 	name: {
	// 		type: String,
	// 		require: [true, "Please Write Your Review"]
	// 	},
	// 	product: [ProductSchema],
	// }, {
	// 	timestamp: true
	// });
	const ProductSchema = new mongoose.Schema({
		title: {
			type: String,
			require: [true, "Please Add a Title for The Product"],
			minlength: [4, "The title is required to have more than 4 characters"],
			index: true,
			unique: [true, "The product is already in the system.Please try another product "]
		},
		price: {
			type: [Number, "Price should be number"],
			require: [true, "Please Add A Product Price"]
		},
		url: {
			type: String,
			required: [true, 'Please Add Picture for The Product'],
		}
	}, {
		timestamp: true
	});

	const ReviewSchema = new mongoose.Schema({
		content: {
			type: String,
			require: [true, "Please Add a Content for The Product"],
			minlength: [4, "The Content is required to have more than 4 characters"],
		},
		stars: {
			type: Number,
			require: [true]
		},
	}, {
		timestamp: true
	});
	ProductSchema.plugin(uniqueValidator);



	mongoose.model(MAIN_TB, ProductSchema); // We are setting this Schema in our Models as 'User'
	// mongoose.model(FEATURE_TB, ReviewSchema); // We are setting this Schema in our Models as 'User'
	mongoose.model(FEATURE_TB, ReviewSchema);
	const Product = mongoose.model(MAIN_TB)

	mongoose.Promise = global.Promise;

	// Root Request
	app.get('/get_all_products', (req, res) => {

		Product.find({}, (err, data) => {
			if (err) {
				res.json({
					error: err
				})
			} else {
				console.log('********************/:id res************************', data)
				res.json({
					products: data,
				});
			}
		});
	})

	app.post('/create_new_product', (req, res) => {
		console.log("******************req***********************", req.body);
		var product = new Product({
			title: req.body.title,
			url: req.body.url,
			price: req.body.price
		});
		product.save(function (err, data) {
			if (err) {
				// if there is an error upon saving, use console.log to see what is in the err object
				console.log("We have an error!", err);
				//    // adjust the code below as needed to create a flash message with the tag and content you would like
				//    for (var key in err.errors) {
				//        req.flash('registration', err.errors[key].message);
				//    }
				res.json({
					errors: err['errors']
				});
			} else {
				res.json({
					createdProduct: data
				});
			}
		});
	});
	// app.get('/showDetail/:id', (req, res) => {
	// 	Task.findOne({
	// 		_id: req.params.id
	// 	}, (err, data) => {
	// 		if (err)
	// 			console.log('jjhhgjggj error')
	// 		// deleted at most one tank document
	// 		else {
	// 			res.json({
	// 				task: data
	// 			});
	// 		}
	// 	});
	// });


	app.put('/update_the_product', (req, res) => {
		console.log("*********app.put('/update_the_product', (req, res)**********************", req.body);
		Product.findByIdAndUpdate({
				_id: req.body._id
			}, {
				$set: {
					title: req.body.title,
					price: req.body.price,
					url: req.body.url
				}
			},
			(err, data) => {
				if (err) {
					console.log('err err erer',  err['errors'])
					res.json({
						error: err['errors']
					});
				}
				// deleted at most one tank document
				else
					res.json({
						updatedData: data
					});
			});
	});
	app.delete('/delete_a_product/:id', (req, res) => {
		Product.deleteOne({
			_id: req.params.id
		}, (err, data) => {
			if (err) {
				res.json({
					error: err
				})
			} // deleted at most one tank document
			else
				res.json({deleteData: data});
		});
	});


	// this route will be triggered if any of the routes above did not match
	app.all("*", (req, res, next) => {
		res.sendFile(path.resolve("./public/dist/public/index.html"))
	});


	app.listen(PORT_NUM, function () {
		console.log(`listening on port localhost:${PORT_NUM}`);
	})
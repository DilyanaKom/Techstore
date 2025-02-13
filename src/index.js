import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';

import routes from './routes.js'
import cookieParser from 'cookie-parser';
import { auth } from './middlewares/auth-middleware.js';

const app = express();

//Handlebars config
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
  runtimeOptions:{
        allowProtoPropertiesByDefault: true,
    },
    //TODO Add any needed helpers
    // helpers: {
    //     showRating: showRatingHelper,
    // }
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');


//Express config
app.use('/static', express.static('src/public'));
app.use(express.urlencoded({extended: false})); //body parser
app.use(cookieParser());
app.use(auth)


//DB config
try {
    const uri = 'mongodb://localhost:27017/test'; //update db
    await mongoose.connect(uri);
    console.log('DB connected successfully');
} catch (error) {
    console.log('Cannot connect to DB');
    console.error(error.message);
}

app.use(routes);


app.listen(3000, () => console.log('Server is listening on http://localhost:3000...'));
//Modules
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const routes = require('./routes/router.js')
const handleb = require('express-handlebars');
const helpers =  require('./lib/handlebars.js');
//Initialize
const app = express();
app.set('port', process.env.PORT||3000);
app.set('views',path.join(__dirname,'views'))
app.use(morgan('dev'));
app.engine('.hbs',handleb({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname: '.hbs',
    helpers: helpers
}));
app.set('view engine', '.hbs');
app.use(express.json());

//Global Variables to be Used

//App Routes
app.use(routes);
//Public Declarations
app.use(express.static(path.join(__dirname,'public')));
//Server Starter
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
});
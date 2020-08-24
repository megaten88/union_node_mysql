//Modules
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const routes = require('./routes/router')
const auth = require('./routes/authentication');
const maintenanceController = require('./routes/maintenance');
const meatController = require('./routes/meat');
const dairyController = require('./routes/dairyproducts');
const handleb = require('express-handlebars');
const helpers =  require('./lib/handlebars.js');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const session =  require('express-session');
const mysqlSession = require('express-mysql-session');
const {database} = require('./configuration');
const passport = require('passport');

//Initialize
const app = express();
require('./lib/passport');
require('dotenv').config();
app.set('port', process.env.PORT||3000);
app.set('views',path.join(__dirname,'views'))
app.use(session({
    secret: 'nodesql',
    resave:false,
    saveUninitialized:false,
    store: new mysqlSession(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.engine('.hbs',handleb({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname: '.hbs',
    helpers: helpers
}));
app.set('view engine', '.hbs');
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

//Global Variables to be Used
app.use((req,res,next)=>{
    app.locals.success= req.flash('SUCCESS');
    next();
});
//App Routes
app.use(routes);
app.use('/users',auth);
app.use('/maintenance',maintenanceController);
app.use('/meat',meatController);
app.use('/dairyproducts',dairyController);
//Public Declarations
app.use(express.static(path.join(__dirname,'public')));
//Server Starter
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
});
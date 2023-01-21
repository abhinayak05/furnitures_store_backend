const port = 3000;
const express=require('express');
const app=express();
const cors=require('cors');
app.use(cors())
const bodyParser =require('body-parser');
const morganApiLogger=require('morgan');
const path = require('path');
const htmlTamplates=path.join(__dirname,'tamplates')

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morganApiLogger('dev'));
app.use(require('express').static(path.join(__dirname,'public')));

const routes=require('./routes')(express.Router(),app)
const frontendRoutes=require('./routes/frontendRoutes')(express.Router(),app,htmlTamplates)

app.use('/api',routes);
app.use('/',frontendRoutes);




app.listen(port, ()=>{
    console.log(`Access URL:http://localhost:${port}`)
})


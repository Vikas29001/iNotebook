const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/iNotebook')


// const mongoose = require('mongoose');
// const mongoURI = 'mongodb://localhost:27017/apna';


// const connectToMongo = ()=>{
//    mongoose.connect(mongoURI,()=>{
//     console.log("Connection Successful");
//    })
// }

// module.exports = connectToMongo;
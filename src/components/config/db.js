const mongoose=require('mongoose');
const dbConnect=()=>{
    return mongoose.connect(`mongodb+srv://masai-jobs:masai-jobs@masai-jobs.9wynpiy.mongodb.net/masai-jobs`)
}
module.exports=dbConnect;
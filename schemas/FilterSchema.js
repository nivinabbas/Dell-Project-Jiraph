const mongoose = require('mongoose');
/* const FilterSchema = new mongoose.Schema({
    Filter: {
        pageName: String,
        filter1: {filterName:String , value1:String , value2:String ,value3:String },
        filter2: {filterName:String , value1:String , value2:String ,value3:String },
        filter3: {filterName:String , value1:String , value2:String ,value3:String },
        filter4: String

    }

}) */




/* const FilterSchema = new mongoose.Schema({
    Filter: {
        pageName: String,
        filter1: {values:[] },
        filter2: {values:[] },
        filter3: {values:[] },
        filter4: String

    }

}) */




const FilterSchema = new mongoose.Schema({
    Filter: {
        pageName: String,
        filters: [
            {
                filter: String,
                values: []
            }
            
        ]
        ,
        filterName: String 

    }

})
module.exports = FilterSchema;
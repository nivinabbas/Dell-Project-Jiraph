const mongoose = require('mongoose');

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
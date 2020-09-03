const mongoose = require('mongoose');
const UserSchema = require('./UserSchema')

const TaskModel = mongoose.model('TaskModel', {
    jiraItem: { //some of the fields have jira prefix like jiraName and some don't like fixVersion, we recommend using without the prefix for all
        jiraId: String,
        jiraName: String,
        jiraType: String,
        priority: String,
        status: String,
        //specialFields: {
        jiraParentId: String,
        functionalTest: Boolean, //change from String "Yes"/"No" to Booleam true/false
        qaRepresentative: String,
        fixVersion: String
        //}
    },
    qcItem: {
        requirementId: String,
        requirementType: String,
        status: String
    },
    diffItem: {
        type: { type: String }, // type: Update/Create/Delete
        updatedTime: Date, // change from updateTime to updatedTime , the date we recieve is in milliseconds and all the dates are in 1970!!!
        updatedField: {
            fieldName: String, // in case fieldName is part of JiraItem please use the same name
            oldValue: String, // in case  fieldName is part of JiraItem please make sure that oldValue and newValue use the same format like in jiraItem,
                              // for example, now it is like jiraParentId TRIF-123 and oldValue is 123 and should be oldValue TRIF-123
            newValue: String
        }
    },
    taskItem: {
        user: UserSchema,
        isDone: Boolean,
        updatedTime: Date,
        createdTime: Date
    }
});

module.exports = TaskModel;

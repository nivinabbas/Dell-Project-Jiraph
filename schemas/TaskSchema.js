const mongoose = require('mongoose');
const UserSchema = require('./UserSchema')

const TaskModel = mongoose.model('TaskModel', {
    jiraItem: {
        jiraId: String,
        jiraName: String,
        jiraType: String,
        priority: String,
        status: String,
        specialFields: {
            jiraParentId: String,
            functionalTest: Boolean,
            qaRepresentative: String,
            fixVersion: String
        }
    },
    qcItem: {
        requirmentId: String,
        requirementType: String,
        status: String
    },
    diffItem: {
        type: { type: String },
        updatedTime: Date,
        updatedField: {
            fieldName: String,
            oldValue: String,
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

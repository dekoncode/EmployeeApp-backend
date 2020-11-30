const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Employee = new Schema({
    emp_firstname: {
        type: String
    },
    emp_secondname: {
        type: String
    },
    emp_login: {
        type: String
    },
    emp_workphone: {
        type: String
    },
    emp_personalphone: {
        type: String
    },
    emp_workemail: {
        type: String
    },
    emp_personalemail: {
        type: String
    },
    emp_location: {
        type: String
    },
    emp_company: {
        type: String
    },
    emp_role: {
        type: String
    },
    emp_hourrate: {
        type: String
    },
})

module.exports = mongoose.model('Employee', Employee);
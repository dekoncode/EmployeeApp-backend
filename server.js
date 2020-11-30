const PORT = 5000;
const mongoUrl = 'mongodb+srv://Den:1234@cluster0.5khe5.mongodb.net/employees?retryWrites=true&w=majority'

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const empRoutes = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');

let Employee = require('./employee.model');

app.use(cors());
app.use(bodyParser.json());

async function start() {
    try {
        await mongoose.connect(mongoUrl, 
            { useNewUrlParser: true, 
            useUnifiedTopology: true
            })
        console.log('Server is running up')
    } catch (e) {
        console.log('Server Erorr', e.message)
    }
}
start();
empRoutes.route('/add').post(function(req, res) {
    let employee = new Employee(req.body);
    employee.save()
        .then(employee => {
        res.status(200).json({'employee': 'employee added successfully'})
        })
        .catch(err => {
            res.status(400).send('adding new employee failed')
        })
})

empRoutes.route('/').get(function(req, res) {
    Employee.find(function(err, employees) {
        if(err) {
            console.log(err);
        } else {
            res.json(employees);
        }
    })
})

empRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Employee.findById(id, function(err, employee) {
        res.json(employee);
    })
})

empRoutes.route('/update/:id').post(function(req, res) {
    Employee.findById(req.params.id, function(err, employee) {
        if(!employee) {
            res.status(404).send('data is not found')
        } else {
          employee.emp_firstname = req.body.emp_firstname;
          employee.emp_secondname = req.body.emp_secondname;
          employee.emp_login = req.body.emp_login;
          employee.emp_workphone = req.body.emp_workphone;
          employee.emp_personalphone = req.body.emp_personalphone;
          employee.emp_workemail = req.body.emp_workemail;
          employee.emp_personalemail = req.body.emp_personalemail;
          employee.emp_location = req.body.emp_location;
          employee.emp_company = req.body.emp_company;
          employee.emp_role = req.body.emp_role;
          employee.emp_hourrate = req.body.emp_hourrate;

            employee.save().then(employee => {
                res.json('Employee updated')
            })
            .catch(err => {
                res.status(400).send('Update doest work')
            })
        }
    })
})

empRoutes.route('/delete/:id').delete(function(req, res)  {

    Employee.findByIdAndRemove(req.params.id)
      .then((result) => {
        res.json({
          msg: `It has been deleted.`
        });
      })
      .catch((err) => {
        res.status(404).json({ success: false, msg: 'Nothing to delete.' });
      });
  });

app.use(empRoutes);


app.listen(PORT, function() {
    console.log('Server is lisen on', PORT)
})
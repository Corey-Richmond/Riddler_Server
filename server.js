var express = require('express'),
    riddle = require('./routes/riddles'),
    user = require('./routes/users');
 
var app = express();
 
app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});
 
app.get('/riddles', riddle.findAll);
app.get('/riddles/:id', riddle.findById);
app.post('/riddles', riddle.addRiddle);
app.put('/riddles/:id', riddle.updateRiddle);
app.delete('/riddles/:id', riddle.deleteRiddle);

app.delete('/deleteall', riddle.deleteall);

app.get('/users', user.findAll);
app.get('/users/:username', user.findByUserName);
app.post('/users', user.addUser);
app.put('/users/:username', user.updateUser);
app.put('/users/points/:username', user.updateUserPoints);
app.put('/users/riddlescreated/:username', user.updateRiddlesCreated);
app.put('/users/riddlesstarted/:username', user.updateRiddlesStared);
app.delete('/users/:username', user.deleteUser);

app.listen(process.env.PORT || 5000);
console.log('Listening on port 5000...');

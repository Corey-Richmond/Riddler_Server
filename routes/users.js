var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('userdb', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'userdb' database");
        db.collection('users', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'users' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});
 
exports.findByUserName = function(req, res) {
    var username = req.params.username;
    console.log('retrieving user: ' + username);
    db.collection('users', function(err, collection) {
        collection.findOne({'username':username}, function(err, item) {
            res.send(item);
        });
    });
};
 
exports.findAll = function(req, res) {
    db.collection('users', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};
 
exports.addUser = function(req, res) {
    var user = req.body;
    console.log('Adding user: ' + JSON.stringify(user));
    db.collection('users', function(err, collection) {
        collection.insert(user, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}
 
exports.updateUser = function(req, res) {
    var username = req.params.username;
    var body = req.body;
    //var points = JSON.stringify(body);
    console.log('Updating user: ' + username);
   // console.log(JSON.stringify(user));
    db.collection('users', function(err, collection) {
        collection.update({'username': username},body, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating user: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(username);
            }
        });
    });
}

exports.updateUserPoints = function(req, res) {
    var username = req.params.username;
    var body = req.body;
    console.log('retrieving user: ' + username);
    db.collection('users', function(err, collection) {
        collection.findOne({'username':username}, function(err, item) {
		console.log(item.points);
		item.points += body.points;
		collection.update({'username': username},item, {safe:true}, function(err, result) {
            		if (err) {
                		console.log('Error updating user: ' + err);
                		res.send({'error':'An error has occurred'});
            		} else {
                		console.log('' + result + ' document(s) updated');
                		res.send(username);
            		}
        	});
    		

	});
    });
  	    
}
exports.updateRiddlesCreated = function(req, res) {
    var username = req.params.username;
    var body = req.body;
    console.log('retrieving user: ' + username);
    db.collection('users', function(err, collection) {
        collection.findOne({'username':username}, function(err, item) {
		if(item.riddlescreated == null){
			item.riddlescreated = [];
		}
		item.riddlescreated.push(body.riddlescreated);
		collection.update({'username': username},item, {safe:true}, function(err, result) {
            		if (err) {
                		console.log('Error updating user: ' + err);
                		res.send({'error':'An error has occurred'});
            		} else {
                		console.log('' + result + ' document(s) updated');
                		res.send(username);
            		}
        	});
    		

	});
    });
  	    
}
exports.updateRiddlesStared = function(req, res) {
    var username = req.params.username;
    var body = req.body;
    console.log('retrieving user: ' + username);
    db.collection('users', function(err, collection) {
        collection.findOne({'username':username}, function(err, item) {
		if(item.riddlesstarted == null){
			item.riddlesstarted= [];
		}
		for(var i = 0; i < item.riddlesstarted.length; ++i){
			if(item.riddlesstarted[i]._id == body.riddlesstarted._id)
				item.riddlesstared.remove(i);
		}
		item.riddlesstarted.push(body.riddlesstarted);
		collection.update({'username': username},item, {safe:true}, function(err, result) {
            		if (err) {
                		console.log('Error updating user: ' + err);
                		res.send({'error':'An error has occurred'});
            		} else {
                		console.log('' + result + ' document(s) updated');
                		res.send(username);
            		}
        	});
    		

	});
    });
  	    
}



exports.deleteUser = function(req, res) {
    var id = req.params.id;
    console.log('Deleting user: ' + id);
    db.collection('users', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}
 
/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
 

 
};

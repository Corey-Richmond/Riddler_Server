var mongo = require('mongodb');

var uri = process.env.MONGOLAB_URI || 'mongodb://localhost/heroku_app15661377';

var db = null;
mongo.MongoClient.connect(uri, function(err, adb){
	if(err){
		console.log("Error: unable to connect to database");
		return;
	}
	db = adb;
	console.log("Connected to database for riddles collection");
        db.collection('riddles', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'riddles' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });

});


	

var Server = mongo.Server,
    //Db = mongo.Db,
    BSON = mongo.BSONPure;
 
//var server = new Server('localhost', 27017, {auto_reconnect: true});
//db = new Db('riddledb', server);
 
//db.open(function(err, db) {
//    if(!err) {
//        console.log("Connected to 'riddledb' database");
//        db.collection('riddles', {strict:true}, function(err, collection) {
//            if (err) {
//                console.log("The 'riddles' collection doesn't exist. Creating it with sample data...");
 //               populateDB();
 //           }
 //       });
 //   }
///});
 
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving riddle: ' + id);
    db.collection('riddles', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};
 
exports.findAll = function(req, res) {
    db.collection('riddles', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};
 
exports.addRiddle = function(req, res) {
    var riddle = req.body;
    console.log('Adding riddle: ' + JSON.stringify(riddle));
    db.collection('riddles', function(err, collection) {
        collection.insert(riddle, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}
 
exports.updateRiddle = function(req, res) {
    var id = req.params.id;
    var riddle = req.body;
    console.log('Updating riddle: ' + id);
    console.log(JSON.stringify(riddle));
    db.collection('riddles', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, riddle, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating riddle: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(riddle);
            }
        });
    });
}
 
exports.deleteRiddle = function(req, res) {
    var id = req.params.id;
    console.log('Deleting riddle: ' + id);
    db.collection('riddles', function(err, collection) {
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



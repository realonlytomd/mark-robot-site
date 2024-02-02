var router = express.Router();
var db = require("../models");

//following is more from images upload to mongodb process - step 5
//set up multer for storing uploaded files  -- not being used currently, code in server.js
var multer = require("multer");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({ storage: storage });

var fs = require('fs');

// initialize image variables
var imgHold = [];
var imagesHold = [];

module.exports = function(router) {

    // the GET route (temp) for getting all the images from the db
    // do I have a problem here: is id the correct id?
    router.get("/getImages/:id" , (req, res) => {
        console.log("in /getImages/, req.params.id: ", req.params.id );
        db.Image.find({ _id: req.params.id})
        .exec((error, records) => { // db is the database schema model. 
            console.log("this is records from api route /getImages/: ", records);
            //for loop to create array of kitten images from records from db
            //study: I'm only getting one record, instead of all of them,
            // so this loop doesn't really need to be here,
            // it's only going through once, and client side has the .forEach
            // to go through the full array. Leaving it for now...
            for (i=0; i<records.length; i++) {
                imgHold[i] = Buffer.from(records[i].img.data, "base64");
                imagesHold.push(imgHold[i]);
            }
            console.log("inside /getImages/, records[0]._id: " + records[0]._id);
            const formattedImages = imagesHold.map(buffer => {
                return `<img data-id=` + records[0]._id + ` class="theImages" title="Click to Enlarge" src="data:image/jpeg;base64,${buffer.toString("base64")}"/>`
            }).join("");
            
            res.send(formattedImages)  //this should be going back to user.js
            //empty out arrays
            imgHold = [];
            imagesHold = [];
        })
    });

    //This route gets image Title and Desc document from an image collection
    router.get("/getImageTitleDesc/:id", function(req, res) {
        console.log("inside /getImageTitleDesc/, req.params.id: ", req.params.id);
        // need to find the correct image, and get the Title and Desc, 
        db.Image.find({ _id: req.params.id})
            .then(function(dbImage) {
                res.json(dbImage);
                console.log("from  route /getImageTitleDesc/:id, dbImage: ", dbImage);
            })
            .catch(function(err) {
            // However, if an error occurred, send it to the client
            res.json(err);
            });
    });

    // Route for getting a specific Robot by id, and then populate it with an Image
    router.get("/popRobot/:id", function(req, res) {
        // Using the id passed in the id parameter, and make a query that finds the matching one in the db
            db.Robot.findOne({ _id: req.params.id })
                // then populate the kitten schema associated with it
                .populate([
                    {
                        path: "image",
                        model: "Image"
                    }
                ])
                .then(function(dbRobot) {
                // If successful, find a User with the given id, send it back to the client
                console.log("api-routes.js, JUST POPULATE Robot, dbRobot: ", dbRobot);
                res.json(dbRobot);
                })
                .catch(function(err) {
                // but if an error occurred, send it to the client
                res.json(err);
                });
        });

        // need to find the correct robot, then fill in the data (title, desc.) and the new image array
    router.post("/createImage/:id", function(req, res) {
        console.log("BEFORE CREATE IMAGE - req.body: ", req.body);
        //insert creation of the kitten's metrics
        db.Image.create(req.body) // this does everything above the image
        .then(function(dbImage) {
            console.log("AFTER CREATE IMAGE - api-routes.js, dbImager: ", dbImage);
            // pushing the new image id into the robot's document image array
        return db.Robot.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { image: dbImage._id } }, 
            { new: true }
            );
        })
        .then(function(dbRobot) {
            // send back the correct robot with new data in the image arrays
            console.log("AFTER CORRECT ROBOT UPDATED - dbRobot: ", dbRobot);
            res.json(dbRobot);
        })
        .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
        });
    });

    //This is Step 8 from notes on uploading the images chosen by the user
    // 
    router.post("/createImage/:id", upload.single("ImageInput"), (req, res, next) => {
        console.log("from api-routes step 8, req.file.filename: ", req.file.filename);
        var obj = {
            title: req.body.title,
            desc: req.body.desc,
            img: {
                data: fs.readFileSync(path.join(__dirname + "/../uploads/" + req.file.filename)),
                contentType: "image/jpeg"
            }
        }
        db.Image.create(obj)
            .then(function(dbImage) {
                console.log("after .create Image - dbImage: ", dbImage);
                //pushing the new image into the document array
                return db.Robot.findOneAndUpdate(
                    { _id: req.params.id },
                    { $push: { image: dbImage._id } },
                    { new: true }
                );
            })
            .then(function(dbImage) {
                //send back the correct Image with the new data in the image array
                res.json(dbImage);

            })
            .catch(function(err) {
                //If an error occurred, send back
                res.json(err);
            });
    });

    // Route for getting all of the images from a particular robot from the db
    //This .get only gets the current robot - since don't have one user logged, will need
    // to be changed, I think
    router.get("/getCurrentRobot:id", function(req, res) {
        console.log("inside api-routes: /getCurrentRobot:id, req.params: ", req.params);
        // need to find the correct robot, THEN all their images, 
        db.Robot.find({ _id: req.params.id}) // This is to limit the find to just current user
            .then(function(dbCurrentRobot) {
                res.json(dbCurrentRobot);
                console.log("from  route /getCurrentRobot:id, dbCurrentRobot: ", dbCurrentRobot);
                console.log("dbCurrentRobot.kitten.length: ", dbCurrentRobot[0].image.length);
            })
            .catch(function(err) {
            // However, if an error occurred, send it to the client
            res.json(err);
            });
    });
    

    //This route gets one image document from robot collection
    router.get("/getAnImage/:id", function(req, res) {
        console.log("inside api-routes: req.params: ", req.params);
        // need to find the correct image, and retrieve it's data, 
        db.Image.find({ _id: req.params.id })
            .then(function(dbAnImage) {
                res.json(dbAnImage);
                // console.log("from route /getAnImage:id, dbAnImage: ", dbAnImage);
                //console.log("dbCurrentRobot.image.length", dbAnImage[0].image.length);
            })
            .catch(function(err) {
            // However, if an error occurred, send it to the client
            res.json(err);
            });
    });

};
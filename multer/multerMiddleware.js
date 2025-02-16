const multer = require("multer");
const { getRandomNumber } = require("../helpers/uniqueID");


var userAvatarMulter = multer.diskStorage({
  destination: function (req, file, cb) {
    //Checking File
   
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, 'public/img/avatar')
    } else {
      
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
    
    
  },
  filename: function (req, file, cb) {

    const randomNo = getRandomNumber(11);

    req.imageName = "/img/avatar/" + file.fieldname + '-' + randomNo + ".jpg";

    cb(null, file.fieldname + '-' + randomNo + ".jpg");

  }
});


//IDENTITY
var identityMulter = multer.diskStorage({
  destination: function (req, file, cb) {
    //Checking File
   
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, 'public/img/identity')
    } else {
      
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
    
    
  },
  filename: function (req, file, cb) {
   
    req.imageName = "/img/identity/" + file.fieldname + ".jpg";
    cb(null, file.fieldname +".jpg")
  }
});

//POST ATTACHMENT
var postAttachmentMulter = multer.diskStorage({
  destination: function (req, file, cb) {
    //Checking File
   
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, 'public/img/attachment')
    } else {
      
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
    
    
  },
  filename: function (req, file, cb) {
    const random = getRandomNumber(15);

    req.imageName = "/img/attachment/" + random + ".jpg";
    cb(null, random +".jpg")
  }
});


exports.userAvatarMulter = multer({ storage: userAvatarMulter })
exports.postAttachmentMulter = multer({ storage: postAttachmentMulter })

exports.identityMulter = multer({ storage: identityMulter })
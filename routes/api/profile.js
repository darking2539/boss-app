const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const User = require("../../models/User");  // Load User model
const formidable = require("formidable");
const path = require("path");
const fs = require("fs-extra");


// Upload Image
uploadImage = async (files, doc) => {
  if (files.image != null) {
    var fileExtention = files.image.name.split(".")[1];
    doc.image = `${doc.userid}.${fileExtention}`;
    var newpath =
      path.resolve(__dirname + "../../../uploaded/images/") + "/" + doc.image;
    if (fs.exists(newpath)) {
      await fs.remove(newpath);
    }
    await fs.moveSync(files.image.path, newpath);

    // Update database
    //User.findByIdAndUpdate( doc.userid, {image: doc.userid} ).exec();
    return newpath;
  }
};

// @route POST /api/profile/getprofile
// @desc profile getting
// @access Public
router.post("/getprofile", async (req,res) =>{
    try{  
      const userid = req.body.userid;
      User.findOne( {email: userid} )
        .exec(function(err, data) {
          if (err) {
            const result = {
              error: true,
              error_msg: err.message
            };
            return res.status(500).json(result);
          }
          return res.json(data);
        });
    }catch (err) {
        console.log(err);
        const result = {
          error: true,
          error_msg: err.message
        };
        return res.status(500).json(result);
      }
    })

// @route POST /api/profile/updateprofile
// @desc profile getting
// @access Public
router.put("/updateprofile", async (req,res)=>{
  try {
    const form = new formidable.IncomingForm();
    form.parse(req,async(err, fields,files)=>{
      const userid = fields.userid;
      const firstname = fields.firstname;
      const lastname = fields.lastname;
      const birthdate = fields.birthdate;
      console.log(fields)
      let result = await uploadImage(files, fields);
      User.findByIdAndUpdate( userid, {firstname: firstname, lastname: lastname, birthdate: birthdate, image: userid + ".jpg"} )
      .exec(function(err, data) {
        if (err) {
          const result = {
            error: true,
            error_msg: err.message
          };
          return res.status(500).json(result);
        }
        return res.json(data);
      });
    })
    
  } catch (err) {
    console.log(err);
        const result = {
          error: true,
          error_msg: err.message
        };
        return res.status(500).json(result);
  }
}) 


// @route PUT /api/profile/editeducation
// @desc Note getting
// @access Public
router.put("/editeducation", async (req,res) =>{
  try{  
    const education = req.body.education;
    const userid = req.body.userid;
    User.findByIdAndUpdate( userid, {education: education} )
      .exec(function(err, data) {
        if (err) {
          const result = {
            error: true,
            error_msg: err.message
          };
          return res.status(500).json(result);
        }
        return res.json(data);
      });
  }catch (err) {
      console.log(err);
      const result = {
        error: true,
        error_msg: err.message
      };
      return res.status(500).json(result);
    }
  })

// @route PUT /api/profile/editelocation
// @desc Note getting
// @access Public
router.put("/editlocation", async (req,res) =>{
  try{  
    const location = req.body.location;
    const userid = req.body.userid;
    User.findByIdAndUpdate( userid, {location: location} )
      .exec(function(err, data) {
        if (err) {
          const result = {
            error: true,
            error_msg: err.message
          };
          return res.status(500).json(result);
        }
        return res.json(data);
      });
  }catch (err) {
      console.log(err);
      const result = {
        error: true,
        error_msg: err.message
      };
      return res.status(500).json(result);
    }
  })

// @route PUT /api/profile/editskills
// @desc Note getting
// @access Public
router.put("/editskills", async (req,res) =>{
  try{  
    const skills = req.body.skills;
    const userid = req.body.userid;
    User.findByIdAndUpdate( userid, {skills: skills} )
      .exec(function(err, data) {
        if (err) {
          const result = {
            error: true,
            error_msg: err.message
          };
          return res.status(500).json(result);
        }
        return res.json(data);
      });
  }catch (err) {
      console.log(err);
      const result = {
        error: true,
        error_msg: err.message
      };
      return res.status(500).json(result);
    }
  })


// @route PUT /api/profile/editnotes
// @desc Note getting
// @access Public
router.put("/editnotes", async (req,res) =>{
  try{  
    const notes = req.body.notes;
    const userid = req.body.userid;
    User.findByIdAndUpdate( userid, {notes: notes} )
      .exec(function(err, data) {
        if (err) {
          const result = {
            error: true,
            error_msg: err.message
          };
          return res.status(500).json(result);
        }
        return res.json(data);
      });
  }catch (err) {
      console.log(err);
      const result = {
        error: true,
        error_msg: err.message
      };
      return res.status(500).json(result);
    }
  })

module.exports = router;


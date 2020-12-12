const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const Note = require("../../models/notes");  // Load User model


// @route POST /api/note/create
// @desc Note create
// @access Public
router.post("/create", async (req,res) =>{
    try{  
        const result = await new Note({      
            userid: req.body.userid,
            title: req.body.title,
            body:  req.body.body,
            created_date: Date.now()
        }).save()
        return res.send(result);
    }catch (err) {
        console.log(err);
        const result = {
          error: true,
          error_msg: err.message
        };
        return res.status(500).json(result);
      }
    })

// @route POST /api/note/getnote
// @desc Note getting
// @access Public
router.post("/getnote", async (req,res) =>{
    try{  
      const userid = req.body.userid;
      Note.find( {userid: userid} )
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

// @route POST /api/note/getnote/byid
// @desc Note getting
// @access Public
router.post("/getnote/byid", async (req,res) =>{
  try{  
    const noteid = req.body.noteid;
    Note.find( {_id: noteid} )
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

// @route POST /api/note/deletenote
// @desc Note getting
// @access Public
router.post("/deletenote", async (req,res) =>{
  try{  
    const noteid = req.body.noteid;
    Note.remove( {_id: noteid} )
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

// @route PUT /api/note/editnote
// @desc Note getting
// @access Public
router.put("/editnote", async (req,res) =>{
  try{  
    const noteid = req.body.noteid;
    const title = req.body.title;
    const body = req.body.body;
    Note.findByIdAndUpdate( noteid, {title: title, body: body, modify_date: Date.now()} )
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
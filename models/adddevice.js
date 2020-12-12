const mongoose = require("mongoose");
//const Sensor = mongoose.model("sensors");
const device = require("./devices");

exports.show = async (req, res, next) => {
  try {
    const userid = req.body.userid;
    device.find( {userid: userid} )
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
  } catch (err) {
    console.log(err);
    const result = {
      error: true,
      error_msg: err.message
    };
    return res.status(500).json(result);
  }
};


exports.store = async (req, res, next) => {
  try {

    const result = await new device({
      userid: req.body.userid,
      deveui: req.body.deveui,
      devaddr: req.body.devaddr,
      projectcode: req.body.projectcode,
      projectname: req.body.projectname,
      created_date: Date.now(),
      modify_date: Date.now()

    }).save();

    return res.send(result);
  } catch (err) {
    console.log(err);
    const result = {
      error: true,
      error_msg: err.message
    };
    return res.status(500).json(result);
  }
};

exports.find = async (req, res, next) => {
  try {
    const projectcode = req.body.projectcode;
    const userid = req.body.userid;
    device.find( { projectcode: { $regex: projectcode, $options: "i" } , userid: userid } )
    .sort({ Time: -1 })
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
  } catch (err) {
    console.log(err);
    const result = {
      error: true,
      error_msg: err.message
    };
    return res.status(500).json(result);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const id = req.body.id;
    device.remove( { _id: id  } )
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
  } catch (err) {
    console.log(err);
    const result = {
      error: true,
      error_msg: err.message
    };
    return res.status(500).json(result);
  }
};

exports.edit = async (req, res, next) => {
  try {
    const id = req.body.id;
    const deviceeui = req.body.deviceeui;
    const deviceaddr = req.body.deviceaddr;
    const projectcode = req.body.projectcode;
    const projectname = req.body.projectname;
    device.findByIdAndUpdate(id, {deveui: deviceeui ,devaddr: deviceaddr, projectcode: projectcode, projectname: projectname, modify_date: Date.now() }   )
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
  } catch (err) {
    console.log(err);
    const result = {
      error: true,
      error_msg: err.message
    };
    return res.status(500).json(result);
  }
};
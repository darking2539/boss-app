module.exports = app => {
    const route = require("./../../models/loraiotController");
    const device = require("../../models/adddevice");
  
    app.post("/api/iot/receiver", route.store);
    app.get("/api/iot-received", route.list);
    app.post("/api/iot-received/keyword", route.find);
    app.post("/api/show-device",device.show)
    app.post("/api/add-device", device.store)
    app.post("/api/show-device/keyword", device.find)
    app.post("/api/show-device/delete", device.delete) //delete is not with from axios
    app.put("/api/show-device/edit", device.edit)
 
  };
  
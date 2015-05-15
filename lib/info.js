var fs = require("fs")
var config = require("../config.json")

var info = function() {

    var serverlist = function (callback) {
        fs.readdir(config.server_directory, callback)
    }



    return {
        serverlist: serverlist
    }

}()


info.serverlist(function (err, data) {
    console.log(data)
})

module.exports = info

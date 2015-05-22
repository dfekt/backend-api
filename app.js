var express  = require("express")
var bodyParser = require("body-parser")
var srv      = require("./lib/serverManager.js")
var app      = express()

app.use( bodyParser.json() )        // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})) 

var router = express.Router()

var JSON_SUCCESS = {"status": "success"}

router.route('/servers')
    .get(function (req, res) {
        srv.serverlist(function (err, data) {
            if (err) {
                res.send(err)
            }
            res.json(data)
        })
    })

router.route('/servers/start')
    .get(function (req, res) {
        srv.serverlist(function(err, data) {
            if (err) {
                res.send(err)
            }
            console.log(data)
            srv.start(data)
            res.json(JSON_SUCCESS)
        })
    })

router.route('/servers/stop')
    .get(function (req, res) {
        srv.serverlist(function(err, data) {
            if (err) {
                res.send(err)
            }
            srv.stop(data)
            res.json(JSON_SUCCESS)
        })
    })

router.route('/servers/restart')
    .get(function (req, res) {
        srv.serverlist(function(err, data) {
            if (err) {
                res.send(err)
            }
            srv.restart(data)
            res.json(JSON_SUCCESS)
        })
    })

router.route('/servers/execute')
    .post(function (req, res) {

        var commands = req.body
        
        commands.forEach(function(command) {
            srv.serverlist(function(err, data) {
                if (err) {
                    res.send(err)
                }
                srv.execute_command(data, command)
            })
        })
        res.json(JSON_SUCCESS)
    })

router.route('/servers/console')
    .get(function (req, res) {
        srv.serverlist(function(err, data) {
            if (err) {
                res.send(err)
            }
            srv.consolelog(data, function(err, data){
                res.json(data)
            })
        })
    })

router.route('/servers/:server/execute')
    .post(function (req, res) {

        var commands = req.body
        
        commands.forEach(function(command) {
            srv.execute_command([req.params.server], command)
        })
        res.json(JSON_SUCCESS)
    })

router.route('/servers/:server/start')
    .get(function (req, res) {
        srv.start([req.params.server])
        res.json(JSON_SUCCESS)
    })

router.route('/servers/:server/stop')
    .get(function (req, res) {
        srv.stop([req.params.server])
        res.json(JSON_SUCCESS)
    })

router.route('/servers/:server/restart')
    .get(function (req, res) {
        srv.restart([req.params.server])
        res.json(JSON_SUCCESS)
    })

router.route('/servers/:server/console')
    .get(function (req, res) {
        srv.consolelog([req.params.server], function(err, data){
            res.json(data[req.params.server])
        })
    })

app.use('/api/v1', router)

app.listen(13000)

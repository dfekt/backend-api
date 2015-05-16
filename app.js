var express  = require("express")
var srv      = require("./lib/serverManager.js")
var app      = express()

var router = express.Router()

router.route('/servers')
    .get(function (req, res) {
        srv.serverlist(function (err, data) {
            if (err) {
                res.send(err)
            }
            res.json(data)
        })
    })

router.route('/servers/:server')
    .get(function () {
        
    })

app.use('/api/v1', router)

app.listen(8081)
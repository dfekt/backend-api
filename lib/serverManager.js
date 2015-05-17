var exec = require("child_process").exec
var util = require("util")
var fs = require("fs")
var config = require("../config.json")

var serverManager = function() {
    var tmux_enter = "C-m"
    var child;

    var server_locations = config.game_server_directory + "/" + config.server_type + "/" + config.server_locations + "/"

    var run = function(command) {
        child = exec(command, function(error, stdout, stderr) {
            if (stderr) {
                console.log('' + stderr);
            }
            if (stdout) {
                console.log(stdout)
            }
            if (error) {
                console.log(error)
            }
        })
    }

    var start = function (servers) {
        run(util.format("tmux new-session -s %s -d", config.server_type))
        servers.forEach(function (server) {
            var command = util.format("tmux new-window -a -n %s -t %s -P \"cd %s; ./%s\"",
                server,
                config.server_type,
                server_locations + server,
                config.server_start_file
            )
            console.log(command)
            run(command)
        })
    }

    var stop = function (servers) {
        run(util.format("tmux new-session -s %s -d", config.server_type))
        servers.forEach(function (server) {
            var command = util.format("tmux kill-window -t %s:%s",
                config.server_type,
                server
            )
            run(command)
        })
    }

    var restart = function (servers) {
        stop(servers)
        start(servers)
    }

    var execute_command = function (servers, server_command) {
        servers.forEach(function(server) {
            var command = util.format("tmux send-keys -t %s:%s.0 \"%s\" %s",
                config.server_type,
                server,
                server_command,
                tmux_enter
            )
            run(command)
        })
    }

    var serverlist = function (callback) {
        fs.readdir(server_locations, callback)
    }


    return {
        start: start,
        stop: stop,
        restart: restart,
        execute_command: execute_command,
        serverlist: serverlist
    }
}()

module.exports = serverManager

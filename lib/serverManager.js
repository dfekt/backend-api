var exec = require("child_process").exec
var config = require("../config.json")

var serverManager = function() {
    var tmux_enter = "C-m"
    var child;

    var run = function(command) {
        child = exec(command, function(error, stdout, stderr) {
            if (stderr !== null) {
                console.log('' + stderr);
            }
            if (stdout !== null) {
                console.log(stdout)
            }
            if (error !== null) {
                console.log(error)
            }
        })
    }

    var start = function (servers) {
        run(util.format("tmux new-session -s %s -d", config.server_type))
        servers.forEach(function (server) {
            run(util.format("tmux new-window -a -n %s -t %s -P \"cd %s; ./%s\"",
                server,
                config.server_type,
                config.server_directory + "/" + server,
                config.server_start_file
            ))
        })
    }

    var stop = function (servers) {
        run(util.format("tmux new-session -s %s -d", config.server_type))
        servers.forEach(function (server) {
            run(util.format("tmux kill-window -t %s:%s",
                config.server_type,
                server
            ))
        })
    }

    var execute_command_on_server = function (server, command) {
        run(util.format("tmux send-keys -t %s:%s.0 %s %s",
            config.server_type,
            server,
            command,
            tmux_enter
        ))
    }


    return {
        start: start,
        stop: stop,
        execute_command_on_server: execute_command_on_server
    }
}()

module.exports(serverManager)

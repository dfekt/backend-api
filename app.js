var exec = require('child_process').exec


var child = exec("tmux list-sess", 
    function(error, stdout, stderr) {
        if (error) {
            console.error(error)
        }

        if (stdout) {
            console.log(stdout)
        }

        if (stderr) {
            console.log(stderr)
        }
    }
)

console.log(Type(child))

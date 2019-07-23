var ws = require("nodejs-websocket");
var count = 0;
// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
	console.log("New connection");
	count++;
	conn.name = "user "+ count;
	broadcast(conn.name + ' is coming!');
	conn.on("text", function (str) {
		broadcast(str);
	})
	conn.on("close", function (code, reason) {
		console.log("Connection closed")
    })
    conn.on('error',function(error){
        console.log(error);
    })
}).listen(3000);

function broadcast(str){
	server.connections.forEach(function(conn){
		conn.sendText(str)
	})
}
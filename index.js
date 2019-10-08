var fs=require("fs");
var config=JSON.parse(fs.readFileSync("config.json"));
var host=config.host;
var port=config.port;
var exp=require("express");
var app=exp(); 
var modelo=require("./servidor/modelo.js");

var juego=new modelo.Juego();

app.use(exp.static(__dirname + "/cliente"));

// app.get("/",function(request,response){
// 	response.send("hola");
// });

app.get("/agregarUsuario/:nick",function(request,response){
	var nick=request.params.nick;
	juego.agregarUsuario(nick,function(usr){
		response.send(usr);
	});
});

app.get("/crearPartida/:nombrePartida/:nick",function(request,response){
	var nick=request.params.nick;
	var nombrePartida=request.params.nombrePartida;
	juego.crearPartida(nombrePartida,nick,function(partida){
		response.send(partida);
	});
});

console.log("Servidor escuchando en "+host+":"+port);
app.listen(port,host);
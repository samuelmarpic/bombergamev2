function ServidorWS(){
    this.enviarRemitente=function(socket,mens,datos){
        socket.emit(mens,datos);
    }
    this.enviarATodos=function(io,nombre,mens,datos){
        io.sockets.in(nombre).emit(mens,datos);
    }
    this.enviarATodosMenosRemitente=function(socket,nombre,mens,datos){
        socket.broadcast.to(nombre).emit(mens,datos)
    };
    this.lanzarSocketSrv=function(io,juego){
        var cli=this;
        io.on('connection', function(socket){
            socket.on('crearPartida', function(nick,nombrePartida){
	            juego.crearPartida(nombrePartida,nick,function(partida){
                cli.enviarRemitente(socket,"partidaCreada",partida);
                socket.join(partida.idp);
	        });
            });
            console.log("Nueva Conexión");
            socket.on('unirAPartida', function(nick,nombrePartida){
                juego.unirAPartida(nombrePartida,nick, function(partida){
                    socket.join(nombrePartida);
                    cli.enviarRemitente(socket,"unidoAPartida",partida);
                    cli.enviarATodosMenosRemitente(socket,nombrePartida,"nuevoJugador",partida.jugadores);
                });
            });
    		socket.on("salir",function(idp,nick){
    			var partida=juego.salir(idp,nick);                
    			cli.enviarRemitente(socket,"saliste");
                if (partida!=undefined){
        			cli.enviarATodosMenosRemitente(socket,idp,"saleJugador",partida.jugadores);
                }
            });
            socket.on("preparado", function(idp,nick){
                var partida=juego.partidas[idp];
                juego.prepararJugador(idp,nick);
                cli.enviarRemitente(socket,"estasPreparado", partida);
            })
        });
    }
}
module.exports.ServidorWS=ServidorWS;
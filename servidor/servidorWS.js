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
    	io.on('connection',function(socket){
    		console.log("Nueva conexión");
    		socket.on('crearPartida', function(nick,nombrePartida){
    			juego.crearPartida(nombrePartida,nick,function(partida){
					cli.enviarRemitente(socket,"partidaCreada",partida);
					socket.join(partida.idp);
				});
    		});
    		socket.on('obtenerPartidas',function(){
    			juego.obtenerPartidasInicial(function(partidas){
					cli.enviarRemitente(socket,"partidas",partidas);
				});
    		});
    		socket.on("unirAPartida",function(idp,nick){
    			var partida=juego.unirAPartida(idp,nick);
    			socket.join(idp);
    			cli.enviarRemitente(socket,"unido",partida);
    			cli.enviarATodosMenosRemitente(socket,idp,"nuevoJugador",partida.jugadores);
    		});
    		socket.on("salir",function(idp,nick){
    			var partida=juego.salir(idp,nick);                
    			cli.enviarRemitente(socket,"saliste");
                if (partida!=undefined){
        			cli.enviarATodosMenosRemitente(socket,idp,"saleJugador",partida.jugadores);
                }
    		});
            socket.on("preparado",function(idp,nick){
                juego.jugadorPreparado(idp,nick,function(partida){
					cli.enviarATodos(io,idp,"otropreparado",partida.jugadores);  
					if(partida.fase.nombre=="jugando"){
						cli.enviarATodos(io,idp,"aJugar",{});
					}                  
                });                
			});
			
    	});
    }
}

module.exports.ServidorWS=ServidorWS;
function ClienteWS(nick){
    this.socket=undefined;
    this.nick=nick;
    this.idp=undefined;
    this.ini=function(){
        this.socket=io.connect();
        this.lanzarSocketSrv();
    }
    this.crearPartida=function(nombrePartida){
        //this.nombrePartida=nombre;
        this.socket.emit('crearPartida', this.nick,nombrePartida);
            console.log("usuario "+this.nick+" crea partida "+nombrePartida);
    }
    this.unirAPartida=function(nombrePartida){
        this.socket.emit('unirAPartida', this.nick,nombrePartida);
        console.log("usuario "+this.nick+ " unido a partida "+ nombrePartida)
    }
    this.lanzarSocketSrv=function(){
        var cli=this;
        this.socket.on('connect', function(){                           
               console.log("Usuario conectado al servidor de WebSockets");
        });
        this.socket.on('partidaCreada', function(partida){
            console.log('partida creada: ',partida)
            cli.idp=partida.idp;
            mostrarPartida(partida);
            mostrarListaJugadores(partida.jugadores);
        });
        this.socket.on('unidoAPartida', function(partida){
            console.log('se ha unido a la partida', partida)
            mostrarPartida(partida);
            mostrarListaJugadores(partida.jugadores);
        });
        this.socket.on('nuevoJugador')
    }

}

function Juego(){
	this.partidas=[];
	this.usuarios=[];

	this.crearPartida=function(nombre,nick){
		var idp=nombre+nick;
		if (this.partidas[idp]==null){
			this.partidas[idp]=new Partida(nombre,idp);
		}

	}
	this.agregarUsuario=function(nombre){
		if (this.usuarios[nombre]==null){
			this.usuarios[nombre]=new Usuario(nombre);
		}
	}
}

function Partida(nombre,idp){
	this.nombre=nombre;
	this.idp=idp;
	this.jugadores=[];
}

function Usuario(nick){
	this.nick=nick;
	this.id=undefined;
}
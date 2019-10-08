function ClienteRest(){

	this.agregarUsuario=function(nick){
		$.getJSON("/agregarUsuario/"+nick,function(data){    
    		console.log(data);
    		//mostrarUsuario(data);
		});
	}
	this.crearPartida=function(nombrePartida,nick){
		$.getJSON("/crearPartida/"+nombrePartida+"/"+nick,function(data){    
    		console.log(data);
    		//mostrarUsuario(data);
		});
	}
}
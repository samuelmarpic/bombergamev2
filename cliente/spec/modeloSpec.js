describe("Bombergame", function() {
  var juego;

  beforeEach(function() {
    juego=new Juego();
  });

  it("comprobaciones iniciales", function() {
    expect(juego.usuarios.length).toEqual(0);
    expect(juego.partidas.length).toEqual(0);
  });

  it("comprobar agregar usuario",function(){
    juego.agregarUsuario('pepe');
    expect(Object.keys(juego.usuarios).length).toEqual(1);
    expect(juego.usuarios["pepe"]).not.toBe(undefined);
    expect(juego.usuarios["pepe"].nick).toBe("pepe");
  });

  it("comprobar usuario pepe crea partida una",function(){
    juego.agregarUsuario("pepe");
    juego.crearPartida("una","pepe");
    expect(Object.keys(juego.partidas).length).toEqual(1);
    expect(juego.partidas["unapepe"]).not.toBe(undefined);
    expect(juego.partidas["unapepe"].jugadores["pepe"]).not.toBe(undefined);
    expect(juego.partidas["unapepe"].idp).toBe("unapepe");
  });

  it("comprobar usuario ana se une a partida unapepe",function(){
    juego.agregarUsuario("pepe");
    juego.crearPartida("una","pepe");
    juego.agregarUsuario("ana");
    expect(Object.keys(juego.usuarios).length).toEqual(2);
    juego.unirAPartida("unapepe","ana");
    expect(Object.keys(juego.partidas).length).toEqual(1);
    expect(Object.keys(juego.partidas["unapepe"].jugadores).length).toEqual(2);
    expect(juego.partidas["unapepe"].jugadores["ana"]).not.toBe(undefined);
  })

});

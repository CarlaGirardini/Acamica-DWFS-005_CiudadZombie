/* El objeto jugador es un objeto literal que se encuentra incompleto.
 Solo tiene asignadas algunas de sus propiedades y ningún método */
var Jugador = {
  /* el sprite contiene la ruta de la imagen */
  sprite: 'imagenes/jugador_frente.png',
  x: 130,
  y: 160,
  ancho: 20,
  alto: 40,
  velocidad: 10,
  vidas: 5,
  // Hay que agregar lo que falte al jugador: movimientos, pérdida de vidas, y todo lo que haga falta para que cumpla con sus responsabilidades
  // Acá empieza lo que hice yo:
  perderVidas: function(cant){
    this.vidas -= cant;
  }
  // Acá termina lo que hice yo
}

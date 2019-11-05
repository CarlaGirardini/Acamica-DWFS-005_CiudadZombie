/* Un objeto que representa a los obstaculos. Recibe un sprite que tendra la imagen que lo representa y una potencia indicando cuánto daño hace al chocar al jugador, además de los parámetros comunes x, y, ancho y alto */
var Obstaculo = function (sprite, x, y, ancho, alto, potencia, nombre) {
  this.sprite = sprite;
  this.x = x;
  this.y = y;
  this.ancho = ancho;
  this.alto = alto;
  this.potencia = potencia;
  // Implementar el método chocar(jugador) para que al chocar con un obstáculo el jugador pierda vidas
  // Acá empieza lo que hice yo
  this.nombre = nombre;
}

Obstaculo.prototype.chocar = function(){
  Jugador.perderVidas(this.potencia);
  this.potencia = 0;
  if(this.nombre === 'vidas'){
    Jugador.vidas = 5;
    this.x = -10;
    this.y = -10;
  }
}
// Acá termina lo que hice yo
/* Para insipirarte para la implementacion del ZombieConductor podes usar
al ZombieCaminante de ejemplo. Tene en cuenta que tendra algunas diferencias.
Por ejemplo, la cantidad parametros que recibe su constructor. En ZombieConductor
no son exactamente los mismos parametros que en el objeto Enemigo, a diferencia
del ZombieCaminante que eran los mismos. */

var ZombieConductor = function(sprite, x, y, ancho, alto, velocidad, rangoMov,direccion) {
  /* Completar constructor a partir de Enemigo */
  /* No olvidar agregar la/s propiedad/es unicas de ZombieConductor necesarias */

  // Acá empieza lo que hice yo
  Enemigo.call(this, sprite, x, y, ancho, alto, velocidad, rangoMov);

  this.mover = function() {
    switch(direccion){
      case 'h':
        this.x += this.velocidad;
        break;
      case 'v':
        this.y += this.velocidad;
        break;
      default:
        console.log('El parámetro "dirección" del objeto "ZombieConductor" no es válido', );
    }

    let validarEnX = (this.x < this.rangoMov.desdeX) || (this.x > this.rangoMov.hastaX);
    let validarEnY = (this.y < this.rangoMov.desdeY) || (this.y > this.rangoMov.hastaY);
    if (validarEnX || validarEnY){
      this.velocidad *= -1;
    }
  }
  this.atacar = ()=>{Jugador.vidas = 0;}
}

ZombieConductor.prototype = Object.create(Enemigo.prototype);
ZombieConductor.prototype.constructor = ZombieConductor;
// Acá termina lo que hice yo
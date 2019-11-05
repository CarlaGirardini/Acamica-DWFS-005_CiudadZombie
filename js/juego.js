/* El objeto Juego sera el encargado del control de todo el resto de los Objetos
existentes.
Le dara ordenes al Dibujante para que dibuje entidades en la pantalla. Cargara
el mapa, chequeara colisiones entre los objetos y actualizara sus movimientos
y ataques. Gran parte de su implementacion esta hecha, pero hay espacios con el
texto COMPLETAR que deben completarse segun lo indique la consigna.

El objeto Juego contiene mucho codigo. Tomate tu tiempo para leerlo tranquilo
y entender que es lo que hace en cada una de sus partes. */
var llegada = [];
var Juego = {
  // Aca se configura el tamaño del canvas del juego
  anchoCanvas: 961,
  altoCanvas: 577,
  jugador: Jugador,
  vidasInicial: Jugador.vidas,
  // Indica si el jugador ganó
  ganador: false,

  obstaculosCarretera: [
    /*Aca se van a agregar los obstáculos visibles. Tenemos una valla horizontal
    de ejemplo, pero podrás agregar muchos más. */
    valla1 = new Obstaculo('imagenes/valla_horizontal.png', 70, 430, 30, 30, 1),
    // Acá empieza lo que hice yo
    new Obstaculo('imagenes/valla_horizontal.png', 100, 400, 30, 30, 1, 'valla'),
    new Obstaculo('imagenes/valla_vertical.png', 220, 390, 30, 30, 1, 'valla'),
    new Obstaculo('imagenes/bache.png', 300, 480, 30, 30, 1, 'bache'),
    new Obstaculo('imagenes/auto_verde_abajo.png', 500, 430, 15, 30, 1, 'auto'),
    new Obstaculo('imagenes/auto_verde_abajo.png', 800, 70, 15, 30, 1, 'auto'),
    new Obstaculo('imagenes/auto_verde_derecha.png', 760, 430, 30, 15, 1, 'auto'),
    new Obstaculo('imagenes/auto_verde_derecha.png', 555, 203, 30, 15, 1, 'auto'),
    new Obstaculo('imagenes/bache.png', 850, 110, 30, 30, 1, 'bache'),
    new Obstaculo('imagenes/valla_vertical.png', 850, 300, 30, 30, 1, 'valla'),
    new Obstaculo('imagenes/corazon.png', 700, 100, 15, 15, 0, 'vidas'),
    new Obstaculo('imagenes/corazon.png', 200, 450, 15, 15, 0, 'vidas')
    // Acá termina lo que hice yo
  ],
  /* Estos son los bordes con los que se puede chocar, por ejemplo, la vereda.
   Ya estan ubicados en sus lugares correspondientes. Ya aparecen en el mapa, ya
   que son invisibles. No tenes que preocuparte por ellos.*/
  bordes: [
    // Bordes
    new Obstaculo('', 0, 5, 961, 18, 0, 'borde'),
    new Obstaculo('', 0, 559, 961, 18, 0, 'borde'),
    new Obstaculo('', 0, 5, 18, 572, 0, 'borde'),
    new Obstaculo('', 943, 5, 18, 572, 0, 'borde'),
    // Veredas
    new Obstaculo('', 18, 23, 51, 536, 2, 'vereda'),
    new Obstaculo('', 69, 507, 690, 52, 2, 'vereda'),
    new Obstaculo('', 587, 147, 173, 360, 2, 'vereda'),
    new Obstaculo('', 346, 147, 241, 52, 2, 'vereda'),
    new Obstaculo('', 196, 267, 263, 112, 2, 'vereda'),
    new Obstaculo('', 196, 23, 83, 244, 2, 'vereda'),
    new Obstaculo('', 279, 23, 664, 56, 2, 'vereda'),
    new Obstaculo('', 887, 79, 56, 480, 2, 'vereda')
  ],
  // Los enemigos se agregarán en este arreglo.
  enemigos: [
    // Acá empieza lo que hice yo
    new ZombieCaminante('imagenes/zombie.png',960,0,15,30,1,{desdeX: 10, hastaX: 961, desdeY: 10, hastaY: 577}),
    new ZombieCaminante('imagenes/zombie.png',960,577,15,30,1,{desdeX: 10, hastaX: 961, desdeY: 10, hastaY: 577}),
    new ZombieCaminante('imagenes/zombie.png',500,0,15,30,1,{desdeX: 10, hastaX: 961, desdeY: 10, hastaY: 577}),
    new ZombieCaminante('imagenes/zombie.png',0,0,15,30,1,{desdeX: 10, hastaX: 961, desdeY: 10, hastaY: 577}),
    new ZombieCaminante('imagenes/zombie.png',100,100,15,30,1,{desdeX: 10, hastaX: 961, desdeY: 10, hastaY: 577}),

    new ZombieConductor('imagenes/tren_horizontal.png',400,325,90,30,5,{desdeX: 0, hastaX: 961, desdeY: 0, hastaY: 577},'h'),
    new ZombieConductor('imagenes/tren_vertical.png',643,0,30,90,5,{desdeX: 0, hastaX: 961, desdeY: 0, hastaY: 577},'v'),
    new ZombieConductor('imagenes/tren_vertical.png',674,0,30,90,5,{desdeX: 0, hastaX: 961, desdeY: 0, hastaY: 577},'v')
    // Acá termina lo que hice yo
  ]

};

/* Se cargan los recursos de las imágenes, para tener un fácil acceso a ellos. No hace falta comprender esta parte. Pero si querés agregar tus propias imágenes tendrás que poner su ruta en la lista para que pueda ser precargada como todas las demás. */
Juego.iniciarRecursos = function() {
  Resources.load([
    'imagenes/mapa.png',
    'imagenes/mensaje_gameover.png',
    'imagenes/Splash.png',
    'imagenes/bache.png',
    'imagenes/tren_horizontal.png',
    'imagenes/tren_vertical.png',
    'imagenes/valla_horizontal.png',
    'imagenes/valla_vertical.png',
    'imagenes/zombie.png',
    'imagenes/auto_verde_abajo.png',
    'imagenes/auto_verde_derecha.png',
    'imagenes/jugador_frente.png',
    'imagenes/jugador_izquierda.png',
    'imagenes/jugador_derecha.png',
    'imagenes/jugador_atras.png',
    'imagenes/corazon.png'
  ]);
  Resources.onReady(this.comenzar.bind(Juego));
};

// Agrega los bordes de las veredas a los obstáculos de la carretera
Juego.obstaculos = function() {
  return this.obstaculosCarretera.concat(this.bordes);
};

Juego.comenzar = function() {
  // Inicializar el canvas del juego
  Dibujante.inicializarCanvas(this.anchoCanvas, this.altoCanvas);
  /* El bucle principal del juego se llamará continuamente para actualizar los movimientos y el pintado de la pantalla.
  Será el encargado de calcular los ataques, colisiones, etc */
  this.buclePrincipal();
  };
  Juego.buclePrincipal = function() {
    
    // Con update se actualiza la lógica del juego, tanto ataques como movimientos
    this.update();
    // Función que dibuja por cada fotograma a los objetos en pantalla.
    this.dibujar();
    // Esto es una forma de llamar a la funcion Juego.buclePrincipal() repetidas veces

  window.requestAnimationFrame(this.buclePrincipal.bind(this));
};

Juego.update = function() {
  this.calcularAtaques();
  this.moverEnemigos();
};
// Captura las teclas y, si coincide con alguna de las flechas, tiene que hacer que el jugador principal se mueva
Juego.capturarMovimiento = function(tecla) {
  var movX = 0;
  var movY = 0;
  var velocidad = this.jugador.velocidad;

  // El movimiento está determinado por la velocidad del jugador

  // Acá agregué las tres líneas en cada if que son para cambiar la imagen
  if (tecla == 'izq') {
    movX = -velocidad;
    this.jugador.sprite = 'imagenes/jugador_izquierda.png';
    this.jugador.alto = 40;
    this.jugador.ancho = 20;
  }
  if (tecla == 'arriba') {
    movY = -velocidad;
    this.jugador.sprite = 'imagenes/jugador_atras.png';
    this.jugador.alto = 40;
    this.jugador.ancho = 20;
  }
  if (tecla == 'der') {
    movX = velocidad;
    this.jugador.sprite = 'imagenes/jugador_derecha.png';
    this.jugador.alto = 40;
    this.jugador.ancho = 20;
  }
  if (tecla == 'abajo') {
    movY = velocidad;
    this.jugador.sprite = 'imagenes/jugador_frente.png';
    this.jugador.alto = 40;
    this.jugador.ancho = 20;
  }

  // Si se puede mover hacia esa posición, hay que hacer efectivo este movimiento
  if (this.chequearColisiones(movX + this.jugador.x, movY + this.jugador.y)) {
    /* Acá tiene que estar la logica para mover al jugador invocando alguno de sus métodos. */
    // Acá empieza lo que hice yo:
    this.jugador.x += movX;
    this.jugador.y += movY;
    // Acá termina lo que hice yo
  }
};

Juego.dibujar = function() {
  // Borrar el fotograma actual
  Dibujante.borrarAreaDeJuego();
  //Se pinta la imagen de fondo segun el estado del juego
  this.dibujarFondo();
  
  /* Aca hay que agregar la lógica para poder dibujar al jugador principal utilizando al dibujante y los métodos que nos brinda.
  "Dibujante dibuja al jugador" */
  
  // Acá empieza lo que hice yo
  Dibujante.dibujarEntidad(Jugador);
  // Acá termina lo que hice yo
  
  // Se recorren los obstaculos de la carretera pintandolos
  this.obstaculosCarretera.forEach(function(obstaculo) {
    Dibujante.dibujarEntidad(obstaculo);
  });
  
  // Se recorren los enemigos pintandolos
  this.enemigos.forEach(function(enemigo) {
    // Acá empieza lo que hice yo
    Dibujante.dibujarEntidad(enemigo);
    // Acá termina lo que hice yo
  });
  
  // El dibujante dibuja las vidas del jugador
  var tamanio = this.anchoCanvas / this.vidasInicial;
  Dibujante.dibujarRectangulo('white', 0, 0, this.anchoCanvas, 8);
  for (var i = 0; i < this.jugador.vidas; i++) {
    var x = tamanio * i;
    Dibujante.dibujarRectangulo('red', x, 0, tamanio, 8);
  };

};

/* Recorre los enemigos haciendo que se muevan. De la misma forma que hicimos un recorrido por los enemigos para dibujarlos en pantalla ahora habrá que hacer una funcionalidad similar pero para que se muevan.*/
Juego.moverEnemigos = function() {

  // Acá empieza lo que hice yo
  this.enemigos.forEach((enemigo)=>{ enemigo.mover() })
  // Acá termina lo que hice yo
  
};

/* Recorre los enemigos para ver cuál está colisionando con el jugador. Si colisiona, empieza el ataque el zombie, sino deja de atacar.
Para chequear las colisiones, estudiar el método posicionValida. Allí se ven las colisiones con los obstáculos. En este caso será con los zombies. */
Juego.calcularAtaques = function() {
  this.enemigos.forEach(function(enemigo) {
    if (this.intersecan(enemigo, this.jugador, this.jugador.x, this.jugador.y)) {
      /* Si el enemigo colisiona debe empezar su ataque*/
      // Acá empieza lo que hice yo
      enemigo.comenzarAtaque(this.jugador);
      // Acá termina lo que hice yo
    } else {
      /* Sino, debe dejar de atacar */
      // Acá empieza lo que hice yo
      enemigo.dejarDeAtacar();
      // Acá termina lo que hice yo
    }
  }, this);
};

/* Acá se chequea si el jugador se puede mover a la posición destino. Es decir, que no haya obstáculos que se interpongan. De ser asi, no podrá moverse */
Juego.chequearColisiones = function(x, y) {
  var puedeMoverse = true
  this.obstaculos().forEach(function(obstaculo) {
    if (this.intersecan(obstaculo, this.jugador, x, y)) {

      /*COMPLETAR, obstaculo debe chocar al jugador*/
      // Acá empieza lo que hice yo:
      obstaculo.chocar();
      // Acá termina lo que hice yo

      puedeMoverse = false
    }
  }, this)
  return puedeMoverse
};

/* Este método chequea si los elementos 1 y 2 si cruzan en x e y
x e y representan la coordenada a la cual se quiere mover el elemento2 */
Juego.intersecan = function(elemento1, elemento2, x, y) {
  var izquierda1 = elemento1.x
  var derecha1 = izquierda1 + elemento1.ancho
  var techo1 = elemento1.y
  var piso1 = techo1 + elemento1.alto
  var izquierda2 = x
  var derecha2 = izquierda2 + elemento2.ancho
  var techo2 = y
  var piso2 = y + elemento2.alto

  return ((piso1 >= techo2) && (techo1 <= piso2) &&
    (derecha1 >= izquierda2) && (izquierda1 <= derecha2))
};

Juego.dibujarFondo = function() {
  // Si se terminó el juego hay que mostrar el mensaje de game over de fondo
  if (this.terminoJuego()) {
    Dibujante.borrarAreaDeJuego();
    Dibujante.dibujarImagen('imagenes/mensaje_gameover.png', 0, 5, this.anchoCanvas, this.altoCanvas);
    document.getElementById('reiniciar').style.visibility = 'visible';
    // Acá empieza lo que hice yo
    llegada.forEach((elem)=>{console.log('elem', elem);});
    Juego.obstaculosCarretera.forEach((elemento)=>{
      elemento.x = -100;
      elemento.y = -100;
    });
    Juego.enemigos.forEach((elemento)=>{
      elemento.x = -100;
      elemento.y = -100;
    });
    Jugador.x = -50;
    // Acá termina lo que hice yo
  }
  
  // Si se ganó el juego hay que mostrar el mensaje de ganoJuego de fondo
  else if (this.ganoJuego()) {
    Dibujante.dibujarImagen('imagenes/Splash.png', 190, 113, 500, 203);
    // Acá empieza lo que hice yo
    Juego.obstaculosCarretera.forEach((elemento)=>{
      elemento.x = -100;
      elemento.y = -100;
    });
    Juego.enemigos.forEach((elemento)=>{
      elemento.x = -100;
      elemento.y = -100;
    });
    Jugador.x = -50;
    // Acá termina lo que hice yo
    document.getElementById('reiniciar').style.visibility = 'visible';
  } else {
    Dibujante.dibujarImagen('imagenes/mapa.png', 0, 5, this.anchoCanvas, this.altoCanvas);
    // Acá dibujé el rectángulo que marca la llegada. Lo hice acá para que desaparezca al ganar o perder el juego
    Dibujante.dibujarRectangulo('brown',760,510,126,30);
  }
};

Juego.terminoJuego = function() {
  return this.jugador.vidas <= 0;
};

/* Se gana el juego si se sobre pasa cierto altura y */
Juego.ganoJuego = function() {
  return (this.jugador.y + this.jugador.alto) > 530;
};

Juego.iniciarRecursos();

// Activa las lecturas del teclado al presionar teclas
// Documentacion: https://developer.mozilla.org/es/docs/Web/API/EventTarget/addEventListener
document.addEventListener('keydown', function(e) {
  var allowedKeys = {
    37: 'izq',
    38: 'arriba',
    39: 'der',
    40: 'abajo'
  };

  Juego.capturarMovimiento(allowedKeys[e.keyCode]);
});
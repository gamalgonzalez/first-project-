
const miModulo = (() =>  {
    'use strict';

let deck = [];
const tipos = ['D', 'H', 'S', 'C'],
      especiales = ['A', 'J', 'Q', 'K'];
let puntosJugadores = [];

const divCartasJugadores = document.querySelectorAll('.divCartas'),
      puntosSmall = document.querySelectorAll('small');
//referencias HTML
const btnDetener = document.querySelector('#btndetener'),
      btnNuevo = document.querySelector('#btnNuevo'),
      btnPedir = document.querySelector('#btnPerdir');


//esta funcion inicia el juego
const inicializarJuego = ( numJugadores = 2) => {
    deck = crearDeck();
    puntosJugadores=[];
    for (let i = 0; i < numJugadores; i++){
        puntosJugadores.push(0)
    }
    puntosSmall.forEach(elem => elem.innerText = 0 )
    divCartasJugadores.forEach(elem => elem.innerText = '' )
    btnPedir.disabled= false;
    btnDetener.disabled= false;
    

}


// crea una baraja aleatoria
let i 
const crearDeck = () => {
    deck = [];
    for (i = 2; i <= 10; i++) {
        for( let tipo of tipos) {
        deck.push ( i + tipo );
    }
} 
for (let tipo of tipos) {
    for (let esp of especiales) {
        deck.push(esp + tipo)
    }
}
return _.shuffle(deck);


}


// funcion para retirar una carta de la baraja


const pedirCarta = () => {
    if (deck.length === 0){
        throw 'no hay cartas en el deck';
    }
    return deck.pop();
    
    }



// valor de la carta

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return ( isNaN(valor)) ?
     (valor === 'A') ? 11 : 10
     : valor * 1;
}
// turno 0 es el prier jugador y el ultimo siempre es la pc
const acumularPuntos = ( carta, turno ) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta (carta);
    puntosSmall[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno]
}
const crearCarta = (carta, turno) => {
    const imgCarta = document.createElement('img');
          imgCarta.src = `cartas/${carta}.png`;
          imgCarta.classList.add('carta')
          divCartasJugadores[turno].append(imgCarta);
}
const determinarGanador = () => {
    const [puntosMinimos, puntosComputadora] = puntosJugadores;
    setTimeout(() => {
        if (puntosComputadora === puntosMinimos) {
            alert(' EMPATE QUE LO QUE ');
        } else if ( puntosMinimos > 21 ){
            alert('PERDISTE MANAO :(');}
            else if (puntosComputadora > 21 ) {
                alert('ganaste manoooo');
            } else if (puntosComputadora > puntosMinimos && puntosComputadora <= 21){
                alert('PERDISTE MANAO :(')
            }
        }, 10);
    }
//turno de la computadora
const turnoComputadora = (puntosMinimos) => {
    let puntosComputadora = 0;
    do {
        const carta = pedirCarta();
        puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1)
        crearCarta(carta, puntosJugadores.length - 1)

    } while (( puntosComputadora < puntosMinimos)  && (puntosMinimos <= 21));
    determinarGanador();
}
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    const puntosJugador = acumularPuntos(carta, 0)
   crearCarta(carta, 0);

    if (puntosJugador > 21) {
        console.warn('no pegas una mano');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    } else if ( puntosJugador === 21) {
        console.warn ('21 manitoooo');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    }}
    );
    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugadores[0] );
    });
    
    btnNuevo.addEventListener('click', () => {
        inicializarJuego();
    });
    return {
        nuevoJuego: inicializarJuego
    };

})();








   


    


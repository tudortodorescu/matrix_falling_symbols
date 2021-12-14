import { generateQueryConstructor } from './app/utils/utils.js'

const canvas = document.getElementsByTagName( 'canvas' )[ 0 ]
const ctx = canvas.getContext( '2d' )

// questionable, might not be needed
canvas.width = window.innerWidth
canvas.height = window.innerHeight

class Effect {
    constructor() {
        generateQueryConstructor.call( this, ...arguments )
    }
}

const test = new Effect({ plm1: 'a', plm2: 'b' })
console.log( test.plm1 )
console.log( test.plm2 )

import { generateQueryConstructor, generateArray } from '/app/utils/object.utils.js'
import { randomInArray, randomNumber } from '/app/utils/general.utils.js'
import matrixCharacters from '/app/matrix/matrixCharacters.string.js'

class MatrixEffect {
    constructor() {
        generateQueryConstructor.call( this, ...arguments )
    }
    get ctx() {
        return this.canvas.getContext( '2d' )
    }

    build() {
        this.#buildCanvas()
        this.#buildSymbols()
        this.#buildAnimation()
    }
    #buildCanvas() {
        const { canvas, settings } = this

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        this.totalColumns = Math.round( canvas.width / settings.columnSize ) 
    }
    #buildSymbols() {
        this.symbols = generateArray( this.totalColumns, ( _, index ) => {
            
            const matrixSymbolSettings = {
                text: randomInArray( matrixCharacters ),
                matrixEffect: this,
                x: index,
                y: randomNumber( 0, this.canvas.height / this.settings.columnSize ), 
            }

            return new MatrixSymbol( matrixSymbolSettings )
        })
    }
    #buildAnimation() {
        const { ctx } = this

        ctx.font = `${ this.settings.columnSize }px monospace`
        
    }

    /////

    startAnimation() {
        const matrixAnimation = new MatrixAnimation({ matrixEffect: this })
        matrixAnimation.animate()
    }
}

class MatrixAnimation {
    constructor() {
        generateQueryConstructor.call( this, ...arguments )
    }
    animate() {
        const { ctx, canvas, symbols, settings } = this.matrixEffect

        ctx.fillStyle = `rgba( 0, 0, 0, 0.${ settings.fadeOutEffect } )`
        ctx.textAlign = 'center'

        ctx.fillRect( 0, 0, canvas.width, canvas.height )
        symbols.forEach( symbol => symbol.draw( ctx ) )

        setTimeout(_ => {
            requestAnimationFrame( this.animate.bind(this))
        }, settings.fallingSpeed)
    }
}

class MatrixSymbol {
    constructor() {
        generateQueryConstructor.call( this, ...arguments )
    }
    draw() {
        const { canvas, ctx, settings: { columnSize, symbolsColors } } = this.matrixEffect
        
        ctx.fillStyle = randomInArray( symbolsColors )

        const xPos = this.x * columnSize
        const yPos = this.y * columnSize
        ctx.fillText( this.text, xPos, yPos )

        this.#resetText()
        this.#resetToTop({ yPos, canvas })
    }
    #resetText() {
        this.text = randomInArray( matrixCharacters )
    }
    #resetToTop({ yPos, canvas }) {
        const delayCondition = Math.random() > 0.98
        this.y = ( yPos > canvas.height && delayCondition ) ? 0 : this.y + 1
    }
}

const canvas = document.getElementsByTagName( 'canvas' )[ 0 ]

const matrixEffect = new MatrixEffect({ canvas, settings: {
    columnSize: 10,
    fallingSpeed: 30,
    fadeOutEffect: '10',
    symbolsColors: [ 'lightgreen' ]
}})

matrixEffect.build()
matrixEffect.startAnimation()

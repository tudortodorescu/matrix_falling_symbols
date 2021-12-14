
export function randomNumber( from, to ) {
    return Math.floor( Math.random() * (to + 1)) + from
}

export function randomInArray( arr ) {
    const index = randomNumber( 0, arr.length - 1 )
    return arr[ index ]
}

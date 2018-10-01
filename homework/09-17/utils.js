export function logs(x){
    console.log(x);
    return x;
}

export function sleep(ms) {
    return new Promise((_) => setTimeout(_, ms))
}

export function random(from=0, to=100){
    return Math.random() * (to - from) + from
}

export function between_exclusive(x, min, max ){
    return x >= min && x<= max;
}
// todo
// add more rules

let can; let canw = 1200; let canh = 1000;

let beat = 0;
let fr = 15;
let font;

let tri = "\u0394"
let rl = '\u2190' // - or rotate left
let rr = '\u2192' // + or rotate right
let lb = '\u2265' // [ or start bracket
let rb = '\u2244' // ] or start bracket
let axiom = tri
let dispersion = 4;
let rules = {
     \u0394:  [tri+tri+rr+lb+rr+tri+rl+tri+rl+tri+rb, tri+tri+tri+rr+lb+rr+tri+rl+tri+rl+tri+rb, tri+rr+lb+rr+tri+rl+tri+rl+tri+rb] // triangle
    // "\u20D4":  ["\u2228"],  // arrow (rotate left) -> self
    // "\u20D5":  ["\u2265"],  // Greater than  self
    // _:  ["\"]  // _ (end bracket) -> self
}

function preload() {
    font = loadFont("square.ttf")
}

function setup() {
    can = createCanvas(canw, canh).parent("canvasContainer")
    can.center("horizontal")
    userStartAudio()
    frameRate(fr)
    axiom = genSentence(axiom, 4)
    // can.center()
    // print(axiom)
    textSize(20)
    turtle(axiom);
    select("canvas").elt.getContext("2d").imageSmoothingEnabled = false;
    document.getElementById("console").innerHTML = axiom
    document.getElementById("console").innerHTML += axiom
    document.getElementById("console").innerHTML += axiom
    document.getElementById("console").innerHTML += axiom
    // createP(axiom)
}

function genSentence(axiom, amt) {
    // axiom = ""
    let postman = ""
    axiom = tri
    for(let outwards = 0; outwards < amt; outwards++){
        for (let i = 0; i < axiom.length; i++) {
            let c = axiom.charAt(i)
            if (!rules[c]) { postman += c; continue; }
            else postman += rules[c][random(0, 3) | 0]
        }
        axiom = postman
    }
    return postman
}

var len = 20;
var height = 50;
function turtle(axiom) {
    let inc = 0;
    stroke("white")
    fill(000)
    calcTriDims(1)
    let angle = radians(60)
    for(let i = 0; i < axiom.length; i++) {
        inc++;
        let c = axiom.charAt(i)
        switch(c) {
            case tri:
                let sign = Math.round(noise(0,inc)) * 2 - 1
                triangle(0, 0, sign*tril, 0, sign*tri_half_l, -trih)
                translate(-tri_half_l/2, -trih/2)
                break;
            case rl:
                rotate(-angle)
                break;
            case rr:
                rotate(-angle)
                break;
            case lb:
                calcTriDims(1/2)
                push()
                break;
            case rb:
                calcTriDims(2)
                pop()
                break;
                
        }
    }
}

let tril = 100;
function calcTriDims(scalar) {
    tril = tril*scalar;
    tri_half_l = tril/2;
    trih = Math.sqrt(tril*tril-tri_half_l*tri_half_l)
}

let seed = 1111, step = 310;
function draw() {
    background(000)
    translate(canw/2+tril, canh/2)
    beat += ((1 * sin(frameCount)) + 1);
    turtle(axiom);
    if(beat >= 30) {
        axiom = genSentence(axiom, dispersion)
        document.getElementById("console").innerHTML = axiom
        document.getElementById("console").innerHTML += axiom
        document.getElementById("console").innerHTML += axiom
        document.getElementById("console").innerHTML += axiom
        beat = frameCount % 30;
        seed += step;
        noiseSeed(seed)
    }
}



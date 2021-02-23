// todo
// add more rules

let can; let canw = 700; let canh = 700;

let beat = 0;
let fr = 30;
let font;

let tri = "\u0394"
let rl = '\u2190' // - or rotate left
let rr = '\u2192' // + or rotate right
let lb = '\u2265' // [ or start bracket
let rb = '\u2244' // ] or start bracket
let axiom = tri
let rules = {
     \u0394:  [tri+tri+rr+lb+rr+tri+rl+tri+rl+tri+rb],  // triangle
    // "\u20D4":  ["\u2228"],  // arrow (rotate left) -> self
    // "\u20D5":  ["\u2265"],  // Greater than  self
    // _:  ["\"]  // _ (end bracket) -> self
}

function preload() {
    font = loadFont("square.ttf")
}

function setup() {
    can = createCanvas(canh, canw).parent("canvasContainer")
    // can.center()
    userStartAudio()
    frameRate(fr)
    axiom = genSentence(axiom)
    axiom = genSentence(axiom)
    axiom = genSentence(axiom)
    axiom = genSentence(axiom)
    // can.center()
    print(axiom)
    textSize(20)
    translate(canw/2, canh/2)
    background(000)
    turtle(axiom)
    document.getElementById("console").innerHTML += axiom
    select("canvas").elt.getContext("2d").imageSmoothingEnabled = false;
    // createP(axiom)
}

function genSentence(axiom) {
    print(axiom)
    let postman = ""
    for (let i = 0; i < axiom.length; i++) {
        let c = axiom.charAt(i)
        if (!rules[c]) { postman += c; continue; }
        else postman += rules[c]
    }
    print(postman)
    return postman
}

var len = 20;
var height = 50;
function turtle(axiom) {
    stroke("white")
    fill(000)
    calcTriDims(1)
    let angle = radians(60)
    for(let i = 0; i < axiom.length; i++) {
        let c = axiom.charAt(i)
        switch(c) {
            case tri:
                let sign = Math.round(Math.random()) * 2 - 1
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

function draw() {
    beat++;
    if(beat >= 30) {beat = frameCount % 30; }
}



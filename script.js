// inital data
let currrentColor = '';
let canDraw = false;
let canvas = document.querySelector("#tela");
let ctx = canvas.getContext('2d');
let mouseX = 0;
let mouseY = 0;


// Events

document.querySelector(".clear").addEventListener('click',clearScreen);
// Tonra as divs das cores clicáveis
document.querySelectorAll(".color").forEach((item) =>{
    item.addEventListener("click",(e)=>{
        color = e.target.getAttribute("data-color");
        currrentColor = color;

    // Muda a classe active para a cor atual para por borda na div
        document.querySelector(".active").classList.remove("active");
        e.target.classList.add('active');
        console.log(currrentColor);
    })
})


// Observa os movimentos do mouse dentro da canvas e excuta uma função
canvas.addEventListener("mousemove",mouseMoveEvent)

// Observa os movimentos de clique para baixo dentro da canvas e excuta uma função
canvas.addEventListener("mousedown",mouseDownEvent)

// Observa os movimentos de clique para cima dentro da canvas e excuta uma função
canvas.addEventListener("mouseup",mouseUpEvent)



// Functions

function mouseMoveEvent(e){
    // Enquanto o mouse estiver se movendo dentro do canvas essa função é executada
    // Vefirica se pode desenhar com o "canDraw"
    // Executa a função draw enviando a posição atual do mouse na tela "x e y"
    if(canDraw){
        draw(e.pageX, e.pageY);
    }
}



function mouseDownEvent(e){
    // Habilita o canDraw ao pressionar o botão esquerdo do mouse
    // Guarda a posição do mouse em x e y já compensado a distancia do canvas até a borda da pág.
    canDraw = true;
    mouseX = e.pageX - canvas.offsetLeft;
    mouseY = e.pageY - canvas.offsetTop;
}


function mouseUpEvent(){
    // Desabilita o canDraw ao soltar o botão esquerdo
    canDraw = false;
}


function clearScreen(){
    // Limpa a tela 
    // *Obs: Estudar as funções e parametros sobre o contexto do canvas. 
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
}



function draw(x,y){
    /* Essa função pega a posição atual do mouse no momento
    em que a função mouseDown é executada através dos parametros
    x e y. Em seguida compensa as distancias das bordas e guarda
    nas variáveis pointX e pointY.
    
    ctx.moveTo são os pontos "Finais" que o mouse percorre pq draw está
    dentro da função mouseMoveEvent que atualiza a cada pixel movido

    ctx.lineTo desenha a linha(ou ponto) desde a posição inicial
    do mouse até a posição final (que é 1px de movimento);

    as outras funções são parametros do contexto do canvas
    lembrar de estudar mais sobre.
    */

    let pointX = x - canvas.offsetLeft; 
    let pointY = y - canvas.offsetTop;

    //desenhar
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.lineJoin = 'round';
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(pointX, pointY);
    ctx.closePath();
    ctx.strokeStyle = currrentColor;
    ctx.stroke();


    mouseX = pointX;
    mouseY = pointY;
}


const canvas =document.querySelector('canvas');
const but=document.querySelector('.generate');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
const ctx=canvas.getContext('2d');
let curve=10;
let curve2=0;

function draw(startx,starty,len,angle,branchWidth,color1,color2){
    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle=color1;
    ctx.fillStyle=color2;
    ctx.shadowBlur=15;
    ctx.shadowColor='black';
    ctx.lineWidth=branchWidth;
    ctx.translate(startx,starty);
    ctx.rotate(angle*Math.PI/180);
    ctx.moveTo(0,0);
    if(angle>0){
        ctx.bezierCurveTo(curve2,-len/2,curve2,-len/2,0,-len);
    }
    else{
        ctx.bezierCurveTo(curve2,-len/2,-curve2,-len/2,0,-len);
    }
    
    ctx.stroke();

    if(len<5){
        ctx.beginPath();
        ctx.arc(0,-len,10,0,Math.PI/2);
        ctx.fill();
        ctx.restore();
        return;
    }


    draw(0,-len,len*0.75,angle+curve,branchWidth*0.6);
    draw(0,-len,len*0.75,angle-curve,branchWidth*0.6);

    ctx.restore();
}

draw(canvas.width/2,canvas.height-80,120,0,25,'brown','green');

function generate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let centerpointx=canvas.width/2;
    let len=Math.floor((Math.random()*20)+100);
    let angle=0;
    let branchWidth=(Math.random()*50)+1;
    let color1='rgb('+Math.random()*255+','+Math.random()*255+','+Math.random()*255+')';
    let color2='rgb('+Math.random()*255+','+Math.random()*255+','+Math.random()*255+')';

    document.querySelector('.generate').style.background=color1;
    curve=(Math.random()*20)+2;
    curve2=Math.random()*50;
    draw(centerpointx,canvas.height-80,len,angle,branchWidth,color1,color2);
}
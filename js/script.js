const peaches=document.querySelector('.peaches');
const imgWrap=document.createElement('div');
imgWrap.setAttribute('class','img_wrap');
const p=document.createElement('p');
const span=document.createElement('span');
imgWrap.append(p);
imgWrap.append(span);
const Ps=document.querySelectorAll('.img_wrap>p');
let imgWraps=new Array();
let selectedWraps=new Array();
let selectedNum=new Array();
let score=document.querySelector('.score');
let scoreNum=0; let num=0;
const mainBtn=document.querySelector('.main');
const resetBtn=document.querySelector('.reset');
let sec=60;
const currTimeBar=document.querySelector('.curr');
const barH=currTimeBar.clientHeight;
let currBarH=barH;
const blur=document.querySelector('.blur');
const finalScoreNum=document.querySelector('.final_score_num');
const bestScoreNum=document.querySelector('.best_score>.new');
const replayBtn=document.querySelector('.replay');
const backtomainBtn=document.querySelector('.back_to_main');
const localClearBtn=document.querySelector('.local_clear');

for(let i=0; i<170; i++){
	imgWraps.push(imgWrap.cloneNode(true));
}
imgWraps.forEach(el=>{
	peaches.append(el);
	el.style.width=`${Math.floor(peaches.offsetWidth/17)}px`;
	el.style.height=`${Math.floor(peaches.offsetHeight/10)}px`;
});
let spans=document.querySelectorAll('.img_wrap>span');
spans.forEach(el=>{
	el.innerHTML=Math.floor(Math.random()*9+1);
});
const imgCW=imgWraps[0].clientWidth;
const imgCH=imgWraps[0].clientHeight;

const canvas=document.querySelector('canvas');
const ctx=canvas.getContext('2d');
ctx.lineWidth=1;
ctx.strokeStyle='#2F48D1';
ctx.fillStyle='rgba(47,72,209,0.05)';
let startX; let startY;
let leftPos; let topPos;
let endX; let endY;
let selected=new Array();
let draggable=false;
function downFunc(e){
	startX=e.offsetX;
	startY=e.offsetY;
	leftPos=e.offsetX;
	topPos=e.offsetY;
	draggable=true;
	selected=[];
	selectedWraps=[];
	selectedNum=[];
}
function moveFunc(e){
	if(!draggable){
		return;
	}
	let nowX=e.offsetX;
	let nowY=e.offsetY;
	canvasDraw(nowX, nowY);
	imgWraps.forEach((el)=>{
		if((el.offsetLeft+20>startX && (el.offsetLeft+el.clientWidth)-20<nowX) && ((el.offsetTop+el.clientHeight)-20<nowY && el.offsetTop+20>startY)){
			if(el.firstChild!=null){
				el.firstChild.style.backgroundImage="url('img/peachSelected.png')";
			}
		} else if(((el.offsetLeft+el.clientWidth)-20<startX && el.offsetLeft+20>nowX) && (el.offsetTop+el.clientHeight)-20<startY && el.offsetTop+20>nowY){
			if(el.firstChild!=null){
				el.firstChild.style.backgroundImage="url('img/peachSelected.png')";
			}
		} else{
			if(el.firstChild!=null){
				el.firstChild.style.backgroundImage="url('img/peach0.png')";
			}
		}
	});
	leftPos=nowX;
	topPos=nowY;
}
function upFunc(e){
	endX=e.offsetX;
	endY=e.offsetY;
	draggable=false;
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	imgWraps.forEach((el, idx)=>{
		if((el.offsetLeft+20>startX && (el.offsetLeft+el.clientWidth)-20<endX) && ((el.offsetTop+el.clientHeight)-20<endY && el.offsetTop+20>startY)){
			selected.push(idx);
		} else if(((el.offsetLeft+el.clientWidth)-20<startX && el.offsetLeft+20>endX) && (el.offsetTop+el.clientHeight)-20<startY && el.offsetTop+20>endY){
			selected.push(idx);
		}
		if(el.firstChild!=null){
			el.firstChild.style.backgroundImage="url('img/peach0.png')";
		}
	});
	sumCheck(selected);
}
function leaveFunc(){
	draggable=false;
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
function canvasDraw(currX,currY){
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.strokeRect(startX, startY, currX-startX, currY-startY);
	ctx.fillRect(startX, startY, currX-startX, currY-startY);
}
canvas.addEventListener('mousedown', downFunc);
canvas.addEventListener('mousemove', moveFunc);
canvas.addEventListener('mouseup', upFunc);
canvas.addEventListener('mouseleave', leaveFunc);

const sumCheck=(arr)=>{
	for(let i=0; i<arr.length; i++){
		if(imgWraps[arr[i]].firstChild!=null){
			selectedWraps.push(imgWraps[arr[i]]);
			let n=Number(imgWraps[arr[i]].childNodes[1].innerHTML);
			selectedNum.push(n);
		}
	}
	num=selectedNum.length;
	let sum=selectedNum.reduce((a,b) => (a+b));
	if(sum==10){
		selectedWraps.forEach(el=>{
			let xpo=parseInt(getComputedStyle(el).left);
			let ypo=parseInt(getComputedStyle(el).top);
			let incX=Math.random()*6+4; //4,5,6,7,8,9
			let incY=-(Math.random()*5+7); //-7,-6,-5,-4,-3
			let direct=Math.random();
			let g=2; //중력
			if(direct<0.5){
				incX=incX;
			}else{
				incX=-incX;
			}
			let moveTimer;
			const curveMoving=()=>{
				ypo+=incY=incY+g;
				xpo+=incX;
				el.style.left=xpo+'px';
				el.style.top=ypo+'px';
				moveTimer=setTimeout(curveMoving,20);
				if(ypo>document.querySelector('.bg').offsetTop+document.querySelector('.bg').clientHeight){
					clearTimeout(moveTimer);
					el.firstChild.remove();
					el.firstChild.remove();
				}
			}
			curveMoving();
		});
		scoreNum+=num;
	}
	score.innerHTML=scoreNum;
}

mainBtn.addEventListener('click',()=>{
	window.location.href='index.html';
});
resetBtn.addEventListener('click',()=>{
	imgWraps.forEach(el=>{
		if(el.firstChild==null){
			const p2=document.createElement('p');
			const span2=document.createElement('span');
			el.append(p2);
			el.append(span2);
			el.style.left=0+'px';
			el.style.top=0+'px';
		}
	});
	spans=document.querySelectorAll('.img_wrap>span');
	spans.forEach(el=>{
		el.innerHTML=Math.floor(Math.random()*9+1);
	});
});

function progressBar(){
	currBarH-=barH*(1/60);
	currTimeBar.style.height=`${currBarH/barH*100}%`;	
	setTimeout(progressBar, 1000);
}
function countDown(){
	console.log(sec);
	sec--;
	if(sec<=0){
		clearInterval(timer);
		clearTimeout(progress);
		blur.classList.add('active');
		finalScoreNum.innerHTML=scoreNum;
		console.log(localStorage.getItem('bestScore')!=null);
		if(localStorage.getItem('bestScore')!=null){
			bestScoreNum.innerHTML=localStorage.getItem('bestScore');
		} else{
			bestScoreNum.innerHTML=scoreNum;
			localStorage.setItem('bestScore', scoreNum);
		}
		let bestScore=Number(bestScoreNum.innerHTML);
		if(scoreNum>bestScore){
			localStorage.setItem('bestScore', scoreNum);
			bestScoreNum.innerHTML=scoreNum;
		}
	}
}
let timer=setInterval(countDown, 1000);
let progress=setTimeout(progressBar, 0);

replayBtn.addEventListener('click',()=>{ window.location.reload(); });
backtomainBtn.addEventListener('click',()=>{ window.location.href='index.html'; });
localClearBtn.addEventListener('click',()=>{ localStorage.clear(); });
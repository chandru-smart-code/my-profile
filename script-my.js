(function(){
var $=function(s){return document.querySelector(s)},$$=function(s){return [].slice.call(document.querySelectorAll(s))};
var clamp=function(v){return Math.min(1,Math.max(0,v))};
$('#yr').textContent=new Date().getFullYear();

/* photo: shown only if assets/me.png exists */
var sils=$$('.sil');
var im=new Image();im.onload=function(){sils.forEach(function(s){s.innerHTML='<img src="assets/me.png" alt="A CHANDRU">'})};im.src='assets/me.png';

/* contact form: opens the visitor's email app (static HTML can't send mail itself) */
$('#cf').addEventListener('submit',function(ev){ev.preventDefault();
  var f=ev.target,n=f.n.value.trim(),e=f.e.value.trim(),m=f.m.value.trim(),fm=$('#fm');
  if(!n||!/^\S+@\S+\.\S+$/.test(e)||!m){fm.textContent='Fill in your name, a valid email and a message.';return}
  location.href='mailto:chandrusmartcode@gmail.com?subject='+encodeURIComponent('Portfolio message from '+n)+'&body='+encodeURIComponent(m+'\n\n'+n+' ('+e+')');
  fm.textContent='Opening your email app… you can also email me directly.'});

/* loader */
var ld=$('#ld'),lf=$('#lf'),pc=$('#pc'),v=0;
var t=setInterval(function(){v=Math.min(100,v+Math.random()*6+2);lf.style.clipPath='inset('+(100-v)+'% 0 0 0)';pc.textContent=Math.floor(v)+'%';
  if(v>=100){clearInterval(t);setTimeout(function(){ld.classList.add('done');document.body.classList.add('ready')},450)}},80);
/* scroll progress (eased) */
var sc=['hero','jr','un','pj'].map(function(id){var e=document.getElementById(id);return {e:e,p:0,t:0}});
function raw(e){var r=e.getBoundingClientRect();return clamp(-r.top/(r.height-innerHeight))}
/* hero */
var nm=$('#nm'),s1=$('#s1'),mx=0;
addEventListener('pointermove',function(e){mx=e.clientX/innerWidth-.5});
function hero(p){nm.style.transform='translate(calc(-50% + '+(-mx*40)+'px),-50%) scale('+(1+p*.9)+')';nm.style.opacity=1-p*1.15;
  s1.style.transform='translateX(calc(-50% + '+(mx*26)+'px)) scale('+(1+p*.18)+')'}
/* journey */
var p1=$('#p1'),dot=$('#dot'),L=p1.getTotalLength(),nd=$$('.nd');
p1.style.strokeDasharray=L;
nd.forEach(function(n,i){var tt=.07+.86*i/(nd.length-1),pt=p1.getPointAtLength(L*tt);n._t=tt;
  n.style.left=(pt.x/12)+'%';n.style.top=((pt.y+22)/6)+'%'});
function jr(p){var q=clamp(p*1.08);p1.style.strokeDashoffset=L*(1-q);var pt=p1.getPointAtLength(L*q);dot.setAttribute('cx',pt.x);dot.setAttribute('cy',pt.y);
  nd.forEach(function(n){n.classList.toggle('on',q>=n._t-.02)})}
/* universe */
var tiles=$$('.tile'),r1=$('#r1'),r2=$('#r2'),T=0;
function un(p){var R=Math.min(innerWidth*.42,520);
  tiles.forEach(function(el,i){var a=i/tiles.length*6.2832+T*.0004+p*5,x=Math.cos(a)*R,z=Math.sin(a)*R*.9,y=Math.sin(a*2+i)*60-20;
    el.style.transform='translate(-50%,-50%) translate3d('+x+'px,'+y+'px,'+z+'px) rotateY('+(Math.cos(a)*-25)+'deg)';
    el.style.opacity=.55+.45*(z/R+1)/2});
  r1.style.strokeDashoffset=-p*2400-T*.15;r2.style.strokeDashoffset=p*1800+T*.1}
/* projects */
var pcs=$$('.pc');
function pj(p){var n=pcs.length,w=Math.min(innerWidth*.34,370);
  pcs.forEach(function(c,i){var o=i-p*(n-1),a=Math.abs(o);
    c.style.transform='translate(-50%,-50%) translateX('+(o*w*1.12)+'px) translateZ('+(-a*240)+'px) rotateY('+(-o*30)+'deg)';
    c.style.opacity=Math.max(.25,1-a*.32);c.style.zIndex=10-Math.round(a*3);c.style.pointerEvents=a<.7?'auto':'none'})}
var fn=[hero,jr,un,pj];
/* side nav */
var links=$$('#sn a'),ids=['hero','jr','un','pj','fin'];
function nav(){var y=innerHeight*.4,cur=0;ids.forEach(function(id,i){if(document.getElementById(id).getBoundingClientRect().top<y)cur=i});
  links.forEach(function(l,i){l.classList.toggle('on',i===cur)})}
/* embers */
var cv=$('#em'),cx=cv.getContext('2d'),P=[],reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
function size(){cv.width=innerWidth;cv.height=innerHeight}size();addEventListener('resize',size);
for(var i=0;i<70;i++)P.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*2+.4,s:Math.random()*.6+.2,d:Math.random()*6});
function frame(ts){T=ts;
  sc.forEach(function(s,i){s.t=raw(s.e);s.p+=(s.t-s.p)*.09;fn[i](s.p)});nav();
  if(!reduce){cx.clearRect(0,0,cv.width,cv.height);
    P.forEach(function(q){q.y-=q.s;q.x+=Math.sin(ts*.001+q.d)*.4;if(q.y<-5){q.y=cv.height+5;q.x=Math.random()*cv.width}
      cx.beginPath();cx.arc(q.x,q.y,q.r,0,6.2832);cx.fillStyle='rgba(255,'+(90+q.r*30|0)+',20,'+(.3+q.r/4)+')';cx.shadowColor='#ff5a00';cx.shadowBlur=10;cx.fill()})}
  requestAnimationFrame(frame)}
requestAnimationFrame(frame);
})();

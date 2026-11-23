import{readFileSync,readdirSync,mkdirSync,writeFileSync}from'node:fs';
const I=process.env.MAKEFUN_INPUT_DIR||'/input',O=process.env.MAKEFUN_OUTPUT_DIR||'/output';
const F=[(a,b)=>(a+b)|0,(a,b)=>(a-b)|0,Math.imul,(a,b)=>(a/b)|0,(a,b)=>a%b|0,(a,b)=>(a>>>0)/(b>>>0)|0,(a,b)=>(a>>>0)%(b>>>0)|0,0,(a,b)=>a&b,(a,b)=>a|b,(a,b)=>a^b,0,(a,b)=>a<<(b&31),(a,b)=>a>>(b&31),(a,b)=>(a>>>(b&31))|0,0,(a,b)=>a==b?1:0,(a,b)=>a<b?1:0,(a,b)=>(a>>>0)<(b>>>0)?1:0];
function R(p,q){
 const D=[],C=[],M=[],o=[];
 let pc=0,sp=0,cp=0,st=0,ip=0,ol=0;
 const T=n=>{throw n};
 const P=v=>{if(sp===256)T(3);D[sp++]=v};
 const G=()=>{if(!sp)T(2);return D[--sp]};
 const B=()=>Buffer.from(o);
 try{for(;;){
  if(st===1e6)T(10);
  if(pc<0||pc>=p.length)T(9);
  const x=p[pc],im=x===1?1:x===2?4:x>47&&x<52?2:0;
  if(pc+im>=p.length)T(9);
  st++;const nx=pc+1+im;pc=nx;
  if(x<8){
   if(!x)return[B(),0];
   if(x===1)P(p.readInt8(nx-1));
   else if(x===2)P(p.readInt32LE(nx-4));
   else if(x===3)G();
   else if(x===4){if(!sp)T(2);P(D[sp-1])}
   else if(x===5){if(sp<2)T(2);const t=D[sp-1];D[sp-1]=D[sp-2];D[sp-2]=t}
   else if(x===6){if(sp<2)T(2);P(D[sp-2])}
   else{if(sp<3)T(2);const t=D[sp-3];D[sp-3]=D[sp-2];D[sp-2]=D[sp-1];D[sp-1]=t}
  }else if(x>15&&x<35&&x!==31){
   if(x===23||x===27){if(!sp)T(2);D[sp-1]=x===23?-D[sp-1]|0:~D[sp-1]}
   else{const b=G(),a=G();if(x>18&&x<23&&!b)T(4);P(F[x-16](a,b))}
  }else if(x>47&&x<53){
   if(x===48)pc=nx+p.readInt16LE(nx-2);
   else if(x===51){if(cp===64)T(7);C[cp++]=nx;pc=p[nx-2]|p[nx-1]<<8}
   else if(x===52){if(!cp)T(8);pc=C[--cp]}
   else{const v=G();if((x===49)===(v===0))pc=nx+p.readInt16LE(nx-2)}
  }else if(x===64){if(!sp)T(2);const a=D[sp-1];if(a<0||a>255)T(6);D[sp-1]=M[a]|0}
  else if(x===65){const a=G(),v=G();if(a<0||a>255)T(6);M[a]=v}
  else if(x>79&&x<84){
   if(x===80){const v=G(),t=''+v;if(ol+t.length>65536)T(11);for(const c of t)o[ol++]=c.charCodeAt(0)}
   else if(x===81){const v=G();if(ol+1>65536)T(11);o[ol++]=v&255}
   else if(x===82)P(ip<q.length?q[ip++]:-1);
   else return[B(),G()&255];
  }else T(5);
 }}catch(e){return[B(),e]}
}
for(const d of readdirSync(I)){
 const[a,b]=R(readFileSync(I+'/'+d+'/program.bin'),readFileSync(I+'/'+d+'/input.bin'));
 mkdirSync(O+'/'+d,{recursive:true});
 writeFileSync(O+'/'+d+'/stdout.bin',a);
 writeFileSync(O+'/'+d+'/exit.txt',b+'');
}

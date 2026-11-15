import{c as Le,a6 as Y,aX as be}from"./three.module-CtL4CdWW.js";/*!
fflate - fast JavaScript compression/decompression
<https://101arrowz.github.io/fflate>
Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
version 0.8.2
*/var E=Uint8Array,R=Uint16Array,he=Int32Array,de=new E([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),ge=new E([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),ye=new E([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Ue=function(e,r){for(var n=new R(31),t=0;t<31;++t)n[t]=r+=1<<e[t-1];for(var o=new he(n[30]),t=1;t<30;++t)for(var a=n[t];a<n[t+1];++a)o[a]=a-n[t]<<5|t;return{b:n,r:o}},Pe=Ue(de,2),Be=Pe.b,fe=Pe.r;Be[28]=258,fe[258]=28;var Ne=Ue(ge,0),me=Ne.r,le=new R(32768);for(var M=0;M<32768;++M){var N=(M&43690)>>1|(M&21845)<<1;N=(N&52428)>>2|(N&13107)<<2,N=(N&61680)>>4|(N&3855)<<4,le[M]=((N&65280)>>8|(N&255)<<8)>>1}var Q=(function(e,r,n){for(var t=e.length,o=0,a=new R(r);o<t;++o)e[o]&&++a[e[o]-1];var s=new R(r);for(o=1;o<r;++o)s[o]=s[o-1]+a[o-1]<<1;var f;if(n){f=new R(1<<r);var u=15-r;for(o=0;o<t;++o)if(e[o])for(var c=o<<4|e[o],i=r-e[o],l=s[e[o]-1]++<<i,v=l|(1<<i)-1;l<=v;++l)f[le[l]>>u]=c}else for(f=new R(t),o=0;o<t;++o)e[o]&&(f[o]=le[s[e[o]-1]++]>>15-e[o]);return f}),V=new E(288);for(var M=0;M<144;++M)V[M]=8;for(var M=144;M<256;++M)V[M]=9;for(var M=256;M<280;++M)V[M]=7;for(var M=280;M<288;++M)V[M]=8;var re=new E(32);for(var M=0;M<32;++M)re[M]=5;var Ve=Q(V,9,0),We=Q(re,5,0),ke=function(e){return(e+7)/8|0},Re=function(e,r,n){return(n==null||n>e.length)&&(n=e.length),new E(e.subarray(r,n))},Xe=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],te=function(e,r,n){var t=new Error(r||Xe[e]);if(t.code=e,Error.captureStackTrace&&Error.captureStackTrace(t,te),!n)throw t;return t},b=function(e,r,n){n<<=r&7;var t=r/8|0;e[t]|=n,e[t+1]|=n>>8},J=function(e,r,n){n<<=r&7;var t=r/8|0;e[t]|=n,e[t+1]|=n>>8,e[t+2]|=n>>16},ue=function(e,r){for(var n=[],t=0;t<e.length;++t)e[t]&&n.push({s:t,f:e[t]});var o=n.length,a=n.slice();if(!o)return{t:De,l:0};if(o==1){var s=new E(n[0].s+1);return s[n[0].s]=1,{t:s,l:1}}n.sort(function(C,U){return C.f-U.f}),n.push({s:-1,f:25001});var f=n[0],u=n[1],c=0,i=1,l=2;for(n[0]={s:-1,f:f.f+u.f,l:f,r:u};i!=o-1;)f=n[n[c].f<n[l].f?c++:l++],u=n[c!=i&&n[c].f<n[l].f?c++:l++],n[i++]={s:-1,f:f.f+u.f,l:f,r:u};for(var v=a[0].s,t=1;t<o;++t)a[t].s>v&&(v=a[t].s);var p=new R(v+1),d=ce(n[i-1],p,0);if(d>r){var t=0,$=0,w=d-r,A=1<<w;for(a.sort(function(U,x){return p[x.s]-p[U.s]||U.f-x.f});t<o;++t){var O=a[t].s;if(p[O]>r)$+=A-(1<<d-p[O]),p[O]=r;else break}for($>>=w;$>0;){var z=a[t].s;p[z]<r?$-=1<<r-p[z]++-1:++t}for(;t>=0&&$;--t){var y=a[t].s;p[y]==r&&(--p[y],++$)}d=r}return{t:new E(p),l:d}},ce=function(e,r,n){return e.s==-1?Math.max(ce(e.l,r,n+1),ce(e.r,r,n+1)):r[e.s]=n},Se=function(e){for(var r=e.length;r&&!e[--r];);for(var n=new R(++r),t=0,o=e[0],a=1,s=function(u){n[t++]=u},f=1;f<=r;++f)if(e[f]==o&&f!=r)++a;else{if(!o&&a>2){for(;a>138;a-=138)s(32754);a>2&&(s(a>10?a-11<<5|28690:a-3<<5|12305),a=0)}else if(a>3){for(s(o),--a;a>6;a-=6)s(8304);a>2&&(s(a-3<<5|8208),a=0)}for(;a--;)s(o);a=1,o=e[f]}return{c:n.subarray(0,t),n:r}},K=function(e,r){for(var n=0,t=0;t<r.length;++t)n+=e[t]*r[t];return n},Oe=function(e,r,n){var t=n.length,o=ke(r+2);e[o]=t&255,e[o+1]=t>>8,e[o+2]=e[o]^255,e[o+3]=e[o+1]^255;for(var a=0;a<t;++a)e[o+a+4]=n[a];return(o+4+t)*8},_e=function(e,r,n,t,o,a,s,f,u,c,i){b(r,i++,n),++o[256];for(var l=ue(o,15),v=l.t,p=l.l,d=ue(a,15),$=d.t,w=d.l,A=Se(v),O=A.c,z=A.n,y=Se($),C=y.c,U=y.n,x=new R(19),g=0;g<O.length;++g)++x[O[g]&31];for(var g=0;g<C.length;++g)++x[C[g]&31];for(var h=ue(x,7),P=h.t,W=h.l,k=19;k>4&&!P[ye[k-1]];--k);var X=c+5<<3,D=K(o,V)+K(a,re)+s,I=K(o,v)+K(a,$)+s+14+3*k+K(x,P)+2*x[16]+3*x[17]+7*x[18];if(u>=0&&X<=D&&X<=I)return Oe(r,i,e.subarray(u,u+c));var H,m,F,B;if(b(r,i,1+(I<D)),i+=2,I<D){H=Q(v,p,0),m=v,F=Q($,w,0),B=$;var oe=Q(P,W,0);b(r,i,z-257),b(r,i+5,U-1),b(r,i+10,k-4),i+=14;for(var g=0;g<k;++g)b(r,i+3*g,P[ye[g]]);i+=3*k;for(var Z=[O,C],q=0;q<2;++q)for(var G=Z[q],g=0;g<G.length;++g){var L=G[g]&31;b(r,i,oe[L]),i+=P[L],L>15&&(b(r,i,G[g]>>5&127),i+=G[g]>>12)}}else H=Ve,m=V,F=We,B=re;for(var g=0;g<f;++g){var _=t[g];if(_>255){var L=_>>18&31;J(r,i,H[L+257]),i+=m[L+257],L>7&&(b(r,i,_>>23&31),i+=de[L]);var j=_&31;J(r,i,F[j]),i+=B[j],j>3&&(J(r,i,_>>5&8191),i+=ge[j])}else J(r,i,H[_]),i+=m[_]}return J(r,i,H[256]),i+m[256]},Ge=new he([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),De=new E(0),je=function(e,r,n,t,o,a){var s=a.z||e.length,f=new E(t+s+5*(1+Math.ceil(s/7e3))+o),u=f.subarray(t,f.length-o),c=a.l,i=(a.r||0)&7;if(r){i&&(u[0]=a.r>>3);for(var l=Ge[r-1],v=l>>13,p=l&8191,d=(1<<n)-1,$=a.p||new R(32768),w=a.h||new R(d+1),A=Math.ceil(n/3),O=2*A,z=function(ie){return(e[ie]^e[ie+1]<<A^e[ie+2]<<O)&d},y=new he(25e3),C=new R(288),U=new R(32),x=0,g=0,h=a.i||0,P=0,W=a.w||0,k=0;h+2<s;++h){var X=z(h),D=h&32767,I=w[X];if($[D]=I,w[X]=D,W<=h){var H=s-h;if((x>7e3||P>24576)&&(H>423||!c)){i=_e(e,u,0,y,C,U,g,P,k,h-k,i),P=x=g=0,k=h;for(var m=0;m<286;++m)C[m]=0;for(var m=0;m<30;++m)U[m]=0}var F=2,B=0,oe=p,Z=D-I&32767;if(H>2&&X==z(h-Z))for(var q=Math.min(v,H)-1,G=Math.min(32767,h),L=Math.min(258,H);Z<=G&&--oe&&D!=I;){if(e[h+F]==e[h+F-Z]){for(var _=0;_<L&&e[h+_]==e[h+_-Z];++_);if(_>F){if(F=_,B=Z,_>q)break;for(var j=Math.min(Z,_-2),$e=0,m=0;m<j;++m){var ae=h-Z+m&32767,Ze=$[ae],Me=ae-Ze&32767;Me>$e&&($e=Me,I=ae)}}}D=I,I=$[D],Z+=D-I&32767}if(B){y[P++]=268435456|fe[F]<<18|me[B];var xe=fe[F]&31,we=me[B]&31;g+=de[xe]+ge[we],++C[257+xe],++U[we],W=h+F,++x}else y[P++]=e[h],++C[e[h]]}}for(h=Math.max(h,W);h<s;++h)y[P++]=e[h],++C[e[h]];i=_e(e,u,c,y,C,U,g,P,k,h-k,i),c||(a.r=i&7|u[i/8|0]<<3,i-=7,a.h=w,a.p=$,a.i=h,a.w=W)}else{for(var h=a.w||0;h<s+c;h+=65535){var se=h+65535;se>=s&&(u[i/8|0]=c,se=s),i=Oe(u,i+1,e.subarray(h,se))}a.i=s}return Re(f,0,t+ke(i)+o)},Ye=(function(){for(var e=new Int32Array(256),r=0;r<256;++r){for(var n=r,t=9;--t;)n=(n&1&&-306674912)^n>>>1;e[r]=n}return e})(),qe=function(){var e=-1;return{p:function(r){for(var n=e,t=0;t<r.length;++t)n=Ye[n&255^r[t]]^n>>>8;e=n},d:function(){return~e}}},Je=function(e,r,n,t,o){if(!o&&(o={l:1},r.dictionary)){var a=r.dictionary.subarray(-32768),s=new E(a.length+e.length);s.set(a),s.set(e,a.length),e=s,o.w=a.length}return je(e,r.level==null?6:r.level,r.mem==null?o.l?Math.ceil(Math.max(8,Math.min(13,Math.log(e.length)))*1.5):20:12+r.mem,n,t,o)},Ie=function(e,r){var n={};for(var t in e)n[t]=e[t];for(var t in r)n[t]=r[t];return n},S=function(e,r,n){for(;n;++r)e[r]=n,n>>>=8};function Ke(e,r){return Je(e,r||{},0,0)}var Fe=function(e,r,n,t){for(var o in e){var a=e[o],s=r+o,f=t;Array.isArray(a)&&(f=Ie(t,a[1]),a=a[0]),a instanceof E?n[s]=[a,f]:(n[s+="/"]=[new E(0),f],Fe(a,s,n,t))}},Te=typeof TextEncoder<"u"&&new TextEncoder,Qe=typeof TextDecoder<"u"&&new TextDecoder,er=0;try{Qe.decode(De,{stream:!0}),er=1}catch{}function ne(e,r){var n;if(Te)return Te.encode(e);for(var t=e.length,o=new E(e.length+(e.length>>1)),a=0,s=function(c){o[a++]=c},n=0;n<t;++n){if(a+5>o.length){var f=new E(a+8+(t-n<<1));f.set(o),o=f}var u=e.charCodeAt(n);u<128||r?s(u):u<2048?(s(192|u>>6),s(128|u&63)):u>55295&&u<57344?(u=65536+(u&1047552)|e.charCodeAt(++n)&1023,s(240|u>>18),s(128|u>>12&63),s(128|u>>6&63),s(128|u&63)):(s(224|u>>12),s(128|u>>6&63),s(128|u&63))}return Re(o,0,a)}var pe=function(e){var r=0;if(e)for(var n in e){var t=e[n].length;t>65535&&te(9),r+=t+4}return r},Ee=function(e,r,n,t,o,a,s,f){var u=t.length,c=n.extra,i=f&&f.length,l=pe(c);S(e,r,s!=null?33639248:67324752),r+=4,s!=null&&(e[r++]=20,e[r++]=n.os),e[r]=20,r+=2,e[r++]=n.flag<<1|(a<0&&8),e[r++]=o&&8,e[r++]=n.compression&255,e[r++]=n.compression>>8;var v=new Date(n.mtime==null?Date.now():n.mtime),p=v.getFullYear()-1980;if((p<0||p>119)&&te(10),S(e,r,p<<25|v.getMonth()+1<<21|v.getDate()<<16|v.getHours()<<11|v.getMinutes()<<5|v.getSeconds()>>1),r+=4,a!=-1&&(S(e,r,n.crc),S(e,r+4,a<0?-a-2:a),S(e,r+8,n.size)),S(e,r+12,u),S(e,r+14,l),r+=16,s!=null&&(S(e,r,i),S(e,r+6,n.attrs),S(e,r+10,s),r+=14),e.set(t,r),r+=u,l)for(var d in c){var $=c[d],w=$.length;S(e,r,+d),S(e,r+2,w),e.set($,r+4),r+=4+w}return i&&(e.set(f,r),r+=i),r},rr=function(e,r,n,t,o){S(e,r,101010256),S(e,r+8,n),S(e,r+10,n),S(e,r+12,t),S(e,r+16,o)};function nr(e,r){r||(r={});var n={},t=[];Fe(e,"",n,r);var o=0,a=0;for(var s in n){var f=n[s],u=f[0],c=f[1],i=c.level==0?0:8,l=ne(s),v=l.length,p=c.comment,d=p&&ne(p),$=d&&d.length,w=pe(c.extra);v>65535&&te(11);var A=i?Ke(u,c):u,O=A.length,z=qe();z.p(u),t.push(Ie(c,{size:u.length,crc:z.d(),c:A,f:l,m:d,u:v!=s.length||d&&p.length!=$,o,compression:i})),o+=30+v+w+O,a+=76+2*(v+w)+($||0)+O}for(var y=new E(a+22),C=o,U=a-o,x=0;x<t.length;++x){var l=t[x];Ee(y,l.o,l,l.f,l.u,l.c.length);var g=30+l.f.length+pe(l.extra);y.set(l.c,l.o+g),Ee(y,o,l,l.f,l.u,l.c.length,l.o,l.m),o+=16+g+(l.m?l.m.length:0)}return rr(y,o,t.length,U,C),y}class xr{constructor(){this.textureUtils=null}setTextureUtils(r){this.textureUtils=r}parse(r,n,t,o){this.parseAsync(r,o).then(n).catch(t)}async parseAsync(r,n={}){n=Object.assign({ar:{anchoring:{type:"plane"},planeAnchoring:{alignment:"horizontal"}},includeAnchoringProperties:!0,quickLookCompatible:!1,maxTextureSize:1024},n);const t={},o="model.usda";t[o]=null;let a=ze();a+=or(n);const s={},f={};r.traverseVisible(c=>{if(c.isMesh){const i=c.geometry,l=c.material;if(l.isMeshStandardMaterial){const v="geometries/Geometry_"+i.id+".usda";if(!(v in t)){const p=ur(i);t[v]=sr(p)}l.uuid in s||(s[l.uuid]=l),a+=ir(c,i,l)}else console.warn("THREE.USDZExporter: Unsupported material type (USDZ only supports MeshStandardMaterial)",c)}else c.isCamera&&(a+=$r(c))}),a+=ar(),a+=hr(s,f,n.quickLookCompatible),t[o]=ne(a),a=null;for(const c in f){let i=f[c];if(i.isCompressedTexture===!0){if(this.textureUtils===null)throw new Error("THREE.USDZExporter: setTextureUtils() must be called to process compressed textures.");i=await this.textureUtils.decompress(i)}const l=tr(i.image,i.flipY,n.maxTextureSize),v=await new Promise(p=>l.toBlob(p,"image/jpeg",.86));t[`textures/Texture_${c}.jpg`]=new Uint8Array(await v.arrayBuffer())}let u=0;for(const c in t){const i=t[c],l=34+c.length;u+=l;const v=u&63;if(v!==4){const p=64-v,d=new Uint8Array(p);t[c]=[i,{extra:{12345:d}}]}u=i.length}return nr(t,{level:0})}}function tr(e,r,n){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=n/Math.max(e.width,e.height),o=document.createElement("canvas");o.width=e.width*Math.min(1,t),o.height=e.height*Math.min(1,t);const a=o.getContext("2d");return r===!0&&(a.translate(0,o.height),a.scale(1,-1)),a.drawImage(e,0,0,o.width,o.height),o}else throw new Error("THREE.USDZExporter: No valid image data found. Unable to process texture.")}const T=7;function ze(){return`#usda 1.0
(
	customLayerData = {
		string creator = "Three.js USDZExporter"
	}
	defaultPrim = "Root"
	metersPerUnit = 1
	upAxis = "Y"
)

`}function or(e){return`def Xform "Root"
{
	def Scope "Scenes" (
		kind = "sceneLibrary"
	)
	{
		def Xform "Scene" (
			customData = {
				bool preliminary_collidesWithEnvironment = 0
				string sceneName = "Scene"
			}
			sceneName = "Scene"
		)
		{${e.includeAnchoringProperties===!0?`
		token preliminary:anchoring:type = "${e.ar.anchoring.type}"
		token preliminary:planeAnchoring:alignment = "${e.ar.planeAnchoring.alignment}"
	`:""}
`}function ar(){return`
		}
	}
}

`}function sr(e){let r=ze();return r+=e,ne(r)}function ir(e,r,n){const t="Object_"+e.id,o=He(e.matrixWorld);return e.matrixWorld.determinant()<0&&console.warn("THREE.USDZExporter: USDZ does not support negative scales",e),`def Xform "${t}" (
	prepend references = @./geometries/Geometry_${r.id}.usda@</Geometry>
	prepend apiSchemas = ["MaterialBindingAPI"]
)
{
	matrix4d xformOp:transform = ${o}
	uniform token[] xformOpOrder = ["xformOp:transform"]

	rel material:binding = </Materials/Material_${n.id}>
}

`}function He(e){const r=e.elements;return`( ${ee(r,0)}, ${ee(r,4)}, ${ee(r,8)}, ${ee(r,12)} )`}function ee(e,r){return`(${e[r+0]}, ${e[r+1]}, ${e[r+2]}, ${e[r+3]})`}function ur(e){return`
def "Geometry"
{
${fr(e)}
}
`}function fr(e){const r="Geometry",n=e.attributes,t=n.position.count;return`
	def Mesh "${r}"
	{
		int[] faceVertexCounts = [${lr(e)}]
		int[] faceVertexIndices = [${cr(e)}]
		normal3f[] normals = [${ve(n.normal,t)}] (
			interpolation = "vertex"
		)
		point3f[] points = [${ve(n.position,t)}]
${vr(n)}
		uniform token subdivisionScheme = "none"
	}
`}function lr(e){const r=e.index!==null?e.index.count:e.attributes.position.count;return Array(r/3).fill(3).join(", ")}function cr(e){const r=e.index,n=[];if(r!==null)for(let t=0;t<r.count;t++)n.push(r.getX(t));else{const t=e.attributes.position.count;for(let o=0;o<t;o++)n.push(o)}return n.join(", ")}function ve(e,r){if(e===void 0)return console.warn("USDZExporter: Normals missing."),Array(r).fill("(0, 0, 0)").join(", ");const n=[];for(let t=0;t<e.count;t++){const o=e.getX(t),a=e.getY(t),s=e.getZ(t);n.push(`(${o.toPrecision(T)}, ${a.toPrecision(T)}, ${s.toPrecision(T)})`)}return n.join(", ")}function pr(e){const r=[];for(let n=0;n<e.count;n++){const t=e.getX(n),o=e.getY(n);r.push(`(${t.toPrecision(T)}, ${1-o.toPrecision(T)})`)}return r.join(", ")}function vr(e){let r="";for(let t=0;t<4;t++){const o=t>0?t:"",a=e["uv"+o];a!==void 0&&(r+=`
		texCoord2f[] primvars:st${o} = [${pr(a)}] (
			interpolation = "vertex"
		)`)}const n=e.color;if(n!==void 0){const t=n.count;r+=`
	color3f[] primvars:displayColor = [${ve(n,t)}] (
		interpolation = "vertex"
		)`}return r}function hr(e,r,n=!1){const t=[];for(const o in e){const a=e[o];t.push(dr(a,r,n))}return`def "Materials"
{
${t.join("")}
}

`}function dr(e,r,n=!1){const o=[],a=[];function s(f,u,c){const i=f.source.id+"_"+f.flipY;r[i]=f;const l=f.channel>0?"st"+f.channel:"st",v={1e3:"repeat",1001:"clamp",1002:"mirror"},p=f.repeat.clone(),d=f.offset.clone(),$=f.rotation,w=Math.sin($),A=Math.cos($);return d.y=1-d.y-p.y,n?(d.x=d.x/p.x,d.y=d.y/p.y,d.x+=w/p.x,d.y+=A-1):(d.x+=w*p.x,d.y+=(1-A)*p.y),`
		def Shader "PrimvarReader_${u}"
		{
			uniform token info:id = "UsdPrimvarReader_float2"
			float2 inputs:fallback = (0.0, 0.0)
			token inputs:varname = "${l}"
			float2 outputs:result
		}

		def Shader "Transform2d_${u}"
		{
			uniform token info:id = "UsdTransform2d"
			token inputs:in.connect = </Materials/Material_${e.id}/PrimvarReader_${u}.outputs:result>
			float inputs:rotation = ${($*(180/Math.PI)).toFixed(T)}
			float2 inputs:scale = ${Ae(p)}
			float2 inputs:translation = ${Ae(d)}
			float2 outputs:result
		}

		def Shader "Texture_${f.id}_${u}"
		{
			uniform token info:id = "UsdUVTexture"
			asset inputs:file = @textures/Texture_${i}.jpg@
			float2 inputs:st.connect = </Materials/Material_${e.id}/Transform2d_${u}.outputs:result>
			${c!==void 0?"float4 inputs:scale = "+gr(c):""}
			token inputs:sourceColorSpace = "${f.colorSpace===be?"raw":"sRGB"}"
			token inputs:wrapS = "${v[f.wrapS]}"
			token inputs:wrapT = "${v[f.wrapT]}"
			float outputs:r
			float outputs:g
			float outputs:b
			float3 outputs:rgb
			${e.transparent||e.alphaTest>0?"float outputs:a":""}
		}`}return e.side===Le&&console.warn("THREE.USDZExporter: USDZ does not support double sided materials",e),e.map!==null?(o.push(`			color3f inputs:diffuseColor.connect = </Materials/Material_${e.id}/Texture_${e.map.id}_diffuse.outputs:rgb>`),e.transparent?o.push(`			float inputs:opacity.connect = </Materials/Material_${e.id}/Texture_${e.map.id}_diffuse.outputs:a>`):e.alphaTest>0&&(o.push(`			float inputs:opacity.connect = </Materials/Material_${e.id}/Texture_${e.map.id}_diffuse.outputs:a>`),o.push(`			float inputs:opacityThreshold = ${e.alphaTest}`)),a.push(s(e.map,"diffuse",e.color))):o.push(`			color3f inputs:diffuseColor = ${Ce(e.color)}`),e.emissiveMap!==null?(o.push(`			color3f inputs:emissiveColor.connect = </Materials/Material_${e.id}/Texture_${e.emissiveMap.id}_emissive.outputs:rgb>`),a.push(s(e.emissiveMap,"emissive",new Y(e.emissive.r*e.emissiveIntensity,e.emissive.g*e.emissiveIntensity,e.emissive.b*e.emissiveIntensity)))):e.emissive.getHex()>0&&o.push(`			color3f inputs:emissiveColor = ${Ce(e.emissive)}`),e.normalMap!==null&&(o.push(`			normal3f inputs:normal.connect = </Materials/Material_${e.id}/Texture_${e.normalMap.id}_normal.outputs:rgb>`),a.push(s(e.normalMap,"normal"))),e.aoMap!==null&&(o.push(`			float inputs:occlusion.connect = </Materials/Material_${e.id}/Texture_${e.aoMap.id}_occlusion.outputs:r>`),a.push(s(e.aoMap,"occlusion",new Y(e.aoMapIntensity,e.aoMapIntensity,e.aoMapIntensity)))),e.roughnessMap!==null?(o.push(`			float inputs:roughness.connect = </Materials/Material_${e.id}/Texture_${e.roughnessMap.id}_roughness.outputs:g>`),a.push(s(e.roughnessMap,"roughness",new Y(e.roughness,e.roughness,e.roughness)))):o.push(`			float inputs:roughness = ${e.roughness}`),e.metalnessMap!==null?(o.push(`			float inputs:metallic.connect = </Materials/Material_${e.id}/Texture_${e.metalnessMap.id}_metallic.outputs:b>`),a.push(s(e.metalnessMap,"metallic",new Y(e.metalness,e.metalness,e.metalness)))):o.push(`			float inputs:metallic = ${e.metalness}`),e.alphaMap!==null?(o.push(`			float inputs:opacity.connect = </Materials/Material_${e.id}/Texture_${e.alphaMap.id}_opacity.outputs:r>`),o.push("			float inputs:opacityThreshold = 0.0001"),a.push(s(e.alphaMap,"opacity"))):o.push(`			float inputs:opacity = ${e.opacity}`),e.isMeshPhysicalMaterial&&(e.clearcoatMap!==null?(o.push(`			float inputs:clearcoat.connect = </Materials/Material_${e.id}/Texture_${e.clearcoatMap.id}_clearcoat.outputs:r>`),a.push(s(e.clearcoatMap,"clearcoat",new Y(e.clearcoat,e.clearcoat,e.clearcoat)))):o.push(`			float inputs:clearcoat = ${e.clearcoat}`),e.clearcoatRoughnessMap!==null?(o.push(`			float inputs:clearcoatRoughness.connect = </Materials/Material_${e.id}/Texture_${e.clearcoatRoughnessMap.id}_clearcoatRoughness.outputs:g>`),a.push(s(e.clearcoatRoughnessMap,"clearcoatRoughness",new Y(e.clearcoatRoughness,e.clearcoatRoughness,e.clearcoatRoughness)))):o.push(`			float inputs:clearcoatRoughness = ${e.clearcoatRoughness}`),o.push(`			float inputs:ior = ${e.ior}`)),`
	def Material "Material_${e.id}"
	{
		def Shader "PreviewSurface"
		{
			uniform token info:id = "UsdPreviewSurface"
${o.join(`
`)}
			int inputs:useSpecularWorkflow = 0
			token outputs:surface
		}

		token outputs:surface.connect = </Materials/Material_${e.id}/PreviewSurface.outputs:surface>

${a.join(`
`)}

	}
`}function Ce(e){return`(${e.r}, ${e.g}, ${e.b})`}function gr(e){return`(${e.r}, ${e.g}, ${e.b}, 1.0)`}function Ae(e){return`(${e.x}, ${e.y})`}function $r(e){const r=e.name?e.name:"Camera_"+e.id,n=He(e.matrixWorld);return e.matrixWorld.determinant()<0&&console.warn("THREE.USDZExporter: USDZ does not support negative scales",e),e.isOrthographicCamera?`def Camera "${r}"
		{
			matrix4d xformOp:transform = ${n}
			uniform token[] xformOpOrder = ["xformOp:transform"]

			float2 clippingRange = (${e.near.toPrecision(T)}, ${e.far.toPrecision(T)})
			float horizontalAperture = ${((Math.abs(e.left)+Math.abs(e.right))*10).toPrecision(T)}
			float verticalAperture = ${((Math.abs(e.top)+Math.abs(e.bottom))*10).toPrecision(T)}
			token projection = "orthographic"
		}
	
	`:`def Camera "${r}"
		{
			matrix4d xformOp:transform = ${n}
			uniform token[] xformOpOrder = ["xformOp:transform"]

			float2 clippingRange = (${e.near.toPrecision(T)}, ${e.far.toPrecision(T)})
			float focalLength = ${e.getFocalLength().toPrecision(T)}
			float focusDistance = ${e.focus.toPrecision(T)}
			float horizontalAperture = ${e.getFilmWidth().toPrecision(T)}
			token projection = "perspective"
			float verticalAperture = ${e.getFilmHeight().toPrecision(T)}
		}
	
	`}export{xr as USDZExporter};

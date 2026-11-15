import{I as Ze,F as Pe,o as ue,p as V,q as Xe,r as ve,s as We,g as A,j as Je,t as ne,U as je,V as Ke,u as ie,M as Qe,v as Z,w as Ye,x as et,n as tt}from"./three.module-CtL4CdWW.js";import{c as nt}from"./chrome-DB6bl9HI.js";import{m as it}from"./story-BkwGEuXa.js";import{B as q,f as Q}from"./plan-D7MyhDyV.js";import"./marsclock-1VQlD_cr.js";import"./main-DSExZwit.js";import"./main-D_CggCBm.js";import"./modulepreload-polyfill-B5Qt9EMX.js";import"./astro-CUMepJSs.js";import"./GLTFLoader-BsmbAwNU.js";import"./BufferGeometryUtils-D3sKrclM.js";import"./fields-DMp-sF2s.js";const ke=new ve,Y=new A;class he extends Ze{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],o=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new Pe(e,3)),this.setAttribute("uv",new Pe(o,2))}applyMatrix4(e){const o=this.attributes.instanceStart,n=this.attributes.instanceEnd;return o!==void 0&&(o.applyMatrix4(e),n.applyMatrix4(e),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let o;e instanceof Float32Array?o=e:Array.isArray(e)&&(o=new Float32Array(e));const n=new ue(o,6,1);return this.setAttribute("instanceStart",new V(n,3,0)),this.setAttribute("instanceEnd",new V(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let o;e instanceof Float32Array?o=e:Array.isArray(e)&&(o=new Float32Array(e));const n=new ue(o,6,1);return this.setAttribute("instanceColorStart",new V(n,3,0)),this.setAttribute("instanceColorEnd",new V(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new Xe(e.geometry)),this}fromLineSegments(e){const o=e.geometry;return this.setPositions(o.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ve);const e=this.attributes.instanceStart,o=this.attributes.instanceEnd;e!==void 0&&o!==void 0&&(this.boundingBox.setFromBufferAttribute(e),ke.setFromBufferAttribute(o),this.boundingBox.union(ke))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new We),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,o=this.attributes.instanceEnd;if(e!==void 0&&o!==void 0){const n=this.boundingSphere.center;this.boundingBox.getCenter(n);let p=0;for(let s=0,f=e.count;s<f;s++)Y.fromBufferAttribute(e,s),p=Math.max(p,n.distanceToSquared(Y)),Y.fromBufferAttribute(o,s),p=Math.max(p,n.distanceToSquared(Y));this.boundingSphere.radius=Math.sqrt(p),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}ie.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new Ke(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};ne.line={uniforms:je.merge([ie.common,ie.fog,ie.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			float alpha = opacity;

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class me extends Je{static get type(){return"LineMaterial"}constructor(e){super({uniforms:je.clone(ne.line.uniforms),vertexShader:ne.line.vertexShader,fragmentShader:ne.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const de=new Z,De=new A,Oe=new A,_=new Z,z=new Z,D=new Z,pe=new A,fe=new et,E=new Ye,Ce=new A,ee=new ve,te=new We,O=new Z;let C,H;function Ie(d,e,o){return O.set(0,0,-e,1).applyMatrix4(d.projectionMatrix),O.multiplyScalar(1/O.w),O.x=H/o.width,O.y=H/o.height,O.applyMatrix4(d.projectionMatrixInverse),O.multiplyScalar(1/O.w),Math.abs(Math.max(O.x,O.y))}function st(d,e){const o=d.matrixWorld,n=d.geometry,p=n.attributes.instanceStart,s=n.attributes.instanceEnd,f=Math.min(n.instanceCount,p.count);for(let l=0,v=f;l<v;l++){E.start.fromBufferAttribute(p,l),E.end.fromBufferAttribute(s,l),E.applyMatrix4(o);const x=new A,S=new A;C.distanceSqToSegment(E.start,E.end,S,x),S.distanceTo(x)<H*.5&&e.push({point:S,pointOnLine:x,distance:C.origin.distanceTo(S),object:d,face:null,faceIndex:l,uv:null,uv1:null})}}function ot(d,e,o){const n=e.projectionMatrix,s=d.material.resolution,f=d.matrixWorld,l=d.geometry,v=l.attributes.instanceStart,x=l.attributes.instanceEnd,S=Math.min(l.instanceCount,v.count),u=-e.near;C.at(1,D),D.w=1,D.applyMatrix4(e.matrixWorldInverse),D.applyMatrix4(n),D.multiplyScalar(1/D.w),D.x*=s.x/2,D.y*=s.y/2,D.z=0,pe.copy(D),fe.multiplyMatrices(e.matrixWorldInverse,f);for(let g=0,T=S;g<T;g++){if(_.fromBufferAttribute(v,g),z.fromBufferAttribute(x,g),_.w=1,z.w=1,_.applyMatrix4(fe),z.applyMatrix4(fe),_.z>u&&z.z>u)continue;if(_.z>u){const b=_.z-z.z,w=(_.z-u)/b;_.lerp(z,w)}else if(z.z>u){const b=z.z-_.z,w=(z.z-u)/b;z.lerp(_,w)}_.applyMatrix4(n),z.applyMatrix4(n),_.multiplyScalar(1/_.w),z.multiplyScalar(1/z.w),_.x*=s.x/2,_.y*=s.y/2,z.x*=s.x/2,z.y*=s.y/2,E.start.copy(_),E.start.z=0,E.end.copy(z),E.end.z=0;const L=E.closestPointToPointParameter(pe,!0);E.at(L,Ce);const R=tt.lerp(_.z,z.z,L),X=R>=-1&&R<=1,J=pe.distanceTo(Ce)<H*.5;if(X&&J){E.start.fromBufferAttribute(v,g),E.end.fromBufferAttribute(x,g),E.start.applyMatrix4(f),E.end.applyMatrix4(f);const b=new A,w=new A;C.distanceSqToSegment(E.start,E.end,w,b),o.push({point:w,pointOnLine:b,distance:C.origin.distanceTo(w),object:d,face:null,faceIndex:g,uv:null,uv1:null})}}}class Fe extends Qe{constructor(e=new he,o=new me({color:Math.random()*16777215})){super(e,o),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,o=e.attributes.instanceStart,n=e.attributes.instanceEnd,p=new Float32Array(2*o.count);for(let f=0,l=0,v=o.count;f<v;f++,l+=2)De.fromBufferAttribute(o,f),Oe.fromBufferAttribute(n,f),p[l]=l===0?0:p[l-1],p[l+1]=p[l]+De.distanceTo(Oe);const s=new ue(p,2,1);return e.setAttribute("instanceDistanceStart",new V(s,1,0)),e.setAttribute("instanceDistanceEnd",new V(s,1,1)),this}raycast(e,o){const n=this.material.worldUnits,p=e.camera;p===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const s=e.params.Line2!==void 0&&e.params.Line2.threshold||0;C=e.ray;const f=this.matrixWorld,l=this.geometry,v=this.material;H=v.linewidth+s,l.boundingSphere===null&&l.computeBoundingSphere(),te.copy(l.boundingSphere).applyMatrix4(f);let x;if(n)x=H*.5;else{const u=Math.max(p.near,te.distanceToPoint(C.origin));x=Ie(p,u,v.resolution)}if(te.radius+=x,C.intersectsSphere(te)===!1)return;l.boundingBox===null&&l.computeBoundingBox(),ee.copy(l.boundingBox).applyMatrix4(f);let S;if(n)S=H*.5;else{const u=Math.max(p.near,ee.distanceToPoint(C.origin));S=Ie(p,u,v.resolution)}ee.expandByScalar(S),C.intersectsBox(ee)!==!1&&(n?st(this,o):ot(this,p,o))}onBeforeRender(e){const o=this.material.uniforms;o&&o.resolution&&(e.getViewport(de),this.material.uniforms.resolution.value.set(de.z,de.w))}}function at(d,e,o,n){const p=[];for(let s=0;s<o-1;s++)for(let f=0;f<e-1;f++){const l=s*e+f,v=d(l),x=d(l+1),S=d(l+e+1),u=d(l+e);if(!(isFinite(v)&&isFinite(x)&&isFinite(S)&&isFinite(u)))continue;const g=(v>=n?1:0)|(x>=n?2:0)|(S>=n?4:0)|(u>=n?8:0);if(g===0||g===15)continue;const T=(L,R)=>(n-L)/(R-L),P=[];(g&1)!==(g>>1&1)&&P.push(f+T(v,x),s),(g>>1&1)!==(g>>2&1)&&P.push(f+1,s+T(x,S)),(g>>3&1)!==(g>>2&1)&&P.push(f+T(u,S),s+1),(g&1)!==(g>>3&1)&&P.push(f,s+T(v,u));for(let L=0;L+3<P.length;L+=4)p.push(P[L],P[L+1],P[L+2],P[L+3])}return p}const rt=d=>d<.5?4*d*d*d:1-(-2*d+2)**3/2;async function xt(){const{stage:d,setPill:e}=nt("Plan",{text:"Computing the walk-home map"});d.classList.add("withpanel"),d.insertAdjacentHTML("beforeend",`<div class="loading" id="loading">Loading 1 m terrain of Mount Sharp</div>
    <div class="s2-view" id="s2view"><button data-v="crew">Crew view</button><button data-v="map">Overview</button><kbd>V</kbd></div>`),document.getElementById("app").insertAdjacentHTML("beforeend",'<aside class="panel" id="panel"></aside>');const o=new URLSearchParams(location.hash.split("?")[1]??""),{world:n,stops:p,plan:s,crew:f}=await it(d),{W:l,H:v,res:x}=n,S=n.SIZE/2,u=s.home.time,g=new me({color:16777215,linewidth:1.6,polygonOffset:!0,polygonOffsetFactor:-6,polygonOffsetUnits:-6});let T=Float32Array.from(u);for(let t=0;t<2;t++){const i=new Float32Array(T.length);for(let a=0;a<v;a++)for(let c=0;c<l;c++){let r=0,h=0;for(let y=-1;y<=1;y++)for(let m=-1;m<=1;m++){const M=c+m,U=a+y;if(M<0||U<0||M>=l||U>=v)continue;const B=T[U*l+M];isFinite(B)&&(r+=B,h++)}i[a*l+c]=isFinite(T[a*l+c])&&h?r/h:1/0}T=i}const[P,L]=n.cellXZ(p[0].cell),R=(t,i)=>.3+Math.min(2.5,Math.hypot(t-P,i-L)/250),X=[];for(const t of[10,20,30]){const i=at(r=>T[r],l,v,t*60),a=new Float32Array(i.length/2*3);for(let r=0;r<i.length/2;r++){const h=(i[r*2]+.5)*x-S,y=(i[r*2+1]+.5)*x-S;a[r*3]=h,a[r*3+1]=n.ground(h,y)+R(h,y),a[r*3+2]=y}const c=new he;c.setPositions(a),n.scene.add(new Fe(c,g)),X.push([t,a])}const J=(()=>{const t=s.path.map(n.cellXZ),i=[];for(let r=1;r<t.length;r++)i.push(t[r-1][0],n.ground(t[r-1][0],t[r-1][1])+1,t[r-1][1],t[r][0],n.ground(t[r][0],t[r][1])+1,t[r][1]);const a=new he;a.setPositions(i);const c=new Fe(a,new me({color:16777215,linewidth:4.5}));return n.scene.add(c),c})(),b=s.legs[0],w=b.cells.map(n.cellXZ),se=b.time[b.time.length-1];for(let t=0;t<3;t++)for(let i=1;i<w.length-1;i++)w[i]=[(w[i-1][0]+w[i][0]*2+w[i+1][0])/4,(w[i-1][1]+w[i][1]*2+w[i+1][1])/4];const oe=t=>{t=Math.max(0,Math.min(se,t));let i=1;for(;i<b.time.length-1&&b.time[i]<t;)i++;const a=Math.min(1,(t-b.time[i-1])/(b.time[i]-b.time[i-1]||1)),c=(r,h)=>r+(h-r)*a;return{x:c(w[i-1][0],w[i][0]),z:c(w[i-1][1],w[i][1]),home:c(u[b.cells[i-1]],u[b.cells[i]])}},ge=t=>{const i=oe(t-10),a=oe(t+10);return Math.atan2(a.x-i.x,a.z-i.z)},ae=se*.55,we=se-4,{A:He,B:Re}=f(),k=new A,ye=new A,xe=n.chip("",ye,"s2-here");let Se="";const be=t=>{t=Math.min(t,we);const i=oe(t),a=ge(t),c=Math.sin(a),r=Math.cos(a),h=-r,y=c,m=t<we;for(const[B,N,ce]of[[He,-.7,0],[Re,.5,.8]]){const Ne=i.x+h*N-c*ce,qe=i.z+y*N-r*ce;B.root.position.copy(n.at(Ne,qe)),B.root.rotation.y=a,m?B.walk(t*1.1*Math.PI*2/1.5+ce*2):B.stand()}k.copy(n.at(i.x,i.z)),ye.copy(k).add(new A(0,2.5,0));const M=(s.T-t-i.home)/s.T,U=`<div><span>Walk home</span><b>${Math.round(i.home/60)}<small> min</small></b></div><div><span>Reserve</span><b>${Math.round(M*100)}<small>%</small></b></div><p>if they turned back here</p>`;return U!==Se&&(xe.innerHTML=U,Se=U),a},F=n.camera,G=n.controls,re=t=>{const i=Math.sin(t),a=Math.cos(t),c=-a,r=i,h=k.x-i*8.5+c*1.4,y=k.z-a*8.5+r*1.4,m=new A(h,Math.max(k.y+2.4,n.ground(h,y)+1.7),y),M=t-.07,U=m.clone().add(new A(Math.sin(M)*60,-60*Math.tan(.11),Math.cos(M)*60));return{p:m,t:U}},Me=(()=>{const t=[s.base,...s.path],i=t.map(y=>n.cellXZ(y)[0]),a=t.map(y=>n.cellXZ(y)[1]),c=(Math.min(...i)+Math.max(...i))/2,r=(Math.min(...a)+Math.max(...a))/2,h=n.at(c,r);return{p:h.clone().add(new A(-520,1e3,-1900)),t:h}})();let le=be(ae);const _e=k.clone(),I=re(ge(ae)),$=F.clone();$.position.copy(I.p),$.lookAt(I.t),$.updateMatrixWorld();const $e=t=>{for(let a=1;a<120;a++){const c=a/120,r=I.p.x+(t.x-I.p.x)*c,h=I.p.z+(t.z-I.p.z)*c;if(n.ground(r,h)>I.p.y+(t.y-I.p.y)*c+.2)return!1}return!0},ze=[n.cellPos(p[0].cell,3).project($)];for(const[t,i]of X){const a=t*60,c=s.path,r=[];for(let m=1;m<c.length;m++)if((u[c[m-1]]-a)*(u[c[m]]-a)<=0&&u[c[m-1]]!==u[c[m]]){const M=n.cellPos(c[m],.3);r.every(U=>U.distanceTo(M)>120)&&(r.push(M),n.chip(`${t} min`,M,"time s2-ring"))}if(r.length)continue;let h=null,y=1/0;for(let m=0;m<i.length;m+=18){const M=new A(i[m],i[m+1],i[m+2]),U=M.distanceTo(I.p),B=M.clone().project($);U<60||U>y||B.z>1||Math.abs(B.x)>.8||B.y<-.2||B.y>.8||ze.some(N=>Math.hypot(N.x-B.x,(N.y-B.y)*2)<.25)||!$e(M)||(h=M,y=U)}h&&(n.chip(`${t} min`,h,"time s2-ring s2-mid"),ze.push(h.clone().project($)))}let W=o.get("view")==="map"?"map":"crew",j=null;const Ve=performance.now()/1e3,Ee=W==="map"?Me:re(le);F.position.copy(Ee.p),G.target.copy(Ee.t),G.update(),n.lightOn(k,45);const Ae=[...document.querySelectorAll("#s2view button")],Ue=()=>Ae.forEach(t=>t.classList.toggle("on",t.dataset.v===W)),Le=t=>{t===W&&!j||(W=t,Ue(),j={p:F.position.clone(),t:G.target.clone(),at:performance.now()/1e3},history.replaceState(null,"",t==="map"?"#2?view=map":"#2"))};Ue(),Ae.forEach(t=>t.onclick=()=>Le(t.dataset.v)),addEventListener("keydown",t=>{(t.key==="v"||t.key==="V")&&Le(W==="map"?"crew":"map")}),n.tick.push(t=>{le=be(ae+(t-Ve));const i=k.clone().sub(_e);if(_e.copy(k),j){const a=rt(Math.min(1,(t-j.at)/2.2)),c=W==="map"?Me:re(le);F.position.lerpVectors(j.p,c.p,a),G.target.lerpVectors(j.t,c.t,a),a>=1&&(j=null)}else W==="crew"&&(F.position.add(i),G.target.add(i));n.lightOn(k,45),J.visible=F.position.y-n.ground(F.position.x,F.position.z)>120,xe.classList.toggle("s2-high",J.visible)});let K=0;for(let t=0;t<l*v;t++){const i=s.out.time[t]+s.work+u[t];isFinite(i)&&i>K&&(K=i)}const Be=K>s.usable,Te=Math.round(s.minReserve*100),Ge=(n.SIZE/1e3).toFixed(1);document.getElementById("panel").innerHTML=`
    <h2>EVA plan</h2>
    <div class="bigbar ${s.pass?"":"bad"}"></div>
    <div class="status ${s.pass?"":"bad"}"><i></i>${s.pass?"Tether holds":"Tether broken"}</div>
    <div class="big">${Te}<small>%</small></div>
    <div class="cap">Lowest walk-home reserve on this route</div>
    <div class="rows">
      <div><span>Distance</span><b>${(s.distance/1e3).toFixed(2)} km</b></div>
      <div><span>Suit time</span><b>${Q(s.totalTime)}</b></div>
      <div><span>Walking</span><b>${Q(s.walkTime)}</b></div>
      <div><span>Climb</span><b>${Math.round(s.climb)} m</b></div>
    </div>
    <div class="s2-keys">
      <div><i class="s2-k route"></i>Planned route, four stops</div>
      <div><i class="s2-k rg"></i>Walk home from here: 10, 20, 30 min</div>
      <div><i class="s2-k card"></i>Walk home and reserve where the crew stand</div>
    </div>
    <p class="s2-tether"><b>Tether line: ${Be?"inside this area":"not in this area"}.</b> ${Be?"":`Every spot you can walk to in this ${Ge} km square passes the walk-back rule (out, ${q.workMinPerStop} min of science, home, all within ${Q(s.usable)}); the farthest still has ${Q(s.usable-K)} to spare.`}</p>
    <p class="note">From anywhere on this ground Rocky knows how long the walk home is and what would be left of a ${q.evaHours}-hour suit.</p>
    <p class="s2-small">Assumes Rocky's defaults: ${q.evaHours} h suit, ${q.reservePct}% kept in reserve, ${q.workMinPerStop} min per stop. Ground: HiRISE image on USGS 1 m terrain.</p>`,e(`${s.pass?"Go":"No-go"}, ${Te}% reserve`,s.pass?"ok":"bad"),document.getElementById("loading").remove(),window.__ready=!0}export{xt as default};

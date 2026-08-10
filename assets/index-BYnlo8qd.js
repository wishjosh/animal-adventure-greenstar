(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[`a-garden`,`b-bright-soil`,`b-moist-soil`];function t(t){return e.includes(t)}var n={x:-5,z:1},r={x:21,z:27},i={x:-9.4,z:.8},a=[{id:`A`,name:`산촌 집·작은 정원`,cue:`붉은 집 지붕이 돌아갈 자리를 알려 줍니다.`,center:{x:-11,z:0},radius:5.7,color:13152877},{id:`B`,name:`계곡 물가`,cue:`잔잔한 물빛이 길의 중심을 잡아 줍니다.`,center:{x:-2.2,z:0},radius:5,color:8632492},{id:`C`,name:`숲 가장자리`,cue:`뒤의 잔잔한 물빛과 앞의 물소리가 겹칩니다.`,center:{x:-1.2,z:-8},radius:4.5,color:6720354},{id:`D`,name:`바위 계류`,cue:`흰 물살과 또렷한 물소리가 상류를 드러냅니다.`,center:{x:-3,z:-16},radius:7.8,color:8885402},{id:`E`,name:`아래로 이어지는 좁은 물길`,cue:`흐르는 물과 밝아지는 하늘이 아래쪽을 잇습니다.`,center:{x:-1.2,z:8},radius:4.5,color:9742963},{id:`F`,name:`산지 지류`,cue:`넓게 열린 골짜기가 물이 계속되는 쪽을 보여 줍니다.`,center:{x:-4,z:17},radius:5.8,color:12105849}],o=[{id:`A-B`,from:`A`,to:`B`,kind:`shared`,width:3.6,points:[{x:-11,z:0},{x:-7.2,z:.8},{x:-2.2,z:0}]},{id:`B-C`,from:`B`,to:`C`,kind:`water-bank`,width:2.7,points:[{x:-2.2,z:0},{x:-2.4,z:-4.2},{x:-1.2,z:-8}]},{id:`C-D`,from:`C`,to:`D`,kind:`water-bank`,width:2.6,points:[{x:-1.2,z:-8},{x:-2,z:-12},{x:-3,z:-16}]},{id:`D-A`,from:`D`,to:`A`,kind:`upper-return`,width:2.5,points:[{x:-3,z:-16},{x:-9.5,z:-13.5},{x:-14.2,z:-8.2},{x:-10.2,z:-4.4},{x:-11,z:0}]},{id:`B-E`,from:`B`,to:`E`,kind:`water-bank`,width:2.7,points:[{x:-2.2,z:0},{x:-2.3,z:4.1},{x:-1.2,z:8}]},{id:`E-F`,from:`E`,to:`F`,kind:`water-bank`,width:2.8,points:[{x:-1.2,z:8},{x:-2.1,z:12.4},{x:-4,z:17}]},{id:`F-A`,from:`F`,to:`A`,kind:`lower-return`,width:2.8,points:[{x:-4,z:17},{x:-11.5,z:15.4},{x:-16.1,z:10.2},{x:-17,z:5.2},{x:-14.7,z:2.2},{x:-11,z:0}]}],s=[{x:-3,z:-16},{x:-3.35,z:-18.15},{x:-3.15,z:-20.15},{x:-2.45,z:-21.75},{x:-1.7,z:-22.35}],c=[{x:.05,z:-23.1},{x:.1,z:-22.25},{x:.35,z:-21.4},{x:.55,z:-20.1},{x:.82,z:-19.15},{x:1.1,z:-18.5}],l=[{x:1.1,z:-18.5},{x:2.2,z:-13.5},{x:2.8,z:-8},{x:2.6,z:0},{x:3.2,z:7.5},{x:2.4,z:13},{x:1.5,z:19.5},{x:.8,z:24.6},{x:.25,z:30.5}],u=[...c.slice(0,-1),...l],d=Object.freeze({waterHalfWidth:1.15,bedHalfWidth:.72,bankHalfWidth:2.45,bedDepth:.72,waterDepth:.22}),f=[{id:`a-garden`,placeId:`A`,name:`A 정원 가꾸기 흙`,shortName:`정원 흙`,tone:`garden`,focus:{x:-9.8,z:3.65},outline:[{x:-12.25,z:2.35},{x:-10.85,z:2.05},{x:-9.15,z:2.2},{x:-7.75,z:2.85},{x:-7.55,z:4.15},{x:-8.55,z:5.15},{x:-10.35,z:5.35},{x:-11.85,z:4.7},{x:-12.55,z:3.45}],soilColor:7956558},{id:`b-bright-soil`,placeId:`B`,name:`B 밝고 마른 돌보기 흙`,shortName:`밝은 흙`,tone:`bright`,focus:{x:-4.65,z:2.75},outline:[{x:-5.85,z:2.05},{x:-4.85,z:1.7},{x:-3.8,z:2.1},{x:-3.45,z:3.05},{x:-4.15,z:3.9},{x:-5.35,z:3.95},{x:-6.05,z:3.25}],soilColor:8549978},{id:`b-moist-soil`,placeId:`B`,name:`B 그늘지고 촉촉한 돌보기 흙`,shortName:`촉촉한 흙`,tone:`moist`,focus:{x:-4.95,z:-3.55},outline:[{x:-5.95,z:-4.15},{x:-5.2,z:-4.75},{x:-4.15,z:-4.55},{x:-3.75,z:-3.65},{x:-4.15,z:-2.65},{x:-5.25,z:-2.45},{x:-6.15,z:-3.15}],soilColor:5857353},{id:`d-headwater-edge`,placeId:`D`,name:`D 위쪽 숲 발원지 관리 가장자리`,shortName:`발원지 가장자리`,tone:`headwater`,focus:{x:-5.35,z:-22.15},outline:[{x:-6.75,z:-22.95},{x:-6.2,z:-23.75},{x:-5.05,z:-24.05},{x:-4.15,z:-23.45},{x:-4.05,z:-22.35},{x:-4.4,z:-21.05},{x:-5.45,z:-20.55},{x:-6.45,z:-21.25}],soilColor:5200198}],p=[{id:`a-garden-drainage-outlet`,zoneId:`a-garden`,at:{x:-8.65,z:5},reach:.22},{id:`d-headwater-edge-drainage-outlet`,zoneId:`d-headwater-edge`,at:{x:-4.75,z:-21.38},reach:.24}],m=[{x:-3.55,z:-4.15},{x:-3.05,z:-4.95},{x:-2.62,z:-5.82},{x:-2.08,z:-6.7}],h=[{id:`a-well`,placeId:`A`,name:`A 정원 옆 우물`,shortName:`우물`,at:{x:-11.9,z:1.6},reach:1.4},{id:`b-stream-bank`,placeId:`B`,name:`B 개울의 물 뜨는 자리`,shortName:`개울`,at:{x:1.4,z:2.6},reach:1.55}],g=new Map(a.map(e=>[e.id,e]));function _(e){return h.map(t=>({source:t,distance:Math.sqrt(C(e,t.at))})).filter(({source:e,distance:t})=>t<=e.reach).sort((e,t)=>e.distance-t.distance)[0]?.source}function v(e,t){let n=3.2-t*.13,r=(e+11)**2+t**2,i=1.72*Math.exp(-r/72),a=Math.exp(-r/54),o=(Math.sin((e+5)*.19+t*.035)*.15+Math.cos(t*.145-e*.045)*.09+Math.sin(e*.47+t*.31)*.022)*(1-a*.72);return n+i+o}function y(e){let t=Math.max(0,Math.min(1,e));return t*t*(3-2*t)}function b(e){let t=T(e,u);if(t<=d.bedHalfWidth)return d.bedDepth;if(t>=d.bankHalfWidth)return 0;let n=(d.bankHalfWidth-t)/(d.bankHalfWidth-d.bedHalfWidth);return d.bedDepth*y(n)}function x(e,t){return v(e,t)-b({x:e,z:t})}function S(e,t){return v(e,t)-d.bedDepth+d.waterDepth}function C(e,t){return(e.x-t.x)**2+(e.z-t.z)**2}function w(e,t,n){let r=n.x-t.x,i=n.z-t.z,a=r*r+i*i;if(a===0)return Math.sqrt(C(e,t));let o=Math.max(0,Math.min(1,((e.x-t.x)*r+(e.z-t.z)*i)/a)),s={x:t.x+r*o,z:t.z+i*o};return Math.sqrt(C(e,s))}function T(e,t){let n=1/0;for(let r=0;r<t.length-1;r+=1)n=Math.min(n,w(e,t[r],t[r+1]));return n}function E(e,t){let n=!1;for(let r=0,i=t.length-1;r<t.length;i=r,r+=1){let a=t[r],o=t[i];a.z>e.z!=o.z>e.z&&e.x<(o.x-a.x)*(e.z-a.z)/(o.z-a.z)+a.x&&(n=!n)}return n}function D(e,t){if(E(e,t))return 0;let n=1/0;for(let r=0;r<t.length;r+=1)n=Math.min(n,w(e,t[r],t[(r+1)%t.length]));return n}function O(e,t,n=0){return E(e,t.outline)?n<=0||t.outline.every((r,i)=>w(e,r,t.outline[(i+1)%t.outline.length])>=n):!1}function k(e,t=0){return f.find(n=>O(e,n,t))}function A(e){let t=(e.x-n.x)/r.x,i=(e.z-n.z)/r.z;return t*t+i*i<=.97}function j(e){return T(e,u)<d.waterHalfWidth}function ee(e){return A(e)&&!j(e)}function M(e){return A(e)&&T(e,l)>=d.waterHalfWidth}function N(e){return a.filter(t=>C(e,t.center)<=t.radius*t.radius).sort((t,n)=>C(e,t.center)-C(e,n.center))[0]}function te(e,t){return C(e,t)<1e-4}function ne(){if(a.map(({id:e})=>e).join(`,`)!==`A,B,C,D,E,F`||o.length!==7)throw Error(`첫 지도의 A–F와 일곱 연결 계약이 달라졌습니다.`);if(f.map(({id:e})=>e).join(`,`)!==`a-garden,b-bright-soil,b-moist-soil,d-headwater-edge`)throw Error(`A 정원·B 두 흙자리·D 발원지 가장자리 계약이 달라졌습니다.`);for(let e of f){if(e.outline.length<3||!O(e.focus,e))throw Error(e.id+` 편집 흙자리의 외곽이 올바르지 않습니다.`);if(e.outline.some(e=>j(e)))throw Error(e.id+` 편집 흙자리가 본래 물길을 침범합니다.`)}if(p.map(({id:e})=>e).join(`,`)!==`a-garden-drainage-outlet,d-headwater-edge-drainage-outlet`)throw Error(`A 정원과 D 발원지 가장자리의 작은 배수 출구 계약이 달라졌습니다.`);for(let e of p){let t=f.find(({id:t})=>t===e.zoneId);if(!t||!O(e.at,t)||!Number.isFinite(e.reach)||e.reach<=0)throw Error(e.id+` 배수 출구가 정원 흙 가장자리에 닿지 않습니다.`)}if(m.length<2||m.some(e=>!Number.isFinite(e.x)||!Number.isFinite(e.z)))throw Error(`B에서 C로 이어지는 덮임 길 계약이 올바르지 않습니다.`);if(h.map(({id:e})=>e).join(`,`)!==`a-well,b-stream-bank`)throw Error(`A 우물과 B 개울의 물 뜨는 자리 계약이 달라졌습니다.`);for(let e of h){if(!ee(e.at))throw Error(e.id+` 물 뜨는 자리에 마른 땅으로 닿을 수 없습니다.`);if(k(e.at))throw Error(e.id+` 물 뜨는 자리가 가꿀 흙을 잡아먹습니다.`);if(C(e.at,i)<2.2**2)throw Error(e.id+` 물 뜨는 자리가 시작 위치에 너무 가까워 보이지 않습니다.`)}for(let e of o){let t=g.get(e.from),n=g.get(e.to);if(!t||!n||!te(e.points[0],t.center)||!te(e.points.at(-1),n.center))throw Error(e.id+` 연결선이 장소 중심에 닿지 않습니다.`)}if(s.length<2||!te(s[0],g.get(`D`).center)||s.some(e=>!ee(e)))throw Error(`D 너머 발원지 지선에 마른 땅으로 닿을 수 없습니다.`);if(c.length<2||!te(c.at(-1),u[c.length-1]))throw Error(`발원지 물축이 기존 바위 계류와 이어지지 않습니다.`);let e=[`D`,`A`,`B`,`E`,`F`].map(e=>{let t=g.get(e);return x(t.center.x,t.center.z)});if(!e.every((t,n)=>n===0||e[n-1]>t))throw Error(`D > A > B > E > F 높이 계약이 달라졌습니다.`);if(!ee(i))throw Error(`첫 시작점에서 걸을 수 없습니다.`)}var re=[...e,`d-headwater-edge`],ie=.68,ae=.24,oe=.48,se=.65,ce=1.6,le=.16,ue=.12,de=.18,fe=.72,pe=1.02,me={support:{halfLength:.22,halfWidth:.22,maximumSlope:.65},rack:{halfLength:.38,halfWidth:.26,maximumSlope:.45},fence:{halfLength:.52,halfWidth:.14,maximumSlope:.55},shade:{halfLength:.48,halfWidth:.38,maximumSlope:.35}},he={"low-flower":.42,"low-cover":.58,"surface-adjustment":.68,"terrain-patch":ie,"drainage-segment":le,structure:Math.hypot(me.shade.halfLength,me.shade.halfWidth)};function ge(e){if(e.kind===`structure`){let t=me[e.form];return Math.hypot(t.halfLength,t.halfWidth)}return e.kind===`drainage-segment`?Math.hypot(e.length/2,le):he[e.kind]}function _e(e,t,n){return Object.values(we(e)[t]).filter(e=>e.kind===`surface-adjustment`&&e.id!==n)}function P(e,t,n,r=0,i){let a=f.find(({id:e})=>e===t);if(!a)return!1;if(O(n,a,r))return!0;let o=fe-Math.min(.2,Math.max(0,r)*.38);return _e(e,t,i).some(e=>Math.hypot(e.at.x-n.x,e.at.z-n.z)<=o)}function ve(e,t,n=1.25){let r=Number.isFinite(n)?Math.max(0,n):0;return f.map(n=>{let r=D(t,n.outline),i=_e(e,n.id).reduce((e,n)=>Math.min(e,Math.max(0,Math.hypot(n.at.x-t.x,n.at.z-t.z)-fe)),1/0);return{zone:n,distance:Math.min(r,i)}}).filter(({distance:e})=>e<=r).sort((e,t)=>e.distance===t.distance?e.zone.id.localeCompare(t.zone.id):e.distance-t.distance)[0]?.zone}function ye(e,t,n,r){let i=f.find(({id:e})=>e===t);return i?O(n,i)||D(n,i.outline)<=.5184?!0:_e(e,t,r).some(e=>Math.hypot(e.at.x-n.x,e.at.z-n.z)<=pe):!1}function F(e){let t=e.length/2,n=Math.cos(e.rotation)*t,r=Math.sin(e.rotation)*t;return{from:{x:e.at.x-n,z:e.at.z-r},to:{x:e.at.x+n,z:e.at.z+r}}}function be(e,t,n,r){let i=Math.hypot(r.x-n.x,r.z-n.z),a=Math.abs(i-.65)<1e-9?se:Math.abs(i-1.6)<1e-9?ce:i;return{id:e,zoneId:t,kind:`drainage-segment`,at:{x:(n.x+r.x)/2,z:(n.z+r.z)/2},rotation:Math.atan2(r.z-n.z,r.x-n.x),length:a}}function xe(e){let t=me[e];return Math.hypot(t.halfLength,t.halfWidth)}function I(e){return Number.isFinite(e.x)&&Number.isFinite(e.z)}function Se(e,t,n=.1){let r=Math.hypot(t.x-e.x,t.z-e.z),i=Math.max(1,Math.ceil(r/n));return Array.from({length:i+1},(n,r)=>{let a=r/i;return{x:e.x+(t.x-e.x)*a,z:e.z+(t.z-e.z)*a}})}function Ce(e,t,n,r){return Math.min(...Se(e,t,.08).map(e=>w(e,n,r)),...Se(n,r,.08).map(n=>w(n,e,t)))}function we(e){return`current`in e?e.current:e}function L(e){if(!Number.isFinite(e)||e>=.6799999999990001)return 0;let t=Math.max(0,Math.min(1,1-e/ie));return t*t*(3-2*t)}function Te(e,t){if(e.kind!==`terrain-patch`)return 0;let n=Math.hypot(e.at.x-t.x,e.at.z-t.z);return(e.direction===`raise`?1:-1)*ae*L(n)}function R(e,t){let n=we(e),r=re.reduce((e,r)=>e+Object.values(n[r]).reduce((e,n)=>e+Te(n,t),0),0);return Math.max(-.48,Math.min(oe,r))}function z(e,t){let n=we(e),r=0;for(let e of re)for(let i of Object.values(n[e])){if(i.kind!==`drainage-segment`)continue;let e=F(i),n=w(t,e.from,e.to),a=Math.max(0,Math.min(1,1-n/le)),o=a*a*(3-2*a);r=Math.max(r,ue*o)}return r}function Ee(e,t,n){let r={x:t,z:n};return x(t,n)+R(e,r)-z(e,r)}function De(e,t,n){return Object.values(we(e)[t]).filter(e=>e.kind===`terrain-patch`).map(e=>({entry:e,distance:Math.hypot(e.at.x-n.x,e.at.z-n.z)})).filter(({distance:e})=>e<ie).sort((e,t)=>e.distance===t.distance?e.entry.id.localeCompare(t.entry.id):e.distance-t.distance)[0]?.entry}function Oe(e){return T(e,u)<=.68||T(e,s)<=1.36||o.some(t=>T(e,t.points)<=t.width/2+.68)}function ke(e,t){return T(e,u)<=d.bankHalfWidth+t||T(e,s)<=.68+t||o.some(n=>T(e,n.points)<=n.width/2+t)||T(e,m)<=t+.24}function Ae(e){return`at`in e?{at:e.at,radius:Number.isFinite(e.radius)?Math.max(0,e.radius):0}:{at:e,radius:0}}function je(e,t){return t.protectedGroundPoints?.some(t=>{let n=Ae(t);if(e.kind===`drainage-segment`){let t=F(e);return w(n.at,t.from,t.to)<.16+n.radius}return Math.hypot(e.at.x-n.at.x,e.at.z-n.at.z)<ge(e)+n.radius})??!1}function Me(e,t,n,r){return Object.values(e.state.current[t]).filter(e=>e.kind===n&&e.id!==r).length}function Ne(e,t,n){return Se(e,t).some(e=>T(e,u)<=d.bankHalfWidth+n||T(e,s)<=.68+n||o.some(t=>T(e,t.points)<=t.width/2+n)||T(e,m)<=n+.24)}function Pe(e){let t=xe(e.form);return T(e.at,u)<=d.bankHalfWidth+t||T(e.at,s)<=.68+t||o.some(n=>T(e.at,n.points)<=n.width/2+t)||T(e.at,m)<=t+.24}function Fe(e,t){let n=me[t.form],r=Math.cos(t.rotation),i=Math.sin(t.rotation),a=Ee(e.state,t.at.x,t.at.z),o=0;for(let[s,c]of[[-n.halfLength,-n.halfWidth],[-n.halfLength,n.halfWidth],[n.halfLength,-n.halfWidth],[n.halfLength,n.halfWidth],[-n.halfLength,0],[n.halfLength,0],[0,-n.halfWidth],[0,n.halfWidth]]){let n={x:t.at.x+s*r-c*i,z:t.at.z+s*i+c*r},l=Math.hypot(s,c);o=Math.max(o,Math.abs(Ee(e.state,n.x,n.z)-a)/l)}return o}function Ie(e,t){let n=F(e),r=F(t);return[{left:n.from,right:r.from,leftOther:n.to,rightOther:r.to},{left:n.from,right:r.to,leftOther:n.to,rightOther:r.from},{left:n.to,right:r.from,leftOther:n.from,rightOther:r.to},{left:n.to,right:r.to,leftOther:n.from,rightOther:r.from}].filter(({left:e,right:t})=>Math.hypot(e.x-t.x,e.z-t.z)<=de)}function Le(e,t){let n=F(e),r=F(t);if(Ce(n.from,n.to,r.from,r.to)>=.34)return!1;let i=Ie(e,t);if(i.length!==1)return!0;let a=i[0],o={x:a.leftOther.x-a.left.x,z:a.leftOther.z-a.left.z},s={x:a.rightOther.x-a.right.x,z:a.rightOther.z-a.right.z};return(o.x*s.x+o.z*s.z)/(Math.hypot(o.x,o.z)*Math.hypot(s.x,s.z))>Math.cos(Math.PI/5)}function Re(e,t,n={},r){if(t.zoneId!==`a-garden`&&t.zoneId!==`d-headwater-edge`)return`drainage-zone-only`;if(!I(t.at)||!Number.isFinite(t.rotation)||!Number.isFinite(t.length)||t.length<.65||t.length>1.6)return`drainage-length`;if(Me(e,t.zoneId,`drainage-segment`,r)>=8)return`drainage-limit`;let i=f.find(({id:e})=>e===t.zoneId),a=F(t);if(!i||Se(a.from,a.to).some(e=>!O(e,i,.16)))return`outside-edit-zone`;if(Ne(a.from,a.to,.16))return`protected-ground`;if(je(t,n))return`occupied`;for(let n of Object.values(e.state.current[t.zoneId])){if(n.id===r||n.kind===`terrain-patch`||n.kind===`surface-adjustment`)continue;if(n.kind===`drainage-segment`){if(Le(t,n))return`overlap`;continue}let e=ge(n);if(w(n.at,a.from,a.to)<.16+e)return`overlap`}}function ze(e,t,n={},r){if(!me[t.form]||!I(t.at)||!Number.isFinite(t.rotation))return`kind-not-allowed`;if(Me(e,t.zoneId,`structure`,r)>=8)return`structure-limit`;let i=xe(t.form),a=f.find(({id:e})=>e===t.zoneId);if(!a||!O(t.at,a,i))return`outside-edit-zone`;if(Pe(t))return`protected-ground`;if(je(t,n))return`occupied`;if(Fe(e,t)>me[t.form].maximumSlope)return`ground-too-steep`;for(let n of Object.values(e.state.current[t.zoneId]))if(!(n.id===r||n.kind!==`drainage-segment`&&n.kind!==`structure`)){if(n.kind===`drainage-segment`){let e=F(n);if(w(t.at,e.from,e.to)<i+.16)return`overlap`;continue}if(Math.hypot(t.at.x-n.at.x,t.at.z-n.at.z)<i+xe(n.form))return`overlap`}}function Be(e){return{"a-garden":e(),"b-bright-soil":e(),"b-moist-soil":e(),"d-headwater-edge":e()}}function Ve(){return{current:Be(()=>({})),nextId:1,revision:0}}function He(e){return Object.fromEntries(Object.entries(e).map(([e,t])=>[e,{...t,at:{x:t.at.x,z:t.at.z}}]))}function Ue(e){return{current:{"a-garden":He(e.current[`a-garden`]),"b-bright-soil":He(e.current[`b-bright-soil`]),"b-moist-soil":He(e.current[`b-moist-soil`]),"d-headwater-edge":He(e.current[`d-headwater-edge`])},nextId:e.nextId,revision:e.revision}}function We(e){return{current:{"a-garden":He(e.current[`a-garden`]),"b-bright-soil":He(e.current[`b-bright-soil`]),"b-moist-soil":He(e.current[`b-moist-soil`])},nextId:e.nextId,revision:e.revision}}function Ge(e){let t=We(e);return{current:{...t.current,"d-headwater-edge":{}},nextId:t.nextId,revision:t.revision}}function Ke(e=Ve()){return{state:Ue(`d-headwater-edge`in e.current?e:Ge(e)),history:Be(()=>[])}}function qe(e){return Ue(e.state)}function Je(e,t,n,r){return r.occupiedEntryIds?.some(r=>{let i=e.state.current[t][r];if(!i)return!1;let a=n[r];return!a||!tt(i,a)})??!1}function Ye(e,t,n,r){if(!r.protectedGroundPoints?.length)return!1;let i=e.state.current[t],a=new Set([...Object.keys(i),...Object.keys(n)]);for(let e of a){let t=i[e],a=n[e];if([t?.kind,a?.kind].some(e=>e===`terrain-patch`||e===`drainage-segment`||e===`structure`)&&(!t||!a||!tt(t,a))&&(t&&je(t,r)||a&&je(a,r)))return!0}return!1}function Xe(e,t,n={}){let r=e.history[t].at(-1);return r!==void 0&&!Je(e,t,r,n)&&!Ye(e,t,r,n)}function Ze(e,t,n,r,i){if(n===`drainage-segment`||n===`structure`||t===`d-headwater-edge`&&n!==`low-cover`&&n!==`terrain-patch`)return`kind-not-allowed`;let a=f.find(({id:e})=>e===t);if(n===`terrain-patch`&&Oe(r))return`protected-ground`;if(!a)return`outside-edit-zone`;let o=O(r,a,he[n]);if(n===`surface-adjustment`){if(!ye(e.state,t,r,i))return`outside-edit-zone`;if(!o&&ke(r,.72))return`protected-ground`}else if((n===`low-flower`||n===`low-cover`)&&!P(e.state,t,r,he[n]))return`outside-edit-zone`;else if(n!==`low-flower`&&n!==`low-cover`&&!o)return`outside-edit-zone`;return n===`terrain-patch`&&Object.values(e.state.current[t]).filter(e=>e.kind===`terrain-patch`&&e.id!==i).length>=12?`terrain-patch-limit`:Object.values(e.state.current[t]).some(e=>{if(e.id===i||(e.kind===`terrain-patch`||n===`terrain-patch`)&&e.kind!==n||(e.kind===`surface-adjustment`||n===`surface-adjustment`)&&e.kind!==n||e.kind===`structure`)return!1;if(e.kind===`drainage-segment`){let t=F(e);return w(r,t.from,t.to)<he[n]+.16}let t=(n===`low-flower`||n===`low-cover`)&&(e.kind===`low-flower`||e.kind===`low-cover`),a=n===`terrain-patch`?.46:n===`surface-adjustment`?.5:t?n===`low-cover`&&e.kind===`low-cover`?.3:n===`low-flower`&&e.kind===`low-flower`?.22:.25:(he[e.kind]+he[n])*.68;return(e.at.x-r.x)**2+(e.at.z-r.z)**2<a**2})?`overlap`:void 0}function Qe(e,t,n,r){return Object.values(e.state.current[t]).some(e=>{if(e.id===r)return!1;if(e.kind===`structure`)return Math.hypot(e.at.x-n.x,e.at.z-n.z)<xe(e.form)+ie;if(e.kind===`drainage-segment`){let t=F(e);return w(n,t.from,t.to)<.8400000000000001}return!1})}function $e(e,t){return{session:e,changed:!1,rejection:t}}function et(e,t,n,r=e.state.nextId){let i=e.history[t];return{state:{current:{...e.state.current,[t]:n},nextId:r,revision:e.state.revision+1},history:{...e.history,[t]:[...i,e.state.current[t]].slice(-24)}}}function tt(e,t){return e.id===t.id&&e.zoneId===t.zoneId&&e.kind===t.kind&&e.at.x===t.at.x&&e.at.z===t.at.z&&e.rotation===t.rotation&&(e.kind!==`low-flower`||t.kind===`low-flower`&&e.thinned===t.thinned)&&(e.kind!==`terrain-patch`||t.kind===`terrain-patch`&&e.direction===t.direction)&&(e.kind!==`drainage-segment`||t.kind===`drainage-segment`&&e.length===t.length)&&(e.kind!==`structure`||t.kind===`structure`&&e.form===t.form)}function nt(e,t,n){let r={...e.state.current[t]};delete r[n];let i={...e.state.current,[t]:r};return Object.values(r).some(e=>(e.kind===`low-flower`||e.kind===`low-cover`)&&!P(i,t,e.at,he[e.kind]))}function rt(e,t,n={}){if(!re.includes(t.zoneId))return $e(e,`unknown-edit-zone`);if(t.type===`place`&&t.kind!==`low-flower`&&t.kind!==`low-cover`||t.type===`shape-ground`&&t.direction!==`raise`&&t.direction!==`lower`||t.type===`place-structure`&&!Object.hasOwn(me,t.form))return $e(e,`kind-not-allowed`);if(t.type===`undo`){let r=e.history[t.zoneId],i=r.at(-1);return i?Je(e,t.zoneId,i,n)||Ye(e,t.zoneId,i,n)?$e(e,`occupied`):{changed:!0,session:{state:{current:{...e.state.current,[t.zoneId]:i},nextId:e.state.nextId,revision:e.state.revision+1},history:{...e.history,[t.zoneId]:r.slice(0,-1)}}}:$e(e,`nothing-to-undo`)}if(t.type===`place`||t.type===`adjust-ground`||t.type===`shape-ground`){let r=t.type===`adjust-ground`?`surface-adjustment`:t.type===`shape-ground`?`terrain-patch`:t.kind,i=Ze(e,t.zoneId,r,t.at);if(i)return $e(e,i);let a=`edit-`+String(e.state.nextId),o={id:a,zoneId:t.zoneId,at:{x:t.at.x,z:t.at.z},rotation:t.rotation??0},s;return s=t.type===`shape-ground`?{...o,kind:`terrain-patch`,direction:t.direction}:t.type===`place`&&t.kind===`low-flower`?{...o,kind:`low-flower`,thinned:!1}:t.type===`place`?{...o,kind:`low-cover`}:{...o,kind:`surface-adjustment`},s.kind===`terrain-patch`&&Qe(e,t.zoneId,s.at)||je(s,n)?$e(e,`occupied`):{session:et(e,t.zoneId,{...e.state.current[t.zoneId],[a]:s},e.state.nextId+1),changed:!0,entryId:a}}if(t.type===`place-drainage`){if(!I(t.from)||!I(t.to))return $e(e,`drainage-length`);let r=`edit-`+String(e.state.nextId),i=be(r,t.zoneId,t.from,t.to),a=Re(e,i,n);return a?$e(e,a):{session:et(e,t.zoneId,{...e.state.current[t.zoneId],[r]:i},e.state.nextId+1),changed:!0,entryId:r}}if(t.type===`place-structure`){let r=`edit-`+String(e.state.nextId),i={id:r,zoneId:t.zoneId,kind:`structure`,form:t.form,at:{x:t.at.x,z:t.at.z},rotation:t.rotation??0},a=ze(e,i,n);return a?$e(e,a):{session:et(e,t.zoneId,{...e.state.current[t.zoneId],[r]:i},e.state.nextId+1),changed:!0,entryId:r}}let r=e.state.current[t.zoneId][t.id];if(!r)return $e(e,`unknown-entry`);if(n.occupiedEntryIds?.includes(r.id))return $e(e,`occupied`);if(t.type===`thin`)return r.kind===`low-flower`?r.thinned?$e(e,`already-thinned`):{session:et(e,t.zoneId,{...e.state.current[t.zoneId],[r.id]:{...r,thinned:!0}}),changed:!0,entryId:r.id}:$e(e,`kind-not-allowed`);if(t.type===`move`){if(r.kind===`surface-adjustment`||r.kind===`terrain-patch`)return $e(e,`kind-not-allowed`);let i={...r,at:{x:t.to.x,z:t.to.z},rotation:t.rotation??r.rotation};if(je(r,n)||je(i,n))return $e(e,`occupied`);let a=i.kind===`drainage-segment`?Re(e,i,n,r.id):i.kind===`structure`?ze(e,i,n,r.id):Ze(e,t.zoneId,i.kind,i.at,r.id);return a?$e(e,a):{session:et(e,t.zoneId,{...e.state.current[t.zoneId],[r.id]:i}),changed:!0,entryId:r.id}}if(t.type===`rotate`){if(r.kind!==`drainage-segment`&&r.kind!==`structure`||!Number.isFinite(t.rotation))return $e(e,`kind-not-allowed`);if(je(r,n))return $e(e,`occupied`);let i={...r,rotation:t.rotation},a=i.kind===`drainage-segment`?Re(e,i,n,r.id):ze(e,i,n,r.id);return a?$e(e,a):{session:et(e,t.zoneId,{...e.state.current[t.zoneId],[r.id]:i}),changed:!0,entryId:r.id}}if(t.type===`retrieve`&&(r.kind===`surface-adjustment`||r.kind===`terrain-patch`||r.kind===`drainage-segment`)||t.type===`restore-ground`&&r.kind!==`surface-adjustment`)return $e(e,`kind-not-allowed`);if(t.type===`restore-ground`&&r.kind===`surface-adjustment`&&nt(e,t.zoneId,r.id))return $e(e,`occupied`);if(t.type===`restore-terrain`){if(r.kind!==`terrain-patch`)return $e(e,`kind-not-allowed`);if(je(r,n)||Qe(e,t.zoneId,r.at,r.id))return $e(e,`occupied`)}if(t.type===`restore-drainage`){if(r.kind!==`drainage-segment`)return $e(e,`kind-not-allowed`);if(je(r,n))return $e(e,`occupied`)}if(t.type===`retrieve`&&r.kind===`structure`&&je(r,n))return $e(e,`occupied`);let i={...e.state.current[t.zoneId]};return delete i[r.id],{session:et(e,t.zoneId,i),changed:!0,entryId:r.id}}function it(e){return typeof e==`object`&&!!e&&!Array.isArray(e)}function at(e){return typeof e==`number`&&Number.isFinite(e)}function ot(e,t){let n=Object.keys(e).sort(),r=[...t].sort();return n.length===r.length&&n.every((e,t)=>e===r[t])}function st(e,t,n,r){if(!it(e)||e.id!==t||e.zoneId!==n||e.kind!==`low-flower`&&e.kind!==`low-cover`&&e.kind!==`surface-adjustment`&&e.kind!==`terrain-patch`&&e.kind!==`drainage-segment`&&e.kind!==`structure`||r===`legacy`&&e.kind===`terrain-patch`||r!==`v5`&&r!==`v6`&&(e.kind===`drainage-segment`||e.kind===`structure`)||!it(e.at)||!at(e.at.x)||!at(e.at.z)||!at(e.rotation))return;if(r===`v5`||r===`v6`){let t=e.kind===`low-flower`?`thinned`:e.kind===`terrain-patch`?`direction`:e.kind===`drainage-segment`?`length`:e.kind===`structure`?`form`:void 0,n=[`id`,`zoneId`,`kind`,`at`,`rotation`];if(t&&n.push(t),!ot(e,n)||!ot(e.at,[`x`,`z`]))return}let i={id:t,zoneId:n,at:{x:e.at.x,z:e.at.z},rotation:e.rotation};return e.kind===`low-flower`?(r===`v5`||r===`v6`)&&typeof e.thinned!=`boolean`||r!==`v5`&&r!==`v6`&&e.thinned!==void 0&&typeof e.thinned!=`boolean`?void 0:{...i,kind:e.kind,thinned:typeof e.thinned==`boolean`&&e.thinned}:e.kind===`terrain-patch`?e.direction!==`raise`&&e.direction!==`lower`?void 0:{...i,kind:e.kind,direction:e.direction}:e.kind===`drainage-segment`?!at(e.length)||e.length<.65||e.length>1.6?void 0:{...i,kind:e.kind,length:e.length}:e.kind===`structure`?e.form!==`support`&&e.form!==`rack`&&e.form!==`fence`&&e.form!==`shade`?void 0:{...i,kind:e.kind,form:e.form}:{...i,kind:e.kind}}function ct(t,n,r){if(!it(t)||!it(t.current)||(n===`v5`||n===`v6`)&&(!ot(t,[`current`,`nextId`,`revision`])||!ot(t.current,r))||!Number.isSafeInteger(t.nextId)||t.nextId<1||!Number.isSafeInteger(t.revision)||t.revision<0)return;let i=Object.fromEntries(r.map(e=>[e,{}])),a=new Set,o=0;for(let e of r){let r=t.current[e];if(!it(r))return;for(let[t,s]of Object.entries(r)){let r=/^edit-(\d+)$/.exec(t),c=st(s,t,e,n);if(!r||!c||a.has(t))return;let l=Number(r[1]);if(!Number.isSafeInteger(l)||l<1)return;a.add(t),o=Math.max(o,l),i[e][t]=c}}let s=t.nextId,c=t.revision;if(s<=o)return;let l=r.length===e.length,u={current:i,nextId:s,revision:c},d=Ke(l?Ge(u):u);for(let e of r)for(let t of Object.values(i[e]))if(t.kind===`drainage-segment`?Re(d,t,{},t.id):t.kind===`structure`?ze(d,t,{},t.id):Ze(d,e,t.kind,t.at,t.id))return;return l?We(u):Ue(u)}function lt(e){return ct(e,`v6`,re)}function ut(t){return ct(t,`v5`,e)}function dt(t){return ct(t,`v4`,e)}function ft(t){return ct(t,`legacy`,e)}function pt(e){return`current`in e?e.current:e}function mt(e,t){return Math.hypot(e.at.x-t.at.x,e.at.z-t.at.z)}function ht(e){let t=F(e);return[{entryId:e.id,end:`from`,at:t.from},{entryId:e.id,end:`to`,at:t.to}]}function gt(e,t=`a-garden`){let n=Object.values(pt(e)[t]).filter(e=>e.kind===`drainage-segment`).sort((e,t)=>e.id.localeCompare(t.id)),r=n.flatMap(ht),i=[],a=new Map(n.map(e=>[e.id,new Set]));for(let e=0;e<r.length;e+=1){let t=r[e];for(let n=e+1;n<r.length;n+=1){let e=r[n];t.entryId===e.entryId||mt(t,e)>.18||(i.push({left:t,right:e,at:{x:(t.at.x+e.at.x)/2,z:(t.at.z+e.at.z)/2}}),a.get(t.entryId).add(e.entryId),a.get(e.entryId).add(t.entryId))}}let o=p.filter(e=>e.zoneId===t),s=r.flatMap(e=>o.flatMap(t=>{let n=Math.hypot(e.at.x-t.at.x,e.at.z-t.at.z);return n<=t.reach?[{entryId:e.entryId,end:e.end,outletId:t.id,at:e.at,distance:n}]:[]})).sort((e,t)=>e.entryId.localeCompare(t.entryId)||e.end.localeCompare(t.end)||e.outletId.localeCompare(t.outletId)),c=[],l=new Set;for(let e of n){if(l.has(e.id))continue;let t=[e.id],n=[];for(;t.length>0;){let e=t.shift();l.has(e)||(l.add(e),n.push(e),t.push(...[...a.get(e)??[]].filter(e=>!l.has(e)).sort((e,t)=>e.localeCompare(t))))}n.sort((e,t)=>e.localeCompare(t));let r=s.filter(({entryId:e})=>n.includes(e));c.push({id:n[0],entryIds:n,state:r.length>0?`outflow`:`holding`,outletConnections:r})}return{zoneId:t,state:n.length===0?`none`:c.some(e=>e.state===`outflow`)?`outflow`:`holding`,segments:n,endpoints:r,connections:i,outletConnections:s,components:c}}function _t(e,t=`a-garden`){return gt(e,t).state}function vt(e,t,n){let r=e.segments.map(e=>{let n=F(e);return{segment:e,distance:w(t,n.from,n.to)}}).filter(({distance:e})=>e<=n).sort((e,t)=>e.distance-t.distance||e.segment.id.localeCompare(t.segment.id))[0];return r?e.components.find(e=>e.entryIds.includes(r.segment.id)):void 0}function yt(e,t,n,r=.3){return!Number.isFinite(r)||r<0?[]:[...vt(gt(e,t),n,r)?.entryIds??[]]}function bt(e,t,n,r=.3){return!Number.isFinite(r)||r<0?`none`:vt(gt(e,t),n,r)?.state??`none`}var xt={lightInfluence:{"low-flower":.3,"low-cover":.7},laneClearance:{"low-flower":.2,"low-cover":.42},dappledSampleShare:.18,shadedSampleShare:.56,openLaneShare:.5,coverSampleRadius:.68,denseCoverSampleShare:.7,localCoverStep:1.35,managedCoverStep:1.3},St={"a-garden":{moistureSource:`drying-exposed`},"b-bright-soil":{moistureSource:`drying-exposed`},"b-moist-soil":{moistureSource:`water-edge`}},Ct=Object.freeze({shallowSlowWaterEdge:!0,cRefuge:!0,naturalBCLink:`connected`}),wt=(e,t)=>[-1,0,1].flatMap(n=>[-1,0,1].map(r=>({x:r*e,z:n*t}))),Tt={"a-garden":{baselineLight:`bright`,sampleOffsets:wt(1.05,.7),lanes:[{from:{x:-1.45,z:-.72},to:{x:1.45,z:-.72}},{from:{x:-1.45,z:0},to:{x:1.45,z:0}},{from:{x:-1.45,z:.72},to:{x:1.45,z:.72}},{from:{x:-.9,z:-.95},to:{x:-.9,z:.95}},{from:{x:.9,z:-.95},to:{x:.9,z:.95}}]},"b-bright-soil":{baselineLight:`bright`,sampleOffsets:wt(.62,.48),lanes:[{from:{x:-.78,z:-.48},to:{x:.78,z:-.48}},{from:{x:-.78,z:.48},to:{x:.78,z:.48}},{from:{x:-.62,z:-.62},to:{x:.62,z:.62}},{from:{x:-.62,z:.62},to:{x:.62,z:-.62}}]},"b-moist-soil":{baselineLight:`dappled`,sampleOffsets:wt(.62,.48),lanes:[{from:{x:-.78,z:-.48},to:{x:.78,z:-.48}},{from:{x:-.78,z:.48},to:{x:.78,z:.48}},{from:{x:-.62,z:-.62},to:{x:.62,z:.62}},{from:{x:-.62,z:.62},to:{x:.62,z:-.62}}]}};function Et(e,t){return{x:e.x+t.x,z:e.z+t.z}}function Dt(e,t){return(e.x-t.x)**2+(e.z-t.z)**2}function Ot(e,t,n){let r=n.x-t.x,i=n.z-t.z,a=r*r+i*i;if(a===0)return Math.sqrt(Dt(e,t));let o=Math.max(0,Math.min(1,((e.x-t.x)*r+(e.z-t.z)*i)/a));return Math.hypot(e.x-(t.x+o*r),e.z-(t.z+o*i))}function kt(e){return e.filter(e=>e.kind===`low-flower`||e.kind===`low-cover`)}function At(e){return e.filter(e=>e.kind===`structure`)}function jt(e,t){let n=t.x-e.at.x,r=t.z-e.at.z,i=Math.cos(e.rotation),a=Math.sin(e.rotation);return{x:i*n+a*r,z:-a*n+i*r}}function Mt(e,t){if(e.form===`support`)return 0;let n=jt(e,t),r={rack:{halfX:.7,halfZ:.5,amount:.34},fence:{halfX:.74,halfZ:.24,amount:.12},shade:{halfX:.78,halfZ:.72,amount:1}}[e.form];return Math.abs(n.x)<=r.halfX&&Math.abs(n.z)<=r.halfZ?r.amount:0}function Nt(e,t,n){return(t.x-e.x)*(n.z-e.z)-(t.z-e.z)*(n.x-e.x)}function Pt(e,t,n,r){let i=Nt(e,t,n),a=Nt(e,t,r),o=Nt(n,r,e),s=Nt(n,r,t),c=(e,t,n)=>e.x>=Math.min(t.x,n.x)-1e-6&&e.x<=Math.max(t.x,n.x)+1e-6&&e.z>=Math.min(t.z,n.z)-1e-6&&e.z<=Math.max(t.z,n.z)+1e-6;return Math.abs(i)<1e-6&&c(n,e,t)||Math.abs(a)<1e-6&&c(r,e,t)||Math.abs(o)<1e-6&&c(e,n,r)||Math.abs(s)<1e-6&&c(t,n,r)?!0:i*a<0&&o*s<0}function Ft(e,t,n,r){return Pt(e,t,n,r)?0:Math.min(Ot(e,n,r),Ot(t,n,r),Ot(n,e,t),Ot(r,e,t))}function It(e,t){let n=Math.cos(e.rotation),r=Math.sin(e.rotation);return{from:{x:e.at.x-n*t,z:e.at.z-r*t},to:{x:e.at.x+n*t,z:e.at.z+r*t}}}function Lt(e,t){if(e.form===`support`)return!1;let n={rack:{halfLength:.58,clearance:.16},fence:{halfLength:.68,clearance:.22},shade:{halfLength:.58,clearance:.46}}[e.form],r=It(e,n.halfLength);return Ft(r.from,r.to,t.from,t.to)<=n.clearance}function Rt(e,t){return kt(e).flatMap(e=>{let n=e.kind===`low-flower`&&t?Zt(t.byEntryId[e.id],e.thinned):1;return n>0?[{entry:e,weight:n}]:[]})}function zt(e,t){return t.sampleOffsets.map(t=>Et(e.focus,t)).filter(t=>O(t,e,.05))}function Bt(e,t){return t.lanes.map(t=>({from:Et(e.focus,t.from),to:Et(e.focus,t.to)})).filter(t=>O(t.from,e,.02)&&O(t.to,e,.02))}function Vt(e,t,n,r,i){let a=e.reduce((e,r)=>{let a=t.reduce((e,{entry:t,weight:n})=>{let a=i.lightInfluence[t.kind];return Dt(r,t.at)<=a**2?Math.min(1,e+n):e},0),o=n.reduce((e,t)=>Math.min(1,e+Mt(t,r)),0);return e+Math.min(1,a+o)},0),o=e.length===0?0:a/e.length;return o>=i.shadedSampleShare?`shaded`:o>=i.dappledSampleShare?r===`bright`?`dappled`:`shaded`:r}function Ht(e,t,n,r){let i=e.filter(e=>t.every(({entry:t,weight:n})=>Ot(t.at,e.from,e.to)>r.laneClearance[t.kind]*n)&&n.every(t=>!Lt(t,e)));return i.length===0?{state:`sheltered`}:{state:i.length/Math.max(1,e.length)>=r.openLaneShare?`open`:`pockets`,airLane:i[0]}}function Ut(e,t){let n=0,r=new Set;for(let i of e){if(r.has(i.id))continue;let a=[i];r.add(i.id);let o=0;for(;a.length>0;){let n=a.pop();if(n){o+=1;for(let i of e)!r.has(i.id)&&Dt(n.at,i.at)<=t**2&&(r.add(i.id),a.push(i))}}n=Math.max(n,o)}return n}function Wt(e,t,n){return e.length===0?0:e.filter(e=>t.some(t=>Dt(e,t.at)<=n**2)).length/e.length}function Gt(e,t,n){return t.length===0?`open-ground`:Wt(e,t,n.coverSampleRadius)>=n.denseCoverSampleShare?`dense`:Ut(t,n.localCoverStep)>=2?`linked`:`patches`}function Kt(e,t,n,r,i,a){let o=f.find(({id:e})=>e===t);if(!o)throw Error(t+` 국소 환경 자리를 찾지 못했습니다.`);let s=Tt[t],c=Object.values(e[t]),l=kt(c),u=At(c),d=Rt(l,a),p=l.filter(e=>e.kind===`low-cover`),m=zt(o,s),h=Ht(Bt(o,s),d,u,r);return{zoneId:t,light:Vt(m,d,u,s.baselineLight,r),opening:h.state,surfaceMoisture:i?.[t]??(n[t].moistureSource===`drying-exposed`?`dry`:`moist`),lowCover:Gt(m,p,r),drainage:_t(e,t),...h.airLane?{airLane:h.airLane}:{}}}function qt(e,t){let n=m[0];if(!n)return[];let r=new Map,i=e.filter(e=>Dt(e.at,n)<=t.managedCoverStep**2);for(i.forEach(e=>r.set(e.id,e));i.length>0;){let n=i.shift();if(n)for(let a of e)!r.has(a.id)&&Dt(n.at,a.at)<=t.managedCoverStep**2&&(r.set(a.id,a),i.push(a))}return[...r.values()].sort((e,t)=>{let r=Dt(e.at,n)-Dt(t.at,n);return r===0?e.id.localeCompare(t.id):r})}function Jt(e,t,n){let r=Object.values(e[`b-moist-soil`]).filter(e=>e.kind===`low-cover`),i=qt(r,n);return{protectedFoundation:Ct,managedCover:r.length===0?`open-edge`:t.lowCover===`dense`?`dense`:i.length>0?`joined`:`patches`,connectedCover:i.map(e=>({id:e.id,at:{x:e.at.x,z:e.at.z}}))}}function Yt(e,t=St,n=xt,r,i){let a=e.current,o={"a-garden":Kt(a,`a-garden`,t,n,r,i),"b-bright-soil":Kt(a,`b-bright-soil`,t,n,r,i),"b-moist-soil":Kt(a,`b-moist-soil`,t,n,r,i)};return{editRevision:e.revision,zones:o,bToC:Jt(a,o[`b-moist-soil`],n)}}var Xt=Object.freeze({growthPerSecond:1,stageStarts:Object.freeze({sprout:12,young:36,adult:90}),moistureMultiplier:Object.freeze({dry:0,moist:1}),lightMultiplier:Object.freeze({bright:1,dappled:.76,shaded:.38}),coverMultiplier:Object.freeze({"open-ground":1,patches:.9,linked:.7,dense:.45}),crowdingMultiplier:Object.freeze({spacious:1,close:.72,overcrowded:.24}),rotRiskMultiplier:.08});function Zt(e,t=!1,n=Xt){if(!e)return 0;let r=mn(e,e.plantedAtElapsed,n);return(r.stage===`seed`?0:r.stage===`sprout`?.2+r.stageProgress*.15:r.stage===`young`?.55+r.stageProgress*.35:1)*(t?.62:1)}function Qt(e){return Number.isFinite(e)?Math.max(0,e):0}var $t=1e9;function en(e){return Math.round(Qt(e)*$t)/$t}function tn(e){return Number.isFinite(e)?Math.max(0,e):0}function nn(e){let{sprout:t,young:n,adult:r}=e.stageStarts;return Number.isFinite(t)&&Number.isFinite(n)&&Number.isFinite(r)&&t>0&&n>t&&r>n}function rn(t){return e.flatMap(e=>Object.values(t.current[e]).flatMap(t=>t.kind===`low-flower`?[{...t,zoneId:e}]:[]))}function an(e,t){let n;for(let r of rn(e))if(r.id===t){n=r;break}if(!n)return{state:`spacious`,pressure:0,coverPressure:0};let r=Object.values(e.current[n.zoneId]),i=0,a=0;for(let e of r){if(e.id===n.id)continue;let t=Math.hypot(e.at.x-n.at.x,e.at.z-n.at.z);if(e.kind===`low-flower`&&t<.78)i+=(1-t/.78)*(e.thinned?.56:1);else if(e.kind===`low-cover`&&t<.66){let e=(1-t/.66)*.74;i+=e,a+=e}}i*=n.thinned?.78:1;let o=Math.round(Math.max(0,i)*1e6)/1e6;return{state:o>=1.05?`overcrowded`:o>=.35?`close`:`spacious`,pressure:o,coverPressure:Math.round(Math.max(0,a)*1e6)/1e6}}function on(e,t){let n=typeof e==`string`?e:e.state,r=typeof e!=`string`&&e.coverPressure>=.55;return n===`overcrowded`&&t.surfaceMoisture===`moist`&&(t.lowCover===`dense`||r)}function sn(e,t){return e?.plantedAtElapsed===t.plantedAtElapsed&&e.accumulatedGrowth===t.accumulatedGrowth}function cn(){return{byEntryId:{}}}function ln(e,t,n){let r=Qt(n),i={};for(let n of rn(t))i[n.id]=e.byEntryId[n.id]??{plantedAtElapsed:r,accumulatedGrowth:0};let a=Object.keys(e.byEntryId),o=Object.keys(i);return a.length===o.length&&o.every(t=>sn(e.byEntryId[t],i[t]))?e:{byEntryId:i}}function un(e,t=Xt){return nn(t)?tn(t.growthPerSecond)*tn(t.moistureMultiplier[e.surfaceMoisture])*tn(t.lightMultiplier[e.light])*tn(t.coverMultiplier[e.lowCover])*tn(t.crowdingMultiplier[e.crowding??`spacious`])*(e.rotRisk?tn(t.rotRiskMultiplier):1):0}function dn(e,t,n){let r=ln(e,t,n.worldElapsed);if(!n.worldRunning)return r;let i=Qt(n.deltaSeconds);if(i===0)return r;let a=n.tuning??Xt,o={...r.byEntryId},s=!1;for(let e of rn(t)){let c=r.byEntryId[e.id];if(!c)continue;let l=n.environment.zones[e.zoneId],u=an(t,e.id),d=i*un({...l,crowding:u.state,rotRisk:on(u,l)},a);if(d<=0)continue;let f=en(Math.min(a.stageStarts.adult,Qt(c.accumulatedGrowth)+d));f!==c.accumulatedGrowth&&(o[e.id]={...c,accumulatedGrowth:f},s=!0)}return s?{byEntryId:o}:r}function fn(e,t=Xt){if(!nn(t))return`seed`;let n=Qt(e);return n>=t.stageStarts.adult?`adult`:n>=t.stageStarts.young?`young`:n>=t.stageStarts.sprout?`sprout`:`seed`}function pn(e,t,n){if(!nn(n))return 0;if(t===`adult`)return 1;let r=Qt(e),i=t===`seed`?0:n.stageStarts[t],a=t===`seed`?n.stageStarts.sprout:t===`sprout`?n.stageStarts.young:n.stageStarts.adult;return Math.max(0,Math.min(1,(r-i)/(a-i)))}function mn(e,t,n=Xt){let r=Qt(e.accumulatedGrowth),i=fn(r,n);return{stage:i,stageProgress:pn(r,i,n),ageSeconds:Math.max(0,Qt(t)-Qt(e.plantedAtElapsed)),accumulatedGrowth:r,adult:i===`adult`}}function hn(e,t=Xt){return fn(e.accumulatedGrowth,t)===`adult`}function gn(e){return typeof e==`object`&&!!e&&!Array.isArray(e)}function _n(e,t){let n=Object.keys(e).sort(),r=[...t].sort();return n.length===r.length&&n.every((e,t)=>e===r[t])}function vn(e,t){if(!gn(e)||!_n(e,[`byEntryId`])||!gn(e.byEntryId))return;let n=new Set(rn(t).map(e=>e.id)),r=Object.entries(e.byEntryId);if(r.length!==n.size)return;let i={};for(let[e,t]of r){if(!n.has(e)||!gn(t)||!_n(t,[`plantedAtElapsed`,`accumulatedGrowth`])||typeof t.plantedAtElapsed!=`number`||!Number.isFinite(t.plantedAtElapsed)||t.plantedAtElapsed<0||typeof t.accumulatedGrowth!=`number`||!Number.isFinite(t.accumulatedGrowth)||t.accumulatedGrowth<0||t.accumulatedGrowth>Xt.stageStarts.adult)return;i[e]={plantedAtElapsed:t.plantedAtElapsed,accumulatedGrowth:t.accumulatedGrowth}}return{byEntryId:i}}function yn(e,t,n=Xt){let r=Qt(t),i=nn(n)?n.stageStarts.adult:0;return{byEntryId:Object.fromEntries(rn(e).map(e=>[e.id,{plantedAtElapsed:r,accumulatedGrowth:i}]))}}var bn=Object.freeze({shade:.34,retention:.4,continuity:.5}),xn=`d-headwater-edge`,Sn=f.find(({id:e})=>e===xn),Cn=p.find(({zoneId:e})=>e===xn);function wn(e){return Math.max(0,Math.min(1,e))}function Tn(e){return Number.isFinite(e)?Math.max(0,e):0}function En(e){return Math.round(e*1e6)/1e6}function Dn(e){let t=[e.kind,En(e.at.x),En(e.at.z),En(e.rotation)];return e.kind===`low-flower`?[...t,e.thinned]:e.kind===`terrain-patch`?[...t,e.direction]:e.kind===`drainage-segment`?[...t,En(e.length)]:e.kind===`structure`?[...t,e.form]:t}function On(e){let t=Object.values(e.current[xn]).map(Dn).sort((e,t)=>JSON.stringify(e).localeCompare(JSON.stringify(t)));return JSON.stringify(t)}function kn(e,t){if(e.form===`support`)return 0;let n=me[e.form],r=t.x-e.at.x,i=t.z-e.at.z,a=Math.cos(e.rotation),o=Math.sin(e.rotation),s=a*r+o*i,c=-o*r+a*i,l=e.form===`shade`?{x:n.halfLength+.34,z:n.halfWidth+.34,amount:.78}:e.form===`rack`?{x:n.halfLength+.28,z:n.halfWidth+.22,amount:.36}:{x:n.halfLength+.16,z:n.halfWidth+.12,amount:.1};return Math.abs(s)<=l.x&&Math.abs(c)<=l.z?l.amount:0}function An(){let e=Sn?.focus??{x:-5.35,z:-22.15};return[-.85,0,.85].flatMap(t=>[-.85,0,.85].map(n=>({x:e.x+n,z:e.z+t})))}function jn(e){if(e.form===`support`)return{retention:.025,continuity:-.025};if(e.form===`rack`)return{retention:.05,continuity:.01};if(e.form===`shade`)return{retention:.025,continuity:0};let t=Sn?.focus??{x:-5.35,z:-22.15},n=Cn?.at??{x:-4.42,z:-21.12},r=Math.atan2(n.z-t.z,n.x-t.x),i=Math.abs(Math.sin(e.rotation-r));return{retention:.035+i*.07,continuity:.025-i*.075}}function Mn(e){let t=Object.values(e.current[xn]),n=t.filter(e=>e.kind===`structure`),r=t.filter(e=>e.kind===`low-cover`),i=An(),a=i.reduce((e,t)=>{let i=n.reduce((e,n)=>Math.min(1,e+kn(n,t)),0),a=r.some(e=>Math.hypot(e.at.x-t.x,e.at.z-t.z)<=.72)?.2:0;return e+Math.min(1,i+a)},0)/i.length,o=t.filter(e=>e.kind===`terrain-patch`&&e.direction===`lower`).length,s=t.filter(e=>e.kind===`terrain-patch`&&e.direction===`raise`).length,c=gt(e,xn),l=Math.max(1,c.segments.length),u=c.components.filter(({state:e})=>e===`holding`).reduce((e,t)=>e+t.entryIds.length,0),d=c.components.filter(({state:e})=>e===`outflow`).reduce((e,t)=>e+t.entryIds.length,0),f=u/l,p=d/l,m=n.reduce((e,t)=>{let n=jn(t);return{retention:e.retention+n.retention,continuity:e.continuity+n.continuity}},{retention:0,continuity:0});return{shade:En(wn(bn.shade+a*.66)),retention:En(wn(bn.retention+Math.min(3,o)*.13+f*.32+Math.min(3,r.length)*.055-p*.1-Math.min(3,s)*.14+Math.max(-.18,Math.min(.28,m.retention)))),continuity:En(wn(bn.continuity+p*.5+Math.min(2,o)*.035-f*.16-Math.min(3,s)*.12+Math.max(-.18,Math.min(.2,m.continuity))))}}function Nn(e=Ve(),t=0){return{sourceSignature:On(e)}}function Pn(e,t){let n=Tn(t.worldElapsed),r=e.pending&&n>=e.pending.arrivesAt?{sourceSignature:e.sourceSignature,sourceChangedAt:e.sourceChangedAt,delivered:e.pending}:e,i=On(t.editState);if(i===r.sourceSignature)return r;let a=Math.max(n,r.sourceChangedAt??0);return{sourceSignature:i,sourceChangedAt:a,...r.delivered?{delivered:r.delivered}:{},pending:{sourceChangedAt:a,arrivesAt:a+24,profile:Mn(t.editState)}}}function Fn(e,t){let n=e.pending;return n?wn((Tn(t)-n.sourceChangedAt)/Math.max(1e-6,n.arrivesAt-n.sourceChangedAt)):+!!e.delivered}function In(e,t){return e.delivered!==void 0||e.pending!==void 0&&Tn(t)>=e.pending.arrivesAt}function Ln(e){return e.delivered?.profile??bn}function Rn(e){return e.pending}function zn(e){return typeof e==`object`&&!!e&&!Array.isArray(e)}function Bn(e,t){let n=Object.keys(e).sort(),r=[...t].sort();return n.length===r.length&&n.every((e,t)=>e===r[t])}function Vn(e){return typeof e==`number`&&Number.isFinite(e)&&e>=0&&e<=1}function Hn(e){if(!(!zn(e)||!Bn(e,[`shade`,`retention`,`continuity`])||!Vn(e.shade)||!Vn(e.retention)||!Vn(e.continuity)))return{shade:e.shade,retention:e.retention,continuity:e.continuity}}function Un(e){if(!zn(e)||!Bn(e,[`sourceChangedAt`,`arrivesAt`,`profile`])||typeof e.sourceChangedAt!=`number`||!Number.isFinite(e.sourceChangedAt)||e.sourceChangedAt<0||typeof e.arrivesAt!=`number`||!Number.isFinite(e.arrivesAt)||e.arrivesAt<e.sourceChangedAt)return;let t=Hn(e.profile);return t?{sourceChangedAt:e.sourceChangedAt,arrivesAt:e.arrivesAt,profile:t}:void 0}function Wn(e,t,n){if(!zn(e)||typeof e.sourceSignature!=`string`)return;let r=Object.hasOwn(e,`delivered`),i=Object.hasOwn(e,`pending`);if(!Object.hasOwn(e,`sourceChangedAt`)&&!r&&!i)return!Bn(e,[`sourceSignature`])||t&&e.sourceSignature!==On(t)?void 0:{sourceSignature:e.sourceSignature};let a=[`sourceSignature`,`sourceChangedAt`];if(r&&a.push(`delivered`),i&&a.push(`pending`),!r&&!i||!Bn(e,a)||typeof e.sourceChangedAt!=`number`||!Number.isFinite(e.sourceChangedAt)||e.sourceChangedAt<0)return;let o=r?Un(e.delivered):void 0,s=i?Un(e.pending):void 0;if(r&&!o||i&&!s)return;let c=s??o;if(!(!c||c.sourceChangedAt!==e.sourceChangedAt)&&!(o&&s&&o.arrivesAt>s.sourceChangedAt)&&!(t&&e.sourceSignature!==On(t))&&!(n!==void 0&&(!Number.isFinite(n)||n<e.sourceChangedAt||o!==void 0&&o.arrivesAt>n)))return{sourceSignature:e.sourceSignature,sourceChangedAt:e.sourceChangedAt,...o?{delivered:o}:{},...s?{pending:s}:{}}}function Gn(e,t){if(!e)throw Error(`무당개구리 지도 계약 실패: `+t);return e}var Kn=Object.freeze({...Gn(m.at(-1),`B–C 보호 덮임에는 C 피난처가 있어야 합니다.`)}),qn=Object.freeze({x:1.25,z:-1.45}),Jn=Object.freeze({x:1.22,z:-2.85}),Yn=Object.freeze({firstTraceDelay:10.5,revisitDelay:12.5,traceRippleDelay:1.35,traceDuration:2.8,shallowEdgeUseDuration:9.5,approachSpeed:1.3,retreatSpeed:1.75,alertDistance:2.05,quietTargetDistance:3.4,quietRefugeDistance:2.7,quietRouteDistance:2.7,observableDistance:13});function Xn(e){return{x:e.x,z:e.z}}function Zn(e,t){return Math.hypot(e.x-t.x,e.z-t.z)}function Qn(e){let t=0;for(let n=0;n<e.length-1;n+=1){let r=e[n],i=e[n+1];r&&i&&(t+=Zn(r,i))}return t}function $n(e,t,n,r,i,a,o){let s=n.map(Xn);return Object.freeze({id:e,kind:t,points:s,targetAt:Xn(r),rippleAt:Xn(i),entryIds:[...a],length:Qn(s),hopCount:o})}function er(){return $n(`toad-protected-bc-edge`,`protected`,[...[...m].reverse(),{x:-2.55,z:-3.55},{x:-1.1,z:-2.75},{x:.15,z:-2.05},qn],qn,{x:1.62,z:-1.45},[],5)}function tr(e){let t=[er()];if(e.bToC.protectedFoundation.shallowSlowWaterEdge&&e.bToC.protectedFoundation.cRefuge&&e.bToC.protectedFoundation.naturalBCLink===`connected`&&e.zones[`b-moist-soil`].surfaceMoisture===`moist`&&e.bToC.managedCover===`joined`&&e.bToC.connectedCover.length>0){let n=m[0],r=e.bToC.connectedCover[0];if(!n||!r)return t;let i=[...m].reverse(),a=e.bToC.connectedCover.reduce((e,t)=>Zn(t.at,n)<Zn(e.at,n)?t:e,r),o=a.id+`@`+a.at.x.toFixed(3)+`,`+a.at.z.toFixed(3);t.push($n(`toad-managed-bc-edge:`+o,`managed`,[...i,a.at,{x:-2.1,z:-3.35},{x:-.35,z:-3.05},Jn],Jn,{x:1.62,z:-2.85},[a.id],6))}return t}function nr(){return{phase:`away`,position:Xn(Kn),refuge:Xn(Kn),routeProgress:0,phaseSeconds:0,tracePulseCount:0,visitCount:0}}function rr(e,t){let n=Math.max(0,Math.min(1,t)),r=e.length*n,i=0;for(let t=0;t<e.points.length-1;t+=1){let n=e.points[t],a=e.points[t+1];if(!n||!a)continue;let o=Zn(n,a);if(r<=i+o||t===e.points.length-2){let e=o<=1e-4?0:(r-i)/o;return{x:n.x+(a.x-n.x)*Math.max(0,Math.min(1,e)),z:n.z+(a.z-n.z)*Math.max(0,Math.min(1,e))}}i+=o}return Xn(e.targetAt)}function ir(e,t){return e.find(({id:e})=>e!==t)??e[0]}function ar(e,t){return!!(e&&t.some(({id:t})=>t===e.id))}function or(e,t,n){let r=Zn(t.playerAt,e.targetAt),i=Zn(t.playerAt,Kn);return t.activeEditZoneId!==`b-moist-soil`&&r>=n.quietTargetDistance&&i>=n.quietRefugeDistance&&T(t.playerAt,e.points)>=n.quietRouteDistance&&Math.min(r,i)<=n.observableDistance}function sr(e,t,n){return t.activeEditZoneId===`b-moist-soil`||Zn(e.position,t.playerAt)<=n.alertDistance}function cr(e){return{...e,phase:`away`,lastRouteId:e.activeRoute?.id??e.lastRouteId,phaseSeconds:0,tracePulseCount:0}}function lr(e,t,n=Yn){let r=Math.max(0,Math.min(t.deltaSeconds,.1));if(e.phase===`away`&&e.activeRoute){let t=Math.max(0,e.routeProgress-r*n.retreatSpeed/e.activeRoute.length);return t<=0?{state:{...e,position:Xn(e.refuge),activeRoute:void 0,routeProgress:0,phaseSeconds:0,tracePulseCount:0},cues:[`refuge-rustle`]}:{state:{...e,position:rr(e.activeRoute,t),routeProgress:t},cues:[]}}if(e.phase===`away`){let i=e.phaseSeconds+r,a=ir(t.opportunities.filter(e=>or(e,t,n)),e.lastRouteId),o=e.visitCount===0?n.firstTraceDelay:n.revisitDelay;return a&&i>=o?{state:{...e,phase:`trace`,position:Xn(e.refuge),activeRoute:a,routeProgress:0,phaseSeconds:0,tracePulseCount:1},cues:[`refuge-rustle`]}:{state:{...e,phaseSeconds:i},cues:[]}}if(e.phase===`trace`){let i=e.activeRoute;if(!i||!ar(i,t.opportunities)||!or(i,t,n))return{state:{...e,phase:`away`,position:Xn(e.refuge),activeRoute:void 0,routeProgress:0,phaseSeconds:0,tracePulseCount:0},cues:[]};let a=e.phaseSeconds+r,o=[],s=e.tracePulseCount;return s<2&&a>=n.traceRippleDelay&&(o.push(`water-ripple`),s=2),a>=n.traceDuration?{state:{...e,phase:`approaching`,position:rr(i,0),routeProgress:0,phaseSeconds:0,tracePulseCount:s},cues:o}:{state:{...e,phaseSeconds:a,tracePulseCount:s},cues:o}}if(e.phase===`approaching`){let i=e.activeRoute;if(!i||!ar(i,t.opportunities)||sr(e,t,n))return{state:cr(e),cues:[`departure`]};let a=Math.min(1,e.routeProgress+r*n.approachSpeed/i.length);return a>=1?{state:{...e,phase:`using`,position:Xn(i.targetAt),routeProgress:1,phaseSeconds:0,visitCount:e.visitCount+1},cues:[`water-touch`]}:{state:{...e,position:rr(i,a),routeProgress:a,phaseSeconds:e.phaseSeconds+r},cues:[]}}return!e.activeRoute||!ar(e.activeRoute,t.opportunities)||sr(e,t,n)||e.phaseSeconds+r>=n.shallowEdgeUseDuration?{state:cr(e),cues:[`departure`]}:{state:{...e,phaseSeconds:e.phaseSeconds+r},cues:[]}}function ur(e){return!e.activeRoute||e.activeRoute.kind!==`managed`||e.phase===`trace`||e.phase===`away`&&e.routeProgress<=0?[]:e.activeRoute.entryIds}function dr(e,t){if(!e)throw Error(`무당개구리 계약 실패: `+t)}function fr(e){let t=e.find(({kind:e})=>e===`protected`);if(dr(!!t,`빈 편집에서도 보호 경로가 있어야 합니다.`),!t)return;dr(t.entryIds.length===0,`보호 경로가 플레이어 편집물에 의존하면 안 됩니다.`),dr(!j(t.targetAt)&&T(t.targetAt,u)<=1.6,`이용 자리는 물속이 아니라 얕은 물 가장자리여야 합니다.`),dr(j(t.rippleAt),`물가 이용 흔적은 본래 물길 안에 보여야 합니다.`);for(let t of e){let e=t.points[0],n=t.points.at(-1);dr(!!e&&!!n&&t.points.length>=2&&Zn(e??Kn,Kn)<=.001&&Zn(n??t.targetAt,t.targetAt)<=.001&&t.length>0,`모든 경로는 C 피난처에서 시작해 하나의 물 가장자리에서 끝나야 합니다.`),dr(!j(t.targetAt)&&T(t.targetAt,u)<=1.7&&j(t.rippleAt),`모든 경로의 몸은 물 가장자리에, 물결은 물길 안에 놓여야 합니다.`),dr(t.kind===`protected`?t.entryIds.length===0:t.entryIds.length===1,`보호 경로는 편집물 없이, 관리 경로는 실제 쓰는 대표 덮임 하나로 구성해야 합니다.`)}let n=nr();dr(n.phase===`away`&&!n.activeRoute&&n.routeProgress===0,`처음에는 피난처에서 보이지 않게 기다려야 합니다.`);let r=JSON.stringify(n);dr(![`dead`,`lost`,`collected`,`owned`,`score`,`complete`,`recovered`].some(e=>r.includes(e)),`죽음·소실·수집·소유·점수·완료 상태를 만들면 안 됩니다.`)}var pr=Object.freeze({"butterfly-protected-flower":{condition:`볕 드는 낮은 꽃`,resident:`나비류`,behavior:`잠시 내려앉았다`,question:`꽃이 없는 흙에서는 왜 자리를 찾다 돌아갈까?`},"butterfly-made-flower":{condition:`내가 심은 낮은 꽃`,resident:`나비류`,behavior:`새 자리를 찾아왔다`,question:`꽃을 옮기면 다음에는 어느 자리를 고를까?`},"butterfly-search":{condition:`볕 드는 빈 흙`,resident:`나비류`,behavior:`내려오려다 다시 날아갔다`,question:`낮은 꽃을 가까이 심으면 머물까?`},"snail-protected-cover":{condition:`그늘지고 촉촉한 본래 덮임`,resident:`달팽이류`,behavior:`짧은 젖은 길을 오갔다`,question:`덮임이 끊긴 곳에서도 건너갈까?`},"snail-made-cover":{condition:`내가 이은 촉촉한 덮임`,resident:`달팽이류`,behavior:`새 길을 따라왔다`,question:`흙이 마르거나 덮임을 옮기면 어디로 돌아갈까?`},"snail-search":{condition:`마르거나 덮임이 끊긴 흙`,resident:`달팽이류`,behavior:`조금 건너오다 돌아갔다`,question:`물을 주고 낮은 덮임을 이어 주면 달라질까?`},"toad-trace":{condition:`피난처와 얕은 물가 사이`,resident:`무당개구리`,behavior:`잎과 물결 흔적을 남겼다`,question:`어느 길로 물가에 다가올까?`},"toad-protected-edge":{condition:`본래 덮임에서 얕은 물가까지`,resident:`무당개구리`,behavior:`도약해 와 잠시 머물렀다`,question:`가까이 가면 같은 길로 돌아갈까?`},"toad-made-edge":{condition:`내가 이은 낮은 덮임에서 물가까지`,resident:`무당개구리`,behavior:`새 길을 따라 물가에 왔다`,question:`다른 덮임을 이으면 다음에는 어느 길을 고를까?`},"waterway-junction":{condition:`계곡 물가의 떠온 잎`,resident:`흐르는 물`,behavior:`위에서 와 아래로 이어졌다`,question:`물소리를 따라 위로 갈까, 떠가는 잎을 따라 아래로 갈까?`},"waterway-upstream":{condition:`바위 계류의 흰 물살`,resident:`낙엽`,behavior:`아래 계곡 물가로 떠났다`,question:`이 잎은 계곡 물가를 지나 어디까지 갈까?`},"waterway-downstream":{condition:`열린 골짜기의 작은 물길`,resident:`물과 낙엽`,behavior:`더 큰 물길 쪽으로 멀어졌다`,question:`다른 작은 물길도 이 아래에서 만날까?`},"headwater-source":{condition:`위쪽 숲의 발원지 가장자리`,resident:`빗물과 낙엽`,behavior:`빠르게 흐르거나 머물며 스며들었다`,question:`돌·가지·홈을 다르게 놓으면 아래 물가에는 무엇이 도착할까?`},"headwater-arrival":{condition:`내가 손본 발원지와 아래 계곡 물가`,resident:`물과 낙엽`,behavior:`시간을 두고 같은 물길로 이어졌다`,question:`그늘·머무름·이어짐 가운데 무엇을 바꾸면 다음 잎은 달라질까?`}}),mr=new Set(Object.keys(pr)),hr=6.5,gr=4.5;function _r(e){return typeof e==`object`&&!!e&&!Array.isArray(e)}function vr(e,t){let n=Object.keys(e).sort(),r=[...t].sort();return n.length===r.length&&n.every((e,t)=>e===r[t])}function yr(e,t){return Math.hypot(e.x-t.x,e.z-t.z)}function br(e,t,n){return yr(e.position,t)<=n}function xr(e){if(!_r(e)||!vr(e,[`entries`])||!Array.isArray(e.entries)||e.entries.length>mr.size)return;let t=new Set,n=[];for(let r of e.entries){if(!_r(r)||!vr(r,[`id`,`firstSeenAt`])||typeof r.id!=`string`||!mr.has(r.id)||typeof r.firstSeenAt!=`number`||!Number.isFinite(r.firstSeenAt)||r.firstSeenAt<0||t.has(r.id))return;let e=r.id;t.add(e),n.push({id:e,firstSeenAt:r.firstSeenAt})}return{entries:n}}function Sr(e){return e?{entries:e.entries.map(e=>({...e}))}:{entries:[]}}var Cr=class{state;constructor(e){this.state=Sr(e)}reset(e){this.state=Sr(e)}snapshot(){return this.state}has(e){return this.state.entries.some(t=>t.id===e)}record(e,t){if(this.has(e))return[];let n={id:e,firstSeenAt:Number.isFinite(t)?Math.max(0,t):0};return this.state={entries:[...this.state.entries,n]},[n]}capture(e){if(!e.started||e.blocked)return{state:this.state,added:[]};let t=[...this.state.entries],n=new Set(t.map(({id:e})=>e)),r=[],i=Number.isFinite(e.elapsed)?Math.max(0,e.elapsed):0,a=e=>{if(n.has(e))return;let a={id:e,firstSeenAt:i};n.add(e),t.push(a),r.push(a)},o=e.smallResidents.butterfly;o.phase===`using`&&o.target&&br(o,e.playerAt,hr)&&(o.target.kind===`edit-flower`?a(`butterfly-made-flower`):o.target.kind===`protected-flower`&&a(`butterfly-protected-flower`));let s=e.smallResidents.snail;s.phase===`using`&&s.target&&br(s,e.playerAt,gr)&&(s.target.kind===`managed-cover`?a(`snail-made-cover`):s.target.kind===`protected-cover`&&a(`snail-protected-cover`));for(let t of e.smallEvents)t.type===`reached-search`&&yr(t.at,e.playerAt)<=(t.kind===`day-butterfly`?hr:gr)&&a(t.kind===`day-butterfly`?`butterfly-search`:`snail-search`);let c=e.toad.activeRoute;if(c)for(let t of e.toadCues)t===`water-ripple`&&yr(c.rippleAt,e.playerAt)<=Yn.observableDistance&&a(`toad-trace`),t===`water-touch`&&yr(e.toad.position,e.playerAt)<=Yn.observableDistance&&a(c.kind===`managed`?`toad-made-edge`:`toad-protected-edge`);return r.length>0&&(this.state={entries:t}),{state:this.state,added:r}}},wr=[{id:`b-drifting-leaf`,placeId:`B`,at:{x:1.25,z:.2},reach:1.75,observationId:`waterway-junction`,action:`🍃 떠온 잎 살펴보기`,revisitingAction:`🍃 떠온 잎 다시 보기`,result:`물소리는 숲 쪽에서 오고, 잎은 열린 골짜기 쪽으로 흘러갑니다. 어느 쪽이든 따라갈 수 있어요.`},{id:`d-white-water`,placeId:`D`,at:{x:.2,z:-15},reach:1.8,observationId:`waterway-upstream`,action:`〰 흰 물살 살펴보기`,revisitingAction:`〰 흰 물살 다시 보기`,result:`잎이 흰 물살을 빠져나가 아래 계곡 물가 쪽으로 떠납니다. 이 물은 아까 본 물가로 이어집니다.`},{id:`d-headwater-source`,placeId:`D`,at:{x:-2.25,z:-22.25},reach:1.7,observationId:`headwater-source`,action:`🍂 발원지 가장자리 살펴보기`,revisitingAction:`🍂 발원지 가장자리 다시 보기`,result:`얕은 물은 돌 사이로 빨라지고, 낙엽 아래에서는 머물며 스밉니다. 왼쪽 관리 가장자리의 돌·가지·홈을 바꾸면 아래로 가는 모습도 달라집니다.`},{id:`f-open-valley`,placeId:`F`,at:{x:0,z:17.2},reach:1.9,observationId:`waterway-downstream`,action:`🍃 멀어지는 잎 살펴보기`,revisitingAction:`🍃 멀어지는 잎 다시 보기`,result:`잎이 열린 골짜기 쪽으로 계속 멀어집니다. 작은 물길은 이 아래에서 더 큰 물과 만날 것 같습니다.`}];function Tr(e){return wr.map(t=>({clue:t,distance:Math.sqrt(C(e,t.at))})).filter(({clue:e,distance:t})=>t<=e.reach).sort((e,t)=>e.distance-t.distance)[0]?.clue}function Er(){if(wr.map(({id:e})=>e).join(`,`)!==`b-drifting-leaf,d-white-water,d-headwater-source,f-open-valley`)throw Error(`첫 물길 사건의 네 단서 계약이 달라졌습니다.`);for(let e of wr){if(!ee(e.at))throw Error(e.id+` 단서에 마른 땅으로 닿을 수 없습니다.`);if(k(e.at))throw Error(e.id+` 단서가 가꾸기 흙자리를 침범합니다.`);if(!Number.isFinite(e.reach)||e.reach<=0)throw Error(e.id+` 단서의 살펴보기 거리가 올바르지 않습니다.`)}}var Dr=new Set([`w`,`a`,`s`,`d`,`arrowup`,`arrowdown`,`arrowleft`,`arrowright`]),Or=new Map([[` `,`interact`],[`space`,`interact`],[`escape`,`cancel`],[`n`,`notebook`],[`z`,`undo`]]);function kr(e,t){let n=Math.hypot(e,t);return n<=1||n===0?{forward:e,right:t}:{forward:e/n,right:t/n}}function Ar(e,t,n){let r=Math.max(1,n);return kr(-t/r,e/r)}function jr(e,t){return Number.isFinite(e)&&Number.isFinite(t)&&e>t}var Mr=class{heldKeys=new Set;tapUntil=new Map;touchForward=0;touchRight=0;lookDeltaX=0;zoomDelta=0;actions=[];keyDown(e,t){let n=e.toLowerCase(),r=Or.get(n);return r?(this.heldKeys.has(n)||this.actions.push(r),this.heldKeys.add(n),!0):Dr.has(n)?(this.heldKeys.add(n),this.tapUntil.set(n,t+105),!0):!1}keyUp(e){this.heldKeys.delete(e.toLowerCase())}setTouchMovement(e){let t=kr(e.forward,e.right);this.touchForward=t.forward,this.touchRight=t.right}addLookDelta(e){this.lookDeltaX+=e}addZoomDelta(e){this.zoomDelta+=e}trigger(e){this.actions.push(e)}consumeFrame(e){let t=(t,n)=>this.heldKeys.has(t)||this.heldKeys.has(n)||(this.tapUntil.get(t)??0)>e||(this.tapUntil.get(n)??0)>e;for(let[t,n]of this.tapUntil)n<=e&&!this.heldKeys.has(t)&&this.tapUntil.delete(t);let n=!!t(`w`,`arrowup`)-+!!t(`s`,`arrowdown`),r=!!t(`d`,`arrowright`)-+!!t(`a`,`arrowleft`),i=kr(n+this.touchForward,r+this.touchRight),a={moveForward:i.forward,moveRight:i.right,lookDeltaX:this.lookDeltaX,zoomDelta:this.zoomDelta,actions:[...this.actions]};return this.lookDeltaX=0,this.zoomDelta=0,this.actions.length=0,a}reset(){this.heldKeys.clear(),this.tapUntil.clear(),this.touchForward=0,this.touchRight=0,this.lookDeltaX=0,this.zoomDelta=0,this.actions.length=0}},Nr=1,Pr=2,Fr=3,Ir=4,Lr=5,Rr=`mountain-village-first-map`,zr=Object.freeze({primary:`animal-adventure.save`,backup:`animal-adventure.save.backup`,corrupt:`animal-adventure.save.corrupt`});function Br(e){return typeof e==`object`&&!!e&&!Array.isArray(e)}function Vr(e,t){let n=Object.keys(e).sort(),r=[...t].sort();return n.length===r.length&&n.every((e,t)=>e===r[t])}function Hr(e){return typeof e==`number`&&Number.isFinite(e)}function Ur(e){if(!(!Br(e)||!Vr(e,[`x`,`z`])||!Hr(e.x)||!Hr(e.z)))return{x:e.x,z:e.z}}function Wr(e,t,n,r,i){if(!Br(e)||!Vr(e,n)||e.schemaVersion!==t||e.mapId!==`mountain-village-first-map`||!Hr(e.elapsed)||e.elapsed<0||!Br(e.player)||!Vr(e.player,[`at`,`heading`])||!Hr(e.player.heading)||!Br(e.camera)||!Vr(e.camera,[`yaw`,`distance`])||!Hr(e.camera.yaw)||!Hr(e.camera.distance)||e.camera.distance<7.2||e.camera.distance>14)return;let a=Ur(e.player.at),o=r(e.edits);if(!(!a||!i(a)||!o))return{mapId:Rr,elapsed:e.elapsed,player:{at:a,heading:e.player.heading},camera:{yaw:e.camera.yaw,distance:e.camera.distance},edits:o}}function Gr(e,t){return vn(e,Ge(t))}function Kr(e){let t=Wr(e,Nr,[`schemaVersion`,`mapId`,`elapsed`,`player`,`camera`,`edits`],ft,M);return t?{schemaVersion:Nr,...t}:void 0}function qr(e){let t=Wr(e,Pr,[`schemaVersion`,`mapId`,`elapsed`,`player`,`camera`,`edits`,`notebook`],ft,M),n=Br(e)?xr(e.notebook):void 0;return t&&n?{schemaVersion:Pr,...t,notebook:n}:void 0}function Jr(e){let t=Wr(e,Fr,[`schemaVersion`,`mapId`,`elapsed`,`player`,`camera`,`edits`,`notebook`,`plantGrowth`],ft,M);if(!t||!Br(e))return;let n=xr(e.notebook),r=Gr(e.plantGrowth,t.edits);if(!(!n||!r||Object.values(r.byEntryId).some(({plantedAtElapsed:e})=>e>t.elapsed)))return{schemaVersion:Fr,...t,notebook:n,plantGrowth:r}}function Yr(e){let t=Wr(e,Ir,[`schemaVersion`,`mapId`,`elapsed`,`player`,`camera`,`edits`,`notebook`,`plantGrowth`],dt,M);if(!t||!Br(e))return;let n=xr(e.notebook),r=Gr(e.plantGrowth,t.edits);if(!(!n||!r||Object.values(r.byEntryId).some(({plantedAtElapsed:e})=>e>t.elapsed)))return{schemaVersion:Ir,...t,notebook:n,plantGrowth:r}}function Xr(e){let t=Wr(e,Lr,[`schemaVersion`,`mapId`,`elapsed`,`player`,`camera`,`edits`,`notebook`,`plantGrowth`],ut,M);if(!t||!Br(e))return;let n=xr(e.notebook),r=Gr(e.plantGrowth,t.edits);if(!(!n||!r||Object.values(r.byEntryId).some(({plantedAtElapsed:e})=>e>t.elapsed)))return{schemaVersion:Lr,...t,notebook:n,plantGrowth:r}}function Zr(e){let t=Wr(e,6,[`schemaVersion`,`mapId`,`elapsed`,`player`,`camera`,`edits`,`notebook`,`plantGrowth`,`upstream`],lt,ee);if(!t||!Br(e))return;let n=xr(e.notebook),r=vn(e.plantGrowth,t.edits),i=Wn(e.upstream,t.edits,t.elapsed);if(!(!n||!r||!i||Object.values(r.byEntryId).some(({plantedAtElapsed:e})=>e>t.elapsed)))return{schemaVersion:6,...t,notebook:n,plantGrowth:r,upstream:i}}var Qr={x:-1.7,z:-22.35};function $r(e){let t=Ge(e.edits),n=ee(e.player.at)?e.player.at:ee(Qr)?Qr:i;return{player:{at:{x:n.x,z:n.z},heading:e.player.heading},edits:t,upstream:Nn(t,e.elapsed)}}function ei(e){let t=$r(e);return{...e,schemaVersion:6,...t,notebook:Sr(),plantGrowth:yn(t.edits,e.elapsed)}}function ti(e){let t=$r(e);return{...e,schemaVersion:6,...t,plantGrowth:yn(t.edits,e.elapsed)}}function ni(e){return{...e,schemaVersion:6,...$r(e)}}function ri(e){return{...e,schemaVersion:6,...$r(e)}}function ii(e){return{...e,schemaVersion:6,...$r(e)}}function ai(e){let t;try{t=JSON.parse(e)}catch{return{status:`invalid`}}if(Br(t)&&Number.isSafeInteger(t.schemaVersion)&&t.schemaVersion>6)return{status:`unsupported-future`,schemaVersion:t.schemaVersion};let n=Zr(t);if(n)return{status:`valid`,save:n};let r=Xr(t);if(r)return{status:`valid`,save:ii(r)};let i=Yr(t);if(i)return{status:`valid`,save:ri(i)};let a=Jr(t);if(a)return{status:`valid`,save:ni(a)};let o=qr(t);if(o)return{status:`valid`,save:ti(o)};let s=Kr(t);return s?{status:`valid`,save:ei(s)}:{status:`invalid`}}function oi(e){let t=Zr(e);return t?JSON.stringify(t):void 0}var si=class{storage;locked=!1;constructor(e){this.storage=e}get writeLocked(){return this.locked}load(){let e,t;try{e=this.storage.getItem(zr.primary)}catch{return this.locked=!0,{status:`storage-error`,writeLocked:!0}}if(e!==null){let t=ai(e);if(t.status===`valid`)return this.locked=!1,{status:`loaded`,save:t.save,source:`primary`,recovered:!1,writeLocked:!1};if(t.status===`unsupported-future`)return this.locked=!0,{status:`unsupported-future`,schemaVersion:t.schemaVersion,source:`primary`,writeLocked:!0}}try{t=this.storage.getItem(zr.backup)}catch{return this.locked=!0,{status:`storage-error`,writeLocked:!0}}if(t!==null){let n=ai(t);if(n.status===`valid`){try{e!==null&&this.storage.setItem(zr.corrupt,e),this.storage.setItem(zr.primary,t)}catch{}return this.locked=!1,{status:`loaded`,save:n.save,source:`backup`,recovered:!0,writeLocked:!1}}if(n.status===`unsupported-future`)return this.locked=!0,{status:`unsupported-future`,schemaVersion:n.schemaVersion,source:`backup`,writeLocked:!0}}let n=e??t,r=n===null;if(n!==null)try{this.storage.setItem(zr.corrupt,n),r=!0}catch{r=!1}if(r)try{this.storage.removeItem(zr.primary),this.storage.removeItem(zr.backup)}catch{}return this.locked=!1,{status:`none`,writeLocked:!1}}write(e){if(this.locked)return{status:`locked`};let t=oi(e);if(!t)return{status:`invalid`};let n;try{n=this.storage.getItem(zr.primary)}catch{return{status:`storage-error`}}if(n!==null){let e=ai(n);if(e.status===`unsupported-future`)return this.locked=!0,{status:`locked`};try{e.status===`valid`?this.storage.setItem(zr.backup,n):this.storage.setItem(zr.corrupt,n)}catch{return{status:`storage-error`}}}try{return this.storage.setItem(zr.primary,t),{status:`saved`}}catch{return{status:`storage-error`}}}},ci=1e3,li=1001,ui=1002,di=1003,fi=1004,pi=1005,mi=1006,hi=1007,gi=1008,_i=1009,vi=1010,yi=1011,bi=1012,xi=1013,Si=1014,Ci=1015,wi=1016,Ti=1017,Ei=1018,Di=1020,Oi=35902,ki=35899,Ai=1021,ji=1022,Mi=1023,Ni=1026,Pi=1027,Fi=1028,Ii=1029,Li=1030,Ri=1031,zi=1033,Bi=33776,Vi=33777,Hi=33778,Ui=33779,Wi=35840,Gi=35841,Ki=35842,qi=35843,Ji=36196,Yi=37492,Xi=37496,Zi=37488,Qi=37489,$i=37490,ea=37491,ta=37808,na=37809,ra=37810,ia=37811,aa=37812,oa=37813,sa=37814,ca=37815,la=37816,ua=37817,da=37818,fa=37819,pa=37820,ma=37821,ha=36492,ga=36494,_a=36495,va=36283,ya=36284,ba=36285,xa=36286,Sa=2300,Ca=2301,wa=2302,Ta=2303,Ea=2400,Da=2401,Oa=2402,ka=3200,Aa=`srgb`,ja=`srgb-linear`,Ma=`linear`,Na=`srgb`,Pa=7680,Fa=35044,Ia=2e3;function La(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Ra(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function za(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Ba(){let e=za(`canvas`);return e.style.display=`block`,e}var Va={};function Ha(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function Ua(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function B(...e){e=Ua(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function V(...e){e=Ua(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Wa(...e){let t=e.join(` `);t in Va||(Va[t]=!0,B(...e))}function Ga(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var Ka={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},qa=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},Ja=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),Ya=1234567,Xa=Math.PI/180,Za=180/Math.PI;function Qa(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Ja[e&255]+Ja[e>>8&255]+Ja[e>>16&255]+Ja[e>>24&255]+`-`+Ja[t&255]+Ja[t>>8&255]+`-`+Ja[t>>16&15|64]+Ja[t>>24&255]+`-`+Ja[n&63|128]+Ja[n>>8&255]+`-`+Ja[n>>16&255]+Ja[n>>24&255]+Ja[r&255]+Ja[r>>8&255]+Ja[r>>16&255]+Ja[r>>24&255]).toLowerCase()}function H(e,t,n){return Math.max(t,Math.min(n,e))}function $a(e,t){return(e%t+t)%t}function eo(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function to(e,t,n){return e===t?0:(n-e)/(t-e)}function no(e,t,n){return(1-n)*e+n*t}function ro(e,t,n,r){return no(e,t,1-Math.exp(-n*r))}function io(e,t=1){return t-Math.abs($a(e,t*2)-t)}function ao(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function oo(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function so(e,t){return e+Math.floor(Math.random()*(t-e+1))}function co(e,t){return e+Math.random()*(t-e)}function lo(e){return e*(.5-Math.random())}function uo(e){e!==void 0&&(Ya=e);let t=Ya+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function fo(e){return e*Xa}function po(e){return e*Za}function mo(e){return!(e&e-1)&&e!==0}function ho(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function go(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function _o(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:B(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function vo(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function yo(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var bo={DEG2RAD:Xa,RAD2DEG:Za,generateUUID:Qa,clamp:H,euclideanModulo:$a,mapLinear:eo,inverseLerp:to,lerp:no,damp:ro,pingpong:io,smoothstep:ao,smootherstep:oo,randInt:so,randFloat:co,randFloatSpread:lo,seededRandom:uo,degToRad:fo,radToDeg:po,isPowerOfTwo:mo,ceilPowerOfTwo:ho,floorPowerOfTwo:go,setQuaternionFromProperEuler:_o,normalize:yo,denormalize:vo},U=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=H(this.x,e.x,t.x),this.y=H(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=H(this.x,e,t),this.y=H(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(H(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(H(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},xo=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:B(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(H(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},W=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Co.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Co.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=H(this.x,e.x,t.x),this.y=H(this.y,e.y,t.y),this.z=H(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=H(this.x,e,t),this.y=H(this.y,e,t),this.z=H(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(H(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return So.copy(this).projectOnVector(e),this.sub(So)}reflect(e){return this.sub(So.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(H(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},So=new W,Co=new xo,G=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return Wa(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(wo.makeScale(e,t)),this}rotate(e){return Wa(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(wo.makeRotation(-e)),this}translate(e,t){return Wa(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(wo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},wo=new G,To=new G().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Eo=new G().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Do(){let e={enabled:!0,workingColorSpace:ja,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=ko(e.r),e.g=ko(e.g),e.b=ko(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Ao(e.r),e.g=Ao(e.g),e.b=Ao(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Ma:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return Wa(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return Wa(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[ja]:{primaries:t,whitePoint:r,transfer:Ma,toXYZ:To,fromXYZ:Eo,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Aa},outputColorSpaceConfig:{drawingBufferColorSpace:Aa}},[Aa]:{primaries:t,whitePoint:r,transfer:Na,toXYZ:To,fromXYZ:Eo,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Aa}}}),e}var Oo=Do();function ko(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Ao(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var jo,Mo=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{jo===void 0&&(jo=za(`canvas`)),jo.width=e.width,jo.height=e.height;let t=jo.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=jo}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=za(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=ko(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(ko(t[e]/255)*255):t[e]=ko(t[e]);return{data:t,width:e.width,height:e.height}}return B(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},No=0,Po=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:No++}),this.uuid=Qa(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Fo(r[t].image)):e.push(Fo(r[t]))}else e=Fo(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Fo(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Mo.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(B(`Texture: Unable to serialize Texture.`),{})}var Io=0,Lo=new W,Ro=class e extends qa{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=li,i=li,a=mi,o=gi,s=Mi,c=_i,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Io++}),this.uuid=Qa(),this.name=``,this.source=new Po(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new U(0,0),this.repeat=new U(1,1),this.center=new U(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new G,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Lo).x}get height(){return this.source.getSize(Lo).y}get depth(){return this.source.getSize(Lo).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){B(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){B(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ci:e.x-=Math.floor(e.x);break;case li:e.x=e.x<0?0:1;break;case ui:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case ci:e.y-=Math.floor(e.y);break;case li:e.y=e.y<0?0:1;break;case ui:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Ro.DEFAULT_IMAGE=null,Ro.DEFAULT_MAPPING=300,Ro.DEFAULT_ANISOTROPY=1;var zo=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=H(this.x,e.x,t.x),this.y=H(this.y,e.y,t.y),this.z=H(this.z,e.z,t.z),this.w=H(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=H(this.x,e,t),this.y=H(this.y,e,t),this.z=H(this.z,e,t),this.w=H(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(H(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Bo=class extends qa{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:mi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new zo(0,0,e,t),this.scissorTest=!1,this.viewport=new zo(0,0,e,t),this.textures=[];let r=new Ro({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:mi,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Po(n)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Vo=class extends Bo{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Ho=class extends Ro{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=di,this.minFilter=di,this.wrapR=li,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Uo=class extends Ro{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=di,this.minFilter=di,this.wrapR=li,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Wo=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/Go.setFromMatrixColumn(e,0).length(),i=1/Go.setFromMatrixColumn(e,1).length(),a=1/Go.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(qo,e,Jo)}lookAt(e,t,n){let r=this.elements;return Zo.subVectors(e,t),Zo.lengthSq()===0&&(Zo.z=1),Zo.normalize(),Yo.crossVectors(n,Zo),Yo.lengthSq()===0&&(Math.abs(n.z)===1?Zo.x+=1e-4:Zo.z+=1e-4,Zo.normalize(),Yo.crossVectors(n,Zo)),Yo.normalize(),Xo.crossVectors(Zo,Yo),r[0]=Yo.x,r[4]=Xo.x,r[8]=Zo.x,r[1]=Yo.y,r[5]=Xo.y,r[9]=Zo.y,r[2]=Yo.z,r[6]=Xo.z,r[10]=Zo.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],ee=r[14],M=r[3],N=r[7],te=r[11],ne=r[15];return i[0]=a*x+o*T+s*k+c*M,i[4]=a*S+o*E+s*A+c*N,i[8]=a*C+o*D+s*j+c*te,i[12]=a*w+o*O+s*ee+c*ne,i[1]=l*x+u*T+d*k+f*M,i[5]=l*S+u*E+d*A+f*N,i[9]=l*C+u*D+d*j+f*te,i[13]=l*w+u*O+d*ee+f*ne,i[2]=p*x+m*T+h*k+g*M,i[6]=p*S+m*E+h*A+g*N,i[10]=p*C+m*D+h*j+g*te,i[14]=p*w+m*O+h*ee+g*ne,i[3]=_*x+v*T+y*k+b*M,i[7]=_*S+v*E+y*A+b*N,i[11]=_*C+v*D+y*j+b*te,i[15]=_*w+v*O+y*ee+b*ne,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=Go.set(r[0],r[1],r[2]).length(),o=Go.set(r[4],r[5],r[6]).length(),s=Go.set(r[8],r[9],r[10]).length();i<0&&(a=-a),Ko.copy(this);let c=1/a,l=1/o,u=1/s;return Ko.elements[0]*=c,Ko.elements[1]*=c,Ko.elements[2]*=c,Ko.elements[4]*=l,Ko.elements[5]*=l,Ko.elements[6]*=l,Ko.elements[8]*=u,Ko.elements[9]*=u,Ko.elements[10]*=u,t.setFromRotationMatrix(Ko),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Ia,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Ia,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Go=new W,Ko=new Wo,qo=new W(0,0,0),Jo=new W(1,1,1),Yo=new W,Xo=new W,Zo=new W,Qo=new Wo,$o=new xo,es=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(H(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-H(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(H(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-H(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(H(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-H(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:B(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Qo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Qo,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return $o.setFromEuler(this),this.setFromQuaternion($o,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};es.DEFAULT_ORDER=`XYZ`;var ts=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},ns=0,rs=new W,is=new xo,as=new Wo,os=new W,ss=new W,cs=new W,ls=new xo,us=new W(1,0,0),ds=new W(0,1,0),fs=new W(0,0,1),ps={type:`added`},ms={type:`removed`},hs={type:`childadded`,child:null},gs={type:`childremoved`,child:null},_s=class e extends qa{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ns++}),this.uuid=Qa(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new W,n=new es,r=new xo,i=new W(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Wo},normalMatrix:{value:new G}}),this.matrix=new Wo,this.matrixWorld=new Wo,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ts,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return is.setFromAxisAngle(e,t),this.quaternion.multiply(is),this}rotateOnWorldAxis(e,t){return is.setFromAxisAngle(e,t),this.quaternion.premultiply(is),this}rotateX(e){return this.rotateOnAxis(us,e)}rotateY(e){return this.rotateOnAxis(ds,e)}rotateZ(e){return this.rotateOnAxis(fs,e)}translateOnAxis(e,t){return rs.copy(e).applyQuaternion(this.quaternion),this.position.add(rs.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(us,e)}translateY(e){return this.translateOnAxis(ds,e)}translateZ(e){return this.translateOnAxis(fs,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(as.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?os.copy(e):os.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),ss.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?as.lookAt(ss,os,this.up):as.lookAt(os,ss,this.up),this.quaternion.setFromRotationMatrix(as),r&&(as.extractRotation(r.matrixWorld),is.setFromRotationMatrix(as),this.quaternion.premultiply(is.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(V(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ps),hs.child=e,this.dispatchEvent(hs),hs.child=null):V(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ms),gs.child=e,this.dispatchEvent(gs),gs.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),as.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),as.multiply(e.parent.matrixWorld)),e.applyMatrix4(as),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ps),hs.child=e,this.dispatchEvent(hs),hs.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ss,e,cs),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ss,ls,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==``&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material);if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}};_s.DEFAULT_UP=new W(0,1,0),_s.DEFAULT_MATRIX_AUTO_UPDATE=!0,_s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var K=class extends _s{constructor(){super(),this.isGroup=!0,this.type=`Group`}},vs={type:`move`},ys=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new K,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new K,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new K,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(vs)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new K;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},bs={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},xs={h:0,s:0,l:0},Ss={h:0,s:0,l:0};function Cs(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var q=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Aa){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Oo.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Oo.workingColorSpace){return this.r=e,this.g=t,this.b=n,Oo.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Oo.workingColorSpace){if(e=$a(e,1),t=H(t,0,1),n=H(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Cs(i,r,e+1/3),this.g=Cs(i,r,e),this.b=Cs(i,r,e-1/3)}return Oo.colorSpaceToWorking(this,r),this}setStyle(e,t=Aa){function n(t){t!==void 0&&parseFloat(t)<1&&B(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:B(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);B(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Aa){let n=bs[e.toLowerCase()];return n===void 0?B(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ko(e.r),this.g=ko(e.g),this.b=ko(e.b),this}copyLinearToSRGB(e){return this.r=Ao(e.r),this.g=Ao(e.g),this.b=Ao(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Aa){return Oo.workingToColorSpace(ws.copy(this),e),Math.round(H(ws.r*255,0,255))*65536+Math.round(H(ws.g*255,0,255))*256+Math.round(H(ws.b*255,0,255))}getHexString(e=Aa){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Oo.workingColorSpace){Oo.workingToColorSpace(ws.copy(this),t);let n=ws.r,r=ws.g,i=ws.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Oo.workingColorSpace){return Oo.workingToColorSpace(ws.copy(this),t),e.r=ws.r,e.g=ws.g,e.b=ws.b,e}getStyle(e=Aa){Oo.workingToColorSpace(ws.copy(this),e);let t=ws.r,n=ws.g,r=ws.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(xs),this.setHSL(xs.h+e,xs.s+t,xs.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(xs),e.getHSL(Ss);let n=no(xs.h,Ss.h,t),r=no(xs.s,Ss.s,t),i=no(xs.l,Ss.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},ws=new q;q.NAMES=bs;var Ts=class e{constructor(e,t=1,n=1e3){this.isFog=!0,this.name=``,this.color=new q(e),this.near=t,this.far=n}clone(){return new e(this.color,this.near,this.far)}toJSON(){return{type:`Fog`,name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Es=class extends _s{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new es,this.environmentIntensity=1,this.environmentRotation=new es,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Ds=new W,Os=new W,ks=new W,As=new W,js=new W,Ms=new W,Ns=new W,Ps=new W,Fs=new W,Is=new W,Ls=new zo,Rs=new zo,zs=new zo,Bs=class e{constructor(e=new W,t=new W,n=new W){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Ds.subVectors(e,t),r.cross(Ds);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Ds.subVectors(r,t),Os.subVectors(n,t),ks.subVectors(e,t);let a=Ds.dot(Ds),o=Ds.dot(Os),s=Ds.dot(ks),c=Os.dot(Os),l=Os.dot(ks),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,As)!==null&&As.x>=0&&As.y>=0&&As.x+As.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,As)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,As.x),s.addScaledVector(a,As.y),s.addScaledVector(o,As.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Ls.setScalar(0),Rs.setScalar(0),zs.setScalar(0),Ls.fromBufferAttribute(e,t),Rs.fromBufferAttribute(e,n),zs.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Ls,i.x),a.addScaledVector(Rs,i.y),a.addScaledVector(zs,i.z),a}static isFrontFacing(e,t,n,r){return Ds.subVectors(n,t),Os.subVectors(e,t),Ds.cross(Os).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ds.subVectors(this.c,this.b),Os.subVectors(this.a,this.b),Ds.cross(Os).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;js.subVectors(r,n),Ms.subVectors(i,n),Ps.subVectors(e,n);let s=js.dot(Ps),c=Ms.dot(Ps);if(s<=0&&c<=0)return t.copy(n);Fs.subVectors(e,r);let l=js.dot(Fs),u=Ms.dot(Fs);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(js,a);Is.subVectors(e,i);let f=js.dot(Is),p=Ms.dot(Is);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Ms,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Ns.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Ns,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(js,a).addScaledVector(Ms,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Vs=class{constructor(e=new W(1/0,1/0,1/0),t=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Us.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Us.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Us.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Us):Us.fromBufferAttribute(r,t),Us.applyMatrix4(e.matrixWorld),this.expandByPoint(Us);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),Ws.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),Ws.copy(e.boundingBox)),Ws.applyMatrix4(e.matrixWorld),this.union(Ws)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Us),Us.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Zs),Qs.subVectors(this.max,Zs),Gs.subVectors(e.a,Zs),Ks.subVectors(e.b,Zs),qs.subVectors(e.c,Zs),Js.subVectors(Ks,Gs),Ys.subVectors(qs,Ks),Xs.subVectors(Gs,qs);let t=[0,-Js.z,Js.y,0,-Ys.z,Ys.y,0,-Xs.z,Xs.y,Js.z,0,-Js.x,Ys.z,0,-Ys.x,Xs.z,0,-Xs.x,-Js.y,Js.x,0,-Ys.y,Ys.x,0,-Xs.y,Xs.x,0];return!tc(t,Gs,Ks,qs,Qs)||(t=[1,0,0,0,1,0,0,0,1],!tc(t,Gs,Ks,qs,Qs))?!1:($s.crossVectors(Js,Ys),t=[$s.x,$s.y,$s.z],tc(t,Gs,Ks,qs,Qs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Us).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Us).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Hs[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Hs[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Hs[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Hs[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Hs[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Hs[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Hs[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Hs[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Hs),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Hs=[new W,new W,new W,new W,new W,new W,new W,new W],Us=new W,Ws=new Vs,Gs=new W,Ks=new W,qs=new W,Js=new W,Ys=new W,Xs=new W,Zs=new W,Qs=new W,$s=new W,ec=new W;function tc(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){ec.fromArray(e,a);let o=i.x*Math.abs(ec.x)+i.y*Math.abs(ec.y)+i.z*Math.abs(ec.z),s=t.dot(ec),c=n.dot(ec),l=r.dot(ec);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var nc=new W,rc=new U,ic=0,ac=class extends qa{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ic++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Fa,this.updateRanges=[],this.gpuType=Ci,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)rc.fromBufferAttribute(this,t),rc.applyMatrix3(e),this.setXY(t,rc.x,rc.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)nc.fromBufferAttribute(this,t),nc.applyMatrix3(e),this.setXYZ(t,nc.x,nc.y,nc.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)nc.fromBufferAttribute(this,t),nc.applyMatrix4(e),this.setXYZ(t,nc.x,nc.y,nc.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)nc.fromBufferAttribute(this,t),nc.applyNormalMatrix(e),this.setXYZ(t,nc.x,nc.y,nc.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)nc.fromBufferAttribute(this,t),nc.transformDirection(e),this.setXYZ(t,nc.x,nc.y,nc.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=vo(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=yo(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=vo(t,this.array)),t}setX(e,t){return this.normalized&&(t=yo(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=vo(t,this.array)),t}setY(e,t){return this.normalized&&(t=yo(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=vo(t,this.array)),t}setZ(e,t){return this.normalized&&(t=yo(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=vo(t,this.array)),t}setW(e,t){return this.normalized&&(t=yo(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=yo(t,this.array),n=yo(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=yo(t,this.array),n=yo(n,this.array),r=yo(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=yo(t,this.array),n=yo(n,this.array),r=yo(r,this.array),i=yo(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==``&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:`dispose`})}},oc=class extends ac{constructor(e,t,n){super(new Uint16Array(e),t,n)}},sc=class extends ac{constructor(e,t,n){super(new Uint32Array(e),t,n)}},J=class extends ac{constructor(e,t,n){super(new Float32Array(e),t,n)}},cc=new Vs,lc=new W,uc=new W,dc=class{constructor(e=new W,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?cc.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;lc.subVectors(e,this.center);let t=lc.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(lc,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(uc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(lc.copy(e.center).add(uc)),this.expandByPoint(lc.copy(e.center).sub(uc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},fc=0,pc=new Wo,mc=new _s,hc=new W,gc=new Vs,_c=new Vs,vc=new W,yc=class e extends qa{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:fc++}),this.uuid=Qa(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(La(e)?sc:oc)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new G().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return pc.makeRotationFromQuaternion(e),this.applyMatrix4(pc),this}rotateX(e){return pc.makeRotationX(e),this.applyMatrix4(pc),this}rotateY(e){return pc.makeRotationY(e),this.applyMatrix4(pc),this}rotateZ(e){return pc.makeRotationZ(e),this.applyMatrix4(pc),this}translate(e,t,n){return pc.makeTranslation(e,t,n),this.applyMatrix4(pc),this}scale(e,t,n){return pc.makeScale(e,t,n),this.applyMatrix4(pc),this}lookAt(e){return mc.lookAt(e),mc.updateMatrix(),this.applyMatrix4(mc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(hc).negate(),this.translate(hc.x,hc.y,hc.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new J(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&B(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Vs);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){V(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];gc.setFromBufferAttribute(n),this.morphTargetsRelative?(vc.addVectors(this.boundingBox.min,gc.min),this.boundingBox.expandByPoint(vc),vc.addVectors(this.boundingBox.max,gc.max),this.boundingBox.expandByPoint(vc)):(this.boundingBox.expandByPoint(gc.min),this.boundingBox.expandByPoint(gc.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&V(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new dc);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){V(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new W,1/0);return}if(e){let n=this.boundingSphere.center;if(gc.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];_c.setFromBufferAttribute(n),this.morphTargetsRelative?(vc.addVectors(gc.min,_c.min),gc.expandByPoint(vc),vc.addVectors(gc.max,_c.max),gc.expandByPoint(vc)):(gc.expandByPoint(_c.min),gc.expandByPoint(_c.max))}gc.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)vc.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(vc));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)vc.fromBufferAttribute(a,t),o&&(hc.fromBufferAttribute(e,t),vc.add(hc)),r=Math.max(r,n.distanceToSquared(vc))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&V(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){V(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new ac(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new W,s[e]=new W;let c=new W,l=new W,u=new W,d=new U,f=new U,p=new U,m=new W,h=new W;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new W,y=new W,b=new W,x=new W;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new ac(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new W,i=new W,a=new W,o=new W,s=new W,c=new W,l=new W,u=new W;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)vc.fromBufferAttribute(e,t),vc.normalize(),e.setXYZ(t,vc.x,vc.y,vc.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new ac(a,r,i)}if(this.index===null)return B(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,this.name!==``&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},bc=0,xc=class extends qa{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:bc++}),this.uuid=Qa(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new q(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Pa,this.stencilZFail=Pa,this.stencilZPass=Pa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){B(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){B(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,this.name!==``&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(n.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==`round`&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==`round`&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new q().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new U().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new U().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Sc=new W,Cc=new W,wc=new W,Tc=new W,Ec=new W,Dc=new W,Oc=new W,kc=class{constructor(e=new W,t=new W(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Sc)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Sc.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Sc.copy(this.origin).addScaledVector(this.direction,t),Sc.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Cc.copy(e).add(t).multiplyScalar(.5),wc.copy(t).sub(e).normalize(),Tc.copy(this.origin).sub(Cc);let i=e.distanceTo(t)*.5,a=-this.direction.dot(wc),o=Tc.dot(this.direction),s=-Tc.dot(wc),c=Tc.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0)if(u=a*s-o,d=a*o-s,p=i*l,u>=0)if(d>=-p)if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c);else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Cc).addScaledVector(wc,d),f}intersectSphere(e,t){Sc.subVectors(e.center,this.origin);let n=Sc.dot(this.direction),r=Sc.dot(Sc)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Sc)!==null}intersectTriangle(e,t,n,r,i){Ec.subVectors(t,e),Dc.subVectors(n,e),Oc.crossVectors(Ec,Dc);let a=this.direction.dot(Oc),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Tc.subVectors(this.origin,e);let s=o*this.direction.dot(Dc.crossVectors(Tc,Dc));if(s<0)return null;let c=o*this.direction.dot(Ec.cross(Tc));if(c<0||s+c>a)return null;let l=-o*Tc.dot(Oc);return l<0?null:this.at(l/a,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ac=class extends xc{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new q(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new es,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},jc=new Wo,Mc=new kc,Nc=new dc,Pc=new W,Fc=new W,Ic=new W,Lc=new W,Rc=new W,zc=new W,Bc=new W,Vc=new W,Y=class extends _s{constructor(e=new yc,t=new Ac){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){zc.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Rc.fromBufferAttribute(s,e),a?zc.addScaledVector(Rc,r):zc.addScaledVector(Rc.sub(t),r))}t.add(zc)}return t}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Nc.copy(n.boundingSphere),Nc.applyMatrix4(i),Mc.copy(e.ray).recast(e.near),!(Nc.containsPoint(Mc.origin)===!1&&(Mc.intersectSphere(Nc,Pc)===null||Mc.origin.distanceToSquared(Pc)>(e.far-e.near)**2))&&(jc.copy(i).invert(),Mc.copy(e.ray).applyMatrix4(jc),(n.boundingBox===null||Mc.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Mc)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null)if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=Uc(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=Uc(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}else if(s!==void 0)if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=Uc(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=Uc(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}};function Hc(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;Vc.copy(s),Vc.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(Vc);return l<n.near||l>n.far?null:{distance:l,point:Vc.clone(),object:e}}function Uc(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Fc),e.getVertexPosition(c,Ic),e.getVertexPosition(l,Lc);let u=Hc(e,t,n,r,Fc,Ic,Lc,Bc);if(u){let e=new W;Bs.getBarycoord(Bc,Fc,Ic,Lc,e),i&&(u.uv=Bs.getInterpolatedAttribute(i,s,c,l,e,new U)),a&&(u.uv1=Bs.getInterpolatedAttribute(a,s,c,l,e,new U)),o&&(u.normal=Bs.getInterpolatedAttribute(o,s,c,l,e,new W),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new W,materialIndex:0};Bs.getNormal(Fc,Ic,Lc,t.normal),u.face=t,u.barycoord=e}return u}var Wc=class extends Ro{constructor(e=null,t=1,n=1,r,i,a,o,s,c=di,l=di,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Gc=class extends ac{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Kc=new Wo,qc=new Wo,Jc=[],Yc=new Vs,Xc=new Wo,Zc=new Y,Qc=new dc,$c=class extends Y{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Gc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,Xc)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Vs),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Kc),Yc.copy(e.boundingBox).applyMatrix4(Kc),this.boundingBox.union(Yc)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new dc),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Kc),Qc.copy(e.boundingSphere).applyMatrix4(Kc),this.boundingSphere.union(Qc)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(Zc.geometry=this.geometry,Zc.material=this.material,Zc.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Qc.copy(this.boundingSphere),Qc.applyMatrix4(n),e.ray.intersectsSphere(Qc)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,Kc),qc.multiplyMatrices(n,Kc),Zc.matrixWorld=qc,Zc.raycast(e,Jc);for(let e=0,n=Jc.length;e<n;e++){let n=Jc[e];n.instanceId=i,n.object=this,t.push(n)}Jc.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Gc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Wc(new Float32Array(r*this.count),r,this.count,Fi,Ci));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:`dispose`}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},el=new W,tl=new W,nl=new G,rl=class{constructor(e=new W(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=el.subVectors(n,t).cross(tl.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(el),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||nl.getNormalMatrix(e),r=this.coplanarPoint(el).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},il=new dc,al=new U(.5,.5),ol=new W,sl=class{constructor(e=new rl,t=new rl,n=new rl,r=new rl,i=new rl,a=new rl){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ia,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),il.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),il.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(il)}intersectsSprite(e){return il.center.set(0,0,0),il.radius=.7071067811865476+al.distanceTo(e.center),il.applyMatrix4(e.matrixWorld),this.intersectsSphere(il)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(ol.x=r.normal.x>0?e.max.x:e.min.x,ol.y=r.normal.y>0?e.max.y:e.min.y,ol.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ol)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},cl=class extends xc{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new q(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},ll=new W,ul=new W,dl=new Wo,fl=new kc,pl=new dc,ml=new W,hl=new W,gl=class extends _s{constructor(e=new yc,t=new cl){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)ll.fromBufferAttribute(t,e-1),ul.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=ll.distanceTo(ul);e.setAttribute(`lineDistance`,new J(n,1))}else B(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),pl.copy(n.boundingSphere),pl.applyMatrix4(r),pl.radius+=i,e.ray.intersectsSphere(pl)===!1)return;dl.copy(r).invert(),fl.copy(e.ray).applyMatrix4(dl);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=_l(this,e,fl,s,n,r,i);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=_l(this,e,fl,s,i,a,r-1);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=_l(this,e,fl,s,i,i+1,i);n&&t.push(n)}if(this.isLineLoop){let i=_l(this,e,fl,s,r-1,n,r-1);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function _l(e,t,n,r,i,a,o){let s=e.geometry.attributes.position;if(ll.fromBufferAttribute(s,i),ul.fromBufferAttribute(s,a),n.distanceSqToSegment(ll,ul,ml,hl)>r)return;ml.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(ml);if(!(c<t.near||c>t.far))return{distance:c,point:hl.clone().applyMatrix4(e.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:e}}var vl=class extends gl{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type=`LineLoop`}},yl=class extends Ro{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},bl=class extends Ro{constructor(e,t,n=Si,r,i,a,o=di,s=di,c,l=Ni,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Po(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},xl=class extends bl{constructor(e,t=Si,n=301,r,i,a=di,o=di,s,c=Ni){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Sl=class extends Ro{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Cl=class e extends yc{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new J(c,3)),this.setAttribute(`normal`,new J(l,3)),this.setAttribute(`uv`,new J(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new W;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},wl=class e extends yc{constructor(e=1,t=1,n=4,r=8,i=1){super(),this.type=`CapsuleGeometry`,this.parameters={radius:e,height:t,capSegments:n,radialSegments:r,heightSegments:i},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),r=Math.max(3,Math.floor(r)),i=Math.max(1,Math.floor(i));let a=[],o=[],s=[],c=[],l=t/2,u=Math.PI/2*e,d=t,f=2*u+d,p=n*2+i,m=r+1,h=new W,g=new W;for(let _=0;_<=p;_++){let v=0,y=0,b=0,x=0;if(_<=n){let t=_/n,r=t*Math.PI/2;y=-l-e*Math.cos(r),b=e*Math.sin(r),x=-e*Math.cos(r),v=t*u}else if(_<=n+i){let r=(_-n)/i;y=-l+r*t,b=e,x=0,v=u+r*d}else{let t=(_-n-i)/n,r=t*Math.PI/2;y=l+e*Math.sin(r),b=e*Math.cos(r),x=e*Math.sin(r),v=u+d+t*u}let S=Math.max(0,Math.min(1,v/f)),C=0;_===0?C=.5/r:_===p&&(C=-.5/r);for(let e=0;e<=r;e++){let t=e/r,n=t*Math.PI*2,i=Math.sin(n),a=Math.cos(n);g.x=-b*a,g.y=y,g.z=b*i,o.push(g.x,g.y,g.z),h.set(-b*a,x,b*i),h.normalize(),s.push(h.x,h.y,h.z),c.push(t+C,S)}if(_>0){let e=(_-1)*m;for(let t=0;t<r;t++){let n=e+t,r=e+t+1,i=_*m+t,o=_*m+t+1;a.push(n,r,i),a.push(r,o,i)}}}this.setIndex(a),this.setAttribute(`position`,new J(o,3)),this.setAttribute(`normal`,new J(s,3)),this.setAttribute(`uv`,new J(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}},Tl=class e extends yc{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new W,l=new U;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new J(a,3)),this.setAttribute(`normal`,new J(o,3)),this.setAttribute(`uv`,new J(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},El=class e extends yc{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new J(u,3)),this.setAttribute(`normal`,new J(d,3)),this.setAttribute(`uv`,new J(f,2));function _(){let a=new W,_=new W,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new U,m=new W,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Dl=class e extends El{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ol=class e extends yc{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new J(i,3)),this.setAttribute(`normal`,new J(i.slice(),3)),this.setAttribute(`uv`,new J(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new W,r=new W,i=new W;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new W;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new W;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new W,t=new W,n=new W,r=new W,o=new U,s=new U,c=new U;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},kl=class e extends Ol{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=1/n,i=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r];super(i,[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type=`DodecahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},Al=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){B(`Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new U:new W);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new W,r=[],i=[],a=[],o=new W,s=new Wo;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new W)}i[0]=new W,a[0]=new W;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(H(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(H(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},jl=class extends Al{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new U){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Ml=class extends jl{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function Nl(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var Pl=new W,Fl=new W,Il=new Nl,Ll=new Nl,Rl=new Nl,zl=class extends Al{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new W){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(Fl.subVectors(r[0],r[1]).add(r[0]),c=Fl);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(Pl.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=Pl),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),Il.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),Ll.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),Rl.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(Il.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),Ll.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),Rl.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(Il.calc(s),Ll.calc(s),Rl.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new W().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Bl(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function Vl(e,t){let n=1-e;return n*n*t}function Hl(e,t){return 2*(1-e)*e*t}function Ul(e,t){return e*e*t}function Wl(e,t,n,r){return Vl(e,t)+Hl(e,n)+Ul(e,r)}function Gl(e,t){let n=1-e;return n*n*n*t}function Kl(e,t){let n=1-e;return 3*n*n*e*t}function ql(e,t){return 3*(1-e)*e*e*t}function Jl(e,t){return e*e*e*t}function Yl(e,t,n,r,i){return Gl(e,t)+Kl(e,n)+ql(e,r)+Jl(e,i)}var Xl=class extends Al{constructor(e=new U,t=new U,n=new U,r=new U){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new U){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Yl(e,r.x,i.x,a.x,o.x),Yl(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Zl=class extends Al{constructor(e=new W,t=new W,n=new W,r=new W){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new W){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Yl(e,r.x,i.x,a.x,o.x),Yl(e,r.y,i.y,a.y,o.y),Yl(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ql=class extends Al{constructor(e=new U,t=new U){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new U){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new U){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},$l=class extends Al{constructor(e=new W,t=new W){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new W){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new W){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},eu=class extends Al{constructor(e=new U,t=new U,n=new U){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new U){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(Wl(e,r.x,i.x,a.x),Wl(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},tu=class extends Al{constructor(e=new W,t=new W,n=new W){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new W){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(Wl(e,r.x,i.x,a.x),Wl(e,r.y,i.y,a.y),Wl(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},nu=class extends Al{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new U){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(Bl(o,s.x,c.x,l.x,u.x),Bl(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new U().fromArray(n))}return this}},ru=Object.freeze({__proto__:null,ArcCurve:Ml,CatmullRomCurve3:zl,CubicBezierCurve:Xl,CubicBezierCurve3:Zl,EllipseCurve:jl,LineCurve:Ql,LineCurve3:$l,QuadraticBezierCurve:eu,QuadraticBezierCurve3:tu,SplineCurve:nu}),iu=class extends Al{constructor(){super(),this.type=`CurvePath`,this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?`LineCurve`:`LineCurve3`;this.curves.push(new ru[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),i=0;for(;i<r.length;){if(r[i]>=n){let e=r[i]-n,a=this.curves[i],o=a.getLength(),s=o===0?0:1-e/o;return a.getPointAt(s,t)}i++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,i=this.curves;r<i.length;r++){let a=i[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,s=a.getPoints(o);for(let e=0;e<s.length;e++){let r=s[e];n&&n.equals(r)||(t.push(r),n=r)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(new ru[n.type]().fromJSON(n))}return this}},au=class extends iu{constructor(e){super(),this.type=`Path`,this.currentPoint=new U,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Ql(this.currentPoint.clone(),new U(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let i=new eu(this.currentPoint.clone(),new U(e,t),new U(n,r));return this.curves.push(i),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,i,a){let o=new Xl(this.currentPoint.clone(),new U(e,t),new U(n,r),new U(i,a));return this.curves.push(o),this.currentPoint.set(i,a),this}splineThru(e){let t=new nu([this.currentPoint.clone()].concat(e));return this.curves.push(t),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,i,a){let o=this.currentPoint.x,s=this.currentPoint.y;return this.absarc(e+o,t+s,n,r,i,a),this}absarc(e,t,n,r,i,a){return this.absellipse(e,t,n,n,r,i,a),this}ellipse(e,t,n,r,i,a,o,s){let c=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(e+c,t+l,n,r,i,a,o,s),this}absellipse(e,t,n,r,i,a,o,s){let c=new jl(e,t,n,r,i,a,o,s);if(this.curves.length>0){let e=c.getPoint(0);e.equals(this.currentPoint)||this.lineTo(e.x,e.y)}this.curves.push(c);let l=c.getPoint(1);return this.currentPoint.copy(l),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},ou=class extends au{constructor(e){super(e),this.uuid=Qa(),this.type=`Shape`,this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(new au().fromJSON(n))}return this}};function su(e,t,n=2){let r=t&&t.length,i=r?t[0]*n:e.length,a=cu(e,0,i,n,!0),o=[];if(!a||a.next===a.prev)return o;let s,c,l;if(r&&(a=hu(e,t,a,n)),e.length>80*n){s=e[0],c=e[1];let t=s,r=c;for(let a=n;a<i;a+=n){let n=e[a],i=e[a+1];n<s&&(s=n),i<c&&(c=i),n>t&&(t=n),i>r&&(r=i)}l=Math.max(t-s,r-c),l=l===0?0:32767/l}return uu(a,o,n,s,c,l,0),o}function cu(e,t,n,r,i){let a;if(i===zu(e,t,n,r)>0)for(let i=t;i<n;i+=r)a=Iu(i/r|0,e[i],e[i+1],a);else for(let i=n-r;i>=t;i-=r)a=Iu(i/r|0,e[i],e[i+1],a);return a&&Ou(a,a.next)&&(Lu(a),a=a.next),a}function lu(e,t){if(!e)return e;t||=e;let n=e,r;do if(r=!1,!n.steiner&&(Ou(n,n.next)||Du(n.prev,n,n.next)===0)){if(Lu(n),n=t=n.prev,n===n.next)break;r=!0}else n=n.next;while(r||n!==t);return t}function uu(e,t,n,r,i,a,o){if(!e)return;!o&&a&&bu(e,r,i,a);let s=e;for(;e.prev!==e.next;){let c=e.prev,l=e.next;if(a?fu(e,r,i,a):du(e)){t.push(c.i,e.i,l.i),Lu(e),e=l.next,s=l.next;continue}if(e=l,e===s){o?o===1?(e=pu(lu(e),t),uu(e,t,n,r,i,a,2)):o===2&&mu(e,t,n,r,i,a):uu(lu(e),t,n,r,i,a,1);break}}}function du(e){let t=e.prev,n=e,r=e.next;if(Du(t,n,r)>=0)return!1;let i=t.x,a=n.x,o=r.x,s=t.y,c=n.y,l=r.y,u=Math.min(i,a,o),d=Math.min(s,c,l),f=Math.max(i,a,o),p=Math.max(s,c,l),m=r.next;for(;m!==t;){if(m.x>=u&&m.x<=f&&m.y>=d&&m.y<=p&&Tu(i,s,a,c,o,l,m.x,m.y)&&Du(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function fu(e,t,n,r){let i=e.prev,a=e,o=e.next;if(Du(i,a,o)>=0)return!1;let s=i.x,c=a.x,l=o.x,u=i.y,d=a.y,f=o.y,p=Math.min(s,c,l),m=Math.min(u,d,f),h=Math.max(s,c,l),g=Math.max(u,d,f),_=Su(p,m,t,n,r),v=Su(h,g,t,n,r),y=e.prevZ,b=e.nextZ;for(;y&&y.z>=_&&b&&b.z<=v;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&Tu(s,u,c,d,l,f,y.x,y.y)&&Du(y.prev,y,y.next)>=0||(y=y.prevZ,b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&Tu(s,u,c,d,l,f,b.x,b.y)&&Du(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;y&&y.z>=_;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&Tu(s,u,c,d,l,f,y.x,y.y)&&Du(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;b&&b.z<=v;){if(b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&Tu(s,u,c,d,l,f,b.x,b.y)&&Du(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function pu(e,t){let n=e;do{let r=n.prev,i=n.next.next;!Ou(r,i)&&ku(r,n,n.next,i)&&Nu(r,i)&&Nu(i,r)&&(t.push(r.i,n.i,i.i),Lu(n),Lu(n.next),n=e=i),n=n.next}while(n!==e);return lu(n)}function mu(e,t,n,r,i,a){let o=e;do{let e=o.next.next;for(;e!==o.prev;){if(o.i!==e.i&&Eu(o,e)){let s=Fu(o,e);o=lu(o,o.next),s=lu(s,s.next),uu(o,t,n,r,i,a,0),uu(s,t,n,r,i,a,0);return}e=e.next}o=o.next}while(o!==e)}function hu(e,t,n,r){let i=[];for(let n=0,a=t.length;n<a;n++){let o=cu(e,t[n]*r,n<a-1?t[n+1]*r:e.length,r,!1);o===o.next&&(o.steiner=!0),i.push(Cu(o))}i.sort(gu);for(let e=0;e<i.length;e++)n=_u(i[e],n);return n}function gu(e,t){let n=e.x-t.x;return n===0&&(n=e.y-t.y,n===0&&(n=(e.next.y-e.y)/(e.next.x-e.x)-(t.next.y-t.y)/(t.next.x-t.x))),n}function _u(e,t){let n=vu(e,t);if(!n)return t;let r=Fu(n,e);return lu(r,r.next),lu(n,n.next)}function vu(e,t){let n=t,r=e.x,i=e.y,a=-1/0,o;if(Ou(e,n))return n;do{if(Ou(e,n.next))return n.next;if(i<=n.y&&i>=n.next.y&&n.next.y!==n.y){let e=n.x+(i-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(e<=r&&e>a&&(a=e,o=n.x<n.next.x?n:n.next,e===r))return o}n=n.next}while(n!==t);if(!o)return null;let s=o,c=o.x,l=o.y,u=1/0;n=o;do{if(r>=n.x&&n.x>=c&&r!==n.x&&wu(i<l?r:a,i,c,l,i<l?a:r,i,n.x,n.y)){let t=Math.abs(i-n.y)/(r-n.x);Nu(n,e)&&(t<u||t===u&&(n.x>o.x||n.x===o.x&&yu(o,n)))&&(o=n,u=t)}n=n.next}while(n!==s);return o}function yu(e,t){return Du(e.prev,e,t.prev)<0&&Du(t.next,e,e.next)<0}function bu(e,t,n,r){let i=e;do i.z===0&&(i.z=Su(i.x,i.y,t,n,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==e);i.prevZ.nextZ=null,i.prevZ=null,xu(i)}function xu(e){let t,n=1;do{let r=e,i;e=null;let a=null;for(t=0;r;){t++;let o=r,s=0;for(let e=0;e<n&&(s++,o=o.nextZ,o);e++);let c=n;for(;s>0||c>0&&o;)s!==0&&(c===0||!o||r.z<=o.z)?(i=r,r=r.nextZ,s--):(i=o,o=o.nextZ,c--),a?a.nextZ=i:e=i,i.prevZ=a,a=i;r=o}a.nextZ=null,n*=2}while(t>1);return e}function Su(e,t,n,r,i){return e=(e-n)*i|0,t=(t-r)*i|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function Cu(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function wu(e,t,n,r,i,a,o,s){return(i-o)*(t-s)>=(e-o)*(a-s)&&(e-o)*(r-s)>=(n-o)*(t-s)&&(n-o)*(a-s)>=(i-o)*(r-s)}function Tu(e,t,n,r,i,a,o,s){return(e!==o||t!==s)&&wu(e,t,n,r,i,a,o,s)}function Eu(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!Mu(e,t)&&(Nu(e,t)&&Nu(t,e)&&Pu(e,t)&&(Du(e.prev,e,t.prev)||Du(e,t.prev,t))||Ou(e,t)&&Du(e.prev,e,e.next)>0&&Du(t.prev,t,t.next)>0)}function Du(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function Ou(e,t){return e.x===t.x&&e.y===t.y}function ku(e,t,n,r){let i=ju(Du(e,t,n)),a=ju(Du(e,t,r)),o=ju(Du(n,r,e)),s=ju(Du(n,r,t));return!!(i!==a&&o!==s||i===0&&Au(e,n,t)||a===0&&Au(e,r,t)||o===0&&Au(n,e,r)||s===0&&Au(n,t,r))}function Au(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function ju(e){return e>0?1:e<0?-1:0}function Mu(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&ku(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function Nu(e,t){return Du(e.prev,e,e.next)<0?Du(e,t,e.next)>=0&&Du(e,e.prev,t)>=0:Du(e,t,e.prev)<0||Du(e,e.next,t)<0}function Pu(e,t){let n=e,r=!1,i=(e.x+t.x)/2,a=(e.y+t.y)/2;do n.y>a!=n.next.y>a&&n.next.y!==n.y&&i<(n.next.x-n.x)*(a-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next;while(n!==e);return r}function Fu(e,t){let n=Ru(e.i,e.x,e.y),r=Ru(t.i,t.x,t.y),i=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=i,i.prev=n,r.next=n,n.prev=r,a.next=r,r.prev=a,r}function Iu(e,t,n,r){let i=Ru(e,t,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function Lu(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function Ru(e,t,n){return{i:e,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function zu(e,t,n,r){let i=0;for(let a=t,o=n-r;a<n;a+=r)i+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return i}var Bu=class{static triangulate(e,t,n=2){return su(e,t,n)}},Vu=class e{static area(e){let t=e.length,n=0;for(let r=t-1,i=0;i<t;r=i++)n+=e[r].x*e[i].y-e[i].x*e[r].y;return n*.5}static isClockWise(t){return e.area(t)<0}static triangulateShape(e,t){let n=[],r=[],i=[];Hu(e),Uu(n,e);let a=e.length;t.forEach(Hu);for(let e=0;e<t.length;e++)r.push(a),a+=t[e].length,Uu(n,t[e]);let o=Bu.triangulate(n,r);for(let e=0;e<o.length;e+=3)i.push(o.slice(e,e+3));return i}};function Hu(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function Uu(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}var Wu=class e extends yc{constructor(e=new ou([new U(.5,.5),new U(-.5,.5),new U(-.5,-.5),new U(.5,-.5)]),t={}){super(),this.type=`ExtrudeGeometry`,this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],i=[];for(let t=0,n=e.length;t<n;t++){let n=e[t];a(n)}this.setAttribute(`position`,new J(r,3)),this.setAttribute(`uv`,new J(i,2)),this.computeVertexNormals();function a(e){let a=[],o=t.curveSegments===void 0?12:t.curveSegments,s=t.steps===void 0?1:t.steps,c=t.depth===void 0?1:t.depth,l=t.bevelEnabled===void 0||t.bevelEnabled,u=t.bevelThickness===void 0?.2:t.bevelThickness,d=t.bevelSize===void 0?u-.1:t.bevelSize,f=t.bevelOffset===void 0?0:t.bevelOffset,p=t.bevelSegments===void 0?3:t.bevelSegments,m=t.extrudePath,h=t.UVGenerator===void 0?Gu:t.UVGenerator,g,_=!1,v,y,b,x;if(m){g=m.getSpacedPoints(s),_=!0,l=!1;let e=m.isCatmullRomCurve3?m.closed:!1;v=m.computeFrenetFrames(s,e),y=new W,b=new W,x=new W}l||(p=0,u=0,d=0,f=0);let S=e.extractPoints(o),C=S.shape,w=S.holes;if(!Vu.isClockWise(C)){C=C.reverse();for(let e=0,t=w.length;e<t;e++){let t=w[e];Vu.isClockWise(t)&&(w[e]=t.reverse())}}function T(e){let t=e[0];for(let n=1;n<=e.length;n++){let r=n%e.length,i=e[r],a=i.x-t.x,o=i.y-t.y,s=a*a+o*o,c=Math.max(Math.abs(i.x),Math.abs(i.y),Math.abs(t.x),Math.abs(t.y));if(s<=10000000000000001e-36*c*c){e.splice(r,1),n--;continue}t=i}}T(C),w.forEach(T);let E=w.length,D=C;for(let e=0;e<E;e++){let t=w[e];C=C.concat(t)}function O(e,t,n){return t||V(`ExtrudeGeometry: vec does not exist`),e.clone().addScaledVector(t,n)}let k=C.length;function A(e,t,n){let r,i,a,o=e.x-t.x,s=e.y-t.y,c=n.x-e.x,l=n.y-e.y,u=o*o+s*s,d=o*l-s*c;if(Math.abs(d)>2**-52){let d=Math.sqrt(u),f=Math.sqrt(c*c+l*l),p=t.x-s/d,m=t.y+o/d,h=n.x-l/f,g=n.y+c/f,_=((h-p)*l-(g-m)*c)/(o*l-s*c);r=p+o*_-e.x,i=m+s*_-e.y;let v=r*r+i*i;if(v<=2)return new U(r,i);a=Math.sqrt(v/2)}else{let e=!1;o>2**-52?c>2**-52&&(e=!0):o<-(2**-52)?c<-(2**-52)&&(e=!0):Math.sign(s)===Math.sign(l)&&(e=!0),e?(r=-s,i=o,a=Math.sqrt(u)):(r=o,i=s,a=Math.sqrt(u/2))}return new U(r/a,i/a)}let j=[];for(let e=0,t=D.length,n=t-1,r=e+1;e<t;e++,n++,r++)n===t&&(n=0),r===t&&(r=0),j[e]=A(D[e],D[n],D[r]);let ee=[],M,N=j.concat();for(let e=0,t=E;e<t;e++){let t=w[e];M=[];for(let e=0,n=t.length,r=n-1,i=e+1;e<n;e++,r++,i++)r===n&&(r=0),i===n&&(i=0),M[e]=A(t[e],t[r],t[i]);ee.push(M),N=N.concat(M)}let te;if(p===0)te=Vu.triangulateShape(D,w);else{let e=[],t=[];for(let n=0;n<p;n++){let r=n/p,i=u*Math.cos(r*Math.PI/2),a=d*Math.sin(r*Math.PI/2)+f;for(let t=0,n=D.length;t<n;t++){let n=O(D[t],j[t],a);se(n.x,n.y,-i),r===0&&e.push(n)}for(let e=0,n=E;e<n;e++){let n=w[e];M=ee[e];let o=[];for(let e=0,t=n.length;e<t;e++){let t=O(n[e],M[e],a);se(t.x,t.y,-i),r===0&&o.push(t)}r===0&&t.push(o)}}te=Vu.triangulateShape(e,t)}let ne=te.length,re=d+f;for(let e=0;e<k;e++){let t=l?O(C[e],N[e],re):C[e];_?(b.copy(v.normals[0]).multiplyScalar(t.x),y.copy(v.binormals[0]).multiplyScalar(t.y),x.copy(g[0]).add(b).add(y),se(x.x,x.y,x.z)):se(t.x,t.y,0)}for(let e=1;e<=s;e++)for(let t=0;t<k;t++){let n=l?O(C[t],N[t],re):C[t];_?(b.copy(v.normals[e]).multiplyScalar(n.x),y.copy(v.binormals[e]).multiplyScalar(n.y),x.copy(g[e]).add(b).add(y),se(x.x,x.y,x.z)):se(n.x,n.y,c/s*e)}for(let e=p-1;e>=0;e--){let t=e/p,n=u*Math.cos(t*Math.PI/2),r=d*Math.sin(t*Math.PI/2)+f;for(let e=0,t=D.length;e<t;e++){let t=O(D[e],j[e],r);se(t.x,t.y,c+n)}for(let e=0,t=w.length;e<t;e++){let t=w[e];M=ee[e];for(let e=0,i=t.length;e<i;e++){let i=O(t[e],M[e],r);_?se(i.x,i.y+g[s-1].y,g[s-1].x+n):se(i.x,i.y,c+n)}}}ie(),ae();function ie(){let e=r.length/3;if(l){let e=0,t=k*e;for(let e=0;e<ne;e++){let n=te[e];ce(n[2]+t,n[1]+t,n[0]+t)}e=s+p*2,t=k*e;for(let e=0;e<ne;e++){let n=te[e];ce(n[0]+t,n[1]+t,n[2]+t)}}else{for(let e=0;e<ne;e++){let t=te[e];ce(t[2],t[1],t[0])}for(let e=0;e<ne;e++){let t=te[e];ce(t[0]+k*s,t[1]+k*s,t[2]+k*s)}}n.addGroup(e,r.length/3-e,0)}function ae(){let e=r.length/3,t=0;oe(D,t),t+=D.length;for(let e=0,n=w.length;e<n;e++){let n=w[e];oe(n,t),t+=n.length}n.addGroup(e,r.length/3-e,1)}function oe(e,t){let n=e.length;for(;--n>=0;){let r=n,i=n-1;i<0&&(i=e.length-1);for(let e=0,n=s+p*2;e<n;e++){let n=k*e,a=k*(e+1);le(t+r+n,t+i+n,t+i+a,t+r+a)}}}function se(e,t,n){a.push(e),a.push(t),a.push(n)}function ce(e,t,i){ue(e),ue(t),ue(i);let a=r.length/3,o=h.generateTopUV(n,r,a-3,a-2,a-1);de(o[0]),de(o[1]),de(o[2])}function le(e,t,i,a){ue(e),ue(t),ue(a),ue(t),ue(i),ue(a);let o=r.length/3,s=h.generateSideWallUV(n,r,o-6,o-3,o-2,o-1);de(s[0]),de(s[1]),de(s[3]),de(s[1]),de(s[2]),de(s[3])}function ue(e){r.push(a[e*3+0]),r.push(a[e*3+1]),r.push(a[e*3+2])}function de(e){i.push(e.x),i.push(e.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Ku(t,n,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new ru[i.type]().fromJSON(i)),new e(r,t.options)}},Gu={generateTopUV:function(e,t,n,r,i){let a=t[n*3],o=t[n*3+1],s=t[r*3],c=t[r*3+1],l=t[i*3],u=t[i*3+1];return[new U(a,o),new U(s,c),new U(l,u)]},generateSideWallUV:function(e,t,n,r,i,a){let o=t[n*3],s=t[n*3+1],c=t[n*3+2],l=t[r*3],u=t[r*3+1],d=t[r*3+2],f=t[i*3],p=t[i*3+1],m=t[i*3+2],h=t[a*3],g=t[a*3+1],_=t[a*3+2];return Math.abs(s-u)<Math.abs(o-l)?[new U(o,1-c),new U(l,1-d),new U(f,1-m),new U(h,1-_)]:[new U(s,1-c),new U(u,1-d),new U(p,1-m),new U(g,1-_)]}};function Ku(e,t,n){if(n.shapes=[],Array.isArray(e))for(let t=0,r=e.length;t<r;t++){let r=e[t];n.shapes.push(r.uuid)}else n.shapes.push(e.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}var qu=class e extends Ol{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},Ju=class e extends yc{constructor(e=[new U(0,-.5),new U(.5,0),new U(0,.5)],t=12,n=0,r=Math.PI*2){super(),this.type=`LatheGeometry`,this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=H(r,0,Math.PI*2);let i=[],a=[],o=[],s=[],c=[],l=1/t,u=new W,d=new U,f=new W,p=new W,m=new W,h=0,g=0;for(let t=0;t<=e.length-1;t++)switch(t){case 0:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,m.copy(f),f.normalize(),s.push(f.x,f.y,f.z);break;case e.length-1:s.push(m.x,m.y,m.z);break;default:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,p.copy(f),f.x+=m.x,f.y+=m.y,f.z+=m.z,f.normalize(),s.push(f.x,f.y,f.z),m.copy(p)}for(let i=0;i<=t;i++){let f=n+i*l*r,p=Math.sin(f),m=Math.cos(f);for(let n=0;n<=e.length-1;n++){u.x=e[n].x*p,u.y=e[n].y,u.z=e[n].x*m,a.push(u.x,u.y,u.z),d.x=i/t,d.y=n/(e.length-1),o.push(d.x,d.y);let r=s[3*n+0]*p,l=s[3*n+1],f=s[3*n+0]*m;c.push(r,l,f)}}for(let n=0;n<t;n++)for(let t=0;t<e.length-1;t++){let r=t+n*e.length,a=r,o=r+e.length,s=r+e.length+1,c=r+1;i.push(a,o,c),i.push(s,c,o)}this.setIndex(i),this.setAttribute(`position`,new J(a,3)),this.setAttribute(`uv`,new J(o,2)),this.setAttribute(`normal`,new J(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.points,t.segments,t.phiStart,t.phiLength)}},Yu=class e extends yc{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new J(p,3)),this.setAttribute(`normal`,new J(m,3)),this.setAttribute(`uv`,new J(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},Xu=class e extends yc{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new W,p=new U;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new J(s,3)),this.setAttribute(`normal`,new J(c,3)),this.setAttribute(`uv`,new J(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},X=class e extends yc{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new W,d=new W,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new J(p,3)),this.setAttribute(`normal`,new J(m,3)),this.setAttribute(`uv`,new J(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},Zu=class e extends yc{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new W,f=new W,p=new W;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new J(c,3)),this.setAttribute(`normal`,new J(l,3)),this.setAttribute(`uv`,new J(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}},Qu=class e extends yc{constructor(e=new tu(new W(-1,-1,0),new W(-1,1,0),new W(1,1,0)),t=64,n=1,r=8,i=!1){super(),this.type=`TubeGeometry`,this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:i};let a=e.computeFrenetFrames(t,i);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new W,s=new W,c=new U,l=new W,u=[],d=[],f=[],p=[];m(),this.setIndex(p),this.setAttribute(`position`,new J(u,3)),this.setAttribute(`normal`,new J(d,3)),this.setAttribute(`uv`,new J(f,2));function m(){for(let e=0;e<t;e++)h(e);h(i===!1?t:0),_(),g()}function h(i){l=e.getPointAt(i/t,l);let c=a.normals[i],f=a.binormals[i];for(let e=0;e<=r;e++){let t=e/r*Math.PI*2,i=Math.sin(t),a=-Math.cos(t);s.x=a*c.x+i*f.x,s.y=a*c.y+i*f.y,s.z=a*c.z+i*f.z,s.normalize(),d.push(s.x,s.y,s.z),o.x=l.x+n*s.x,o.y=l.y+n*s.y,o.z=l.z+n*s.z,u.push(o.x,o.y,o.z)}}function g(){for(let e=1;e<=t;e++)for(let t=1;t<=r;t++){let n=(r+1)*(e-1)+(t-1),i=(r+1)*e+(t-1),a=(r+1)*e+t,o=(r+1)*(e-1)+t;p.push(n,i,o),p.push(i,a,o)}}function _(){for(let e=0;e<=t;e++)for(let n=0;n<=r;n++)c.x=e/t,c.y=n/r,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(t){return new e(new ru[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};function $u(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(td(i))i.isRenderTargetTexture?(B(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i))if(td(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice();else t[n][r]=i}}return t}function ed(e){let t={};for(let n=0;n<e.length;n++){let r=$u(e[n]);for(let e in r)t[e]=r[e]}return t}function td(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function nd(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function rd(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Oo.workingColorSpace}var id={clone:$u,merge:ed},ad=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,od=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,sd=class extends xc{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ad,this.fragmentShader=od,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=$u(e.uniforms),this.uniformsGroups=nd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new q().setHex(r.value);break;case`v2`:this.uniforms[n].value=new U().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new W().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new zo().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new G().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new Wo().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},cd=class extends sd{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},Z=class extends xc{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new q(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new q(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new U(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new es,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ld=class extends Z{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:``,PHYSICAL:``},this.type=`MeshPhysicalMaterial`,this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new U(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return H(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new q(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new q(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new q(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:``,PHYSICAL:``},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},ud=class extends xc{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=ka,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},dd=class extends xc{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function fd(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}var pd=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},md=class extends pd{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ea,endingEnd:Ea}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Da:i=e,o=2*t-n;break;case Oa:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Da:a=e,s=2*n-t;break;case Oa:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},hd=class extends pd{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},gd=class extends pd{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},_d=class extends pd{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=(n-t)/(r-t),S,C,w,T,E;for(let e=0;e<8;e++){S=x*x,C=S*x,w=1-x,T=w*w,E=T*w;let e=E*t+3*T*x*g+3*w*S*y+C*r-n;if(Math.abs(e)<1e-10)break;let i=3*T*(g-t)+6*w*x*(y-g)+3*S*(r-y);if(Math.abs(i)<1e-10)break;x-=e/i,x=Math.max(0,Math.min(1,x))}i[p]=E*o+3*T*x*_+3*w*S*b+C*m}return i}},vd=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=fd(t,this.TimeBufferType),this.values=fd(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:fd(e.times,Array),values:fd(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new gd(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new hd(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new md(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new _d(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Sa:t=this.InterpolantFactoryMethodDiscrete;break;case Ca:t=this.InterpolantFactoryMethodLinear;break;case wa:t=this.InterpolantFactoryMethodSmooth;break;case Ta:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t);return B(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Sa;case this.InterpolantFactoryMethodLinear:return Ca;case this.InterpolantFactoryMethodSmooth:return wa;case this.InterpolantFactoryMethodBezier:return Ta}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(V(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(V(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){V(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){V(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Ra(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){V(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===wa,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0]))if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};vd.prototype.ValueTypeName=``,vd.prototype.TimeBufferType=Float32Array,vd.prototype.ValueBufferType=Float32Array,vd.prototype.DefaultInterpolation=Ca;var yd=class extends vd{constructor(e,t,n){super(e,t,n)}};yd.prototype.ValueTypeName=`bool`,yd.prototype.ValueBufferType=Array,yd.prototype.DefaultInterpolation=Sa,yd.prototype.InterpolantFactoryMethodLinear=void 0,yd.prototype.InterpolantFactoryMethodSmooth=void 0;var bd=class extends vd{constructor(e,t,n,r){super(e,t,n,r)}};bd.prototype.ValueTypeName=`color`;var xd=class extends vd{constructor(e,t,n,r){super(e,t,n,r)}};xd.prototype.ValueTypeName=`number`;var Sd=class extends pd{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)xo.slerpFlat(i,0,a,c-o,a,c,s);return i}},Cd=class extends vd{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Sd(this.times,this.values,this.getValueSize(),e)}};Cd.prototype.ValueTypeName=`quaternion`,Cd.prototype.InterpolantFactoryMethodSmooth=void 0;var wd=class extends vd{constructor(e,t,n){super(e,t,n)}};wd.prototype.ValueTypeName=`string`,wd.prototype.ValueBufferType=Array,wd.prototype.DefaultInterpolation=Sa,wd.prototype.InterpolantFactoryMethodLinear=void 0,wd.prototype.InterpolantFactoryMethodSmooth=void 0;var Td=class extends vd{constructor(e,t,n,r){super(e,t,n,r)}};Td.prototype.ValueTypeName=`vector`;var Ed=class extends _s{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new q(e),this.intensity=t}dispose(){this.dispatchEvent({type:`dispose`})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Dd=class extends Ed{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(_s.DEFAULT_UP),this.updateMatrix(),this.groundColor=new q(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Od=new Wo,kd=new W,Ad=new W,jd=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new U(512,512),this.mapType=_i,this.map=null,this.mapPass=null,this.matrix=new Wo,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new sl,this._frameExtents=new U(1,1),this._viewportCount=1,this._viewports=[new zo(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;kd.setFromMatrixPosition(e.matrixWorld),t.position.copy(kd),Ad.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ad),t.updateMatrixWorld(),Od.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Od,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===2001||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Od)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Md=new W,Nd=new xo,Pd=new W,Fd=class extends _s{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new Wo,this.projectionMatrix=new Wo,this.projectionMatrixInverse=new Wo,this.coordinateSystem=Ia,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Md,Nd,Pd),Pd.x===1&&Pd.y===1&&Pd.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Md,Nd,Pd.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Md,Nd,Pd),Pd.x===1&&Pd.y===1&&Pd.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Md,Nd,Pd.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Id=new W,Ld=new U,Rd=new U,zd=class extends Fd{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Za*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Xa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Za*2*Math.atan(Math.tan(Xa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Id.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Id.x,Id.y).multiplyScalar(-e/Id.z),Id.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Id.x,Id.y).multiplyScalar(-e/Id.z)}getViewSize(e,t){return this.getViewBounds(e,Ld,Rd),t.subVectors(Rd,Ld)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Xa*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Bd=class extends Fd{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Vd=class extends jd{constructor(){super(new Bd(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Hd=class extends Ed{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(_s.DEFAULT_UP),this.updateMatrix(),this.target=new _s,this.shadow=new Vd}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Ud=-90,Wd=1,Gd=class extends _s{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new zd(Ud,Wd,e,t);r.layers=this.layers,this.add(r);let i=new zd(Ud,Wd,e,t);i.layers=this.layers,this.add(i);let a=new zd(Ud,Wd,e,t);a.layers=this.layers,this.add(a);let o=new zd(Ud,Wd,e,t);o.layers=this.layers,this.add(o);let s=new zd(Ud,Wd,e,t);s.layers=this.layers,this.add(s);let c=new zd(Ud,Wd,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Kd=class extends zd{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},qd=`\\[\\]\\.:\\/`,Jd=RegExp(`[\\[\\]\\.:\\/]`,`g`),Yd=`[^\\[\\]\\.:\\/]`,Xd=`[^`+qd.replace(`\\.`,``)+`]`,Zd=`((?:WC+[\\/:])*)`.replace(`WC`,Yd),Qd=`(WCOD+)?`.replace(`WCOD`,Xd),$d=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Yd),ef=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Yd),tf=RegExp(`^`+Zd+Qd+$d+ef+`$`),nf=[`material`,`materials`,`bones`,`map`],rf=class{constructor(e,t,n){let r=n||af.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},af=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Jd,``)}static parseTrackName(e){let t=tf.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);nf.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){B(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){V(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){V(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){V(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){V(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){V(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){V(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){V(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;V(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){V(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){V(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};af.Composite=rf,af.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},af.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},af.prototype.GetterByBindingType=[af.prototype._getValue_direct,af.prototype._getValue_array,af.prototype._getValue_arrayElement,af.prototype._getValue_toArray],af.prototype.SetterByBindingTypeAndVersioning=[[af.prototype._setValue_direct,af.prototype._setValue_direct_setNeedsUpdate,af.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[af.prototype._setValue_array,af.prototype._setValue_array_setNeedsUpdate,af.prototype._setValue_array_setMatrixWorldNeedsUpdate],[af.prototype._setValue_arrayElement,af.prototype._setValue_arrayElement_setNeedsUpdate,af.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[af.prototype._setValue_fromArray,af.prototype._setValue_fromArray_setNeedsUpdate,af.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var of=new Wo,sf=class{constructor(e,t,n=0,r=1/0){this.ray=new kc(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new ts,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):V(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return of.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(of),this}intersectObject(e,t=!0,n=[]){return lf(e,this,n,t),n.sort(cf),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)lf(e[r],this,n,t);return n.sort(cf),n}};function cf(e,t){return e.distance-t.distance}function lf(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)lf(r[e],t,n,!0)}}(class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});function uf(e,t,n,r){let i=df(r);switch(n){case Ai:return e*t;case Fi:return e*t/i.components*i.byteLength;case Ii:return e*t/i.components*i.byteLength;case Li:return e*t*2/i.components*i.byteLength;case Ri:return e*t*2/i.components*i.byteLength;case ji:return e*t*3/i.components*i.byteLength;case Mi:return e*t*4/i.components*i.byteLength;case zi:return e*t*4/i.components*i.byteLength;case Bi:case Vi:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Hi:case Ui:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Gi:case qi:return Math.max(e,16)*Math.max(t,8)/4;case Wi:case Ki:return Math.max(e,8)*Math.max(t,8)/2;case Ji:case Yi:case Zi:case Qi:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Xi:case $i:case ea:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ta:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case na:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case ra:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case ia:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case aa:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case oa:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case sa:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case ca:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case la:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case ua:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case da:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case fa:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case pa:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case ma:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case ha:case ga:case _a:return Math.ceil(e/4)*Math.ceil(t/4)*16;case va:case ya:return Math.ceil(e/4)*Math.ceil(t/4)*8;case ba:case xa:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function df(e){switch(e){case _i:case vi:return{byteLength:1,components:1};case bi:case yi:case wi:return{byteLength:2,components:1};case Ti:case Ei:return{byteLength:2,components:4};case Si:case xi:case Ci:return{byteLength:4,components:1};case Oi:case ki:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`185`}})),typeof window<`u`&&(window.__THREE__?B(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`185`);function ff(){let e=null,t=!1,n=null,r=null;function i(t,a){n(t,a),r=e.requestAnimationFrame(i)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function pf(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Q={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},$={common:{diffuse:{value:new q(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new G},alphaMap:{value:null},alphaMapTransform:{value:new G},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new G}},envmap:{envMap:{value:null},envMapRotation:{value:new G},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new G}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new G}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new G},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new G},normalScale:{value:new U(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new G},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new G}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new G}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new G}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new q(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new W},probesMax:{value:new W},probesResolution:{value:new W}},points:{diffuse:{value:new q(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new G},alphaTest:{value:0},uvTransform:{value:new G}},sprite:{diffuse:{value:new q(16777215)},opacity:{value:1},center:{value:new U(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new G},alphaMap:{value:null},alphaMapTransform:{value:new G},alphaTest:{value:0}}},mf={basic:{uniforms:ed([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.fog]),vertexShader:Q.meshbasic_vert,fragmentShader:Q.meshbasic_frag},lambert:{uniforms:ed([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.fog,$.lights,{emissive:{value:new q(0)},envMapIntensity:{value:1}}]),vertexShader:Q.meshlambert_vert,fragmentShader:Q.meshlambert_frag},phong:{uniforms:ed([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.fog,$.lights,{emissive:{value:new q(0)},specular:{value:new q(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Q.meshphong_vert,fragmentShader:Q.meshphong_frag},standard:{uniforms:ed([$.common,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.roughnessmap,$.metalnessmap,$.fog,$.lights,{emissive:{value:new q(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Q.meshphysical_vert,fragmentShader:Q.meshphysical_frag},toon:{uniforms:ed([$.common,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.gradientmap,$.fog,$.lights,{emissive:{value:new q(0)}}]),vertexShader:Q.meshtoon_vert,fragmentShader:Q.meshtoon_frag},matcap:{uniforms:ed([$.common,$.bumpmap,$.normalmap,$.displacementmap,$.fog,{matcap:{value:null}}]),vertexShader:Q.meshmatcap_vert,fragmentShader:Q.meshmatcap_frag},points:{uniforms:ed([$.points,$.fog]),vertexShader:Q.points_vert,fragmentShader:Q.points_frag},dashed:{uniforms:ed([$.common,$.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Q.linedashed_vert,fragmentShader:Q.linedashed_frag},depth:{uniforms:ed([$.common,$.displacementmap]),vertexShader:Q.depth_vert,fragmentShader:Q.depth_frag},normal:{uniforms:ed([$.common,$.bumpmap,$.normalmap,$.displacementmap,{opacity:{value:1}}]),vertexShader:Q.meshnormal_vert,fragmentShader:Q.meshnormal_frag},sprite:{uniforms:ed([$.sprite,$.fog]),vertexShader:Q.sprite_vert,fragmentShader:Q.sprite_frag},background:{uniforms:{uvTransform:{value:new G},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Q.background_vert,fragmentShader:Q.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new G}},vertexShader:Q.backgroundCube_vert,fragmentShader:Q.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Q.cube_vert,fragmentShader:Q.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Q.equirect_vert,fragmentShader:Q.equirect_frag},distance:{uniforms:ed([$.common,$.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Q.distance_vert,fragmentShader:Q.distance_frag},shadow:{uniforms:ed([$.lights,$.fog,{color:{value:new q(0)},opacity:{value:1}}]),vertexShader:Q.shadow_vert,fragmentShader:Q.shadow_frag}};mf.physical={uniforms:ed([mf.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new G},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new G},clearcoatNormalScale:{value:new U(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new G},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new G},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new G},sheen:{value:0},sheenColor:{value:new q(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new G},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new G},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new G},transmissionSamplerSize:{value:new U},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new G},attenuationDistance:{value:0},attenuationColor:{value:new q(0)},specularColor:{value:new q(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new G},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new G},anisotropyVector:{value:new U},anisotropyMap:{value:null},anisotropyMapTransform:{value:new G}}]),vertexShader:Q.meshphysical_vert,fragmentShader:Q.meshphysical_frag};var hf={r:0,b:0,g:0},gf=new Wo,_f=new G;_f.set(-1,0,0,0,1,0,0,0,1);function vf(e,t,n,r,i,a){let o=new q(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new Y(new Cl(1,1,1),new sd({name:`BackgroundCubeMaterial`,uniforms:$u(mf.backgroundCube.uniforms),vertexShader:mf.backgroundCube.vertexShader,fragmentShader:mf.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(gf.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(_f),l.material.toneMapped=Oo.getTransfer(i.colorSpace)!==Na,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new Y(new Yu(2,2),new sd({name:`BackgroundMaterial`,uniforms:$u(mf.background.uniforms),vertexShader:mf.background.vertexShader,fragmentShader:mf.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Oo.getTransfer(i.colorSpace)!==Na,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(hf,rd(e)),n.buffers.color.setClear(hf.r,hf.g,hf.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function yf(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function bf(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function xf(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&n!==1015&&!i)}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(B(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&B(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Sf(e){let t=this,n=null,r=0,i=!1,a=!1,o=new rl,s=new G,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Cf=4,wf=[.125,.215,.35,.446,.526,.582],Tf=20,Ef=256,Df=new Bd,Of=new q,kf=null,Af=0,jf=0,Mf=!1,Nf=new W,Pf=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Nf}=i;kf=this._renderer.getRenderTarget(),Af=this._renderer.getActiveCubeFace(),jf=this._renderer.getActiveMipmapLevel(),Mf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Vf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Bf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(kf,Af,jf),this._renderer.xr.enabled=Mf,e.scissorTest=!1,Lf(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),kf=this._renderer.getRenderTarget(),Af=this._renderer.getActiveCubeFace(),jf=this._renderer.getActiveMipmapLevel(),Mf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:mi,minFilter:mi,generateMipmaps:!1,type:wi,format:Mi,colorSpace:ja,depthBuffer:!1},r=If(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=If(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Ff(r)),this._blurMaterial=zf(r,e,t),this._ggxMaterial=Rf(r,e,t)}return r}_compileMaterial(e){let t=new Y(new yc,e);this._renderer.compile(t,Df)}_sceneToCubeUV(e,t,n,r,i){let a=new zd(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Of),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Y(new Cl,new Ac({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Of),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Lf(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Vf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Bf());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Lf(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Df)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(0+c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-Cf?n-d+Cf:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,Lf(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,Df),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,Lf(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,Df)}_blur(e,t,n,r,i){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,`latitudinal`,i),this._halfBlur(a,e,n,n,r,`longitudinal`,i)}_halfBlur(e,t,n,r,i,a,o){let s=this._renderer,c=this._blurMaterial;a!==`latitudinal`&&a!==`longitudinal`&&V(`blur direction must be either latitudinal or longitudinal!`);let l=this._lodMeshes[r];l.material=c;let u=c.uniforms,d=this._sizeLods[n]-1,f=isFinite(i)?Math.PI/(2*d):2*Math.PI/39,p=i/f,m=isFinite(i)?1+Math.floor(3*p):Tf;m>Tf&&B(`sigmaRadians, ${i}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Tf}`);let h=[],g=0;for(let e=0;e<Tf;++e){let t=e/p,n=Math.exp(-t*t/2);h.push(n),e===0?g+=n:e<m&&(g+=2*n)}for(let e=0;e<h.length;e++)h[e]=h[e]/g;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=h,u.latitudinal.value=a===`latitudinal`,o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=f,u.mipInt.value=_-n;let v=this._sizeLods[r];Lf(t,3*v*(r>_-Cf?r-_+Cf:0),4*(this._cubeSize-v),3*v,2*v),s.setRenderTarget(t),s.render(l,Df)}};function Ff(e){let t=[],n=[],r=[],i=e,a=e-Cf+1+wf.length;for(let o=0;o<a;o++){let a=2**i;t.push(a);let s=1/a;o>e-Cf?s=wf[o-e+Cf-1]:o===0&&(s=0),n.push(s);let c=1/(a-2),l=-c,u=1+c,d=[l,l,u,l,u,u,l,l,u,u,l,u],f=new Float32Array(108),p=new Float32Array(72),m=new Float32Array(36);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];f.set(r,18*e),p.set(d,12*e);let i=[e,e,e,e,e,e];m.set(i,6*e)}let h=new yc;h.setAttribute(`position`,new ac(f,3)),h.setAttribute(`uv`,new ac(p,2)),h.setAttribute(`faceIndex`,new ac(m,1)),r.push(new Y(h,null)),i>Cf&&i--}return{lodMeshes:r,sizeLods:t,sigmas:n}}function If(e,t,n){let r=new Vo(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Lf(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Rf(e,t,n){return new sd({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:Ef,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Hf(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function zf(e,t,n){let r=new Float32Array(Tf),i=new W(0,1,0);return new sd({name:`SphericalGaussianBlur`,defines:{n:Tf,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Hf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Bf(){return new sd({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:Hf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Vf(){return new sd({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Hf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Hf(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var Uf=class extends Vo{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new yl(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Cl(5,5,5),i=new sd({name:`CubemapFromEquirect`,uniforms:$u(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new Y(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=mi),new Gd(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function Wf(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304)if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}else{let r=n.image;if(r&&r.height>0){let i=new Uf(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Pf(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Pf(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Gf(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Wa(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Kf(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?sc:oc)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function qf(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Jf(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:V(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Yf(e,t,n){let r=new WeakMap,i=new zo;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new Ho(h,p,m,u);g.type=Ci,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new U(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function Xf(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Zf={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function Qf(e,t,n,r,i,a){let o=new Vo(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,depthTexture:i?new bl(t,n):void 0}),s=new Vo(t,n,{type:wi,depthBuffer:!1,stencilBuffer:!1}),c=new yc;c.setAttribute(`position`,new J([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute(`uv`,new J([0,2,0,0,2,0],2));let l=new cd({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new Y(c,l),d=new Bd(-1,1,1,-1,0,1),f=null,p=null,m=!1,h,g=null,_=[],v=!1;this.setSize=function(e,t){o.setSize(e,t),s.setSize(e,t);for(let n=0;n<_.length;n++){let r=_[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){_=e,v=_.length>0&&_[0].isRenderPass===!0;let t=o.width,n=o.height;for(let e=0;e<_.length;e++){let r=_[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(m||e.toneMapping===0&&_.length===0)return!1;if(g=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return v===!1&&e.setRenderTarget(o),h=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return v},this.end=function(e,t){e.toneMapping=h,m=!0;let n=o,r=s;for(let i=0;i<_.length;i++){let a=_[i];if(a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1)){let e=n;n=r,r=e}}if(f!==e.outputColorSpace||p!==e.toneMapping){f=e.outputColorSpace,p=e.toneMapping,l.defines={},Oo.getTransfer(f)===`srgb`&&(l.defines.SRGB_TRANSFER=``);let t=Zf[p];t&&(l.defines[t]=``),l.needsUpdate=!0}l.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(g),e.render(u,d),g=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),s.dispose(),c.dispose(),l.dispose()}}var $f=new Ro,ep=new bl(1,1),tp=new Ho,np=new Uo,rp=new yl,ip=[],ap=[],op=new Float32Array(16),sp=new Float32Array(9),cp=new Float32Array(4);function lp(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=ip[i];if(a===void 0&&(a=new Float32Array(i),ip[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function up(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function dp(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function fp(e,t){let n=ap[t];n===void 0&&(n=new Int32Array(t),ap[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function pp(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function mp(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(up(n,t))return;e.uniform2fv(this.addr,t),dp(n,t)}}function hp(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(up(n,t))return;e.uniform3fv(this.addr,t),dp(n,t)}}function gp(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(up(n,t))return;e.uniform4fv(this.addr,t),dp(n,t)}}function _p(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(up(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),dp(n,t)}else{if(up(n,r))return;cp.set(r),e.uniformMatrix2fv(this.addr,!1,cp),dp(n,r)}}function vp(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(up(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),dp(n,t)}else{if(up(n,r))return;sp.set(r),e.uniformMatrix3fv(this.addr,!1,sp),dp(n,r)}}function yp(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(up(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),dp(n,t)}else{if(up(n,r))return;op.set(r),e.uniformMatrix4fv(this.addr,!1,op),dp(n,r)}}function bp(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function xp(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(up(n,t))return;e.uniform2iv(this.addr,t),dp(n,t)}}function Sp(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(up(n,t))return;e.uniform3iv(this.addr,t),dp(n,t)}}function Cp(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(up(n,t))return;e.uniform4iv(this.addr,t),dp(n,t)}}function wp(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Tp(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(up(n,t))return;e.uniform2uiv(this.addr,t),dp(n,t)}}function Ep(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(up(n,t))return;e.uniform3uiv(this.addr,t),dp(n,t)}}function Dp(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(up(n,t))return;e.uniform4uiv(this.addr,t),dp(n,t)}}function Op(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(ep.compareFunction=n.isReversedDepthBuffer()?518:515,a=ep):a=$f,n.setTexture2D(t||a,i)}function kp(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||np,i)}function Ap(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||rp,i)}function jp(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||tp,i)}function Mp(e){switch(e){case 5126:return pp;case 35664:return mp;case 35665:return hp;case 35666:return gp;case 35674:return _p;case 35675:return vp;case 35676:return yp;case 5124:case 35670:return bp;case 35667:case 35671:return xp;case 35668:case 35672:return Sp;case 35669:case 35673:return Cp;case 5125:return wp;case 36294:return Tp;case 36295:return Ep;case 36296:return Dp;case 35678:case 36198:case 36298:case 36306:case 35682:return Op;case 35679:case 36299:case 36307:return kp;case 35680:case 36300:case 36308:case 36293:return Ap;case 36289:case 36303:case 36311:case 36292:return jp}}function Np(e,t){e.uniform1fv(this.addr,t)}function Pp(e,t){let n=lp(t,this.size,2);e.uniform2fv(this.addr,n)}function Fp(e,t){let n=lp(t,this.size,3);e.uniform3fv(this.addr,n)}function Ip(e,t){let n=lp(t,this.size,4);e.uniform4fv(this.addr,n)}function Lp(e,t){let n=lp(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Rp(e,t){let n=lp(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function zp(e,t){let n=lp(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Bp(e,t){e.uniform1iv(this.addr,t)}function Vp(e,t){e.uniform2iv(this.addr,t)}function Hp(e,t){e.uniform3iv(this.addr,t)}function Up(e,t){e.uniform4iv(this.addr,t)}function Wp(e,t){e.uniform1uiv(this.addr,t)}function Gp(e,t){e.uniform2uiv(this.addr,t)}function Kp(e,t){e.uniform3uiv(this.addr,t)}function qp(e,t){e.uniform4uiv(this.addr,t)}function Jp(e,t,n){let r=this.cache,i=t.length,a=fp(n,i);up(r,a)||(e.uniform1iv(this.addr,a),dp(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?ep:$f;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Yp(e,t,n){let r=this.cache,i=t.length,a=fp(n,i);up(r,a)||(e.uniform1iv(this.addr,a),dp(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||np,a[e])}function Xp(e,t,n){let r=this.cache,i=t.length,a=fp(n,i);up(r,a)||(e.uniform1iv(this.addr,a),dp(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||rp,a[e])}function Zp(e,t,n){let r=this.cache,i=t.length,a=fp(n,i);up(r,a)||(e.uniform1iv(this.addr,a),dp(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||tp,a[e])}function Qp(e){switch(e){case 5126:return Np;case 35664:return Pp;case 35665:return Fp;case 35666:return Ip;case 35674:return Lp;case 35675:return Rp;case 35676:return zp;case 5124:case 35670:return Bp;case 35667:case 35671:return Vp;case 35668:case 35672:return Hp;case 35669:case 35673:return Up;case 5125:return Wp;case 36294:return Gp;case 36295:return Kp;case 36296:return qp;case 35678:case 36198:case 36298:case 36306:case 35682:return Jp;case 35679:case 36299:case 36307:return Yp;case 35680:case 36300:case 36308:case 36293:return Xp;case 36289:case 36303:case 36311:case 36292:return Zp}}var $p=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Mp(t.type)}},em=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Qp(t.type)}},tm=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},nm=/(\w+)(\])?(\[|\.)?/g;function rm(e,t){e.seq.push(t),e.map[t.id]=t}function im(e,t,n){let r=e.name,i=r.length;for(nm.lastIndex=0;;){let a=nm.exec(r),o=nm.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){rm(n,l===void 0?new $p(s,e,t):new em(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new tm(s),rm(n,e)),n=e}}}var am=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);im(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function om(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var sm=37297,cm=0;function lm(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var um=new G;function dm(e){Oo._getMatrix(um,Oo.workingColorSpace,e);let t=`mat3( ${um.elements.map(e=>e.toFixed(4))} )`;switch(Oo.getTransfer(e)){case Ma:return[t,`LinearTransferOETF`];case Na:return[t,`sRGBTransferOETF`];default:return B(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function fm(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+lm(e.getShaderSource(t),r)}return i}function pm(e,t){let n=dm(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var mm={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function hm(e,t){let n=mm[t];return n===void 0?(B(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var gm=new W;function _m(){return Oo.getLuminanceCoefficients(gm),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${gm.x.toFixed(4)}, ${gm.y.toFixed(4)}, ${gm.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function vm(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(xm).join(`
`)}function ym(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function bm(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function xm(e){return e!==``}function Sm(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Cm(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var wm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Tm(e){return e.replace(wm,Dm)}var Em=new Map;function Dm(e,t){let n=Q[t];if(n===void 0){let e=Em.get(t);if(e!==void 0)n=Q[e],B(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return Tm(n)}var Om=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function km(e){return e.replace(Om,Am)}function Am(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function jm(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Mm={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Nm(e){return Mm[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Pm={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function Fm(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:Pm[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var Im={302:`ENVMAP_MODE_REFRACTION`};function Lm(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Im[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Rm={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function zm(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Rm[e.combine]||`ENVMAP_BLENDING_NONE`}function Bm(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Vm(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Nm(n),l=Fm(n),u=Lm(n),d=zm(n),f=Bm(n),p=vm(n),m=ym(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(xm).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(xm).join(`
`),_.length>0&&(_+=`
`)):(g=[jm(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(xm).join(`
`),_=[jm(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Q.tonemapping_pars_fragment,n.toneMapping===0?``:hm(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Q.colorspace_pars_fragment,pm(`linearToOutputTexel`,n.outputColorSpace),_m(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(xm).join(`
`)),o=Tm(o),o=Sm(o,n),o=Cm(o,n),s=Tm(s),s=Sm(s,n),s=Cm(s,n),o=km(o),s=km(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=om(i,i.VERTEX_SHADER,y),S=om(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1)if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=fm(i,x,`vertex`),n=fm(i,S,`fragment`);V(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}else o===``?(s===``||c===``)&&(u=!1):B(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new am(i,h),T=bm(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,sm)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=cm++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var Hm=0,Um=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Wm(e),t.set(e,n)),n}},Wm=class{constructor(e){this.id=Hm++,this.code=e,this.usedTimes=0}};function Gm(e){return e===1030||e===37490||e===36285}function Km(e,t,n,r,i,a){let o=new ts,s=new Um,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&B(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=mf[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let j=e.getRenderTarget(),ee=e.state.buffers.depth.getReversed(),M=h.isInstancedMesh===!0,N=h.isBatchedMesh===!0,te=!!i.map,ne=!!i.matcap,re=!!x,ie=!!i.aoMap,ae=!!i.lightMap,oe=!!i.bumpMap&&i.wireframe===!1,se=!!i.normalMap,ce=!!i.displacementMap,le=!!i.emissiveMap,ue=!!i.metalnessMap,de=!!i.roughnessMap,fe=i.anisotropy>0,pe=i.clearcoat>0,me=i.dispersion>0,he=i.iridescence>0,ge=i.sheen>0,_e=i.transmission>0,P=fe&&!!i.anisotropyMap,ve=pe&&!!i.clearcoatMap,ye=pe&&!!i.clearcoatNormalMap,F=pe&&!!i.clearcoatRoughnessMap,be=he&&!!i.iridescenceMap,xe=he&&!!i.iridescenceThicknessMap,I=ge&&!!i.sheenColorMap,Se=ge&&!!i.sheenRoughnessMap,Ce=!!i.specularMap,we=!!i.specularColorMap,L=!!i.specularIntensityMap,Te=_e&&!!i.transmissionMap,R=_e&&!!i.thicknessMap,z=!!i.gradientMap,Ee=!!i.alphaMap,De=i.alphaTest>0,Oe=!!i.alphaHash,ke=!!i.extensions,Ae=0;i.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Ae=e.toneMapping);let je={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:N,batchingColor:N&&h._colorsTexture!==null,instancing:M,instancingColor:M&&h.instanceColor!==null,instancingMorph:M&&h.morphTexture!==null,outputColorSpace:j===null?e.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Oo.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:te,matcap:ne,envMap:re,envMapMode:re&&x.mapping,envMapCubeUVHeight:S,aoMap:ie,lightMap:ae,bumpMap:oe,normalMap:se,displacementMap:ce,emissiveMap:le,normalMapObjectSpace:se&&i.normalMapType===1,normalMapTangentSpace:se&&i.normalMapType===0,packedNormalMap:se&&i.normalMapType===0&&Gm(i.normalMap.format),metalnessMap:ue,roughnessMap:de,anisotropy:fe,anisotropyMap:P,clearcoat:pe,clearcoatMap:ve,clearcoatNormalMap:ye,clearcoatRoughnessMap:F,dispersion:me,iridescence:he,iridescenceMap:be,iridescenceThicknessMap:xe,sheen:ge,sheenColorMap:I,sheenRoughnessMap:Se,specularMap:Ce,specularColorMap:we,specularIntensityMap:L,transmission:_e,transmissionMap:Te,thicknessMap:R,gradientMap:z,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Ee,alphaTest:De,alphaHash:Oe,combine:i.combine,mapUv:te&&m(i.map.channel),aoMapUv:ie&&m(i.aoMap.channel),lightMapUv:ae&&m(i.lightMap.channel),bumpMapUv:oe&&m(i.bumpMap.channel),normalMapUv:se&&m(i.normalMap.channel),displacementMapUv:ce&&m(i.displacementMap.channel),emissiveMapUv:le&&m(i.emissiveMap.channel),metalnessMapUv:ue&&m(i.metalnessMap.channel),roughnessMapUv:de&&m(i.roughnessMap.channel),anisotropyMapUv:P&&m(i.anisotropyMap.channel),clearcoatMapUv:ve&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:ye&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:F&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:be&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:xe&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:I&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:Se&&m(i.sheenRoughnessMap.channel),specularMapUv:Ce&&m(i.specularMap.channel),specularColorMapUv:we&&m(i.specularColorMap.channel),specularIntensityMapUv:L&&m(i.specularIntensityMap.channel),transmissionMapUv:Te&&m(i.transmissionMap.channel),thicknessMapUv:R&&m(i.thicknessMap.channel),alphaMapUv:Ee&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(se||fe),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(te||Ee),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&se===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ee,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Ae,decodeVideoTexture:te&&i.map.isVideoTexture===!0&&Oo.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:le&&i.emissiveMap.isVideoTexture===!0&&Oo.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:ke&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(ke&&i.extensions.multiDraw===!0||N)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return je.vertexUv1s=c.has(1),je.vertexUv2s=c.has(2),je.vertexUv3s=c.has(3),c.clear(),je}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=mf[t];n=id.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new Vm(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function qm(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Jm(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Ym(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Xm(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.push(u):a.transparent===!0?i.push(u):n.push(u)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t,a){n.length>1&&n.sort(e||Jm),r.length>1&&r.sort(t||Ym),i.length>1&&i.sort(t||Ym),a&&(n.reverse(),r.reverse(),i.reverse())}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Zm(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Xm,e.set(t,[i])):n>=r.length?(i=new Xm,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Qm(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={direction:new W,color:new q};break;case`SpotLight`:n={position:new W,direction:new W,color:new q,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new W,color:new q,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new W,skyColor:new q,groundColor:new q};break;case`RectAreaLight`:n={color:new q,position:new W,halfWidth:new W,halfHeight:new W}}return e[t.id]=n,n}}}function $m(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new U};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new U};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new U,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var eh=0;function th(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function nh(e){let t=new Qm,n=$m(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new W);let i=new W,a=new Wo,o=new Wo;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0;i.sort(th);for(let e=0,y=i.length;e<y;e++){let y=i[e],b=y.color,x=y.intensity,S=y.distance,C=null;if(y.shadow&&y.shadow.map&&(C=y.shadow.map.texture.format===1030?y.shadow.map.texture:y.shadow.map.depthTexture||y.shadow.map.texture),y.isAmbientLight)a+=b.r*x,o+=b.g*x,s+=b.b*x;else if(y.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(y.sh.coefficients[e],x);v++}else if(y.isDirectionalLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[c]=t,r.directionalShadowMap[c]=C,r.directionalShadowMatrix[c]=y.shadow.matrix,p++}r.directional[c]=e,c++}else if(y.isSpotLight){let e=t.get(y);e.position.setFromMatrixPosition(y.matrixWorld),e.color.copy(b).multiplyScalar(x),e.distance=S,e.coneCos=Math.cos(y.angle),e.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),e.decay=y.decay,r.spot[u]=e;let i=y.shadow;if(y.map&&(r.spotLightMap[g]=y.map,g++,i.updateMatrices(y),y.castShadow&&_++),r.spotLightMatrix[u]=i.matrix,y.castShadow){let e=n.get(y);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[u]=e,r.spotShadowMap[u]=C,h++}u++}else if(y.isRectAreaLight){let e=t.get(y);e.color.copy(b).multiplyScalar(x),e.halfWidth.set(y.width*.5,0,0),e.halfHeight.set(0,y.height*.5,0),r.rectArea[d]=e,d++}else if(y.isPointLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),e.distance=y.distance,e.decay=y.decay,y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[l]=t,r.pointShadowMap[l]=C,r.pointShadowMatrix[l]=y.shadow.matrix,m++}r.point[l]=e,l++}else if(y.isHemisphereLight){let e=t.get(y);e.skyColor.copy(y.color).multiplyScalar(x),e.groundColor.copy(y.groundColor).multiplyScalar(x),r.hemi[f]=e,f++}}d>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=$.LTC_FLOAT_1,r.rectAreaLTC2=$.LTC_FLOAT_2):(r.rectAreaLTC1=$.LTC_HALF_1,r.rectAreaLTC2=$.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let y=r.hash;(y.directionalLength!==c||y.pointLength!==l||y.spotLength!==u||y.rectAreaLength!==d||y.hemiLength!==f||y.numDirectionalShadows!==p||y.numPointShadows!==m||y.numSpotShadows!==h||y.numSpotMaps!==g||y.numLightProbes!==v)&&(r.directional.length=c,r.spot.length=u,r.rectArea.length=d,r.point.length=l,r.hemi.length=f,r.directionalShadow.length=p,r.directionalShadowMap.length=p,r.pointShadow.length=m,r.pointShadowMap.length=m,r.spotShadow.length=h,r.spotShadowMap.length=h,r.directionalShadowMatrix.length=p,r.pointShadowMatrix.length=m,r.spotLightMatrix.length=h+g-_,r.spotLightMap.length=g,r.numSpotLightShadowsWithMaps=_,r.numLightProbes=v,y.directionalLength=c,y.pointLength=l,y.spotLength=u,y.rectAreaLength=d,y.hemiLength=f,y.numDirectionalShadows=p,y.numPointShadows=m,y.numSpotShadows=h,y.numSpotMaps=g,y.numLightProbes=v,r.version=eh++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=t.matrixWorldInverse;for(let t=0,f=e.length;t<f;t++){let f=e[t];if(f.isDirectionalLight){let e=r.directional[n];e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),n++}else if(f.isSpotLight){let e=r.spot[c];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),c++}else if(f.isRectAreaLight){let e=r.rectArea[l];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),o.identity(),a.copy(f.matrixWorld),a.premultiply(d),o.extractRotation(a),e.halfWidth.set(f.width*.5,0,0),e.halfHeight.set(0,f.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),l++}else if(f.isPointLight){let e=r.point[s];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),s++}else if(f.isHemisphereLight){let e=r.hemi[u];e.direction.setFromMatrixPosition(f.matrixWorld),e.direction.transformDirection(d),u++}}}return{setup:s,setupView:c,state:r}}function rh(e){let t=new nh(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function ih(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new rh(e),t.set(n,[a])):r>=i.length?(a=new rh(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var ah=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,oh=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,sh=[new W(1,0,0),new W(-1,0,0),new W(0,1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1)],ch=[new W(0,-1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1),new W(0,-1,0),new W(0,-1,0)],lh=new Wo,uh=new W,dh=new W;function fh(e,t,n){let r=new sl,i=new U,a=new U,o=new zo,s=new ud,c=new dd,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new sd({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new U},radius:{value:4}},vertexShader:ah,fragmentShader:oh}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new yc;m.setAttribute(`position`,new ac(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new Y(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(B(`WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){B(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){B(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new Vo(i.x,i.y,{format:Li,type:wi,minFilter:mi,magFilter:mi,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new bl(i.x,i.y,Ci),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=Ni,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=di,d.map.depthTexture.magFilter=di}else l.isPointLight?(d.map=new Uf(i.x),d.map.depthTexture=new xl(i.x,Si)):(d.map=new Vo(i.x,i.y),d.map.depthTexture=new bl(i.x,i.y,Si)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=Ni,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=mi,d.map.depthTexture.magFilter=mi):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=di,d.map.depthTexture.magFilter=di);d.camera.updateProjectionMatrix()}let g=d.map.isWebGLCubeRenderTarget?6:1;for(let t=0;t<g;t++){if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),uh.setFromMatrixPosition(l.matrixWorld),e.position.copy(uh),dh.copy(e.position),dh.add(sh[t]),e.up.copy(ch[t]),e.lookAt(dh),e.updateMatrixWorld(),n.makeTranslation(-uh.x,-uh.y,-uh.z),lh.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(lh,e.coordinateSystem,e.reversedDepth)}else d.updateMatrices(l);r=d.getFrustum(),b(n,s,d.camera,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null&&(n.mapPass=new Vo(i.x,i.y,{format:Li,type:wi})),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value=n.mapSize,f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value=n.mapSize,p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||r.intersectsObject(n))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=y(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)b(c[e],i,a,o,s)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function ph(e,t){function n(){let t=!1,n=new zo,r=null,i=new zo(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?ue(e.DEPTH_TEST):de(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=Ka[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?ue(e.STENCIL_TEST):de(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new q(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ee=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),M=!1,N=0,te=e.getParameter(e.VERSION);te.indexOf(`WebGL`)===-1?te.indexOf(`OpenGL ES`)!==-1&&(N=parseFloat(/^OpenGL ES (\d)/.exec(te)[1]),M=N>=2):(N=parseFloat(/^WebGL (\d)/.exec(te)[1]),M=N>=1);let ne=null,re={},ie=e.getParameter(e.SCISSOR_BOX),ae=e.getParameter(e.VIEWPORT),oe=new zo().fromArray(ie),se=new zo().fromArray(ae);function ce(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let le={};le[e.TEXTURE_2D]=ce(e.TEXTURE_2D,e.TEXTURE_2D,1),le[e.TEXTURE_CUBE_MAP]=ce(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),le[e.TEXTURE_2D_ARRAY]=ce(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),le[e.TEXTURE_3D]=ce(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),ue(e.DEPTH_TEST),o.setFunc(3),ve(!1),ye(1),ue(e.CULL_FACE),_e(0);function ue(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function de(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function fe(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function pe(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function me(t){return h!==t&&(e.useProgram(t),h=t,!0)}let he={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};he[103]=e.MIN,he[104]=e.MAX;let ge={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function _e(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(de(e.BLEND),g=!1);return}if(g===!1&&(ue(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:V(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:V(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:V(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:V(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}return}a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(he[n],he[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(ge[r],ge[i],ge[o],ge[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function P(t,n){t.side===2?de(e.CULL_FACE):ue(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ve(r),t.blending===1&&t.transparent===!1?_e(0):_e(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),be(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?ue(e.SAMPLE_ALPHA_TO_COVERAGE):de(e.SAMPLE_ALPHA_TO_COVERAGE)}function ve(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function ye(t){t===0?de(e.CULL_FACE):(ue(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function F(t){t!==k&&(M&&e.lineWidth(t),k=t)}function be(t,n,r){t?(ue(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):de(e.POLYGON_OFFSET_FILL)}function xe(t){t?ue(e.SCISSOR_TEST):de(e.SCISSOR_TEST)}function I(t){t===void 0&&(t=e.TEXTURE0+ee-1),ne!==t&&(e.activeTexture(t),ne=t)}function Se(t,n,r){r===void 0&&(r=ne===null?e.TEXTURE0+ee-1:ne);let i=re[r];i===void 0&&(i={type:void 0,texture:void 0},re[r]=i),(i.type!==t||i.texture!==n)&&(ne!==r&&(e.activeTexture(r),ne=r),e.bindTexture(t,n||le[t]),i.type=t,i.texture=n)}function Ce(){let t=re[ne];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function we(){try{e.compressedTexImage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function L(){try{e.compressedTexImage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Te(){try{e.texSubImage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function R(){try{e.texSubImage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function z(){try{e.compressedTexSubImage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Ee(){try{e.compressedTexSubImage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function De(){try{e.texStorage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Oe(){try{e.texStorage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function ke(){try{e.texImage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Ae(){try{e.texImage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function je(t){return d[t]===void 0?e.getParameter(t):d[t]}function Me(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function Ne(t){oe.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),oe.copy(t))}function Pe(t){se.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),se.copy(t))}function Fe(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Ie(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Le(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},ne=null,re={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new q(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,oe.set(0,0,e.canvas.width,e.canvas.height),se.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:ue,disable:de,bindFramebuffer:fe,drawBuffers:pe,useProgram:me,setBlending:_e,setMaterial:P,setFlipSided:ve,setCullFace:ye,setLineWidth:F,setPolygonOffset:be,setScissorTest:xe,activeTexture:I,bindTexture:Se,unbindTexture:Ce,compressedTexImage2D:we,compressedTexImage3D:L,texImage2D:ke,texImage3D:Ae,pixelStorei:Me,getParameter:je,updateUBOMapping:Fe,uniformBlockBinding:Ie,texStorage2D:De,texStorage3D:Oe,texSubImage2D:Te,texSubImage3D:R,compressedTexSubImage2D:z,compressedTexSubImage3D:Ee,scissor:Ne,viewport:Pe,reset:Le}}function mh(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new U,u=new WeakMap,d=new Set,f,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function h(e,t){return m?new OffscreenCanvas(e,t):za(`canvas`)}function g(e,t,n){let r=1,i=we(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1)if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=h(n,a));let o=t?h(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),B(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}else return`data`in e&&B(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e;return e}function _(e){return e.generateMipmaps}function v(t){e.generateMipmap(t)}function y(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function b(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];B(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||B(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?Ma:Oo.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function x(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,B(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function S(e,t){return _(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function C(e){let t=e.target;t.removeEventListener(`dispose`,C),T(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&d.delete(t)}function w(e){let t=e.target;t.removeEventListener(`dispose`,w),D(t)}function T(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&E(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function E(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function D(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let O=0;function k(){O=0}function A(){return O}function j(e){O=e}function ee(){let e=O;return e>=i.maxTextures&&B(`WebGLTextures: Trying to use `+e+` texture units while this GPU supports only `+i.maxTextures),O+=1,e}function M(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function N(t,i){let a=r.get(t);if(t.isVideoTexture&&Se(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)B(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)B(`WebGLRenderer: Texture marked for update but image is incomplete`);else{de(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function te(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){de(a,t,i);return}t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i)}function ne(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){de(a,t,i);return}n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function re(t,i){let a=r.get(t);if(t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version){fe(a,t,i);return}n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let ie={[ci]:e.REPEAT,[li]:e.CLAMP_TO_EDGE,[ui]:e.MIRRORED_REPEAT},ae={[di]:e.NEAREST,[fi]:e.NEAREST_MIPMAP_NEAREST,[pi]:e.NEAREST_MIPMAP_LINEAR,[mi]:e.LINEAR,[hi]:e.LINEAR_MIPMAP_NEAREST,[gi]:e.LINEAR_MIPMAP_LINEAR},oe={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function se(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&B(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,ie[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,ie[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,ie[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,ae[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,ae[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,oe[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function ce(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,C));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=M(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&E(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function le(e,t,n){return Math.floor(Math.floor(e/n)/t)}function ue(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=le(n.start,r.width,4),c=le(t.start,r.width,4);n.start<=i+1&&a===c&&le(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function de(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=ce(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=Oo.getPrimaries(Oo.workingColorSpace),r=o.colorSpace===``?null:Oo.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=g(o.image,!1,i.maxTextureSize);t=Ce(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=b(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);se(c,o);let h,y=o.mipmaps,C=o.isVideoTexture!==!0,w=f.__version===void 0||l===!0,T=u.dataReady,E=S(o,t);if(o.isDepthTexture)m=x(o.format===Pi,o.type),w&&(C?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture)if(y.length>0){C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else C?(w&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&ue(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data);else if(o.isCompressedTexture)if(o.isCompressedArrayTexture){C&&w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,y[0].width,y[0].height,t.depth);for(let i=0,a=y.length;i<a;i++)if(h=y[i],o.format!==1023)if(r!==null)if(C){if(T)if(o.layerUpdates.size>0){let t=uf(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}o.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0);else B(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`);else C?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data)}else{C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],o.format===1023?C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?B(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):C?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}else if(o.isDataArrayTexture)if(C){if(w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T)if(o.layerUpdates.size>0){let i=uf(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isData3DTexture)C?(w&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(w)if(C)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(y.length>0){if(C&&w){let t=we(y[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(C){if(w){let r=we(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);_(o)&&v(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function fe(t,o,s){if(o.image.length!==6)return;let c=ce(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=Oo.getPrimaries(Oo.workingColorSpace),r=o.colorSpace===``?null:Oo.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=g(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=Ce(o,m[e]);let h=m[0],y=a.convert(o.format,o.colorSpace),x=a.convert(o.type),C=b(o.internalFormat,y,x,o.normalized,o.colorSpace),w=o.isVideoTexture!==!0,T=u.__version===void 0||c===!0,E=l.dataReady,D=S(o,h);se(e.TEXTURE_CUBE_MAP,o);let O;if(f){w&&T&&n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,h.width,h.height);for(let t=0;t<6;t++){O=m[t].mipmaps;for(let r=0;r<O.length;r++){let i=O[r];o.format===1023?w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,y,x,i.data):y===null?B(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):w?E&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,i.data)}}}else{if(O=o.mipmaps,w&&T){O.length>0&&D++;let t=we(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,t.width,t.height)}for(let t=0;t<6;t++)if(p){w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,y,x,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,m[t].width,m[t].height,0,y,x,m[t].data);for(let r=0;r<O.length;r++){let i=O[r].image[t].image;w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,i.width,i.height,0,y,x,i.data)}}else{w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,y,x,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,y,x,m[t]);for(let r=0;r<O.length;r++){let i=O[r];w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,y,x,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,y,x,i.image[t])}}}_(o)&&v(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function pe(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=b(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),I(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,xe(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function me(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=x(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;I(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,xe(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,xe(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=b(o.internalFormat,c,l,o.normalized,o.colorSpace);I(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,xe(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,xe(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function he(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,(!l.__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,C)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),se(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else N(i.depthTexture,0);let u=l.__webglTexture,d=xe(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)I(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)I(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function ge(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer)if(a)for(let e=0;e<6;e++)he(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?he(i.__webglFramebuffer[0],t,0):he(i.__webglFramebuffer,t,0)}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),me(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),me(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function _e(t,n,i){let a=r.get(t);n!==void 0&&pe(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&ge(t)}function P(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,w);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&I(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=b(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=xe(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),me(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),se(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)pe(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else pe(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);_(i)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),se(c,a),pe(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),_(a)&&v(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),se(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)pe(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else pe(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);_(i)&&v(r),n.unbindTexture()}t.depthBuffer&&ge(t)}function ve(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(_(a)){let t=y(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),v(t),n.unbindTexture()}}}let ye=[],F=[];function be(t){if(t.samples>0){if(I(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(ye.length=0,F.length=0,ye.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.resolveDepthBuffer===!1&&(ye.push(l),F.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,F)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,ye))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.resolveDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function xe(e){return Math.min(i.maxSamples,e.samples)}function I(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function Se(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function Ce(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Oo.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&B(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):V(`WebGLTextures: Unsupported texture color space:`,n)),t}function we(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=ee,this.resetTextureUnits=k,this.getTextureUnits=A,this.setTextureUnits=j,this.setTexture2D=N,this.setTexture2DArray=te,this.setTexture3D=ne,this.setTextureCube=re,this.rebindTextures=_e,this.setupRenderTarget=P,this.updateRenderTargetMipmap=ve,this.updateMultisampleRenderTarget=be,this.setupDepthRenderbuffer=ge,this.setupFrameBufferTexture=pe,this.useMultisampledRTT=I,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function hh(e,t){function n(n,r=``){let i,a=Oo.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779)if(a===`srgb`)if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===35840||n===35841||n===35842||n===35843)if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491)if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821)if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===36492||n===36494||n===36495)if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===36283||n===36284||n===36285||n===36286)if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var gh=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,_h=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,vh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Sl(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new sd({vertexShader:gh,fragmentShader:_h,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Y(new Yu(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},yh=class extends qa{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new vh,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new U,C=null,w=new zd;w.viewport=new zo;let T=new zd;T.viewport=new zo;let E=[w,T],D=new Kd,O=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new ys,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new ys,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new ys,b[e]=t),t.getHandSpace()};function A(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function j(){r.removeEventListener(`select`,A),r.removeEventListener(`selectstart`,A),r.removeEventListener(`selectend`,A),r.removeEventListener(`squeeze`,A),r.removeEventListener(`squeezestart`,A),r.removeEventListener(`squeezeend`,A),r.removeEventListener(`end`,j),r.removeEventListener(`inputsourceschange`,ee);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}O=null,k=null,h.reset();for(let e in g)delete g[e];e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,oe.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&B(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&B(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,A),r.addEventListener(`selectstart`,A),r.addEventListener(`selectend`,A),r.addEventListener(`squeeze`,A),r.addEventListener(`squeezestart`,A),r.addEventListener(`squeezeend`,A),r.addEventListener(`end`,j),r.addEventListener(`inputsourceschange`,ee),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?Pi:Ni,a=_.stencil?Di:Si);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Vo(d.textureWidth,d.textureHeight,{format:Mi,type:_i,depthTexture:new bl(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Vo(f.framebufferWidth,f.framebufferHeight,{format:Mi,type:_i,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),oe.setContext(r),oe.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function ee(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}let M=new W,N=new W;function te(e,t,n){M.setFromMatrixPosition(t.matrixWorld),N.setFromMatrixPosition(n.matrixWorld);let r=M.distanceTo(N),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function ne(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),D.near=T.near=w.near=t,D.far=T.far=w.far=n,(O!==D.near||k!==D.far)&&(r.updateRenderState({depthNear:D.near,depthFar:D.far}),O=D.near,k=D.far),D.layers.mask=e.layers.mask|6,w.layers.mask=D.layers.mask&-5,T.layers.mask=D.layers.mask&-3;let i=e.parent,a=D.cameras;ne(D,i);for(let e=0;e<a.length;e++)ne(a[e],i);a.length===2?te(D,w,T):D.projectionMatrix.copy(w.projectionMatrix),re(e,D,i)};function re(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=Za*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(D)},this.getCameraTexture=function(e){return g[e]};let ie=null;function ae(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==D.cameras.length&&(D.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=E[n];o===void 0&&(o=new zd,o.layers.enable(n),o.viewport=new zo,E[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(D.matrix.copy(o.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),i===!0&&D.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new Sl,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}ie&&ie(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let oe=new ff;oe.setAnimationLoop(ae),this.setAnimationLoop=function(e){ie=e},this.dispose=function(){}}},bh=new Wo,xh=new G;xh.set(-1,0,0,0,1,0,0,0,1);function Sh(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,rd(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(bh.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(xh),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Ch(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return V(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?B(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):B(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var wh=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Th=null;function Eh(){return Th===null&&(Th=new Wc(wh,16,16,Li,wi),Th.name=`DFG_LUT`,Th.minFilter=mi,Th.magFilter=mi,Th.wrapS=li,Th.wrapT=li,Th.generateMipmaps=!1,Th.needsUpdate=!0),Th}var Dh=class{constructor(e={}){let{canvas:t=Ba(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=_i}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([zi,Ri,Ii]),g=new Set([_i,Si,bi,Di,Ti,Ei]),_=new Uint32Array(4),v=new Int32Array(4),y=new W,b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,k=null,A=null;this._outputColorSpace=Aa;let j=0,ee=0,M=null,N=-1,te=null,ne=new zo,re=new zo,ie=null,ae=new q(0),oe=0,se=t.width,ce=t.height,le=1,ue=null,de=null,fe=new zo(0,0,se,ce),pe=new zo(0,0,se,ce),me=!1,he=new sl,ge=!1,_e=!1,P=new Wo,ve=new W,ye=new zo,F={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},be=!1;function xe(){return M===null?le:1}let I=n;function Se(e,n){return t.getContext(e,n)}try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r185`),t.addEventListener(`webglcontextlost`,Ge,!1),t.addEventListener(`webglcontextrestored`,Ke,!1),t.addEventListener(`webglcontextcreationerror`,qe,!1),I===null){let t=`webgl2`;if(I=Se(t,e),I===null)throw Se(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}}catch(e){throw V(`WebGLRenderer: `+e.message),e}let Ce,we,L,Te,R,z,Ee,De,Oe,ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze,Be,Ve,He;function Ue(){Ce=new Gf(I),Ce.init(),Be=new hh(I,Ce),we=new xf(I,Ce,e,Be),L=new ph(I,Ce),we.reversedDepthBuffer&&d&&L.buffers.depth.setReversed(!0),O=I.createFramebuffer(),k=I.createFramebuffer(),A=I.createFramebuffer(),Te=new Jf(I),R=new qm,z=new mh(I,Ce,L,R,we,Be,Te),Ee=new Wf(T),De=new pf(I),Ve=new yf(I,De),Oe=new Kf(I,De,Te,Ve),ke=new Xf(I,Oe,De,Ve,Te),Le=new Yf(I,we,z),Pe=new Sf(R),Ae=new Km(T,Ee,Ce,we,Ve,Pe),je=new Sh(T,R),Me=new Zm,Ne=new ih(Ce),Ie=new vf(T,Ee,L,ke,p,s),Fe=new fh(T,ke,we),He=new Ch(I,Te,we,L),Re=new bf(I,Ce,Te),ze=new qf(I,Ce,Te),Te.programs=Ae.programs,T.capabilities=we,T.extensions=Ce,T.properties=R,T.renderLists=Me,T.shadowMap=Fe,T.state=L,T.info=Te}Ue(),m!==1009&&(w=new Qf(m,t.width,t.height,o,r,i));let We=new yh(T,I);this.xr=We,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){let e=Ce.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Ce.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return le},this.setPixelRatio=function(e){e!==void 0&&(le=e,this.setSize(se,ce,!1))},this.getSize=function(e){return e.set(se,ce)},this.setSize=function(e,n,r=!0){if(We.isPresenting){B(`WebGLRenderer: Can't change size while VR device is presenting.`);return}se=e,ce=n,t.width=Math.floor(e*le),t.height=Math.floor(n*le),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(se*le,ce*le).floor()},this.setDrawingBufferSize=function(e,n,r){se=e,ce=n,le=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009){V(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){B(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(ne)},this.getViewport=function(e){return e.copy(fe)},this.setViewport=function(e,t,n,r){e.isVector4?fe.set(e.x,e.y,e.z,e.w):fe.set(e,t,n,r),L.viewport(ne.copy(fe).multiplyScalar(le).round())},this.getScissor=function(e){return e.copy(pe)},this.setScissor=function(e,t,n,r){e.isVector4?pe.set(e.x,e.y,e.z,e.w):pe.set(e,t,n,r),L.scissor(re.copy(pe).multiplyScalar(le).round())},this.getScissorTest=function(){return me},this.setScissorTest=function(e){L.setScissorTest(me=e)},this.setOpaqueSort=function(e){ue=e},this.setTransparentSort=function(e){de=e},this.getClearColor=function(e){return e.copy(Ie.getClearColor())},this.setClearColor=function(){Ie.setClearColor(...arguments)},this.getClearAlpha=function(){return Ie.getClearAlpha()},this.setClearAlpha=function(){Ie.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(M!==null){let t=M.texture.format;e=h.has(t)}if(e){let e=M.texture.type,t=g.has(e),n=Ie.getClearColor(),r=Ie.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,I.clearBufferuiv(I.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,I.clearBufferiv(I.COLOR,0,v))}else r|=I.COLOR_BUFFER_BIT}t&&(r|=I.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&I.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,Ge,!1),t.removeEventListener(`webglcontextrestored`,Ke,!1),t.removeEventListener(`webglcontextcreationerror`,qe,!1),Ie.dispose(),Me.dispose(),Ne.dispose(),R.dispose(),Ee.dispose(),ke.dispose(),Ve.dispose(),He.dispose(),Ae.dispose(),We.dispose(),We.removeEventListener(`sessionstart`,et),We.removeEventListener(`sessionend`,tt),nt.stop()};function Ge(e){e.preventDefault(),Ha(`WebGLRenderer: Context Lost.`),E=!0}function Ke(){Ha(`WebGLRenderer: Context Restored.`),E=!1;let e=Te.autoReset,t=Fe.enabled,n=Fe.autoUpdate,r=Fe.needsUpdate,i=Fe.type;Ue(),Te.autoReset=e,Fe.enabled=t,Fe.autoUpdate=n,Fe.needsUpdate=r,Fe.type=i}function qe(e){V(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function Je(e){let t=e.target;t.removeEventListener(`dispose`,Je),Ye(t)}function Ye(e){Xe(e),R.remove(e)}function Xe(e){let t=R.get(e).programs;t!==void 0&&(t.forEach(function(e){Ae.releaseProgram(e)}),e.isShaderMaterial&&Ae.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=F);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=ft(e,t,n,r,i);L.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Oe.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Ve.setup(i,r,s,n,c);let h,g=Re;if(c!==null&&(h=De.get(c),g=ze,g.setIndex(h)),i.isMesh)r.wireframe===!0?(L.setLineWidth(r.wireframeLinewidth*xe()),g.setMode(I.LINES)):g.setMode(I.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),L.setLineWidth(e*xe()),i.isLineSegments?g.setMode(I.LINES):i.isLineLoop?g.setMode(I.LINE_LOOP):g.setMode(I.LINE_STRIP)}else i.isPoints?g.setMode(I.POINTS):i.isSprite&&g.setMode(I.TRIANGLES);if(i.isBatchedMesh)if(Ce.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?De.get(c).bytesPerElement:1,o=R.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(I,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function Ze(e,t,n){e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,ct(e,t,n),e.side=0,e.needsUpdate=!0,ct(e,t,n),e.side=2):ct(e,t,n)}this.compile=function(e,t,n=null){n===null&&(n=e),x=Ne.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights();let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let t=e.material;if(t)if(Array.isArray(t))for(let i=0;i<t.length;i++){let a=t[i];Ze(a,n,e),r.add(a)}else Ze(t,n,e),r.add(t)}),x=C.pop(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){R.get(e).currentProgram.isReady()&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}Ce.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let Qe=null;function $e(e){Qe&&Qe(e)}function et(){nt.stop()}function tt(){nt.start()}let nt=new ff;nt.setAnimationLoop($e),typeof self<`u`&&nt.setContext(self),this.setAnimationLoop=function(e){Qe=e,We.setAnimationLoop(e),e===null?nt.stop():nt.start()},We.addEventListener(`sessionstart`,et),We.addEventListener(`sessionend`,tt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){V(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=We.enabled===!0&&We.isPresenting===!0,r=w!==null&&(M===null||n)&&w.begin(T,M);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),We.enabled===!0&&We.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(We.cameraAutoUpdate===!0&&We.updateCamera(t),t=We.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,M),x=Ne.get(e,C.length),x.init(t),x.state.textureUnits=z.getTextureUnits(),C.push(x),P.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),he.setFromProjectionMatrix(P,Ia,t.reversedDepth),_e=this.localClippingEnabled,ge=Pe.init(this.clippingPlanes,_e),b=Me.get(e,S.length),b.init(),S.push(b),We.enabled===!0&&We.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&rt(e,t,-1/0,T.sortObjects)}rt(e,t,0,T.sortObjects),b.finish(),T.sortObjects===!0&&b.sort(ue,de,t.reversedDepth),be=We.enabled===!1||We.isPresenting===!1||We.hasDepthSensing()===!1,be&&Ie.addToRenderList(b,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ge===!0&&Pe.beginShadows();let i=x.state.shadowsArray;if(Fe.render(i,e,t),ge===!0&&Pe.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];at(n,r,e,a)}be&&Ie.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];it(b,e,n,n.viewport)}}else r.length>0&&at(n,r,e,t),be&&Ie.render(e),it(b,e,t)}M!==null&&ee===0&&(z.updateMultisampleRenderTarget(M),z.updateRenderTargetMipmap(M)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),Ve.resetDefaultState(),N=-1,te=null,C.pop(),C.length>0?(x=C[C.length-1],z.setTextureUnits(x.state.textureUnits),ge===!0&&Pe.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function rt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)x.pushLightProbeGrid(e);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||he.intersectsSprite(e)){r&&ye.setFromMatrixPosition(e.matrixWorld).applyMatrix4(P);let t=ke.update(e),i=e.material;i.visible&&b.push(e,t,i,n,ye.z,null)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||he.intersectsObject(e))){let t=ke.update(e),i=e.material;if(r&&(e.boundingSphere===void 0?(t.boundingSphere===null&&t.computeBoundingSphere(),ye.copy(t.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),ye.copy(e.boundingSphere.center)),ye.applyMatrix4(e.matrixWorld).applyMatrix4(P)),Array.isArray(i)){let r=t.groups;for(let a=0,o=r.length;a<o;a++){let o=r[a],s=i[o.materialIndex];s&&s.visible&&b.push(e,t,s,n,ye.z,o)}}else i.visible&&b.push(e,t,i,n,ye.z,null)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)rt(i[e],t,n,r)}function it(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),ge===!0&&Pe.setGlobalState(T.clippingPlanes,n),r&&L.viewport(ne.copy(r)),i.length>0&&ot(i,t,n),a.length>0&&ot(a,t,n),o.length>0&&ot(o,t,n),L.buffers.depth.setTest(!0),L.buffers.depth.setMask(!0),L.buffers.color.setMask(!0),L.setPolygonOffset(!1)}function at(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=Ce.has(`EXT_color_buffer_half_float`)||Ce.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new Vo(1,1,{generateMipmaps:!0,type:e?wi:_i,minFilter:gi,samples:Math.max(4,we.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Oo.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||ne;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(ae),oe=T.getClearAlpha(),oe<1&&T.setClearColor(16777215,.5),T.clear(),be&&Ie.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),ge===!0&&Pe.setGlobalState(T.clippingPlanes,r),ot(e,n,r),z.updateMultisampleRenderTarget(a),z.updateRenderTargetMipmap(a),Ce.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,st(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(z.updateMultisampleRenderTarget(a),z.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(ae,oe),d!==void 0&&(r.viewport=d),T.toneMapping=u}function ot(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&st(o,t,n,s,l,c)}}function st(e,t,n,r,i,a){e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function ct(e,t,n){t.isScene!==!0&&(t=F);let r=R.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=Ae.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=Ae.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Ee.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,Je),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return ut(e,s),d}else s.uniforms=Ae.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=Ae.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Pe.uniform),ut(e,s),r.needsLights=mt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=x.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function lt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=am.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function ut(e,t){let n=R.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function dt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];y.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(y))return n}return null}function ft(e,t,n,r,i){t.isScene!==!0&&(t=F),z.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=M===null?T.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:Oo.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Ee.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=R.get(r),y=x.state.lights;if(ge===!0&&(_e===!0||e!==te)){let t=e===te&&r.id===N;Pe.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i.colorTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i.colorTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Pe.numPlanes||v.numIntersection!==Pe.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=x.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let S=v.currentProgram;b===!0&&(S=ct(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,S,v));let C=!1,w=!1,E=!1,O=S.getUniforms(),k=v.uniforms;if(L.useProgram(S.program)&&(C=!0,w=!0,E=!0),r.id!==N&&(N=r.id,w=!0),v.needsLights){let e=dt(x.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,w=!0)}if(C||te!==e){L.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),O.setValue(I,`projectionMatrix`,e.projectionMatrix),O.setValue(I,`viewMatrix`,e.matrixWorldInverse);let t=O.map.cameraPosition;t!==void 0&&t.setValue(I,ve.setFromMatrixPosition(e.matrixWorld)),we.logarithmicDepthBuffer&&O.setValue(I,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&O.setValue(I,`isOrthographic`,e.isOrthographicCamera===!0),te!==e&&(te=e,w=!0,E=!0)}if(v.needsLights&&(y.state.directionalShadowMap.length>0&&O.setValue(I,`directionalShadowMap`,y.state.directionalShadowMap,z),y.state.spotShadowMap.length>0&&O.setValue(I,`spotShadowMap`,y.state.spotShadowMap,z),y.state.pointShadowMap.length>0&&O.setValue(I,`pointShadowMap`,y.state.pointShadowMap,z)),i.isSkinnedMesh){O.setOptional(I,i,`bindMatrix`),O.setOptional(I,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),O.setValue(I,`boneTexture`,e.boneTexture,z))}i.isBatchedMesh&&(O.setOptional(I,i,`batchingTexture`),O.setValue(I,`batchingTexture`,i._matricesTexture,z),O.setOptional(I,i,`batchingIdTexture`),O.setValue(I,`batchingIdTexture`,i._indirectTexture,z),O.setOptional(I,i,`batchingColorTexture`),i._colorsTexture!==null&&O.setValue(I,`batchingColorTexture`,i._colorsTexture,z));let A=n.morphAttributes;if((A.position!==void 0||A.normal!==void 0||A.color!==void 0)&&Le.update(i,n,S),(w||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,O.setValue(I,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(k.envMapIntensity.value=t.environmentIntensity),k.dfgLUT!==void 0&&(k.dfgLUT.value=Eh()),w){if(O.setValue(I,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&pt(k,E),a&&r.fog===!0&&je.refreshFogUniforms(k,a),je.refreshMaterialUniforms(k,r,le,ce,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;k.probesSH.value=e.texture,k.probesMin.value.copy(e.boundingBox.min),k.probesMax.value.copy(e.boundingBox.max),k.probesResolution.value.copy(e.resolution)}am.upload(I,lt(v),k,z)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(am.upload(I,lt(v),k,z),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&O.setValue(I,`center`,i.center),O.setValue(I,`modelViewMatrix`,i.modelViewMatrix),O.setValue(I,`normalMatrix`,i.normalMatrix),O.setValue(I,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];He.update(n,S),He.bind(n,S)}}return S}function pt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function mt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return ee},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(e,t,n){let r=R.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),R.get(e.texture).__webglTexture=t,R.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=R.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){M=e,j=t,ee=n;let r=null,i=!1,a=!1;if(e){let o=R.get(e);if(o.__useDefaultFramebuffer!==void 0){L.bindFramebuffer(I.FRAMEBUFFER,o.__webglFramebuffer),ne.copy(e.viewport),re.copy(e.scissor),ie=e.scissorTest,L.viewport(ne),L.scissor(re),L.setScissorTest(ie),N=-1;return}if(o.__webglFramebuffer===void 0)z.setupRenderTarget(e);else if(o.__hasExternalTextures)z.rebindTextures(e,R.get(e.texture).__webglTexture,R.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&R.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);z.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=R.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&z.useMultisampledRTT(e)===!1?R.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,ne.copy(e.viewport),re.copy(e.scissor),ie=e.scissorTest}else ne.copy(fe).multiplyScalar(le).floor(),re.copy(pe).multiplyScalar(le).floor(),ie=me;if(n!==0&&(r=O),L.bindFramebuffer(I.FRAMEBUFFER,r)&&L.drawBuffers(e,r),L.viewport(ne),L.scissor(re),L.setScissorTest(ie),i){let r=R.get(e.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=R.get(e.textures[t]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=R.get(e.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,t.__webglTexture,n)}N=-1},this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){V(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=R.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){L.bindFramebuffer(I.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;if(e.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+s),!we.textureFormatReadable(c)){V(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(!we.textureTypeReadable(l)){V(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&I.readPixels(t,n,r,i,Be.convert(c),Be.convert(l),a)}finally{let e=M===null?null:R.get(M).__webglFramebuffer;L.bindFramebuffer(I.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=R.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c)if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){L.bindFramebuffer(I.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;if(e.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+s),!we.textureFormatReadable(l))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(!we.textureTypeReadable(u))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let d=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,d),I.bufferData(I.PIXEL_PACK_BUFFER,a.byteLength,I.STREAM_READ),I.readPixels(t,n,r,i,Be.convert(l),Be.convert(u),0);let f=M===null?null:R.get(M).__webglFramebuffer;L.bindFramebuffer(I.FRAMEBUFFER,f);let p=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await Ga(I,p,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,d),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,a),I.deleteBuffer(d),I.deleteSync(p),a}else throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;z.setTexture2D(e,0),I.copyTexSubImage2D(I.TEXTURE_2D,n,0,0,o,s,i,a),L.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Be.convert(t.format),_=Be.convert(t.type),v;t.isData3DTexture?(z.setTexture3D(t,0),v=I.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(z.setTexture2DArray(t,0),v=I.TEXTURE_2D_ARRAY):(z.setTexture2D(t,0),v=I.TEXTURE_2D),L.activeTexture(I.TEXTURE0),L.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,t.flipY),L.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),L.pixelStorei(I.UNPACK_ALIGNMENT,t.unpackAlignment);let y=L.getParameter(I.UNPACK_ROW_LENGTH),b=L.getParameter(I.UNPACK_IMAGE_HEIGHT),x=L.getParameter(I.UNPACK_SKIP_PIXELS),S=L.getParameter(I.UNPACK_SKIP_ROWS),C=L.getParameter(I.UNPACK_SKIP_IMAGES);L.pixelStorei(I.UNPACK_ROW_LENGTH,h.width),L.pixelStorei(I.UNPACK_IMAGE_HEIGHT,h.height),L.pixelStorei(I.UNPACK_SKIP_PIXELS,l),L.pixelStorei(I.UNPACK_SKIP_ROWS,u),L.pixelStorei(I.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=R.get(e),r=R.get(t),h=R.get(n.__renderTarget),g=R.get(r.__renderTarget);L.bindFramebuffer(I.READ_FRAMEBUFFER,h.__webglFramebuffer),L.bindFramebuffer(I.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,R.get(e).__webglTexture,i,d+n),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,R.get(t).__webglTexture,a,m+n)),I.blitFramebuffer(l,u,o,s,f,p,o,s,I.DEPTH_BUFFER_BIT,I.NEAREST);L.bindFramebuffer(I.READ_FRAMEBUFFER,null),L.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||R.has(e)){let n=R.get(e),r=R.get(t);L.bindFramebuffer(I.READ_FRAMEBUFFER,k),L.bindFramebuffer(I.DRAW_FRAMEBUFFER,A);for(let e=0;e<c;e++)w?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,n.__webglTexture,i),T?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,r.__webglTexture,a),i===0?T?I.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):I.copyTexSubImage2D(v,a,f,p,l,u,o,s):I.blitFramebuffer(l,u,o,s,f,p,o,s,I.COLOR_BUFFER_BIT,I.NEAREST);L.bindFramebuffer(I.READ_FRAMEBUFFER,null),L.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?I.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?I.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):I.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):I.texSubImage2D(I.TEXTURE_2D,a,f,p,o,s,g,_,h);L.pixelStorei(I.UNPACK_ROW_LENGTH,y),L.pixelStorei(I.UNPACK_IMAGE_HEIGHT,b),L.pixelStorei(I.UNPACK_SKIP_PIXELS,x),L.pixelStorei(I.UNPACK_SKIP_ROWS,S),L.pixelStorei(I.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&I.generateMipmap(v),L.unbindTexture()},this.initRenderTarget=function(e){R.get(e).__webglFramebuffer===void 0&&z.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?z.setTextureCube(e,0):e.isData3DTexture?z.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?z.setTexture2DArray(e,0):z.setTexture2D(e,0),L.unbindTexture()},this.resetState=function(){j=0,ee=0,M=null,L.reset(),Ve.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Ia}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Oo._getDrawingBufferColorSpace(e),t.unpackColorSpace=Oo._getUnpackColorSpace()}},Oh=Object.freeze({id:`butterfly-protected-a-flower`,kind:`protected-flower`,zoneId:`a-garden`,at:{x:-7.55,z:5.45},protected:!0}),kh=Object.freeze({id:`snail-protected-bc-cover`,kind:`protected-cover`,zoneId:`b-moist-soil`,at:m[1]??{x:-3.05,z:-4.95},protected:!0}),Ah={"day-butterfly":{x:-6.78,z:6.58},"land-snail":m.at(-1)??{x:-2.08,z:-6.7}},jh={"day-butterfly":{alertDistance:2.2,returnDistance:3.35,useDuration:5.5,refugeDuration:2.8,travelSpeed:3.2,searchDuration:3},"land-snail":{alertDistance:1.45,returnDistance:2.25,useDuration:8,refugeDuration:5.8,travelSpeed:.48,searchDuration:3.2}},Mh=.1,Nh={"a-garden":0,"b-bright-soil":1,"b-moist-soil":2,"d-headwater-edge":3};function Ph(e){return{x:e.x,z:e.z}}function Fh(e,t,n){let r=Math.cos(e.rotation),i=Math.sin(e.rotation);return{x:e.at.x+t*r-n*i,z:e.at.z+t*i+n*r}}function Ih(e,t){return Math.hypot(e.x-t.x,e.z-t.z)}function Lh(e,t,n){return{x:e.x+(t.x-e.x)*n,z:e.z+(t.z-e.z)*n}}function Rh(e,t){return e<t?-1:+(e>t)}function zh(e){let t=/^edit-(\d+)$/.exec(e.entryId??``);if(!t)return 2**53-1;let n=Number(t[1]);return Number.isSafeInteger(n)?n:2**53-1}function Bh(e,t){if(e.protected!==t.protected)return e.protected?-1:1;let n=Nh[e.zoneId]-Nh[t.zoneId];if(n!==0)return n;let r=zh(e)-zh(t);return r===0?Rh(e.id,t.id):r}function Vh(e){return[...e].sort(Bh)}function Hh(e,t,n=()=>!0){let r=Vh(e);if(r.length===0)return;let i=t?r.findIndex(({id:e})=>e===t):-1,a=i>=0?(i+1)%r.length:0;for(let e=0;e<r.length;e+=1){let t=r[(a+e)%r.length];if(t&&n(t))return t}}function Uh(e,t){if(e)return t.find(({id:t})=>t===e.id)}function Wh(e,t,n,r){if(Ih(e.position,t)<=r.alertDistance)return`player-near`;if(n&&e.target?.zoneId===n)return`active-edit-zone`}function Gh(e,t,n,r){return Ih(e.at,t)>=r.returnDistance&&e.zoneId!==n}function Kh(e,t){let n=e.target?.id;return{runtime:{...e,phase:`refuge`,lastTargetId:n??e.lastTargetId,motionFrom:Ph(e.position),motionProgress:0,phaseSeconds:0},events:[{type:`left-target`,kind:e.kind,reason:t,...n?{targetId:n}:{}}]}}function qh(e){return Number.isFinite(e)?Math.max(0,Math.min(e,Mh)):0}function Jh(e,t,n,r,i=[]){let a=qh(n.deltaSeconds);if(e.phase===`searching`){let t=e.searchAt;if(!t)return Kh(e,`search-complete`);if(Ih(e.position,n.playerAt)<=r.alertDistance)return Kh(e,`player-near`);if(e.motionProgress<1){let n=Math.max(.001,Ih(e.motionFrom,t)),i=Math.min(1,e.motionProgress+a*r.travelSpeed/n),o=i>=1;return{runtime:{...e,position:Lh(e.motionFrom,t,i),motionProgress:i,phaseSeconds:o?0:e.phaseSeconds},events:o?[{type:`reached-search`,kind:e.kind,at:Ph(t)}]:[]}}return e.phaseSeconds+a>=r.searchDuration?Kh(e,`search-complete`):{runtime:{...e,phaseSeconds:e.phaseSeconds+a},events:[]}}if(e.phase===`using`){let i=Uh(e.target,t);if(!i)return Kh(e,`target-missing`);let o=Wh({...e,target:i},n.playerAt,n.activeEditZoneId,r);return o?Kh({...e,target:i},o):e.phaseSeconds+a>=r.useDuration?Kh({...e,target:i},`use-complete`):{runtime:{...e,target:i,position:Ph(i.at),phaseSeconds:e.phaseSeconds+a},events:[]}}if(e.phase===`refuge`){if(e.motionProgress<1){let t=Math.max(.001,Ih(e.motionFrom,e.refuge)),n=Math.min(1,e.motionProgress+a*r.travelSpeed/t),i=n>=1;return{runtime:{...e,position:Lh(e.motionFrom,e.refuge,n),motionProgress:n,phaseSeconds:i?0:e.phaseSeconds,...i?{target:void 0}:{}},events:i?[{type:`reached-refuge`,kind:e.kind}]:[]}}let o=e.phaseSeconds+a,s=o>=r.refugeDuration;if(s&&!e.searchedLast){let t=i.find(e=>Ih(e,n.playerAt)>=r.returnDistance);if(t)return{runtime:{...e,phase:`searching`,searchAt:Ph(t),searchedLast:!0,target:void 0,motionFrom:Ph(e.position),motionProgress:0,phaseSeconds:0},events:[{type:`started-search`,kind:e.kind,at:Ph(t)}]}}let c=s?Hh(t,e.lastTargetId,e=>Gh(e,n.playerAt,n.activeEditZoneId,r)):void 0;return c?{runtime:{...e,phase:`returning`,target:c,searchedLast:!1,searchAt:void 0,motionFrom:Ph(e.position),motionProgress:0,phaseSeconds:0},events:[{type:`started-return`,kind:e.kind,targetId:c.id}]}:{runtime:{...e,phaseSeconds:o},events:[]}}let o=Uh(e.target,t);if(!o)return Kh(e,`target-missing`);let s=Wh({...e,target:o},n.playerAt,n.activeEditZoneId,r);if(s)return Kh({...e,target:o},s);let c=Math.max(.001,Ih(e.motionFrom,o.at)),l=Math.min(1,e.motionProgress+a*r.travelSpeed/c);return l>=1?{runtime:{...e,phase:`using`,target:o,position:Ph(o.at),motionFrom:Ph(o.at),motionProgress:1,phaseSeconds:0},events:[{type:`reached-target`,kind:e.kind,targetId:o.id}]}:{runtime:{...e,target:o,position:Lh(e.motionFrom,o.at,l),motionProgress:l,phaseSeconds:e.phaseSeconds+a},events:[]}}function Yh(e,t,n){let r=[Oh],i=[];for(let a of[`a-garden`,`b-bright-soil`]){let o=t.zones[a];if(o.light===`shaded`||o.opening===`sheltered`)continue;let s=0;for(let t of Object.values(e[a]))t.kind===`low-flower`&&(n&&!Xh(n,t.id)||(s+=1,r.push({id:`butterfly-`+t.id,kind:`edit-flower`,zoneId:a,at:Ph(t.at),protected:!1,entryId:t.id})));if(s>0)for(let t of Object.values(e[a]))t.kind!==`structure`||t.form!==`support`&&t.form!==`rack`||r.push({id:`butterfly-perch-`+t.id,kind:`built-perch`,zoneId:a,at:t.form===`support`?Fh(t,.23,.08):Fh(t,.25,.16),protected:!1,entryId:t.id,heightOffset:t.form===`support`?1.02:.92});if(s===0){let e=f.find(({id:e})=>e===a);e&&i.push(Ph(e.focus))}}let a=[kh],o=[];if(t.zones[`b-moist-soil`].surfaceMoisture===`moist`&&t.bToC.managedCover===`joined`){for(let e of t.bToC.connectedCover)a.push({id:`snail-`+e.id,kind:`managed-cover`,zoneId:`b-moist-soil`,at:Ph(e.at),protected:!1,entryId:e.id});for(let t of Object.values(e[`b-moist-soil`]))t.kind!==`structure`||t.form!==`rack`&&t.form!==`fence`&&t.form!==`shade`||a.push({id:`snail-shelter-`+t.id,kind:`built-shelter`,zoneId:`b-moist-soil`,at:t.form===`fence`?Fh(t,.2,.18):Fh(t,0,0),protected:!1,entryId:t.id})}else{let e=f.find(({id:e})=>e===`b-moist-soil`);e&&o.push(Ph(e.focus))}return{butterfly:Vh(r),snail:Vh(a),butterflySearch:i,snailSearch:o}}function Xh(e,t){let n=e.byEntryId[t];return n!==void 0&&hn(n)}function Zh(e,t){let n=Ah[e],r=Vh(t),i=r.find(e=>e.protected)??r[0];return i?{kind:e,phase:`using`,position:Ph(i.at),refuge:Ph(n),target:i,motionFrom:Ph(i.at),motionProgress:1,phaseSeconds:0}:{kind:e,phase:`refuge`,position:Ph(n),refuge:Ph(n),motionFrom:Ph(n),motionProgress:1,phaseSeconds:0}}function Qh(e){return{butterfly:Zh(`day-butterfly`,e.butterfly),snail:Zh(`land-snail`,e.snail)}}function $h(e,t,n=jh){let r=Jh(e.butterfly,t.opportunities.butterfly,t,n[`day-butterfly`],t.opportunities.butterflySearch),i=Jh(e.snail,t.opportunities.snail,t,n[`land-snail`],t.opportunities.snailSearch);return{state:{butterfly:r.runtime,snail:i.runtime},events:[...r.events,...i.events]}}function eg(e){return[e.butterfly,e.snail].filter(e=>!!e.target?.entryId&&(e.phase!==`refuge`||e.motionProgress<1)).flatMap(e=>e.target?.entryId?[e.target.entryId]:[]).sort(Rh)}function tg(e,t){if(!e)throw Error(`작은 주민 계약 실패: `+t)}function ng(e,t){let n=new Set;for(let r of t)tg(!n.has(r.id),e+` 후보 ID가 겹치면 안 됩니다.`),tg(Number.isFinite(r.at.x)&&Number.isFinite(r.at.z),e+` 후보 좌표는 유한해야 합니다.`),n.add(r.id)}function rg(e){ng(`day-butterfly`,e.butterfly),ng(`land-snail`,e.snail);let t=Qh(e);tg(e.butterfly.some(e=>e.protected)&&e.snail.some(e=>e.protected),`빈 편집에서도 두 주민의 보호 이용 자리가 있어야 합니다.`),tg(t.butterfly.target?.protected===!0&&t.snail.target?.protected===!0,`새 세션은 두 주민의 보호 자리에서 시작해야 합니다.`),tg(t.butterfly.kind===`day-butterfly`&&t.snail.kind===`land-snail`,`나비와 달팽이의 종류는 서로 바뀌면 안 됩니다.`);let n=JSON.stringify(t);tg(![`dead`,`lost`,`collected`,`owned`,`score`].some(e=>n.includes(e)),`죽음·소실·수집·소유·점수 상태를 만들면 안 됩니다.`)}var ig=.34,ag=.34,og=.22;function sg(e,t){let n=Math.max(0,Math.min(1,e)),r=Math.max(1,Math.floor(t)),i=n*r,a=Math.floor(i),o=i-a,s=o<=ig?0:(o-ig)/.6599999999999999;return{routeProgress:Math.min(1,(a+s)/r),lift:Math.sin(s*Math.PI)*ag,crouch:s>0?0:Math.sin(o/ig*Math.PI)*og}}var cg=20,lg=8,ug=class{scene;root=new K;transientRoot=new K;butterfly=new K;snail=new K;toad=new K;leftWing=new K;rightWing=new K;snailTentacles=new K;toadBody=new K;toadHindLegs=new K;toadEyes=new K;groundHeightAt;protectedFlower=new K;refugeLeaves=new K;snailTrailMarks=[];toadMarks=[];smallState;toadState;lastButterflyPosition;lastSnailPosition;lastToadPosition;lastButterflyPhase;lastButterflyTargetId;trailDistance=0;flowerBendAge=1/0;leafWobbleAge=1/0;disposed=!1;constructor(e,t,n,r=x){this.scene=e,this.groundHeightAt=r,this.smallState=t,this.toadState=n,this.root.name=`ecology-residents-and-habitat`,this.transientRoot.name=`ecology-transient-traces`,e.add(this.root,this.transientRoot),this.createProtectedFlower(),this.createProtectedCover(),this.createRefugeLeaves(n.refuge),this.createButterfly(),this.createSnail(),this.createToad(),this.root.traverse(e=>{e instanceof Y&&(e.castShadow=!0,e.receiveShadow=!0)}),this.reset(t,n)}sync(e,t,n){this.disposed||(this.syncButterfly(e.butterfly,!0),this.syncSnail(e.snail,!0),this.syncToad(t,n),this.smallState=e,this.toadState=t)}update(e,t){let n=Math.max(0,e);if(this.disposed||n===0)return;let r=this.smallState.butterfly,i=r.phase===`using`?3.2:9.5,a=.25+(Math.sin(t*i)+1)*.24;if(this.leftWing.rotation.z=a,this.rightWing.rotation.z=-a,this.butterfly.visible){let e=r.phase===`using`?0:Math.sin(r.motionProgress*Math.PI)*.42,n=r.target?.heightOffset??.72;if(this.butterfly.position.y=this.groundHeightAt(r.position.x,r.position.z)+(r.phase===`using`?n:.9)+e+Math.sin(t*4.1)*.045,r.phase===`searching`&&r.motionProgress>=1){let e=Math.abs(Math.sin(r.phaseSeconds*2.2)),n=.2+e*.52,i=r.phaseSeconds*1.15;this.butterfly.position.x=r.position.x+Math.cos(i)*n,this.butterfly.position.z=r.position.z+Math.sin(i)*n,this.butterfly.position.y=this.groundHeightAt(r.position.x,r.position.z)+1.28-e*.26+Math.sin(t*5.6)*.05}if(r.phase===`refuge`&&r.motionProgress>=1){let e=r.phaseSeconds*.62;this.butterfly.position.x=r.position.x+Math.cos(e)*.34,this.butterfly.position.z=r.position.z+Math.sin(e)*.34,this.butterfly.position.y=this.groundHeightAt(r.position.x,r.position.z)+.94+Math.sin(t*3.4)*.06}}let o=this.smallState.snail;this.snailTentacles.rotation.z=o.phase===`using`?Math.sin(t*.86)*.055:0;let s=this.toadState;if(this.toad.visible){let e=s.phase===`approaching`||s.phase===`away`&&!!s.activeRoute,n=s.activeRoute,r=0,i=0;if(e&&n){let e=sg(s.routeProgress,n.hopCount),t=rr(n,e.routeProgress);this.toad.position.x=t.x,this.toad.position.z=t.z,r=e.lift,i=e.crouch}let a=s.phase===`using`?Math.sin(t*2.1)*.018:0;this.toad.position.y=this.groundHeightAt(this.toad.position.x,this.toad.position.z)+.19+r+a,this.toadBody.scale.y=1+a*.85-i;let o=Math.min(.34,r*.72);this.toadHindLegs.scale.set(1+o,1,1+o*.82);let c=s.phase===`using`&&Math.sin(t*1.36)>.985;this.toadEyes.scale.y=c?.18:1}this.flowerBendAge+=n,this.protectedFlower.rotation.z=this.flowerBendAge<=.72?Math.sin(this.flowerBendAge/.72*Math.PI)*.075:0,this.leafWobbleAge+=n,this.refugeLeaves.rotation.z=this.leafWobbleAge<.9?Math.sin(this.leafWobbleAge/.9*Math.PI*3)*.08*(1-this.leafWobbleAge/.9):0,this.updateMarks(this.snailTrailMarks,n),this.updateMarks(this.toadMarks,n)}reset(e,t){this.disposed||(this.resetGroundTraces(),this.lastButterflyPosition=void 0,this.lastSnailPosition=void 0,this.lastToadPosition=void 0,this.lastButterflyPhase=e.butterfly.phase,this.lastButterflyTargetId=e.butterfly.target?.id,this.trailDistance=0,this.flowerBendAge=1/0,this.leafWobbleAge=1/0,this.protectedFlower.rotation.z=0,this.refugeLeaves.rotation.z=0,this.toadBody.scale.set(1,1,1),this.toadHindLegs.scale.set(1,1,1),this.toadEyes.scale.set(1,1,1),this.smallState=e,this.toadState=t,this.syncButterfly(e.butterfly,!1),this.syncSnail(e.snail,!1),this.syncToad(t,[]))}resetGroundTraces(){this.disposed||(this.clearMarks(this.snailTrailMarks),this.clearMarks(this.toadMarks),this.trailDistance=0)}dispose(){this.disposed||=(this.clearMarks(this.snailTrailMarks),this.clearMarks(this.toadMarks),this.scene.remove(this.root,this.transientRoot),this.disposeObject(this.root),this.disposeObject(this.transientRoot),this.root.clear(),this.transientRoot.clear(),!0)}syncButterfly(e,t){this.butterfly.visible=!0,this.butterfly.position.set(e.position.x,this.groundHeightAt(e.position.x,e.position.z)+(e.phase===`using`?e.target?.heightOffset??.72:.9),e.position.z),this.turnToward(this.butterfly,this.lastButterflyPosition,e.position),t&&e.phase===`using`&&e.target?.protected&&(this.lastButterflyPhase!==`using`||this.lastButterflyTargetId!==e.target.id)&&(this.flowerBendAge=0),this.lastButterflyPhase=e.phase,this.lastButterflyTargetId=e.target?.id,this.lastButterflyPosition={...e.position}}syncSnail(e,t){this.snail.visible=!0,this.snail.position.set(e.position.x,this.groundHeightAt(e.position.x,e.position.z)+.13,e.position.z),this.turnToward(this.snail,this.lastSnailPosition,e.position),t&&this.lastSnailPosition&&(this.trailDistance+=Math.hypot(e.position.x-this.lastSnailPosition.x,e.position.z-this.lastSnailPosition.z),this.trailDistance>=.18&&(this.trailDistance=0,this.addSnailTrailMark(e.position)));let n=e.phase===`refuge`?Math.max(.12,1-e.motionProgress*.88):e.phase===`returning`?Math.min(1,.18+e.motionProgress*.82):e.phase===`searching`?.55:1;this.snailTentacles.scale.y=n,this.lastSnailPosition={...e.position}}syncToad(e,t){let n=e.phase===`approaching`||e.phase===`using`||e.phase===`away`&&!!e.activeRoute&&e.routeProgress>0;this.toad.visible=n,this.toad.position.set(e.position.x,this.groundHeightAt(e.position.x,e.position.z)+.19,e.position.z),this.turnToward(this.toad,this.lastToadPosition,e.position);for(let n of t)n===`refuge-rustle`?this.leafWobbleAge=0:n===`water-ripple`&&e.activeRoute?this.addRipple(e.activeRoute.rippleAt,11390928,.38):n===`water-touch`?this.addRipple(e.activeRoute?.rippleAt??e.position,12836303,.44):n===`departure`&&this.addDampMark(e.position);this.lastToadPosition={...e.position}}createProtectedFlower(){let e=new $c(new El(.028,.043,1,6),new Z({color:5273162,roughness:1}),3),t=new $c(new X(1,7,4),new Z({color:15063453,roughness:.9}),9),n=new $c(new X(1,7,4),new Z({color:12950341,roughness:.9}),3),r=new _s;[-.17,0,.16].forEach((i,a)=>{let o=.46+a*.06;r.position.set(i,o/2,a%2==0?.03:-.05),r.rotation.set(0,0,i*.35),r.scale.set(1,o,1),r.updateMatrix(),e.setMatrixAt(a,r.matrix);let s=.5+a*.06;for(let e=0;e<3;e+=1)r.position.set(i+(e-1)*.075,s,a%2==0?.03:-.05),r.rotation.set(0,0,0),r.scale.set(.098,.038,.061),r.updateMatrix(),t.setMatrixAt(a*3+e,r.matrix);r.position.set(i,s+.03,a%2==0?.03:-.05),r.rotation.set(0,0,0),r.scale.setScalar(.055),r.updateMatrix(),n.setMatrixAt(a,r.matrix)}),e.instanceMatrix.needsUpdate=!0,t.instanceMatrix.needsUpdate=!0,n.instanceMatrix.needsUpdate=!0,this.protectedFlower.add(e,t,n),this.protectedFlower.position.set(Oh.at.x,this.groundHeightAt(Oh.at.x,Oh.at.z)+.04,Oh.at.z),this.root.add(this.protectedFlower)}createProtectedCover(){let e=[];for(let t=0;t<m.length-1;t+=1){let n=m[t],r=m[t+1],i=Math.hypot(r.x-n.x,r.z-n.z),a=Math.max(1,Math.ceil(i/.38));for(let t=0;t<a;t+=1){let i=t/a;e.push({x:n.x+(r.x-n.x)*i,z:n.z+(r.z-n.z)*i})}}let t=m.at(-1);t&&e.push(t);let n=new $c(new X(1,7,4),new Z({color:16777215,roughness:1}),e.length*4),r=new _s,i=[{x:-.18,z:.02,rotation:-.38},{x:.16,z:-.08,rotation:.55},{x:.01,z:.18,rotation:1.18},{x:.08,z:-.2,rotation:1.82}],a=0;e.forEach((e,t)=>{i.forEach((i,o)=>{r.position.set(e.x+i.x,this.groundHeightAt(e.x,e.z)+.13+o*.014,e.z+i.z),r.rotation.set(0,i.rotation+t*1.37,0),r.scale.set(.29+(t+o)%2*.035,.045,.13),r.updateMatrix(),n.setMatrixAt(a,r.matrix),n.setColorAt(a,new q((t+o)%3==0?5401411:6322250)),a+=1})}),n.instanceMatrix.needsUpdate=!0,n.instanceColor.needsUpdate=!0,n.name=`b-c-protected-cover`,this.root.add(n)}createRefugeLeaves(e){let t=new $c(new X(1,8,5),new Z({color:5007176,roughness:1}),4),n=new _s;[-.38,-.12,.16,.39].forEach((e,r)=>{n.position.set(e,.18+r%2*.04,(r-1.5)*.12),n.rotation.set(0,e*1.7,(r%2==0?-1:1)*.22),n.scale.set(.12,.016,.3),n.updateMatrix(),t.setMatrixAt(r,n.matrix)}),t.instanceMatrix.needsUpdate=!0,this.refugeLeaves.add(t),this.refugeLeaves.position.set(e.x,this.groundHeightAt(e.x,e.z)+.05,e.z),this.root.add(this.refugeLeaves)}createButterfly(){let e=new Y(new X(.095,8,6),new Z({color:4471086,roughness:.85}));e.scale.set(.68,.56,1.72);let t=new X(.2,9,5),n=new Z({color:13797958,roughness:.9,side:2}),r=new Z({color:14789982,roughness:.9,side:2}),i=new Z({color:5193006,roughness:.88,side:2});for(let[e,a]of[[-1,this.leftWing],[1,this.rightWing]]){let o=new Y(t,n);o.scale.set(1.28,.11,.9),o.position.set(e*.2,0,.02);let s=new Y(t,r);s.scale.set(.88,.1,.68),s.position.set(e*.16,-.005,-.15);let c=new Y(new X(.047,7,4),i);c.scale.set(1.15,.16,.76),c.position.set(e*.3,.03,.02),a.add(o,s,c)}let a=new Z({color:3879980,roughness:1});for(let e of[-1,1]){let t=new Y(new El(.009,.012,.27,5),a);t.rotation.x=Math.PI/2.35,t.rotation.z=e*.2,t.position.set(e*.035,.015,.18),this.butterfly.add(t)}this.butterfly.add(e,this.leftWing,this.rightWing),this.butterfly.scale.setScalar(1.36),this.root.add(this.butterfly)}createSnail(){let e=new Z({color:9538653,roughness:.92}),t=new Y(new X(.15,9,6),e);t.scale.set(.76,.24,1.82),t.position.set(0,-.015,.01);let n=new Y(new X(.13,9,6),e);n.scale.set(.86,.72,1.06),n.position.set(0,.075,.24);let r=new Y(new X(.19,10,7),new Z({color:11695167,roughness:.88}));r.scale.set(.52,1,.95),r.position.set(0,.17,-.05);let i=new K,a=new Z({color:5980205,roughness:.9});for(let e of[-1,1])for(let[t,n]of[[.086,.014],[.044,.009]]){let r=new Y(new Zu(t,n,5,12),a);r.rotation.y=Math.PI/2,r.position.set(e*.106,.17,-.05),i.add(r)}let o=new $c(new El(.012,.018,.2,5),new Z({color:6908227,roughness:1}),2),s=new $c(new X(.025,6,4),new Z({color:4802868,roughness:1}),2),c=new _s;[-.075,.075].forEach((e,t)=>{c.position.set(e,.13,.24),c.rotation.set(-.42,0,0),c.scale.set(1,1,1),c.updateMatrix(),o.setMatrixAt(t,c.matrix),c.position.set(e,.23,.31),c.rotation.set(0,0,0),c.updateMatrix(),s.setMatrixAt(t,c.matrix)}),o.instanceMatrix.needsUpdate=!0,s.instanceMatrix.needsUpdate=!0,this.snailTentacles.add(o,s),this.snail.add(t,n,r,i,this.snailTentacles),this.snail.scale.setScalar(1.28),this.root.add(this.snail)}createToad(){let e=new Z({color:6713935,roughness:.96}),t=new Z({color:5265984,roughness:.98}),n=new Y(new X(.31,12,8),e);n.scale.set(1.08,.45,1.12),n.position.z=-.05;let r=new Y(new X(.26,12,8),e);r.scale.set(1.22,.52,.76),r.position.set(0,.015,.28);let i=new Z({color:10263384,roughness:.7}),a=new Z({color:2106652,roughness:.58});for(let e of[-1,1]){let n=new Y(new X(.061,8,6),i);n.position.set(e*.145,.145,.39);let r=new Y(new X(.033,8,6),a);r.position.set(e*.148,.157,.433),this.toadEyes.add(n,r);let o=new Y(new wl(.075,.22,3,7),t);o.rotation.set(Math.PI/2,e*.5,Math.PI/2),o.position.set(e*.34,-.025,-.12);let s=new Y(new wl(.055,.24,3,7),t);s.rotation.set(Math.PI/2,-e*.38,Math.PI/2),s.position.set(e*.48,-.075,-.31);let c=new Y(new X(.075,8,5),t);c.scale.set(1.35,.35,.78),c.position.set(e*.58,-.105,-.42),this.toadHindLegs.add(o,s,c);let l=new Y(new wl(.042,.16,3,6),t);l.rotation.set(0,-e*.3,Math.PI/2),l.position.set(e*.23,-.065,.27),this.toadBody.add(l)}let o=new Z({color:4608058,roughness:1});for(let e of[{x:-.13,z:-.06,size:.07},{x:.12,z:-.17,size:.055},{x:.02,z:.08,size:.045}]){let t=new Y(new X(e.size,7,4),o);t.scale.y=.18,t.position.set(e.x,.145,e.z),this.toadBody.add(t)}this.toadBody.add(n,r,this.toadEyes),this.toad.add(this.toadHindLegs,this.toadBody),this.toad.scale.setScalar(1.34),this.root.add(this.toad)}addSnailTrailMark(e){this.makeRoom(this.snailTrailMarks,cg);let t=.2,n=new Y(new Tl(.045,8),new Ac({color:11057572,transparent:!0,opacity:t,depthWrite:!1,side:2}));n.rotation.x=-Math.PI/2,n.scale.set(1.8,.52,1),n.position.set(e.x,this.groundHeightAt(e.x,e.z)+.032,e.z),this.transientRoot.add(n),this.snailTrailMarks.push({mesh:n,age:0,duration:7.5,startOpacity:t,grow:.08,baseScale:n.scale.clone()})}addRipple(e,t,n){this.makeRoom(this.toadMarks,lg);let r=new Y(new Xu(.16,.21,20),new Ac({color:t,transparent:!0,opacity:n,depthWrite:!1,side:2}));r.rotation.x=-Math.PI/2,r.position.set(e.x,S(e.x,e.z)+.04,e.z),this.transientRoot.add(r),this.toadMarks.push({mesh:r,age:0,duration:2.1,startOpacity:n,grow:2.7,baseScale:r.scale.clone()})}addDampMark(e){this.makeRoom(this.toadMarks,lg);let t=.19,n=new Y(new Tl(.18,12),new Ac({color:5072472,transparent:!0,opacity:t,depthWrite:!1,side:2}));n.rotation.x=-Math.PI/2,n.scale.set(1.6,.74,1),n.position.set(e.x,this.groundHeightAt(e.x,e.z)+.1,e.z),this.transientRoot.add(n),this.toadMarks.push({mesh:n,age:0,duration:9,startOpacity:t,grow:.25,baseScale:n.scale.clone()})}updateMarks(e,t){for(let n=e.length-1;n>=0;--n){let r=e[n];if(!r)continue;r.age+=t;let i=Math.min(1,r.age/r.duration);r.mesh.material.opacity=r.startOpacity*(1-i),r.mesh.scale.copy(r.baseScale).multiplyScalar(1+i*r.grow),i>=1&&this.removeMark(e,n)}}makeRoom(e,t){for(;e.length>=t;)this.removeMark(e,0)}clearMarks(e){for(;e.length>0;)this.removeMark(e,e.length-1)}removeMark(e,t){let n=e[t];n&&(e.splice(t,1),this.transientRoot.remove(n.mesh),this.disposeObject(n.mesh))}disposeObject(e){let t=new Set,n=new Set;e.traverse(e=>{e instanceof Y&&(t.add(e.geometry),(Array.isArray(e.material)?e.material:[e.material]).forEach(e=>n.add(e)))}),t.forEach(e=>e.dispose()),n.forEach(e=>e.dispose())}turnToward(e,t,n){if(!t)return;let r=n.x-t.x,i=n.z-t.z;r*r+i*i>1e-6&&(e.rotation.y=Math.atan2(r,i))}},dg={shared:10719853,"water-bank":8885875,"upper-return":7304799,"lower-return":10852980},fg=.075,pg=.095,mg=Object.freeze({meadow:new q(8363107),home:new q(9545836),forest:new q(5601114),highForest:new q(6454612),lowland:new q(9873002),damp:new q(6453852),edge:new q(5073744)}),hg=[...o,{id:`D-headwater-spur`,kind:`water-bank`,width:1.9,points:s}],gg=[{at:{x:-18.4,z:-3.1},scale:1.08,kind:`deciduous`,tone:0},{at:{x:-16.1,z:-7.2},scale:1.02,kind:`conifer`,tone:1},{at:{x:-13.6,z:-10.8},scale:1.08,kind:`conifer`,tone:0},{at:{x:-13.1,z:-13.3},scale:.9,kind:`deciduous`,tone:1},{at:{x:-9.5,z:-8.4},scale:.94,kind:`conifer`,tone:2},{at:{x:-7.2,z:-6.8},scale:.88,kind:`deciduous`,tone:2},{at:{x:-14.9,z:7.4},scale:.88,kind:`deciduous`,tone:0},{at:{x:-12.8,z:8.4},scale:1.06,kind:`conifer`,tone:1},{at:{x:-15.4,z:12.6},scale:1.02,kind:`deciduous`,tone:1},{at:{x:-14.1,z:15.7},scale:.9,kind:`conifer`,tone:2},{at:{x:-18.3,z:2.5},scale:1.12,kind:`conifer`,tone:0},{at:{x:7,z:-5.4},scale:1.12,kind:`conifer`,tone:2},{at:{x:7.7,z:-10.3},scale:.94,kind:`deciduous`,tone:0},{at:{x:7.2,z:7.1},scale:1.04,kind:`deciduous`,tone:2},{at:{x:8.8,z:13.2},scale:1.15,kind:`conifer`,tone:1},{at:{x:4.8,z:20.2},scale:.9,kind:`deciduous`,tone:1},{at:{x:-18.1,z:-14.8},scale:1.18,kind:`conifer`,tone:1},{at:{x:-13.9,z:-18.3},scale:1.08,kind:`conifer`,tone:2},{at:{x:3.8,z:-20.8},scale:1.1,kind:`conifer`,tone:0},{at:{x:-6.7,z:-24.1},scale:.88,kind:`conifer`,tone:1},{at:{x:-3.7,z:-24.55},scale:.82,kind:`deciduous`,tone:0},{at:{x:1.55,z:-23.5},scale:.84,kind:`conifer`,tone:2},{at:{x:-16.8,z:18.8},scale:1.12,kind:`deciduous`,tone:2}];function _g(e,t,n=0){let r=Math.sin(e*12.9898+t*78.233+n*37.719)*43758.5453;return r-Math.floor(r)}function vg(e){let t=0;for(let n=0;n<e.length;n+=1)t=t*31+e.charCodeAt(n)>>>0;return t}function yg(e,t){let n=[];for(let r=0;r<e.length-1;r+=1){let i=e[r],a=e[r+1],o=Math.hypot(a.x-i.x,a.z-i.z),s=Math.max(1,Math.ceil(o/t));for(let e=0;e<s;e+=1){let t=e/s;n.push({x:i.x+(a.x-i.x)*t,z:i.z+(a.z-i.z)*t})}}let r=e.at(-1);return r&&n.push({x:r.x,z:r.z}),n}var bg=yg(u,1.05),xg=bn,Sg=new q(3501940),Cg=new q(4217934),wg=new q(7569490),Tg=u.slice(0,Math.max(2,u.findIndex(({z:e})=>e>=0)+1)),Eg=Tg.slice(0,-1).map((e,t)=>{let n=Tg[t+1];return{from:e,to:n,length:Math.hypot(n.x-e.x,n.z-e.z)}}),Dg=Eg.reduce((e,t)=>e+t.length,0),Og=class{scene=new Es;camera=new zd(52,1,.1,180);renderer;ecologyView;canvas;player=new K;playerTorso=new K;playerLeftArm=new K;playerRightArm=new K;playerLeftElbow=new K;playerRightElbow=new K;playerLeftLeg=new K;playerRightLeg=new K;playerLeftKnee=new K;playerRightKnee=new K;playerHead=new K;previousPlayerAt;playerWalkPhase=0;playerWalkBlend=0;editEntryRoot=new K;cameraTarget=new W;desiredCamera=new W;animatedWater=[];animatedWaterwayLeaves=[];animatedHeadwaterFoam=[];headwaterVisualRoot=new K;headwaterSlowWater;headwaterSeepPatch;headwaterDryPatch;headwaterProfile=xg;upstreamWaterwayState;upstreamDeliveryLeaf;bDeliveredRoot=new K;bDeliveredCalmWater;bDeliveredRipple;bDeliveredLeaf;soilMeshes=new Map;zoneOutlines=new Map;routeMeshes=new Map;editEntryGroups=new Map;drainageWaterMeshes=new Map;wetDrainageEntryIds=new Set;activeEditUseIds=new Set;editEntryReactions=new Map;raycaster=new sf;pointer=new U;terrainMesh;editSnapshot=Ve().current;terrainEditSignature=``;drainageStartMarker=new K;drainageStartAt;surfaceMoisture={"a-garden":`dry`,"b-bright-soil":`dry`,"b-moist-soil":`moist`};activeEditZoneId;buildMode=!1;compactLandscape=!1;viewportWidth=1;viewportHeight=1;constructor(e,t,n){this.canvas=e,this.renderer=new Dh({canvas:e,antialias:!0,powerPreference:`high-performance`}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.65)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=1,this.renderer.outputColorSpace=Aa,this.renderer.toneMapping=4,this.renderer.toneMappingExposure=1.03,this.scene.background=new q(13163992),this.scene.fog=new Ts(13163992,39,94),this.buildLights(),this.buildSky(),this.buildDistantLandscape(),this.buildTerrain(),this.buildRoutes(),this.buildWater(),this.buildEditZones(),this.buildWaterSources(),this.buildWaterwayClues(),this.buildLandmarks(),this.buildPlayer(),this.scene.add(this.editEntryRoot),this.buildDrainageStartMarker(),this.scene.add(this.drainageStartMarker),this.ecologyView=new ug(this.scene,t,n,(e,t)=>this.groundHeightAt(e,t))}resize(e,t){let n=Math.max(1,e),r=Math.max(1,t);this.viewportWidth=n,this.viewportHeight=r,this.compactLandscape=r<520,this.updateProjection(),this.renderer.setSize(n,r,!1)}syncSurfaceMoisture(e,t=[]){this.surfaceMoisture=e,this.wetDrainageEntryIds=new Set(t);for(let t of f){let n=this.soilMeshes.get(t.id);if(!n)continue;let r=n.material,i=t.id===`d-headwater-edge`||e[t.id]===`moist`;r.color.set(t.soilColor),i&&r.color.multiplyScalar(.72),r.roughness=i?.62:t.tone===`moist`||t.tone===`headwater`?.72:.94,r.needsUpdate=!0}for(let[e,t]of this.drainageWaterMeshes){let n=t.userData.editZoneId;t.visible=n!==void 0&&this.isZoneVisuallyMoist(n)&&this.wetDrainageEntryIds.has(e)}}syncUpstreamWaterway(e,t){this.upstreamWaterwayState=e;let n=Rn(e)?.profile??Ln(e);(n.shade!==this.headwaterProfile.shade||n.retention!==this.headwaterProfile.retention||n.continuity!==this.headwaterProfile.continuity)&&(this.headwaterProfile=n,this.updateHeadwaterProfileVisuals()),this.updateUpstreamDeliveryVisuals(t)}isZoneVisuallyMoist(e){return e===`d-headwater-edge`||this.surfaceMoisture[e]===`moist`}syncEdits(e){this.editSnapshot=e;let t=this.terrainSignature(e);t!==this.terrainEditSignature&&(this.terrainEditSignature=t,this.refreshEditedTerrain());let n=new Set;for(let r of f)for(let i of Object.values(e[r.id])){n.add(i.id);let e=this.editEntryGroups.get(i.id),r=i.kind===`terrain-patch`?i.kind+`:`+i.direction+`:`+t:i.kind===`surface-adjustment`?[i.kind,i.at.x,i.at.z,t].join(`:`):i.kind===`drainage-segment`?[i.kind,i.length,i.at.x,i.at.z,i.rotation,t].join(`:`):i.kind===`structure`?[i.kind,i.form,i.at.x,i.at.z,i.rotation,t].join(`:`):i.kind;e?.userData.editEntryVariant!==r&&(this.removeEditEntry(i.id,e),e=void 0),e||(e=this.createEditEntryGroup(i),this.editEntryGroups.set(i.id,e),this.editEntryRoot.add(e)),e.position.set(i.at.x,this.groundHeightAt(i.at.x,i.at.z)+pg,i.at.z),e.rotation.set(0,i.kind===`drainage-segment`||i.kind===`structure`?-i.rotation:i.rotation,0),e.userData.editEntryId=i.id,e.userData.editEntryKind=i.kind,e.userData.editEntryVariant=r,e.userData.editZoneId=i.zoneId;let a=i.kind===`low-flower`&&i.thinned;e.userData.editEntryThinned=a,e.traverse(e=>{e.name===`plant-density-extra`&&(e.visible=!a)})}for(let[e,t]of this.editEntryGroups)n.has(e)||this.removeEditEntry(e,t);this.updateBuildEntryVisibility(),this.updateDrainageStartMarkerPosition()}groundHeightAt(e,t){return Ee(this.editSnapshot,e,t)}terrainSignature(e){return f.flatMap(t=>Object.values(e[t.id]).filter(e=>e.kind===`terrain-patch`||e.kind===`drainage-segment`).sort((e,t)=>e.id.localeCompare(t.id)).map(e=>e.kind===`terrain-patch`?[e.id,e.direction,e.at.x,e.at.z].join(`:`):[e.id,e.length,e.at.x,e.at.z,e.rotation].join(`:`))).join(`|`)}refreshEditedTerrain(){if(this.terrainMesh){let e=this.terrainMesh.geometry,t=e.getAttribute(`position`),n=e.getAttribute(`color`);for(let e=0;e<t.count;e+=1){let r=t.getX(e),i=t.getZ(e),a=this.groundHeightAt(r,i);t.setY(e,a);let o=this.terrainColorAt(r,i,a);n.setXYZ(e,o.r,o.g,o.b)}t.needsUpdate=!0,n.needsUpdate=!0,e.computeVertexNormals(),e.computeBoundingBox(),e.computeBoundingSphere()}for(let e of hg){let t=this.routeMeshes.get(e.id);if(!t)continue;let n=t.geometry;t.geometry=this.createRouteGeometry(e,new q(dg[e.kind])),n.dispose()}for(let e of f){let t=this.soilMeshes.get(e.id);if(t){let n=t.geometry;t.geometry=this.createSoilGeometry(e),n.dispose()}let n=this.zoneOutlines.get(e.id);if(n){let t=n.geometry;n.geometry=this.createEditOutlineGeometry(e),t.dispose()}}this.ecologyView?.resetGroundTraces(),this.updateDrainageStartMarkerPosition()}updateBuildEntryVisibility(){for(let e of this.editEntryGroups.values()){let t=e.userData.editEntryKind,n=this.buildMode&&e.userData.editZoneId===this.activeEditZoneId;if(t===`terrain-patch`){e.visible=n;continue}e.visible=!0,e.traverse(e=>{e.userData.buildOnly===!0&&(e.visible=n)})}this.updateDrainageStartMarkerVisibility()}syncPlantGrowth(e,t){let n=[`seed`,`sprout`,`young`,`adult`];for(let[r,i]of this.editEntryGroups){if(i.userData.editEntryKind!==`low-flower`)continue;let a=e.byEntryId[r],o=a?mn(a,t):void 0,s=o?.stage??`seed`,c=o?.stageProgress??0,l;for(let e of n){let t=i.getObjectByName(`plant-stage-`+e);t&&(t.visible=e===s,t.scale.set(1,1,1),e===s&&(l=t))}if(l){let e=s===`seed`?.92+c*.08:.82+c*.18,t=s===`seed`?.94+c*.06:.65+c*.35;l.scale.set(e,t,e)}i.userData.plantGrowthStage=s,i.userData.plantGrowthProgress=c}}syncEcology(e,t,n){let r=new Set;for(let t of[e.butterfly,e.snail]){let e=t.phase===`using`?t.target?.entryId:void 0;e&&(r.add(e),this.activeEditUseIds.has(e)||this.editEntryReactions.set(e,0))}if(t.phase===`using`)for(let e of t.activeRoute?.entryIds??[])r.add(e),this.activeEditUseIds.has(e)||this.editEntryReactions.set(e,0);this.activeEditUseIds.clear(),r.forEach(e=>this.activeEditUseIds.add(e)),this.ecologyView.sync(e,t,n)}resetEcology(e,t){this.activeEditUseIds.clear(),this.editEntryReactions.clear(),this.ecologyView.reset(e,t)}setEditZone(e){this.activeEditZoneId=e;for(let[t,n]of this.zoneOutlines)n.visible=t===e;this.player.visible=e===void 0,this.updateBuildEntryVisibility(),this.updateProjection();let t=f.find(({id:t})=>t===e);t&&this.updateEditCamera(t,0,!0)}setBuildMode(e){this.buildMode=e,this.updateBuildEntryVisibility()}setDrainageStart(e){this.drainageStartAt=e?{x:e.x,z:e.z}:void 0,this.updateDrainageStartMarkerPosition(),this.updateDrainageStartMarkerVisibility()}buildDrainageStartMarker(){let e=new Z({color:5093294,emissive:2580317,emissiveIntensity:.12,roughness:.64}),t=new Y(new Zu(.16,.018,6,24),e);t.name=`drainage-start-ring`,t.rotation.x=Math.PI/2,t.position.y=.018;let n=new Y(new El(.022,.032,.32,6),e);n.name=`drainage-start-stake`,n.position.y=.16,n.castShadow=!0,this.drainageStartMarker.name=`drainage-start-marker`,this.drainageStartMarker.visible=!1,this.drainageStartMarker.add(t,n)}updateDrainageStartMarkerPosition(){let e=this.drainageStartAt;e&&this.drainageStartMarker.position.set(e.x,this.groundHeightAt(e.x,e.z)+fg+.02,e.z)}updateDrainageStartMarkerVisibility(){let e=this.drainageStartAt?k(this.drainageStartAt)?.id:void 0;this.drainageStartMarker.visible=!!(this.drainageStartAt&&this.buildMode&&e===this.activeEditZoneId)}pickGround(e,t){if(!this.activeEditZoneId||!this.setPointerRay(e,t))return;let n=[this.soilMeshes.get(this.activeEditZoneId),this.terrainMesh].filter(e=>e!==void 0);if(n.length===0)return;let r=this.raycaster.intersectObjects(n,!1)[0];return r?{x:r.point.x,z:r.point.z}:void 0}pickEditEntry(e,t){if(!this.activeEditZoneId||!this.setPointerRay(e,t))return;let n=this.raycaster.intersectObject(this.editEntryRoot,!0);for(let e of n){let t=e.object;for(;t&&t!==this.editEntryRoot;){let e=t.userData.editEntryId,n=t.userData.editZoneId,r=t.userData.editEntryKind,i=r!==`terrain-patch`&&r!==`drainage-segment`&&r!==`structure`&&(n!==`d-headwater-edge`||r!==`low-cover`)||this.buildMode;if(typeof e==`string`&&n===this.activeEditZoneId&&i)return e;t=t.parent}}}render(e,t){let n=this.groundHeightAt(e.playerAt.x,e.playerAt.z),r=this.previousPlayerAt?Math.hypot(e.playerAt.x-this.previousPlayerAt.x,e.playerAt.z-this.previousPlayerAt.z):0,i=e.started&&!e.blocked&&r>5e-4&&r<.8,a=Math.max(0,t),o=1-Math.exp(-a*10);this.playerWalkBlend=bo.lerp(this.playerWalkBlend,+!!i,1-Math.exp(-a*7)),i&&(this.playerWalkPhase+=a*8.2);let s=Math.sin(this.playerWalkPhase),c=s*this.playerWalkBlend,l=Math.cos(this.playerWalkPhase),u=c*.4,d=c*.38,p=-(.2+Math.max(0,-s)*.32)*this.playerWalkBlend,m=-(.2+Math.max(0,s)*.32)*this.playerWalkBlend,h=Math.max(0,l)*this.playerWalkBlend*.95,g=Math.max(0,-l)*this.playerWalkBlend*.95;this.playerLeftArm.rotation.x=bo.lerp(this.playerLeftArm.rotation.x,u,o),this.playerRightArm.rotation.x=bo.lerp(this.playerRightArm.rotation.x,-u,o),this.playerLeftElbow.rotation.x=bo.lerp(this.playerLeftElbow.rotation.x,p,o),this.playerRightElbow.rotation.x=bo.lerp(this.playerRightElbow.rotation.x,m,o),this.playerLeftLeg.rotation.x=bo.lerp(this.playerLeftLeg.rotation.x,-d,o),this.playerRightLeg.rotation.x=bo.lerp(this.playerRightLeg.rotation.x,d,o),this.playerLeftKnee.rotation.x=bo.lerp(this.playerLeftKnee.rotation.x,h,o),this.playerRightKnee.rotation.x=bo.lerp(this.playerRightKnee.rotation.x,g,o);let _=c*.09,v=c*.025;this.playerTorso.rotation.x=bo.lerp(this.playerTorso.rotation.x,this.playerWalkBlend*.025,o),this.playerTorso.rotation.y=bo.lerp(this.playerTorso.rotation.y,_,o),this.playerTorso.rotation.z=bo.lerp(this.playerTorso.rotation.z,v,o),this.playerHead.rotation.y=bo.lerp(this.playerHead.rotation.y,-_*.55,o),this.playerHead.rotation.z=bo.lerp(this.playerHead.rotation.z,-v*.55,o);let y=this.playerWalkBlend*(.012-Math.cos(this.playerWalkPhase*2)*.008),b=c*.012;this.player.position.set(e.playerAt.x+Math.cos(e.playerHeading)*b,n+y,e.playerAt.z-Math.sin(e.playerHeading)*b),this.player.rotation.y=e.playerHeading,this.previousPlayerAt={x:e.playerAt.x,z:e.playerAt.z};let x=f.find(({id:e})=>e===this.activeEditZoneId);x?this.updateEditCamera(x,t,!1):this.updateWalkingCamera(e,t,n);for(let t of this.animatedWater)t.material.emissiveIntensity=.035+Math.sin(e.elapsed*1.7+t.phase)*.012;for(let t of this.animatedWaterwayLeaves){let n=(Math.sin(e.elapsed*.62+t.phase)+1)*.5;t.mesh.position.x=t.baseX+Math.sin(e.elapsed*.9+t.phase)*.055,t.mesh.position.y=t.baseY+Math.sin(e.elapsed*2.1+t.phase)*.035,t.mesh.position.z=t.baseZ+n*.24,t.mesh.rotation.y=t.phase+Math.sin(e.elapsed*.75+t.phase)*.32}for(let t of this.animatedHeadwaterFoam){let n=.14+this.headwaterProfile.continuity*.46,r=(e.elapsed*n+t.phase)%1,i=t.to.x-t.from.x,a=t.to.z-t.from.z,o=Math.max(.001,Math.hypot(i,a)),s=-a/o,c=i/o,l=t.from.x+i*r+s*t.lateral,u=t.from.z+a*r+c*t.lateral;t.mesh.position.set(l,S(l,u)+.065,u),t.mesh.rotation.z=-Math.atan2(i,a);let d=Math.sin(r*Math.PI);t.mesh.scale.set(.42+d*.46,.11,1)}this.updateUpstreamDeliveryVisuals(e.elapsed),this.updateEditEntryReactions(e.started&&!e.blocked?t:0),this.ecologyView.update(e.started&&!e.blocked?t:0,e.elapsed),this.renderer.render(this.scene,this.camera)}updateEditEntryReactions(e){for(let[t,n]of this.editEntryGroups){let r=this.editEntryReactions.get(t),i=n.getObjectByName(`structure-contact-part`);if(n.rotation.x=0,n.rotation.z=0,n.scale.set(1,1,1),i&&(i.rotation.x=0,i.rotation.z=0),r===void 0)continue;let a=r+e,o=Math.max(0,1-a/.95),s=n.userData.editEntryKind,c=Math.sin(a*Math.PI*5.2)*o;if(s===`low-flower`)n.rotation.z=c*.11,n.scale.y=1-Math.sin(Math.min(1,a/.34)*Math.PI)*.09;else if(s===`low-cover`)n.rotation.x=c*.055,n.scale.y=1-Math.sin(Math.min(1,a/.4)*Math.PI)*.06;else if(s===`structure`){let e=n.userData.structureForm;e===`shade`&&i?i.rotation.z=c*.045:(e===`support`||e===`rack`)&&(n.rotation.z=c*.025)}a>=.95?(this.editEntryReactions.delete(t),n.rotation.x=0,n.rotation.z=0,n.scale.set(1,1,1),i&&(i.rotation.x=0,i.rotation.z=0)):this.editEntryReactions.set(t,a)}}updateProjection(){if(this.camera.aspect=this.viewportWidth/this.viewportHeight,this.camera.fov=this.compactLandscape?57:52,this.camera.clearViewOffset(),this.activeEditZoneId){let e=this.editDockReserve();this.camera.setViewOffset(this.viewportWidth,this.viewportHeight,0,e/2,this.viewportWidth,this.viewportHeight);return}this.camera.updateProjectionMatrix()}updateWalkingCamera(e,t,n){let r=this.compactLandscape?6.05:5.2,i=e.cameraDistance+(this.compactLandscape?.55:0),a=.42;this.cameraTarget.set(e.playerAt.x+Math.sin(e.playerHeading)*a,n+1.12,e.playerAt.z+Math.cos(e.playerHeading)*a),this.desiredCamera.set(this.cameraTarget.x+Math.sin(e.cameraYaw)*i,this.cameraTarget.y+r,this.cameraTarget.z+Math.cos(e.cameraYaw)*i);let o=1-Math.exp(-Math.max(0,t)*5.5);this.camera.position.lengthSq()===0?this.camera.position.copy(this.desiredCamera):this.camera.position.lerp(this.desiredCamera,o),this.camera.lookAt(this.cameraTarget)}updateEditCamera(e,t,n){let r=this.groundHeightAt(e.focus.x,e.focus.z),i=Math.max(1,...e.outline.map(t=>{let n=this.groundHeightAt(t.x,t.z)-r;return Math.hypot(t.x-e.focus.x,t.z-e.focus.z,n)}))+.55,a=Math.max(.52,(this.viewportHeight-this.editDockReserve()-20)/this.viewportHeight),o=bo.degToRad(this.camera.fov/2),s=Math.max(5.5,i/(Math.tan(o)*a*.8)),c=1/Math.hypot(1,.55),l=.55/Math.hypot(1,.55);this.cameraTarget.set(e.focus.x,r+.18,e.focus.z),this.desiredCamera.set(e.focus.x,this.cameraTarget.y+c*s,e.focus.z+l*s);let u=n?1:1-Math.exp(-Math.max(0,t)*6.5);n||this.camera.position.lengthSq()===0?this.camera.position.copy(this.desiredCamera):this.camera.position.lerp(this.desiredCamera,u),this.camera.lookAt(this.cameraTarget)}editDockReserve(){return Math.min(138,Math.max(108,this.viewportHeight*.22))}buildLights(){let e=new Dd(15266271,5004877,1.5);this.scene.add(e);let t=new Hd(16772538,3.05);t.position.set(-19,31,13),t.target.position.set(n.x,0,n.z),t.castShadow=!0,t.shadow.mapSize.set(1536,1536),t.shadow.camera.left=-34,t.shadow.camera.right=34,t.shadow.camera.top=34,t.shadow.camera.bottom=-34,t.shadow.camera.near=4,t.shadow.camera.far=90,t.shadow.bias=-25e-5,t.shadow.normalBias=.025,this.scene.add(t,t.target)}buildSky(){let e=new X(112,28,16),t=e.getAttribute(`position`),r=[],i=new q(15328456),a=new q(13163992),o=new q(9551824);for(let e=0;e<t.count;e+=1){let n=bo.clamp((t.getY(e)/112+.14)/.92,0,1),s=n<.42?i.clone().lerp(a,n/.42):a.clone().lerp(o,(n-.42)/.58);r.push(s.r,s.g,s.b)}e.setAttribute(`color`,new J(r,3));let s=new Y(e,new Ac({vertexColors:!0,side:1,depthWrite:!1,fog:!1,toneMapped:!1}));s.position.set(n.x,-9,n.z),s.renderOrder=-10,this.scene.add(s)}buildDistantLandscape(){for(let e of[{x:-31,z:-24,radius:14,height:15,color:6256985,rotation:.2},{x:-13,z:-35,radius:17,height:19,color:6585688,rotation:.7},{x:10,z:-34,radius:15,height:17,color:7045467,rotation:1.1},{x:25,z:-18,radius:14,height:13,color:7242846,rotation:.4},{x:24,z:7,radius:13,height:11,color:7637346,rotation:.8},{x:14,z:33,radius:18,height:10,color:8426087,rotation:.1},{x:-13,z:37,radius:19,height:12,color:7768929,rotation:.55},{x:-31,z:19,radius:14,height:14,color:6388312,rotation:.9}]){let t=new Y(new qu(1,1),new Z({color:e.color,roughness:1,flatShading:!0}));t.scale.set(e.radius,e.height*.58,e.radius*.72),t.position.set(e.x,x(e.x,e.z)+e.height*.18-2.4,e.z),t.rotation.y=e.rotation,t.receiveShadow=!0,this.scene.add(t)}}buildTerrain(){let e=new Yu(r.x*2.12,r.z*2.56,96,144);e.rotateX(-Math.PI/2);let t=e.getAttribute(`position`),i=[];for(let e=0;e<t.count;e+=1){let r=t.getX(e)+n.x,a=t.getZ(e)+n.z,o=this.groundHeightAt(r,a);t.setXYZ(e,r,o,a);let s=this.terrainColorAt(r,a,o);i.push(s.r,s.g,s.b)}t.needsUpdate=!0,e.setAttribute(`color`,new J(i,3)),e.computeVertexNormals();let a=new Z({vertexColors:!0,roughness:.96,metalness:0});this.terrainMesh=new Y(e,a),this.terrainMesh.receiveShadow=!0,this.scene.add(this.terrainMesh)}terrainColorAt(e,t,i){let a=Math.exp(-C({x:e,z:t},{x:-11,z:0})/82),o=Math.max(Math.exp(-C({x:e,z:t},{x:-1.2,z:-8})/58),Math.exp(-C({x:e,z:t},{x:-3,z:-16})/72)),s=Math.exp(-C({x:e,z:t},{x:-4,z:17})/92),c=T({x:e,z:t},u),l=1-bo.smoothstep(c,2.2,6.4),d=Math.sqrt(((e-n.x)/r.x)**2+((t-n.z)/r.z)**2),f=bo.smoothstep(d,.78,1.02),p=bo.clamp((i-2.4)/4.8,0,1),m=Math.sin(e*.34+t*.19)*.018+Math.cos(t*.27-e*.11)*.012,h=mg.meadow.clone();return h.lerp(mg.home,a*.48),h.lerp(mg.forest,o*.72),h.lerp(mg.highForest,p*o*.28),h.lerp(mg.lowland,s*.5),h.lerp(mg.damp,l*.44),h.lerp(mg.edge,f*.84),h.offsetHSL(m*.08,m*.16,m),h}buildRoutes(){for(let e of hg){let t=new q(dg[e.kind]),n=new Z({vertexColors:!0,roughness:1,polygonOffset:!0,polygonOffsetFactor:-1}),r=new Y(this.createRouteGeometry(e,t),n);r.receiveShadow=!0,r.name=`terrain-following-route-`+e.id,this.routeMeshes.set(e.id,r),this.scene.add(r)}}createRouteGeometry(e,t){let n=yg(e.points,.62),r=[],i=[],a=[];n.forEach((a,o)=>{let s=this.polylineNormal(n,o),c=.94+_g(a.x,a.z,7)*.1,l=e.width*.5*c;[-l,0,l].forEach((e,n)=>{let o=a.x+s.x*e,c=a.z+s.z*e,l=n===1?.018:0;r.push(o,this.groundHeightAt(o,c)+.042+l,c);let u=t.clone(),d=_g(o,c,9);u.offsetHSL((d-.5)*.018,(d-.5)*.045,(d-.5)*.08),n!==1&&u.multiplyScalar(.91),i.push(u.r,u.g,u.b)})});for(let e=0;e<n.length-1;e+=1)for(let t=0;t<2;t+=1){let n=e*3+t,r=n+1,i=n+3,o=i+1;a.push(n,r,i,r,o,i)}let o=new yc;return o.setAttribute(`position`,new J(r,3)),o.setAttribute(`color`,new J(i,3)),o.setIndex(a),o.computeVertexNormals(),o}buildWater(){this.buildChannelSurface();let e=new ld({color:4952725,emissive:3108723,emissiveIntensity:.045,roughness:.22,metalness:0,clearcoat:.42,clearcoatRoughness:.28,transparent:!0,opacity:.82,depthWrite:!1,side:2}),t=new Y(this.createWaterRibbonGeometry(),e);t.receiveShadow=!0,this.scene.add(t),this.animatedWater.push({material:e,phase:0});for(let e=0;e<8;e+=1){let t=-16.15+e*.42,n=1.3+e*.13+Math.sin(e*2.1)*.16,r=new Y(new Tl(.24+e%3*.045,14),new Ac({color:e%2==0?15922407:14544099,transparent:!0,opacity:.74,depthWrite:!1,side:2}));r.rotation.x=-Math.PI/2,r.rotation.z=-.26+Math.sin(e)*.2,r.scale.set(1.7+e%2*.55,.42,1),r.position.set(n,S(n,t)+.055,t),r.renderOrder=2,this.scene.add(r)}this.buildHeadwaterWaterDetails()}buildHeadwaterWaterDetails(){this.scene.add(this.headwaterVisualRoot);let e=c[0],t=c[1],n=c[3],r=c[4],i=new Y(new Tl(1,24),new ld({color:4161410,emissive:3235682,emissiveIntensity:.07,roughness:.31,clearcoat:.28,transparent:!0,opacity:.76,depthWrite:!1,side:2,polygonOffset:!0,polygonOffsetFactor:-2}));i.name=`headwater-slow-pool`,i.rotation.x=-Math.PI/2,i.scale.set(.86,.58,1),i.position.set(t.x,S(t.x,t.z)+.045,t.z),i.renderOrder=3,i.userData.noShadow=!0,this.headwaterSlowWater=i;let a={x:-.75,z:-22.35},o=new Y(new Tl(1,20),new Z({color:4810323,roughness:.9,transparent:!0,opacity:.68,depthWrite:!1,side:2,polygonOffset:!0,polygonOffsetFactor:-2}));o.name=`headwater-seeping-edge`,o.rotation.x=-Math.PI/2,o.scale.set(.84,.45,1),o.position.set(a.x,x(a.x,a.z)+.052,a.z),o.renderOrder=2,o.userData.noShadow=!0,this.headwaterSeepPatch=o;let s={x:-5.65,z:-21.45},l=new Y(new Tl(1,18),new Z({color:8879199,roughness:1,transparent:!0,opacity:.42,depthWrite:!1,side:2,polygonOffset:!0,polygonOffsetFactor:-2}));l.name=`headwater-dry-edge`,l.rotation.x=-Math.PI/2,l.scale.set(.7,.42,1),l.position.set(s.x,x(s.x,s.z)+.05,s.z),l.renderOrder=2,l.userData.noShadow=!0,this.headwaterDryPatch=l;let u=new Ac({color:15265507,transparent:!0,opacity:.7,depthWrite:!1,side:2});for(let e=0;e<5;e+=1){let t=new Y(new Tl(.22,12),u);t.name=`headwater-fast-foam`,t.rotation.x=-Math.PI/2,t.renderOrder=4,t.userData.noShadow=!0,this.animatedHeadwaterFoam.push({mesh:t,from:n,to:r,phase:e/5,lateral:(e%2==0?-1:1)*(.08+e%3*.035)}),this.headwaterVisualRoot.add(t)}let d=new Y(new Tl(.68,20),new Z({color:5401433,roughness:.84,transparent:!0,opacity:.72,depthWrite:!1,side:2}));d.name=`headwater-source-seep`,d.rotation.x=-Math.PI/2,d.scale.set(1.08,.72,1),d.position.set(e.x,x(e.x,e.z)+.044,e.z-.08),d.userData.noShadow=!0,this.headwaterVisualRoot.add(l,o,i,d),this.buildUpstreamDeliveryVisuals(),this.updateHeadwaterProfileVisuals()}buildUpstreamDeliveryVisuals(){let e=new Z({color:12946238,emissive:7754541,emissiveIntensity:.06,roughness:.88}),t=new Y(new X(.2,8,5),e);t.name=`upstream-delivery-moving-leaf`,t.scale.set(1.45,.15,.72),t.visible=!1,t.renderOrder=5,t.userData.noShadow=!0,this.upstreamDeliveryLeaf=t,this.scene.add(t);let n={x:2.55,z:.05},r=new Y(new Tl(1,24),new ld({color:4949893,emissive:3235680,emissiveIntensity:.055,roughness:.3,clearcoat:.3,transparent:!0,opacity:.34,depthWrite:!1,side:2}));r.name=`b-upstream-delivered-calm-water`,r.rotation.x=-Math.PI/2,r.position.set(n.x,S(n.x,n.z)+.052,n.z),r.renderOrder=4,r.userData.noShadow=!0,this.bDeliveredCalmWater=r;let i=new Y(new Xu(.24,.31,24),new Ac({color:14018268,transparent:!0,opacity:.38,depthWrite:!1,side:2}));i.name=`b-upstream-delivered-ripple`,i.rotation.x=-Math.PI/2,i.position.set(n.x+.08,S(n.x,n.z)+.07,n.z+.03),i.renderOrder=5,i.userData.noShadow=!0,this.bDeliveredRipple=i;let a=new Y(new X(.2,8,5),e.clone());a.name=`b-upstream-delivered-leaf`,a.scale.set(1.45,.15,.72),a.position.set(n.x-.06,S(n.x,n.z)+.09,n.z+.04),a.rotation.y=.48,a.renderOrder=6,a.userData.noShadow=!0,this.bDeliveredLeaf=a,this.bDeliveredRoot.name=`b-upstream-delivered-profile`,this.bDeliveredRoot.visible=!1,this.bDeliveredRoot.add(r,i,a),this.scene.add(this.bDeliveredRoot)}updateHeadwaterProfileVisuals(){let{shade:e,retention:t,continuity:n}=this.headwaterProfile;if(this.headwaterSlowWater){this.headwaterSlowWater.scale.set(.62+t*.64,.43+t*.36,1);let e=this.headwaterSlowWater.material;e.opacity=.54+t*.28,e.roughness=.4-t*.2,e.color.set(5212807).lerp(Sg,t)}if(this.headwaterSeepPatch){this.headwaterSeepPatch.scale.set(.66+t*.5,.34+t*.3,1);let n=this.headwaterSeepPatch.material;n.opacity=.42+t*.34,n.color.set(6255447).lerp(Cg,e)}if(this.headwaterDryPatch){let n=this.headwaterDryPatch.material;n.opacity=Math.max(.18,.58-t*.25-e*.13)}for(let e of this.animatedHeadwaterFoam){e.mesh.visible=n>.06;let t=e.mesh.material;t.opacity=.26+n*.62}}updateUpstreamDeliveryVisuals(e){let t=this.upstreamWaterwayState,n=this.upstreamDeliveryLeaf;if(!t||!n){n&&(n.visible=!1),this.bDeliveredRoot.visible=!1;return}let r=Rn(t),i=Fn(t,e),a=r!==void 0&&i>=1,o=In(t,e),s=a?r.profile:Ln(t);if(this.bDeliveredRoot.visible=o,o&&this.updateBDeliveredProfileVisuals(s),n.visible=r!==void 0&&!a,!r||a)return;let c=r.profile,l=i*Dg,u=Eg.at(-1);for(let e of Eg){if(u=e,l<=e.length)break;l-=e.length}if(!u)return;let d=Math.max(0,Math.min(1,l/Math.max(1e-4,u.length))),f=u.from.x+(u.to.x-u.from.x)*d,p=u.from.z+(u.to.z-u.from.z)*d;n.position.set(f,S(f,p)+.085+Math.sin(e*2.1)*.022,p),n.rotation.y=-Math.atan2(u.to.z-u.from.z,u.to.x-u.from.x),n.material.color.set(12946238).lerp(wg,c.shade*.58)}updateBDeliveredProfileVisuals(e){if(this.bDeliveredCalmWater){this.bDeliveredCalmWater.scale.set(.58+e.retention*.82,.38+e.retention*.42,1);let t=this.bDeliveredCalmWater.material;t.opacity=.16+e.retention*.42,t.roughness=.42-e.retention*.22}if(this.bDeliveredRipple){this.bDeliveredRipple.scale.setScalar(.72+e.continuity*1.18);let t=this.bDeliveredRipple.material;t.opacity=.14+e.continuity*.56}this.bDeliveredLeaf&&this.bDeliveredLeaf.material.color.set(12946238).lerp(wg,e.shade*.66)}buildChannelSurface(){let e=[-d.bankHalfWidth,-d.bankHalfWidth*.78,-d.waterHalfWidth,-d.bedHalfWidth,-d.bedHalfWidth*.42,0,d.bedHalfWidth*.42,d.bedHalfWidth,d.waterHalfWidth,d.bankHalfWidth*.78,d.bankHalfWidth],t=[],n=[],r=[],i=new q(6517346),a=new q(5069651);bg.forEach((r,o)=>{let s=this.polylineNormal(bg,o);e.forEach(e=>{let o=r.x+s.x*e,c=r.z+s.z*e;t.push(o,x(o,c)+.018,c);let l=Math.abs(e),u=this.terrainColorAt(o,c,x(o,c)),f=_g(o,c,13),p=l<=d.bedHalfWidth?a.clone().lerp(new q(7892828),f*.2):l<=d.waterHalfWidth?i.clone().lerp(u,.18):u.clone().lerp(i,bo.smoothstep(d.bankHalfWidth-l,0,d.bankHalfWidth-d.waterHalfWidth)*.48);n.push(p.r,p.g,p.b)})});let o=e.length;for(let e=0;e<bg.length-1;e+=1)for(let t=0;t<o-1;t+=1){let n=e*o+t,i=n+1,a=n+o,s=a+1;r.push(n,i,a,i,s,a)}let s=new yc;s.setAttribute(`position`,new J(t,3)),s.setAttribute(`color`,new J(n,3)),s.setIndex(r),s.computeVertexNormals();let c=new Y(s,new Z({vertexColors:!0,roughness:.98,side:2,polygonOffset:!0,polygonOffsetFactor:-1}));c.receiveShadow=!0,this.scene.add(c)}createWaterRibbonGeometry(){let e=[],t=[],n=d.waterHalfWidth-.04;bg.forEach((r,i)=>{let a=this.polylineNormal(bg,i),o=S(r.x,r.z)+.025;if(e.push(r.x-a.x*n,o,r.z-a.z*n,r.x+a.x*n,o,r.z+a.z*n),i<bg.length-1){let e=i*2,n=e+1,r=e+2,a=e+3;t.push(e,n,r,n,a,r)}});let r=new yc;return r.setAttribute(`position`,new J(e,3)),r.setIndex(t),r.computeVertexNormals(),r}polylineNormal(e,t){let n=e[Math.max(0,t-1)],r=e[Math.min(e.length-1,t+1)],i=r.x-n.x,a=r.z-n.z,o=Math.max(1e-4,Math.hypot(i,a));return{x:-a/o,z:i/o}}buildEditZones(){for(let e of f){let t=new Y(this.createSoilGeometry(e),new Z({color:e.soilColor,vertexColors:!0,roughness:e.tone===`moist`||e.tone===`headwater`?.72:.94,metalness:0,side:2,polygonOffset:!0,polygonOffsetFactor:-1}));t.name=`edit-soil-`+e.id,t.receiveShadow=!0,t.userData.editZoneId=e.id,this.soilMeshes.set(e.id,t),this.scene.add(t);let n=new vl(this.createEditOutlineGeometry(e),new cl({color:16770720,transparent:!0,opacity:.86,depthTest:!0}));n.name=`edit-outline-`+e.id,n.visible=!1,n.renderOrder=2,this.zoneOutlines.set(e.id,n),this.scene.add(n)}}createEditOutlineGeometry(e){let t=new yc().setFromPoints(e.outline.map(e=>new W(e.x,this.groundHeightAt(e.x,e.z)+fg+.035,e.z)));return t.computeBoundingBox(),t.computeBoundingSphere(),t}buildWaterwayClues(){let e=new Z({color:12946238,emissive:9068072,emissiveIntensity:.08,roughness:.88,side:2});wr.forEach((t,n)=>{let r=t.id===`b-drifting-leaf`?{x:2.6,z:.05}:t.id===`d-white-water`?{x:1.88,z:-15}:t.id===`d-headwater-source`?c.reduce((e,n)=>C(n,t.at)<C(e,t.at)?n:e,c[0]):{x:1.82,z:17.2},i=S(r.x,r.z);for(let t=0;t<3;t+=1){let a=t/3*Math.PI*2+n*.7,o=new Y(new X(.19,8,5),e.clone());o.scale.set(1.35,.16,.7),o.position.set(r.x+Math.cos(a)*.28,i+.075+t*.018,r.z+Math.sin(a)*.28),o.rotation.y=a,o.castShadow=!0,this.scene.add(o),this.animatedWaterwayLeaves.push({mesh:o,baseX:o.position.x,baseY:o.position.y,baseZ:o.position.z,phase:n*1.7+t*2.1})}})}createSoilGeometry(e){let t=e.outline.map(({x:e,z:t})=>new U(e,t)),n=Vu.triangulateShape(t,[]),r=[],i=[],a=[],o=[],s=(e,t)=>{let n=this.groundHeightAt(e,t)+fg,o=.08,s=new W(this.groundHeightAt(e-o,t)-this.groundHeightAt(e+o,t),o*2,this.groundHeightAt(e,t-o)-this.groundHeightAt(e,t+o)).normalize(),c=.91+(Math.sin(e*1.13+t*.47)+Math.cos(t*.82-e*.29))*.025;return r.push(e,n,t),i.push(s.x,s.y,s.z),a.push(c,c,c),r.length/3-1};for(let e of n){let[n,r,i]=e.map(e=>t[e]),a=Math.max(n.distanceTo(r),r.distanceTo(i),i.distanceTo(n)),c=Math.max(1,Math.ceil(a/.32)),l=[];for(let e=0;e<=c;e+=1){let t=[];for(let a=0;a<=c-e;a+=1){let o=e/c,l=a/c,u=1-o-l;t.push(s(n.x*u+r.x*o+i.x*l,n.y*u+r.y*o+i.y*l))}l.push(t)}for(let e=0;e<c;e+=1){let t=c-e;for(let n=0;n<t;n+=1){let r=l[e][n],i=l[e][n+1],a=l[e+1][n];if(o.push(r,i,a),n<t-1){let t=l[e+1][n+1];o.push(i,t,a)}}}}let c=new yc;return c.setAttribute(`position`,new J(r,3)),c.setAttribute(`normal`,new J(i,3)),c.setAttribute(`color`,new J(a,3)),c.setIndex(o),c.computeBoundingBox(),c.computeBoundingSphere(),c}createEditEntryGroup(e){let t=new K;return t.name=`edit-entry-`+e.id,t.userData.editEntryId=e.id,t.userData.editEntryKind=e.kind,t.userData.editZoneId=e.zoneId,t.userData.editEntryThinned=e.kind===`low-flower`&&e.thinned,e.kind===`low-flower`?this.addLowFlower(t,e):e.kind===`low-cover`?this.addLowCover(t,e):e.kind===`surface-adjustment`?this.addSurfaceAdjustment(t,e):e.kind===`terrain-patch`?this.addTerrainPatchMarker(t,e):e.kind===`drainage-segment`?this.addDrainageSegment(t,e):e.kind===`structure`&&(t.userData.structureForm=e.form,this.addStructure(t,e)),t.traverse(e=>{if(e instanceof Y){let t=e.userData.pickOnly===!0;e.castShadow=!t&&e.userData.noShadow!==!0,e.receiveShadow=!t}}),t}addLowFlower(e,t){let n=vg(t.id),r=new Y(new El(.38,.38,.025,16),new Ac({transparent:!0,opacity:0,depthWrite:!1,colorWrite:!1}));r.name=`plant-pick-target`,r.position.y=.025,r.userData.pickOnly=!0,e.add(r);let i=new Z({color:5208912,roughness:.94}),a=new Z({color:6062163,roughness:.96}),o=[15781999,15255673,15784346],s=new Z({color:o[n%o.length],roughness:.8}),c=new Z({color:12086076,roughness:.82}),l=new K;l.name=`plant-stage-seed`,l.userData.plantStage=`seed`;let u=new Y(new kl(.22,1),new Z({color:7427388,roughness:1}));u.scale.set(1.2,.2,.82),u.position.y=-.035,l.add(u);for(let e=0;e<3;e+=1){let t=new Y(new X(.045,7,4),new Z({color:12625516,roughness:.96})),r=e*2.2+n*.001;t.scale.set(1.25,.46,.7),t.position.set(Math.cos(r)*.08,.018,Math.sin(r)*.055),t.rotation.y=-r,l.add(t)}let d=new K;d.name=`plant-stage-sprout`,d.userData.plantStage=`sprout`;let f=[{x:-.09,z:.025,height:.2},{x:.085,z:-.04,height:.23},{x:.02,z:.12,height:.18}];f.forEach((e,t)=>{let n=new K;t===f.length-1&&(n.name=`plant-density-extra`);let r=new Y(new El(.015,.024,e.height,6),i);r.position.set(e.x,e.height/2,e.z),n.add(r);for(let r of[-1,1]){let i=new Y(new X(.075,7,4),a);i.scale.set(1.35,.2,.62),i.position.set(e.x+r*.055,e.height*.86,e.z),i.rotation.y=r*.72+t*.31,n.add(i)}d.add(n)});let p=new K;p.name=`plant-stage-young`,p.userData.plantStage=`young`;let m=[{x:-.14,z:.05,height:.45},{x:.12,z:-.08,height:.56},{x:.04,z:.17,height:.39}];for(let e=0;e<m.length;e+=1){let t=m[e],n=new K;e===m.length-1&&(n.name=`plant-density-extra`);let r=t.height*.68,o=new Y(new El(.02,.032,r,6),i);o.position.set(t.x,r/2,t.z),n.add(o);for(let i of[-1,1]){let o=new Y(new X(.11,7,4),a);o.scale.set(1.32,.22,.62),o.position.set(t.x+i*.075,r*(.6+i*.08),t.z+i*.025),o.rotation.y=i*.8+e*.34,n.add(o)}p.add(n)}let h=new K;h.name=`plant-stage-adult`,h.userData.plantStage=`adult`;for(let e=0;e<m.length;e+=1){let t=m[e],r=_g(n,e,79),a=t.height*(.92+r*.16),o=new K;e===m.length-1&&(o.name=`plant-density-extra`);let l=new Y(new El(.024,.036,a,6),i);l.position.set(t.x,a/2,t.z),l.rotation.z=(r-.5)*.12,o.add(l);for(let e=0;e<5;e+=1){let n=e/5*Math.PI*2+r*.35,i=new Y(new X(.085,7,5),s);i.scale.set(1.18,.38,.68),i.position.set(t.x+Math.cos(n)*.095,a+.025,t.z+Math.sin(n)*.095),i.rotation.y=-n,o.add(i)}let u=new Y(new X(.061,8,6),c);u.position.set(t.x,a+.045,t.z),o.add(u),h.add(o)}for(let e of[-1,1]){let t=new Y(new X(.14,7,4),a);t.scale.set(1.4,.22,.58),t.position.set(e*.15,.1,-e*.04),t.rotation.y=e*.72,h.add(t)}l.visible=!0,d.visible=!1,p.visible=!1,h.visible=!1,e.add(l,d,p,h)}addLowCover(e,t){let n=vg(t.id);if(t.zoneId===`d-headwater-edge`){let t=new Y(new El(.42,.42,.025,14),new Ac({transparent:!0,opacity:0,depthWrite:!1,colorWrite:!1}));t.name=`headwater-cover-pick-target`,t.position.y=.025,t.userData.pickOnly=!0,e.add(t);let r=new Y(new kl(.46,1),new Z({color:4799789,roughness:1}));r.name=`headwater-cover-wet-ground`,r.scale.set(1.08,.055,.8),r.position.y=.018,r.rotation.y=_g(n,0,197)*Math.PI,e.add(r);let i=new X(.19,7,4),a=[7755835,9530175,11173187,6375988].map(e=>new Z({color:e,roughness:1})),o=9+n%3;for(let t=0;t<o;t+=1){let r=t*2.399+_g(n,t,199)*.52,o=t===0?0:.17+t%4*.055,s=new Y(i,a[t%a.length]);s.name=`headwater-fallen-leaf`,s.scale.set(1.42,.11+t%3*.018,.68),s.position.set(Math.cos(r)*o,.045+t%4*.014,Math.sin(r)*o),s.rotation.set((_g(n,t,211)-.5)*.18,-r+_g(n,t,223)*.38,(t%3-1)*.08),e.add(s)}let s=new Z({color:5060904,roughness:1});for(let t=0;t<2;t+=1){let r=new Y(new El(.015,.022,.42-t*.09,6),s);r.name=`headwater-cover-twig`,r.rotation.z=Math.PI/2,r.rotation.y=n%13*.19+t*1.1,r.position.set(t===0?-.04:.12,.07+t*.008,t===0?.03:-.08),e.add(r)}return}let r=[4681804,5798992,6719573,5207636,7572824];for(let t=0;t<7;t+=1){let i=t*2.399+_g(n,t,83)*.42,a=t===0?0:.22+t%3*.07,o=new Y(new X(.25,8,5),new Z({color:r[t%r.length],roughness:.96}));o.scale.set(1.5,.28+t%2*.08,.7),o.position.set(Math.cos(i)*a,.11+t%3*.045,Math.sin(i)*a),o.rotation.set((t%2==0?-1:1)*.12,-i,(t%3-1)*.09),e.add(o)}let i=new Y(new El(.032,.04,.62,6),new Z({color:4547908,roughness:1}));i.rotation.z=Math.PI/2,i.rotation.y=n%11*.23,i.position.y=.105,e.add(i)}addSurfaceAdjustment(e,t){let n=new Z({color:f.find(({id:e})=>e===t.zoneId)?.soilColor??7034171,roughness:.9,side:2,polygonOffset:!0,polygonOffsetFactor:-1}),r=new Y(this.createTerrainPatchDiscGeometry(t,fe,.087),n);r.name=`managed-soil-extension`,r.receiveShadow=!0,e.add(r);let i=new Z({color:7034171,roughness:.96});for(let t=0;t<3;t+=1){let n=new Y(new kl(.2-t*.018,1),i);n.scale.set(1.22,.12+t*.018,.72),n.position.set((t-1)*.2,.035+t*.008,Math.sin(t*2.2)*.1),n.rotation.y=t*.82,e.add(n)}}addTerrainPatchMarker(e,t){let n=new Y(this.createTerrainPatchDiscGeometry(t,.58,.103),new Ac({transparent:!0,opacity:0,depthWrite:!1,colorWrite:!1,side:2}));n.name=`terrain-patch-pick-target`,n.userData.pickOnly=!0;let r=new Y(this.createTerrainPatchRingGeometry(t,.48,.57,.109),new Ac({color:t.direction===`raise`?14066014:6717329,transparent:!0,opacity:.88,depthWrite:!1,side:2,polygonOffset:!0,polygonOffsetFactor:-2}));r.name=`terrain-patch-marker`,r.renderOrder=3,e.add(n,r)}addDrainageSegment(e,t){let n=t.length/2,r=new Y(this.createGroundRectangleGeometry(t,n,le,.087,Math.max(4,Math.ceil(t.length/.16)),2),new Z({color:5065021,roughness:1,side:2,polygonOffset:!0,polygonOffsetFactor:-1}));r.name=`drainage-groove`,r.renderOrder=2;let i=new Y(this.createGroundRectangleGeometry(t,n*.96,le*.43,.099,Math.max(4,Math.ceil(t.length/.16)),1),new Z({color:5151384,emissive:3501680,emissiveIntensity:.12,roughness:.38,transparent:!0,opacity:.72,depthWrite:!1,side:2,polygonOffset:!0,polygonOffsetFactor:-2}));i.name=`drainage-water`,i.renderOrder=3,i.userData.noShadow=!0,i.userData.editZoneId=t.zoneId,i.visible=this.isZoneVisuallyMoist(t.zoneId)&&this.wetDrainageEntryIds.has(t.id),this.drainageWaterMeshes.set(t.id,i);let a=new Y(this.createGroundRectangleGeometry(t,n+.055,le+.055,.107,Math.max(4,Math.ceil(t.length/.18)),2),new Ac({color:5620925,transparent:!0,opacity:.14,depthWrite:!1,side:2,polygonOffset:!0,polygonOffsetFactor:-3}));a.name=`drainage-build-marker`,a.renderOrder=4,a.userData.buildOnly=!0,a.userData.noShadow=!0;let o=new Y(this.createGroundRectangleGeometry(t,n+.08,Math.max(.25,le+.09),.12,Math.max(4,Math.ceil(t.length/.2)),2),new Ac({transparent:!0,opacity:0,depthWrite:!1,colorWrite:!1,side:2}));o.name=`drainage-pick-target`,o.userData.pickOnly=!0,o.userData.buildOnly=!0,e.add(r,i,a,o)}addStructure(e,t){if(t.zoneId===`d-headwater-edge`){this.addHeadwaterStructure(e,t);return}let n=me[t.form],r=new Z({color:t.form===`fence`?8479815:7362621,roughness:.96}),i=[],a=(e,n)=>this.groundAnchoredLocalHeight(t,e,n,.093),o=(e,t,n=0)=>new W(e,a(e,t)+n,t),s=(e,t,n,r=.085)=>{i.push({from:o(e,t),to:o(e,t,n),thickness:r})};if(t.form===`support`)s(0,0,1.24,.095),i.push({from:o(-.25,0,1.03),to:o(.25,0,1.03),thickness:.072}),i.push({from:o(-.18,.02),to:o(0,0,.62),thickness:.052},{from:o(.18,.02),to:o(0,0,.62),thickness:.052});else if(t.form===`rack`){let e=n.halfLength*.84,t=n.halfWidth*.78;for(let n of[-1,1])for(let r of[-1,1])s(n*e,r*t,.86,.072);for(let n of[-1,1])i.push({from:o(-e,n*t,.86),to:o(e,n*t,.86),thickness:.062});for(let n of[-e,0,e])i.push({from:o(n,-t,.9),to:o(n,t,.9),thickness:.052})}else if(t.form===`fence`){let e=n.halfLength*.9;for(let t of[-e,0,e])s(t,0,t===0?.69:.76,.082);for(let t of[.31,.58])i.push({from:o(-e,0,t),to:o(e,0,t),thickness:.07,depth:.055})}else{let e=n.halfLength*.86,t=n.halfWidth*.84;for(let n of[-1,1])for(let r of[-1,1])s(n*e,r*t,r<0?1.08:1,.074);for(let n of[-1,1]){let r=n<0?1.08:1;i.push({from:o(-e,n*t,r),to:o(e,n*t,r),thickness:.058})}for(let n of[-1,1])i.push({from:o(n*e,-t,1.08),to:o(n*e,t,1),thickness:.058})}let c=this.createStructurePieceMesh(i,r);if(c.name=t.form===`shade`?`structure-frame`:`structure-contact-part`,e.add(c),t.form===`shade`){let t=n.halfLength*.9,r=n.halfWidth*.88,i=[];for(let e=0;e<5;e+=1){let n=-r+e/4*r*2,a=1.08-e/4*.08;i.push({from:o(-t,n,a+.035),to:o(t,n,a+.035),thickness:.055,depth:r*.48})}let a=this.createStructurePieceMesh(i,new Z({color:9278563,roughness:.9,side:2}));a.name=`structure-contact-part`,e.add(a)}let l=new Y(this.createGroundRectangleGeometry(t,n.halfLength+.055,n.halfWidth+.055,.107,4,3),new Ac({color:5620925,transparent:!0,opacity:.13,depthWrite:!1,side:2,polygonOffset:!0,polygonOffsetFactor:-3}));l.name=`structure-build-marker`,l.renderOrder=4,l.userData.buildOnly=!0,l.userData.noShadow=!0;let u=new Y(this.createGroundRectangleGeometry(t,n.halfLength+.12,n.halfWidth+.12,.125,4,3),new Ac({transparent:!0,opacity:0,depthWrite:!1,colorWrite:!1,side:2}));u.name=`structure-pick-target`,u.userData.pickOnly=!0,u.userData.buildOnly=!0,e.add(l,u)}addHeadwaterStructure(e,t){let n=me[t.form],r=(e,n)=>this.groundAnchoredLocalHeight(t,e,n,.093),i=(e,t,n=0)=>new W(e,r(e,t)+n,t),a=new Z({color:6508862,roughness:1}),o=[];if(t.form===`support`){let t=new $c(new kl(.2,0),new Z({color:7438456,roughness:1}),4),n=new Wo;[{x:-.1,z:.02,y:.13,scale:1.18,rotation:.2},{x:.12,z:-.03,y:.14,scale:1.04,rotation:1.1},{x:-.02,z:.01,y:.39,scale:.88,rotation:.65},{x:.02,z:-.01,y:.59,scale:.65,rotation:1.65}].forEach((e,i)=>{n.compose(new W(e.x,r(e.x,e.z)+e.y,e.z),new xo().setFromEuler(new es(0,e.rotation,.08*i)),new W(e.scale,.72*e.scale,.9*e.scale)),t.setMatrixAt(i,n)}),t.instanceMatrix.needsUpdate=!0,t.name=`structure-contact-part`,e.add(t)}else{let s=n.halfLength*.86,c=n.halfWidth*.8;if(t.form===`rack`){for(let e of[-1,1])for(let t of[-1,1])o.push({from:i(e*s,t*c),to:i(e*s*.94,t*c,.66+e*.025),thickness:.064});for(let e of[-1,1])o.push({from:i(-s,e*c,.64),to:i(s,e*c,.69),thickness:.055});for(let e of[-s*.7,0,s*.72])o.push({from:i(e,-c,.69),to:i(e+.06,c,.66),thickness:.046})}else if(t.form===`fence`){for(let e of[-s,0,s])o.push({from:i(e,0),to:i(e+(e===0?.035:-Math.sign(e)*.04),0,.46),thickness:.074});o.push({from:i(-s,0,.2),to:i(s,0,.28),thickness:.066,depth:.052},{from:i(-s,0,.39),to:i(s,0,.34),thickness:.06,depth:.05},{from:i(-s*.62,.05),to:i(s*.56,-.04,.43),thickness:.045})}else{for(let e of[-1,1])o.push({from:i(e*s,-c),to:i(e*s*.9,-c*.85,.9),thickness:.07},{from:i(e*s,c),to:i(e*s*.92,c*.84,.77),thickness:.065});o.push({from:i(-s,-c,.9),to:i(s,-c,.9),thickness:.052},{from:i(-s,c,.77),to:i(s,c,.77),thickness:.052},{from:i(-s,-c,.9),to:i(-s,c,.77),thickness:.045},{from:i(s,-c,.9),to:i(s,c,.77),thickness:.045})}let l=this.createStructurePieceMesh(o,a);if(l.name=t.form===`shade`?`structure-frame`:`structure-contact-part`,e.add(l),t.form===`shade`){let t=new $c(new kl(.19,0),new Z({color:7304784,roughness:.98}),9),n=new Wo;for(let e=0;e<9;e+=1){let i=e%3,a=Math.floor(e/3),o=-s*.72+i*s*.72,l=-c*.68+a*c*.68,u=.88-a*.055+Math.sin(e*1.7)*.025;n.compose(new W(o,r(o,l)+u,l),new xo().setFromEuler(new es(.1,e*.91,.08)),new W(1.35,.24,.68)),t.setMatrixAt(e,n)}t.instanceMatrix.needsUpdate=!0,t.name=`structure-contact-part`,e.add(t)}}let s=new Y(this.createGroundRectangleGeometry(t,n.halfLength+.055,n.halfWidth+.055,.107,4,3),new Ac({color:5620925,transparent:!0,opacity:.13,depthWrite:!1,side:2,polygonOffset:!0,polygonOffsetFactor:-3}));s.name=`structure-build-marker`,s.renderOrder=4,s.userData.buildOnly=!0,s.userData.noShadow=!0;let c=new Y(this.createGroundRectangleGeometry(t,n.halfLength+.12,n.halfWidth+.12,.125,4,3),new Ac({transparent:!0,opacity:0,depthWrite:!1,colorWrite:!1,side:2}));c.name=`structure-pick-target`,c.userData.pickOnly=!0,c.userData.buildOnly=!0,e.add(s,c)}createStructurePieceMesh(e,t){let n=new $c(new Cl(1,1,1),t,e.length),r=new Wo,i=new W,a=new W,o=new xo,s=new W,c=new W(1,0,0);return e.forEach((e,t)=>{a.subVectors(e.to,e.from);let l=Math.max(.001,a.length());a.multiplyScalar(1/l),i.addVectors(e.from,e.to).multiplyScalar(.5),o.setFromUnitVectors(c,a),s.set(l,e.thickness,e.depth??e.thickness),r.compose(i,o,s),n.setMatrixAt(t,r)}),n.instanceMatrix.needsUpdate=!0,n.computeBoundingBox(),n.computeBoundingSphere(),n}createGroundRectangleGeometry(e,t,n,r,i,a){let o=[],s=[],c=Math.max(1,Math.floor(i)),l=Math.max(1,Math.floor(a));for(let i=0;i<=c;i+=1){let a=-t+i/c*t*2;for(let t=0;t<=l;t+=1){let i=-n+t/l*n*2;o.push(a,this.groundAnchoredLocalHeight(e,a,i,r),i)}}let u=l+1;for(let e=0;e<c;e+=1)for(let t=0;t<l;t+=1){let n=e*u+t,r=n+1,i=n+u,a=i+1;s.push(n,r,i,i,r,a)}let d=new yc;return d.setAttribute(`position`,new J(o,3)),d.setIndex(s),d.computeVertexNormals(),d.computeBoundingBox(),d.computeBoundingSphere(),d}groundAnchoredLocalHeight(e,t,n,r){let i=e.kind===`drainage-segment`||e.kind===`structure`?-e.rotation:e.rotation,a=Math.cos(i),o=Math.sin(i),s=e.at.x+a*t+o*n,c=e.at.z-o*t+a*n,l=this.groundHeightAt(e.at.x,e.at.z)+pg;return this.groundHeightAt(s,c)+r-l}createTerrainPatchDiscGeometry(e,t,n){let r=[0,this.groundAnchoredLocalHeight(e,0,0,n),0],i=[];for(let a=1;a<=4;a+=1){let o=t*a/4,s=1+(a-1)*32;for(let t=0;t<32;t+=1){let i=t/32*Math.PI*2,a=Math.cos(i)*o,s=Math.sin(i)*o;r.push(a,this.groundAnchoredLocalHeight(e,a,s,n),s)}for(let e=0;e<32;e+=1){let t=(e+1)%32,n=s+e,r=s+t;if(a===1){i.push(0,r,n);continue}let o=s-32,c=o+e,l=o+t;i.push(c,l,n,l,r,n)}}let a=new yc;return a.setAttribute(`position`,new J(r,3)),a.setIndex(i),a.computeVertexNormals(),a.computeBoundingBox(),a.computeBoundingSphere(),a}createTerrainPatchRingGeometry(e,t,n,r){let i=[],a=[];for(let a=0;a<32;a+=1){let o=a/32*Math.PI*2,s=Math.cos(o),c=Math.sin(o);for(let a of[t,n]){let t=s*a,n=c*a;i.push(t,this.groundAnchoredLocalHeight(e,t,n,r),n)}}for(let e=0;e<32;e+=1){let t=(e+1)%32,n=e*2,r=n+1,i=t*2,o=i+1;a.push(n,i,r,i,o,r)}let o=new yc;return o.setAttribute(`position`,new J(i,3)),o.setIndex(a),o.computeVertexNormals(),o.computeBoundingBox(),o.computeBoundingSphere(),o}removeEditEntry(e,t){t&&(this.drainageWaterMeshes.delete(e),this.activeEditUseIds.delete(e),this.editEntryReactions.delete(e),this.editEntryRoot.remove(t),this.disposeObject(t),this.editEntryGroups.delete(e))}disposeObject(e){let t=new Set,n=new Set;e.traverse(e=>{e instanceof Y&&(t.add(e.geometry),(Array.isArray(e.material)?e.material:[e.material]).forEach(e=>n.add(e)))}),t.forEach(e=>e.dispose()),n.forEach(e=>e.dispose())}setPointerRay(e,t){let n=this.canvas.getBoundingClientRect();return n.width<=0||n.height<=0||!Number.isFinite(e)||!Number.isFinite(t)?!1:(this.pointer.set((e-n.left)/n.width*2-1,-((t-n.top)/n.height)*2+1),this.camera.updateMatrixWorld(),this.raycaster.setFromCamera(this.pointer,this.camera),!0)}buildLandmarks(){this.buildHouse(),gg.forEach(({at:e,scale:t,kind:n,tone:r})=>this.buildTree(e,t,n,r)),this.buildRockCluster({x:-4.5,z:-15.8}),this.buildRockCluster({x:4.6,z:-13.8}),this.buildRockCluster({x:-.2,z:-23.55}),this.buildGardenDetails(),this.buildPlaceVegetation(),this.buildAmbientGroundCover()}buildWaterSources(){for(let e of h){let t=x(e.at.x,e.at.z);if(e.id===`a-well`){let n=new K;n.position.set(e.at.x,t,e.at.z);let r=new Z({color:9144957,roughness:.98}),i=new Y(new El(.7,.76,.7,14,1,!0),new Z({color:6251099,roughness:1,side:2}));i.position.y=.35,n.add(i);for(let e=0;e<12;e+=1){let t=e/12*Math.PI*2,i=new Y(new kl(.24,0),r);i.scale.set(1.3,.72+e%3*.08,.82),i.position.set(Math.cos(t)*.73,.66,Math.sin(t)*.73),i.rotation.set(e*.17,-t,e*.11),n.add(i)}let a=new Y(new Tl(.66,12),new Z({color:3495531,roughness:.24,metalness:.08}));a.rotation.x=-Math.PI/2,a.position.y=.51;let o=new Z({color:7166529,roughness:1});for(let e of[-1,1]){let t=new Y(new El(.09,.1,2.05,6),o);t.position.set(e*.72,1.18,0),n.add(t)}let s=new Y(new Cl(1.86,.13,.13),o);s.position.set(0,2.18,0);let c=new Y(new El(.21,.18,.3,8),new Z({color:8217927,roughness:.95}));c.position.set(0,1.45,0);let l=new Y(new El(.02,.02,.58,5),new Z({color:12101768,roughness:1}));l.position.set(0,1.83,0),n.add(a,s,c,l),n.traverse(e=>{e instanceof Y&&(e.castShadow=!0,e.receiveShadow=!0)}),this.scene.add(n);continue}for(let[t,n]of[-.42,.1,.58].entries()){let r=new Y(new X(.34-t*.04,7,5),new Z({color:10130568,roughness:1}));r.scale.y=.42,r.position.set(e.at.x+n*.72,x(e.at.x+n*.72,e.at.z+n)+.08,e.at.z+n),r.castShadow=!0,r.receiveShadow=!0,this.scene.add(r)}}}buildHouse(){let e=-12.6,t=-3.2,n=x(e,t),r=new K;r.position.set(e,n,t);let i=new Y(new Cl(3.75,.34,3.08),new Z({color:8486512,roughness:1}));i.position.y=.17;let a=new Y(new Cl(3.4,2.18,2.72),new Z({color:14272927,roughness:.93}));a.position.y=1.38;let o=new Z({color:7624765,roughness:1});for(let e of[-1,1])for(let t of[-1,1]){let n=new Y(new Cl(.14,2.25,.14),o);n.position.set(e*1.62,1.39,t*1.28),r.add(n)}let s=new Y(new Cl(3.5,.15,.16),o);s.position.set(0,2.38,1.31);let c=new Y(new Cl(.82,1.62,.1),new Z({color:7296057,roughness:.96}));c.position.set(.48,1.12,1.41);let l=new Y(new Cl(.53,.04,.03),new Z({color:10122312,roughness:.9}));l.position.set(.48,1.14,1.47);let u=new Y(new X(.045,8,5),new Z({color:13809006,roughness:.58}));u.position.set(.18,1.16,1.49);let d=new Z({color:9156528,emissive:5602160,emissiveIntensity:.12,roughness:.34}),f=new Y(new Cl(.72,.72,.08),d);f.position.set(-.72,1.5,1.42);let p=new Y(new Cl(.08,.76,.82),d);p.position.set(-1.73,1.5,-.35);let m=new Z({color:11095869,roughness:.82});for(let e of[-1,1]){let t=new Y(new Cl(1.95,.12,3.18),m);t.rotation.z=-e*.41,t.position.set(e*.87,2.82,0),r.add(t)}let h=new Y(new El(.09,.09,3.2,6),m);h.rotation.x=Math.PI/2,h.position.set(0,3.18,0);let g=new yc;g.setAttribute(`position`,new J([-1.68,2.42,0,1.68,2.42,0,0,3.16,0],3)),g.computeVertexNormals();let _=new Y(g,new Z({color:13877655,roughness:.94,side:2}));_.position.z=1.375;let v=_.clone();v.position.z=-1.375;let y=new Y(new Cl(.38,1.18,.42),new Z({color:7499363,roughness:1}));y.position.set(-.82,3.06,-.46);let b=new Y(new Cl(1.3,.18,.62),new Z({color:9668985,roughness:1}));b.position.set(.45,.37,1.65),r.add(i,a,s,c,l,u,f,p,_,v,h,y,b),r.traverse(e=>{e instanceof Y&&(e.castShadow=!0,e.receiveShadow=!0)}),this.scene.add(r)}buildTree(e,t,n,r){let i=x(e.x,e.z),a=new K;a.position.set(e.x,i,e.z);let o=new Y(new El(.17*t,.24*t,2.15*t,7),new Z({color:6574908,roughness:1}));if(o.position.y=1.08*t,a.add(o),n===`conifer`){let e=[4155467,4812620,5666382],n=new Z({color:e[r%e.length],roughness:.97});for(let e=0;e<3;e+=1){let i=new Y(new Dl((1.18-e*.16)*t,2.2*t,8),n);i.position.y=(2.45+e*.72)*t,i.rotation.y=e*.7+r*.23,a.add(i)}}else{let e=[5798221,6718034,7506776],n=new Z({color:e[r%e.length],roughness:.98});for(let e of[{x:-.48,y:2.72,z:.05,size:.94},{x:.42,y:2.84,z:.15,size:1.02},{x:.02,y:3.35,z:-.18,size:1.08},{x:.05,y:2.65,z:-.58,size:.82}]){let r=new Y(new qu(e.size*t,1),n);r.scale.y=.82,r.position.set(e.x*t,e.y*t,e.z*t),a.add(r)}}a.traverse(e=>{e instanceof Y&&(e.castShadow=!0,e.receiveShadow=!0)}),this.scene.add(a)}buildGardenDetails(){let e=f.find(({id:e})=>e===`a-garden`);if(!e)return;let t=new Z({color:10130044,roughness:1});e.outline.forEach((n,r)=>{if(r===1||r===7)return;let i=e.outline[(r+1)%e.outline.length],a=Math.hypot(i.x-n.x,i.z-n.z),o=Math.max(1,Math.floor(a/.62));for(let e=0;e<o;e+=1){let r=(e+.5)/o,a=n.x+(i.x-n.x)*r,s=n.z+(i.z-n.z)*r,c=new Y(new kl(.16,0),t);c.scale.set(1.25,.58,.86),c.position.set(a,x(a,s)+.09,s),c.rotation.set(.08,_g(a,s,21)*Math.PI,.04),c.castShadow=!0,c.receiveShadow=!0,this.scene.add(c)}}),[{x:-11.8,z:-.85},{x:-11.35,z:.02},{x:-10.9,z:.88},{x:-10.4,z:1.72}].forEach((e,n)=>{let r=new Y(new El(.42-n*.025,.46,.12,8),t);r.scale.z=.7,r.position.set(e.x,x(e.x,e.z)+.055,e.z),r.rotation.y=n*.51,r.receiveShadow=!0,this.scene.add(r)})}buildPlaceVegetation(){[{at:{x:-6.2,z:-5.6},scale:.82,tone:0},{at:{x:-5.2,z:-7.7},scale:.9,tone:1},{at:{x:-4.5,z:-10.1},scale:1.02,tone:0},{at:{x:-.2,z:-10.6},scale:.88,tone:2},{at:{x:4.8,z:-8.8},scale:.78,tone:1},{at:{x:4.7,z:-3.9},scale:.74,tone:2},{at:{x:-5.8,z:8.7},scale:.82,tone:2},{at:{x:-7.1,z:12.3},scale:.9,tone:1},{at:{x:4.7,z:13.8},scale:.76,tone:0},{at:{x:-7.1,z:18.1},scale:.68,tone:1},{at:{x:-1.1,z:20.6},scale:.72,tone:2}].forEach(({at:e,scale:t,tone:n})=>this.buildShrub(e,t,n));let e=new $c(new Dl(.075,.82,5),new Z({color:8229207,roughness:1}),42),t=new _s,n=0;for(let r=0;r<bg.length&&n<42;r+=2){let i=bg[r],a=this.polylineNormal(bg,r);for(let r of[-1,1])for(let o=0;o<3&&n<42;o+=1){let s=1.32+o*.18+_g(i.x,i.z,n)*.16,c=i.x+a.x*s*r+Math.sin(n*2.3)*.12,l=i.z+a.z*s*r+Math.cos(n*1.7)*.12;t.position.set(c,x(c,l)+.36,l),t.rotation.set(0,n*1.31,(_g(c,l,3)-.5)*.18);let u=.72+_g(c,l,4)*.52;t.scale.set(.82,u,.82),t.updateMatrix(),e.setMatrixAt(n,t.matrix),n+=1}}e.count=n,e.instanceMatrix.needsUpdate=!0,e.castShadow=!0,this.scene.add(e)}buildShrub(e,t,n){let r=[5206094,6322765,7177299],i=new Z({color:r[n%r.length],roughness:1}),a=new K;a.position.set(e.x,x(e.x,e.z),e.z);for(let r of[{x:-.28,y:.32,z:.06,size:.42},{x:.22,y:.38,z:.12,size:.48},{x:.02,y:.58,z:-.12,size:.46}]){let o=new Y(new kl(r.size*t,0),i);o.scale.y=.72,o.position.set(r.x*t,r.y*t,r.z*t),o.rotation.y=_g(e.x+r.x,e.z+r.z,n)*Math.PI,o.castShadow=!0,o.receiveShadow=!0,a.add(o)}this.scene.add(a)}buildAmbientGroundCover(){let e=new $c(new Dl(.055,.42,4),new Z({color:16777215,roughness:1}),210),t=new _s,i=0;for(let a=0;a<1800&&i<210;a+=1){let o=n.x+(_g(a,3,31)*2-1)*r.x,s=n.z+(_g(a,7,37)*2-1)*r.z,c={x:o,z:s};if(!A(c)||k(c)||T(c,u)<d.bankHalfWidth+.32||C(c,{x:-12.6,z:-3.2})<4.2**2||hg.some(e=>T(c,e.points)<e.width*.5+.52))continue;let l=s<-6?.76:s>10?.62:.48;if(_g(o,s,43)>l)continue;let f=.48+_g(o,s,47)*.72;t.position.set(o,x(o,s)+.19*f,s),t.rotation.set(0,_g(o,s,53)*Math.PI,(_g(o,s,59)-.5)*.17),t.scale.set(.82+_g(o,s,61)*.55,f,.82),t.updateMatrix(),e.setMatrixAt(i,t.matrix);let p=s<-6?new q(5271373).lerp(new q(7309141),_g(o,s,67)):new q(7901530).lerp(new q(10660202),_g(o,s,71));e.setColorAt(i,p),i+=1}e.count=i,e.instanceMatrix.needsUpdate=!0,e.instanceColor.needsUpdate=!0,e.receiveShadow=!0,this.scene.add(e)}buildRockCluster(e){for(let t=0;t<4;t+=1){let n=e.x+(t-1.5)*.95,r=e.z+Math.sin(t*2.1)*.7,i=.72+t*.12,a=new Y(new kl(i,0),new Z({color:8357757,roughness:1}));a.scale.y=.65,a.rotation.set(t*.17,t*.63,t*.11),a.position.set(n,x(n,r)+i*.45,r),a.castShadow=!0,a.receiveShadow=!0,this.scene.add(a)}}buildPlayer(){let e=new Z({color:11956020,roughness:.84,flatShading:!0}),t=new Z({color:14855792,roughness:.82}),n=new Z({color:11430708,roughness:.86}),r=new Z({color:12154942,roughness:.86}),i=new Z({color:5058590,roughness:.38}),a=new Z({color:7507534,roughness:.82,flatShading:!0});this.player.name=`greenstar-player`,this.playerTorso.name=`costume-ready-torso-root`,this.playerHead.name=`costume-ready-head-root`;let o=new Y(new Ju([new U(.13,-.43),new U(.25,-.39),new U(.32,-.22),new U(.34,.04),new U(.31,.25),new U(.23,.41),new U(.1,.46)],12),n);o.name=`greenstar-seed-torso`;let s=new Y(new El(.095,.105,.12,12),n);s.name=`costume-neck-anchor`,s.position.y=.4;let c=new ou;for(let e=0;e<10;e+=1){let t=e%2==0?.125:.063,n=-Math.PI/2+e*Math.PI/5,r=Math.cos(n)*t,i=Math.sin(n)*t;e===0?c.moveTo(r,i):c.lineTo(r,i)}c.closePath();let l=new Y(new Wu(c,{depth:.018,bevelEnabled:!0,bevelSegments:1,bevelSize:.006,bevelThickness:.006}),a);l.name=`greenstar-chest-emblem`,l.position.set(0,.08,.334),this.playerTorso.position.y=1.08,this.playerTorso.add(o,s,l),this.playerHead.position.y=1.73;let u=new Y(new Ju([new U(.06,-.34),new U(.27,-.31),new U(.36,-.12),new U(.37,.14),new U(.29,.33),new U(.1,.47),new U(0,.5)],8),e);u.name=`faceted-chestnut-head`;let d=new ou;d.moveTo(-.265,-.19),d.quadraticCurveTo(-.295,-.04,-.275,.13),d.quadraticCurveTo(-.14,.21,0,.215),d.quadraticCurveTo(.14,.21,.275,.13),d.quadraticCurveTo(.295,-.04,.265,-.19),d.quadraticCurveTo(0,-.285,-.265,-.19);let f=new Y(new Wu(d,{depth:.024,bevelEnabled:!0,bevelSegments:2,bevelSize:.018,bevelThickness:.018,curveSegments:6}),t);f.name=`broad-faceted-face-panel`,f.position.set(0,-.015,.336);let p=new Y(new X(.042,14,10),i),m=p.clone();p.name=`left-eye`,m.name=`right-eye`,p.scale.z=.42,m.scale.z=.42,p.position.set(-.12,-.02,.386),m.position.set(.12,-.02,.386);let h=new Y(new Qu(new tu(new W(-.058,-.105,.388),new W(0,-.15,.394),new W(.058,-.105,.388)),10,.009,8,!1),i);h.name=`small-friendly-smile`,this.playerHead.add(u,f,p,m,h);let g=(e,n,i)=>{e.name=i<0?`left-costume-arm-root`:`right-costume-arm-root`,e.position.set(i*.345,1.34,0),e.rotation.z=i*.1;let a=new Y(new X(.125,12,8),r);a.name=`broad-rounded-shoulder`,a.scale.set(.94,1,.9);let o=new Y(new wl(.085,.12,4,8),r);o.name=`chunky-simple-upper-arm`,o.position.y=-.155,n.position.y=-.31;let s=new Y(new X(.078,12,8),r);s.name=`subtle-rounded-elbow`;let c=new Y(new El(.085,.12,.22,8),r);c.name=`tapered-simple-forearm`,c.position.y=-.15;let l=new Y(new X(.15,14,10),t);l.name=`large-simple-mitten-hand`,l.scale.set(.72,1.05,.7),l.position.y=-.34,n.add(s,c,l),e.add(a,o,n)},_=(e,n,i)=>{e.name=i<0?`left-costume-leg-root`:`right-costume-leg-root`,e.position.set(i*.17,.72,0);let a=new Y(new X(.11,12,8),r);a.name=`broad-rounded-hip`,a.scale.set(.9,1,.9);let o=new Y(new wl(.1,.08,4,8),r);o.name=`chunky-simple-upper-leg`,o.position.y=-.14,n.position.y=-.28;let s=new Y(new X(.095,12,8),r);s.name=`subtle-rounded-knee`;let c=new Y(new El(.095,.12,.2,8),r);c.name=`tapered-simple-lower-leg`,c.position.y=-.13;let l=new Y(new X(.18,14,10),t);l.name=`large-rounded-boot-foot`,l.scale.set(.82,.48,1.14),l.position.set(0,-.34,.06),n.add(s,c,l),e.add(a,o,n)};g(this.playerLeftArm,this.playerLeftElbow,-1),g(this.playerRightArm,this.playerRightElbow,1),_(this.playerLeftLeg,this.playerLeftKnee,-1),_(this.playerRightLeg,this.playerRightKnee,1),this.player.add(this.playerTorso,this.playerHead,this.playerLeftArm,this.playerRightArm,this.playerLeftLeg,this.playerRightLeg),this.player.traverse(e=>{e instanceof Y&&(e.castShadow=!0,e.receiveShadow=!0)}),this.scene.add(this.player)}},kg=Object.freeze({baseDryingSeconds:180,coverRetention:Object.freeze({"open-ground":1,patches:1.4,linked:2,dense:2.67}),lightRetention:Object.freeze({bright:1,dappled:1.5,shaded:2.2}),drainageRetention:Object.freeze({none:1,holding:1.25,outflow:.7}),amendmentRetentionStep:.25,maximumAmendmentRetention:1.75}),Ag=.1;function jg(e){return e!==`drying-exposed`}function Mg(e=St){let t=t=>({wetness:+!!jg(e[t].moistureSource)});return{"a-garden":t(`a-garden`),"b-bright-soil":t(`b-bright-soil`),"b-moist-soil":t(`b-moist-soil`)}}function Ng(e,t){return Object.values(e[t]).filter(e=>e.kind===`surface-adjustment`).length}function Pg(e,t,n,r=kg,i){let a=t.zones[e],o=Ng(n.current,e),s=Math.min(r.maximumAmendmentRetention,1+o*r.amendmentRetentionStep),c=i?bt(n,e,i):`none`;return r.baseDryingSeconds*r.coverRetention[a.lowCover]*r.lightRetention[a.light]*s*r.drainageRetention[c]}function Fg(e){return Number.isFinite(e)?Math.max(0,Math.min(e,Ag)):0}function Ig(e,t){let n=t.ambient??St,r=t.tuning??kg,i=Fg(t.deltaSeconds),a=a=>{if(jg(n[a].moistureSource))return{wetness:1};let o=e[a].wetness;if(o<=0)return{wetness:0};let s=Pg(a,t.environment,t.editState,r,e[a].wateredAt);if(s<=0)return{wetness:0};let c=Math.max(0,o-i/s);return c>0?{wetness:c,...e[a].wateredAt?{wateredAt:{...e[a].wateredAt}}:{}}:{wetness:0}};return{"a-garden":a(`a-garden`),"b-bright-soil":a(`b-bright-soil`),"b-moist-soil":a(`b-moist-soil`)}}function Lg(e,t,n){return{...e,[t]:{wetness:1,...n?{wateredAt:{x:n.x,z:n.z}}:{}}}}function Rg(e){let t=t=>e[t].wetness>0?`moist`:`dry`;return{"a-garden":t(`a-garden`),"b-bright-soil":t(`b-bright-soil`),"b-moist-soil":t(`b-moist-soil`)}}var zg=Object.freeze({capacity:4});function Bg(e=zg){return{portions:e.capacity}}function Vg(e,t=zg){return t.capacity<=0?0:Math.max(0,Math.min(1,e.portions/t.capacity))}function Hg(e){return e.portions<=0}function Ug(e,t,n=zg){return!t||e.portions>=n.capacity?{can:e,changed:!1}:{can:{portions:n.capacity},changed:!0}}function Wg(e,t,n,r){return n?Hg(e)?{can:e,moisture:t,poured:!1,rejection:`empty-can`}:{can:{portions:e.portions-1},moisture:Lg(t,n,r),poured:!0}:{can:e,moisture:t,poured:!1,rejection:`no-zone`}}var Gg=e.length*24;function Kg(t){return e.includes(t)}var qg=class{session;environment;activeZoneId;blocked=!1;moisture;moistureReading;can;growth;archivedGrowth=new Map;worldElapsed;ecologyRevision=0;constructor(e,t,n=0){this.session=Ke(e),this.worldElapsed=Math.max(0,Number.isFinite(n)?n:0),this.growth=t?ln(t,this.session.state,this.worldElapsed):e?yn(this.session.state,this.worldElapsed):ln(cn(),this.session.state,this.worldElapsed),this.moisture=Mg(),this.moistureReading=Rg(this.moisture),this.can=Bg(),this.environment=this.evaluateEnvironment()}evaluateEnvironment(){return Yt(this.session.state,void 0,void 0,this.moistureReading,this.growth)}reevaluate(){this.environment=this.evaluateEnvironment()}stageSignature(e){return Object.entries(e.byEntryId).sort(([e],[t])=>e.localeCompare(t)).map(([e,t])=>e+`:`+mn(t,this.worldElapsed).stage).join(`,`)}setBlocked(e){this.blocked=e}advanceMoisture(e){if(this.blocked)return!1;this.moisture=Ig(this.moisture,{deltaSeconds:e,environment:this.environment,editState:this.session.state});let t=Rg(this.moisture),n=Object.keys(t).some(e=>t[e]!==this.moistureReading[e]);return this.moistureReading=t,n&&(this.reevaluate(),this.ecologyRevision+=1),n}fill(e){if(this.blocked)return!1;let t=Ug(this.can,e);return this.can=t.can,t.changed}water(e){if(this.blocked)return{changed:!1,rejection:`editing-blocked`};if(!this.activeZoneId)return{changed:!1,rejection:`editing-inactive`};if(!Kg(this.activeZoneId))return{changed:!1,rejection:`care-zone-only`};let t=Wg(this.can,this.moisture,this.activeZoneId,e);return t.poured?(this.can=t.can,this.moisture=t.moisture,this.moistureReading=Rg(this.moisture),this.reevaluate(),this.ecologyRevision+=1,{changed:!0}):{changed:!1,...t.rejection?{rejection:t.rejection}:{}}}enter(e){this.blocked||(this.activeZoneId=e)}exit(){this.activeZoneId=void 0}reset(e,t,n=0){this.session=Ke(e),this.worldElapsed=Math.max(0,Number.isFinite(n)?n:0),this.growth=t?ln(t,this.session.state,this.worldElapsed):e?yn(this.session.state,this.worldElapsed):ln(cn(),this.session.state,this.worldElapsed),this.archivedGrowth.clear(),this.moisture=Mg(),this.moistureReading=Rg(this.moisture),this.can=Bg(),this.reevaluate(),this.activeZoneId=void 0,this.blocked=!1,this.ecologyRevision=0}apply(e,t={}){if(this.blocked)return{changed:!1,rejection:`editing-blocked`};if(!this.activeZoneId)return{changed:!1,rejection:`editing-inactive`};if(e.zoneId!==this.activeZoneId)return{changed:!1,rejection:`different-zone`};if(e.type===`thin`){let t=this.session.state.current[e.zoneId][e.id],n=this.growth.byEntryId[e.id];if(t?.kind===`low-flower`&&(!n||mn(n,this.worldElapsed).stage===`seed`))return{changed:!1,rejection:`plant-too-young`}}let n=this.growth,r=rt(this.session,e,t);if(r.changed){this.session=r.session;let e=new Set(Object.values(this.session.state.current).flatMap(e=>Object.values(e)).filter(e=>e.kind===`low-flower`).map(e=>e.id));for(let[t,r]of Object.entries(n.byEntryId))e.has(t)||this.archivedGrowth.set(t,r);for(;this.archivedGrowth.size>Gg;){let e=this.archivedGrowth.keys().next().value;if(!e)break;this.archivedGrowth.delete(e)}let t=ln(n,this.session.state,this.worldElapsed),i={...t.byEntryId},a=!1;for(let t of e)if(!n.byEntryId[t]){let e=this.archivedGrowth.get(t);e&&(i[t]=e,this.archivedGrowth.delete(t),a=!0)}a&&(t={byEntryId:i}),this.growth=t,this.reevaluate(),this.ecologyRevision+=1}return{changed:r.changed,...r.entryId?{entryId:r.entryId}:{},...r.rejection?{rejection:r.rejection}:{}}}persistentState(){return qe(this.session)}persistentPlantGrowthState(){return{byEntryId:Object.fromEntries(Object.entries(this.growth.byEntryId).map(([e,t])=>[e,{...t}]))}}advancePlantGrowth(e,t,n){this.worldElapsed=Math.max(this.worldElapsed,Number.isFinite(t)?t:this.worldElapsed);let r=this.growth,i=this.stageSignature(r),a=dn(r,this.session.state,{deltaSeconds:e,worldElapsed:this.worldElapsed,worldRunning:n&&!this.blocked,environment:this.environment});if(a===r)return{changed:!1,stageChanged:!1};this.growth=a;let o=i!==this.stageSignature(a);return o&&(this.reevaluate(),this.ecologyRevision+=1),{changed:!0,stageChanged:o}}snapshot(t={}){let n=e.flatMap(e=>{let t=this.moisture[e];return t.wetness>0&&t.wateredAt?yt(this.session.state,e,t.wateredAt):[]}),r=Object.values(this.session.state.current[`d-headwater-edge`]).filter(e=>e.kind===`drainage-segment`).map(e=>e.id).sort((e,t)=>e.localeCompare(t));return{...this.activeZoneId?{activeZoneId:this.activeZoneId}:{},editState:this.session.state,environment:this.environment,canUndoActiveZone:this.activeZoneId?Xe(this.session,this.activeZoneId,t):!1,blocked:this.blocked,wateringCanLevel:Vg(this.can),surfaceMoisture:this.moistureReading,wetDrainageEntryIds:[...n,...r],plantGrowth:this.growth,ecologyRevision:this.ecologyRevision}}},Jg=6.3,Yg=7.2,Xg=14;Object.freeze({minimum:7.2,maximum:14});var Zg=.18;function Qg(e,t,n){return Math.max(t,Math.min(n,e))}var $g=class{playerX=i.x;playerZ=i.z;playerHeading=0;cameraYaw=-Math.PI/2;cameraDistance=10.5;elapsed=0;started=!1;blocked=!1;obstacles=[];constructor(e){e&&this.restore(e)}start(){this.started=!0}setBlocked(e){this.blocked=e}setMovementObstacles(e){this.obstacles=e.map(e=>({...e,at:{x:e.at.x,z:e.at.z}}))}reset(e){this.playerX=i.x,this.playerZ=i.z,this.playerHeading=0,this.cameraYaw=-Math.PI/2,this.cameraDistance=10.5,this.elapsed=0,this.started=!1,this.blocked=!1,e&&this.restore(e)}advance(e,t){if(!this.started||this.blocked)return;let n=Qg(e,0,.05);this.elapsed+=n,this.cameraYaw-=t.lookDeltaX*.006,this.cameraDistance=Qg(this.cameraDistance+t.zoomDelta*.008,Yg,Xg);let r=-Math.sin(this.cameraYaw),i=-Math.cos(this.cameraYaw),a=Math.cos(this.cameraYaw),o=-Math.sin(this.cameraYaw),s=r*t.moveForward+a*t.moveRight,c=i*t.moveForward+o*t.moveRight,l=Math.hypot(s,c);l>1&&(s/=l,c/=l),Math.hypot(s,c)>.001&&(this.playerHeading=Math.atan2(s,c)),this.moveWithSliding(s*Jg*n,c*Jg*n)}snapshot(){let e={x:this.playerX,z:this.playerZ};return{playerAt:e,playerHeading:this.playerHeading,cameraYaw:this.cameraYaw,cameraDistance:this.cameraDistance,place:N(e),elapsed:this.elapsed,started:this.started,blocked:this.blocked}}persistentState(){return{playerAt:{x:this.playerX,z:this.playerZ},playerHeading:this.playerHeading,cameraYaw:this.cameraYaw,cameraDistance:this.cameraDistance,elapsed:this.elapsed}}restore(e){this.playerX=e.playerAt.x,this.playerZ=e.playerAt.z,this.playerHeading=e.playerHeading,this.cameraYaw=e.cameraYaw,this.cameraDistance=Qg(e.cameraDistance,Yg,Xg),this.elapsed=Math.max(0,e.elapsed)}moveWithSliding(e,t){if(e===0&&t===0)return;let n={x:this.playerX+e,z:this.playerZ+t};if(this.canStandAt(n)){this.playerX=n.x,this.playerZ=n.z;return}let r={x:this.playerX+e,z:this.playerZ};this.canStandAt(r)&&(this.playerX=r.x);let i={x:this.playerX,z:this.playerZ+t};this.canStandAt(i)&&(this.playerZ=i.z)}canStandAt(e){if(!ee(e))return!1;let t={x:this.playerX,z:this.playerZ};return this.obstacles.every(n=>{let r=this.obstaclePenetration(e,n);if(r<=0)return!0;let i=this.obstaclePenetration(t,n);return i>0&&r<=i+1e-9})}obstaclePenetration(e,t){if(t.kind===`circle`)return Math.max(0,Zg+t.radius-Math.hypot(e.x-t.at.x,e.z-t.at.z));let n=e.x-t.at.x,r=e.z-t.at.z,i=Math.cos(t.rotation),a=Math.sin(t.rotation),o=i*n+a*r,s=-a*n+i*r,c=t.halfLength+Zg-Math.abs(o),l=t.halfWidth+Zg-Math.abs(s);return c>0&&l>0?Math.min(c,l):0}};function e_(e){return[...new Set(e)].sort((e,t)=>e.localeCompare(t))}var t_=class{smallOpportunities;toadOpportunities;smallResidents;toad;editRevision;ecologyRevision;plantGrowthEnabled;lastEventId=0;constructor(e,t,n,r=e.revision){this.editRevision=e.revision,this.ecologyRevision=r,this.plantGrowthEnabled=n!==void 0,this.smallOpportunities=Yh(e.current,t,n),this.toadOpportunities=tr(t),rg(this.smallOpportunities),fr(this.toadOpportunities),this.smallResidents=Qh(this.smallOpportunities),this.toad=nr()}reset(e,t,n,r=e.revision){this.editRevision=e.revision,this.ecologyRevision=r,this.plantGrowthEnabled=n!==void 0,this.smallOpportunities=Yh(e.current,t,n),this.toadOpportunities=tr(t),rg(this.smallOpportunities),fr(this.toadOpportunities),this.smallResidents=Qh(this.smallOpportunities),this.toad=nr(),this.lastEventId=0}advance(e){if(!e.started||e.blocked)return{snapshot:this.snapshot(),smallEvents:[],toadCues:[]};let t=e.ecologyRevision??e.editState.revision,n=e.plantGrowth!==void 0;(e.editState.revision!==this.editRevision||t!==this.ecologyRevision||n!==this.plantGrowthEnabled)&&(this.editRevision=e.editState.revision,this.ecologyRevision=t,this.plantGrowthEnabled=n,this.smallOpportunities=Yh(e.editState.current,e.environment,e.plantGrowth),this.toadOpportunities=tr(e.environment));let r={deltaSeconds:e.deltaSeconds,playerAt:e.playerAt,...e.activeEditZoneId?{activeEditZoneId:e.activeEditZoneId}:{}},i=$h(this.smallResidents,{...r,opportunities:this.smallOpportunities}),a=lr(this.toad,{...r,opportunities:this.toadOpportunities});return this.smallResidents=i.state,this.toad=a.state,this.lastEventId+=i.events.length+a.cues.length,{snapshot:this.snapshot(),smallEvents:i.events,toadCues:a.cues}}snapshot(){return{smallResidents:this.smallResidents,toad:this.toad,smallOpportunities:this.smallOpportunities,toadOpportunities:this.toadOpportunities,editRevision:this.editRevision,ecologyRevision:this.ecologyRevision,lastEventId:this.lastEventId}}occupiedEditEntryIds(){return e_([...eg(this.smallResidents),...ur(this.toad)])}editGuard(){return{occupiedEntryIds:this.occupiedEditEntryIds()}}},n_=Object.freeze({A:`⌂`,B:`≈`,C:`♧`,D:`◇`,E:`↘`,F:`⌁`}),r_=Object.freeze({support:`지지대`,rack:`시렁`,fence:`낮은 울타리`,shade:`그늘막`}),i_=Object.freeze({support:`돌무더기`,rack:`가지 시렁`,fence:`가지 둑`,shade:`낙엽 그늘`}),a_=(e,t)=>(t===`d-headwater-edge`?i_:r_)[e],o_=e=>{let t=e.charCodeAt(e.length-1)-44032;return e+(t>=0&&t<=11171&&t%28!=0?`을`:`를`)};function s_(e){return Object.values(e).flatMap(e=>Object.values(e)).flatMap(e=>{if(e.kind!==`structure`)return[];let t=me[e.form];if(e.form===`support`)return[{kind:`circle`,at:e.at,radius:.12}];if(e.form===`rack`||e.form===`fence`)return[{kind:`oriented-box`,at:e.at,rotation:e.rotation,halfLength:t.halfLength,halfWidth:e.form===`fence`?.12:t.halfWidth}];let n=Math.cos(e.rotation),r=Math.sin(e.rotation),i=t.halfLength*.86,a=t.halfWidth*.84;return[-1,1].flatMap(t=>[-1,1].map(o=>{let s=t*i,c=o*a;return{kind:`circle`,at:{x:e.at.x+s*n-c*r,z:e.at.z+s*r+c*n},radius:.09}}))})}function c_(e){let t=document.querySelector(e);if(!t)throw Error(e+` 화면 요소를 준비하지 못했습니다.`);return t}var l_=c_(`#app`);l_.innerHTML=`<main id="game-shell" data-mode="walk">(  <canvas id="world" tabindex="0" aria-label="산촌의 첫 물길 3D 화면"></canvas>(  <section id="place-card" aria-live="polite">(    <span id="place-code">A</span>(    <div><strong id="place-name">산촌 집·작은 정원</strong><p id="place-cue">붉은 집 지붕이 돌아갈 자리를 알려 줍니다.</p></div>(  </section>(  <aside id="desktop-help" aria-label="컴퓨터 조작">(    <span><kbd>WASD</kbd> 걷기</span><span>↔ 끌어보기</span><span><kbd>Space</kbd> 살펴보기·만들기</span><span><kbd>N</kbd> 관계 수첩</span>(  </aside>(  <section id="touch-controls" aria-label="터치 조작">(    <div id="move-pad" role="group" aria-label="이동 패드">(      <span class="move-ring" aria-hidden="true"></span>(      <span id="move-knob" aria-hidden="true">●</span>(    </div>(    <p id="look-hint" aria-hidden="true"><span>↔</span> 화면을 끌어 둘러보기</p>(  </section>(  <button id="edit-entry-button" type="button" hidden>🌱 정원 가꾸기</button>(  <button id="water-fill-button" type="button" hidden>💧 물 뜨기</button>(  <button id="waterway-clue-button" type="button" hidden>🍃 물길 살펴보기</button>(  <section id="edit-hud" aria-label="정원을 가꾸는 자리" hidden>(    <p id="edit-status" aria-live="polite">아래에서 해 보고 싶은 것을 골라 주세요.</p>(    <nav id="edit-layer-tabs" aria-label="흙자리에서 할 일">(      <button id="care-layer-button" type="button" data-edit-layer="care" aria-pressed="true">🌱 가꾸기</button>(      <button id="build-layer-button" type="button" data-edit-layer="build" aria-pressed="false">🛠 만들기</button>(    </nav>(    <nav id="edit-dock" aria-label="정원 가꾸기"></nav>(  </section>(  <button id="notebook-button" type="button" aria-controls="notebook-panel" aria-expanded="false" hidden>📖 관계 수첩</button>(  <p id="notebook-toast" role="status" aria-live="polite" hidden></p>(  <section id="notebook-panel" role="dialog" aria-modal="true" aria-labelledby="notebook-title" hidden>(    <div class="notebook-sheet">(      <header class="notebook-header"><div><span>ANIMAL ADVENTURE</span><h2 id="notebook-title">관계 수첩</h2></div><button id="notebook-close" type="button" aria-label="수첩 덮기">×</button></header>(      <p class="notebook-intro">이곳에서 직접 본 연결만 그려집니다. 마음 가는 질문을 따라가거나 정원으로 돌아가도 괜찮아요.</p>(      <div id="notebook-entries" class="notebook-entries"></div>(    </div>(  </section>(  <section id="start-screen">(    <div class="start-panel">(      <p class="eyebrow">ANIMAL ADVENTURE</p>(      <h1>산촌의 첫 물길</h1>(      <p>정원을 가꾸거나, 물길에서 떠온 잎을 따라가 볼까요?</p>(      <div class="start-actions">(        <button id="start-button" type="button">걸어 보기</button>(        <button id="new-game-button" type="button" hidden>새로 걷기</button>(      </div>(      <small id="start-note">목표도 시간 제한도 없습니다.</small>(    </div>(  </section>(  <section id="orientation-gate" role="status" aria-live="polite" hidden>(    <div class="orientation-card">(      <span class="rotate-mark" aria-hidden="true">↻</span>(      <strong id="orientation-title">가로 화면으로 돌려 주세요</strong>(      <small>지금 모습은 그대로 기다립니다.</small>(    </div>(  </section>(  <section id="error-panel" hidden>(    <h1>3D 화면을 열 수 없습니다</h1>(    <p>최신 브라우저에서 다시 열어 주세요.</p>(  </section>(</main>`.split(`(`).join(``);var u_=c_(`#game-shell`),d_=c_(`#world`),f_=c_(`#start-screen`),p_=c_(`#start-button`),m_=c_(`#new-game-button`),h_=c_(`#start-note`),g_=c_(`#place-code`),__=c_(`#place-name`),v_=c_(`#place-cue`),y_=c_(`#orientation-gate`),b_=c_(`#orientation-title`),x_=c_(`#move-pad`),S_=c_(`#move-knob`),C_=c_(`#edit-entry-button`),w_=c_(`#water-fill-button`),T_=c_(`#waterway-clue-button`),E_=c_(`#edit-hud`),D_=c_(`#edit-status`),O_=c_(`#edit-layer-tabs`),k_=c_(`#care-layer-button`),A_=c_(`#build-layer-button`),j_=c_(`#edit-dock`),M_=c_(`#notebook-button`),N_=c_(`#notebook-toast`),P_=c_(`#notebook-panel`),F_=c_(`#notebook-close`),I_=c_(`#notebook-entries`),L_=c_(`#error-panel`);try{ne(),Er();let e=new Mr,n=new si(window.localStorage),r=n.load(),i=r.status===`loaded`?r.save:void 0,a=new $g(i?{playerAt:i.player.at,playerHeading:i.player.heading,cameraYaw:i.camera.yaw,cameraDistance:i.camera.distance,elapsed:i.elapsed}:void 0),o=new qg(i?.edits,i?.plantGrowth,i?.elapsed??0),s=o.snapshot(),c=i?.upstream??Nn(s.editState,i?.elapsed??0),l=new t_(s.editState,s.environment,s.plantGrowth,s.ecologyRevision),u=new Cr(i?.notebook),d=l.snapshot(),p=new Og(d_,d.smallResidents,d.toad);p.syncEdits(s.editState.current),p.syncPlantGrowth(s.plantGrowth,i?.elapsed??0),p.syncSurfaceMoisture(s.surfaceMoisture,s.wetDrainageEntryIds),p.syncUpstreamWaterway(c,i?.elapsed??0),a.setMovementObstacles(s_(s.editState.current));let m=window.matchMedia(`(pointer: coarse)`),h,g=!1,v=document.hidden,y=!1,b=0,x,S,C=0,w,T,E=`care`,D,O=`root`,k,A,j,ee=0,M,N=!1,te=i?JSON.stringify(i):``,re=performance.now(),ie=``,ae=()=>o.snapshot().activeZoneId!==void 0,oe=()=>{let e=l.editGuard(),t=o.snapshot().editState,n=(e.occupiedEntryIds??[]).flatMap(e=>{for(let n of Object.values(t.current)){let t=n[e];if(t)return[{at:t.at,radius:.48}]}return[]});return{...e,protectedGroundPoints:[...n,{at:a.snapshot().playerAt,radius:.36}]}},se=e=>{let t=a.snapshot(),n=o.snapshot(),r=l.advance({deltaSeconds:e,editState:n.editState,environment:n.environment,plantGrowth:n.plantGrowth,ecologyRevision:n.ecologyRevision,playerAt:t.playerAt,...n.activeZoneId?{activeEditZoneId:n.activeZoneId}:{},started:t.started,blocked:t.blocked});p.syncEcology(r.snapshot.smallResidents,r.snapshot.toad,r.toadCues);let i=u.capture({elapsed:t.elapsed,playerAt:t.playerAt,started:t.started,blocked:t.blocked,smallResidents:r.snapshot.smallResidents,smallEvents:r.smallEvents,toad:r.snapshot.toad,toadCues:r.toadCues});return i.added.length>0&&Ce(i.added),r},ce=()=>{x=void 0,S_.style.transform=`translate(0px, 0px)`,e.setTouchMovement({forward:0,right:0})},le=()=>{let e=a.persistentState();return{schemaVersion:6,mapId:Rr,elapsed:e.elapsed,player:{at:e.playerAt,heading:e.playerHeading},camera:{yaw:e.cameraYaw,distance:e.cameraDistance},edits:o.persistentState(),notebook:u.snapshot(),plantGrowth:o.persistentPlantGrowthState(),upstream:c}},ue=()=>{if(!a.snapshot().started||n.writeLocked)return;let e=le(),t=JSON.stringify(e);if(t===te)return;let r=n.write(e);document.documentElement.dataset.saveWrite=r.status,r.status===`saved`&&(te=t)},de=()=>{let t=g||v||y;a.setBlocked(t),o.setBlocked(t),t&&(e.reset(),ce(),S=void 0)},fe=()=>{let e=u_.getBoundingClientRect(),t=g;g=!jr(e.width,e.height),!t&&g&&ue(),y_.hidden=!g,b_.textContent=m.matches?`기기를 가로로 돌려 주세요`:`창을 가로로 넓혀 주세요`,u_.dataset.viewport=g?`blocked`:`landscape`,p.resize(e.width,e.height),de()},pe=e=>{e?.id!==h&&(h=e?.id,g_.textContent=e?n_[e.id]:`·`,__.textContent=e?.name??`장소와 장소 사이`,v_.textContent=e?.cue??`물길·빛·바닥과 소리가 다음 자리를 이어 줍니다.`,g_.style.setProperty(`--place-color`,e?`#`+e.color.toString(16).padStart(6,`0`):`#8e9b83`))},me=()=>{let e=o.snapshot();return e.activeZoneId&&M?e.editState.current[e.activeZoneId][M]:void 0},he=e=>{let t={bright:`환한 빛`,dappled:`얼룩빛`,shaded:`그늘`}[e.light],n={open:`열린 틈`,pockets:`작은 틈`,sheltered:`감싸인 틈`}[e.opening];return[t,e.surfaceMoisture===`moist`?`촉촉한 표면`:`마른 표면`,n,{"open-ground":`드러난 흙`,patches:`듬성한 덮임`,linked:`이어진 덮임`,dense:`촘촘한 덮임`}[e.lowCover],{none:`물길 없음`,holding:`물이 머무는 홈`,outflow:`물이 빠지는 길`}[e.drainage]].join(` · `)},ge=e=>[e.shade>=.66?`깊은 그늘`:e.shade>=.43?`얼룩진 그늘`:`열린 숲빛`,e.retention>=.7?`오래 머무는 물`:e.retention>=.48?`잠시 머무는 물`:`빠르게 지나는 물`,e.continuity>=.7?`이어진 흐름`:e.continuity>=.42?`나뉘는 흐름`:`스미는 가장자리`].join(` · `),_e=e=>{let n=o.snapshot(),r=n.activeZoneId;if(!r)return;let i=f.find(({id:e})=>e===r);D_.textContent=e??(i?r===`d-headwater-edge`?i.shortName+` · `+ge(Mn(n.editState)):E===`build`?i.shortName+` · 본래 길과 개울은 두고 땅·물길·구조물을 만듭니다.`:i.shortName+` · `+he(n.environment.zones[t(r)?r:`a-garden`]):``)},P=(e,t,n=!1,r=!1,i=``)=>`<button type="button" data-edit-action="`+e+`" aria-pressed="`+String(n)+`"`+(r?` disabled`:``)+(i?` class="`+i+`"`:``)+`>`+t+`</button>`,ye=e=>(e<=0?`◌`:e<=.5?`◔`:`💧`)+` 물주기`,F=()=>{let e=oe(),n=o.snapshot(e),r=me();if(!n.activeZoneId){E_.hidden=!0;return}let i=n.activeZoneId===`d-headwater-edge`;if(E_.hidden=!1,O_.hidden=i,k_.setAttribute(`aria-pressed`,String(E===`care`)),A_.setAttribute(`aria-pressed`,String(E===`build`)),j_.setAttribute(`aria-label`,i?`발원지 흐름 다듬기`:E===`care`?`정원 가꾸기`:`정원 만들기`),u_.dataset.editLayer=E,document.documentElement.dataset.editLayer=E,N&&r){j_.innerHTML=P(`cancel`,`↩ 그만두기`),_e(r.kind===`structure`?`옮겨 세울 자리를 눌러 주세요.`:r.kind===`drainage-segment`?`물길의 새 중심을 눌러 주세요.`:`옮겨 심을 자리를 눌러 주세요.`);return}if(E===`build`){if(i&&r?.kind===`low-cover`){let t=e.occupiedEntryIds?.includes(r.id)??!1;j_.innerHTML=[P(`cancel`,`↩ 그만두기`),P(`move`,`↔ 옮기기`,!1,t),P(`retrieve`,`🧺 걷어두기`,!1,t,`danger-soft`),P(`undo`,`↶ 되돌리기`,!1,!n.canUndoActiveZone)].join(``),_e(`물이 천천히 스며들 낙엽 덮임을 잡았습니다.`);return}if(r?.kind===`terrain-patch`){j_.innerHTML=[P(`cancel`,`↩ 그만두기`),P(`restore-terrain`,`◌ 원래대로`,!1,!1,`danger-soft`),P(`undo`,`↶ 되돌리기`,!1,!n.canUndoActiveZone)].join(``),_e(r.direction===`raise`?`높인 땅을 잡았습니다.`:`낮춘 땅을 잡았습니다.`);return}if(r?.kind===`structure`||r?.kind===`drainage-segment`){let t=e.occupiedEntryIds?.includes(r.id)??!1;j_.innerHTML=[P(`cancel`,`↩ 그만두기`),P(`move`,`↔ 옮기기`,!1,t),P(`rotate`,`↻ 방향`,!1,t),P(r.kind===`structure`?`retrieve`:`restore-drainage`,r.kind===`structure`?`🧺 걷어두기`:`◌ 메우기`,!1,t,`danger-soft`),P(`undo`,`↶ 되돌리기`,!1,!n.canUndoActiveZone)].join(``),_e(r.kind===`structure`?o_(a_(r.form,n.activeZoneId))+` 잡았습니다.`:i?`물이 지나갈 얕은 홈을 잡았습니다.`:`얕은 물길을 잡았습니다.`);return}if(O===`terrain`){let e=Object.values(n.editState.current[n.activeZoneId]).filter(e=>e.kind===`terrain-patch`);j_.innerHTML=[P(`build-back`,`↩ 만들기`),P(`raise`,i?`⬆ 돌턱`:`⬆ 높이기`,k===`raise`,!1,`terrain-raise`),P(`lower`,i?`⬇ 웅덩이`:`⬇ 낮추기`,k===`lower`,!1,`terrain-lower`),P(`restore-tool`,`◌ 원래대로`,k===`restore`,e.length===0,`danger-soft`),P(`undo`,`↶ 되돌리기`,!1,!n.canUndoActiveZone)].join(``),_e();return}if(O===`structures`){j_.innerHTML=[P(`build-back`,`↩ 만들기`),P(`support`,i?`● 돌무더기`:`│ 지지대`,A===`support`,!1,`build-choice`),P(`rack`,i?`⌗ 가지 시렁`:`⌗ 시렁`,A===`rack`,!1,`build-choice`),P(`fence`,i?`≋ 가지 둑`:`╫ 낮은 울타리`,A===`fence`,!1,`build-choice`),P(`shade`,i?`▰ 낙엽 그늘`:`▰ 그늘막`,A===`shade`,!1,`build-choice`)].join(``),_e(A?o_(a_(A,n.activeZoneId))+(i?` 놓을 자리를 눌러 주세요.`:` 세울 자리를 눌러 주세요.`):i?`흐름에 보탤 돌이나 가지 모양을 골라 주세요.`:`세울 모양을 골라 주세요.`);return}if(i){j_.innerHTML=[P(`walk`,`↩ 걷기로`),P(`low-cover`,`🍂 낙엽 덮기`,D===`low-cover`),P(`terrain-menu`,`↕ 물머리`),P(`drainage`,j?`〰 끝 고르기`:`〰 얕은 홈`,k===`drainage`,!1,`drainage-tool`),P(`structures-menu`,`🪨 돌·가지`),P(`undo`,`↶ 되돌리기`,!1,!n.canUndoActiveZone)].join(``),_e(j?`홈이 끝날 자리를 눌러 주세요.`:k===`drainage`?`물이 지나갈 홈의 시작을 눌러 주세요.`:D===`low-cover`?`물이 머물고 스며들 낙엽 자리를 눌러 주세요.`:void 0);return}j_.innerHTML=[P(`walk`,`↩ 걷기로`),P(`terrain-menu`,`⛰ 땅`),P(`drainage`,j?`〰 끝 고르기`:`〰 물길`,k===`drainage`,n.activeZoneId!==`a-garden`,`drainage-tool`),P(`structures-menu`,`🪵 세우기`),P(`undo`,`↶ 되돌리기`,!1,!n.canUndoActiveZone)].join(``),_e(j?`물길이 끝날 자리를 눌러 주세요.`:k===`drainage`?`물길이 시작할 자리를 눌러 주세요.`:void 0);return}if(r){let i=e.occupiedEntryIds?.includes(r.id)??!1,o=r.kind===`low-flower`?n.plantGrowth.byEntryId[r.id]:void 0,s=o?mn(o,a.snapshot().elapsed).stage:void 0,c=r.kind===`low-flower`&&!r.thinned&&s!==void 0&&s!==`seed`,l=r.kind===`low-flower`?an(n.editState,r.id):void 0,u=t(n.activeZoneId)?n.environment.zones[n.activeZoneId]:void 0,d=l&&u?on(l,u):!1;j_.innerHTML=r.kind===`surface-adjustment`?[P(`cancel`,`↩ 그만두기`),P(`restore`,`◌ 원래 흙으로`,!1,i,`danger-soft`),P(`undo`,`↶ 되돌리기`,!1,!n.canUndoActiveZone)].join(``):[P(`cancel`,`↩ 그만두기`),P(`move`,`↔ 옮겨심기`,!1,i),...c?[P(`thin`,`✂ 솎아 주기`,!1,i)]:[],P(`retrieve`,`🧺 캐서 담기`,!1,i,`danger-soft`),P(`undo`,`↶ 되돌리기`,!1,!n.canUndoActiveZone)].join(``);let f={seed:`아직 흙 속에서 기다리는 씨앗입니다.`,sprout:`작은 싹이 올라왔습니다.`,young:`잎이 무성해지는 어린 식물입니다.`,adult:r.kind===`low-flower`&&r.thinned?`사이가 보이는 꽃 포기입니다.`:`꽃이 핀 포기입니다.`};_e(r.kind===`surface-adjustment`?`이어 붙인 흙입니다. 가장자리에서 다시 넓힐 수 있습니다.`:d?`너무 겹겹이 덮여 축축하고 통풍이 막혔습니다. 옮기거나 솎아 주세요.`:l?.state===`overcrowded`?`여러 포기가 겹쳐 성장이 많이 느립니다. 그대로 두거나 솎을 수 있습니다.`:l?.state===`close`?`가깝게 심겨 서로 영향을 주며 조금 천천히 자랍니다.`:s?f[s]:`심어 둔 것을 잡았습니다.`);return}let s=n.wateringCanLevel<=0;j_.innerHTML=[P(`walk`,`↩ 걷기로`),P(`low-flower`,`🌱 심기`,D===`low-flower`),P(`water`,ye(n.wateringCanLevel),D===`water`,s),P(`low-cover`,`🍂 덮어 주기`,D===`low-cover`),P(`surface-adjustment`,`⌇ 흙 넓히기`,D===`surface-adjustment`),P(`undo`,`↶ 되돌리기`,!1,!n.canUndoActiveZone)].join(``),_e()},be=()=>{let e=c,t=Rn(e),n=a.snapshot().elapsed,r=Pn(e,{editState:o.snapshot().editState,worldElapsed:n});return r===e?{changed:!1,arrived:!1}:(c=r,p.syncUpstreamWaterway(c,n),{changed:!0,arrived:t!==void 0&&Rn(r)===void 0&&r.delivered?.sourceChangedAt===t.sourceChangedAt})},xe=()=>{let e=o.snapshot();p.syncEdits(e.editState.current),p.syncPlantGrowth(e.plantGrowth,a.snapshot().elapsed),p.syncSurfaceMoisture(e.surfaceMoisture,e.wetDrainageEntryIds),p.syncUpstreamWaterway(c,a.snapshot().elapsed),a.setMovementObstacles(s_(e.editState.current)),document.documentElement.dataset.editRevision=String(e.editState.revision),document.documentElement.dataset.editEntries=String(Object.values(e.editState.current).flatMap(e=>Object.keys(e)).length),document.documentElement.dataset.terrainPatches=String(Object.values(e.editState.current).flatMap(e=>Object.values(e)).filter(e=>e.kind===`terrain-patch`).length),document.documentElement.dataset.drainageSegments=String(Object.values(e.editState.current).flatMap(e=>Object.values(e)).filter(e=>e.kind===`drainage-segment`).length),document.documentElement.dataset.structures=String(Object.values(e.editState.current).flatMap(e=>Object.values(e)).filter(e=>e.kind===`structure`).length),document.documentElement.dataset.surfaceMoisture=Object.entries(e.surfaceMoisture).map(([e,t])=>e+`:`+t).join(`,`),document.documentElement.dataset.wetDrainage=e.wetDrainageEntryIds.join(`,`),document.documentElement.dataset.wateringCan=e.wateringCanLevel.toFixed(2),document.documentElement.dataset.plantGrowth=Object.entries(e.plantGrowth.byEntryId).map(([e,t])=>e+`:`+mn(t,a.snapshot().elapsed).stage).join(`,`);let t=Mn(e.editState),n=Ln(c);document.documentElement.dataset.headwaterSourceProfile=[t.shade,t.retention,t.continuity].map(e=>e.toFixed(3)).join(`,`),document.documentElement.dataset.headwaterBProfile=[n.shade,n.retention,n.continuity].map(e=>e.toFixed(3)).join(`,`),document.documentElement.dataset.upstreamDeliveryProgress=Fn(c,a.snapshot().elapsed).toFixed(3),document.documentElement.dataset.upstreamPending=String(Rn(c)!==void 0)},I=e=>{let t=pr[e.id];return[`<article class="notebook-entry">`,`  <div class="notebook-relation">`,`    <span class="notebook-condition">`+t.condition+`</span>`,`    <span class="notebook-arrow" aria-hidden="true">→</span>`,`    <strong>`+t.resident+`</strong>`,`    <span class="notebook-arrow" aria-hidden="true">→</span>`,`    <span class="notebook-behavior">`+t.behavior+`</span>`,`  </div>`,`  <p>`+t.question+`</p>`,`</article>`].join(``)},Se=()=>{let e=u.snapshot().entries;I_.innerHTML=e.length>0?[...e].reverse().map(I).join(``):[`<div class="notebook-empty">`,`  <span aria-hidden="true">〰</span>`,`  <strong>아직 그려진 관계가 없어요.</strong>`,`  <p>낮은 꽃 가까이, 촉촉한 덮임, 물가의 작은 흔적을 살펴보세요.</p>`,`</div>`].join(``)},Ce=e=>{let t=e.at(-1);if(!t)return;let n=pr[t.id];M_.dataset.new=`true`,M_.setAttribute(`aria-label`,`새 관계가 있는 관계 수첩`),N_.textContent=`수첩에 새 관계 · `+n.resident+` — `+n.behavior,N_.hidden=!1,b=performance.now()+4200,Se()},we=()=>{y||ae()||!a.snapshot().started||g||v||(y=!0,P_.hidden=!1,M_.setAttribute(`aria-expanded`,`true`),delete M_.dataset.new,M_.setAttribute(`aria-label`,`관계 수첩`),N_.hidden=!0,b=0,Se(),de(),F_.focus())},L=()=>{y&&(y=!1,P_.hidden=!0,M_.setAttribute(`aria-expanded`,`false`),de(),d_.focus())},Te=()=>{y?L():we()},R=e=>{if(!e||ae()||!a.snapshot().started||a.snapshot().blocked)return;let t=a.snapshot().elapsed,n=[...u.record(e.observationId,t)];e.id===`b-drifting-leaf`&&c.delivered&&u.has(`headwater-source`)&&n.push(...u.record(`headwater-arrival`,t)),n.length>0&&Ce(n);let r=Rn(c);N_.textContent=e.id===`b-drifting-leaf`?r?`지금 물가에는 `+ge(Ln(c))+`이 보입니다. 위쪽에서 달라진 잎은 물길을 따라 오는 중입니다.`:c.delivered?`위쪽에서 보낸 잎이 이곳에 닿았습니다. `+ge(Ln(c))+`이 물빛과 잎의 머무는 모습으로 이어집니다.`:e.result:e.result,N_.hidden=!1,b=performance.now()+6200,document.documentElement.dataset.lastWaterwayClue=e.id,Se(),ue(),d_.focus()},z=e=>e===`outside-edit-zone`?`관리된 흙이나 그 가장자리와 이어지는 곳을 눌러 주세요.`:e===`overlap`?`중심이 완전히 포개지지 않게 손가락 하나만 옆으로 눌러 주세요.`:e===`nothing-to-undo`?`되돌릴 것이 없습니다.`:e===`occupied`?`지금 누군가 쓰는 자리는 그대로 둡니다.`:e===`plant-too-young`?`싹이 올라온 뒤 사이를 벌려 주세요.`:e===`already-thinned`?`이미 사이가 보입니다.`:e===`protected-ground`?`길과 개울 가까이는 원래 모습으로 둡니다.`:e===`terrain-patch-limit`?`이 흙자리는 충분히 다듬었습니다.`:e===`drainage-zone-only`?`작은 물길은 정원 흙에서 낼 수 있습니다.`:e===`drainage-length`?`조금 더 가깝거나 먼 끝 자리를 골라 주세요.`:e===`drainage-limit`?`이 정원에는 물길을 충분히 냈습니다.`:e===`structure-limit`?`이 흙자리에는 구조물을 충분히 세웠습니다.`:e===`ground-too-steep`?`다리가 모두 닿도록 조금 더 고른 자리를 골라 주세요.`:`지금은 그 자리를 바꾸지 않습니다.`,Ee=(e,t)=>{e.changed&&(be(),xe(),se(0),ue()),F(),_e(e.changed?t:z(e.rejection))},Oe=e=>{let t=o.snapshot().activeZoneId===`d-headwater-edge`;E=t?`build`:e,D=void 0,O=`root`,k=void 0,A=void 0,j=void 0,M=void 0,N=!1,p.setDrainageStart(void 0),p.setBuildMode(t||e===`build`),F()},ke=t=>{if(g||v||!a.snapshot().started)return;e.reset(),ce(),o.enter(t.id);let n=t.id===`d-headwater-edge`;E_.setAttribute(`aria-label`,n?`발원지 흐름을 다듬는 자리`:`정원을 가꾸는 자리`),E=n?`build`:`care`,D=void 0,O=`root`,k=void 0,A=void 0,j=void 0,M=void 0,N=!1,u_.dataset.mode=`edit`,p.setEditZone(t.id),p.setBuildMode(n),p.setDrainageStart(void 0),document.documentElement.dataset.editZone=t.id,F()},Ae=()=>{o.exit(),D=void 0,O=`root`,k=void 0,A=void 0,j=void 0,M=void 0,N=!1,E_.hidden=!0,O_.hidden=!1,u_.dataset.mode=`walk`,p.setEditZone(void 0),p.setBuildMode(!1),p.setDrainageStart(void 0),delete u_.dataset.editLayer,delete document.documentElement.dataset.editZone,delete document.documentElement.dataset.editLayer,d_.focus()},je=()=>{if(ae()){if(N){N=!1,F();return}if(M){M=void 0,F();return}if(j){j=void 0,p.setDrainageStart(void 0),F();return}if(E===`build`&&(O!==`root`||k||A)){O=`root`,k=void 0,A=void 0,F();return}Ae()}},Me=()=>{let e=o.snapshot().activeZoneId;if(!e)return;let t=o.apply({type:`undo`,zoneId:e},oe());t.changed&&M&&!me()&&(M=void 0,N=!1),Ee(t,`방금 한 것을 되돌렸습니다.`)},Ne=(e,t)=>{let n=o.snapshot().activeZoneId;if(!n||g||v)return;if(N&&M){let r=p.pickGround(e,t);if(!r){_e(`관리된 흙 안쪽을 골라 주세요.`);return}let i=o.apply({type:`move`,zoneId:n,id:M,to:r},oe());i.changed&&(N=!1);let a=me();Ee(i,a?.kind===`structure`?n===`d-headwater-edge`?`새 자리에 놓았습니다.`:`새 자리에 세웠습니다.`:a?.kind===`drainage-segment`?`물길을 새 자리로 옮겼습니다.`:`새 자리로 옮겼습니다.`);return}if(E===`build`){let r=o.snapshot(),i=p.pickEditEntry(e,t),a=i?r.editState.current[n][i]:void 0;if(a?.kind===`terrain-patch`){k===`restore`?(M=void 0,Ee(o.apply({type:`restore-terrain`,zoneId:n,id:a.id},oe()),`이 자리의 원래 높이로 돌아왔습니다.`)):(M=a.id,F());return}if(a?.kind===`structure`||a?.kind===`drainage-segment`||n===`d-headwater-edge`&&a?.kind===`low-cover`){M=a.id,j=void 0,p.setDrainageStart(void 0),F();return}let s=p.pickGround(e,t);if(!s){_e(`관리된 흙 안쪽을 눌러 주세요.`);return}if(n===`d-headwater-edge`&&D===`low-cover`){Ee(o.apply({type:`place`,zoneId:n,kind:`low-cover`,at:s,rotation:ee},oe()),`낙엽을 덮어 물이 머물고 스미는 자리를 만들었습니다.`);return}if(O===`structures`){if(!A){_e(`세울 모양을 먼저 골라 주세요.`);return}let e=o.apply({type:`place-structure`,zoneId:n,form:A,at:s,rotation:ee},oe());e.changed&&(M=e.entryId),Ee(e,o_(a_(A,n))+(n===`d-headwater-edge`?` 놓았습니다.`:` 세웠습니다.`));return}if(k===`drainage`){if(!j){j=s,p.setDrainageStart(s),F();return}let e=o.apply({type:`place-drainage`,zoneId:n,from:j,to:s},oe());e.changed&&(j=void 0,p.setDrainageStart(void 0),M=e.entryId),Ee(e,n===`d-headwater-edge`?`물이 지나갈 얕은 홈을 이었습니다.`:`얕은 물길을 냈습니다. 물을 주면 흐르는 자리가 보입니다.`);return}if(O===`terrain`){if(!k){_e(`높이기나 낮추기를 먼저 골라 주세요.`);return}if(k===`restore`){let e=De(r.editState.current,n,s);if(!e){_e(`높이거나 낮춘 자리를 눌러 주세요.`);return}Ee(o.apply({type:`restore-terrain`,zoneId:n,id:e.id},oe()),`이 자리의 원래 높이로 돌아왔습니다.`);return}Ee(o.apply({type:`shape-ground`,zoneId:n,direction:k,at:s,rotation:0},oe()),k===`raise`?n===`d-headwater-edge`?`낮은 돌턱처럼 땅을 완만하게 높였습니다.`:`땅을 완만하게 높였습니다.`:n===`d-headwater-edge`?`물이 잠시 머물 웅덩이를 완만하게 낮췄습니다.`:`땅을 완만하게 낮췄습니다.`);return}_e(`땅, 물길, 세우기 가운데 하나를 골라 주세요.`);return}let r=p.pickEditEntry(e,t);if(r&&!D){M=r,F();return}let i=p.pickGround(e,t);if(!i){_e(`관리된 흙 안쪽을 눌러 주세요.`);return}if(!D){_e(`아래에서 해 보고 싶은 것을 골라 주세요.`);return}if(D===`water`){let e=o.water(i),t;e.changed?(xe(),t=`물을 주었습니다. 볕에 그대로 두면 곧 마릅니다.`):e.rejection===`empty-can`&&(t=`물뿌리개가 비었습니다. 우물이나 개울에서 다시 떠 오세요.`),F(),t&&_e(t);return}let a=Math.atan2(i.z-1.7,i.x+8.1),s=D===`surface-adjustment`?o.apply({type:`adjust-ground`,zoneId:n,at:i,rotation:a},oe()):o.apply({type:`place`,zoneId:n,kind:D,at:i,rotation:a},oe());Ee(s,D===`low-flower`?`씨앗을 심었습니다. 촉촉한 흙에서 천천히 자랍니다.`:D===`low-cover`?`풀잎으로 덮어 주었습니다.`:`흙을 이어 넓혔습니다. 물도 조금 더 오래 머금습니다.`)},Pe=e=>{let t=o.snapshot().activeZoneId;if(!t)return;if(e===`walk`){Ae();return}if(e===`cancel`){je();return}if(e===`undo`){Me();return}if(e===`terrain-menu`){O=`terrain`,k=void 0,D=void 0,A=void 0,j=void 0,p.setDrainageStart(void 0),F();return}if(e===`structures-menu`){O=`structures`,k=void 0,D=void 0,A=void 0,j=void 0,p.setDrainageStart(void 0),F();return}if(e===`build-back`){O=`root`,k=void 0,D=void 0,A=void 0,j=void 0,p.setDrainageStart(void 0),F();return}if(e===`drainage`){O=`root`,k=k===`drainage`?void 0:`drainage`,D=void 0,A=void 0,j=void 0,M=void 0,N=!1,p.setDrainageStart(void 0),F();return}if(e===`support`||e===`rack`||e===`fence`||e===`shade`){A=A===e?void 0:e,k=void 0,D=void 0,M=void 0,N=!1,F();return}if(e===`raise`||e===`lower`||e===`restore-tool`){let n=e===`restore-tool`?`restore`:e;k=k===n?void 0:n,D=void 0,A=void 0,j=void 0,p.setDrainageStart(void 0),M=void 0,N=!1,F(),k&&_e(k===`raise`?t===`d-headwater-edge`?`물살을 나눌 낮은 돌턱 자리를 눌러 주세요.`:`완만하게 높일 자리를 눌러 주세요.`:k===`lower`?t===`d-headwater-edge`?`물이 잠시 머물 웅덩이 자리를 눌러 주세요.`:`완만하게 낮출 자리를 눌러 주세요.`:`원래 높이로 돌릴 자리를 눌러 주세요.`);return}if(e===`low-flower`||e===`low-cover`||e===`surface-adjustment`||e===`water`){D=D===e?void 0:e,E===`build`&&(O=`root`,k=void 0,A=void 0,j=void 0,p.setDrainageStart(void 0)),M=void 0,N=!1,F(),D&&_e({"low-flower":`심을 자리를 눌러 주세요.`,"low-cover":`덮어 줄 자리를 눌러 주세요.`,"surface-adjustment":`기존 흙 가장자리와 이어 붙일 곳을 눌러 주세요.`,water:`물을 줄 흙을 눌러 주세요.`}[D]);return}let n=me();if(n){if(e===`move`&&n.kind!==`surface-adjustment`&&n.kind!==`terrain-patch`){N=!0,F();return}if(e===`thin`&&n.kind===`low-flower`){Ee(o.apply({type:`thin`,zoneId:t,id:n.id},oe()),`사이를 벌려 주었습니다.`);return}if(e===`retrieve`){M=void 0,Ee(o.apply({type:`retrieve`,zoneId:t,id:n.id},oe()),n.kind===`structure`?t===`d-headwater-edge`?`놓아 둔 돌이나 가지를 걷었습니다.`:`구조물을 걷어 두었습니다.`:t===`d-headwater-edge`?`덮어 둔 낙엽을 걷었습니다.`:`캐서 바구니에 담았습니다.`);return}if(e===`rotate`&&(n.kind===`structure`||n.kind===`drainage-segment`)){let e=n.rotation+Math.PI/4,r=o.apply({type:`rotate`,zoneId:t,id:n.id,rotation:e},oe());r.changed&&(ee=e),Ee(r,`방향을 돌렸습니다.`);return}if(e===`restore-drainage`&&n.kind===`drainage-segment`){M=void 0,Ee(o.apply({type:`restore-drainage`,zoneId:t,id:n.id},oe()),t===`d-headwater-edge`?`얕은 홈을 메워 원래 흐름으로 돌렸습니다.`:`얕은 물길을 메웠습니다.`);return}if(e===`restore`){M=void 0,Ee(o.apply({type:`restore-ground`,zoneId:t,id:n.id},oe()),`원래 흙으로 돌아왔습니다.`);return}e===`restore-terrain`&&n.kind===`terrain-patch`&&(M=void 0,Ee(o.apply({type:`restore-terrain`,zoneId:t,id:n.id},oe()),`이 자리의 원래 높이로 돌아왔습니다.`))}},Fe=(e,t)=>{document.documentElement.dataset.playerAt=e.playerAt.x.toFixed(3)+`,`+e.playerAt.z.toFixed(3),document.documentElement.dataset.worldElapsed=e.elapsed.toFixed(3),document.documentElement.dataset.viewportBlocked=String(e.blocked),document.documentElement.dataset.cameraYaw=e.cameraYaw.toFixed(4),document.documentElement.dataset.cameraDistance=e.cameraDistance.toFixed(3),document.documentElement.dataset.saveLoaded=String(r.status===`loaded`),document.documentElement.dataset.saveLoadStatus=r.status,document.documentElement.dataset.mode=ae()?`edit`:`walk`,document.documentElement.dataset.butterflyPhase=t.smallResidents.butterfly.phase,document.documentElement.dataset.butterflyTarget=t.smallResidents.butterfly.target?.kind??`none`,document.documentElement.dataset.snailPhase=t.smallResidents.snail.phase,document.documentElement.dataset.snailTarget=t.smallResidents.snail.target?.kind??`none`,document.documentElement.dataset.toadPhase=t.toad.phase,document.documentElement.dataset.toadRoute=t.toad.activeRoute?.kind??`none`,document.documentElement.dataset.toadVisits=String(t.toad.visitCount),document.documentElement.dataset.residentEventId=String(t.lastEventId),document.documentElement.dataset.occupiedEditEntries=l.occupiedEditEntryIds().join(`,`),document.documentElement.dataset.notebookEntries=String(u.snapshot().entries.length),document.documentElement.dataset.notebookOpen=String(y);let n=Mn(o.snapshot().editState),i=Ln(c);document.documentElement.dataset.headwaterSourceProfile=[n.shade,n.retention,n.continuity].map(e=>e.toFixed(3)).join(`,`),document.documentElement.dataset.headwaterBProfile=[i.shade,i.retention,i.continuity].map(e=>e.toFixed(3)).join(`,`),document.documentElement.dataset.upstreamDeliveryProgress=Fn(c,e.elapsed).toFixed(3),document.documentElement.dataset.upstreamPending=String(Rn(c)!==void 0)},Ie=()=>{if(r.status===`loaded`){p_.textContent=`이어 걷기`,m_.hidden=!1,h_.textContent=r.recovered?`앞서 안전하게 저장된 모습으로 돌아왔습니다.`:`지난번 걷던 모습이 이 기기에 남아 있습니다.`;return}if(r.status===`unsupported-future`){p_.textContent=`저장 없이 걸어 보기`,m_.textContent=`저장 지우고 새로 걷기`,m_.hidden=!1,h_.textContent=`더 새 버전의 저장은 건드리지 않고 그대로 둡니다.`;return}if(r.status===`storage-error`){h_.textContent=`이 브라우저에서는 이번 걷기를 저장하지 못할 수 있습니다.`;return}p_.textContent=`걸어 보기`,m_.hidden=!0,h_.textContent=`어느 쪽을 먼저 해도 괜찮아요.`},Le=()=>{a.start(),f_.classList.add(`is-gone`),d_.focus(),ue()},Re=()=>{try{for(let e of Object.values(zr))window.localStorage.removeItem(e)}catch{}n=new si(window.localStorage),r={status:`none`,writeLocked:!1},te=``,a.reset(),o.reset();let e=o.snapshot();c=Nn(e.editState,0),l.reset(e.editState,e.environment,e.plantGrowth,e.ecologyRevision),u.reset();let t=l.snapshot();p.resetEcology(t.smallResidents,t.toad),p.syncUpstreamWaterway(c,0),ie=``,delete M_.dataset.new,M_.setAttribute(`aria-label`,`관계 수첩`),N_.hidden=!0,b=0,delete document.documentElement.dataset.lastWaterwayClue,Se(),Ae(),de(),xe(),Ie()};Ie(),new ResizeObserver(fe).observe(u_),m.addEventListener(`change`,fe),fe(),p_.addEventListener(`click`,Le),m_.addEventListener(`click`,()=>{Re(),Le()}),C_.addEventListener(`click`,()=>{w&&ke(w)}),O_.addEventListener(`click`,e=>{let t=e.target.closest(`button[data-edit-layer]`)?.dataset.editLayer;(t===`care`||t===`build`)&&Oe(t)}),w_.addEventListener(`click`,()=>{let e=_(a.snapshot().playerAt);e&&o.fill(e.id)}),T_.addEventListener(`click`,()=>R(T)),M_.addEventListener(`click`,we),F_.addEventListener(`click`,L),j_.addEventListener(`click`,e=>{let t=e.target.closest(`button[data-edit-action]`);t&&!t.disabled&&Pe(t.dataset.editAction??``)}),window.addEventListener(`keydown`,t=>{e.keyDown(t.key,performance.now())&&t.preventDefault()}),window.addEventListener(`keyup`,t=>e.keyUp(t.key)),window.addEventListener(`blur`,()=>e.reset()),document.addEventListener(`visibilitychange`,()=>{document.hidden&&ue(),v=document.hidden,de()}),window.addEventListener(`pagehide`,ue),d_.addEventListener(`pointerdown`,e=>{ae()||g||S!==void 0||(S=e.pointerId,C=e.clientX,d_.setPointerCapture(e.pointerId),d_.focus())}),d_.addEventListener(`pointermove`,t=>{t.pointerId===S&&(e.addLookDelta(t.clientX-C),C=t.clientX)});let ze=e=>{e.pointerId===S&&(d_.hasPointerCapture(e.pointerId)&&d_.releasePointerCapture(e.pointerId),S=void 0)};d_.addEventListener(`pointerup`,ze),d_.addEventListener(`pointercancel`,ze),d_.addEventListener(`click`,e=>{ae()&&Ne(e.clientX,e.clientY)}),d_.addEventListener(`wheel`,t=>{t.preventDefault(),ae()||e.addZoomDelta(t.deltaY)},{passive:!1}),d_.addEventListener(`contextmenu`,e=>e.preventDefault());let Be=t=>{let n=x_.getBoundingClientRect(),r=n.width*.31,i=Ar(t.clientX-(n.left+n.width/2),t.clientY-(n.top+n.height/2),r);e.setTouchMovement(i),S_.style.transform=`translate(`+String(i.right*r)+`px, `+String(-i.forward*r)+`px)`};x_.addEventListener(`pointerdown`,e=>{ae()||g||x!==void 0||(e.preventDefault(),x=e.pointerId,x_.setPointerCapture(e.pointerId),Be(e))}),x_.addEventListener(`pointermove`,e=>{e.pointerId===x&&(e.preventDefault(),Be(e))});let Ve=e=>{e.pointerId===x&&(x_.hasPointerCapture(e.pointerId)&&x_.releasePointerCapture(e.pointerId),ce())};x_.addEventListener(`pointerup`,Ve),x_.addEventListener(`pointercancel`,Ve);let He={moveForward:0,moveRight:0,lookDeltaX:0,zoomDelta:0,actions:[]},Ue=performance.now(),We=t=>{let n=Math.min((t-Ue)/1e3,.05);Ue=t;let r=e.consumeFrame(t);for(let e of r.actions)e===`interact`&&!ae()&&(T&&!u.has(T.observationId)?R(T):w?ke(w):R(T)),e===`cancel`&&(y?L():je()),e===`notebook`&&Te(),e===`undo`&&ae()&&Me();a.advance(n,ae()?He:r);let i=a.snapshot();be().changed&&ue(),i.started&&o.advanceMoisture(n)&&(xe(),ae()&&F());let s=o.advancePlantGrowth(n,i.elapsed,i.started&&!i.blocked);if(s.changed){let e=o.snapshot();p.syncPlantGrowth(e.plantGrowth,i.elapsed),document.documentElement.dataset.plantGrowth=Object.entries(e.plantGrowth.byEntryId).map(([e,t])=>e+`:`+mn(t,i.elapsed).stage).join(`,`)}s.stageChanged&&ae()&&F();let d=se(n),f=l.occupiedEditEntryIds().join(`,`);f!==ie&&(ie=f,ae()&&F()),pe(i.place),w=ae()?void 0:ve(o.snapshot().editState,i.playerAt,1.8),C_.hidden=!i.started||i.blocked||!w||ae(),w&&(C_.textContent=w.id===`d-headwater-edge`?`🍂 발원지 흐름 다듬기`:`🌿 `+w.shortName+` 가꾸기·만들기`);let m=ae()?void 0:_(i.playerAt),h=o.snapshot().wateringCanLevel>=1;w_.hidden=!i.started||i.blocked||!m||h||ae(),m&&(w_.textContent=`💧 `+m.shortName+`에서 물 뜨기`),T=ae()?void 0:Tr(i.playerAt),T_.hidden=!i.started||i.blocked||!T||ae(),T?(T_.textContent=T.id===`b-drifting-leaf`&&Rn(c)?`🍃 물가 변화 살펴보기`:T.id===`b-drifting-leaf`&&c.delivered?`🍃 달라진 잎 살펴보기`:u.has(T.observationId)?T.revisitingAction:T.action,document.documentElement.dataset.nearbyWaterwayClue=T.id):delete document.documentElement.dataset.nearbyWaterwayClue,M_.hidden=!i.started||g||v||ae(),!N_.hidden&&t>=b&&(N_.hidden=!0),Fe(i,d.snapshot),p.render(i,n),i.started&&t-re>=5e3&&(re=t,ue()),requestAnimationFrame(We)};requestAnimationFrame(We)}catch(e){f_.hidden=!0,y_.hidden=!0,L_.hidden=!1,console.error(e)}
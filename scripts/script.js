!function(global){"use strict";var requestInterval,cancelInterval,raf,caf;raf=global.requestAnimationFrame||global.webkitRequestAnimationFrame||global.mozRequestAnimationFrame||global.oRequestAnimationFrame||global.msRequestAnimationFrame,caf=global.cancelAnimationFrame||global.webkitCancelAnimationFrame||global.mozCancelAnimationFrame||global.oCancelAnimationFrame||global.msCancelAnimationFrame,raf&&caf?(requestInterval=function(fn,delay){var handle={value:null};return function loop(){handle.value=raf(loop),fn()}(),handle},cancelInterval=function(handle){caf(handle.value)}):(requestInterval=setInterval,cancelInterval=clearInterval);var TAU=2*Math.PI,TWO_OVER_SQRT_2=2/Math.sqrt(2);function line(ctx,ax,ay,bx,by){ctx.beginPath(),ctx.moveTo(ax,ay),ctx.lineTo(bx,by),ctx.stroke()}function puff(ctx,t,cx,cy,rx,ry,rmin,rmax){var c=Math.cos(t*TAU);!function(ctx,x,y,r){ctx.beginPath(),ctx.arc(x,y,r,0,TAU,!1),ctx.fill()}(ctx,cx-Math.sin(t*TAU)*rx,cy+c*ry+.5*(rmax-=rmin),rmin+(1-.5*c)*rmax)}function puffs(ctx,t,cx,cy,rx,ry,rmin,rmax){var i;for(i=5;i--;)puff(ctx,t+i/5,cx,cy,rx,ry,rmin,rmax)}function cloud(ctx,t,cx,cy,cw,s,color){t/=1e4;var a=.21*cw,b=.12*cw,c=.24*cw,d=.28*cw;ctx.fillStyle=color.cloud||color,puffs(ctx,t,cx,cy,a,b,c,d),ctx.globalCompositeOperation="destination-out",puffs(ctx,t,cx,cy,a,b,c-s,d-s),ctx.globalCompositeOperation="source-over"}function sun(ctx,t,cx,cy,cw,s,color){t/=15e3;var i,p,cos,sin,a=.25*cw-.5*s,b=.32*cw+.5*s,c=.5*cw-.5*s;for(ctx.strokeStyle=color.sun||color,ctx.lineWidth=s,ctx.lineCap="round",ctx.lineJoin="round",ctx.beginPath(),ctx.arc(cx,cy,a,0,TAU,!1),ctx.stroke(),i=8;i--;)p=(t+i/8)*TAU,line(ctx,cx+(cos=Math.cos(p))*b,cy+(sin=Math.sin(p))*b,cx+cos*c,cy+sin*c)}function moon(ctx,t,cx,cy,cw,s,color){t/=15e3;var a=.29*cw-.5*s,b=.05*cw,c=Math.cos(t*TAU),p=c*TAU/-16;ctx.strokeStyle=color.moon||color,ctx.lineWidth=s,ctx.lineCap="round",ctx.lineJoin="round",cx+=c*b,ctx.beginPath(),ctx.arc(cx,cy,a,p+TAU/8,p+7*TAU/8,!1),ctx.arc(cx+Math.cos(p)*a*TWO_OVER_SQRT_2,cy+Math.sin(p)*a*TWO_OVER_SQRT_2,a,p+5*TAU/8,p+3*TAU/8,!0),ctx.closePath(),ctx.stroke()}var WIND_PATHS=[[-.75,-.18,-.7219,-.1527,-.6971,-.1225,-.6739,-.091,-.6516,-.0588,-.6298,-.0262,-.6083,.0065,-.5868,.0396,-.5643,.0731,-.5372,.1041,-.5033,.1259,-.4662,.1406,-.4275,.1493,-.3881,.153,-.3487,.1526,-.3095,.1488,-.2708,.1421,-.2319,.1342,-.1943,.1217,-.16,.1025,-.129,.0785,-.1012,.0509,-.0764,.0206,-.0547,-.012,-.0378,-.0472,-.0324,-.0857,-.0389,-.1241,-.0546,-.1599,-.0814,-.1876,-.1193,-.1964,-.1582,-.1935,-.1931,-.1769,-.2157,-.1453,-.229,-.1085,-.2327,-.0697,-.224,-.0317,-.2064,.0033,-.1853,.0362,-.1613,.0672,-.135,.0961,-.1051,.1213,-.0706,.1397,-.0332,.1512,.0053,.158,.0442,.1624,.0833,.1636,.1224,.1615,.1613,.1565,.1999,.15,.2378,.1402,.2749,.1279,.3118,.1147,.3487,.1015,.3858,.0892,.4236,.0787,.4621,.0715,.5012,.0702,.5398,.0766,.5768,.089,.6123,.1055,.6466,.1244,.6805,.144,.7147,.163,.75,.18],[-.75,0,-.7033,.0195,-.6569,.0399,-.6104,.06,-.5634,.0789,-.5155,.0954,-.4667,.1089,-.4174,.1206,-.3676,.1299,-.3174,.1365,-.2669,.1398,-.2162,.1391,-.1658,.1347,-.1157,.1271,-.0661,.1169,-.017,.1046,.0316,.0903,.0791,.0728,.1259,.0534,.1723,.0331,.2188,.0129,.2656,-.0064,.3122,-.0263,.3586,-.0466,.4052,-.0665,.4525,-.0847,.5007,-.1002,.5497,-.113,.5991,-.124,.6491,-.1325,.6994,-.138,.75,-.14]],WIND_OFFSETS=[{start:.36,end:.11},{start:.56,end:.16}];function swoosh(ctx,t,cx,cy,cw,s,index,total,color){t/=2500;var b,d,f,i,path=WIND_PATHS[index],a=(t+index-WIND_OFFSETS[index].start)%total,c=(t+index-WIND_OFFSETS[index].end)%total,e=(t+index)%total;if(ctx.strokeStyle=color.cloud||color,ctx.lineWidth=s,ctx.lineCap="round",ctx.lineJoin="round",a<1){if(ctx.beginPath(),a*=path.length/2-1,a-=b=Math.floor(a),b*=2,b+=2,ctx.moveTo(cx+(path[b-2]*(1-a)+path[b]*a)*cw,cy+(path[b-1]*(1-a)+path[b+1]*a)*cw),c<1){for(c*=path.length/2-1,c-=d=Math.floor(c),d*=2,d+=2,i=b;i!==d;i+=2)ctx.lineTo(cx+path[i]*cw,cy+path[i+1]*cw);ctx.lineTo(cx+(path[d-2]*(1-c)+path[d]*c)*cw,cy+(path[d-1]*(1-c)+path[d+1]*c)*cw)}else for(i=b;i!==path.length;i+=2)ctx.lineTo(cx+path[i]*cw,cy+path[i+1]*cw);ctx.stroke()}else if(c<1){for(ctx.beginPath(),c*=path.length/2-1,c-=d=Math.floor(c),d*=2,d+=2,ctx.moveTo(cx+path[0]*cw,cy+path[1]*cw),i=2;i!==d;i+=2)ctx.lineTo(cx+path[i]*cw,cy+path[i+1]*cw);ctx.lineTo(cx+(path[d-2]*(1-c)+path[d]*c)*cw,cy+(path[d-1]*(1-c)+path[d+1]*c)*cw),ctx.stroke()}e<1&&(e*=path.length/2-1,e-=f=Math.floor(e),f*=2,function(ctx,t,x,y,cw,s,color){var a=cw/8,b=a/3,c=2*b,d=t%1*TAU,e=Math.cos(d),f=Math.sin(d);ctx.fillStyle=color.leaf||color,ctx.strokeStyle=color.leaf||color,ctx.lineWidth=s,ctx.lineCap="round",ctx.lineJoin="round",ctx.beginPath(),ctx.arc(x,y,a,d,d+Math.PI,!1),ctx.arc(x-b*e,y-b*f,c,d+Math.PI,d,!1),ctx.arc(x+c*e,y+c*f,b,d+Math.PI,d,!0),ctx.globalCompositeOperation="destination-out",ctx.fill(),ctx.globalCompositeOperation="source-over",ctx.stroke()}(ctx,t,cx+(path[(f+=2)-2]*(1-e)+path[f]*e)*cw,cy+(path[f-1]*(1-e)+path[f+1]*e)*cw,cw,s,color))}var Skycons=function(opts){opts=opts||{},this.list=[],this.interval=null,this.monochrome=void 0===opts.monochrome||opts.monochrome,opts.colors=opts.colors||{},this.colors={main:opts.colors.main||"#111",moon:opts.colors.moon||"#353545",fog:opts.colors.fog||"#CCC",fogbank:opts.colors.fogbank||"#AAA",cloud:opts.colors.cloud||"#666",snow:opts.colors.snow||"#C2EEFF",leaf:opts.colors.leaf||"#2C5228",rain:opts.colors.rain||"#7FDBFF",sun:opts.colors.sun||"#FFDC00"},this.monochrome?this.color=opts.color||this.colors.main:this.color=this.colors,this.resizeClear=!(!opts||!opts.resizeClear)};Skycons.CLEAR_DAY=function(ctx,t,color){var w=ctx.canvas.width,h=ctx.canvas.height,s=Math.min(w,h);sun(ctx,t,.5*w,.5*h,s,.02*s,color)},Skycons.CLEAR_NIGHT=function(ctx,t,color){var w=ctx.canvas.width,h=ctx.canvas.height,s=Math.min(w,h);moon(ctx,t,.5*w,.5*h,s,.02*s,color)},Skycons.PARTLY_CLOUDY_DAY=function(ctx,t,color){var w=ctx.canvas.width,h=ctx.canvas.height,s=Math.min(w,h);sun(ctx,t,.625*w,.375*h,.75*s,.02*s,color),cloud(ctx,t,.375*w,.625*h,.75*s,.02*s,color)},Skycons.PARTLY_CLOUDY_NIGHT=function(ctx,t,color){var w=ctx.canvas.width,h=ctx.canvas.height,s=Math.min(w,h);moon(ctx,t,.667*w,.375*h,.75*s,.02*s,color),cloud(ctx,t,.375*w,.625*h,.75*s,.02*s,color)},Skycons.CLOUDY=function(ctx,t,color){var w=ctx.canvas.width,h=ctx.canvas.height,s=Math.min(w,h);cloud(ctx,t,.5*w,.5*h,s,.02*s,color)},Skycons.RAIN=function(ctx,t,color){var w=ctx.canvas.width,h=ctx.canvas.height,s=Math.min(w,h);!function(ctx,t,cx,cy,cw,s,color){t/=1350;var i,p,x,y,a=.16*cw,b=11*TAU/12,c=7*TAU/12;for(ctx.fillStyle=color.rain||color,i=4;i--;)x=cx+(i-1.5)/1.5*(1===i||2===i?-1:1)*a,y=cy+(p=(t+i/4)%1)*p*cw,ctx.beginPath(),ctx.moveTo(x,y-1.5*s),ctx.arc(x,y,.75*s,b,c,!1),ctx.fill()}(ctx,t,.5*w,.37*h,.9*s,.05*s,color),cloud(ctx,t,.5*w,.37*h,.9*s,.02*s,color)},Skycons.SLEET=function(ctx,t,color){var w=ctx.canvas.width,h=ctx.canvas.height,s=Math.min(w,h);!function(ctx,t,cx,cy,cw,s,color){t/=750;var i,p,x,y,a=.1875*cw;for(ctx.strokeStyle=color.rain||color,ctx.lineWidth=.5*s,ctx.lineCap="round",ctx.lineJoin="round",i=4;i--;)p=(t+i/4)%1,line(ctx,x=Math.floor(cx+(i-1.5)/1.5*(1===i||2===i?-1:1)*a)+.5,(y=cy+p*cw)-1.5*s,x,y+1.5*s)}(ctx,t,.5*w,.37*h,.9*s,.02*s,color),cloud(ctx,t,.5*w,.37*h,.9*s,.02*s,color)},Skycons.SNOW=function(ctx,t,color){var w=ctx.canvas.width,h=ctx.canvas.height,s=Math.min(w,h);!function(ctx,t,cx,cy,cw,s,color){var i,p,x,y,a=.16*cw,b=.75*s,u=(t/=3e3)*TAU*.7,ux=Math.cos(u)*b,uy=Math.sin(u)*b,v=u+TAU/3,vx=Math.cos(v)*b,vy=Math.sin(v)*b,w=u+2*TAU/3,wx=Math.cos(w)*b,wy=Math.sin(w)*b;for(ctx.strokeStyle=color.snow||color,ctx.lineWidth=.5*s,ctx.lineCap="round",ctx.lineJoin="round",i=4;i--;)p=(t+i/4)%1,line(ctx,(x=cx+Math.sin((p+i/4)*TAU)*a)-ux,(y=cy+p*cw)-uy,x+ux,y+uy),line(ctx,x-vx,y-vy,x+vx,y+vy),line(ctx,x-wx,y-wy,x+wx,y+wy)}(ctx,t,.5*w,.37*h,.9*s,.02*s,color),cloud(ctx,t,.5*w,.37*h,.9*s,.02*s,color)},Skycons.WIND=function(ctx,t,color){var w=ctx.canvas.width,h=ctx.canvas.height,s=Math.min(w,h);swoosh(ctx,t,.5*w,.5*h,s,.02*s,0,2,color),swoosh(ctx,t,.5*w,.5*h,s,.02*s,1,2,color)},Skycons.FOG=function(ctx,t,color){var w=ctx.canvas.width,h=ctx.canvas.height,s=Math.min(w,h),k=.02*s;!function(ctx,t,cx,cy,cw,s,color){t/=3e4;var a=.21*cw,b=.06*cw,c=.21*cw,d=.28*cw;ctx.fillStyle=color.fogbank||color,puffs(ctx,t,cx,cy,a,b,c,d),ctx.globalCompositeOperation="destination-out",puffs(ctx,t,cx,cy,a,b,c-s,d-s),ctx.globalCompositeOperation="source-over"}(ctx,t,.5*w,.32*h,.75*s,k,color),t/=5e3;var a=Math.cos(t*TAU)*s*.02,b=Math.cos((t+.25)*TAU)*s*.02,c=Math.cos((t+.5)*TAU)*s*.02,d=Math.cos((t+.75)*TAU)*s*.02,n=.936*h,e=Math.floor(n-.5*k)+.5,f=Math.floor(n-2.5*k)+.5;ctx.strokeStyle=color.fog||color,ctx.lineWidth=k,ctx.lineCap="round",ctx.lineJoin="round",line(ctx,a+.2*w+.5*k,e,b+.8*w-.5*k,e),line(ctx,c+.2*w+.5*k,f,d+.8*w-.5*k,f)},Skycons.prototype={_determineDrawingFunction:function(draw){return"string"==typeof draw&&(draw=Skycons[draw.toUpperCase().replace(/-/g,"_")]||null),draw},add:function(el,draw){var obj;"string"==typeof el&&(el=document.getElementById(el)),null!==el&&"function"==typeof(draw=this._determineDrawingFunction(draw))&&(obj={element:el,context:el.getContext("2d"),drawing:draw},this.list.push(obj),this.draw(obj,500))},set:function(el,draw){var i;for("string"==typeof el&&(el=document.getElementById(el)),i=this.list.length;i--;)if(this.list[i].element===el)return this.list[i].drawing=this._determineDrawingFunction(draw),void this.draw(this.list[i],500);this.add(el,draw)},remove:function(el){var i;for("string"==typeof el&&(el=document.getElementById(el)),i=this.list.length;i--;)if(this.list[i].element===el)return void this.list.splice(i,1)},draw:function(obj,time){var canvas=obj.context.canvas;this.resizeClear?canvas.width=canvas.width:obj.context.clearRect(0,0,canvas.width,canvas.height),obj.drawing(obj.context,time,this.color)},play:function(){var self=this;this.pause(),this.interval=requestInterval(function(){var i,now=Date.now();for(i=self.list.length;i--;)self.draw(self.list[i],now)},1e3/60)},pause:function(){this.interval&&(cancelInterval(this.interval),this.interval=null)}},global.Skycons=Skycons}(this),$(document).ready(function(){var apiKeyWeather="8576ce11abd01f85c5483b036ca8720a",weekday=["SUN","MON","TUE","WED","THU","FRI","SAT"],skycons=new Skycons({monochrome:!1,colors:{cloud:"#fff",main:"#fff",moon:"#fff",fog:"#fff",fogbank:"#fff",snow:"#fff",leaf:"rgb(229, 105, 60)",rain:"rgb(188, 24, 136)",sun:"rgb(240, 149, 51)"}});function handleWeather(weatherObj){console.log(weatherObj.currently.icon.toUpperCase()),$("#current-temp").html(Math.round(weatherObj.currently.temperature)+"&deg;C"),$("#current-cloud-cover").text(Math.round(100*Number(weatherObj.currently.cloudCover))+" %"),$("#current-wind-speed").text(weatherObj.currently.windSpeed+" m/s"),$("#current-precip-prob").text(weatherObj.currently.precipProbability),skycons.add("icon1",Skycons[weatherObj.currently.icon.toUpperCase().replace(/-/g,"_")]);var date1=new Date(1e3*weatherObj.daily.data[1].time);$(".first-container .day").text(weekday[date1.getDay()]),skycons.add("icon2",Skycons[weatherObj.daily.data[2].icon.toUpperCase().replace(/-/g,"_")]),$(".first-container .temp-high").html(Math.round(weatherObj.daily.data[2].temperatureHigh)+"&deg;C"),$(".first-container .temp-low").html(Math.round(weatherObj.daily.data[2].temperatureLow)+"&deg;C");var date2=new Date(1e3*weatherObj.daily.data[2].time);$(".second-container .day").text(weekday[date2.getDay()]),skycons.add("icon3",Skycons[weatherObj.daily.data[3].icon.toUpperCase().replace(/-/g,"_")]),$(".second-container .temp-high").html(Math.round(weatherObj.daily.data[3].temperatureHigh)+"&deg;C"),$(".second-container .temp-low").html(Math.round(weatherObj.daily.data[3].temperatureLow)+"&deg;C");var date3=new Date(1e3*weatherObj.daily.data[3].time);$(".third-container .day").text(weekday[date3.getDay()]),skycons.add("icon4",Skycons[weatherObj.daily.data[4].icon.toUpperCase().replace(/-/g,"_")]),$(".third-container .temp-high").html(Math.round(weatherObj.daily.data[4].temperatureHigh)+"&deg;C"),$(".third-container .temp-low").html(Math.round(weatherObj.daily.data[4].temperatureLow)+"&deg;C");var date4=new Date(1e3*weatherObj.daily.data[4].time);$(".fourth-container .day").text(weekday[date4.getDay()]),skycons.add("icon5",Skycons[weatherObj.daily.data[5].icon.toUpperCase().replace(/-/g,"_")]),$(".fourth-container .temp-high").html(Math.round(weatherObj.daily.data[5].temperatureHigh)+"&deg;C"),$(".fourth-container .temp-low").html(Math.round(weatherObj.daily.data[5].temperatureLow)+"&deg;C");var date5=new Date(1e3*weatherObj.daily.data[5].time);$(".fifth-container .day").text(weekday[date5.getDay()]),skycons.add("icon6",Skycons[weatherObj.daily.data[6].icon.toUpperCase().replace(/-/g,"_")]),$(".fifth-container .temp-high").html(Math.round(weatherObj.daily.data[6].temperatureHigh)+"&deg;C"),$(".fifth-container .temp-low").html(Math.round(weatherObj.daily.data[6].temperatureLow)+"&deg;C"),skycons.play()}function handleError(error){alert("can't access api")}$(document).ajaxStart(function(){$(".main-container").hide(),$(".loading-container").show()}),$(document).ajaxStop(function(){$(".loading-container").hide(),$(".main-container").show()}),$.ajax({method:"GET",url:"https://ipapi.co/json/",dataType:"json"}).done(function(locationObj){$(".city").html("<span>"+locationObj.city+"</span>"),console.log(locationObj),$.ajax({method:"GET",url:"https://api.darksky.net/forecast/"+apiKeyWeather+"/"+locationObj.latitude+","+locationObj.longitude+"?units=si",dataType:"jsonp"}).done(handleWeather).fail(handleError)}).fail(handleError)});
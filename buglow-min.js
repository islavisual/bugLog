//BugLog 1.0 (https://github.com/islavisual/bugLog). * Copyright 2014 Islavisual. Licensed under MIT (https://github.com/islavisual/bugLog/blob/master/LICENSE). Author: Pablo E. Fernández (islavisual@gmail.com). Last update: 09/01/2015
document.addEventListener("DOMContentLoaded",function(){bugLow.showMessage(bugLow.messages.parsedPage,"sending"),$(document).ajaxSuccess(function(e,t,r){var o=bugLow.messages.ajaxSuccess.replace("<method>",r.async);o=o.replace("<type>",r.type),o=o.replace("<crossDomain>",r.crossDomain),o=o.replace("<url>",r.url),o=o.replace("<contentType>",r.contentType),bugLow.showMessage(o,"updated")}),$(document).ajaxError(function(e,t){bugLow.showMessage(bugLow.messages.ajaxError+("console"==bugLow.target?"\n":"<br/>")+" Status Error: "+t.status+("console"==bugLow.target?"\n":"<br/>")+"Status Text: "+t.statusText+("console"==bugLow.target?"\n":"<br/>")+"Description: "+t.responseText,"error")}),$(document).ajaxComplete(function(e,t,r){var o=bugLow.messages.ajaxComplete.replace("<url>",r.url);bugLow.showMessage(o,"readyState")}),$.ajaxSetup({beforeSend:function(){var e=bugLow.messages.ajaxBeforeSend.replace("<method>",this.async);e=e.replace("<type>",this.type),e=e.replace("<crossDomain>",this.crossDomain),e=e.replace("<url>",this.url),e=e.replace("<contentType>",this.contentType),bugLow.showMessage(e,"proccessing")}})}),document.onreadystatechange=function(){"interactive"==document.readyState?bugLow.showMessage(bugLow.messages.pageChangedStatus+" "+document.readyState,"proccessing"):bugLow.showMessage(bugLow.messages.pageChangedStatus+" "+document.readyState,"readyState")},window.addEventListener("load",function(){bugLow.showMessage(bugLow.messages.pageChangedStatus+" finished","updated")}),window.onerror=function(e,t,r,o,a){return console.log(a),alert("Error: "+e+"\nScript: "+t+"\nLine: "+r+"\nColumn: "+o),!0};var bugLow={mode:"",target:"",targetWindow:null,mutationObserver:"Not Supported",attributeFilter:[],excludedAttributeFilter:["style"],selectorFilter:[],excludedSelectorFilter:[],eventFilter:[],enableHistory:!1,history:{},enableUndo:!0,undo:{},redo:{},messages:{ajaxBeforeSend:"Processing request. Method: <method>. Type: <type>. CrossDomain: <crossDomain>.  File: <url>. Content Type: <contentType>",ajaxComplete:"The Ajax processing request FINISHED for the <url> file.",ajaxSuccess:"The Ajax request was completed SUCCESSFULLY for the <url> file.",ajaxError:"An error occurred into Ajax processing request into <url> file.",beforeUnloadPage:"Page request unload",unloadPage:"Unloaded page",errorPage:"An error occurred into file",parsedPage:"Page loaded and parsed.",pageChangedStatus:"Page changed status:",valueChanged:"The <selector> changed the value property to <value>.",getsFocus:"<selector> gets focus.",losesFocus:"<selector> loses focus.",click:"User clicks into <selector>.",attributeMutation:'The <attributeName> attribute has mutated from "<oldValue>" to "<value>" into <selector> element.',addedChildren:"Added children into <selector> element. Total children: <totalChildren>",removedChildren:"Removed children into <selector> element. Total children: <totalChildren>",mouseOver:"The mouse pointer is over the <selector> element.",mouseOut:"The mouse pointer leaves the <selector> element.",keyPress:'Keyboard event received into <selector> element. Keys Combination: "<keys>". Keys Combination Code: "<keysCode>".',separator:'<div style="border: 1px solid #333; border-width: 0px 0px 1px 0px; height:5px; width:100%;margin-bottom: 5px;">&nbsp;</div>'},colors:{added:"#709050",attributeChanged:"#ff00ff",background:"#000000",blur:"#907080",focus:"#9070a0",click:"#909090",mouseOver:"#a07090",mouseOut:"#807090",keyPress:"#80a090",error:"#a02020",headerForeground:"#ffffff",headerBackground:"#333",normal:"#606060",proccessing:"#8AC007",readyState:"#8AC007",removed:"#a01010",sending:"#8AC007",updated:"#80a0e0",valueChanged:"#FE2466"},version:"1.0",isObserved:function(e){if(0!=this.selectorFilter.length){if(-1!=this.inArray(e.tagName,this.selectorFilter)&&-1==this.inArray(e.tagName,this.excludedSelectorFilter)||"undefined"!=typeof e.id&&-1!=this.inArray("#"+e.id,this.selectorFilter)&&-1==this.inArray("#"+e.id,this.excludedSelectorFilter)||"undefined"!=typeof e.className&&-1!=this.inArray("."+e.className.replace(/ /g," ."),this.selectorFilter)&&-1==this.inArray("."+e.className.replace(/ /g," ."),this.excludedSelectorFilter))return!0}else if(0==this.selectorFilter.length&&-1==this.inArray(e.tagName,this.excludedSelectorFilter)&&-1==this.inArray("#"+e.id,this.excludedSelectorFilter)&&-1==this.inArray("."+e.className,this.excludedSelectorFilter))return!0;return!1},gp:function(e){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var t="[\\?&]"+e+"=([^&#]*)",r=new RegExp(t),o=r.exec(window.location.href);return null==o?null:o[1]},setParams:function(){for(var e=this,t=["af","eaf","sf","esf","ef","h","u","m","t"],r=["attributeFilter","excludedAttributeFilter","selectorFilter","excludedSelectorFilter","eventFilter","enableHistory","enableUndo","mode","target"],o=0;o<t.length;o++){var a=decodeURI(e.gp(t[o]));"null"===a&&(a=decodeURI(e.gp(r[o]))),"m"==t[o]||"t"==t[o]?e[r[o]]=a:null!=a&&"true"!=a&&"false"!=a?e[r[o]]=a.split(" "):null!=a&&(e[r[o]]="true"==a?!0:!1)}},init:function(e,t){this.setParams(),this.getMode(e),this.getTarget(t);var r={subtree:!0,childList:!1,attributes:!0,attributeOldValue:!1,characterData:!0,characterDataOldValue:!1};if("all"==this.mode)var r={subtree:!0,childList:!0,attributes:!0,attributeOldValue:!0,characterData:!0,characterDataOldValue:!0};"undefined"!=typeof this.attributeFilter&&0!=this.attributeFilter.length&&(r.attributeFilter=this.attributeFilter);for(var o=["WebKit","Moz","O","Ms",""],a=0;a<o.length;a++)o[a]+"MutationObserver"in window&&(this.mutationObserver=window[o[a]+"MutationObserver"]);this.showMessage("Mutation Observer Functionality: "+this.mutationObserver,"normal");var s=this,i=new this.mutationObserver(function(e){e.forEach(function(e){{var t=e.target.id,r=(e.target.className,e.target.tagName);e.target.ownerDocument.lastModified}if(s.isObserved(e.target)){try{var o=$(e.target).parentsUntil("html").map(function(){return this.tagName+(""!=this.className?"."+this.className:"")}).get().reverse().join(" > ")}catch(a){var o="NULL"}t="undefined"==typeof t||""==t?r:"#"+t,t=o+" > "+t,"attributes"==e.type&&-1==s.excludedAttributeFilter.indexOf(e.attributeName)?(s.showMessage(s.messages.attributeMutation.replace("<attributeName>",e.attributeName).replace("<oldValue>",e.oldValue).replace("<value>",$(e.target).prop(e.attributeName)).replace("<selector>",t),"attributeChanged"),"undefined"!=typeof e.target.id&&""!=e.target.id&&null!=e.target.id&&s.addHistoryBack(e.target.id,$(e.target).prop(e.attributeName))):"childList"==e.type&&(null!=e.addedNodes?s.showMessage(s.messages.addedChildren.replace("<totalChildren>",e.addedNodes.length).replace("<selector>",t),"added"):null!=e.removedNodes&&s.showMessage(s.messages.removedChildren.replace("<totalChildren>",e.removedNodes.length).replace("<selector>",t),"removed"))}})});i.observe(document,r);try{s.setUserEvents()}catch(n){window.onload=function(){s.setUserEvents()}}var l=JSON.parse(sessionStorage.getItem("bugLowUndo"));"undefined"!=typeof l&&null!=l&&""!=l&&(this.undo=l)},getMode:function(e){this.mode="undefined"!=typeof e&&"all"==e?"all":"default"},getTarget:function(e){this.target="undefined"!=typeof e?"console"==e?"console":"window":"console","window"==this.target&&(this.targetWindow=window.open("","bugLowWindow","toolbar=no, scrollbars=yes, resizable=yes, top=0, left=0, width=500, height=500"),this.targetWindow.document.body.innerHTML="",this.targetWindow.document.write("<style>body { background:"+this.colors.background+"; } h2 {background:"+this.colors.headerBackground+"; color:"+this.colors.headerForeground+"; padding:5px;}</style>"),this.targetWindow.document.write("<H2>bugLow 1.0 - Page loaded at "+this.getTime()+"</H2>")),this.showMessage("Mode: "+this.mode,"normal"),this.showMessage("Target: "+this.target,"normal"),this.showMessage("Target Window: "+this.targetWindow,"normal")},getTime:function(){var e=new Date,t=e.getDay(),r=e.getMonth()+1,o=e.getFullYear(),a=e.getHours(),s=e.getMinutes(),i=e.getSeconds(),n=e.getMilliseconds();return(10>t?"0"+t:t)+"/"+(10>r?"0"+r:r)+"/"+(10>o?"0"+o:o)+" "+(10>a?"0"+a:a)+":"+(10>s?"0"+s:s)+":"+(10>i?"0"+i:i)+"."+n},setUserEvents:function(){var e=this,t=e.eventFilter.join(" ");0==e.eventFilter.length&&(t="change click focusin focusout mouseenter mouseleave keydown"),$("body *").on(t,function(t){t.stopPropagation();var r=t.target.id,o=(t.target.className,t.target.tagName),a=t.type;if(e.isObserved(t.target)){try{var s=$(t.currentTarget).parentsUntil("html").map(function(){return this.tagName+(""!=this.className?"."+this.className:"")}).get().reverse().join(" > ")}catch(t){var s="NULL"}if(r="undefined"==typeof r||""==r?o:"#"+r,r=s+" > "+r,"change"==a)e.showMessage(e.messages.valueChanged.replace("<selector>",r).replace("<value>",$(t.target).val()),"valueChanged");else if("focusin"==a||"focus"==a)e.showMessage(e.messages.getsFocus.replace("<selector>",r),"focus");else if("focusout"==a||"blur"==a)e.showMessage(e.messages.losesFocus.replace("<selector>",r),"blur");else if("click"==a||"dblclick"==a)e.showMessage(e.messages.click.replace("<selector>",r),"click");else if("mouseenter"!=a&&"mouseover"!=a||"all"!=e.mode)if("mouseleave"!=a&&"mouseout"!=a||"all"!=e.mode){if("keydown"==a||"keyup"==a||"keypress"==a){var i=t.which?t.which:t.keyCode,n="",l="",d="";(t.shiftKey||16==i)&&(l+="Shift + ",d="16 + "),(t.ctrlKey||17==i)&&(l+="Ctrl + ",d="17 + "),(t.altKey||18==i)&&(l+="Alt + ",d="18 + "),n+=8==i?"Backspace":9==i?"Tab":13==i?"Enter":19==i?"Pause / Break":27==i?"Escape":19==i?"Pause / Break":33==i?"Page Up":34==i?"Page Down":35==i?"End":36==i?"Home":37==i?"Left Arrow":38==i?"Up Arrow":39==i?"Right Arrow":40==i?"Down Arrow":45==i?"Insert":46==i?"Delete":91==i?"Left window":92==i?"Right window":93==i?"Select key":96==i?"Numpad 0":97==i?"Numpad 1":98==i?"Numpad 2":99==i?"Numpad 3":100==i?"Numpad 4":101==i?"Numpad 5":102==i?"Numpad 6":103==i?"Numpad 7":104==i?"Numpad 8":105==i?"Numpad 9":106==i?"Multiply":107==i?"Add":109==i?"Subtract":110==i?"Decimal point":111==i?"Divide":112==i?"F1":113==i?"F2":114==i?"F3":115==i?"F4":116==i?"F5":117==i?"F6":118==i?"F7":119==i?"F8":120==i?"F9":121==i?"F10":122==i?"F11":123==i?"F12":144==i?"num lock":145==i?"scroll lock":186==i?"Semi-colon (;)":187==i?"Equal-sign (=)":188==i?"Comma (,)":189==i?"Dash (-)":190==i?"Period (.)":191==i?"Forward Slash (/)":192==i?"Grave Accent(`)":219==i?"Open Bracket ([)":220==i?"Back Slash (\\)":221==i?"Close Bracket (])":222==i?"Single Quote (')":String.fromCharCode(i),i>18&&(e.showMessage(e.messages.keyPress.replace("<selector>",r).replace("<keys>",l+n).replace("<keysCode>",d+i),"keyPress"),"undefined"!=typeof t.target.id&&""!=t.target.id&&null!=t.target.id&&(e.addHistoryBack(t.target.id,$(t.target).val()),$("#"+t.target.id).trigger("change")))}}else e.showMessage(e.messages.mouseOut.replace("<selector>",r),"mouseOut");else e.showMessage(e.messages.mouseOver.replace("<selector>",r),"mouseOver")}})},addHistoryBack:function(e,t){if(this.enableUndo){var r=this.sha1(window.location.pathname);"undefined"==typeof this.undo[r]&&(this.undo[r]={});try{this.undo[r][e][this.undo[r][e].length-1]!=t&&(this.undo[r][e][this.undo[r][e].length]=t)}catch(o){this.undo[r][e]=new Array,this.undo[r][e][0]=t}sessionStorage.setItem("bugLowUndo",JSON.stringify(this.undo))}},historyBack:function(e){if(this.enableUndo)try{var t=this.sha1(window.location.pathname),r=this.undo[t][e].pop();if($("#"+e).val()==r)var r=this.undo[t][e].pop();return"undefined"!=typeof r&&null!=r&&""!=r?(0==this.undo[t][e].length&&delete this.undo[t][e],sessionStorage.setItem("bugLowUndo",JSON.stringify(this.undo)),this.addHistoryForward(e,$("#"+e).val()),$("#"+e).val(r),$("#"+e).trigger("change"),r):null}catch(o){}},addHistoryForward:function(e,t){if(this.enableUndo){var r=this.sha1(window.location.pathname);"undefined"==typeof this.redo[r]&&(this.redo[r]={});try{this.redo[r][e][this.redo[r][e].length-1]!=t&&(this.redo[r][e][this.redo[r][e].length]=t)}catch(o){this.redo[r][e]=new Array,this.redo[r][e][0]=t}sessionStorage.setItem("bugLowRedo",JSON.stringify(this.redo))}},historyForward:function(e){if(this.enableUndo)try{var t=this.sha1(window.location.pathname),r=this.redo[t][e].pop();if($("#"+e).val()==r)var r=this.undo[t][e].pop();return"undefined"!=typeof r&&null!=r&&""!=r?(0==this.redo[t][e].length&&delete this.redo[t][e],sessionStorage.setItem("bugLowRedo",JSON.stringify(this.redo)),this.addHistoryBack(e,$("#"+e).val()),$("#"+e).val(r),$("#"+e).trigger("change"),r):null}catch(o){}},getHistory:function(){var e=this.sha1(window.location.pathname);return this.history[e]},sha1:function(e){var t,r,o,a,s,i,n,l,d,c=function(e,t){var r=e<<t|e>>>32-t;return r},u=function(e){var t,r,o="";for(t=7;t>=0;t--)r=e>>>4*t&15,o+=r.toString(16);return o},h=new Array(80),g=1732584193,p=4023233417,f=2562383102,m=271733878,w=3285377520,y=e.length,b=[];for(r=0;y-3>r;r+=4)o=e.charCodeAt(r)<<24|e.charCodeAt(r+1)<<16|e.charCodeAt(r+2)<<8|e.charCodeAt(r+3),b.push(o);switch(y%4){case 0:r=2147483648;break;case 1:r=e.charCodeAt(y-1)<<24|8388608;break;case 2:r=e.charCodeAt(y-2)<<24|e.charCodeAt(y-1)<<16|32768;break;case 3:r=e.charCodeAt(y-3)<<24|e.charCodeAt(y-2)<<16|e.charCodeAt(y-1)<<8|128}for(b.push(r);b.length%16!=14;)b.push(0);for(b.push(y>>>29),b.push(y<<3&4294967295),t=0;t<b.length;t+=16){for(r=0;16>r;r++)h[r]=b[t+r];for(r=16;79>=r;r++)h[r]=c(h[r-3]^h[r-8]^h[r-14]^h[r-16],1);for(a=g,s=p,i=f,n=m,l=w,r=0;19>=r;r++)d=c(a,5)+(s&i|~s&n)+l+h[r]+1518500249&4294967295,l=n,n=i,i=c(s,30),s=a,a=d;for(r=20;39>=r;r++)d=c(a,5)+(s^i^n)+l+h[r]+1859775393&4294967295,l=n,n=i,i=c(s,30),s=a,a=d;for(r=40;59>=r;r++)d=c(a,5)+(s&i|s&n|i&n)+l+h[r]+2400959708&4294967295,l=n,n=i,i=c(s,30),s=a,a=d;for(r=60;79>=r;r++)d=c(a,5)+(s^i^n)+l+h[r]+3395469782&4294967295,l=n,n=i,i=c(s,30),s=a,a=d;g=g+a&4294967295,p=p+s&4294967295,f=f+i&4294967295,m=m+n&4294967295,w=w+l&4294967295}return d=u(g)+u(p)+u(f)+u(m)+u(w),d.toLowerCase()},inArray:function(e,t){if("undefined"==typeof e||-1!=e.indexOf("undefined")||"#"==e||"."==e)return-1;if("undefined"==typeof t||0==t.length)return-1;for(var r=t.length,o=e.toString().toLowerCase(),a=0;r>a;a++)if(-1!=t[a].indexOf(".")){for(var s=t[a],i=e.split(" "),n=0;n<i.length;n++)if(i[n]==s)return a}else if(t[a].toLowerCase()==o)return a;return-1},showMessage:function(e,t){function r(e){var t="";if("object"==typeof e)for(var a in e){var s=!1;try{s=1==Array.isArray(a)||parseFloat(a)>=0?!0:!1}catch(i){s=!1}"string"!=typeof e[a]||-1==e[a].indexOf("<pre>")&&-1==e[a].indexOf("</pre>")?(t+='<b style="color:'+this.colors.headerForeground+'">'+(0==o?1==s?a+" => [ ":a+" : ":"")+"</b>",o=!1,t+=r(e[a])+(0==o&&1==s?" ] ":"")+("console"==this.target?"\n":"<br/>")):(t+=e[a],o=!0)}else t+=e,o=!1;if(this.enableHistory){var n=this.sha1(window.location.pathname);"undefined"==typeof this.history[n]&&(this.history[n]="bugLow "+this.version+" - Page loaded at "+this.getTime()+"\n---------------------------------------------------\n"),this.history[n]+="["+this.getTime()+"]"+t+"\n"}return t}var o=!1,a="";if(a="undefined"==typeof t?this.colors.normal:this.colors[t],"console"==this.target||""==this.target){var s="["+this.getTime()+"] "+r(e);"error"==t?console.error(s):"warn"==t?console.warn(s):"info"==t?console.info(s):console.log(s)}else{var s="<span style='color:"+this.colors.normal+"'>["+this.getTime()+"]</span> ";s+='<span style="color:'+a+'">'+r(e)+"</span>";try{this.targetWindow.document.write(s+this.messages.separator)}catch(i){}}}};

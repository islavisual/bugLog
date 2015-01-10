//BugLog 1.0 (https://github.com/islavisual/bugLog). * Copyright 2014 Islavisual. Licensed under MIT (https://github.com/islavisual/bugLog/blob/master/LICENSE). Author: Pablo E. Fernández (islavisual@gmail.com). Last update: 09/01/2015
document.addEventListener("DOMContentLoaded",function(){bugLow.showMessage(bugLow.messages.parsedPage,"sending"),$(document).ajaxSuccess(function(e,t,o){var a=bugLow.messages.ajaxSuccess.replace("<method>",o.async);a=a.replace("<type>",o.type),a=a.replace("<crossDomain>",o.crossDomain),a=a.replace("<url>",o.url),a=a.replace("<contentType>",o.contentType),bugLow.showMessage(a,"updated")}),$(document).ajaxError(function(e,t){bugLow.showMessage(bugLow.messages.ajaxError+("console"==bugLow.target?"\n":"<br/>")+" Status Error: "+t.status+("console"==bugLow.target?"\n":"<br/>")+"Status Text: "+t.statusText+("console"==bugLow.target?"\n":"<br/>")+"Description: "+t.responseText,"error")}),$(document).ajaxComplete(function(e,t,o){var a=bugLow.messages.ajaxComplete.replace("<url>",o.url);bugLow.showMessage(a,"readyState")}),$.ajaxSetup({beforeSend:function(){var e=bugLow.messages.ajaxBeforeSend.replace("<method>",this.async);e=e.replace("<type>",this.type),e=e.replace("<crossDomain>",this.crossDomain),e=e.replace("<url>",this.url),e=e.replace("<contentType>",this.contentType),bugLow.showMessage(e,"proccessing")}})}),document.onreadystatechange=function(){"interactive"==document.readyState?bugLow.showMessage(bugLow.messages.pageChangedStatus+" "+document.readyState,"proccessing"):bugLow.showMessage(bugLow.messages.pageChangedStatus+" "+document.readyState,"readyState")},window.addEventListener("load",function(){bugLow.showMessage(bugLow.messages.pageChangedStatus+" finished","updated")}),window.onerror=function(e,t,o,a,s){return console.log(s),alert("Error: "+e+"\nScript: "+t+"\nLine: "+o+"\nColumn: "+a),!0};var bugLow={mode:"",target:"",targetWindow:null,mutationObserver:"Not Supported",mutationAttributesFilter:[],mutationNotObserverAttributesFilter:["style"],enableHistory:!1,history:{},enableUndo:!0,undo:{},redo:{},messages:{ajaxBeforeSend:"Processing request. Method: <method>. Type: <type>. CrossDomain: <crossDomain>.  File: <url>. Content Type: <contentType>",ajaxComplete:"The Ajax processing request FINISHED for the <url> file.",ajaxSuccess:"The Ajax request was completed SUCCESSFULLY for the <url> file.",ajaxError:"An error occurred into Ajax processing request into <url> file.",beforeUnloadPage:"Page request unload",unloadPage:"Unloaded page",errorPage:"An error occurred into file",parsedPage:"Page loaded and parsed.",pageChangedStatus:"Page changed status:",valueChanged:"The <selector> changed the value property to <value>.",getsFocus:"<selector> gets focus.",losesFocus:"<selector> loses focus.",click:"User clicks into <selector>.",attributeMutation:'The <attributeName> attribute has mutated from "<oldValue>" to "<value>" into <selector> element.',addedChildren:"Added children into <selector> element. Total children: <totalChildren>",removedChildren:"Removed children into <selector> element. Total children: <totalChildren>",mouseOver:"The mouse pointer is over the <selector> element.",mouseOut:"The mouse pointer leaves the <selector> element.",keyPress:'Keyboard event received into <selector> element. Keys Combination: "<keys>". Keys Combination Code: "<keysCode>".',separator:'<div style="border: 1px solid #333; border-width: 0px 0px 1px 0px; height:5px; width:100%;margin-bottom: 5px;">&nbsp;</div>'},colors:{added:"#709050",attributeChanged:"#ff00ff",background:"#000000",blur:"#907080",focus:"#9070a0",click:"#909090",mouseOver:"#a07090",mouseOut:"#807090",keyPress:"#80a090",error:"#a02020",headerForeground:"#ffffff",headerBackground:"#333",normal:"#606060",proccessing:"#8AC007",readyState:"#8AC007",removed:"#a01010",sending:"#8AC007",updated:"#80a0e0",valueChanged:"#FE2466"},version:"1.0",init:function(e,t){this.getMode(e),this.getTarget(t);var o={subtree:!0,childList:!1,attributes:!0,attributeOldValue:!1,characterData:!0,characterDataOldValue:!1};if("all"==this.mode)var o={subtree:!0,childList:!0,attributes:!0,attributeOldValue:!0,characterData:!0,characterDataOldValue:!0};"undefined"!=typeof this.mutationAttributesFilter&&0!=this.mutationAttributesFilter.length&&(o.attributeFilter=this.mutationAttributesFilter);for(var a=["WebKit","Moz","O","Ms",""],s=0;s<a.length;s++)a[s]+"MutationObserver"in window&&(this.mutationObserver=window[a[s]+"MutationObserver"]);this.showMessage("Mutation Observer Functionality: "+this.mutationObserver,"normal");var r=this,n=new this.mutationObserver(function(e){e.forEach(function(e){{var t=e.target.id,o=(e.target.className,e.target.tagName);e.target.ownerDocument.lastModified}try{var a=$(e.target).parentsUntil("html").map(function(){return this.tagName+(""!=this.className?"."+this.className:"")}).get().reverse().join(" > ")}catch(s){var a="NULL"}t="undefined"==typeof t||""==t?o:"#"+t,t=a+" > "+t,"attributes"==e.type&&-1==r.mutationNotObserverAttributesFilter.indexOf(e.attributeName)?(r.showMessage(r.messages.attributeMutation.replace("<attributeName>",e.attributeName).replace("<oldValue>",e.oldValue).replace("<value>",$(e.target).prop(e.attributeName)).replace("<selector>",t),"attributeChanged"),"undefined"!=typeof e.target.id&&""!=e.target.id&&null!=e.target.id&&r.addHistoryBack(e.target.id,$(e.target).prop(e.attributeName))):"childList"==e.type&&(null!=e.addedNodes?r.showMessage(r.messages.addedChildren.replace("<totalChildren>",e.addedNodes.length).replace("<selector>",t),"added"):null!=e.removedNodes&&r.showMessage(r.messages.removedChildren.replace("<totalChildren>",e.removedNodes.length).replace("<selector>",t),"removed"))})});n.observe(document,o);try{r.setUserEvents()}catch(i){window.onload=function(){r.setUserEvents()}}var d=JSON.parse(sessionStorage.getItem("bugLowUndo"));"undefined"!=typeof d&&null!=d&&""!=d&&(this.undo=d)},getMode:function(e){this.mode="undefined"!=typeof e&&"all"==e?"all":"default",this.showMessage("Mode: "+this.mode,"normal")},getTarget:function(e){this.target="undefined"!=typeof e?"console"==e?"console":"window":"console","window"==this.target&&(this.targetWindow=window.open("","bugLowWindow","toolbar=no, scrollbars=yes, resizable=yes, top=0, left=0, width=500, height=500"),this.targetWindow.document.body.innerHTML="",this.targetWindow.document.write("<style>body { background:"+this.colors.background+"; } h2 {background:"+this.colors.headerBackground+"; color:"+this.colors.headerForeground+"; padding:5px;}</style>"),this.targetWindow.document.write("<H2>bugLow 1.0 - Page loaded at "+this.getTime()+"</H2>")),this.showMessage("Target: "+this.target,"normal"),this.showMessage("Target Window: "+this.targetWindow,"normal")},getTime:function(){var e=new Date,t=e.getDay(),o=e.getMonth()+1,a=e.getFullYear(),s=e.getHours(),r=e.getMinutes(),n=e.getSeconds(),i=e.getMilliseconds();return(10>t?"0"+t:t)+"/"+(10>o?"0"+o:o)+"/"+(10>a?"0"+a:a)+" "+(10>s?"0"+s:s)+":"+(10>r?"0"+r:r)+":"+(10>n?"0"+n:n)+"."+i},setUserEvents:function(){var e=this;$("body *").on("change click focusin focusout mouseenter mouseleave keydown",function(t){t.stopPropagation();var o=t.target.id,a=(t.target.className,t.target.tagName),s=t.type;try{var r=$(t.currentTarget).parentsUntil("html").map(function(){return this.tagName+(""!=this.className?"."+this.className:"")}).get().reverse().join(" > ")}catch(t){var r="NULL"}if(o="undefined"==typeof o||""==o?a:"#"+o,o=r+" > "+o,"change"==s)e.showMessage(e.messages.valueChanged.replace("<selector>",o).replace("<value>",$(t.target).val()),"valueChanged");else if("focusin"==s)e.showMessage(e.messages.getsFocus.replace("<selector>",o),"focus");else if("focusout"==s)e.showMessage(e.messages.losesFocus.replace("<selector>",o),"blur");else if("click"==s)e.showMessage(e.messages.click.replace("<selector>",o),"click");else if("mouseenter"==s&&"all"==e.mode)e.showMessage(e.messages.mouseOver.replace("<selector>",o),"mouseOver");else if("mouseleave"==s&&"all"==e.mode)e.showMessage(e.messages.mouseOut.replace("<selector>",o),"mouseOut");else if("keydown"==s){var n=t.which?t.which:t.keyCode,i="",d="",l="";(t.shiftKey||16==n)&&(d+="Shift + ",l="16 + "),(t.ctrlKey||17==n)&&(d+="Ctrl + ",l="17 + "),(t.altKey||18==n)&&(d+="Alt + ",l="18 + "),i+=8==n?"Backspace":9==n?"Tab":13==n?"Enter":19==n?"Pause / Break":27==n?"Escape":19==n?"Pause / Break":33==n?"Page Up":34==n?"Page Down":35==n?"End":36==n?"Home":37==n?"Left Arrow":38==n?"Up Arrow":39==n?"Right Arrow":40==n?"Down Arrow":45==n?"Insert":46==n?"Delete":91==n?"Left window":92==n?"Right window":93==n?"Select key":96==n?"Numpad 0":97==n?"Numpad 1":98==n?"Numpad 2":99==n?"Numpad 3":100==n?"Numpad 4":101==n?"Numpad 5":102==n?"Numpad 6":103==n?"Numpad 7":104==n?"Numpad 8":105==n?"Numpad 9":106==n?"Multiply":107==n?"Add":109==n?"Subtract":110==n?"Decimal point":111==n?"Divide":112==n?"F1":113==n?"F2":114==n?"F3":115==n?"F4":116==n?"F5":117==n?"F6":118==n?"F7":119==n?"F8":120==n?"F9":121==n?"F10":122==n?"F11":123==n?"F12":144==n?"num lock":145==n?"scroll lock":186==n?"Semi-colon (;)":187==n?"Equal-sign (=)":188==n?"Comma (,)":189==n?"Dash (-)":190==n?"Period (.)":191==n?"Forward Slash (/)":192==n?"Grave Accent(`)":219==n?"Open Bracket ([)":220==n?"Back Slash (\\)":221==n?"Close Bracket (])":222==n?"Single Quote (')":String.fromCharCode(n),n>18&&(e.showMessage(e.messages.keyPress.replace("<selector>",o).replace("<keys>",d+i).replace("<keysCode>",l+n),"keyPress"),"undefined"!=typeof t.target.id&&""!=t.target.id&&null!=t.target.id&&e.addHistoryBack(t.target.id,$(t.target).val()))}})},addHistoryBack:function(e,t){if(this.enableUndo){var o=this.sha1(window.location.pathname);"undefined"==typeof this.undo[o]&&(this.undo[o]={});try{this.undo[o][e][this.undo[o][e].length-1]!=t&&(this.undo[o][e][this.undo[o][e].length]=t)}catch(a){this.undo[o][e]=new Array,this.undo[o][e][0]=t}sessionStorage.setItem("bugLowUndo",JSON.stringify(this.undo))}},historyBack:function(e){if(this.enableUndo)try{var t=this.sha1(window.location.pathname),o=this.undo[t][e].pop();if($("#"+e).val()==o)var o=this.undo[t][e].pop();return"undefined"!=typeof o&&null!=o&&""!=o?(0==this.undo[t][e].length&&delete this.undo[t][e],sessionStorage.setItem("bugLowUndo",JSON.stringify(this.undo)),this.addHistoryForward(e,$("#"+e).val()),$("#"+e).val(o),o):null}catch(a){}},addHistoryForward:function(e,t){if(this.enableUndo){var o=this.sha1(window.location.pathname);"undefined"==typeof this.redo[o]&&(this.redo[o]={});try{this.redo[o][e][this.redo[o][e].length-1]!=t&&(this.redo[o][e][this.redo[o][e].length]=t)}catch(a){this.redo[o][e]=new Array,this.redo[o][e][0]=t}sessionStorage.setItem("bugLowRedo",JSON.stringify(this.redo))}},historyForward:function(e){if(this.enableUndo)try{var t=this.sha1(window.location.pathname),o=this.redo[t][e].pop();if($("#"+e).val()==o)var o=this.undo[t][e].pop();return"undefined"!=typeof o&&null!=o&&""!=o?(0==this.redo[t][e].length&&delete this.redo[t][e],sessionStorage.setItem("bugLowRedo",JSON.stringify(this.redo)),this.addHistoryBack(e,$("#"+e).val()),$("#"+e).val(o),o):null}catch(a){}},getHistory:function(){var e=this.sha1(window.location.pathname);return this.history[e]},sha1:function(e){var t,o,a,s,r,n,i,d,l,u=function(e,t){var o=e<<t|e>>>32-t;return o},c=function(e){var t,o,a="";for(t=7;t>=0;t--)o=e>>>4*t&15,a+=o.toString(16);return a},h=new Array(80),g=1732584193,m=4023233417,p=2562383102,f=271733878,w=3285377520,y=e.length,b=[];for(o=0;y-3>o;o+=4)a=e.charCodeAt(o)<<24|e.charCodeAt(o+1)<<16|e.charCodeAt(o+2)<<8|e.charCodeAt(o+3),b.push(a);switch(y%4){case 0:o=2147483648;break;case 1:o=e.charCodeAt(y-1)<<24|8388608;break;case 2:o=e.charCodeAt(y-2)<<24|e.charCodeAt(y-1)<<16|32768;break;case 3:o=e.charCodeAt(y-3)<<24|e.charCodeAt(y-2)<<16|e.charCodeAt(y-1)<<8|128}for(b.push(o);b.length%16!=14;)b.push(0);for(b.push(y>>>29),b.push(y<<3&4294967295),t=0;t<b.length;t+=16){for(o=0;16>o;o++)h[o]=b[t+o];for(o=16;79>=o;o++)h[o]=u(h[o-3]^h[o-8]^h[o-14]^h[o-16],1);for(s=g,r=m,n=p,i=f,d=w,o=0;19>=o;o++)l=u(s,5)+(r&n|~r&i)+d+h[o]+1518500249&4294967295,d=i,i=n,n=u(r,30),r=s,s=l;for(o=20;39>=o;o++)l=u(s,5)+(r^n^i)+d+h[o]+1859775393&4294967295,d=i,i=n,n=u(r,30),r=s,s=l;for(o=40;59>=o;o++)l=u(s,5)+(r&n|r&i|n&i)+d+h[o]+2400959708&4294967295,d=i,i=n,n=u(r,30),r=s,s=l;for(o=60;79>=o;o++)l=u(s,5)+(r^n^i)+d+h[o]+3395469782&4294967295,d=i,i=n,n=u(r,30),r=s,s=l;g=g+s&4294967295,m=m+r&4294967295,p=p+n&4294967295,f=f+i&4294967295,w=w+d&4294967295}return l=c(g)+c(m)+c(p)+c(f)+c(w),l.toLowerCase()},showMessage:function(e,t){function o(e){var t="";if("object"==typeof e)for(var s in e){var r=!1;try{r=1==Array.isArray(s)||parseFloat(s)>=0?!0:!1}catch(n){r=!1}"string"!=typeof e[s]||-1==e[s].indexOf("<pre>")&&-1==e[s].indexOf("</pre>")?(t+='<b style="color:'+this.colors.headerForeground+'">'+(0==a?1==r?s+" => [ ":s+" : ":"")+"</b>",a=!1,t+=o(e[s])+(0==a&&1==r?" ] ":"")+("console"==this.target?"\n":"<br/>")):(t+=e[s],a=!0)}else t+=e,a=!1;if(this.enableHistory){var i=this.sha1(window.location.pathname);"undefined"==typeof this.history[i]&&(this.history[i]="bugLow "+this.version+" - Page loaded at "+this.getTime()+"\n---------------------------------------------------\n"),this.history[i]+="["+this.getTime()+"]"+t+"\n"}return t}var a=!1,s="";if(s="undefined"==typeof t?this.colors.normal:this.colors[t],"console"==this.target||""==this.target){var r="["+this.getTime()+"] "+o(e);"error"==t?console.error(r):"warn"==t?console.warn(r):"info"==t?console.info(r):console.log(r)}else{var r="<span style='color:"+this.colors.normal+"'>["+this.getTime()+"]</span> ";r+='<span style="color:'+s+'">'+o(e)+"</span>";try{this.targetWindow.document.write(r+this.messages.separator)}catch(n){}}}};
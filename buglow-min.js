//BugLog 1.0 (https://github.com/islavisual/bugLog). * Copyright 2014 Islavisual. Licensed under MIT (https://github.com/islavisual/bugLog/blob/master/LICENSE). Author: Pablo E. Fernández (islavisual@gmail.com). Last update: 09/01/2015
document.addEventListener("DOMContentLoaded",function(){bugLow.showMessage(bugLow.messages.parsedPage,"sending"),$(document).ajaxSuccess(function(e,t,r){var o=bugLow.messages.ajaxSuccess.replace("<method>",r.async);o=o.replace("<type>",r.type),o=o.replace("<crossDomain>",r.crossDomain),o=o.replace("<url>",r.url),o=o.replace("<contentType>",r.contentType),bugLow.showMessage(o,"updated")}),$(document).ajaxError(function(e,t){bugLow.showMessage(bugLow.messages.ajaxError+("console"==bugLow.target?"\n":"<br/>")+" Status Error: "+t.status+("console"==bugLow.target?"\n":"<br/>")+"Status Text: "+t.statusText+("console"==bugLow.target?"\n":"<br/>")+"Description: "+t.responseText,"error")}),$(document).ajaxComplete(function(e,t,r){var o=bugLow.messages.ajaxComplete.replace("<url>",r.url);bugLow.showMessage(o,"readyState")}),$.ajaxSetup({beforeSend:function(){var e=bugLow.messages.ajaxBeforeSend.replace("<method>",this.async);e=e.replace("<type>",this.type),e=e.replace("<crossDomain>",this.crossDomain),e=e.replace("<url>",this.url),e=e.replace("<contentType>",this.contentType),bugLow.showMessage(e,"proccessing")}})}),document.onreadystatechange=function(){"interactive"==document.readyState?bugLow.showMessage(bugLow.messages.pageChangedStatus+" "+document.readyState,"proccessing"):bugLow.showMessage(bugLow.messages.pageChangedStatus+" "+document.readyState,"readyState")},window.addEventListener("load",function(){bugLow.showMessage(bugLow.messages.pageChangedStatus+" finished","updated")}),window.onerror=function(e,t,r,o,s){return console.log(s),alert("Error: "+e+"\nScript: "+t+"\nLine: "+r+"\nColumn: "+o),!0};var bugLow={target:"",targetWindow:null,mutationObserver:"Not Supported",attributeFilter:[],excludedAttributeFilter:["style"],selectorFilter:[],excludedSelectorFilter:[],eventFilter:[],enableHistory:!1,history:{},enableUndo:!0,undo:{},redo:{},messages:{ajaxBeforeSend:"Processing request. Method: <method>. Type: <type>. CrossDomain: <crossDomain>.  File: <url>. Content Type: <contentType>",ajaxComplete:"The Ajax processing request FINISHED for the <url> file.",ajaxSuccess:"The Ajax request was completed SUCCESSFULLY for the <url> file.",ajaxError:"An error occurred into Ajax processing request into <url> file.",beforeUnloadPage:"Page request unload",unloadPage:"Unloaded page",errorPage:"An error occurred into file",parsedPage:"Page loaded and parsed.",pageChangedStatus:"Page changed status:",valueChanged:"The <selector> changed the value property to <value>.",getsFocus:"<selector> gets focus.",losesFocus:"<selector> loses focus.",click:"User clicks into <selector>.",attributeMutation:'The <attributeName> attribute has mutated from "<oldValue>" to "<value>" into <selector> element.',addedChildren:"Added children into <selector> element. Total children: <totalChildren>",removedChildren:"Removed children into <selector> element. Total children: <totalChildren>",mouseOver:"The mouse pointer is over the <selector> element.",mouseOut:"The mouse pointer leaves the <selector> element.",keyPress:'Keyboard event received into <selector> element. Keys Combination: "<keys>". Keys Combination Code: "<keysCode>".',separator:'<div style="border: 1px solid #333; border-width: 0px 0px 1px 0px; height:5px; width:100%;margin-bottom: 5px;">&nbsp;</div>'},colors:{added:"#709050",attributeChanged:"#ff00ff",background:"#000000",blur:"#907080",focus:"#9070a0",click:"#909090",mouseOver:"#a07090",mouseOut:"#807090",keyPress:"#80a090",error:"#a02020",headerForeground:"#ffffff",headerBackground:"#333",normal:"#606060",proccessing:"#8AC007",readyState:"#8AC007",removed:"#a01010",sending:"#8AC007",updated:"#80a0e0",valueChanged:"#FE2466"},version:"1.0",isObserved:function(e){if(0!=this.selectorFilter.length){if(-1!=this.inArray(e.tagName,this.selectorFilter)&&-1==this.inArray(e.tagName,this.excludedSelectorFilter)||"undefined"!=typeof e.id&&-1!=this.inArray("#"+e.id,this.selectorFilter)&&-1==this.inArray("#"+e.id,this.excludedSelectorFilter)||"undefined"!=typeof e.className&&-1!=this.inArray("."+e.className.replace(/ /g," ."),this.selectorFilter)&&-1==this.inArray("."+e.className.replace(/ /g," ."),this.excludedSelectorFilter))return!0}else if(0==this.selectorFilter.length&&-1==this.inArray(e.tagName,this.excludedSelectorFilter)&&-1==this.inArray("#"+e.id,this.excludedSelectorFilter)&&-1==this.inArray("."+e.className,this.excludedSelectorFilter))return!0;return!1},gp:function(e){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var t="[\\?&]"+e+"=([^&#]*)",r=new RegExp(t),o=r.exec(window.location.href);return null==o?null:o[1]},setParams:function(){for(var e=this,t=["af","eaf","sf","esf","ef","h","u","t"],r=["attributeFilter","excludedAttributeFilter","selectorFilter","excludedSelectorFilter","eventFilter","enableHistory","enableUndo","target"],o=0;o<t.length;o++){var s=decodeURI(e.gp(t[o]));"null"===s&&(s=decodeURI(e.gp(r[o]))),"null"!=s&&(e[r[o]]="m"==t[o]||"t"==t[o]?s:"true"!=s&&"false"!=s?s.split(" "):"true"==s?!0:!1,console.log(t[o],r[o],e[r[o]]))}},init:function(e){this.setParams(),this.getTarget(e);var t={subtree:!0,childList:!0,attributes:!0,attributeOldValue:!0,characterData:!0,characterDataOldValue:!0};"undefined"!=typeof this.attributeFilter&&0!=this.attributeFilter.length&&(t.attributeFilter=this.attributeFilter);for(var r=["WebKit","Moz","O","Ms",""],o=0;o<r.length;o++)r[o]+"MutationObserver"in window&&(this.mutationObserver=window[r[o]+"MutationObserver"]);this.showMessage("Mutation Observer Functionality: "+this.mutationObserver,"normal");var s=this,a=new this.mutationObserver(function(e){e.forEach(function(e){{var t=e.target.id,r=(e.target.className,e.target.tagName);e.target.ownerDocument.lastModified}if(s.isObserved(e.target)){try{var o=$(e.target).parentsUntil("html").map(function(){return this.tagName+(""!=this.className?"."+this.className:"")}).get().reverse().join(" > ")}catch(a){var o="NULL"}t="undefined"==typeof t||""==t?r:"#"+t,t=o+" > "+t,"attributes"==e.type&&-1==s.excludedAttributeFilter.indexOf(e.attributeName)?(s.showMessage(s.messages.attributeMutation.replace("<attributeName>",e.attributeName).replace("<oldValue>",e.oldValue).replace("<value>",$(e.target).prop(e.attributeName)).replace("<selector>",t),"attributeChanged"),"undefined"!=typeof e.target.id&&""!=e.target.id&&null!=e.target.id&&s.addHistoryBack(e.target.id,$(e.target).prop(e.attributeName))):"childList"==e.type&&(null!=e.addedNodes?s.showMessage(s.messages.addedChildren.replace("<totalChildren>",e.addedNodes.length).replace("<selector>",t),"added"):null!=e.removedNodes&&s.showMessage(s.messages.removedChildren.replace("<totalChildren>",e.removedNodes.length).replace("<selector>",t),"removed"))}})});a.observe(document,t);try{s.setUserEvents()}catch(n){window.onload=function(){s.setUserEvents()}}var i=JSON.parse(sessionStorage.getItem("bugLowUndo"));"undefined"!=typeof i&&null!=i&&""!=i&&(this.undo=i)},getTarget:function(e){this.target="undefined"!=typeof e?"console"==e?"console":"window":"console","window"==this.target&&(this.targetWindow=window.open("","bugLowWindow","toolbar=no, scrollbars=yes, resizable=yes, top=0, left=0, width=500, height=500"),this.targetWindow.document.body.innerHTML="",this.targetWindow.document.write("<style>body { background:"+this.colors.background+"; } h2 {background:"+this.colors.headerBackground+"; color:"+this.colors.headerForeground+"; padding:5px;}</style>"),this.targetWindow.document.write("<H2>bugLow 1.0 - Page loaded at "+this.getTime()+"</H2>")),this.showMessage("Target: "+this.target,"normal")},getTime:function(){var e=new Date,t=e.getDay(),r=e.getMonth()+1,o=e.getFullYear(),s=e.getHours(),a=e.getMinutes(),n=e.getSeconds(),i=e.getMilliseconds();return(10>t?"0"+t:t)+"/"+(10>r?"0"+r:r)+"/"+(10>o?"0"+o:o)+" "+(10>s?"0"+s:s)+":"+(10>a?"0"+a:a)+":"+(10>n?"0"+n:n)+"."+i},setUserEvents:function(){var e=this,t=e.eventFilter.join(" ");0==e.eventFilter.length&&(t="change click focusin focusout keydown"),$("body *").on(t,function(t){t.stopPropagation();var r=t.target.id,o=(t.target.className,t.target.tagName),s=t.type;if(e.isObserved(t.target)){try{var a=$(t.currentTarget).parentsUntil("html").map(function(){return this.tagName+(""!=this.className?"."+this.className:"")}).get().reverse().join(" > ")}catch(t){var a="NULL"}if(r="undefined"==typeof r||""==r?o:"#"+r,r=a+" > "+r,"change"==s)e.showMessage(e.messages.valueChanged.replace("<selector>",r).replace("<value>",$(t.target).val()),"valueChanged");else if("focusin"==s||"focus"==s)e.showMessage(e.messages.getsFocus.replace("<selector>",r),"focus");else if("focusout"==s||"blur"==s)e.showMessage(e.messages.losesFocus.replace("<selector>",r),"blur");else if("click"==s||"dblclick"==s)e.showMessage(e.messages.click.replace("<selector>",r),"click");else if("mouseenter"==s||"mouseover"==s)e.showMessage(e.messages.mouseOver.replace("<selector>",r),"mouseOver");else if("mouseleave"==s||"mouseout"==s)e.showMessage(e.messages.mouseOut.replace("<selector>",r),"mouseOut");else if("keydown"==s||"keyup"==s||"keypress"==s){var n=t.which?t.which:t.keyCode,i="",l="",d="";(t.shiftKey||16==n)&&(l+="Shift + ",d="16 + "),(t.ctrlKey||17==n)&&(l+="Ctrl + ",d="17 + "),(t.altKey||18==n)&&(l+="Alt + ",d="18 + "),i+=8==n?"Backspace":9==n?"Tab":13==n?"Enter":19==n?"Pause / Break":27==n?"Escape":19==n?"Pause / Break":33==n?"Page Up":34==n?"Page Down":35==n?"End":36==n?"Home":37==n?"Left Arrow":38==n?"Up Arrow":39==n?"Right Arrow":40==n?"Down Arrow":45==n?"Insert":46==n?"Delete":91==n?"Left window":92==n?"Right window":93==n?"Select key":96==n?"Numpad 0":97==n?"Numpad 1":98==n?"Numpad 2":99==n?"Numpad 3":100==n?"Numpad 4":101==n?"Numpad 5":102==n?"Numpad 6":103==n?"Numpad 7":104==n?"Numpad 8":105==n?"Numpad 9":106==n?"Multiply":107==n?"Add":109==n?"Subtract":110==n?"Decimal point":111==n?"Divide":112==n?"F1":113==n?"F2":114==n?"F3":115==n?"F4":116==n?"F5":117==n?"F6":118==n?"F7":119==n?"F8":120==n?"F9":121==n?"F10":122==n?"F11":123==n?"F12":144==n?"num lock":145==n?"scroll lock":186==n?"Semi-colon (;)":187==n?"Equal-sign (=)":188==n?"Comma (,)":189==n?"Dash (-)":190==n?"Period (.)":191==n?"Forward Slash (/)":192==n?"Grave Accent(`)":219==n?"Open Bracket ([)":220==n?"Back Slash (\\)":221==n?"Close Bracket (])":222==n?"Single Quote (')":String.fromCharCode(n),n>18&&(e.showMessage(e.messages.keyPress.replace("<selector>",r).replace("<keys>",l+i).replace("<keysCode>",d+n),"keyPress"),"undefined"!=typeof t.target.id&&""!=t.target.id&&null!=t.target.id&&(e.addHistoryBack(t.target.id,$(t.target).val()),$("#"+t.target.id).trigger("change")))}}})},addHistoryBack:function(e,t){if(this.enableUndo){var r=this.sha1(window.location.pathname);"undefined"==typeof this.undo[r]&&(this.undo[r]={});try{this.undo[r][e][this.undo[r][e].length-1]!=t&&(this.undo[r][e][this.undo[r][e].length]=t)}catch(o){this.undo[r][e]=new Array,this.undo[r][e][0]=t}sessionStorage.setItem("bugLowUndo",JSON.stringify(this.undo))}},historyBack:function(e){if(this.enableUndo)try{var t=this.sha1(window.location.pathname),r=this.undo[t][e].pop();if($("#"+e).val()==r)var r=this.undo[t][e].pop();return"undefined"!=typeof r&&null!=r&&""!=r?(0==this.undo[t][e].length&&delete this.undo[t][e],sessionStorage.setItem("bugLowUndo",JSON.stringify(this.undo)),this.addHistoryForward(e,$("#"+e).val()),$("#"+e).val(r),$("#"+e).trigger("change"),r):null}catch(o){}},addHistoryForward:function(e,t){if(this.enableUndo){var r=this.sha1(window.location.pathname);"undefined"==typeof this.redo[r]&&(this.redo[r]={});try{this.redo[r][e][this.redo[r][e].length-1]!=t&&(this.redo[r][e][this.redo[r][e].length]=t)}catch(o){this.redo[r][e]=new Array,this.redo[r][e][0]=t}sessionStorage.setItem("bugLowRedo",JSON.stringify(this.redo))}},historyForward:function(e){if(this.enableUndo)try{var t=this.sha1(window.location.pathname),r=this.redo[t][e].pop();if($("#"+e).val()==r)var r=this.undo[t][e].pop();return"undefined"!=typeof r&&null!=r&&""!=r?(0==this.redo[t][e].length&&delete this.redo[t][e],sessionStorage.setItem("bugLowRedo",JSON.stringify(this.redo)),this.addHistoryBack(e,$("#"+e).val()),$("#"+e).val(r),$("#"+e).trigger("change"),r):null}catch(o){}},getHistory:function(){var e=this.sha1(window.location.pathname);return this.history[e]},sha1:function(e){var t,r,o,s,a,n,i,l,d,c=function(e,t){var r=e<<t|e>>>32-t;return r},u=function(e){var t,r,o="";for(t=7;t>=0;t--)r=e>>>4*t&15,o+=r.toString(16);return o},h=new Array(80),g=1732584193,p=4023233417,f=2562383102,m=271733878,w=3285377520,y=e.length,b=[];for(r=0;y-3>r;r+=4)o=e.charCodeAt(r)<<24|e.charCodeAt(r+1)<<16|e.charCodeAt(r+2)<<8|e.charCodeAt(r+3),b.push(o);switch(y%4){case 0:r=2147483648;break;case 1:r=e.charCodeAt(y-1)<<24|8388608;break;case 2:r=e.charCodeAt(y-2)<<24|e.charCodeAt(y-1)<<16|32768;break;case 3:r=e.charCodeAt(y-3)<<24|e.charCodeAt(y-2)<<16|e.charCodeAt(y-1)<<8|128}for(b.push(r);b.length%16!=14;)b.push(0);for(b.push(y>>>29),b.push(y<<3&4294967295),t=0;t<b.length;t+=16){for(r=0;16>r;r++)h[r]=b[t+r];for(r=16;79>=r;r++)h[r]=c(h[r-3]^h[r-8]^h[r-14]^h[r-16],1);for(s=g,a=p,n=f,i=m,l=w,r=0;19>=r;r++)d=c(s,5)+(a&n|~a&i)+l+h[r]+1518500249&4294967295,l=i,i=n,n=c(a,30),a=s,s=d;for(r=20;39>=r;r++)d=c(s,5)+(a^n^i)+l+h[r]+1859775393&4294967295,l=i,i=n,n=c(a,30),a=s,s=d;for(r=40;59>=r;r++)d=c(s,5)+(a&n|a&i|n&i)+l+h[r]+2400959708&4294967295,l=i,i=n,n=c(a,30),a=s,s=d;for(r=60;79>=r;r++)d=c(s,5)+(a^n^i)+l+h[r]+3395469782&4294967295,l=i,i=n,n=c(a,30),a=s,s=d;g=g+s&4294967295,p=p+a&4294967295,f=f+n&4294967295,m=m+i&4294967295,w=w+l&4294967295}return d=u(g)+u(p)+u(f)+u(m)+u(w),d.toLowerCase()},inArray:function(e,t){if("undefined"==typeof e||-1!=e.indexOf("undefined")||"#"==e||"."==e)return-1;if("undefined"==typeof t||0==t.length)return-1;for(var r=t.length,o=e.toString().toLowerCase(),s=0;r>s;s++)if(-1!=t[s].indexOf(".")){for(var a=t[s],n=e.split(" "),i=0;i<n.length;i++)if(n[i]==a)return s}else if(t[s].toLowerCase()==o)return s;return-1},showMessage:function(e,t){function r(e){var t="";if("object"==typeof e)for(var s in e){var a=!1;try{a=1==Array.isArray(s)||parseFloat(s)>=0?!0:!1}catch(n){a=!1}"string"!=typeof e[s]||-1==e[s].indexOf("<pre>")&&-1==e[s].indexOf("</pre>")?(t+='<b style="color:'+this.colors.headerForeground+'">'+(0==o?1==a?s+" => [ ":s+" : ":"")+"</b>",o=!1,t+=r(e[s])+(0==o&&1==a?" ] ":"")+("console"==this.target?"\n":"<br/>")):(t+=e[s],o=!0)}else t+=e,o=!1;if(this.enableHistory){var i=this.sha1(window.location.pathname);"undefined"==typeof this.history[i]&&(this.history[i]="bugLow "+this.version+" - Page loaded at "+this.getTime()+"\n---------------------------------------------------\n"),this.history[i]+="["+this.getTime()+"]"+t+"\n"}return t}var o=!1,s="";if(s="undefined"==typeof t?this.colors.normal:this.colors[t],"console"==this.target||""==this.target){var a="["+this.getTime()+"] "+r(e);"error"==t?console.error(a):"warn"==t?console.warn(a):"info"==t?console.info(a):console.log(a)}else{var a="<span style='color:"+this.colors.normal+"'>["+this.getTime()+"]</span> ";a+='<span style="color:'+s+'">'+r(e)+"</span>";try{this.targetWindow.document.write(a+this.messages.separator)}catch(n){}}}};

// BugLog 1.0 (https://github.com/islavisual/bugLog). * Copyright 2014 Islavisual. 
// Licensed under MIT (https://github.com/islavisual/bugLog/blob/master/LICENSE). 
// Author: Pablo E. Fernández (islavisual@gmail.com)
// Last update: 09/01/2015
document.addEventListener("DOMContentLoaded", function(e){
    bugLog.showMessage(bugLog.messages.parsedPage, 'sending');
    $(document).ajaxSuccess(function (evt, jqxhr, settings) {
        var s = bugLog.messages.ajaxSuccess.replace('<method>', settings.async);
        s     = s.replace('<type>', settings.type);
        s     = s.replace('<crossDomain>', settings.crossDomain);
        s     = s.replace('<url>', settings.url);
        s     = s.replace('<contentType>', settings.contentType);
        bugLog.showMessage(s, 'updated');
    });

    $(document).ajaxError(function (evt, jqxhr, settings, err) {
        bugLog.showMessage(bugLog.messages.ajaxError+(bugLog.target=='console'?'\n':'<br/>')+" Status Error: "+jqxhr.status+(bugLog.target=='console'?'\n':'<br/>')+"Status Text: "+jqxhr.statusText+(bugLog.target=='console'?'\n':'<br/>')+"Description: "+jqxhr.responseText, 'error');
    });

    $(document).ajaxComplete(function (evt, jqxhr, settings) {
        var s = bugLog.messages.ajaxComplete.replace('<url>', settings.url);
        bugLog.showMessage(s, 'readyState');
    });
    $.ajaxSetup({
        beforeSend: function() {
            var s = bugLog.messages.ajaxBeforeSend.replace('<method>', this.async);
            s     = s.replace('<type>', this.type);
            s     = s.replace('<crossDomain>', this.crossDomain);
            s     = s.replace('<url>', this.url);
            s     = s.replace('<contentType>', this.contentType);
            bugLog.showMessage(s, 'proccessing');
        }
    });
});
document.onreadystatechange = function () {
    if (document.readyState == "interactive") {
        bugLog.showMessage(bugLog.messages.pageChangedStatus+" "+document.readyState, 'proccessing');
    } else{
        bugLog.showMessage(bugLog.messages.pageChangedStatus+" "+document.readyState, 'readyState');
    }

}
window.addEventListener('load', function(){ bugLog.showMessage(bugLog.messages.pageChangedStatus+" finished", 'updated'); } )
window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
    console.log(errorObj)
    alert('Error: ' + errorMsg + '\n' + 'Script: ' + url + '\n' + 'Line: ' + lineNumber + '\n' + 'Column: ' + column);
    return true;
}
var bugLog = {
    mode: '',
    target: '',
    targetWindow: null,
    mutationObserver: 'Not Supported',
    mutationAttributesFilter:[],
    mutationNotObserverAttributesFilter:['style'],
    enableHistory: false,
    history: {},
    enableUndo: true,
    undo: {},
    redo: {},
    messages:{
        ajaxBeforeSend:'Processing request. Method: <method>. Type: <type>. CrossDomain: <crossDomain>.  File: <url>. Content Type: <contentType>',
        ajaxComplete:'The Ajax processing request FINISHED for the <url> file.',
        ajaxSuccess:'The Ajax request was completed SUCCESSFULLY for the <url> file.',
        ajaxError:'An error occurred into Ajax processing request into <url> file.',
        beforeUnloadPage:'Page request unload',
        unloadPage:'Unloaded page',
        errorPage:'An error occurred into file',
        parsedPage:'Page loaded and parsed.',
        pageChangedStatus:'Page changed status:',
        valueChanged: 'The <selector> changed the value property to <value>.',
        getsFocus: '<selector> gets focus.',
        losesFocus: '<selector> loses focus.',
        click: 'User clicks into <selector>.',
        attributeMutation: 'The <attributeName> attribute has mutated from "<oldValue>" to "<value>" into <selector> element.',
        addedChildren: 'Added children into <selector> element. Total children: <totalChildren>',
        removedChildren: 'Removed children into <selector> element. Total children: <totalChildren>',
        mouseOver: 'The mouse pointer is over the <selector> element.',
        mouseOut: 'The mouse pointer leaves the <selector> element.',
        keyPress: 'Keyboard event received into <selector> element. Keys Combination: "<keys>". Keys Combination Code: "<keysCode>".',
        separator: '<div style="border: 1px solid #333; border-width: 0px 0px 1px 0px; height:5px; width:100%;margin-bottom: 5px;">&nbsp;</div>'
    },
    colors: {
        added:"#709050",
        attributeChanged: '#ff00ff',
        background:"#000000",
        blur:"#907080",
        focus:"#9070a0",
        click:"#909090",
        mouseOver:"#a07090",
        mouseOut:"#807090",
        keyPress:"#80a090",
        error: '#a02020',
        headerForeground:"#ffffff",
        headerBackground:"#333",
        normal:"#606060",
        proccessing:"#8AC007",
        readyState:"#8AC007",
        removed: "#a01010",
        sending:"#8AC007",
        updated:"#80a0e0",
        valueChanged:"#FE2466"
    },
    version: '1.0',
    init: function(mode, target){
        this.getMode(mode);
        this.getTarget(target);

        // Prepare MutationObserver options to normal use
        var MutationOptions = {subtree: true, childList: false, attributes: true, attributeOldValue: false, characterData: true, characterDataOldValue: false};
        if(this.mode == 'all'){
            // Prepare MutationObserver options to total control use
            var MutationOptions = {subtree: true, childList: true, attributes: true, attributeOldValue: true, characterData: true, characterDataOldValue: true};
        }
        if(typeof this.mutationAttributesFilter != 'undefined' && this.mutationAttributesFilter.length != 0) MutationOptions.attributeFilter = this.mutationAttributesFilter;

        // Mutation Observer feature detection
        var prefixes = ['WebKit', 'Moz', 'O', 'Ms', '']
        for(var i=0; i < prefixes.length; i++) {
            if(prefixes[i] + 'MutationObserver' in window) {
                this.mutationObserver = window[prefixes[i] + 'MutationObserver'];
            }
        }

        this.showMessage("Mutation Observer Functionality: "+this.mutationObserver, 'normal');

        var bugLogPlugin = this;

        var observer = new this.mutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                var id       = mutation.target.id;
                var classID  = mutation.target.className;
                var tagName  = mutation.target.tagName;
                var lastMod  = mutation.target.ownerDocument.lastModified;
                try {
                    var parents = $(mutation.target).parentsUntil('html') .map(function() { return this.tagName+(this.className!=""?('.'+this.className):''); }).get().reverse().join( " > " );
                } catch(e){
                    var parents = 'NULL';
                }

                if(typeof id == 'undefined' || id == '') id = tagName; else id = '#'+id;
                id = parents + " > " + id;

                if(mutation.type == "attributes" && bugLogPlugin.mutationNotObserverAttributesFilter.indexOf(mutation.attributeName) == -1 ){
                    bugLog.showMessage(bugLog.messages.attributeMutation.replace('<attributeName>', mutation.attributeName).replace('<oldValue>', mutation.oldValue).replace('<value>', $(mutation.target).prop(mutation.attributeName)).replace('<selector>', id), 'attributeChanged');

                    if(typeof mutation.target.id != "undefined" && mutation.target.id != '' && mutation.target.id != null){
                        bugLog.addHistoryBack(mutation.target.id, $(mutation.target).prop(mutation.attributeName));
                    }

                } else if(mutation.type == "childList"){
                    if( mutation.addedNodes != null ){
                        bugLog.showMessage(bugLog.messages.addedChildren.replace('<totalChildren>', mutation.addedNodes.length).replace('<selector>', id), 'added');
                    } else if( mutation.removedNodes != null ){
                        bugLog.showMessage(bugLog.messages.removedChildren.replace('<totalChildren>', mutation.removedNodes.length).replace('<selector>', id), 'removed');
                    }
                }
            });
        });

        observer.observe(document, MutationOptions);

        // Set Page Events (ready, load, unload and error)

        // Events control (change, focus, blur, click, ...) and call control files from Ajax and jQuery
        try{
            bugLog.setUserEvents();
        } catch(e){
            window.onload = function(){
                bugLog.setUserEvents();
            }
        }

        var sessionUndo = JSON.parse(sessionStorage.getItem('bugLogUndo'));
        if(typeof sessionUndo != 'undefined' && sessionUndo != null && sessionUndo != '') bugLog.undo = sessionUndo;

    },
    getMode: function(mode){
        // Get defined mode
        if(typeof mode != 'undefined'){
            if(mode == 'all') this.mode = 'all'; else this.mode = 'default';
        } else this.mode = 'default';

        this.showMessage("Mode: "+this.mode, 'normal');
    },
    getTarget: function(target){
        // Get type debugger
        if(typeof target != 'undefined'){
            if(target == 'console') this.target = 'console'; else this.target = 'window';
        } else this.target = 'console';

        if(this.target == 'window') {
            this.targetWindow = window.open("", "bugLogWindow", "toolbar=no, scrollbars=yes, resizable=yes, top=0, left=0, width=500, height=500");
            this.targetWindow.document.body.innerHTML = "";
            this.targetWindow.document.write('<style>body { background:'+bugLog.colors.background+'; } h2 {background:'+bugLog.colors.headerBackground+'; color:'+bugLog.colors.headerForeground+'; padding:5px;}</style>');
            this.targetWindow.document.write('<H2>BugLog 1.0 - Page loaded at '+this.getTime()+"</H2>");
        }

        this.showMessage("Target: "+this.target, 'normal');
        this.showMessage("Target Window: "+this.targetWindow, 'normal');
    },
    getTime: function(){
        var date = new Date();
        var d = date.getDay(), m = date.getMonth()+1, y = date.getFullYear(), h = date.getHours(), i = date.getMinutes(), s = date.getSeconds(), ms = date.getMilliseconds();
        return (d<10?"0"+d:d)+"/"+(m<10?"0"+m:m)+"/"+(y<10?"0"+y:y)+" "+(h<10?"0"+h:h)+":"+(i<10?"0"+i:i)+":"+(s<10?"0"+s:s)+"."+ms;
    },
    setUserEvents: function(){
        $('body *').on("change click focusin focusout mouseenter mouseleave keydown", function(e){
            e.stopPropagation();
            var id       = e.target.id;
            var classID  = e.target.className;
            var tagName  = e.target.tagName;
            var type     = e.type;
            try {
                var parents = $(e.currentTarget).parentsUntil('html') .map(function() { return this.tagName+(this.className!=""?('.'+this.className):''); }).get().reverse().join( " > " );
            } catch(e){
                var parents = 'NULL';
            }

            if(typeof id == 'undefined' || id == '') id = tagName; else id = '#'+id;
            id = parents + " > " + id;

            if(type == 'change'){
                bugLog.showMessage(bugLog.messages.valueChanged.replace("<selector>", id).replace("<value>", $(e.target).val()), 'valueChanged');

            } else if(type == 'focusin'){
                bugLog.showMessage(bugLog.messages.getsFocus.replace("<selector>", id), 'focus');
            } else if(type == 'focusout'){
                bugLog.showMessage(bugLog.messages.losesFocus.replace("<selector>", id), 'blur');
            } else if(type == 'click'){
                bugLog.showMessage(bugLog.messages.click.replace("<selector>", id), 'click');
            } else if(type == 'mouseenter' && this.mode == 'all'){
                bugLog.showMessage(bugLog.messages.mouseOver.replace("<selector>", id), 'mouseOver');
            } else if(type == 'mouseleave' && this.mode == 'all'){
                bugLog.showMessage(bugLog.messages.mouseOut.replace("<selector>", id), 'mouseOut');
            } else if(type == 'keydown'){
                var charCode = (e.which) ? e.which : e.keyCode;
                var strKey = "", strCombKey = "", codeCombKey = "";
                if(e.shiftKey || charCode == 16){ strCombKey += "Shift + "; codeCombKey = "16 + "; }
                if(e.ctrlKey  || charCode == 17){ strCombKey += "Ctrl + ";  codeCombKey = "17 + "; }
                if(e.altKey   || charCode == 18){ strCombKey += "Alt + ";   codeCombKey = "18 + "; }

                if(charCode == 8) strKey += 'Backspace';
                else if(charCode == 9) strKey += 'Tab';
                else if(charCode == 13) strKey += 'Enter';
                else if(charCode == 19) strKey += 'Pause / Break';
                else if(charCode == 27) strKey += 'Escape';
                else if(charCode == 19) strKey += 'Pause / Break';
                else if(charCode == 33) strKey += 'Page Up';
                else if(charCode == 34) strKey += 'Page Down';
                else if(charCode == 35) strKey += 'End';
                else if(charCode == 36) strKey += 'Home';
                else if(charCode == 37) strKey += 'Left Arrow';
                else if(charCode == 38) strKey += 'Up Arrow';
                else if(charCode == 39) strKey += 'Right Arrow';
                else if(charCode == 40) strKey += 'Down Arrow';
                else if(charCode == 45) strKey += 'Insert';
                else if(charCode == 46) strKey += 'Delete';
                else if(charCode == 91) strKey +="Left window";
                else if(charCode == 92) strKey +="Right window";
                else if(charCode == 93) strKey +="Select key";
                else if(charCode == 96) strKey +="Numpad 0";
                else if(charCode == 97) strKey +="Numpad 1";
                else if(charCode == 98) strKey +="Numpad 2";
                else if(charCode == 99) strKey +="Numpad 3";
                else if(charCode == 100) strKey +="Numpad 4";
                else if(charCode == 101) strKey +="Numpad 5";
                else if(charCode == 102) strKey +="Numpad 6";
                else if(charCode == 103) strKey +="Numpad 7";
                else if(charCode == 104) strKey +="Numpad 8";
                else if(charCode == 105) strKey +="Numpad 9";
                else if(charCode == 106) strKey +="Multiply";
                else if(charCode == 107) strKey +="Add";
                else if(charCode == 109) strKey +="Subtract";
                else if(charCode == 110) strKey +="Decimal point";
                else if(charCode == 111) strKey +="Divide";
                else if(charCode == 112) strKey +="F1";
                else if(charCode == 113) strKey +="F2";
                else if(charCode == 114) strKey +="F3";
                else if(charCode == 115) strKey +="F4";
                else if(charCode == 116) strKey +="F5";
                else if(charCode == 117) strKey +="F6";
                else if(charCode == 118) strKey +="F7";
                else if(charCode == 119) strKey +="F8";
                else if(charCode == 120) strKey +="F9";
                else if(charCode == 121) strKey +="F10";
                else if(charCode == 122) strKey +="F11";
                else if(charCode == 123) strKey +="F12";
                else if(charCode == 144) strKey +="num lock";
                else if(charCode == 145) strKey +="scroll lock";
                else if(charCode == 186) strKey +="Semi-colon (;)"; // semi-colon
                else if(charCode == 187) strKey +="Equal-sign (=)"; //
                else if(charCode == 188) strKey +="Comma (,)"; // comma
                else if(charCode == 189) strKey +="Dash (-)"; // dash
                else if(charCode == 190) strKey +="Period (.)";
                else if(charCode == 191) strKey +="Forward Slash (/)";
                else if(charCode == 192) strKey +="Grave Accent(`)";
                else if(charCode == 219) strKey +="Open Bracket ([)";
                else if(charCode == 220) strKey +="Back Slash (\\)";
                else if(charCode == 221) strKey +="Close Bracket (])";
                else if(charCode == 222) strKey +="Single Quote (')";
                else strKey += String.fromCharCode(charCode);

                if(charCode > 18){
                    bugLog.showMessage(bugLog.messages.keyPress.replace("<selector>", id).replace("<keys>", strCombKey+strKey).replace("<keysCode>", codeCombKey+charCode), 'keyPress');
                    if(typeof e.target.id != "undefined" && e.target.id != '' && e.target.id != null){
                        bugLog.addHistoryBack(e.target.id, $(e.target).val());
                    }
                }
            }
        });
    },
    addHistoryBack: function (id, value){
        if(bugLog.enableUndo){
            var path = bugLog.sha1(window.location.pathname);

            if(typeof bugLog.undo[path] == 'undefined'){ bugLog.undo[path] = {}; }
            try {
                if(bugLog.undo[path][id][bugLog.undo[path][id].length-1] != value) bugLog.undo[path][id][bugLog.undo[path][id].length] = value;
            } catch (e){
                bugLog.undo[path][id] = new Array();
                bugLog.undo[path][id][0] = value;
            }
            sessionStorage.setItem('bugLogUndo', JSON.stringify(bugLog.undo));
        }
    },
    historyBack: function(id){
        if(bugLog.enableUndo){
            try {
                var path = bugLog.sha1(window.location.pathname);
                var value = bugLog.undo[path][id].pop();
                if($('#'+id).val() ==  value) var value = bugLog.undo[path][id].pop();

                if(typeof value !== 'undefined' && value != null && value != ""){
                    if(bugLog.undo[path][id].length == 0) delete bugLog.undo[path][id];
                    sessionStorage.setItem('bugLogUndo', JSON.stringify(bugLog.undo));
                    bugLog.addHistoryForward(id, $('#'+id).val());
                    $('#'+id).val(value);

                    return value;
                }

                return null;
            } catch(e){ }
        }
    },
    addHistoryForward: function (id, value){
        if(bugLog.enableUndo){
            var path = bugLog.sha1(window.location.pathname);

            if(typeof bugLog.redo[path] == 'undefined'){ bugLog.redo[path] = {}; }
            try {
                if(bugLog.redo[path][id][bugLog.redo[path][id].length-1] != value) bugLog.redo[path][id][bugLog.redo[path][id].length] = value;
            } catch (e){
                bugLog.redo[path][id] = new Array();
                bugLog.redo[path][id][0] = value;
            }
            sessionStorage.setItem('bugLogRedo', JSON.stringify(bugLog.redo));
        }
    },
    historyForward: function(id){
        if(bugLog.enableUndo){
            try {
                var path = bugLog.sha1(window.location.pathname);
                var value = bugLog.redo[path][id].pop();
                if($('#'+id).val() ==  value) var value = bugLog.undo[path][id].pop();

                if(typeof value != 'undefined' && value != null && value != ""){
                    if(bugLog.redo[path][id].length == 0) delete bugLog.redo[path][id];
                    sessionStorage.setItem('bugLogRedo', JSON.stringify(bugLog.redo));
                    bugLog.addHistoryBack(id, $('#'+id).val());
                    $('#'+id).val(value);

                    return value;
                }

                return null;
            } catch(e){ }
        }
    },
    getHistory: function(){
        var path = bugLog.sha1(window.location.pathname);
        return bugLog.history[path];
    },
    sha1:function(str){
        var rotate_left=function(e,t){var n=e<<t|e>>>32-t;return n};var cvt_hex=function(e){var t="";var n;var r;for(n=7;n>=0;n--){r=e>>>n*4&15;t+=r.toString(16)}return t};var blockstart,i,j,W=new Array(80),H0=1732584193,H1=4023233417,H2=2562383102,H3=271733878,H4=3285377520,A,B,C,D,E,temp,str_len=str.length,word_array=[];for(i=0;i<str_len-3;i+=4){j=str.charCodeAt(i)<<24|str.charCodeAt(i+1)<<16|str.charCodeAt(i+2)<<8|str.charCodeAt(i+3);word_array.push(j)}switch(str_len%4){case 0:i=2147483648;break;case 1:i=str.charCodeAt(str_len-1)<<24|8388608;break;case 2:i=str.charCodeAt(str_len-2)<<24|str.charCodeAt(str_len-1)<<16|32768;break;case 3:i=str.charCodeAt(str_len-3)<<24|str.charCodeAt(str_len-2)<<16|str.charCodeAt(str_len-1)<<8|128;break}word_array.push(i);while(word_array.length%16!=14){word_array.push(0)}word_array.push(str_len>>>29);word_array.push(str_len<<3&4294967295);for(blockstart=0;blockstart<word_array.length;blockstart+=16){for(i=0;i<16;i++){W[i]=word_array[blockstart+i]}for(i=16;i<=79;i++){W[i]=rotate_left(W[i-3]^W[i-8]^W[i-14]^W[i-16],1)}A=H0;B=H1;C=H2;D=H3;E=H4;for(i=0;i<=19;i++){temp=rotate_left(A,5)+(B&C|~B&D)+E+W[i]+1518500249&4294967295;E=D;D=C;C=rotate_left(B,30);B=A;A=temp}for(i=20;i<=39;i++){temp=rotate_left(A,5)+(B^C^D)+E+W[i]+1859775393&4294967295;E=D;D=C;C=rotate_left(B,30);B=A;A=temp}for(i=40;i<=59;i++){temp=rotate_left(A,5)+(B&C|B&D|C&D)+E+W[i]+2400959708&4294967295;E=D;D=C;C=rotate_left(B,30);B=A;A=temp}for(i=60;i<=79;i++){temp=rotate_left(A,5)+(B^C^D)+E+W[i]+3395469782&4294967295;E=D;D=C;C=rotate_left(B,30);B=A;A=temp}H0=H0+A&4294967295;H1=H1+B&4294967295;H2=H2+C&4294967295;H3=H3+D&4294967295;H4=H4+E&4294967295}temp=cvt_hex(H0)+cvt_hex(H1)+cvt_hex(H2)+cvt_hex(H3)+cvt_hex(H4); return temp.toLowerCase();
    },
    showMessage: function (message, type){
        var woname = false;
        function object2String(message) {
            var output = '';
            if(typeof(message) == 'object') {
                for(var phrase in message) {
                    var isArr = false;
                    try {isArr = (Array.isArray(phrase)==true||parseFloat(phrase)>=0)?true:false; } catch(e){ isArr = false; }
                    if(typeof message[phrase] == 'string' && (message[phrase].indexOf("<pre>") != -1 || message[phrase].indexOf("</pre>") != -1)){
                        output += message[phrase];
                        woname = true;
                    } else {
                        output += '<b style="color:'+bugLog.colors.headerForeground+'">'+(woname==false?(isArr==true?(phrase + ' => [ '):(phrase + ' : ')):'')+'</b>';
                        woname = false;
                        output += object2String(message[phrase]) + (woname==false?(isArr==true?' ] ':''):'') + (bugLog.target=='console'?'\n':'<br/>');
                    }
                }
            }else {
                output += message;
                woname = false;
            }

            if(bugLog.enableHistory){
                var path = bugLog.sha1(window.location.pathname);
                if(typeof bugLog.history[path] == 'undefined'){ bugLog.history[path] = 'BugLog '+bugLog.version+' - Page loaded at '+bugLog.getTime()+"\n---------------------------------------------------\n"; }

                bugLog.history[path] += "[" + bugLog.getTime() + "]" + output + "\n";
            }

            return output;
        }

        var typeColor = '';
        if(typeof type == 'undefined'){
            typeColor = bugLog.colors.normal;
        } else {
            typeColor = bugLog.colors[type];
        }

        if(this.target == 'console' || this.target == ''){
            var msg = "[" + this.getTime() + "] "+object2String(message);
            if(type == 'error') console.error(msg);
            else if(type == 'warn') console.warn(msg);
            else if(type == 'info') console.info(msg);
            else console.log(msg);
        } else {
            var msg = "<span style='color:"+bugLog.colors.normal+"'>[" + this.getTime() + "]</span> ";
            msg += '<span style="color:'+typeColor+'">'+object2String(message)+'</span>';
            try{ this.targetWindow.document.write(msg+bugLog.messages.separator); } catch(e){}
        }
    }
}; 

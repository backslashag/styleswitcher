var bs_styleswitch = {
	defaults : {
		titleprefix : 'fontsize',
		chooserelement : '#styleswitcher',
		displaychooser : false,
		cssfiles : [],
		enableiframe : false
		}
	,	
	init: function (config) {
		var prop;
		if (config) {
			for (prop in config) {
				bs_styleswitch.defaults[prop] = config[prop];
			}
		}
		return this;
		},
	onload : function () {
		bs_styleswitch.setSwitcherClass();
		},
	setSwitcherClass : function (){
		var c = readCookie('stylesheet');
		var s = readCookie('stylesheetinvertstate');
		var n = readCookie('stylesheetinvert');
		
		bs_styleswitch.activateLinks();
		if( bs_styleswitch.defaults.enableiframe ){
			bs_styleswitch.addIframeLoader();
			}
			
		if (c) {
			bs_styleswitch.switchStylesheet(c);
			}
		if (n) {
			bs_styleswitch.switchStylesheetInvert(n);
			}
		if( bs_styleswitch.defaults.displaychooser ) {
			$(bs_styleswitch.defaults.chooserelement).show(); 
			}
		}
	,
	
	addIframeLoader : function (){
		$('iframe').on('load', function() {
   			bs_styleswitch.checkParentStyle();
		});
	}	
	,
	checkParentStyle : function (){
		var c = readCookie('stylesheet');
		if (c) {
			bs_styleswitch.switchStyleSheetIFrame(c);
			}
		}
	,
	
	createStylesheets : function(){
		for(var i=0; i<bs_styleswitch.defaults.cssfiles.length; i++){
			var newTitle = i+1;
			newTitle = bs_styleswitch.defaults.titleprefix+newTitle.toString();
			bs_styleswitch.createStyleSheetByName(newTitle);
			}
		}
	,
	createStyleSheetByName : function(sName){
		var configItem = sName.replace(bs_styleswitch.defaults.titleprefix, '');
		if(!isNaN(configItem)){
			var fileref=document.createElement("link");
				fileref.setAttribute("rel", "alternate stylesheet");
  				fileref.setAttribute("type", "text/css");
				fileref.setAttribute("media", "screen");
  				fileref.setAttribute("href", bs_styleswitch.defaults.cssfiles[configItem-1]);
				fileref.setAttribute("title", sName);
				if (typeof fileref != "undefined"){
					document.getElementsByTagName("head")[0].appendChild(fileref);
				}
			}
		}
	,
	activateLinks : function (){
		for(var i=0; i<bs_styleswitch.defaults.cssfiles.length; i++){
			var newTitle = i+1;
			newTitle = bs_styleswitch.defaults.titleprefix+newTitle.toString();
			bs_styleswitch.activateLink(newTitle);
			}
		}
	,
	activateLink : function (e){
		var el = document.getElementById(e);
		if(el != null ){
			el.onclick = function(){
				bs_styleswitch.switchStylesheet(e);
				return false;
				};
			}
		}
	,
	switchStylesheet : function (styleName){
		var a,i;
		var s = readCookie('stylesheetinvert');
		var hasEl = false;
		var lastTry = false;
		if(arguments.length>1){
			lastTry = arguments[1];
			}
		for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
			if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("rel").indexOf("alternate") != -1 && a.getAttribute("title") && a.getAttribute("title") != s) {
				a.disabled = true;
 				if(a.getAttribute("title") == styleName) {
					a.disabled = false;
					hasEl = true;
					}
				}
			}
		if(!lastTry && !hasEl){
			bs_styleswitch.createStyleSheetByName(styleName);
			bs_styleswitch.switchStylesheet(styleName, true);
			}	
			
		if(bs_styleswitch.defaults.enableiframe){
			bs_styleswitch.switchStyleSheetIFrame(styleName);
		
			}
		bs_styleswitch.styleHighlight(styleName);
		createCookie('stylesheet', styleName, 365);
		}
	,
	switchStyleSheetIFrame : function (styleName){
		var a,i;
		var s = readCookie('stylesheetinvert');
		var hasEl = false;
		var lastTry = false;
		var aryIFr = document.getElementsByTagName('iframe');
		try{
		if(arguments.length>1){
			lastTry = arguments[1];
			}
		
		for(i = 0; i < aryIFr.length; i++ ){
			var objFrame = aryIFr[i];
			var obj = (objFrame.contentDocument) ? objFrame.contentDocument : (objFrame.contentWindow) ? objFrame.contentWindow.document : (window.frames && window.frames[aID]) ? window.frames[aID].document : (objFrame.document) ? objFrame.document : null;	
			hasEl = false;	
			for(i=0; (a = obj.getElementsByTagName("link")[i]); i++) {
				if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("rel").indexOf("alternate") != -1 && a.getAttribute("title") && a.getAttribute("title") != s) {
					a.disabled = true;
 					if(a.getAttribute("title") == styleName) {
						a.disabled = false;
						hasEl = true;
						}
					}
				}
			if(!hasEl && !lastTry){
				//
				var configItem = styleName.replace(bs_styleswitch.defaults.titleprefix, '');
				if(!isNaN(configItem)){
					var fileref=document.createElement("link");
					fileref.setAttribute("rel", "alternate stylesheet");
  					fileref.setAttribute("type", "text/css");
					fileref.setAttribute("media", "screen");
  					fileref.setAttribute("href", bs_styleswitch.defaults.cssfiles[configItem-1]);
					fileref.setAttribute("title", styleName);
					if (typeof fileref != "undefined"){
						obj.getElementsByTagName("head")[0].appendChild(fileref);
						}
					}
				bs_styleswitch.switchStyleSheetIFrame(styleName, true);
				}
			}
		}
		catch(e){}
		}
	,
	styleHighlight : function (newStyle){
		$('.styleswitcher_active').removeClass('styleswitcher_active');
		$('#'+newStyle).addClass('styleswitcher_active');
		}
	,
	switchStylesheetInvert: function (styleName){
		var a, state = true;
		var s = readCookie('stylesheetinvertstate');
		if(s != 'false' && s != 'undefined') {state = false; }
		for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
			if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("rel").indexOf("alternate") != -1 && a.getAttribute("title") && a.getAttribute("title") == styleName) {
				if(state) {
					a.disabled = true;
					$('#'+styleName).addClass('styleswitcherinvert_active');
					}
 				else{
					a.disabled = false;
					$('#'+styleName).removeClass('styleswitcherinvert_active');
					}
				}
			}
		createCookie('stylesheetinvertstate', state, 365);
		createCookie('stylesheetinvert', styleName, 365);
		}	
	};
function createCookie(name,value,days){
	if (days){
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
		}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
	}
function readCookie(name){
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++){
		var c = ca[i];
		while (c.charAt(0)==' ') {c = c.substring(1,c.length);}
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
	return null;
	}
function eraseCookie(name){createCookie(name,"",-1);}

//var conbycloudURL = "http://pub108.selfip.net:88/cloud/index.php";
//var conbycloudURL = "http://labs.conby.com/logger";
//var conbycloudURL = "http://conby123.appspot.com/logger";
var conbycloudURL = "http://conby.com/c3/logger.gif";

function GetCookieVal(offset)
{
  var endstr = document.cookie.indexOf (";", offset);
  if (endstr == -1)
    endstr = document.cookie.length;
  return unescape(document.cookie.substring(offset, endstr));
}

function SetCookie(name, value)
{
  var expdate = new Date();
  var argv = SetCookie.arguments;
  var argc = SetCookie.arguments.length;
  var expires = (argc > 2) ? argv[2] : null;
  var path = (argc > 3) ? argv[3] : null;
  var domain = (argc > 4) ? argv[4] : null;
  var secure = (argc > 5) ? argv[5] : false;
  if(expires!=null) expdate.setTime(expdate.getTime() + ( expires * 1000 ));
  document.cookie = name + "=" + escape (value) +((expires == null) ? "" : ("; expires="+ expdate.toGMTString()))
    +((path == null) ? "" : ("; path=" + path)) +((domain == null) ? "" : ("; domain=" + domain))
    +((secure == true) ? "; secure" : "");
}

function GetCookie(name)
{
  var arg = name + "=";
  var alen = arg.length;
  var clen = document.cookie.length;
  var i = 0;
  while (i < clen)
  {
    var j = i + alen;
    if (document.cookie.substring(i, j) == arg)
      return GetCookieVal (j);
    i = document.cookie.indexOf(" ", i) + 1;
    if (i == 0) break;
  }
  return null;
}

function cc_plugMoz(cc_pl) {
	if (cc_tm.indexOf(cc_pl) != -1 && (navigator.mimeTypes[cc_pl].enabledPlugin != null))
		return '1';
	return '0';
}
function cc_plugIE(cc_plug){
	cc_find = false;
	document.write('<SCR' + 'IPT LANGUAGE=VBScript>\n on error resume next \n cc_find = IsObject(CreateObject("' + cc_plug + '")) </SCR' + 'IPT>\n');
	if (cc_find) return '1';
	return '0';
}

function cc_pad(num, n) {
    var len = num.toString().length;
    while(len < n) {
        num = num + '0';
        len++;
    }
    return num;
}

Date.prototype.format = function(format) //author: meizz
{
	var o = {
	  "M+" : this.getMonth()+1, //month
	  "d+" : this.getDate(), //day
	  "h+" : this.getHours(), //hour
	  "m+" : this.getMinutes(), //minute
	  "s+" : this.getSeconds(), //second
	  "q+" : Math.floor((this.getMonth()+3)/3), //quarter
	  "S" : this.getMilliseconds() //millisecond
	}
	if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
	  (this.getFullYear()+"").substr(4 - RegExp.$1.length));
	for(var k in o)if(new RegExp("("+ k +")").test(format))
	  format = format.replace(RegExp.$1,
	  RegExp.$1.length==1 ? o[k] :
	  ("00"+ o[k]).substr((""+ o[k]).length));
	return format;
}

var cc_jav='0'; if(navigator.javaEnabled()) cc_jav='1';
var cc_agent = navigator.userAgent.toLowerCase();
var cc_moz = (navigator.appName.indexOf("Netscape") != -1);
var cc_ie= (cc_agent.indexOf("msie") != -1);
var cc_win = ((cc_agent.indexOf("win") != -1) || (cc_agent.indexOf("32bit") != -1));
// Determine if cookie enabled
var cc_cookie=(navigator.cookieEnabled)? '1' : '0';

//if not IE4+ nor NS6+
if ((typeof (navigator.cookieEnabled) =="undefined") && (cc_cookie == '0')) { 
	document.cookie="cc_testcookie"
	cc_cookie=(document.cookie.indexOf("cc_testcookie")!=-1)? '1' : '0';
}

if(cc_cookie == '1')
{
	if(GetCookie('ccc_id')== null) {
	  var cct_id = cc_pad(new Date().format("yyyyMMddhhmmssS"),20);
	  SetCookie('ccc_id',cct_id,3153600000,'/','.conby.com');
	}
}

var cc_dir = '0'; 
var cc_fla = '0'; 
var cc_pdf = '0'; 
var cc_qt = '0'; 
var cc_rea = '0'; 
var cc_wma = '0'; 

if (!cc_win || cc_moz){
	var cc_tm = '';
	for (var i=0; i < navigator.mimeTypes.length; i++)
		cc_tm += navigator.mimeTypes[i].type.toLowerCase();
	cc_dir = cc_plugMoz("application/x-director");
	cc_fla = cc_plugMoz("application/x-shockwave-flash");
	cc_pdf = cc_plugMoz("application/pdf");
	cc_qt = cc_plugMoz("video/quicktime");
	cc_rea = cc_plugMoz("audio/x-pn-realaudio-plugin");
	cc_wma = cc_plugMoz("application/x-mplayer2");
} else if (cc_win && cc_ie){
	cc_dir = cc_plugIE("SWCtl.SWCtl.1");
	cc_fla = cc_plugIE("ShockwaveFlash.ShockwaveFlash.1");
	if (cc_plugIE("PDF.PdfCtrl.1") == '1' || cc_plugIE('PDF.PdfCtrl.5') == '1' || cc_plugIE('PDF.PdfCtrl.6') == '1') 
		cc_pdf = '1';
	cc_qt = cc_plugIE("Quicktime.Quicktime"); // Old : "QuickTimeCheckObject.QuickTimeCheck.1"
	cc_rea = cc_plugIE("rmocx.RealPlayer G2 Control.1");
	cc_wma = cc_plugIE("wmplayer.ocx"); // Old : "MediaPlayer.MediaPlayer.1"

}
	
var cc_do = document;
var cc_rtu = '';
try {cc_rtu = top.cc_do.referrer;} catch(e) {
	if (parent) {
		if (parent.cc_getReferer) {
			try {cc_rtu = parent.cc_getReferer;} catch(E3) {cc_rtu = '';}
		}
		else  {
			try {cc_rtu = parent.document.referrer;} catch(E) {
				try {cc_rtu = document.referrer;} catch(E2) {cc_rtu = '';}
			}
		}
		parent.cc_getReferer = document.location.href;
	}
	else {
		try {cc_rtu = document.referrer;} catch(E3) {cc_rtu = '';}
	}
}
// Get the url to call conbycloud
function cc_getUrlStat(cc_urlPmv, cc_urlDoc, cc_typeClick)
{
	var cc_da = new Date();
	var cc_src = cc_urlPmv;
	cc_src += '?url='+escape(cc_urlDoc);
	cc_src += '&res='+screen.width+'x'+screen.height+'&col='+screen.colorDepth;
	cc_src += '&h='+cc_da.getHours()+'&m='+cc_da.getMinutes()+'&s='+cc_da.getSeconds();
	cc_src += '&flash='+cc_fla+'&director='+cc_dir+'&quicktime='+cc_qt+'&realplayer='+cc_rea;
	cc_src += '&pdf='+cc_pdf+'&windowsmedia='+cc_wma+'&java='+cc_jav+'&cookie='+cc_cookie;
	if ((cc_typeClick) && (cc_typeClick != "")) cc_src += '&type='+escape(cc_typeClick);
	cc_src += '&ref='+escape(cc_rtu);
	var cccid = GetCookie('ccc_id');
	if(cccid != null)
	cc_src += '&cccid='+escape(cccid);

	return cc_src;
}

// Log current page
function cc_log(cc_urlPmv)
{
	var cc_urlCur = cc_do.location.href;
	var cc_pos = cc_urlCur.indexOf("//");
	if (cc_pos > 0) {
		cc_urlCur = cc_urlCur.substr(cc_pos);
	}
	var cc_src = cc_getUrlStat(cc_urlPmv, cc_urlCur); 
	cc_do.writeln('<img src="'+cc_src+'" alt="" style="border:0" width=0 height=0 />');
}
//cc_log(conbycloudURL);
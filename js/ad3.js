/*
document.ns = navigator.appName == "Netscape"
window.screen.width>800 ? imgheight=120:imgheight=180
window.screen.width>800 ? imgright=9:imgright=120

function ad3load()
{ 
if (navigator.appName == "Netscape")
{document.ad3.pageY=pageYOffset+window.innerHeight-imgheight;
document.ad3.pageX=imgright;
ad3move();
}
else
{
ad3.style.top=document.body.scrollTop+document.body.offsetHeight-imgheight;
ad3.style.right=imgright;
ad3move();
}
}
function ad3move()
{
if(document.ns)
{
document.ad3.top=pageYOffset+60
document.ad3.right=imgright;
setTimeout("ad3move();",80)
}
else
{
//alert(window.screen.width);
if(document.body.offsetWidth>800)
ad3.style.top=document.body.scrollTop+60;
else
ad3.style.top=document.body.scrollTop-800;
ad3.style.right=imgright;
setTimeout("ad3move();",80)
}
}

function MM_reloadPage(init) { //reloads the window if Nav4 resized
if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}
MM_reloadPage(true)


if (navigator.appName == "Netscape")
{document.write("<layer id=ad3 top=300 width=0 height=0><a href='#' target=_blank><img src=images/ad35.jpg border=0 width=0 height=0></a></layer>");
ad3load()}
else
{
document.write("<div id=ad3 style='position: absolute;width:64;top:300;visibility: visible;z-index: 1'><a href='#' target=_blank><img src=images/ad35.jpg border=0 ></a> <PARAM NAME=quality VALUE=high></OBJECT></div>");
ad3load()
}

*/
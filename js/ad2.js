/*
document.ns = navigator.appName == "Netscape"
window.screen.width>800 ? imgheight=120:imgheight=180
window.screen.width>800 ? imgright=15:imgright=120

function ad2load()
{
if (navigator.appName == "Netscape")
{document.ad2.pageY=pageYOffset+window.innerHeight-imgheight;
document.ad2.pageX=imgright;
ad2move();
}
else
{
ad2.style.top=document.body.scrollTop+document.body.offsetHeight-imgheight;
ad2.style.right=imgright;
ad2move();
}
}
function ad2move()
{
if(document.ns)
{
document.ad2.top=pageYOffset+window.innerHeight-imgheight
document.ad2.right=imgright+890;
setTimeout("ad2move();",80)
}
else
{
if(document.body.offsetWidth>800)
ad2.style.top=document.body.scrollTop+document.body.offsetHeight-imgheight;
else
ad2.style.top=document.body.scrollTop-800;
ad2.style.right=imgright+890;
setTimeout("ad2move();",80)
}
}

function MM_reloadPage(init) { //reloads the window if Nav4 resized
if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}
MM_reloadPage(true)


if (navigator.appName == "Netscape")
{document.write("<layer id=ad2 top=300 width=0 height=0><a href=# target=_blank><img src=images/80x80left.gif width=0 height=0></a></layer>");
ad2load()}
else
{
document.write("<div id=ad2 style='position: absolute;width:64;top:300;visibility: visible;z-index: 1'><a href=# target=_blank><img src=images/80x80left.gif border=0 ></a> <PARAM NAME=quality VALUE=high></OBJECT></div>");
ad2load()
}
*/
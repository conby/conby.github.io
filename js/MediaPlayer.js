//scripted by allen

var curBroad = broadFile;
var curNarrow = narrowFile;
var curFile = broadFile;

var flag = true;
function GetObj(objName){
	if(document.getElementById){
		return eval('document.getElementById("' + objName + '")');
	}else{
		return eval('document.all.' + objName);
	}
}

document.writeln("	<table width=359 border=0 cellpadding=0 cellspacing=0 bgcolor=#ffffff>");
document.writeln("	<tr>");
document.writeln("	<td width=22><img src=images/dongman/vod000.gif width=22 height=23></td>");
document.writeln("	<td background=images/dongman/vod001.gif>&nbsp;</td>");
document.writeln("	<td width=17><img src=images/dongman/vod002.gif width=17 height=23></td>");
document.writeln("	</tr>");
document.writeln("	<tr>");
document.writeln("	<td><img src=images/dongman/vod020.gif width=22 height=264></td>");
document.writeln("	<td bgcolor=#000000>");
document.writeln("	<div id='hideScreen' style='display:block;'><div class=aWhite style='text-align:center;'><a href='javascript:toPlay()' class=vv01><img src="+iniPic+" width=252 height=197 style='margin-bottom:5px;' alt='点击播放该视频' border=0><br/>"+iniText+"</a></div></div><div id='myScreen' style='display:none;'>");
document.writeln("		<OBJECT ID='MediaPlayer' height='240' width='320' CLASSID='CLSID:BCB10729-E59E-409F-8BDC-25A7E08F73D2' STANDBY='Loading Windows Media Player components...' TYPE='application/x-oleobject' VIEWASTEXT>");
document.writeln("			<PARAM NAME=_Version VALUE=65536>");
document.writeln("			<PARAM NAME=_ExtentX VALUE=32000>");
document.writeln("			<PARAM NAME=_ExtentY VALUE=24000>");
document.writeln("			<PARAM NAME=_StockProps VALUE=0>");
document.writeln("		</OBJECT>");
document.writeln("	</div><div id='tempDiv' style='display:none;'></div>");
document.writeln("	</td>");
document.writeln("	<td><img src=images/dongman/vod021.gif width=17 height=264></td>");
document.writeln("	</tr>");
document.writeln("	</table>");
document.writeln("	<table width=359 border=0 cellpadding=0 cellspacing=0>");
document.writeln("	<tr>");
document.writeln("	<td width=22 style='POSITION: relative;z-index:0;'>");
document.writeln("		<div id='PlayState' style='OVERFLOW: hidden;POSITION: absolute;left:22px;top:0px;color:#070707;z-index:99;width:200px;'></div><img src=images/dongman/vod005.gif width=22 height=77></td>");
document.writeln("	<td background=images/dongman/vod006.gif>&nbsp;</td>");
document.writeln("	<td width=28><img src=images/dongman/vod007.gif width=28 height=77></td>");
document.writeln("	<td width=48><img id=playControl src=images/dongman/vod008.gif width=48 height=77 style='cursor:pointer;' onClick='toPlay()' alt='播放/暂停'></td>");
document.writeln("	<td width=28 width=28><img id=stopControl src=images/bnmpjs/vod025.gif width=28 height=77 style='cursor:pointer;' onClick=toStop() alt='停止'></td>");
document.writeln("	<td width=218 valign=top>");
document.writeln("		<table width=218 border=0 cellpadding=0 cellspacing=0>");
document.writeln("		<tr bgcolor=#F9FFFF>");
document.writeln("		<td></td>");
document.writeln("		<td></td>");
document.writeln("		<td width=21><img src=images/dongman/vod012.gif width=21 height=12></td>");
document.writeln("		</tr>");
document.writeln("		<tr>");
document.writeln("		<td width=40 bgcolor=#FBFFFF></td>");
document.writeln("		<td id='pZone' onmousedown='mouseDown(0)' style='POSITION: relative;left:0;' width=157 background=images/dongman/vod010.gif><div id='pBox' style='OVERFLOW: hidden;POSITION: relative;cursor: pointer;left:0px;width:18px;'><img src=images/dongman/vod011.gif width=18 height=9 alt='移动滑块控制影片进度'></div></td>");
document.writeln("		<td><img src=images/dongman/vod013.gif width=21 height=9></td>");
document.writeln("		</tr>");
document.writeln("		</table>");
document.writeln("		<table width=100% border=0 cellpadding=0 cellspacing=0>");
document.writeln("		<tr>");
document.writeln("		<td colspan=6><img src=images/dongman/vod014.gif width=218 height=17></td>");
document.writeln("		</tr>");
document.writeln("		<tr>");
document.writeln("		<td width=40><img src=images/dongman/vod015.gif width=40 height=29></td>");
document.writeln("		<td width=49><img src=images/dongman/vod016.gif width=49 height=29 alt='宽频' style='cursor:pointer;' onCLick='ChgVideo(curBroad)'></td>");
document.writeln("		<td width=50><img src=images/dongman/vod017.gif width=50 height=29 alt='窄频' style='cursor:pointer;' onCLick='ChgVideo(curNarrow)'></td>");
document.writeln("		<td width=29><img id=muteControl src=images/dongman/vod026.gif width=29 height=29 onClick='Mute()' alt='关闭声音' style='cursor:pointer;'></td>");
document.writeln("		<td width=41 background=images/bofangqiimages/gw_bn_vol_20.gif id='vZone' onmousedown='mouseDown(1)' style='POSITION: relative;left:0;'><div id='vBox' style='OVERFLOW: hidden;POSITION: relative;cursor: pointer;left:0px;top:7px;width:9px;'><img src=images/bofangqiimages/gw_bn_vol_21.gif width=9 height=18 alt='移动滑块控制音量'></div></td>");
document.writeln("		<td width=9><img src=images/bofangqiimages/gw_bn_vol_23.gif width=9 height=29></td>");
document.writeln("		</tr>");
document.writeln("		<tr>");
document.writeln("		<td colspan=6><img src=images/dongman/vod019.gif width=218 height=10></td>");
document.writeln("		</tr>");
document.writeln("		</table>");

document.writeln("	</td>");
document.writeln("	</tr>");
document.writeln("	</table>");

document.MediaPlayer.attachEvent("PPStateChange", MyStateChange);

var mutePic = new Image(29,29);
mutePic.src = "images/dongman/vod022.gif";
function Mute()
{
	//alert(MediaPlayer.Mute);
	if(MediaPlayer.Mute.toString().toLowerCase()=='true')
	{
		MediaPlayer.Mute='False';
		document.images("muteControl").src = "images/dongman/vod026.gif";
		document.images("muteControl").alt = "关闭声音";
	}else{
		MediaPlayer.Mute='True';
		document.images("muteControl").src = mutePic.src;
		document.images("muteControl").alt = "打开声音";
	}
}

			var isPlayO = false;
			var isStopO = true;
			var isPauseO = false;
			var playPic = new Image(48,77);
			playPic.src = "images/dongman/vod008.gif";
			var stopPic = new Image(24,35);
			stopPic.src = "images/bnmpjs/vod025.gif";
			var pausePic = new Image(28,77);
			pausePic.src = "images/bnmpjs/vod024.gif";

function toPlay()
{
	if(CheckPPSHOW(ppshowVersion) == 1)
		return;
	if(flag){
		GetObj('hideScreen').style.display = 'none';
		GetObj('myScreen').style.display = 'block';
		flag = false;
	}
	//if(document.MediaPlayer.Duration>0)
	{
		if(isPlayO){
			toPause();
		}else{
			if(isStopO||isPauseO)
			{
				//alert(isStopO||isPauseO);
				//document.MediaPlayer.Play();
				//alert(curFile);
				document.MediaPlayer.setActive();
				document.MediaPlayer.put_URL(curFile);
				//document.Dppshow1.put_URL(curFile);
				document.images("playControl").src = "images/bnmpjs/vod024.gif";
				document.images("stopControl").src = "images/bnmpjs/vod009.gif";
				//document.images("pauseControl").src = "images/dongman/vod009.gif";
				isPlayO = true;
				isStopO = false;
				isPauseO = false;
				//alert(isPlayO +"=="+ isStopO+"=="+ isPauseO);
			}
		
		}
	}

}

function toPlay2()
{
	if(document.MediaPlayer.Duration>0){

			if(isStopO||isPauseO)
			{
				//alert(isStopO||isPauseO);
				document.MediaPlayer.Play();
				document.images("playControl").src = "images/bnmpjs/vod024.gif";
				document.images("stopControl").src = "images/bnmpjs/vod009.gif";
				//document.images("pauseControl").src = "images/dongman/vod009.gif";
				isPlayO = true;
				isStopO = false;
				isPauseO = false;
				//alert(isPlayO +"=="+ isStopO+"=="+ isPauseO);
			}

	}
	if(flag){
		GetObj('hideScreen').style.display = 'none';
		GetObj('myScreen').style.display = 'block';
		flag = false;
	}
}

			/*
			//stop on current video
			function toStop()
			{
			//alert(MediaPlayer.Mute);
				if(isPlayO||isPauseO)
				{
					document.MediaPlayer.Stop();
					document.images("playControl").src = playPic.src;
					document.images("stopControl").src = stopPic.src;
					isPlayO = false;
					isStopO = true;
				}
				if((!flag)&&(document.MediaPlayer.FileName==broadFile||document.MediaPlayer.FileName==narrowFile)){
					GetObj('hideScreen').style.display = 'block';
					GetObj('myScreen').style.display = 'none';
					flag = true;
				}
			}
			*/

//back to ini video
function toStop()
{
	//alert(MediaPlayer.Mute);
			
	if(isPlayO||isPauseO)
	{
		document.MediaPlayer.put_URL("");
		document.images("playControl").src = playPic.src;
		document.images("stopControl").src = stopPic.src;
		isPlayO = false;
		isStopO = true;

		if(!flag){
			GetObj('hideScreen').style.display = 'block';
			GetObj('myScreen').style.display = 'none';
			document.MediaPlayer.FileName = broadFile;
			curBroad = broadFile;
			curNarrow = narrowFile;
			flag = true;
		}
	}
}
			
			function toPause()
			{
			//alert(MediaPlayer.Mute);
				if(document.MediaPlayer.Duration>0){
					if(isPlayO&&document.MediaPlayer.PlayState!=3)
					{
						document.MediaPlayer.Pause();
						document.images("playControl").src = playPic.src;
						//document.images("pauseControl").src = pausePic.src;
						isPlayO = false;
						isPauseO = true;
					}
				}
			}
			//--->


	
	var fFlag= false;
	//mpControl func

	//drag func
	var pFlag = false;
	var vFlag = false;

	function startdrag()
	{
		//alert(document.MediaPlayer.Duration||(!isNaN(document.MediaPlayer.Duration)));
		if(document.MediaPlayer.Duration||(!isNaN(document.MediaPlayer.Duration))){
			window.document.onmousemove = mouseMove;
			window.document.ondragstart = mouseEnd;
			window.document.onmouseup = mouseUp;
			/*window.document.onmousedown = mouseDown;*/
		}else{
			GetObj('myScreen').innerHTML='<img width=320 height=264 src=images/dongman/gw_bn_278.jpg alt="请使用IE浏览器观看视频">';
		}
	}

	var isPorV = 0;
	function mouseDown(objSign){
		//alert(window.event.srcElement.id);
		isPorV = objSign;
		if(isPorV==0){
			if(document.MediaPlayer.Duration>0){
				pFlag = true;
				//GetObj('pBox').style.left = (window.event.x-9);
				if(window.event.srcElement.id!='pZone') GetObj('pBox').style.left = GetObj('pBox').offsetLeft;
				else GetObj('pBox').style.left = (window.event.x-9);
			}
		}else if(isPorV==1){
			vFlag = true;
			if(window.event.srcElement.id!='vZone') GetObj('vBox').style.left = GetObj('vBox').offsetLeft;
			else GetObj('vBox').style.left = (window.event.x-4);
		}
	}



	function mouseMove(){
		if(isPorV==0){
			if(document.MediaPlayer.Duration>0){
				//alert(window.event.x-25);
				//if(pFlag) alert(parseInt(document.getElementById('pBox').style.left));
				//if(pFlag) document.getElementById('pBox').style.left = window.event.clientX-10;// - clickleft;
				//if(pFlag) document.getElementById('PlayState').innerText = (document.getElementById('pZone').offsetLeft+':'+document.getElementById('pBox').style.left+":"+window.event.clientX);
				if(pFlag) document.getElementById('pBox').style.left = window.event.clientX - document.getElementById('pZone').offsetLeft - 9; //window.event.x-9;
				if (parseInt(document.getElementById('pBox').style.left) > 139) document.getElementById('pBox').style.left=139;
				if (parseInt(document.getElementById('pBox').style.left) < 0) document.getElementById('pBox').style.left=0;
			}

		}else if(isPorV==1){
			if(vFlag) document.getElementById('vBox').style.left = window.event.clientX - document.getElementById('vZone').offsetLeft - 4; //window.event.x-9;
				if (parseInt(document.getElementById('vBox').style.left) > 35) document.getElementById('vBox').style.left=35;
				if (parseInt(document.getElementById('vBox').style.left) < 0) document.getElementById('vBox').style.left=0;
		}
	}

	function mouseUp()
	{
		if(isPorV==0){
			if(document.MediaPlayer.Duration>0){
				if (pFlag){
					var duration = document.MediaPlayer.Duration;
					document.MediaPlayer.CurrentPosition=duration * (parseInt(document.getElementById('pBox').style.left)/139);
					//alert(window.event.x +"-"+document.getElementById('pZone').style.left+"="+parseInt(document.getElementById('pBox').style.left)+"("+duration * (parseInt(document.getElementById('pBox').style.left)/139)+")");
				}
				pFlag = false;
			}
		}else if(isPorV==1){
			if (vFlag){
				//var volume = document.MediaPlayer.Volume;
				tempVol = (10 - (parseInt(document.getElementById('vBox').style.left)/3.5))*(-100);
				//alert(tempVol);
				document.MediaPlayer.Volume=Math.round(tempVol);//duration * (parseInt(document.getElementById('vBox').style.left)/139);
				//alert(window.event.x +"-"+document.getElementById('pZone').style.left+"="+parseInt(document.getElementById('pBox').style.left)+"("+duration * (parseInt(document.getElementById('pBox').style.left)/139)+")");
			}
			vFlag = false;
		}
	}

	function mouseEnd()
	{
		if(document.MediaPlayer.Duration>0){
			window.event.returnValue = false;
		}
	}

	function FixPos(){
		if(document.MediaPlayer.Duration>0){
			var duration = document.MediaPlayer.Duration;
			var pos = document.MediaPlayer.CurrentPosition;
			var pBoxPos = Math.round(pos/duration*139);
			if (!isNaN(pBoxPos)) document.getElementById('pBox').style.left = pBoxPos;
			//alert(Math.round(pos/duration*200));
			if(document.MediaPlayer.PlayState==0) toStop();
			//if(document.MediaPlayer.Duration==document.MediaPlayer.CurrentPosition) toStop();
		}
	}
	function MyStateChange(state)
	{
		myObj = document.getElementById('PlayState');
		var str=state+"";
		var i=str.indexOf("index");
		var j=str.indexOf("PPSHOW");
		if (i == -1 || j ==-1 ) 
		{
			if(str == "waitting....")
				str = "请求通信中...";
			if(str == "stopped.")
				str = "已停止";
			myObj.innerText = str;
		}
		else
		{
			myObj.innerText = "缓冲：" + str.substring(i+6,j-2);
		}
}
	/*
	function ShowState(){
		myObj = document.getElementById('PlayState');
		switch (document.MediaPlayer.PlayState){
			case 0:
				myObj.innerText = '已停止';
				break;
			case 1:
				myObj.innerText = '已暂停';
				break;
			case 2:
				myObj.innerText = '播放中';
				break;
			case 3:
				myObj.innerText = '读取缓冲';
				fFlag= true;
				break;
			case 4:
				myObj.innerText = 'Stream is scanning forward';
				break;
			case 5:
				myObj.innerText = 'Stream is scanning in reverse';
				break;
			case 6:
				myObj.innerText = 'Skipping to next';
				break;
			case 7:
				myObj.innerText = 'Skipping to previous';
				break;
			case 8:
				myObj.innerText = '未打开任何影音文件';
				break;
			default:
				myObj.innerText = '';
		}
	
	//0 mpStopped Playback is stopped. 
	//1 mpPaused Playback is paused. 
	//2 mpPlaying Stream is playing. 
	//3 mpWaiting Waiting for stream to begin. 
	//4 mpScanForward . 
	//5 mpScanReverse Stream is scanning in reverse. 
	//6 mpSkipForward Skipping to next. 
	//7 mpSkipReverse Skipping to previous. 
	//8 mpClosed Stream is not open. 
	
	}
	setInterval("ShowState()",500);
	*/

	function VolumeUp(vol){
		/*050206-guowei1
		tempVol = (9 - vol)*(-100);
		if(tempVol < (-500)) tempVol-=200;
		//alert(tempVol);
		document.MediaPlayer.Volume= tempVol;
		for(var i=1;i<=vol;i++){
			document.images['vol'+i].src = 'images/dongman/vod023_'+i+'o.gif';
		}
		for(var i=vol+1;i<=9;i++){
			document.images['vol'+i].src = 'images/dongman/vod023_'+i+'.gif';
		}*/
		tempVol = (10 - vol)*(-100);
		document.MediaPlayer.Volume= tempVol;
		document.getElementById('vBox').style.left = vol/10*35;
	}


	function checkstat()
			{	
				//alert('out'+document.MediaPlayer.PlayState)
				if (document.MediaPlayer.PlayState==0||document.MediaPlayer.PlayState==8){
					//alert(document.MediaPlayer.PlayState)
					toPlay2();
					clearInterval(idTmr);
					GetObj('hideScreen').innerHTML=tempHTML;
					broadFile = tempFile;
				}else{}
			}
	var tempHTML;
	var tempFile;
	function ChgVideo(filename){
		if(isPlayO){
			toStop();
		}else{
			toPlay();
		}
		return;

			var tempCurB = curBroad;
			var tempCurN = curNarrow;

			toStop();

			curBroad = tempCurB;
			curNarrow = tempCurN;

			tempHTML = GetObj('hideScreen').innerHTML;
			tempFile = broadFile;
			GetObj('hideScreen').innerHTML='<div align=center><font color=white>视频加载中</font></div>';
			broadFile = filename;
			document.MediaPlayer.FileName=filename;
			idTmr = setInterval("checkstat()",300);
	}

		function ChgBN(bFile,nFile){
		curBroad = bFile;
		curNarrow = nFile;
		ChgVideo(bFile);
	}
function CheckPPSHOW(lVer){

	if (detectPlugin()<lVer) {
		var msg = "你的PPSHOW版本(v"+ detectPlugin() +")比最新版本(v"+lVer+")要老。\n强烈建议您下载并升级到最新版本，安装前请关闭所有Web浏览器！";
		if(detectPlugin() == 0 )
			msg = "你没有安装 PPSHOW 产品,按确定下载产品，下载完成后请按提示要求直接运行 PPSHOW 产品安装程序！";
		var cfm = confirm(msg); 
		if (cfm == true) { 
		location='http://www.conby.com/download/PPSHOW.exe'; 
		}
		return 1;
	} 
	else
		return 0;
}
function detectPlugin()
{
    var pVersion;
    try
    {
        pVersion = document.getElementById('MediaPlayer').GetVersion();  
        return pVersion;
       //return true;
    }
    catch (e)
    {
        return 0;
    }
}
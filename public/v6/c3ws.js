function c3SubmitTask(){var e=document.c3_taskFrm;return e.task_name.value.length<2?(c3Notify("warning","please input your task name","center top"),e.task_name.focus(),!1):(client&&client.send("/queue/hook_event_queue",{"reply-to":"/temp-queue/foo","c3-user":username,"c3-md5":usermd5,"c3-type":"request_task","c3-format":"jquery","c3-mod":"definition"},$(document.c3_taskFrm).serialize()),!1)}function onMessageDefinition(e){var t=JSON.parse(e);return t.uid==c3_protocol[0]?($("#definition_onmessage")[0].innerText="["+(new Date).format("hh:mm:ss")+"] "+t.message+"@"+username+", queued: "+t.queued,$("#btn_definition").removeAttr("disabled"),$("#btn_adda").removeAttr("disabled"),void $("#btn_addc").removeAttr("disabled")):void($("#definition_onmessage")[0].innerText="["+(new Date).format("hh:mm:ss")+"] "+e)}function onCloseDefinition(e){$("#definition_onmessage")[0].innerText="["+(new Date).format("hh:mm:ss")+"] Disconnected",$("#btn_definition").attr("disabled","disabled"),$("#btn_adda").attr("disabled","disabled"),$("#btn_addc").attr("disabled","disabled")}function c3AddTaskRow(e,t){table=e.parentNode.parentNode,pos=e.rowIndex,i=0,e=table.insertRow(pos),cell=e.insertCell(i++),cell.setAttribute("align","left"),cell.innerHTML='<input type="text" name="'+t+'_name[]" />',cell=e.insertCell(i++),cell.setAttribute("align","left"),"condition"==t?cell.innerHTML='<select name="'+t+'_type[]" style="width:75px"><option value="crontab">crontab</option><option value="post">post</option><option value="api">api</option><option value="due" selected>due</option><option value="hook">hook</option></select>':"action"==t&&(cell.innerHTML='<select name="'+t+'_type[]" style="width:75px"><option value="api">api</option><option value="post">post</option><option value="queue">queue</option></select>'),cell=e.insertCell(i++),cell.setAttribute("align","left"),cell.innerHTML='<input type="text" name="'+t+'_spec[]" />',cell=e.insertCell(i++),cell.setAttribute("align","left"),cell.innerHTML='<input type="text" name="'+t+'_payload[]" />',"condition"==t&&(cell=e.insertCell(i++),cell.setAttribute("align","left"),cell.setAttribute("nowrap","nowrap"),cell.innerHTML=' <input type="text" name="'+t+'_eval[]">')}function wsConnect(){client=Stomp.over(new WebSocket("ws"+("https:"==document.location.protocol.toLowerCase()?"s":"s")+"://api.conby.com/stomp/websocket")),client.debug=client_debug,client.onreceive=client_onreceive,client.onclose=client_onclose,client.connect("web","",on_connect,on_error,"c3")}function firstFormSubmit(){var e=$("#first form input").val();if(e){if(e.startsWith("connect")){var t=e.split(" ");return 2!=t.length?(client_onreceive({body:"bad CONNECT format, e.g. connect UID/PASSWORD",headers:{}}),$("#first form input").val(""),!1):(t=t[1].split("/"),2!=t.length?(client_onreceive({body:"bad CONNECT format, e.g. connect UID/PASSWORD",headers:{}}),$("#first form input").val(""),!1):(username=t[0],usermd5=hex_md5(t[1]),client?client.send("/queue/hook_event_queue",{"c3-user":username,"c3-md5":usermd5,"reply-to":"/temp-queue/foo","c3-type":"request_task","c3-format":"json","c3-mod":"initialization"},"hi"):wsConnect(),$("#first form input").val(""),!1))}if(client&&e.startsWith("disconnect"))return client.disconnect(),client_onclose("disconnect"),client=null,client_onreceive({body:"disconnected",headers:{}}),$("#first form input").val(""),Cookies.remove("c3-user"),Cookies.remove("c3-md5"),!1;if("text"==e)return $("#first form input")[0].type="text",!1;if("password"==e)return $("#first form input")[0].type="password",!1;if(!client)return client_onreceive({body:"not connected, please connect first",headers:{}}),$("#first form input").val(""),!1;var n={uid:document.getElementById("username").value,message:e};client.send("/queue/hook_event_queue",{"reply-to":"/temp-queue/foo","c3-user":username,"c3-md5":usermd5,"c3-type":"request_task","c3-format":"json","c3-mod":"console"},JSON.stringify(n)),$("#first form input").val("")}return!1}function getHeader(e,t,n,o,i){for(var r=['<svg height="',o.toString(),'" width="',n.toString(),'">','<g transform="translate(',e.toString(),",",t.toString(),')">','  <g class="x axis">'].join(""),s=0;s<6;s++)r+='    <g transform="translate(',(100*s*(n/600)).toString(),Math.round(100*s*(i/600)).toString(),"</text></g>";return r+=['    <path d="M0,-6V0H',n.toString(),'V-6" class="domain"></path>','    <text transform="translate(',(n-e).toString(),', -9)"></text>',"  </g>",'  <g class="y axis"><path d="M-6,0H0V',o.toString(),'H-6" class="domain"></path></g>'].join("")}function checkJSONChart(e){var t=null,n=null;try{if(n=JSON.parse(e),t=new Array,n&&"object"==typeof n){for(var o in n)try{isNaN(n[o])===!1&&(t[t.length]=parseInt(n[o]))}catch(e){}if(t.length>1){var i=10,r=20,s=600,a=Math.max.apply({},t),l=5*t.length*2+r,c="";c+=getHeader(i,r,s,l,a);var u=0;for(var d in t)u+=1,c+='  <g class="bar" transform="translate(0,'+(10*u-5).toString()+')"><rect height="5" width="'+Math.round(1*t[d]*(s-i)/a).toString()+'"></rect></g>\n';return c+=["</g>","</svg>"].join(""),t&&(t.length=0,delete t),u=null,i=null,r=null,s=null,a=null,l=null,t=null,n=null,c}}}catch(e){return t&&(t.length=0,delete t),t=null,n=null,""}return t&&(t.length=0,delete t),t=null,n=null,""}function checkEventJSONString(e){var t=null;try{if(t=JSON.parse(e),t&&"object"==typeof t){var n="<table border=1>";for(var o in t)n+="<tr>",n+="<td>"+o+"</td>",n+=t[o]&&"object"==typeof t[o]?"<td>"+JSON.stringify(t[o])+"</td>":"<td>"+t[o]+"</td>",n+="</tr>";return n+="</table>",n+=checkJSONChart(e),t=null,n}}catch(n){return t=null,e}return t=null,e}function checkJSONString(e){var t=null;try{if(t=JSON.parse(e),t&&"object"==typeof t){var n="",o="";for(var i in t)"yarn_jsonsource"==i&&handleJsonSource(t[i]),"yarn_event"==i&&(n=t[i]+" "),"yarn_updated"==i&&(o=t[i]),"yarn_vtype"==i&&(document.getElementById("select_vtype").value=t[i]);return t=null,n+o}}catch(n){return t=null,e}return t=null,e}function onMessageEvent(e){var t=JSON.parse(e);if(t.uid==c3_protocol[0])return document.getElementById("eventusername").value=t.message+"@"+username,void $("#message3").removeAttr("readonly");if(t.uid==c3_protocol[1])return username="",void(usermd5="");var n=createChatEntry(t.uid,checkEventJSONString(t.message),0);null==messageEventContainer&&(messageEventContainer=document.getElementById("eventchat")),messageEventContainer.appendChild(n),n.parentNode.scrollTop=n.offsetTop}function onCloseEvent(e){document.getElementById("eventusername").value="Disconnected",$("#message3").attr("readonly","readonly")}function sendMessage(e,t,n){var o={uid:document.getElementById(e).value,message:document.getElementById(t).value};o.uid&&o.message&&client&&client.send("/queue/hook_event_queue",{"reply-to":"/temp-queue/foo","c3-user":username,"c3-md5":usermd5,"c3-type":"request_task","c3-format":"json","c3-mod":n},JSON.stringify(o)),document.getElementById(t).value=""}function onMessageWorkflow(e){var t=JSON.parse(e);return t.uid==c3_protocol[0]?($("#three form input").removeAttr("readonly"),void(document.getElementById("wf_task_name").innerText="No task key")):t.uid==c3_protocol[1]?(username="",void(usermd5="")):void showTask(t.message)}function onCloseWorkflow(e){$("#three form input").attr("readonly","readonly"),document.getElementById("task_desc").style.display="none",document.getElementById("runtimes").style.display="none"}function onMessageVisualization(e){var t=JSON.parse(e);if(t.uid==c3_protocol[0])return document.getElementById("username").value=t.message+"@"+username,$("#message").removeAttr("readonly"),"undefined"!=typeof t.token?usermd5=t.token:usermd5="",void c3Notify("success","login successfully, your session number is:"+t.message,"center top");if(t.uid==c3_protocol[1])return username="",usermd5="",void c3Notify("error",t.message,"center top");if(t.uid==c3_protocol[2])return void c3Notify("info",t.message,"center top");try{updateVtypeChange&&"function"==typeof updateVtypeChange&&updateVtypeChange(t.message)}catch(e){}}function onCloseVisualization(e){document.getElementById("username").value="Disconnected",$("#message").attr("readonly","readonly"),json_source=null}function startConsoleApp(){client_debug=function(e){var t=$("#second div");t.append($("<code>").text(e)),t.scrollTop(t.scrollTop()+1e4)},client_onreceive=function(e){var t=$("#first div");switch(t.append($("<code>").text(e.body)),t.scrollTop(t.scrollTop()+1e4),e.headers["c3-mod"]){case"event":onMessageEvent(e.body);break;case"visualization":onMessageVisualization(e.body);break;case"definition":onMessageDefinition(e.body);break;case"workflow":onMessageWorkflow(e.body);break;case"initialization":onMessageVisualization(e.body),onMessageEvent(e.body),onMessageDefinition(e.body),onMessageWorkflow(e.body)}},client_onclose=function(e){onCloseEvent(e),onCloseVisualization(e),onCloseDefinition(e),onCloseWorkflow(e),client=null,username="",usermd5=""},on_connect=function(e){username?client.send("/queue/hook_event_queue",{"reply-to":"/temp-queue/foo","c3-user":username,"c3-md5":usermd5,"c3-type":"request_task","c3-format":"json","c3-mod":"initialization"},"hi"):"undefined"!=typeof Cookies.get("c3-md5")&&"undefined"!=typeof Cookies.get("c3-user")&&(username=Cookies.get("c3-user"),client.send("/queue/hook_event_queue",{"reply-to":"/temp-queue/foo","c3-user":username,"c3-md5":Cookies.get("c3-md5"),"c3-type":"request_task","c3-format":"json","c3-mod":"initialization"},"hi"))},on_error=function(e){console.log("error "+e)},$("#first form").keydown(function(e){if(13==e.keyCode)return firstFormSubmit()}),ascensor=$("#c3Building").ascensor({childType:"section",ascensorFloorName:["Home","Definition","Publish","Event","Visualization","Workflow","SDK","License"],time:300,windowsOn:0,direction:[[1,0],[2,0],[2,1],[2,2],[2,3],[1,3],[0,3],[0,2]],easing:"easeInOutQuad",keyNavigation:!0,swipeNavigation:0,wheelNavigation:0,loop:"increment",queued:"y"}),ascensorInstance=$("#c3Building").data("ascensor"),$(".links-to-floor li").click(function(e,t){ascensorInstance.scrollToFloor($(this).index())}),$(".links-to-floor li:eq("+ascensor.data("current-floor")+")").addClass("selected"),ascensor.on("scrollStart",function(e,t){$(".links-to-floor li").removeClass("selected"),$(".links-to-floor li:eq("+t.to+")").addClass("selected")}),$(".prev").click(function(){ascensorInstance.prev()}),$(".next").click(function(){ascensorInstance.next()}),$(".direction").click(function(){ascensorInstance.scrollToDirection($(this).data("direction"))}),wsConnect()}function startEventApp(){messageEventContainer=document.getElementById("eventchat"),"WebSocket"in window?messageEventContainer.appendChild(createChatEntry("C3","Input C3 Hook, e.g. c3://1aec91bc081c11e4903e4ed6eaf04282.xc",0)):messageEventContainer.appendChild(createChatEntry("C3","WebSocket is NOT supported by your browser!",0)),$("#message3").keydown(function(e){if(13==e.keyCode)return sendMessage("eventusername","message3","event"),!1})}
var c3_protocol = ['OK1', 'OK2', 'OK3'];
if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function(prefix) {
        return this.slice(0, prefix.length) === prefix;
    }
    ;
}
function c3_submitIt() {
    var f = document.c3_taskFrm;
    if (f.task_name.value.length < 2) {
        alert('please input your task name');
        f.task_name.focus();
        return false;
    }
    var msg = '';
    if (msg.length < 1) {
        //$(document.c3_taskFrm).serialize()
        if (client)
            client.send('/queue/hook_event_queue', {
                'reply-to': '/temp-queue/foo',
                'c3-type': 'request_task',
                'c3-format': 'jquery',
                'c3-mod': 'definition'
            }, $(document.c3_taskFrm).serialize());
        return false;
        //f.submit();
    } else
        alert(msg);
}
function onmessage_definition(m) {
    //console.log($('#definition_onmessage'));
    var data = JSON.parse(m);
    if (data.uid == c3_protocol[0]) {
        $('#definition_onmessage')[0].innerText = "[" + new Date().format('hh:mm:ss') + "] " + data.message + "@" + username + ', queued: ' + data.queued;
        $('#btn_definition').removeAttr("disabled");
        return;
    }
    $('#definition_onmessage')[0].innerText = "[" + new Date().format('hh:mm:ss') + "] " + m;
}
function onclose_definition(e) {
    $('#definition_onmessage')[0].innerText = "[" + new Date().format('hh:mm:ss') + "] Disconnected";
    $('#btn_definition').attr('disabled', 'disabled');
}
function c3_addRow(row, group) {
    table = row.parentNode.parentNode;
    pos = row.rowIndex;
    i = 0;
    row = table.insertRow(pos);
    cell = row.insertCell(i++);
    cell.setAttribute('align', 'left');
    cell.innerHTML = '<input type="text" name="' + group + '_name[]" />';
    cell = row.insertCell(i++);
    cell.setAttribute('align', 'left');
    if (group == 'condition')
        cell.innerHTML = '<select name="' + group + '_type[]" style="width:75px"><option value="crontab">crontab</option><option value="post">post</option><option value="api">api</option><option value="due" selected>due</option><option value="hook">hook</option></select>';
    else if (group == 'action')
        cell.innerHTML = '<select name="' + group + '_type[]" style="width:75px"><option value="api">api</option><option value="post">post</option><option value="queue">queue</option></select>';
    cell = row.insertCell(i++);
    cell.setAttribute('align', 'left');
    cell.innerHTML = '<input type="text" name="' + group + '_spec[]" />';
    cell = row.insertCell(i++);
    cell.setAttribute('align', 'left');
    cell.innerHTML = '<input type="text" name="' + group + '_payload[]" />';
    if (group == 'condition') {
        cell = row.insertCell(i++);
        cell.setAttribute('align', 'left');
        cell.setAttribute('nowrap', 'nowrap');
        cell.innerHTML = ' <input type="text" name="' + group + '_eval[]">';
    }
}
var client;
//client = Stomp.over(new WebSocket('ws'+(('https:'==document.location.protocol.toLowerCase())?'s':'')+'://www.conby.com/ws'));
var username = 'test';
var client_debug = function(e) {
    var div = $('#second div');
    div.append($("<code>").text(e));
    div.scrollTop(div.scrollTop() + 10000);
};
// default receive callback to get message from temporary queues
var client_onreceive = function(m) {
    var div = $('#first div');
    div.append($("<code>").text(m.body));
    div.scrollTop(div.scrollTop() + 10000);
    switch (m.headers['c3-mod']) {
    case 'event':
        onmessage_event(m.body);
        break;
    case 'visualization':
        onmessage_visualization(m.body);
        break;
    case 'definition':
        onmessage_definition(m.body);
        break;
    case 'workflow':
        onmessage_workflow(m.body);
        break;
    case 'initialization':
        //oninit_event(m.body);
        //oninit_visualization(m.body);
        onmessage_visualization(m.body);
        onmessage_event(m.body);
        onmessage_definition(m.body);
        onmessage_workflow(m.body);
        break;
    default:
        break;
    }
}
var client_onclose = function(e) {
    //client_onreceive({'body':'client_onclose...','headers':{}});
    //if(client==null) return;
    onclose_event(e);
    onclose_visualization(e);
    onclose_definition(e);
    onclose_workflow(e);
}
var on_connect = function(x) {
    client.send('/queue/hook_event_queue', {
        'reply-to': '/temp-queue/foo',
        'c3-type': 'request_task',
        'c3-format': 'json',
        'c3-mod': 'initialization'
    }, 'hi');
    //id = client.subscribe("/queue/hook_event_queue", function(m) {
    // reply by sending the reversed text to the temp queue defined in the "reply-to" header
    //var reversedText = m.body.split("").reverse().join("");
    //var reply_to = m.headers['reply-to'];
    //if(!reply_to)
    //    reply_to = '/queue/system_event_queue';
    //client.send(reply_to, {"content-type":"text/plain"}, reversedText);
    //});
};
var on_error = function(e) {
    console.log('error ' + e);
};
//client.connect(username, '', on_connect, on_error, 'c3');
//$('#first form').submit(function() {
function firstform_submit() {
    var text = $('#first form input').val();
    if (text) {
        if (text.startsWith('connect')) {
            client = null ;
            var sessioncode = text.split(' ')
            if (sessioncode.length != 2) {
                client_onreceive({
                    'body': 'bad CONNECT format, e.g. connect UID/PASSWORD',
                    'headers': {}
                });
                $('#first form input').val("");
                return false;
            }
            sessioncode = sessioncode[1].split('/');
            if (sessioncode.length != 2) {
                client_onreceive({
                    'body': 'bad CONNECT format, e.g. connect UID/PASSWORD',
                    'headers': {}
                });
                $('#first form input').val("");
                return false;
            }
            username = sessioncode[0];
            client = Stomp.over(new WebSocket('ws' + (('https:' == document.location.protocol.toLowerCase()) ? 's' : '') + '://www.conby.com/ws'));
            client.debug = client_debug;
            client.onreceive = client_onreceive;
            client.onclose = client_onclose;
            client.connect(username, sessioncode[1], on_connect, on_error, 'c3');
            $('#first form input').val("");
            return false;
        }
        if (client && text.startsWith('disconnect')) {
            client.disconnect();
            client_onclose('disconnect');
            client = null ;
            client_onreceive({
                'body': 'disconnected',
                'headers': {}
            });
            $('#first form input').val("");
            return false;
        }
        if (!client) {
            client_onreceive({
                'body': 'not connected, please connect first',
                'headers': {}
            });
            $('#first form input').val("");
            return false;
        }
        //client.send('/queue/hook_event_queue', {'reply-to': '/temp-queue/foo'}, text);
        var data = {
            uid: document.getElementById("username").value,
            message: text
        };
        client.send('/queue/hook_event_queue', {
            'reply-to': '/temp-queue/foo',
            'c3-type': 'request_task',
            'c3-format': 'json',
            'c3-mod': 'console'
        }, JSON.stringify(data));
        $('#first form input').val("");
    }
    return false;
}
//);
$('#first form').keydown(function(e) {
    if (e.keyCode == 13) {
        //$("#first form").submit();
        return firstform_submit();
    }
});
function xx() {}
var messageContainer3 = null ;
Date.prototype.format = function(format) {
    var o = {
        "M+": this.getMonth() + 1,
        //month
        "d+": this.getDate(),
        //day
        "h+": this.getHours(),
        //hour
        "m+": this.getMinutes(),
        //minute
        "s+": this.getSeconds(),
        //second
        "q+": Math.floor((this.getMonth() + 3) / 3),
        //quarter
        "S": this.getMilliseconds()//millisecond
    }
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}
function createChatEntry3(username, message) {
    var entry = document.createElement("div");
    entry.class = "chat_entry";
    var dom_uname = document.createElement("span");
    dom_uname.class = "chat_username";
    dom_uname.innerHTML = "[" + new Date().format('hh:mm:ss') + "] " + username + ": ";
    entry.appendChild(dom_uname);
    var dom_msg = document.createElement("span");
    dom_msg.class = "chat_message";
    dom_msg.innerHTML = message;
    entry.appendChild(dom_msg);
    return entry;
}
function getHeader3(xb, yb, w, h, m) {
    var html = ['<svg height="', h.toString(), '" width="', w.toString(), '">', '<g transform="translate(', xb.toString(), ',', yb.toString(), ')">', '  <g class="x axis">'].join('');
    for (var i = 0; i < 6; i++)
        html += '    <g transform="translate(',
        (100.00 * i * (w / 600.00)).toString(),
        ',0)" class="tick"><line x2="0" y2="-6"></line><text x="0" y="-9" style="text-anchor: middle;" dy="0em">',
        Math.round(100.00 * i * (m / 600.00)).toString(),
        '</text></g>';
    html += ['    <path d="M0,-6V0H', w.toString(), 'V-6" class="domain"></path>', '    <text transform="translate(', (w - xb).toString(), ', -9)"></text>', '  </g>', '  <g class="y axis"><path d="M-6,0H0V', h.toString(), 'H-6" class="domain"></path></g>'].join('');
    return html;
}
function checkJSONChart3(message) {
    var arrChart = null ;
    var jsonData = null ;
    try {
        jsonData = JSON.parse(message);
        arrChart = new Array();
        if (jsonData && typeof (jsonData) == 'object') {
            for (var j in jsonData) {
                try {
                    if (isNaN(jsonData[j]) === false) {
                        arrChart[arrChart.length] = parseInt(jsonData[j]);
                    }
                } catch (e) {
                    pass
                }
            }
            if (arrChart.length > 1) {
                var xB = 10;
                var yB = 20;
                var width = 600;
                var m = Math.max.apply({}, arrChart);
                var heigth = arrChart.length * 5 * 2 + yB;
                var html = '';
                html += getHeader3(xB, yB, width, heigth, m);
                var i = 0;
                for (var c in arrChart) {
                    i += 1;
                    html += '  <g class="bar" transform="translate(0,' + (i * 10 - 5).toString() + ')"><rect height="5" width="' + Math.round(arrChart[c] * 1.00 * (width - xB) / m).toString() + '"></rect></g>\n';
                }
                html += ['</g>', '</svg>'].join('');
                if (arrChart) {
                    arrChart.length = 0;
                    delete arrChart;
                }
                i = null ;
                xB = null ;
                yB = null ;
                width = null ;
                m = null ;
                heigth = null ;
                arrChart = null ;
                jsonData = null ;
                return html;
            }
        }
    } catch (e) {
        if (arrChart) {
            arrChart.length = 0;
            delete arrChart;
        }
        arrChart = null ;
        jsonData = null ;
        return '';
    }
    if (arrChart) {
        arrChart.length = 0;
        delete arrChart;
    }
    arrChart = null ;
    jsonData = null ;
    return '';
}
function checkJSONString3(message) {
    var jsonData = null ;
    try {
        jsonData = JSON.parse(message);
        if (jsonData && typeof (jsonData) == 'object') {
            var html = '<table border=1>';
            for (var j in jsonData) {
                html += '<tr>';
                html += '<td>' + j + '</td>';
                if (jsonData[j] && typeof (jsonData[j]) == 'object')
                    html += '<td>' + JSON.stringify(jsonData[j]) + '</td>';
                else
                    html += '<td>' + jsonData[j] + '</td>';
                html += '</tr>';
            }
            html += '</table>';
            html += checkJSONChart3(message);
            jsonData = null ;
            return html;
        }
    } catch (e) {
        jsonData = null ;
        return message;
    }
    jsonData = null ;
    return message;
}
function onmessage_event(e) {
    //var data = JSON.parse(e.data);
    var data = JSON.parse(e);
    if (data.uid == c3_protocol[0]) {
        document.getElementById('username3').value = data.message + "@" + username;
        //$('#btn_event').removeAttr("disabled"); 
        $('#message3').removeAttr("readonly");
        return;
    }
    var entry = createChatEntry3(data.uid, checkJSONString3(data.message))
    messageContainer3.appendChild(entry);
    //entry.scrollIntoView();// bug for IE
    entry.parentNode.scrollTop = entry.offsetTop;
}
function onclose_event(e) {
    document.getElementById('username3').value = "Disconnected";
    //$('#btn_event').attr('disabled','disabled');
    $('#message3').attr('readonly', 'readonly');
}
var event_init = false;
function oninit_event(e) {
    if (event_init)
        return;
    client.send('/queue/hook_event_queue', {
        'reply-to': '/temp-queue/foo'
    }, 'hi event');
    event_init = true;
}
function sendMessage3() {
    var data = {
        uid: document.getElementById("username3").value,
        message: document.getElementById("message3").value
    };
    if (data.uid && data.message) {
        if (client)
            client.send('/queue/hook_event_queue', {
                'reply-to': '/temp-queue/foo',
                'c3-type': 'request_task',
                'c3-format': 'json',
                'c3-mod': 'event'
            }, JSON.stringify(data));
    }
    document.getElementById('message3').value = "";
}
/*      
  window.onload = function() {
	messageContainer = document.getElementById("chat");
	if("WebSocket" in window) {
	  messageContainer.appendChild(createChatEntry("C3", "Input C3 Hook, e.g. c3://1aec91bc081c11e4903e4ed6eaf04282.xc"));
	  //openWS(messageContainer);
	  //client.send('/queue/hook_event_queue', {'reply-to': '/temp-queue/foo'}, 'hi event');
	}
	else {
	  messageContainer.appendChild(createChatEntry("C3", "WebSocket is NOT supported by your browser!"));
	}

	document.onkeydown=function(ev) {
	  var oEvent=ev||event;
		if(oEvent.keyCode==13) {
		  sendMessage();
		  return false;
		}
	}

  }
  */
//document.getElementById('center').style.width='122%';
var mc = null ;
var ow = 910
  , oh = 800
  , svg = null ;
var messageContainer = null ;
var c3dv = {
    css: function(url) {
        var c3dvcss = document.getElementById('c3dvcss');
        var head = document.head || document.getElementsByTagName('head')[0];
        if (c3dvcss) {
            head.removeChild(c3dvcss);
            c3dvcss = null ;
        }
        var link = document.createElement('link');
        link.id = 'c3dvcss';
        link.href = url;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        head.appendChild(link);
        return link;
    },
    js: function(url) {
        var c3dvjs = document.getElementById('c3dvjs');
        var head = document.head || document.getElementsByTagName('head')[0];
        if (c3dvjs) {
            head.removeChild(c3dvjs);
            c3dvjs = null ;
        }
        var script = document.createElement('script');
        script.id = 'c3dvjs';
        script.src = url;
        script.type = 'text/javascript';
        head.appendChild(script);
        return script;
    }
}
Date.prototype.format = function(format) {
    var o = {
        "M+": this.getMonth() + 1,
        //month
        "d+": this.getDate(),
        //day
        "h+": this.getHours(),
        //hour
        "m+": this.getMinutes(),
        //minute
        "s+": this.getSeconds(),
        //second
        "q+": Math.floor((this.getMonth() + 3) / 3),
        //quarter
        "S": this.getMilliseconds()//millisecond
    }
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}
function createChatEntry(username, message) {
    var entry = document.createElement("div");
    entry.class = "chat_entry";
    var dom_uname = document.createElement("span");
    dom_uname.class = "chat_username";
    dom_uname.innerHTML = "[" + new Date().format('hh:mm:ss') + "] " + username + ": ";
    entry.appendChild(dom_uname);
    var dom_msg = document.createElement("span");
    dom_msg.class = "chat_message";
    dom_msg.innerHTML = message;
    entry.appendChild(dom_msg);
    setTimeout(function() {
        entry.style.display = "none";
    }, 2000);
    return entry;
}
function handleJsonSource(j) {
    //if(/.*\.json$/.test(j)) document.getElementById("yarn_jsonsource").value = '/webhdfs/' + j + '?t=' + (new Date()).valueOf();
    if (/.*\.json$/.test(j))
        document.getElementById("yarn_jsonsource").value = j + '?t=' + (new Date()).valueOf();
    else
        document.getElementById("yarn_jsonsource").value = j;
}
function checkJSONString(message) {
    var jsonData = null ;
    try {
        jsonData = JSON.parse(message);
        if (jsonData && typeof (jsonData) == 'object') {
            var yarn_event = '';
            var yarn_updated = '';
            for (var j in jsonData) {
                if (j == 'yarn_jsonsource')
                    handleJsonSource(jsonData[j]);
                if (j == 'yarn_event')
                    yarn_event = jsonData[j] + ' ';
                if (j == 'yarn_updated')
                    yarn_updated = jsonData[j];
                if (j == 'yarn_vtype')
                    document.getElementById('select_vtype').value = jsonData[j];
            }
            jsonData = null ;
            return yarn_event + yarn_updated;
        }
    } catch (e) {
        jsonData = null ;
        return message;
    }
    jsonData = null ;
    return message;
}
function onmessage_visualization(e) {
    //var data = JSON.parse(e.data);
    var data = JSON.parse(e);
    if (data.uid == c3_protocol[0]) {
        document.getElementById('username').value = data.message + "@" + username;
        //$('#btn_visualization').removeAttr("disabled"); 
        $('#message').removeAttr("readonly");
        return;
    }
    if (data.message.startsWith('Hook accepted: ')) {
        var entry = createChatEntry(data.uid, checkJSONString(data.message))
        messageContainer.replaceChild(entry, mc);
        mc = entry;
		return;
	}
    try{ 
        if(updateVtypeChange && typeof(updateVtypeChange)=="function")
            updateVtypeChange(data.message);
        else
            onVtypeChange(document.getElementById('select_vtype').value);
    }catch(e){ console.log(e) }     
}

function onclose_visualization(e) {
    document.getElementById('username').value = "Disconnected";
    //$('#btn_visualization').attr('disabled','disabled');
    $('#message').attr('readonly', 'readonly');
}
var visualization_init = false;
function oninit_visualization(e) {
    if (visualization_init)
        return;
    client.send('/queue/hook_event_queue', {
        'reply-to': '/temp-queue/foo'
    }, 'hi visualization');
    visualization_init = true;
}
function sendMessage() {
    var data = {
        uid: document.getElementById("username").value,
        message: document.getElementById("message").value
    };
    if (data.uid && data.message) {
        if (client)
            client.send('/queue/hook_event_queue', {
                'reply-to': '/temp-queue/foo',
                'c3-type': 'request_task',
                'c3-format': 'json',
                'c3-mod': 'visualization'
            }, JSON.stringify(data));
    }
    document.getElementById('message').value = "";
}
window.onload = function() {
    messageContainer3 = document.getElementById("chat3");
    if ("WebSocket"in window) {
        messageContainer3.appendChild(createChatEntry3("C3", "Input C3 Hook, e.g. c3://1aec91bc081c11e4903e4ed6eaf04282.xc"));
        //openWS(messageContainer);
    } else {
        messageContainer3.appendChild(createChatEntry3("C3", "WebSocket is NOT supported by your browser!"));
    }
    messageContainer = document.getElementById("chat");
    if ("WebSocket"in window) {
        mc = messageContainer.appendChild(createChatEntry("C3", "Input C3 Hook, e.g. c3://1aec91bc081c11e4903e4ed6eaf04282.xc"));
        //openWS(messageContainer);
    } else {
        mc = messageContainer.appendChild(createChatEntry("C3", "WebSocket is NOT supported by your browser!"));
    }
    ow = document.getElementById("chat").offsetWidth;
    oh = document.getElementById("chat").offsetHeight;
    /*
	document.onkeydown=function(ev) {
	  var oEvent=ev||event;
		if(oEvent.keyCode==13) {
		  sendMessage2();
		  return false;
		}
	}*/
    $('#message').keydown(function(e) {
        if (e.keyCode == 13) {
            sendMessage();
            return false;
        }
    });
    $('#message3').keydown(function(e) {
        if (e.keyCode == 13) {
            sendMessage3();
            return false;
        }
    });
}
function onVtypeChange(vtype) {
    document.getElementById("sunburstpartition_radio").style.display = "none";
    document.getElementById("hierarchicaledgebundling_range").style.display = "none";
    document.getElementById("treemap_select").style.display = "none";
    //document.getElementById("jsonsource").value = '/webhdfs/flare.json';
    document.getElementById("jsonsource").value = 'flare.json';
    //if(document.getElementById("yarn_jsonsource").value) document.getElementById("jsonsource").value = document.getElementById("yarn_jsonsource").value;
    switch (vtype) {
    case 'timeline':
        c3dv.css("c3js/v_timeline.css");
        c3dv.js("c3js/bootstrap-tooltip.js");
        c3dv.js("c3js/v_timeline.js");
        break;
    case 'areagradient':
        c3dv.css("c3js/v_areagradient.css");
        c3dv.js("c3js/v_areagradient.js");
        break;
    case 'barhierarchy':
        c3dv.css("c3js/v_barhierarchy.css");
        c3dv.js("c3js/v_barhierarchy.js");
        break;
    case 'chart':
        c3dv.css("c3js/v_chart.css");
        c3dv.js("c3js/v_chart.js");
        break;
    case 'bubblechart':
        c3dv.css("c3js/v_bubblechart.css");
        c3dv.js("c3js/v_bubblechart.js");
        break;
    case 'bubbleby':
        c3dv.css("c3js/v_bubbleby.css");
        c3dv.js("c3js/v_bubbleby.js");
        break;
    case 'showreel':
        c3dv.css("c3js/v_showreel.css");
        c3dv.js("c3js/v_showreel.js");
        break;
    case 'cluster':
        c3dv.css("c3js/v_cluster.css");
        c3dv.js("c3js/v_cluster.js");
        break;
    case 'chorddiagram':
        c3dv.css("c3js/v_chorddiagram.css");
        c3dv.js("c3js/v_chorddiagram.js");
        break;
    case 'hierarchicaledgebundling':
        c3dv.css("c3js/v_hierarchicaledgebundling.css");
        c3dv.js("c3js/v_hierarchicaledgebundling.js");
        break;
    case 'forcecollapsible':
        c3dv.css("c3js/v_forcecollapsible.css");
        c3dv.js("c3js/v_forcecollapsible.js");
        break;
    case 'forcedirectedgraph':
        c3dv.css("c3js/v_forcedirectedgraph.css");
        c3dv.js("c3js/v_forcedirectedgraph.js");
        break;
    case 'packhierarchy':
        c3dv.css("c3js/v_packhierarchy.css");
        c3dv.js("c3js/v_packhierarchy.js");
        break;
    case 'radial':
        c3dv.css("c3js/v_radial.css");
        c3dv.js("c3js/v_radial.js");
        break;
    case 'partition':
        c3dv.css("c3js/v_partition.css");
        c3dv.js("c3js/v_partition.js");
        break;
    case 'bilevelpartition':
        c3dv.css("c3js/v_bilevelpartition.css");
        c3dv.js("c3js/v_bilevelpartition.js");
        break;
    case 'sunburstpartition':
        c3dv.css("c3js/v_sunburstpartition.css");
        c3dv.js("c3js/v_sunburstpartition.js");
        break;
    case 'sequencessunburst':
        c3dv.css("c3js/v_sequencessunburst.css");
        c3dv.js("c3js/v_sequencessunburst.js");
        break;
    case 'treemap':
        c3dv.css("c3js/v_treemap.css");
        c3dv.js("c3js/v_treemap.js");
        break;
    case 'ddzpcta':
        c3dv.css("c3js/v_ddzpcta.css");
        c3dv.js("c3js/v_ddzpcta.js");
        break;
    default:
        c3dv.css("c3js/v_forcecollapsible.css");
        c3dv.js("c3js/v_forcecollapsible.js");
    }
}
$('#three form').keydown(function(e) {
    if (e.keyCode == 13) {
        send_c3message('c3_get_task', '');
        return false;
    }
});
function send_c3message(api, key) {
    var text = $('#three form input').val();
    if (text) {
        var msg = key;
        if (!msg)
            msg = text;
        var data = {
            uid: document.getElementById("username").value,
            message: {
                api: api,
                key: msg
            }
        };
        if (data.uid && data.message) {
            if (client)
                client.send('/queue/hook_event_queue', {
                    'reply-to': '/temp-queue/foo',
                    'c3-type': 'request_task',
                    'c3-format': 'json',
                    'c3-mod': 'workflow'
                }, JSON.stringify(data));
        }
    }
}
function set_c3_world_dimension(w, h, c3wid) {
    var world = document.getElementById(c3wid);
    world.style.width = w + 'px';
    world.style.height = h + 'px';
    Joint.paper(c3wid, w, h + 150);
    //Joint.paper(c3wid, 800, 600);
}
Array.prototype.unique = function() {
    var newArr = [];
    for (var i = 0; i < this.length; i++) {
        if (newArr.indexOf(this[i]) == -1) {
            newArr.push(this[i]);
        }
    }
    return newArr;
}
function onmessage_workflow(e) {
    //var data = JSON.parse(e.data);
    var data = JSON.parse(e);
    if (data.uid == c3_protocol[0]) {
        //document.getElementById('username').value=data.message + "@" + username;
        //$('#btn_visualization').removeAttr("disabled"); 
        $('#three form input').removeAttr("readonly");
        document.getElementById('wf_task_name').innerText = 'No task key';
        return;
    }
    //console.log(data.message);
    show_task(data.message);
}
function onclose_workflow(e) {
    //document.getElementById('username').value="Disconnected";
    //$('#btn_visualization').attr('disabled','disabled');
    $('#three form input').attr('readonly', 'readonly');
    document.getElementById('task_desc').style.display = "none";
    document.getElementById('runtimes').style.display = "none";
}
function show_task(task) {
    /*
	var runtime={
		'name':'name',
		'taskkey':'task123',
		'key':'rt123',
		'updated':'2016-10-10 10:10',
		'status':'Running',
		'content':[['x1', 'xx'],['yydg','xxxxx'],['',''],['default',''],['a1','ok<a href="">a</a>']],
		'logs':'logs',
		'source':{
			'p1':Array(),
			'p2':Array(),
			'rt':{
				//'key1':{
				//	'runtime_name':'rt',
				//	'taskkey':'taskkey',
				//	'p1':Array(),
				//	'p2':{'out':'in'}
				//},
				//'key3':{
				//	'runtime_name':'rt8',
				//	'taskkey':'taskkey8',
				//	'p1':Array(),
				//	'p2':{'out':'in'}
				//},
				'key2':{
					'runtime_name':'rt2',
					'taskkey':'taskkey2',
					'p1':Array(),
					'p2':{'out':'in'}
				}
			},
			'x':''
		},
		'follower':{
			'p1':Array(),
			'p2':Array(),
			'rt':{
				//'key1':{
				//	'runtime_name':'rt5',
				//	'taskkey':'taskkey5',
				//	'p1':Array(),
				//	'p2':{'out':'in'}
				//},
				//'key3':{
				//	'runtime_name':'rt6',
				//	'taskkey':'taskkey6',
				//	'p1':Array(),
				//	'p2':{'out':'in'}
				//},
				'key2':{
					'runtime_name':'rt3',
					'taskkey':'taskkey3',
					'p1':Array(),
					'p2':{'out':'in'}
				}
			},
			'x':''
		}
	};
	var task = {
		'runtime_list':[runtime],
		'fcount':1,
		'created':'2015-12-12 12:12',
		'taskkey':'task123',
		'taskname':'Task name'
		};
	if(t) task = t;*/
    if (!task['taskkey'])
        return;
    document.getElementById('task_desc').style.display = "";
    document.getElementById('runtimes').style.display = "";
    document.getElementById('wf_task_name').innerText = task['taskname'];
    document.getElementById('wf_task_created').innerText = task['created'];
    document.getElementById('wf_task_fcount').innerText = task['fcount'];
    var runtimes = document.getElementById('runtimes');
    runtimes.innerHTML = '<h2 class="comments">Runtime(s)</h2>';
    for (var i = 0; i < task['runtime_list'].length; i++) {
        create_runtime_div(i + 1, task['runtime_list'][i]);
        create_runtime(i + 1, task['runtime_list'][i]);
    }
}
function create_runtime(n, rt) {
    var devs = Joint.dia.devs;
    var arrow = devs.arrow;
    var xy = [600, 20, 100, 220, 130, 450, 100];
    if (navigator.userAgent.match(/mobile/i))
        xy = [333, 20, 50, 120, 80, 255, 50];
    set_c3_world_dimension(xy[0], 68, 'c3workflow_world' + n.toString());
    var runtime = rt;
    runtime['source']['p1'].push('in');
    runtime['follower']['p1'].push('out');
    var c1 = devs.Model.create({
        rect: {
            x: xy[3],
            y: 10,
            width: xy[4],
            height: 40
        },
        label: runtime['name'],
        attrs: {
            fill: "green"
        },
        labelAttrs: {
            'font-weight': 'bold',
            fill: 'white',
            'font-size': '12px'
        },
        shadow: true,
        iPorts: runtime['source']['p1'].unique(),
        oPorts: runtime['follower']['p1'].unique()
    });
    var tmpj = 0;
    var j_y = 0;
    var y_step = 35;
    for (var key in runtime['source']['rt']) {
        runtime['source']['rt'][key]['p1'].push('out');
        j_y = 10 + tmpj * y_step;
        tmpj = tmpj + 1;
        var left1 = devs.Model.create({
            rect: {
                x: xy[1],
                y: j_y,
                width: xy[2],
                height: 30
            },
            label: runtime['source']['rt'][key]['runtime_name'],
            labelAttrs: {
                'font-weight': 'bold',
                fill: 'white',
                'font-size': '12px'
            },
            attrs: {
                fill: "red"
            },
            shadow: true,
            iPorts: ["in"],
            oPorts: runtime['source']['rt'][key]['p1'].unique()
        });
        left1.wrapper.dblclick(function(event) {
            document.location = "#" + runtime['source']['rt'][key]['taskkey'];
        });
        for (var k in runtime['source']['rt'][key]['p2'])
            left1.port("o", k).joint(c1.port("i", runtime['source']['rt'][key]['p2'][k]), arrow);
    }
    tmpj = 0;
    j_y = 0;
    for (var key in runtime['follower']['rt']) {
        runtime['follower']['rt'][key]['p1'].push('in');
        j_y = 10 + tmpj * y_step;
        tmpj = tmpj + 1;
        var right1 = devs.Model.create({
            rect: {
                x: xy[5],
                y: j_y,
                width: xy[6],
                height: 30
            },
            label: runtime['follower']['rt'][key]['runtime_name'],
            attrs: {
                fill: "red"
            },
            labelAttrs: {
                'font-weight': 'bold',
                fill: 'white',
                'font-size': '12px'
            },
            shadow: true,
            iPorts: runtime['follower']['rt'][key]['p1'].unique(),
            oPorts: ["out"]
        });
        right1.wrapper.dblclick(function(event) {
            document.location = "#" + runtime['follower']['rt'][key]['taskkey'];
        });
        for (var k in runtime['follower']['rt'][key]['p2'])
            c1.port("o", k).joint(right1.port("i", runtime['follower']['rt'][key]['p2'][k]), arrow);
    }
}
function create_runtime_div(n, rt) {
    var div_html = '	<div class="comment comment-published odd">';
    div_html += '	  <div class="clear-block">';
    div_html += '		<span class="submitted" style="float: right">' + rt['updated'] + ' - ' + rt['status'] + '</span>';
    div_html += '		<h4>' + rt['key'] + '</h4>';
    div_html += '		<div class="content">';
    div_html += '		  <p>   ';
    div_html += '		   <table width="100%" border="0" cellpadding="0" cellspacing="1" class="wftab">';
    for (var i = 0; i < rt['content'].length; i++) {
        var oo = (rt['content'][i][0]) ? ':' : '';
        var vv = $('<div/>').text(rt['content'][i][1]).html();
        div_html += '		      <tr><td class="wftdl" nowrap>' + rt['content'][i][0] + oo + '</td></td><td class="wftdm">&nbsp;</td><td class="wftdr" nowrap>' + vv + '</td></tr>';
    }
    div_html += '          </table>';
    div_html += '		  </p>';
    div_html += '		</div>';
    div_html += '		<div id="c3workflow_world' + n.toString() + '"></div>';
    div_html += '	  </div>';
    div_html += '	  <div class="links">';
    div_html += '		<ul class="links">';
    div_html += '		  <li class="rt_stop first" style="display:inline"><a href="javascript:send_c3message(\'c3_stop_runtime\',\'' + rt['key'] + '\');"> Stop</a></li>';
    div_html += '		  <li class="rt_delete first" style="display:inline"><a href="javascript:send_c3message(\'c3_delete_runtime\',\'' + rt['key'] + '\');"> Delete</a></li>';
    div_html += '		  <li class="rt_activate" style="display:inline"><a href="javascript:send_c3message(\'c3_activate_runtime\',\'' + rt['key'] + '\');"> Activate</a></li>';
    div_html += '		  <li class="rt_promote" style="display:inline"><a href="javascript:send_c3message(\'c3_promote_runtime\',\'' + rt['key'] + '\');"> Promote</a></li>';
    div_html += '		  <li class="rt_logs last" style="display:inline"><a href="javascript:return false;"> Logs </a></li>';
    div_html += '		</ul>';
    div_html += '	  </div>';
    div_html += '	</div>';
    var runtimes = document.getElementById('runtimes');
    var div = document.createElement("div");
    div.innerHTML = div_html;
    runtimes.appendChild(div);
    //create_runtime(n);
}
//prettyPrint();
var ascensor = $("#c3Building").ascensor({
    childType: "section",
    ascensorFloorName: ["Home", "Definition", "Publish", "Event", "Visualization", "Workflow", "SDK", "License"],
    time: 300,
    windowsOn: 0,
    direction: [[1, 0], [2, 0], [2, 1], [2, 2], [2, 3], [1, 3], [0, 3], [0, 2]],
    easing: "easeInOutQuad",
    keyNavigation: !0,
    swipeNavigation: 0,
    wheelNavigation: 0,
    loop: "increment",
    queued: "y"
});
var ascensorInstance = $('#c3Building').data('ascensor');
$(".links-to-floor li").click(function(event, index) {
    ascensorInstance.scrollToFloor($(this).index());
});
$(".links-to-floor li:eq(" + ascensor.data("current-floor") + ")").addClass("selected");
ascensor.on("scrollStart", function(event, floor) {
    $(".links-to-floor li").removeClass("selected");
    $(".links-to-floor li:eq(" + floor.to + ")").addClass("selected");
});
$(".prev").click(function() {
    ascensorInstance.prev();
});
$(".next").click(function() {
    ascensorInstance.next();
});
$(".direction").click(function() {
    ascensorInstance.scrollToDirection($(this).data("direction"));
});
//ascensorInstance.destroy();

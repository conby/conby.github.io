function handleJsonSource(s){/.*\.json$/.test(s)?document.getElementById("yarn_jsonsource").value=s+"?t="+(new Date).valueOf():document.getElementById("yarn_jsonsource").value=s}function onVtypeChange(s){document.getElementById("sunburstpartition_radio").style.display="none",document.getElementById("hierarchicaledgebundling_range").style.display="none",document.getElementById("treemap_select").style.display="none",document.getElementById("jsonsource").value="flare.json",d3.select(window).on("click",null);try{navigator.userAgent.match(/mobile/i)&&($(".d3-draw-area")[0].style.height="336px"),updateVtypeChange&&"function"==typeof updateVtypeChange&&(updateVtypeChange=null)}catch(s){}switch(s){case"timeline":c3dv.css("c3js/v_timeline.css","c3dvcss",!0),c3dv.js("c3js/bootstrap-tooltip.js","c3dvjs_bootstrap_tooltip",!0,null),c3dv.js("c3js/v_timeline.js","c3dvjs",!0,null);break;case"areagradient":c3dv.css("c3js/v_areagradient.css","c3dvcss",!0),c3dv.js("c3js/v_areagradient.js","c3dvjs",!0,null);break;case"barhierarchy":c3dv.css("c3js/v_barhierarchy.css","c3dvcss",!0),c3dv.js("c3js/v_barhierarchy.js","c3dvjs",!0,null);break;case"chart":c3dv.css("c3js/v_chart.css","c3dvcss",!0),c3dv.js("c3js/v_chart.js","c3dvjs",!0,null);break;case"bubblechart":c3dv.css("c3js/v_bubblechart.css","c3dvcss",!0),c3dv.js("c3js/v_bubblechart.js","c3dvjs",!0,null);break;case"bubbleby":c3dv.css("c3js/v_bubbleby.css","c3dvcss",!0),c3dv.js("c3js/v_bubbleby.js","c3dvjs",!0,null);break;case"showreel":c3dv.css("c3js/v_showreel.css","c3dvcss",!0),c3dv.js("c3js/v_showreel.js","c3dvjs",!0,null);break;case"cluster":c3dv.css("c3js/v_cluster.css","c3dvcss",!0),c3dv.js("c3js/v_cluster.js","c3dvjs",!0,null);break;case"chorddiagram":c3dv.css("c3js/v_chorddiagram.css","c3dvcss",!0),c3dv.js("c3js/v_chorddiagram.js","c3dvjs",!0,null);break;case"hierarchicaledgebundling":c3dv.css("c3js/v_hierarchicaledgebundling.css","c3dvcss",!0),c3dv.js("c3js/v_hierarchicaledgebundling.js","c3dvjs",!0,null);break;case"forcecollapsible":c3dv.css("c3js/v_forcecollapsible.css","c3dvcss",!0),c3dv.js("c3js/v_forcecollapsible.js","c3dvjs",!0,null);break;case"forcedirectedgraph":c3dv.css("c3js/v_forcedirectedgraph.css","c3dvcss",!0),c3dv.js("c3js/v_forcedirectedgraph.js","c3dvjs",!0,null);break;case"packhierarchy":c3dv.css("c3js/v_packhierarchy.css","c3dvcss",!0),c3dv.js("c3js/v_packhierarchy.js","c3dvjs",!0,null);break;case"radial":c3dv.css("c3js/v_radial.css","c3dvcss",!0),c3dv.js("c3js/v_radial.js","c3dvjs",!0,null);break;case"partition":c3dv.css("c3js/v_partition.css","c3dvcss",!0),c3dv.js("c3js/v_partition.js","c3dvjs",!0,null);break;case"bilevelpartition":c3dv.css("c3js/v_bilevelpartition.css","c3dvcss",!0),c3dv.js("c3js/v_bilevelpartition.js","c3dvjs",!0,null);break;case"sunburstpartition":c3dv.css("c3js/v_sunburstpartition.css","c3dvcss",!0),c3dv.js("c3js/v_sunburstpartition.js","c3dvjs",!0,null);break;case"sequencessunburst":c3dv.css("c3js/v_sequencessunburst.css","c3dvcss",!0),c3dv.js("c3js/v_sequencessunburst.js","c3dvjs",!0,null);break;case"treemap":c3dv.css("c3js/v_treemap.css","c3dvcss",!0),c3dv.js("c3js/v_treemap.js","c3dvjs",!0,null);break;case"ddzpcta":c3dv.css("c3js/v_ddzpcta.css","c3dvcss",!0),c3dv.js("c3js/v_ddzpcta.js","c3dvjs",!0,null);break;default:c3dv.css("c3js/v_forcecollapsible.css","c3dvcss",!0),c3dv.js("c3js/v_forcecollapsible.js","c3dvjs",!0,null)}}function startVisualizationApp(){messageContainer=document.getElementById("chat"),"WebSocket"in window?mc=messageContainer.appendChild(createChatEntry("C3","Input C3 Hook, e.g. c3://1aec91bc081c11e4903e4ed6eaf04282.xc",2e3)):mc=messageContainer.appendChild(createChatEntry("C3","WebSocket is NOT supported by your browser!",2e3)),ow=document.getElementById("chat").offsetWidth,oh=document.getElementById("chat").offsetHeight,$("#message").keydown(function(s){if(13==s.keyCode)return sendMessage("username","message","visualization"),!1})}
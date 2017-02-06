function updateVtypeChange(t){json_source=JSON.parse(t);var e=json_source;svg.selectAll("*").remove(),svgg=svg.append("g").attr("transform","translate("+w/2+","+.52*h+")"),start(e)}function start(t){function e(t){t.depth>1&&(t=t.parent),t.children&&r(t,t)}function n(t){t.parent&&r(t.parent,t)}function r(t,n){function r(t){return n.key>t.key?{depth:t.depth-1,x:0,dx:0}:n.key<t.key?{depth:t.depth-1,x:2*Math.PI,dx:0}:{depth:0,x:0,dx:2*Math.PI}}function u(t){return{depth:t.depth+1,x:d(t.x),dx:d(t.x+t.dx)-d(t.x)}}if(!document.documentElement.__transition__){var c,o,d=d3.scale.linear().domain([0,2*Math.PI]);a.datum(t),t===n&&(c=u,o=r,d.range([n.x,n.x+n.dx])),i=i.data(partition.nodes(t).slice(1),function(t){return t.key}),t!==n&&(c=r,o=u,d.range([n.x,n.x+n.dx])),d3.transition().duration(d3.event.altKey?7500:750).each(function(){i.exit().transition().style("fill-opacity",function(e){return e.depth===1+(t===n)?1:0}).attrTween("d",function(t){return arcTween.call(this,o(t))}).remove(),i.enter().append("path").style("fill-opacity",function(e){return e.depth===2-(t===n)?1:0}).style("fill",function(t){return t.fill}).on("click",e).each(function(t){this._current=c(t)}),i.transition().style("fill-opacity",1).attrTween("d",function(t){return arcTween.call(this,updateArc(t))})})}}partition.value(function(t){return t.size}).nodes(t).forEach(function(t){t._children=t.children,t.sum=t.value,t.key=key(t),t.fill=fill(t)}),partition.children(function(t,e){return e<2?t._children:null}).value(function(t){return t.sum});var a=svgg.append("circle").attr("r",radius/3).style("fill-opacity",0).on("click",n);a.append("title").text("zoom out");var i=svgg.selectAll("path").data(partition.nodes(t).slice(1)).enter().append("path").attr("d",arc).style("fill",function(t){return t.fill}).each(function(t){this._current=updateArc(t)}).on("click",e);d3.select(self.frameElement).style("height",h+"px")}function key(t){for(var e=[],n=t;n.depth;)e.push(n.name),n=n.parent;return e.reverse().join(".")}function fill(t){for(var e=t;e.depth>1;)e=e.parent;var n=d3.lab(hue(e.name));return n.l=luminance(t.sum),n}function arcTween(t){var e=d3.interpolate(this._current,t);return this._current=e(0),function(t){return arc(e(t))}}function updateArc(t){return{depth:t.depth,x:t.x,dx:t.dx}}w=ow,h=oh;var radius=Math.min(w,h)/2-30,hue=d3.scale.category10(),luminance=d3.scale.sqrt().domain([0,1e6]).clamp(!0).range([90,20]);svg&&svg.remove(),svg=d3.select("#chat").append("svg").attr("width",w).attr("height",h);var svgg=svg.append("g").attr("transform","translate("+w/2+","+.52*h+")"),partition=d3.layout.partition().sort(function(t,e){return d3.ascending(t.name,e.name)}).size([2*Math.PI,radius]),arc=d3.svg.arc().startAngle(function(t){return t.x}).endAngle(function(t){return t.x+t.dx}).padAngle(.01).padRadius(radius/3).innerRadius(function(t){return radius/3*t.depth}).outerRadius(function(t){return radius/3*(t.depth+1)-1});json_source?start(json_source):d3.json(document.getElementById("jsonsource").value,function(t,e){start(e)});
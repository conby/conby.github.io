function updateVtypeChange(t){json_source=JSON.parse(t),svg.selectAll("*").remove(),svgg=svg.append("svg:g").attr("transform","translate("+m[3]+","+m[0]+")"),svgg.append("svg:rect").attr("class","background").attr("width",w).attr("height",h).on("click",up),svgg.append("svg:g").attr("class","x axis"),svgg.append("svg:g").attr("class","y axis").append("svg:line").attr("y1","100%"),hierarchy.nodes(json_source),x.domain([0,json_source.value]).nice(),down(json_source,0)}function down(t,e){if(t.children&&!this.__transition__){var n=d3.event&&d3.event.altKey?7500:750,a=n/t.children.length,r=svgg.selectAll(".enter").attr("class","exit");r.selectAll("rect").filter(function(e){return e===t}).style("fill-opacity",1e-6);var s=bar(t).attr("transform",stack(e)).style("opacity",1);s.select("text").style("fill-opacity",1e-6),s.select("rect").style("fill",z(!0)),x.domain([0,d3.max(t.children,function(t){return t.value})]).nice(),svgg.selectAll(".x.axis").transition().duration(n).call(xaxis);var i=s.transition().duration(n).delay(function(t,e){return e*a}).attr("transform",function(t,e){return"translate(0,"+y*e*1.2+")"});i.select("text").style("fill-opacity",1),i.select("rect").attr("width",function(t){return x(t.value)}).style("fill",function(t){return z(!!t.children)});var l=r.transition().duration(n).style("opacity",1e-6).remove();l.selectAll("rect").attr("width",function(t){return x(t.value)}),svgg.select(".background").data([t]).transition().duration(2*n),t.index=e}}function up(t){if(t.parent&&!this.__transition__){var e=d3.event&&d3.event.altKey?7500:750,n=e/t.children.length,a=svgg.selectAll(".enter").attr("class","exit"),r=bar(t.parent).attr("transform",function(t,e){return"translate(0,"+y*e*1.2+")"}).style("opacity",1e-6);r.select("rect").style("fill",function(t){return z(!!t.children)}).filter(function(e){return e===t}).style("fill-opacity",1e-6),x.domain([0,d3.max(t.parent.children,function(t){return t.value})]).nice(),svgg.selectAll(".x.axis").transition().duration(2*e).call(xaxis);var s=r.transition().duration(2*e).style("opacity",1);s.select("rect").attr("width",function(t){return x(t.value)}).each("end",function(e){e===t&&d3.select(this).style("fill-opacity",null)});var i=a.selectAll("g").transition().duration(e).delay(function(t,e){return e*n}).attr("transform",stack(t.index));i.select("text").style("fill-opacity",1e-6),i.select("rect").attr("width",function(t){return x(t.value)}).style("fill",z(!0)),a.transition().duration(2*e).remove(),svgg.select(".background").data([t.parent]).transition().duration(2*e)}}function bar(t){var e=svgg.insert("svg:g",".y.axis").attr("class","enter").attr("transform","translate(0,5)").selectAll("g").data(t.children).enter().append("svg:g").style("cursor",function(t){return t.children?"pointer":null}).on("click",down);return e.append("svg:text").attr("x",-6).attr("y",y/2).attr("dy",".35em").attr("text-anchor","end").text(function(t){return t.name}),e.append("svg:rect").attr("width",function(t){return x(t.value)}).attr("height",y),e}function stack(t){var e=0;return function(n){var a="translate("+e+","+y*t*1.2+")";return e+=x(n.value),a}}var m,x,y,z,hierarchy,xaxis,svgg;w=ow,h=oh,m=[50,50,0,50],w=w-m[1]-m[3],h=h-m[0]-m[2],x=d3.scale.linear().range([0,w]),y=25,z=d3.scale.ordinal().range(["steelblue","#aaa"]),hierarchy=d3.layout.partition().value(function(t){return t.size}),xaxis=d3.svg.axis().scale(x).orient("top"),svg&&svg.remove(),svg=d3.select("#chat").append("svg:svg").attr("width",w+m[1]+m[3]).attr("height",h+m[0]+m[2]),svgg=svg.append("svg:g").attr("transform","translate("+m[3]+","+m[0]+")"),svgg.append("svg:rect").attr("class","background").attr("width",w).attr("height",h).on("click",up),svgg.append("svg:g").attr("class","x axis"),svgg.append("svg:g").attr("class","y axis").append("svg:line").attr("y1","100%"),json_source?(hierarchy.nodes(json_source),x.domain([0,json_source.value]).nice(),down(json_source,0)):d3.json(document.getElementById("jsonsource").value,function(t){json_source=t,hierarchy.nodes(t),x.domain([0,t.value]).nice(),down(t,0)});
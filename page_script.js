function drawTimeSeries(s,y)
{
	document.getElementById("line_graph").innerHTML="";
    lineDraw(s,y);
}

names_list = [];
var var_st;
var map_color="lightblue";
var states_name_array = [];

lineDraw("Texas","2016");
//Function to plot line graph
function lineDraw(state,year)
{
			var margin = {top: 40, right: 20, bottom: 30, left: 50},
			width = 800 - margin.left - margin.right + 100,
			height = 600 - margin.top - margin.bottom,
			margin2 = { top: 300, right: 10, bottom: 20, left: 40 },
			height2 = 500 - margin2.top - margin2.bottom;
			
		// Parse the date / time
		var parseDate2 = d3.time.format("%B-%Y").parse;
		
		// Set the ranges
	   var x = d3.time.scale()
           .range([0, width]),

           xScale2 = d3.time.scale()
          .range([0, width]); // Duplicate xScale for brushing ref later
					
	   var y = d3.scale.linear()
	       .range([height, 0]);
		
		
		// Define the div for the tooltip
		var div = d3.select("body").append("div")	
			.attr("class", "tooltip")				
			.style("opacity", 0);
			
		// Define the axes
		var xAxis = d3.svg.axis().scale(x)
			.orient("bottom").ticks(10),
			
		    xAxis2 = d3.svg.axis() // Axis for brush slider
		   .scale(xScale2)
		   .orient("bottom").ticks(10);

	    var yAxis = d3.svg.axis().scale(y)
		    .orient("left").ticks(10);

		
		// Define the line
		var valueline = d3.svg.line()
			.x(function(d) { return x(d.date); })
			.y(function(d) { return y(d.unemployment); });
		
		
		
    // Adds the svg canvas
    svg = d3.select(line_graph).append("svg")
   .attr("width", width + margin.left + margin.right + 100)
   .attr("height", height + margin.top + margin.bottom +100)
   .append("g")
   .attr("transform","translate(" + margin.left + "," + margin.top + ")") 
   .on("mouseover", function(d) {		
	})
		
		
		// Get the data
		var empData = {};
		var color = d3.scale.category20();  //color scale

		d3.csv("unemploymentRate.csv", function(error, data) {
			data.forEach(function(d){
			var i = names_list.indexOf(d.states);
			if(i > -1)
			     {
				 if(empData[d.states]== undefined)
					empData[d.states]=[];
				    empData[d.states].push(d);
				}		
				});
			  
			 for(var statesname in empData){
				 empData[statesname].forEach(function(d){
				 d.date=parseDate2(d.month+"-"+d.year);
				 d.unemployment = +d["unemployment"];
				});

			  empData[statesname].sort(function(a,b){
                      if (a.date<b.date)
					  return -1;
					  else if (a.date>b.date)
					  return 1;
					  else
					  return 0;
					  });
					 }
				
		    
		    for (var statesname in empData )
			 {
			   states_name_array.push(empData[statesname]);
			 }


		  // Scale the range of the data
		  x.domain(d3.extent(states_name_array[0], function(d) { return d.date; }));
	      var i=0;
		  while(names_list.length > i) {
		       if( names_list[i] == "Puerto Rico" )
			     {
				   y.domain([0, 25]);
				   break;
				 }
				   else
				 {
					y.domain([0, 15]);
				 }
				 i=i+1;
				  }
				
		// Add the valueline path.
	     svg.selectAll(".line")
		.data(states_name_array).enter()
	    .append("path")
	    .attr("class", "line")
		.attr("stroke-width","2")
		.attr("stroke","brown")
		.attr("fill","none")
		.attr("clip-path","url(#clip)")						
		.attr("stroke",function(d){
		var line_color=color(d[0].states);
		return line_color;
		 })
		.attr("d",function(d){
		return valueline(d);
	    })
		
		.on("mouseover", function(d1){
	    var st_name;
		svg.selectAll(".line")
	   .transition().duration(300)
	   .attr("stroke-width",function(d2){
	   if(d1==d2)
	   {	
		return 3;
	   }
	   else
	   return 2;
	   })
	   .attr("stroke-opacity",function(d2){
	   if(d1==d2)
	  {	
       var_st = (names_list.indexOf(""+d1[0].states));
	   st_name=d1[0].states;
	   document.getElementById("cls").innerHTML=""+d2[0].states;
	   return 1; }
	   else
	   return 0;
	   })									
											
	   svg.selectAll("circle")
	  .data(states_name_array[var_st])
	  .enter()
	  .append("circle")
	  .attr("opacity",0)
      .attr("cx", function(d){
	  return x(d.date);
	  })
	  .attr("cy", function(d){
	  return y(d.unemployment);
	  })	
	  .attr("r", 10)
	  .append("title")
	  .attr("opacity",1)
	  .text(function(d){
	  return "Unemployment Rate of "+d.states +" in "+d.month+" "+d.year+" is "+d.unemployment +"%" ;})
	  }) 
	 
	 .on("mouseout", function(d2){
	  svg.selectAll(".line")
	  .transition().duration(300)
	  .attr("stroke-opacity", 1)
	  .attr("stroke-width",2);
	
	  svg.selectAll("circle")	
	  .transition()
	  .delay(500)
	  .remove();
	  document.getElementById("cls").innerHTML="";
	})
	
	// Add the X Axis
	svg.append("g")
    .attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")") //X axis line position
    .call(xAxis);

	 // Add the Y Axis
	 svg.append("g")
	 .attr("class", "y axis")
     .call(yAxis);
		
     //Add yaxis label		
	  svg.append("g")
	  .attr("class", "y axis")
      .call(yAxis)
	  .append("text")
	  .attr("transform", "rotate(-90)")
	  .attr("y", 6)
	  .attr("x", -10)
	  .attr("dy", ".71em")
	  .style("text-anchor", "end")
	  .text("Unemployment Rate");
							
	//Set xaxis label			
	   svg.append("g")
	   .attr("class", "y axis")
	   .call(yAxis)
	   .append("text")
	   .attr("transform", "rotate(0)")
	   .attr("y", 510)
	   .attr("x", 800)
	   .attr("dy", ".71em")
	   .style("text-anchor", "end")
	   .text("Date");

	   xScale2.domain(x.domain()); // Setting a duplicate xdomain for brushing reference later
							
	   var brush = d3.svg.brush()//for slider bar at the bottom
	   .x(xScale2) 
	   .on("brush", function () {
	    x.domain(brush.empty() ? xScale2.domain() : brush.extent()); 
		
	    svg.select(".x.axis")
	   .transition()
	   .call(xAxis);
	   
	   var us_states = svg.selectAll(".us_states")
	   .append("g")
	   .attr("class", "us_states");
							  
     //Redraw the line 
	  svg.selectAll(".line")
	  .attr("class", "line")
	  .attr("stroke-width","2")
	  .attr("stroke","brown")
	  .attr("fill","none")
	  .attr("clip-path","url(#clip)")
	  .attr("stroke",function(d){
	  var line_color=color(d[0].states);
	  return line_color;
	  })
	  .attr("d",function(d){return valueline(d);})
	  
	  .on("mouseover", function(d1){
	   var st_name;
	   svg.selectAll(".line")
	   .transition().duration(300)
	   .attr("stroke-width",function(d2){
	    if(d1==d2){	
	    return 3;
		  }
	    else
	    return 2;
		 })
	    .attr("stroke-opacity",function(d2){
	    if(d1==d2)
		{	
	   var_st = (names_list.indexOf(""+d1[0].states));
	   st_name=d1[0].states;
	   document.getElementById("cls").innerHTML=""+d2[0].states;
	   return 1;
		 }
	   else
	   return 0;
	   })
											
	   svg.selectAll("circle")
	   .data(states_name_array[var_st])
	   .enter()
	   .append("circle")
	   .attr("opacity",0)
       .attr("cx", function(d){
        return x(d.date);
		 })
	    .attr("cy", function(d){
        return y(d.unemployment);
		})	
		.attr("r", 10)
	    .append("title")
		.attr("opacity",1)
		.text(function(d){return "Unemployment Rate of "+d.states +" in "+d.month+" "+d.year+" is "+d.unemployment +"%" ;})
		})
	   
	   .on("mouseout", function(d2){
	   svg.selectAll(".line")
	   .transition().duration(300)
	   .attr("stroke-opacity", 1)
	   .attr("stroke-width",2);
	   
	   svg.selectAll("circle")	
	   .transition()
       .delay(500)
	   .remove();
	   document.getElementById("cls").innerHTML="";
		})
	  
	  us_states.selectAll(".line") 
	  .transition()
	  .attr("stroke","steelblue")
	  .attr("fill","none")
	  .attr("d", function(d){
	   return d.unemployment ? line(d.unemployment) : null; 
							});
		});

//Slider Part			  
	 var context = svg.append("g") // Brushing context box container
	 .attr("transform", "translate(" + 0 + "," + 450 + ")")
     .attr("class", "context")
     .attr("stroke","blue")
     .attr("stroke-opacity",.9)
	 .attr("fill","white");

	 svg.append("defs")
    .append("clipPath") 
    .attr("id", "clip")  
	.append("rect")
	.attr("stroke","blue")			
	.attr("stroke-opacity",.9)
    .attr("stroke-width","2")
	.attr("fill","none")
	.attr("width", width)
    .attr("height", height);  
			
	 context.append("g") // Create brushing xAxis
	 .attr("class", "x axis1")
	 .attr("transform", "translate(0," + [height2] + ")")
	  .call(xAxis2);
			
	 var contextArea = d3.svg.area() 
	 .interpolate("monotone")
	 .x(function(d) { return xScale2(d.date); }) // x is scaled to xScale2
	 .y0(height2) // Bottom line begins at height2 (area line_graph not inverted) 
	 .y1(150); // Top line of area, 0 (area line_graph not inverted)

	 //plot the rect as the bar at the bottom
	 context.append("path") // Path is created using svg.area details
	 .attr("class", "area")
	 .attr("fill","white")
	 .attr("d", contextArea(states_name_array[0])) 
	 .attr("fill", "#F1F1F2");
			
	//append the brush for the selection of subsection  
	context.append("g")
	.attr("class", "x brush")
	.call(brush)
	.selectAll("rect")
	.attr("stroke","steelblue")
	.attr("transform", "translate(0," + 150 + ")")
	.attr("height", height2	)
    .attr("fill", "black")
	.attr("opacity",.4); 
					
	  });
}

mapDraw();

function mapDraw()
{

	d3.csv("unemploymentRate.csv", function(err, data) {

	var config = {"color1":"#d3e5ff","color2":"#08306B","states":"state_or_territory","valueDataColumn":"unemployment"}
			  
	var map_colors = d3.scale.ordinal().range(["#48A36D",  "#56AE7C",  "#64B98C", "#72C39B", "#80CEAA", "#80CCB3", "#7FC9BD", "#7FC7C6", "#7EC4CF", "#7FBBCF", "#7FB1CF", "#80A8CE", "#809ECE", "#8897CE", "#8F90CD", "#9788CD", "#9E81CC", "#AA81C5", "#B681BE", "#C280B7", "#CE80B0", "#D3779F", "#D76D8F", "#DC647E", "#E05A6D", "#E16167", "#E26962", "#E2705C", "#E37756", "#E38457", "#E39158", "#E29D58", "#E2AA59", "#E0B15B", "#DFB95C", "#DDC05E", "#DBC75F", "#E3CF6D", "#EAD67C", "#F2DE8A"]);  

	var WIDTH = 380, HEIGHT = 250;
	var COLOR_COUNTS = 9;
	var SCALE = 0.44; // map size

	function Interpolate(start, end, steps, count) {
		var s = start,
	    e = end,
		final = s + (((e - s) / steps) * count);
	    return Math.floor(final);
		 }
			  
	function Color(_r, _g, _b) {
	   var r, g, b;
	   var setColors = function(_r, _g, _b) {
	   r = _r;
	   g = _g;
	   b = _b;
	  };
			  
   setColors(_r, _g, _b);
   this.getColors = function() {
   var colors = {
	   r: r,
	   g: g,
	   b: b
	      };
  return colors;
		};
	}
			  
  function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
	} : null;
 }
			  
   function valueFormat(d) {
	if (d > 1000000000) {
    return Math.round(d / 1000000000 * 10) / 10 + "B";
	 } else if (d > 1000000) {
	return Math.round(d / 1000000 * 10) / 10 + "M";
	} else if (d > 1000) {
   return Math.round(d / 1000 * 10) / 10 + "K";
   } else {
   return d;
	}
}

	
	var COLOR_FIRST = config.color1, COLOR_LAST = config.color2;
			  
    var rgb = hexToRgb(COLOR_FIRST);
			  
    var COLOR_START = new Color(rgb.r, rgb.g, rgb.b);
			  
    rgb = hexToRgb(COLOR_LAST);
	var COLOR_END = new Color(rgb.r, rgb.g, rgb.b);
			  
    var MAP_STATE = config.stateDataColumn;
    var MAP_VALUE = config.valueDataColumn;
    var width_map = WIDTH,
    height_map = HEIGHT;
	var valueById = d3.map();
			  
    var startColors = COLOR_START.getColors(),
	endColors = COLOR_END.getColors();
   
   var colors = [];
   for (var i = 0; i < COLOR_COUNTS; i++) {
   var r = Interpolate(startColors.r, endColors.r, COLOR_COUNTS, i);
   var g = Interpolate(startColors.g, endColors.g, COLOR_COUNTS, i);
   var b = Interpolate(startColors.b, endColors.b, COLOR_COUNTS, i);
   colors.push(new Color(r, g, b));
	 }
			  
   var quantize = d3.scale.quantize()
	   .domain([0, 1.0])
	   .range(d3.range(COLOR_COUNTS).map(function(i) { return i }));
			  
   var path_map = d3.geo.path();
   var svg = d3.select("#canvas-svg").append("svg")
	   .attr("width", width_map)
	   .attr("height", height_map);
	   
	
			  
   d3.tsv("https://s3-us-west-2.amazonaws.com/vida-public/geo/us-state-names.tsv", function(error, names) {
	
	name_id_map = {};
    id_name_map = {};
			  
   for (var i = 0; i < names.length; i++) {
	name_id_map[names[i].name] = names[i].id;
	id_name_map[names[i].id] = names[i].name;
	 }
			  
   data.forEach(function(d) {
   var id = name_id_map[d[MAP_STATE]];
   valueById.set(id, +d[MAP_VALUE]); 
	});
			  
  quantize.domain([d3.min(data, function(d){ return +d[MAP_VALUE] }),
  d3.max(data, function(d){ return +d[MAP_VALUE] })]);
  var color1 = d3.scale.category20();
  

  
 d3.json("https://s3-us-west-2.amazonaws.com/vida-public/geo/us.json",function(error, us) {
	svg.append("g")
	.attr("class", "states-choropleth")
	.selectAll("path")
	.data(topojson.feature(us, us.objects.states).features)
	.enter().append("path")
	.attr("transform", "scale(" + SCALE + ")")
	.attr("fill",map_color)
	.attr("d", path_map)
	
					
	.on("click", function(d) {
	var i=0;
	
   while(names_list.length > i) {
   if( names_list[i] == id_name_map[d.id] )
	{
		i=-1;
		names_list.splice(names_list.indexOf(id_name_map[d.id]),1);
		$(this).attr("fill", "lightgray");
	    $(this).attr("opacity", .9);
		break;
		}
		i=i+1;
		 }
		
		if(i!=-1)
			{	
			var k=0;
			names_list.push(id_name_map[d.id]);
			d3.select(this)
            .transition()
            .attr("fill", function(d) {
             return map_colors(names_list) ;
             });
   }
								
		document.getElementById("clear").disabled=false;		
	    drawTimeSeries(id_name_map[d.id],"2015");								
					})

		//tooltip
		.on("mousemove", function(d) {
		var html = "";
			  
		html += "<div class=\"tooltip_kv\">";
		html += "<span class=\"tooltip_key\">";
		html += id_name_map[d.id];
		html += "</span>";
		html += "<span class=\"tooltip_value\">";
		html += (valueById.get(d.id) ? valueFormat(valueById.get(d.id)) : "");
		html += "";
		html += "</span>";
		html += "</div>";
		$("#tooltip-container").html(html);
		$(this).attr("fill-opacity", "0.5");
		$("#tooltip-container").show();
		var coordinates = d3.mouse(this);
		var map_width = $('.states-choropleth')[0].getBoundingClientRect().width;
						
		if (d3.event.layerX < map_width / 2) {
		    d3.select("#tooltip-container")
			.style("top", (d3.event.layerY + 15) + "px")
			.style("left", (d3.event.layerX + 15) + "px");
			} else {
		    var tooltip_width = $("#tooltip-container").width();
		    d3.select("#tooltip-container")
			.style("top", (d3.event.layerY + 15) + "px")
			.style("left", (d3.event.layerX - tooltip_width - 30) +"px");
						}
					})
					
			.on("mouseout", function() {
			$(this).attr("fill-opacity", "1.0");
			$("#tooltip-container").hide();
				});
			  
		    svg.append("path")
			.datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
			.attr("class", "states")
			.attr("transform", "scale(" + SCALE + ")")
			.attr("d", path_map);// variable path
			 });
		 });
	});
}

var all_states = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","District of Columbia","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada"," New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming","Puerto Rico"];

function reset()
{
	while(names_list.length > 0) {
		names_list.pop();
	}
	map_color="lightblue";
	document.getElementById("lb").innerHTML ="";
	document.getElementById("canvas-svg").innerHTML ="";
	document.getElementById("line_graph").innerHTML ="";
	drawTimeSeries("","");
	mapDraw();
	document.getElementById("clear").disabled=true;
}

function All_states_graph()
{
	var dcolor = d3.scale.category20();  
	while(names_list.length > 0) {
		names_list.pop();
	}
	for(var i=0;i<all_states.length;i++)
	{
		names_list.push(all_states[i]);
		
	}
	
	document.getElementById("canvas-svg").innerHTML ="";
	mapDraw();
	document.getElementById("clear").disabled =false;
	drawTimeSeries("","");
}


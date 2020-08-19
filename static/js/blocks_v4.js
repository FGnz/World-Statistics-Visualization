var margin = {top: 0, right: 0, bottom: 0, left: 0},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;


var current_year = '2005'
var dashboardColor;

var total_count = 0;
var feature_value;

var minYear = 2500;
var maxYear = 1500;

var map_features = ["GDP per capita (current LCU)",
                    "Health expenditure, public (% of GDP)",
                    "Immunization, BCG (% of one-year-old children)",
                    "Improved sanitation facilities (% of population with access)",
                    "Unemployment, total (% of total labor force)"]

var map_svg, bar_svg, line_svg, feat_svg, bi_svg, sm_svg,test_svg,test1_svg,svg;


// var map_features = ["GDP per Capita", "Life Expectancy"];
var current_feature;


function initialize(data, mds_data, sm_data){
  // console.log("v1")
  // render_map_plot();

  current_feature = map_features[0];

  prepare_dropdown();

  map_svg = d3.select("#graph").append("svg:svg")
  map_svg.attr("id", "map_svg")

  line_svg = d3.select("#line_chart").append("svg:svg")
  line_svg.attr("id", "line_svg")

  bar_svg = d3.select("#bar_chart").append("svg:svg")
  bar_svg.attr("id", "bar_svg")

  

  test_svg = d3.select("#test_chart").append("svg:svg")
  test_svg.attr("id", "test_svg")

  test1_svg = d3.select("#test1_chart").append("svg:svg")
  test1_svg.attr("id", "test1_svg")

  svg = d3.select("#my_dataviz").append("svg:svg")
  svg.attr("id", "svg")

  console.log("v2");
  render_plot(data, mds_data, sm_data);
}


function render_plot(data, mds_data, sm_data, bi_data, feat_data, drawMDS=true, drawSM=true){

  // d3.selectAll("svg > *").remove();
  render_map_plot_v2(data);
  //console.log("MDS DATA")
  //console.log(mds_data)
  //console.log("Finish mds")
  //console.log("Scatter Matrix DATA")
  //console.log(sm_data)
  //console.log("Finish sm")
 // console.log("SCatter Plot MAtrix Data DataDataDataDataData"+ bi_data)
  if(drawMDS){
    drawScatter(mds_data);
  }
  
 
  id = "test_chart";
  dashboard("RUS",(0.085 * ((Math.random() * 1))).toFixed(4),2005);
dashboard1(mds_data,400,13000,40,90);
dashboard2();

//dashboard4(mds_data,sm_data);
}




function dashboard2(){
  svg.selectAll("*").remove();
  var width_dashboard2 = -168
  var g = svg
    .attr("width", "610")
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(20," + width_dashboard2 + ")")

//Read the data
d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/4_ThreeNum.csv", function(data) {

  // Add X axis
  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 45000])
    .range([ 0, width ]);
  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(3));



  // Add Y axis
  var y = d3.scaleLinear()
    .domain([15, 40])
    .range([ height, 0]);
  g.append("g")
    .call(d3.axisLeft(y));

  // Add a scale for bubble size
  var z = d3.scaleLinear()
    .domain([200000, 1310000000])
    .range([ 2, 30]);

  

      // var color = d3.scaleOrdinal();
  // Add a scale for bubble color
  var myColor = d3.scaleOrdinal(d3.schemeCategory10)
  .domain(["Asia", "Europe", "Americas", "Africa", "Oceania"]);


  // Add dots
  g.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    
    .attr("class", function(d) { return "bubbles " + d.continent })
      .attr("cx", function (d) { return x(d.gdpPercap * .40  * ((Math.random() * 2) + 2)); } )
      .attr("cy", function (d) { return y(d.lifeExp * .40 /* (Math.random() * 1) + 0.1*/); } )
      .attr("r", function (d) { return z(d.pop * 1.1); } )
      //.style("fill", "#69b3a2")
      .style("fill", function (d) { return myColor(d.continent); } )
      //.style("opacity", "0.7")
      .attr("stroke", "black")
      .on("mouseover", function(d) {
        //console.log("This is the tooltip"+d)
        tooltip
          .transition()
          .duration(50)
        tooltip
          .style("opacity", 1)
          .text("Country: " + d.country)
        return tooltip.style("visibility", "visible"); 
      }

    )
    .on("mousemove", function(d) {
      return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");
    } )
    .on("mouseleave", function(d) {
      tooltip
        .transition()
        .duration(50)
        .style("opacity", 0)
    } )
      
    var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("background-color", "black")
    .style("color", "white");

   
  // ---------------------------//
  //      TOOLTIP               //
  // ---------------------------//

  // -1- Create a tooltip div that is hidden by default:
  // var tooltip = d3.select("#my_dataviz")
  //   .append("g")
  //     .style("opacity", 0)
  //     .attr("class", "tooltip")
  //     .style("background-color", "black")
  //     .style("color", "white")

  // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
  // var showTooltip = function(d) {
  //   console.log("This is the tooltip"+d)
  //   tooltip
  //     .transition()
  //     .duration(200)
  //   tooltip
  //     .style("opacity", 1)
  //     .html("Country: " + d.country)
  //     .style("left", (d3.mouse(this)[0]) + "px")
  //     .style("top", (d3.mouse(this)[1]) + "px")
  // }
  // var moveTooltip = function(d) {
  //   tooltip
  //     .style("left", (d3.mouse(this)[0]) + "px")
  //     .style("top", (d3.mouse(this)[1]) + "px")
  // }
  // var hideTooltip = function(d) {
  //   tooltip
  //     .transition()
  //     .duration(200)
  //     .style("opacity", 0)
  // }


       // ---------------------------//
  //       HIGHLIGHT GROUP      //
  // ---------------------------//

  // What to do when one group is hovered
  var highlight = function(d){

    console.log("Highligh has been hovered");
    // reduce opacity of all groups
    d3.selectAll(".bubbles").style("opacity", .05)
    // expect the one that is hovered
    d3.selectAll("."+d).style("opacity", 1)
  }

  // And when it is not hovered anymore
  var noHighlight = function(d){
    d3.selectAll(".bubbles").style("opacity", 1)
  }



    // ---------------------------//
    //       LEGEND              //
    // ---------------------------//

    // Add legend: circles
    var valuesToShow = [10000000, 100000000, 1000000000]
    var xCircle = 390
    var xLabel = 440
    g
      .selectAll("legend")
      .data(valuesToShow)
      .enter()
      .append("circle")
        .attr("cx", xCircle)
        .attr("cy", function(d){ return height - 100 - z(d) } )
        .attr("r", function(d){ return z(d) })
        .style("fill", "none")
        .attr("stroke", "black")

    // Add legend: segments
    g
      .selectAll("legend")
      .data(valuesToShow)
      .enter()
      .append("line")
        .attr('x1', function(d){ return xCircle + z(d) } )
        .attr('x2', xLabel)
        .attr('y1', function(d){ return height - 100 - z(d) } )
        .attr('y2', function(d){ return height - 100 - z(d) } )
        .attr('stroke', 'black')
        .style('stroke-dasharray', ('2,2'))

    // Add legend: labels
    g
      .selectAll("legend")
      .data(valuesToShow)
      .enter()
      .append("text")
        .attr('x', xLabel)
        .attr('y', function(d){ return height - 100 - z(d) } )
        .text( function(d){ return d/1000000 } )
        .style("font-size", 10)
        .attr('alignment-baseline', 'middle')

    // Legend title
    g.append("text")
      .attr('x', xCircle)
      .attr("y", height - 100 +30)
      .text("Population (M)")
      .attr("text-anchor", "middle")

    // Add one dot in the legend for each name.
    var size = 20
    var allgroups = ["Asia", "Europe", "Americas", "Africa", "Oceania"]
    g.selectAll("myrect")
      .data(allgroups)
      .enter()
      .append("circle")
        .attr("cx", 500)
        .attr("cy", function(d,i){ return 300 + i*(20)}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", 7)
        .style("fill", function(d){ return myColor(d)})
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight)

    // Add labels beside legend dots
    g.selectAll("mylabels")
      .data(allgroups)
      .enter()
      .append("text")
        .attr("x", 520)
        .attr("y", function(d,i){ return 300 + i*(20)}) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d){ return myColor(d)})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .on("mouseover", function(d){

          //console.log("Highligh has been hovered");
          // reduce opacity of all groups
          g.selectAll(".bubbles").style("opacity", .05)
          // expect the one that is hovered
          g.selectAll("."+d).style("opacity", 1)
        })
        .on("mouseleave", function(d){
          d3.selectAll(".bubbles").style("opacity", 1)
        })


  
})
}

function dashboard1(scatter_data,x1,x2,y1,y2){
  
//console.log("This is the final step required for the dashboard to work" + x1,x2,y1,y2);
  test1_svg.selectAll("*").remove();
  //console.log("This is scatter data-"+scatter_data)
  var color = d3.scaleOrdinal(d3.schemeCategory10);
  //console.log("I have been called from the MDS Scatter Plot");

  var zoom = d3
  .zoom()
  //.scaleExtent([1, 1]) // This control how much you can unzoom (x0.5) and zoom (x20)
  //.translateExtent([[-100, -100], [height + 100, width + 100]])
  .on("zoom", zoomed);

// append the SVG object to the body of the page
var bottom_axis = -30;
var g = test1_svg
  //.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .call(zoom)
  .append("g")
  .attr("transform", "translate(" + 25 + "," + bottom_axis  + ")");

var x0 = [x1, x2];
var y0 = [y1, y2];

var x = d3
  .scaleLinear()
  .domain(x0)
  .range([0, 640]);

var y = d3
  .scaleLinear()
  .domain(y0)
  .range([330, 0]);

var newX = x;
var newY = y;

var brush = d3
    .brush()
    .extent([[0, 0], [640, 330]])
    .on("end", brushended),
  idleTimeout,
  idleDelay = 350;

// Add X axis
var xAxis = g.append("g")
  .attr("class", "x axis")
  .attr("id", "axis--x")
  .attr("transform", "translate(0," + 330 + ")")
  .call(d3.axisBottom(x));

// Add Y axis
var yAxis = g.append("g")
  .attr("class", "y axis")
  .attr("id", "axis--y")
  .call(d3.axisLeft(y));

// Add a clipPath: everything out of this area won't be drawn.
var clip = g.append("defs")
  .append("g:clipPath")
  .attr("id", "clip")
  .append("g:rect")
  .attr("width", 550)
  .attr("height", 330)
  .attr("x", 0)
  .attr("y", 0);



// Create the scatter variable: where both the circles and the brush take place
var scatter = g.append("g").attr("clip-path", "url(#clip)");

function updateChart(newX, newY) {
  console.log("Onto the Updated Chart Board" + newX + "    " + newY);
  var t = g.transition().duration(750);

  // update axes with these new boundaries
  xAxis.transition(t).call(d3.axisBottom(newX));
  yAxis.transition(t).call(d3.axisLeft(newY));

  // update circle position
  scatter
    .selectAll("circle")
    .transition(t)
    .attr("cx", function(d) {
      return newX(d.gdpPercap) * ((Math.random() * 0.9));
    })
    .attr("cy", function(d) {
      return newY(d.lifeExp);
    });
};

// now the user can zoom and it will trigger the function called updateChart
// A function that updates the chart when the user zoom and thus new boundaries are available
function zoomed() {
  // recover the new scale
  newX = d3.event.transform.rescaleX(x);
  newY = d3.event.transform.rescaleY(y);

  // update axes with these new boundaries
  xAxis.call(d3.axisBottom(newX));
  yAxis.call(d3.axisLeft(newY));

  // update circle position
  scatter
    .selectAll("circle")
    .attr("cx", function(d) {
      return newX(d.gdpPercap) * ((Math.random() * 0.9));
    })
    .attr("cy", function(d) {
      return newY(d.lifeExp);
    });
}

function idled() {
  idleTimeout = null;
}

function brushended() {
  var s = d3.event.selection;

  if (!s) {
    if (!idleTimeout) return (idleTimeout = setTimeout(idled, idleDelay));
    newX = x.domain(x0);
    newY = y.domain(y0);
  } else {
    newX = x.domain([s[0][0], s[1][0]].map(newX.invert));
    newY = y.domain([s[1][1], s[0][1]].map(newY.invert));

    g.select(".brush").call(brush.move, null);
  }
  console.log("This is the updated value of x" + s[0][0] + " " + s[1][0])
  updateChart(newX, newY);
}

function end_brush_tool() {
  g.selectAll("g.brush").remove();
}

function start_brush_tool() {
  g.append("g")
    .attr("class", "brush")
    .call(brush);
}

function end_brush_tool() {
  g.selectAll("g.brush").remove();
}




function reset_zoom() {
  console.log("CLicked on the zoom button");
  newX = x.domain(x0);
  newY = y.domain(y0);

  updateChart(newX, newY);
};

var data1 = scatter_data

d3.csv(
  "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/4_ThreeNum.csv",
  function(data) {
    // Add circles
    var tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden");
    console.log(data)
    scatter
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function(d) {
       //console.log("THIS IS THE DATA FOR THE SCATTER PLOT OF X AXIS"+ d.gdpPercap);
        return x(d.gdpPercap)  * ((Math.random() * 0.9));
      })
      .attr("cy", function(d) {
        //console.log("THIS IS THE DATA FOR THE SCATTER PLOT OF Y AXIS"+ d.lifeExp);
        return y(d.lifeExp);
      })
      .attr("r", 8)
      .style("fill", function(d) { return color(d.gdpPercap); })
      //.style("fill", "#61a3a9")
      .style("opacity", 0.5)
      .on('mouseover',function(d){
        var html1 = "GDP - "+ d.gdpPercap + " Life Expetancy - "+ d.lifeExp
        tooltip.text(html1);
        console.log(html1);
         
        var mouse = d3.mouse(g.node()).map(function(d) {
        return parseInt(d);
  }
      );
        
            
       
        d3.select(this)
          .style("opacity", 1)
          .style("stroke","white")
          .style("stroke-width",3);

        return tooltip.style("visibility", "visible");
      })
      .on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
      .on('mouseout', function(d){

        d3.select(this)
          .style("opacity", 0.8)
          .style("stroke","white")
          .style("stroke-width",0.3);
          return tooltip.style("visibility", "hidden");
      })
      ;
  }
);

var resetbox = document.querySelector("#reset");

resetbox.addEventListener("change", function() {
  if (this.checked) {
    reset_zoom(); // Checkbox is checked..
  } 
});



var checkbox = document.querySelector("#brush");

checkbox.addEventListener("change", function() {
  if (this.checked) {
    start_brush_tool(); // Checkbox is checked..
  } else {
    end_brush_tool(); // Checkbox is not checked..
  }
});



}




function dashboard(id,percent,year){

  test_svg.selectAll("*").remove();
  var color = d3.scaleOrdinal(d3.schemeCategory10);
  var con_width = document.getElementById('test_chart').offsetWidth;
  var con_height = document.getElementById('test_chart').offsetHeight;
 

  // set the thickness of the inner and outer radii
  var min = Math.min(con_width, 260);
  var oRadius = min / 2 * 0.9;
  var iRadius = min / 2 * 0.85;
  var ratio = percent / 100;
  var piePercent = Math.PI * ratio;
  var color = ['#e0e0e0', '#eb3323'];
  
  // construct default pie laoyut
  var pie = d3.pie().value(function(d){
   return d; 
  }).sort(null);
  
  // construct arc generator
  var arc = d3.arc()
    .outerRadius(oRadius)
    .innerRadius(iRadius)
    .startAngle(0)
    .endAngle(Math.PI);

  var arcLine = d3.arc()
    .innerRadius(iRadius)
    .outerRadius(oRadius)
    .startAngle(0)
    .endAngle(piePercent * 100);
  
  // creates the pie chart container
  //console.log("The percentage of the graph is this and that and this and that - "+percent);
  //test_svg.append('test_svg').attr("transform", "translate(" + 1250 + "," + 770 + ")");
  var g = test_svg.attr("width", width - 120)
  .attr("height", height - 70 ).append('g').attr("transform", "translate(" + 250 + "," + 170 + ")");
    
  var path = g.append('path')
  .attr("d", arc)
  .attr("transform", 'rotate(-90)')
  .attr("fill", color[0]);

var path2 = g.append('path')
  .attr("d", arcLine)
  .attr("transform", 'rotate(-90)')
  .attr("fill", color[1]);

var middleCount = g.append('text')
  .text(id + " " + percent + "% Year" + current_year)
  .attr("class", "middle-text")
  .attr('text-anchor', 'middle')

  
//   g.append('text').attr('text-anchor', 'middle').text(""+id+" "+percent)
//   // generate random data
//   var data = [0,100];
//  // console.log("The arc data is this dhan tan tan"+data);
//   // enter data and draw pie chart
//   var path = g.append('g')
//   .datum(data).selectAll("path")
//     .data(pie)
//     .enter().append("path")
//       .attr("class","piechart")
//       .attr("fill", function(d,i){ return color(i); })
//       .attr("d", arc)
//       .each(function(d){ 
//         this._current = d; 
//       })

//       data = makeData(2);
//       //console.log("The arc data is this dhan tan tan nananananana"+data);
//       // add transition to new path
//       var g = test_svg.attr("width", width - 120)
//       .attr("height", height - 70 ).append('g').attr("transform", "translate(" + 250 + "," + 170 + ")");
//       g.datum(data).selectAll("path").data(pie).transition().duration(1000).attrTween("d", arcTween)
    
//       // add any new paths
//       g.datum(data).selectAll("path")
//         .data(pie)
//       .enter().append("path")
//         .attr("class","piechart")
//         .attr("fill", function(d,i){ return color(i); })
//         .attr("d", arc)
//         .each(function(d){ this._current = d; })
    
//       // remove data not being used
//       g.datum(data).selectAll("path")
//         .data(pie).exit().remove();
  

}


function makeData(size){
  return d3.range(size).map(function(item){
   return Math.random()*100;
  });
};

// Store the displayed angles in _current.
// Then, interpolate from _current to the new angles.
// During the transition, _current is updated in-place by d3.interpolate.
function arcTween(a) {
  var i = d3.interpolate(this._current, a);
  this._current = i(0);
  console.log("ARC TWEEN data is"+ arc(i(t)));
  return function(t) {
    
    return arc(i(t));
  };
}


function render_scatter_plot(data,timeSeriesData){
  console.log("THIS IS THE TIME SERIES DATA"+ timeSeriesData)
  // parse the date / time
  line_svg.selectAll("*").remove();
  // set the ranges
  var string_data = d3.entries(data);

  var time_data = [];

  for(var i=0 ; i < string_data.length ;i++){
    t = string_data[i]
  time_data.push({"x": t.key, "y": parseFloat(t.value)});
  }
  var con_width = document.getElementById('line_chart').offsetWidth;
  var con_height = document.getElementById('line_chart').offsetHeight;


  var xScale = d3.scaleBand().rangeRound([0, con_width-50]).padding(0.1),
  yScale = d3.scaleLinear().rangeRound([con_height-50, 0]);
  


  
  var g = line_svg.append("g")
  .attr("transform", "translate(" + 50 + "," + 10 + ")");


  var line = d3.line()
    .x(function(d) { return xScale(d.x); })
    .y(function(d) { return yScale(d.y); })
    .curve(d3.curveMonotoneX)


    var parseTime = d3.timeParse("%Y")
    bisectDate = d3.bisector(function(d) { return d.x; }).left;
    //console.log("Parse Time is - "+ parseTime+" Bisect Date is - "+ bisectDate);
    var color = d3.scaleOrdinal(d3.schemeCategory10);

  xScale.domain(time_data.map(function(d) { return d.x; }));
  

  yScale.domain([0, d3.max(time_data, function(d) { return d.y; })]);
  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(-20," + (con_height-50) + ")")
      .call(d3.axisBottom(xScale));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(yScale).ticks(10))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Frequency");

  g.append("path")
    .datum(time_data)
    .attr("class", "line")
    .attr("d", line);
    mds_data;
    sm_data;
    //mapData ;
    var focus = g.append("g")
    .attr("class", "focus")
    .style("display", "none");

focus.append("line")
    .attr("class", "x-hover-line hover-line")
    .attr("y1", 0)
    .attr("y2", height);

focus.append("line")
    .attr("class", "y-hover-line hover-line")
    .attr("x1", width)
    .attr("x2", width);

focus.append("circle")
    .attr("r", 7.5);

focus.append("text")
    .attr("x", 15)
    .attr("dy", ".31em");

    line_svg.append("rect")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", function() { focus.style("display", null); })
        .on("mouseout", function() { focus.style("display", "none"); })
       .on("mousemove", function(d){
         //console.log("Value of the mouse hover is this - "+d3.mouse(this)[0]+"Data value 1 is - "+ time_data[bisectDate(time_data, d3.mouse(this)[0], 1) - 1] + "Data value 2 is - "+ time_data[bisectDate(time_data, d3.mouse(this)[0], 1)]);
        //  var x0 = x.invert(d3.mouse(this)[0]),
        //   i = bisectDate(data, x0, 1),
        //   d0 = data[i - 1],
        //   d1 = data[i],
        //   d = x0 - d0.year > d1.year - x0 ? d1 : d0;
          var xPos = d3.mouse(this)[0];
          var domain = xScale.domain(); 
          var range = xScale.range();
          var rangePoints = d3.range(range[0], range[1], xScale.step())
          var yPos = domain[d3.bisect(rangePoints, xPos) -1];
          xPos = xPos - 30;
          //console.log("Getting the x position of the graph"+time_data[xPos]);
          
           focus.attr("transform", "translate(" + xPos + ", 160)");
           focus.select("text").text(function() { return xPos; });
           focus.select(".x-hover-line").attr("y2", height - yScale(yPos));
           focus.select(".y-hover-line").attr("x2",con_width);
        })
        .on("click", function(d){
          var xPos = d3.mouse(this)[0];
          var domain = xScale.domain(); 
          var range = xScale.range();
          var rangePoints = d3.range(range[0], range[1], xScale.step())
          var yPos = domain[d3.bisect(rangePoints, xPos) -1];
          console.log("CLICKED ON THE LINE CHART"+yPos);
          
          
          //render_scatter_plot(timeSeries[d.id]);
          //dashboard(d.id,(d.val/100000000));
        });
       /* ;
        function mousemove() {
          
          focus.attr("transform", "translate(" + d.x + "," + d.y + ")");
          focus.select("text").text(function() { return d.y; });
          focus.select(".x-hover-line").attr("y2", height - d.y);
          focus.select(".y-hover-line").attr("x2", width + width);
        }*/

    var div = d3.select("body").append("circle")	
    .attr("class", "tooltip")				
    .style("opacity", 0);
  g.selectAll("circle")
    .data(time_data)
  .enter().append("circle")
    .attr("class", "circle")
    .attr("cx", function(d) { return xScale(d.x); })
    .attr("cy", function(d) { return yScale(d.y); })
    .attr("r", 4)
    .on("click", function(d){
      console.log(" ON THE LINE CHART"+xScale(d.x));
      
      
      //render_scatter_plot(timeSeries[d.id]);
      //dashboard(d.id,(d.val/100000000));
    })
    // .on("mouseover", function(d) {		
    //   div.transition()		
    //       .duration(200)		
    //       .style("opacity", .9);		
    //   div	.html(d.x + "<br/>"  + d.y)	
    //       .style("left", (d3.event.pageX) + "px")		
    //       .style("top", (d3.event.pageY - 28) + "px");	
    //   })
    //   .on("mouseout", function(d) {		
    //     div.transition()		
    //         .duration(1500)		
    //         .style("opacity", 0);	
    // })
    ;
    // var parseTime = d3.timeParse("%Y")
    // bisectDate = d3.bisector(function(d) { return d.x; }).left;
    // var xScale = d3.scaleTime().range([0, width]);
    // var yScale = d3.scaleLinear().range([height, 0]);
    // //xScale.domain(d3.extent(time_data, function(d) { return d.xScale; }));
    // //yScale.domain([d3.min(time_data, function(d) { return d.yScale; }) / 1.005, d3.max(time_data, function(d) { return d.yScale; }) * 1.005]);
    // var focus = g.append("g")
    //     .attr("class", "focus")
    //     .style("display", "none");

    // focus.append("line")
    //     .attr("class", "x-hover-line hover-line")
    //     .attr("y1", 0)
    //     .attr("y2", con_height);

    // focus.append("line")
    //     .attr("class", "y-hover-line hover-line")
    //     .attr("x1", con_width)
    //     .attr("x2", con_width);

    // focus.append("circle")
    //     .attr("r", 7.5);

    // focus.append("text")
    //     .attr("xScale", 15)
    //   	.attr("dy", ".31em");

    // g.append("rect")
    //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    //     .attr("class", "overlay")
    //     .attr("width", con_width)
    //     .attr("height", con_height)
    //     .text("Hello")
    //     .on("mouseover", function() { focus.style("display", null); })
    //     .on("mouseout", function() { focus.style("display", "none"); })
    //     .on("mousemove", mousemove);

    // function mousemove() {
    //   console.log(d3.mouse(this)[0]);
    //   var x0 = xScale.invert(d3.mouse(this)[0]),
    //       i = bisectDate(data, x0, 1),
    //       d0 = time_data[i - 1],
    //       d1 = time_data[i];
    //       d = x0 - d0.x > d1.x - x0 ? d1 : d0;
    //   focus.attr("transform", "translate(" + x(d.x) + "," + y(d.y) + ")");
    //   focus.select("text").text(function() { return d.y; });
    //   focus.select(".x-hover-line").attr("y2", con_height - y(d.y));
    //   focus.select(".y-hover-line").attr("x2", con_width + con_width);
    // }

}


function render_map_plot_v2(data){
  console.log("Called render map plot v2")
  var format = d3.format(",");
  // var csv_file;
  //
  // if (current_feature == map_features[0]){
  //   csv_file = "https://raw.githubusercontent.com/sauradeeppaul/inequality-dashboard-visualization/master/visualization%20source%20data/gdp-per-capita-worldbank.csv";
  // } else if(current_feature == map_features[1]){
  //   csv_file = "https://raw.githubusercontent.com/sauradeeppaul/inequality-dashboard-visualization/master/visualization%20source%20data/life-expectancy.csv"
  // }
  //
  // console.log("Loading data from " + csv_file);

  var mapData = data
  console.log("MAP DATA")
  console.log(mapData)

  var g = map_svg.append('g')
  .attr('class', 'map');

  // var tip = d3.tip()
  //           .attr('class', 'd3-tip')
  //           .offset([-10, 0])
  //           .html(function(d) {
  //             console.log(d)
  //             return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br><strong>" + current_feature + ": </strong><span class='details'>" + parseFloat(d.val).toFixed(2) +"</span>";
  //           })

  //var tip = d3.tip()
  //.attr('class', 'd3-tip')
  //.offset([-10, 0])
  //.html(function(d) {
    //console.log("TOOLTIP-- "+d.Entity);
    //return "<strong>Frequency:</strong> <span style='color:red'>" + d.Entity + "</span>";
  //})


  var w = 1200, h = 20;

    //   g.append("g")
    //   .attr("width", w)
    //   .attr("height", h);

    // var legend = g.append("defs")
    //   .append("g:linearGradient")
    //   .attr("id", "gradient")
    //   .attr("x1", "0%")
    //   .attr("y1", "100%")
    //   .attr("x2", "100%")
    //   .attr("y2", "100%")
    //   .attr("spreadMethod", "pad");

    // legend.append("stop")
    //   .attr("offset", "0%")
    //   .attr("stop-color", "#eddd82")
    //   .attr("stop-opacity", 1);

    // legend.append("stop")
    //   .attr("offset", "33%")
    //   .attr("stop-color", "#ffe44a")
    //   .attr("stop-opacity", 1);

    // legend.append("stop")
    //   .attr("offset", "66%")
    //   .attr("stop-color", "#d18228")
    //   .attr("stop-opacity", 1);

    // legend.append("stop")
    //   .attr("offset", "100%")
    //   .attr("stop-color", "#17bd43")
    //   .attr("stop-opacity", 1);

    // g.append("rect")
    //   .attr("width", w - 900)
    //   .attr("height", h)
    //   .style("fill", "url(#gradient)")
    //   .attr("transform", "translate(750,-10)");

    // var y = d3.scaleLinear()
    //   .range([300, 0])
    //   .domain([68, 12]);

    // var yAxis = d3.axisBottom()
    //   .scale(y)
    //   .ticks(5);

    // g.append("g")
    //   .attr("class", "y axis")
    //   .attr("transform", "translate(750,-50)")
    //   .call(yAxis)
    //   .append("text")
    //   .attr("transform", "rotate(-90)")
    //   .attr("y", 0)
    //   .attr("dy", ".71em")
    //   .style("text-anchor", "end")
    //   .text("axis title");






    //////////////////

  var path = d3.geoPath();


  var projection = d3.geoMercator()
                     .scale(120)
                    .translate( [width / 2, height / 1.5]);

  var path = d3.geoPath().projection(projection);

  // svg.call(tip);

  queue()
    .defer(d3.json, "https://raw.githubusercontent.com/sauradeeppaul/inequality-dashboard-visualization/master/data/world_countries_features.json")
    .await(ready);


  function ready(error, country_features) {
    if (error) throw error;

    var data_column = current_feature

    var populationByCountry = {};

    // console.log(data);

    var minVal = 1000000;
    var maxVal = 0;
    console.log("Inside ready")
    console.log(mapData)
    var timeSeries = {};
   
    mapData.forEach(function(d) {
      if (populationByCountry[d['Year']] == undefined || populationByCountry[d['Year']].length == 0)
        populationByCountry[d['Year']] = {};
      minYear = Math.min(minYear, parseInt(d['Year']));
      maxYear = Math.max(maxYear, parseInt(d['Year']));

      populationByCountry[d['Year']][d['Code']] = d[data_column];

      if(d['Year'] == current_year){
        minVal = Math.min(minVal, parseInt(d[data_column]));
        maxVal = Math.max(maxVal, parseInt(d[data_column]));
      }});
      //console.log("TOTAL COUNTTTTTTTTTTTT"+total_count);
      mapData.forEach(function(d) {
        if (timeSeries[d['Code']] == undefined || timeSeries[d['Code']].length == 0)
          timeSeries[d['Code']] = {};

          timeSeries[d['Code']][d['Year']] = d[data_column];
          
        });
        render_scatter_plot(timeSeries['RUS'],timeSeries);
    country_features.features.forEach(function(d) {
      // console.log("loading to features:")
      // console.log(d)
      d.val = populationByCountry[current_year][d.id] });

    console.log(populationByCountry);
    console.log("Min Year: " + minYear);
    console.log("Max Year: " + maxYear);

    console.log("Min Val: " + minVal);
    console.log("Max Val: " + maxVal);
    mds_data;
    sm_data;
    


    document.getElementById("slider").oninput = function() {
      var val = document.getElementById("slider").value
      var slidermin = document.getElementById("slider").min
      var slidermax = document.getElementById("slider").max
      console.log("slider val: " + val)

      current_year = minYear + Math.floor((maxYear-minYear)*(val-slidermin)/(slidermax - slidermin))
      console.log("CURRENT YEAR IS AS FOLLOWS"+current_year);


     

      render_plot(mapData, mds_data, sm_data, bi_data, feat_data, drawMDS=false, drawFeat=false, drawBi=false, drawSM=false);
      param = current_year.toString().concat("slider");
      $.post("", {'function': param}, function(data_infunc){
          mds_data = JSON.parse(data_infunc.mds_data)
          sm_data = JSON.parse(data_infunc.sm_data)

      });
    };
    //total_count = 176675188;
    console.log("Logging the feature value please work" + feature_value)
    
    console.log("So is this working"+ current_year+"----------------"+feature_value.includes("GDP per capita (current LCU)"))
    if(current_year.toString().localeCompare("2005") == 0 && feature_value.includes("GDP per capita (current LCU)")){ 
      total_count = 176675188;
    }
    else if(current_year.toString().localeCompare("2005") == 0 && feature_value.includes("GDP per capita (current LCU)")){
      total_count = 199668479;
    }
    else if(current_year.toString().localeCompare("2006") == 0 && feature_value.includes("GDP per capita (current LCU)")){
      total_count = 229437228;
    }
    else if(current_year.toString().localeCompare("2007") == 0 && feature_value.includes("GDP per capita (current LCU)")){
      total_count = 270215887;
    }
    else if(current_year.toString().localeCompare("2008") == 0 && feature_value.includes("GDP per capita (current LCU)")){
      total_count = 277964890;
    }
    else if(current_year.toString().localeCompare("2009") == 0 && feature_value.includes("GDP per capita (current LCU)")){
      total_count = 320475192;
    }
    else if(current_year.toString().localeCompare("2010") == 0 && feature_value.includes("GDP per capita (current LCU)")){
      total_count = 383386485;
    }
    else if(current_year.toString().localeCompare("2011") == 0 && feature_value.includes("GDP per capita (current LCU)")){
      total_count = 441456169;
    }
    else if(current_year.toString().localeCompare("2012") == 0 && feature_value.includes("GDP per capita (current LCU)")){
      total_count = 501140060;
    }
    else if(current_year.toString().localeCompare("2013") == 0 && feature_value.includes("GDP per capita (current LCU)")){
      total_count = 551360876;
    }
    else if(current_year.toString().localeCompare("2005") == 0 && feature_value.includes("Health expenditure, public (% of GDP)")){ 
      console.log("So is this working"+ current_year)
      total_count = 750;
    }
    else if(current_year.toString().localeCompare("2006") == 0 && feature_value.includes("Health expenditure, public (% of GDP)")){
      total_count = 800;
    }
    else if(current_year.toString().localeCompare("2007") == 0 && feature_value.includes("Health expenditure, public (% of GDP)")){
      total_count = 848;
    }
    else if(current_year.toString().localeCompare("2008") == 0 && feature_value.includes("Health expenditure, public (% of GDP)")){
      total_count = 850;
    }
    else if(current_year.toString().localeCompare("2009") == 0 && feature_value.includes("Health expenditure, public (% of GDP)")){
      total_count = 925;
    }
    else if(current_year.toString().localeCompare("2010") == 0 && feature_value.includes("Health expenditure, public (% of GDP)")){
      total_count = 940;
    }
    else if(current_year.toString().localeCompare("2011") == 0 && feature_value.includes("Health expenditure, public (% of GDP)")){
      total_count = 880;
    }
    else if(current_year.toString().localeCompare("2012") == 0 && feature_value.includes("Health expenditure, public (% of GDP)")){
      total_count = 885;
    }
    else if(current_year.toString().localeCompare("2013") == 0 && feature_value.includes("Health expenditure, public (% of GDP)")){
      total_count = 846;
    }
    else if(current_year.toString().localeCompare("2014") == 0 && feature_value.includes("Health expenditure, public (% of GDP)")){
      total_count = 863;
    }
    else if(current_year.toString().localeCompare("2015") == 0 && feature_value.includes("Health expenditure, public (% of GDP)")){
      total_count = 856;
    }
    else if(current_year.toString().localeCompare("2016") == 0 && feature_value.includes("Health expenditure, public (% of GDP)")){
      total_count = 846;
    }
    else if(current_year.toString().localeCompare("2017") == 0 && feature_value.includes("Health expenditure, public (% of GDP)")){
      total_count = 839;
    }
    else if(current_year.toString().localeCompare("2018") == 0 && feature_value.includes("Health expenditure, public (% of GDP)")){
      total_count = 706;
    }
    else if(current_year.toString().localeCompare("2005") == 0 && feature_value.includes("Immunization, BCG (% of one-year-old children))")){ 
      console.log("So is this working"+ current_year)
      total_count = 17225;
    }
    else if(current_year.toString().localeCompare("2006") == 0 && feature_value.includes("Immunization, BCG (% of one-year-old children))")){
      total_count = 17361;
    }
    else if(current_year.toString().localeCompare("2007") == 0 && feature_value.includes("Immunization, BCG (% of one-year-old children)")){
      total_count = 17376;
    }
    else if(current_year.toString().localeCompare("2008") == 0 && feature_value.includes("Immunization, BCG (% of one-year-old children)")){
      total_count = 17454;
    }
    else if(current_year.toString().localeCompare("2009") == 0 && feature_value.includes("Immunization, BCG (% of one-year-old children)")){
      total_count = 17426;
    }
    else if(current_year.toString().localeCompare("2010") == 0 && feature_value.includes("Immunization, BCG (% of one-year-old children)")){
      total_count = 17472;
    }
    else if(current_year.toString().localeCompare("2011") == 0 && feature_value.includes("Immunization, BCG (% of one-year-old children)")){
      total_count = 17453;
    }
    else if(current_year.toString().localeCompare("2012") == 0 && feature_value.includes("Immunization, BCG (% of one-year-old children)")){
      total_count = 17494;
    }
    else if(current_year.toString().localeCompare("2013") == 0 && feature_value.includes("Immunization, BCG (% of one-year-old children)")){
      total_count = 17347;
    }
    else if(current_year.toString().localeCompare("2014") == 0 && feature_value.includes("Immunization, BCG (% of one-year-old children)")){
      total_count = 17354;
    }
    else if(current_year.toString().localeCompare("2015") == 0 && feature_value.includes("Immunization, BCG (% of one-year-old children)")){
      total_count = 17199;
    }
    else if(current_year.toString().localeCompare("2016") == 0 && feature_value.includes("Immunization, BCG (% of one-year-old children)")){
      total_count = 17184;
    }
    else if(current_year.toString().localeCompare("2017") == 0 && feature_value.includes("Immunization, BCG (% of one-year-old children)")){
      total_count = 17064;
    }
    else if(current_year.toString().localeCompare("2018") == 0 && feature_value.includes("Immunization, BCG (% of one-year-old children)")){
      total_count = 14834;
    }
    else if(current_year.toString().localeCompare("2005") == 0 && feature_value.includes("Improved sanitation facilities (% of population with access))")){ 
      console.log("So is this working"+ current_year)
      total_count = 14323;
    }
    else if(current_year.toString().localeCompare("2006") == 0 && feature_value.includes("Improved sanitation facilities (% of population with access))")){
      total_count = 14398;
    }
    else if(current_year.toString().localeCompare("2007") == 0 && feature_value.includes("Improved sanitation facilities (% of population with access)")){
      total_count = 14471;
    }
    else if(current_year.toString().localeCompare("2008") == 0 && feature_value.includes("Improved sanitation facilities (% of population with access)")){
      total_count = 14542;
    }
    else if(current_year.toString().localeCompare("2009") == 0 && feature_value.includes("Improved sanitation facilities (% of population with access)")){
      total_count = 14610;
    }
    else if(current_year.toString().localeCompare("2010") == 0 && feature_value.includes("Improved sanitation facilities (% of population with access)")){
      total_count = 14676;
    }
    else if(current_year.toString().localeCompare("2011") == 0 && feature_value.includes("Improved sanitation facilities (% of population with access)")){
      total_count = 14741;
    }
    else if(current_year.toString().localeCompare("2012") == 0 && feature_value.includes("Improved sanitation facilities (% of population with access)")){
      total_count = 14800;
    }
    else if(current_year.toString().localeCompare("2013") == 0 && feature_value.includes("Improved sanitation facilities (% of population with access)")){
      total_count = 14850;
    }
    else if(current_year.toString().localeCompare("2014") == 0 && feature_value.includes("Improved sanitation facilities (% of population with access)")){
      total_count = 14987;
    }
    else if(current_year.toString().localeCompare("2015") == 0 && feature_value.includes("Improved sanitation facilities (% of population with access)")){
      total_count = 15009;
    }
    else if(current_year.toString().localeCompare("2016") == 0 && feature_value.includes("Improved sanitation facilities (% of population with access)")){
      total_count = 14682;
    }
    else if(current_year.toString().localeCompare("2017") == 0 && feature_value.includes("Improved sanitation facilities (% of population with access)")){
      total_count = 14666;
    }
    else if(current_year.toString().localeCompare("2018") == 0 && feature_value.includes("Improved sanitation facilities (% of population with access)")){
      total_count = 12710;
    }
    else if(current_year.toString().localeCompare("2005") == 0 && feature_value.includes("Unemployment, total (% of total labor force))")){ 
      console.log("So is this working"+ current_year)
      total_count = 1686;
    }
    else if(current_year.toString().localeCompare("2006") == 0 && feature_value.includes("Unemployment, total (% of total labor force))")){
      total_count = 1590;
    }
    else if(current_year.toString().localeCompare("2007") == 0 && feature_value.includes("Unemployment, total (% of total labor force)")){
      total_count = 1493;
    }
    else if(current_year.toString().localeCompare("2008") == 0 && feature_value.includes("Unemployment, total (% of total labor force)")){
      total_count = 1459;
    }
    else if(current_year.toString().localeCompare("2009") == 0 && feature_value.includes("Unemployment, total (% of total labor force)")){
      total_count = 1636;
    }
    else if(current_year.toString().localeCompare("2010") == 0 && feature_value.includes("Unemployment, total (% of total labor force)")){
      total_count = 1670;
    }
    else if(current_year.toString().localeCompare("2011") == 0 && feature_value.includes("Unemployment, total (% of total labor force)")){
      total_count = 1661;
    }
    else if(current_year.toString().localeCompare("2012") == 0 && feature_value.includes("Unemployment, total (% of total labor force)")){
      total_count = 1661;
    }
    else if(current_year.toString().localeCompare("2013") == 0 && feature_value.includes("Unemployment, total (% of total labor force)")){
      total_count = 1662;
    }
    else if(current_year.toString().localeCompare("2014") == 0 && feature_value.includes("Unemployment, total (% of total labor force)")){
      total_count = 1624;
    }
    else if(current_year.toString().localeCompare("2015") == 0 && feature_value.includes("Unemployment, total (% of total labor force)")){
      total_count = 1593;
    }
    else if(current_year.toString().localeCompare("2016") == 0 && feature_value.includes("Unemployment, total (% of total labor force)")){
      total_count = 1564;
    }
    else if(current_year.toString().localeCompare("2017") == 0 && feature_value.includes("Unemployment, total (% of total labor force)")){
      total_count = 1489;
    }
    else if(current_year.toString().localeCompare("2018") == 0 && feature_value.includes("Unemployment, total (% of total labor force)")){
      total_count = 1281;
    }
    g.append("g")
    .attr("width", w)
    .attr("height", h);

  var legend = g.append("defs")
    .append("g:linearGradient")
    .attr("id", "gradient")
    .attr("x1", "0%")
    .attr("y1", "100%")
    .attr("x2", "100%")
    .attr("y2", "100%")
    .attr("spreadMethod", "pad");

  legend.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#eddd82")
    .attr("stop-opacity", 1);

  legend.append("stop")
    .attr("offset", "33%")
    .attr("stop-color", "#ffe44a")
    .attr("stop-opacity", 1);

  legend.append("stop")
    .attr("offset", "66%")
    .attr("stop-color", "#d18228")
    .attr("stop-opacity", 1);

  legend.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#17bd43")
    .attr("stop-opacity", 1);

  g.append("rect")
    .attr("width", w - 900)
    .attr("height", h)
    .style("fill", "url(#gradient)")
    .attr("transform", "translate(750,-10)");

  var y = d3.scaleLinear()
    .range([300, 0])
    .domain([68, 12]);

  var yAxis = d3.axisBottom()
    .scale(y)
    .ticks(5);

  g.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(750,-50)")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("axis title");
    console.log("This is the total count"+ total_count);
    
    
    var color = d3.scaleLinear()
    .domain([minVal, Math.sqrt(minVal*maxVal), maxVal])
    .range(["rgb(242, 52, 19)", "rgb(244, 244, 9)", "rgb(44, 186, 44)"]);

    // console.log("Population By Country")
     console.log("Trying to compute the sum"+populationByCountry[current_year])
    var tooltip = d3.select('body').append('div')
            .attr('class', 'hidden tooltip');

    console.log("Time series Data")
    console.log(timeSeries)
    map_svg.selectAll("g").remove();
    map_svg.append("g")
      .attr("id", "map_group")
      .attr("class", "countries")
      .selectAll("path")
        .data(country_features.features)
      .enter().append("path")
        .attr("d", path)
        .style("fill", function(d) {
          // console.log("V2 stuff: ")
          // console.log(d);
          var c = color(populationByCountry[current_year][d.id])
          dashboardColor = c
          // console.log(populationByCountry[current_year][d.id])
          // console.log(c);
          return c; })
        .style('stroke', 'white')
        .style('stroke-width', 1.5)
        .style("opacity",0.8)
        // tooltips
          .style("stroke","white")
          .style('stroke-width', 0.3)
          .on('mouseover',function(d){
            var html1 = "Country - " + d.id + " Value - " + d.val
            tooltip.text(html1);
            console.log(html1);
             
            var mouse = d3.mouse(g.node()).map(function(d) {
            return parseInt(d);
      }
          );
            
                
           
            d3.select(this)
              .style("opacity", 1)
              .style("stroke","white")
              .style("stroke-width",3);

            return tooltip.style("visibility", "visible");
          })
          .on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
          .on('mouseout', function(d){

            d3.select(this)
              .style("opacity", 0.8)
              .style("stroke","white")
              .style("stroke-width",0.3);
              return tooltip.style("visibility", "hidden");
          })
          .on("click", function(d){
            render_scatter_plot(timeSeries[d.id],timeSeries);
            dashboard(d.id,((d.val/total_count)* 100).toFixed(4),current_year)
          })

    map_svg.append("path")
        .datum(topojson.mesh(country_features.features, function(a, b) { return a.id !== b.id; }))
         // .datum(topojson.mesh(data.features, function(a, b) { return a !== b; }))
        .attr("class", "names")
        .attr("d", path);


        var tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden");

    var map_bb = document.getElementById("graph").getBoundingClientRect();
    console.log("bbox");
    console.log(map_bb);

    var map_g = map_svg.select("g");
    var g_bb = document.getElementById("map_group").getBoundingClientRect();
    console.log("g bbox");
    console.log(g_bb);

    map_g.attr("transform", "translate(" + (map_bb.x - g_bb.x) + "," + (map_bb.y - g_bb.y - 30) + ")");

    console.log("Map plotted for " + current_year);
    drawScatter(mds_data);
    //drawScatterMatrix(sm_data)

  }
}


function prepare_dropdown() {
  console.log("F:prepareDropdown()")
  console.log("Please just work this time" + d3.select(this).property('value'))
  feature_value = "GDP"

  var dropdownChange = function () {
    console.log("-------------------------------------------------------")
    console.log("F:dropdownChange()")

    var new_feature = d3.select(this).property('value');
    current_feature = new_feature;
    feature_value = current_feature;
    if(current_feature.includes("Health expenditure, public (% of GDP)")){
      console.log("THis is the current feature value" + current_feature.includes("Health expenditure, public (% of GDP)"));
      total_count = 750;
    }
    else if(current_feature.includes("Immunization, BCG (% of one-year-old children))")){ 
      console.log("So is this working"+ current_year + total_count)
      total_count = 17225;
    }
    else if(current_feature.includes("Improved sanitation facilities (% of population with access))")){ 
      console.log("So is this working"+ current_year + total_count)
      total_count = 14323;
    }
    else if(feature_value.includes("Unemployment, total (% of total labor force))")){ 
      console.log("So is this working"+ current_year + total_count)
      total_count = 1686;
    }
    $.post("", {'function': 'dropdown:' + current_feature + ";slider:" + current_year}, function(data_infunc){
        mapData = JSON.parse(data_infunc.chart_data);
        mds_data = JSON.parse(data_infunc.mds_data)
        sm_data = JSON.parse(data_infunc.sm_data);
        console.log("new data: ")
        console.log(mds_data)
        console.log("new data: ")
        console.log(sm_data)
        console.log("new data: ")
        console.log(mapData)
        bi_data = JSON.parse(data_infunc.bi_data)
        // /ax_data = JSON.parse(data_infunc.ax_data);
        feat_data = JSON.parse(data_infunc.feat_data)
        console.log("new data: ")
        console.log(bi_data)
        console.log("new data: ")
        // console.log(ax_data)
        console.log("new data: ")
        console.log(feat_data)
        console.log("Finish new data")
        render_plot(mapData, mds_data, sm_data, bi_data, feat_data);
    });

    // render_plot();
    console.log("Field:", current_feature);
  };

  dropdown = d3.select("#dropdown")
    .insert("select", "svg")
    .on("change", dropdownChange);

  dropdown.selectAll("option")
    .data(map_features)
    .enter().append("option")
    .attr("value", function (d) {
      return d;
    })
    .text(function (d) {
      return d[0].toUpperCase() + d.slice(1, d.length);
    });
}


function drawScatter(mds_data){

  mds_data.sort((a, b) => {
    return b[0] - a[0]
  })

//console.log("This is MDS Dataaaaaaaaaaaaaaaaaaaaaaaaaaaaa"+mds_data);
  var con_width = document.getElementById('bar_chart').offsetWidth;
  var con_height = document.getElementById('bar_chart').offsetHeight;

  var tooltip = d3.select("#bar_chart")
  .append("g")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "black")
    .style("border-radius", "5px")
    .style("color", "white")

  console.log("MDS Data:")
  console.log(mds_data)

  bar_svg.selectAll("*").remove();

  var xScale = d3.scaleLinear()
               .rangeRound([0, con_width-50])
               .domain([d3.min(mds_data, (function (d) {
                 return d.x;
               })), d3.max(mds_data, (function (d) {
                 return d.x;
               }))]);

   var  yScale = d3.scaleLinear()
                .rangeRound([con_height-50, 0])
                .domain([d3.min(mds_data, (function (d) {
                  return d.y;
                })), d3.max(mds_data, (function (d) {
                  return d.y;
                }))]);

    var g = bar_svg.append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    g.attr("transform", "translate(" + 25 + "," + 25 + ")")
    g.append("g")
        .attr("transform", "translate(0,165)")
        .call(d3.axisBottom(xScale))


    // axis-y
    g.append("g")
        //.attr("class", "axis axis--y")
        .attr("transform", "translate(0,5)")
        .call(d3.axisLeft(yScale));

        var color = d3.scaleOrdinal(d3.schemeCategory10);
    // g.selectAll(".dot")
    //     .data(mds_data)
    //   .enter().append("circle") // Uses the enter().append() method
    //     .attr("class", "scatter") // Assign a class for styling
    //     .attr("r", 2)
    //     .attr("cx", function(d) { return xScale(d.x); })
    //     .attr("cy", function(d) { return yScale(d.y); })
    //     .style("fill", function(d) { return color(d.x); })
    //     .on("mouseover", function(d) {
    //       //console.log("This is the tooltip"+d)
    //       tooltip
    //         .transition()
    //         .duration(200)
    //       tooltip
    //         .style("opacity", 1)
    //         .html("Region 1: " + d.x + "Region 2: " + d.y )
    //         .style("left", (d3.mouse(this)[0]) + "px")
    //         .style("top", ((d3.mouse(this)[1]) - 20) + "px")
    //     } )
    //   .on("mousemove", function(d) {
    //     tooltip
    //       .style("left", (d3.mouse(this)[0]) + "px")
    //       .style("top", (d3.mouse(this)[1]) + "px")
    //   } )
    //   .on("mouseleave", function(d) {
    //     tooltip
    //       .transition()
    //       .duration(200)
    //       .style("opacity", 0)
    //   } );
    

    var circles = g.append('g').attr('class', 'circles');
var binding = circles.selectAll('.data-point').data(mds_data, function (d) { return d.x; });
binding.enter().append('circle')
  .attr('r', 2)
  .attr('cx', function (d) { return xScale(d.x); })
  .attr('cy', function (d) { return yScale(d.y); })
  .attr('fill', function (d) { return color(d.y); })
  .on("mouseover", function(d) {
          //console.log("This is the tooltip"+d)
          tooltip
            .transition()
            .duration(200)
          tooltip
            .style("opacity", 1)
            .html("Region 1: " + d.x + "Region 2: " + d.y )
            .style("left", (d3.mouse(this)[0]) + "px")
            .style("top", ((d3.mouse(this)[1]) - 20) + "px")
        } )
      .on("mousemove", function(d) {
        tooltip
          .style("left", (d3.mouse(this)[0]) + "px")
          .style("top", (d3.mouse(this)[1]) + "px")
      } )
      .on("mouseleave", function(d) {
        tooltip
          .transition()
          .duration(200)
          .style("opacity", 0)
      } );

      // ----------------------------------------------------
// Add in brushing
// ----------------------------------------------------

// generate a quadtree for faster lookups for brushing
      var quadtree = d3.quadtree()
      .x(function (d) { return xScale(d.x); })
      .y(function (d) { return yScale(d.y); })
      .addAll(mds_data);
    
    var brushOutput = g.append('ul')
      .attr('class', 'brush-output list-inline')
      .style('padding-left', "50 px")
      .style('min-height', '50px');
    
    var brushedCircles = g.append('g').attr('class', 'circles-brushed');
    var brushedColor = 'tomato';

    function highlightBrushed(brushedNodes) {
      // output the labels of the selected points
  
    
      // overlap colored circles to indicate the highlighted ones in the chart
      var circles = brushedCircles.selectAll('circle').data(brushedNodes, function (d) { return d.x; });
    
      circles.enter()
        .append('circle')
        .classed('data-point brushed', true)
        .attr('r', pointRadius)
        .attr('cx', function (d) { return xScale(d.x); })
        .attr('cy', function (d) { return yScale(d.y); })
        .attr('fill', brushedColor);
    
      circles.exit()
        .remove();
    }
    
    // The following two functions taken from vis-utils: https://github.com/pbeshai/vis-utils
var X = 0;
var Y = 1;
var TOP_LEFT = 0;
var BOTTOM_RIGHT = 1;
/**
 * Determines if two rectangles overlap by looking at two pairs of
 * points [[r1x1, r1y1], [r1x2, r1y2]] for rectangle 1 and similarly
 * for rectangle2.
 */
function rectIntersects(rect1, rect2) {
  return (rect1[TOP_LEFT][X] <= rect2[BOTTOM_RIGHT][X] &&
          rect2[TOP_LEFT][X] <= rect1[BOTTOM_RIGHT][X] &&
          rect1[TOP_LEFT][Y] <= rect2[BOTTOM_RIGHT][Y] &&
          rect2[TOP_LEFT][Y] <= rect1[BOTTOM_RIGHT][Y]);
}


/**
 * Determines if a point is inside a rectangle. The rectangle is
 * defined by two points [[rx1, ry1], [rx2, ry2]]
 */
function rectContains(rect, point) {
  return rect[TOP_LEFT][X] <= point[X] && point[X] <= rect[BOTTOM_RIGHT][X] &&
         rect[TOP_LEFT][Y] <= point[Y] && point[Y] <= rect[BOTTOM_RIGHT][Y];
}

// callback when the brush updates / ends
function updateBrush() {
  var ref = d3.event;
  var selection = ref.selection;

  // if we have no selection, just reset the brush highlight to no nodes
  if (!selection) {
    highlightBrushed([]);
    return;
  }

  // begin an array to collect the brushed nodes
  var brushedNodes = [];

  // traverse the quad tree, skipping branches where we do not overlap
  // with the brushed selection box
  quadtree.visit(function (node, x1, x2, y1, y2) {
    console.log("Testing if the Quadtree data is coming or not"+x1+x2+y1+y2);
    dashboard1(mds_data,Math.floor(500 * ((Math.random() * 1))),Math.floor(2000 * ((Math.random() * 1))),Math.floor(50 * ((Math.random() * 1))),Math.floor(80 * ((Math.random() * 1))));
    // check that quadtree node intersects
    var overlaps = rectIntersects(selection, [[x1, y1], [x2, y2]]);

    // skip if it doesn't overlap the brush
    if (!overlaps) {
      return true;
    }

    // if this is a leaf node (node.length is falsy), verify it is within the brush
    // we have to do this since an overlapping quadtree box does not guarantee
    // that all the points within that box are covered by the brush.
    if (!node.length) {
      var d = node.data;
      var dx = xScale(d.x);
      var dy = yScale(d.y);
      if (rectContains(selection, [dx, dy])) {
        brushedNodes.push(d);
      }
    }

    // return false so that we traverse into branch (only useful for non-leaf nodes)
    return false;
  });

  // update the highlighted brushed nodes
  highlightBrushed(brushedNodes);
}

// create the d3-brush generator
var brush = d3.brush()
  .extent([[0, 0], [con_width - 70, con_height - 60]])
  .on('brush end', updateBrush);

// attach the brush to the chart
var gBrush = g.append('g')
  .attr('class', 'brush')
  .call(brush);

// update the styling of the select box (typically done in CSS)
gBrush.select('.selection')
  .style('stroke', 'skyblue')
  .style('stroke-opacity', 0.4)
  .style('fill', 'skyblue')
  .style('fill-opacity', 0.1);

// ----------------------------------------------------
// Add a fun click handler to reveal the details of what is happening
// ----------------------------------------------------

function quadtreeRect(rect, x1, y1, x2, y2) {
  console.log("THIS IS THE QUAD TREE OF THE DATASET"+x1+x2+y1+y2);
  var con_width = x2 - x1;
  var con_height = y2 - y1;

  // clip to the edges of the plot area
  if (x1 + con_width > (con_width - 70)) {
    con_width = (con_width - 70) - x1;
  }

  if (y1 + con_height > (con_height - 60)) {
    con_height = (con_height - 60) - y1;
  }

  return rect
    .attr('class', 'quadtree-node')
    .attr('x', x1)
    .attr('y', y1)
    .attr('width', con_width + 70)
    .attr('height', con_height + 60)
    .style('fill', 'none')
    .style('stroke', '#ccc');
}

var pointRadius = 3;

function toggleQuadtreeDebug() {

 
  // remove if there
  if (g.select('.quadtree').size()) {
    
    g.select('.quadtree').remove();
    g.select('.quadtree-brushed').remove();
    d3.select('#reveal-quadtree').text('Reveal the Quadtree');

  // otherwise, add in
  } else {
    d3.select('#reveal-quadtree').text('Hide the Quadtree');

    var gQuadtree = g.insert('g', '.circles')
      .attr('class', 'quadtree');

    // add in a group for the brushed parts
    g.insert('g', '.circles').attr('class', 'quadtree-brushed');

    // traverse the quadtree, drawing a rectangle for each node
    quadtree.visit(function (node, x1, y1, x2, y2) {
      console.log("THIS IS THE QUAD TREE OF THE DATASET2");
      quadtreeRect(gQuadtree.append('rect'), x1, y1, x2, y2);
    });
  }
}



// function that animates the quadtree nodes that are searched
// this is basically a copy of the code from above since it isn't
// intended to be used outside of the demo, otherwise I could have
// integrated it there.
function showBrushedQuadtreeNodes() {

  console.log("Can you see the graph now please");
  // if no quadtree, ignore
  if (g.select('.quadtree').empty()) {
    return;
  }

  var ref = d3.event;
  var selection = ref.selection;

  // if we have no selection, remove the quadtree highlighting
  if (!selection) {
    g.select('.quadtree-brushed').selectAll('*').remove();
    return;
  }

  // begin an array to collect the brushed nodes
  var brushedNodes = [];

  // traverse the quad tree, skipping branches where we do not overlap
  // with the brushed selection box. Set a skip flag to true to skip the
  // root node.
  var skip = true;
  quadtree.visit(function (node, x1, y1, x2, y2) {
    // check that quadtree node intersects
    var overlaps = rectIntersects(selection, [[x1, y1], [x2, y2]]);

    // skip if it doesn't overlap the brush
    if (!overlaps) {
      return true;
    }

    // skip the root node
    if (!skip) {
      brushedNodes.push({ x1: x1, y1: y1, x2: x2, y2: y2, node: node });
    }
    skip = false;

    // return false so that we traverse into branch (only useful for non-leaf nodes)
    return false;
  });

}

// add namespaced handlers to the brush for the quadtree animations
brush.on('brush.quadtree end.quadtree', showBrushedQuadtreeNodes);

// add a click listener to the reveal button
d3.select('#reveal-quadtree').on('click', function () { return toggleQuadtreeDebug(); });


}

function drawBiPlot(bi_data){

  dots = bi_data
  //console.log("New Updated Values "+dots[PCA1])
  //console.log("New Updated Values "+dots[PCA2])
  var color = d3.scaleOrdinal(d3.schemeCategory10);
  // vectors = axes_data

  var con_width = document.getElementById('bi_chart').offsetWidth;
  var con_height = document.getElementById('bi_chart').offsetHeight;
      // Set ranges
      bi_svg.selectAll("*").remove();

      var xScale = d3.scaleLinear()
                   .rangeRound([0, con_width-50])
                   .domain([d3.min(dots, (function (d) {
                     return d.PCA1;
                   })), d3.max(dots, (function (d) {
                     return d.PCA1;
                   }))]);

       var  yScale = d3.scaleLinear()
                    .rangeRound([con_height-50, 0])
                    .domain([d3.min(dots, (function (d) {
                      return d.PCA2;
                    })), d3.max(dots, (function (d) {
                      return d.PCA2;
                    }))]);

        var g = bi_svg.append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        g.attr("transform", "translate(" + 25 + "," + 25 + ")")
        g.append("g")
            .attr("transform", "translate(0," + yScale(0) + ")")
            .call(d3.axisBottom(xScale))


        // axis-y
        g.append("g")
            //.attr("class", "axis axis--y")
            .attr("transform", "translate(" + xScale(0) + ",0)")
            .call(d3.axisLeft(yScale));


        g.selectAll(".dot")
            .data(dots)
          .enter().append("circle") // Uses the enter().append() method
            .attr("class", "scatter") // Assign a class for styling
            .attr("r", 2)
            .attr("cx", function(d) { return xScale(d.PCA1); })
            .attr("cy", function(d) { return yScale(d.PCA2); })
            .style("fill", function(d) { return color(d.PCA1); });

      // var tip = d3.tip()
      //   .attr('class', 'd3-tip')
      //   .offset([-10, 0])
      //   .html(function(d, i) {
      //     return "<strong>Data point:</strong> <span style='color:#47ffb5'>" + i + "</span>";
      // })

      // circles.on('mouseover', tip.show)
      //     .on('mouseout', tip.hide)
      //
      // svg.call(tip);
      //
      // var line = d3.line()
      //   .x(function(d, i){return x(d[2]);})
      //   .y(function(d, i){return y(d[3]);})

      // var lines = svg.selectAll("line")
      //   .data(vectors)
      //   .enter().append("line")
      //     .attr("class", "line")
      //     .attr("x1", function(d) {
      //       return d[0];
      //     })
      //     .attr("y1", function(d) {
      //       return d[1];
      //     })
      //     .attr("x2", function(d) {
      //       return d[2];
      //     })
      //     .attr("y2", function(d) {
      //       return d[3];
      //     })

      // lines = svg.append("path")
      //   .attr("d", function(d) { return line(vectors)})
      //   .attr("transform", "translate(0,0)")
      //   .style("stroke-width", 2)
      //   .style("stroke", "steelblue")
      //   .style("fill", "none")
      //   .style("opacity", 0)
      //   .text("hi");
      //
      // lines.transition()
      //     .duration(700)
      //     .delay(500)
      //     .ease(d3.easeLinear)
      //     .style("opacity", 1);

// var tip2 = d3.tip()
//   .attr('class', 'd3-tip')
//   .offset([-10, 0])
//   .html(function(d, i) {
//     return "<strong>Vector:</strong> <span style='color:#47ffb5'>" + i + "</span>";
// })

// lines.on('mouseover', tip2.show)
//     .on('mouseout', tip2.hide)

// svg.call(tip2);
}

// function drawScatterMatrix(data){


//   var con_width = document.getElementById('sm_chart').offsetWidth;
//   var con_height = document.getElementById('sm_chart').offsetHeight;

//     var width =  950 - margin.left - margin.right,
//       size = 150,
//       padding = 20;

//     var x = d3.scaleLinear()
//         .range([padding / 2, con_width/2 - padding / 2]);

//     var y = d3.scaleLinear()
//         .range([con_height/2 - padding / 2, padding / 2]);

//     var xAxis = d3.axisBottom()
//         .scale(x)
//         .ticks(6);
//       var yAxis = d3.axisLeft()
//       .scale(y)
//       .ticks(6);
//   sm_svg.selectAll("*").remove();
//   var domainByTrait = {},
//       traits = d3.keys(data[0]),
//       n = traits.length;

//   traits.forEach(function(trait) {
//     domainByTrait[trait] = d3.extent(data, function(d) { return d[trait]; });
//   });

//   xAxis.tickSize(con_width/2 * n);
//   yAxis.tickSize(-con_height/2 * n);


//   sm_svg.attr("width", con_width * n)
//       .attr("height", con_height * n)
//     .append("g")
//       .attr("transform", "translate(" + padding + "," + padding / 2 + ")");

//   sm_svg.selectAll(".x.axis")
//       .data(traits)
//     .enter().append("g")
//       .attr("class", "x axis")
//       .attr("transform", function(d, i) { return "translate(" + (n - i - 1) * con_width/2 + ",0)"; })
//       .each(function(d) { x.domain(domainByTrait[d]); d3.select(this).call(xAxis); });

//   sm_svg.selectAll(".y.axis")
//       .data(traits)
//     .enter().append("g")
//       .attr("class", "y axis")
//       .attr("transform", function(d, i) { return "translate(0," + i * con_height/2 + ")"; })
//       .each(function(d) { y.domain(domainByTrait[d]); d3.select(this).call(yAxis); });

//   var cell = sm_svg.selectAll(".cell")
//       .data(cross(traits, traits))
//     .enter().append("g")
//       .attr("class", "cell")
//       .attr("transform", function(d) { return "translate(" + (n - d.i - 1) * con_width/2 + "," + d.j * con_height/2 + ")"; })
//       .each(plot);

//   // Titles for the diagonal.
//   cell.filter(function(d) { return d.i === d.j; }).append("text")
//       .attr("x", padding)
//       .attr("y", padding)
//       .attr("dy", ".71em")
//       .text(function(d) { return d.x; });

//       function plot(p) {
//         var cell = d3.select(this);

//         x.domain(domainByTrait[p.x]);
//         y.domain(domainByTrait[p.y]);

//         cell.append("rect")
//             .attr("class", "frame")
//             .attr("x", padding / 2)
//             .attr("y", padding / 2)
//             .attr("width", con_width/2 - padding)
//             .attr("height", con_height/2 - padding);

//         cell.selectAll("circle")
//             .data(data)
//           .enter().append("circle")
//             .attr("cx", function(d) { return x(d[p.x]); })
//             .attr("cy", function(d) { return y(d[p.y]); })
//             .attr("r", 2)
//             .style("fill", function(d) { return "#4682b4"; });
//       }

//       function cross(a, b) {
//         var c = [], n = a.length, m = b.length, i, j;
//         for (i = -1; ++i < n;) for (j = -1; ++j < m;) c.push({x: a[i], i: i, y: b[j], j: j});
//         return c;
//       }

// }





function drawFeats(feat_data) {

  var CONTAINER_MARGIN = 100;

    // Get the data again
      // Request the "" page and send some additional data along (while still ignoring the return results).
    // $.post("", {'data': 'received'}, function(data_infunc){
      // console.log({data_infunc})
  var con_width = document.getElementById('feat_chart').offsetWidth;
  var con_height = document.getElementById('feat_chart').offsetHeight;


    data2 = feat_data
    //console.log(data2);

    //console.log(data2);
    // Scale the range of the data again
    console.log(data2)

    feat_svg.selectAll("*").remove();

    // bar_svg.attr("width", width + margin.left + margin.right)
    //         .attr("height", height + margin.top + margin.bottom)
    var xScale = d3.scaleBand()
              .rangeRound([0, con_width-CONTAINER_MARGIN])
              .padding(0.1)
              .domain(data2.map(function(d) {
                return d.feature;
              }));

     var  yScale = d3.scaleLinear()
                  .rangeRound([con_height-CONTAINER_MARGIN, 0])
                  .domain([0, d3.max(data2, (function (d) {
                    return d.value;
                  }))]);

      var g = feat_svg.append("g")
                .attr("transform", "translate(" + (margin.left + CONTAINER_MARGIN) + "," + (margin.top + 5) + ")");
                //
                // g.append("text")
                //        .attr("x", (width / 2))
                //        .attr("y", 0 - (margin.top / 2))
                //        .attr("text-anchor", "middle")
                //        .style("font-size", "16px")
                //        .style("text-decoration", "underline")
                //        .text("Feature Importance - Top Three Features");

      // axis-x
      g.append("g")
          .attr("transform", "translate(0," + (con_height-CONTAINER_MARGIN) + ")")
          .call(d3.axisBottom(xScale).ticks(12))

           .selectAll("text")  
           .style("text-anchor", "end")
           .attr("transform", "rotate(-25)");
      // axis-y
      g.append("g")
          //.attr("class", "axis axis--y")
          .call(d3.axisLeft(yScale));

      var bar = g.selectAll("rect")
        .data(data2)
        .enter().append("g");



      // bar chart
      console.log(data2.length)
      bar.append("rect")
        .attr("x", function (d) { return xScale(d.feature); })
        .attr("y", function(d, i) { return yScale(d.value); })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d, i) { return con_height-CONTAINER_MARGIN - yScale(d.value); })
        .attr("fill",
        function(d,i){
          if (i<3){
        return ("salmon");}
        else{ return "steelblue"} });

}

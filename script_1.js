  //Grootte vierkantjes data    
  var itemSize = 22,
      cellSize = itemSize - 2,
      margin = {top: 120, right: 20, bottom: 20, left: 90};
  
  //canvas grootte instellen    
  var width = 700 - margin.right - margin.left,
      height = 500 - margin.top - margin.bottom;

  var formatDate = d3.time.format("%Y-%m-%d");

  //Data wordt ingeladen    
  d3.csv('data_1.4.csv', function ( response ) {

    
    //Haalt waardes uit de database.  
    var data = response.map(function( item ) {
        var newItem = {};
        newItem.country = item.x;
        newItem.product = item.y;
        newItem.value = item.value;
        
        //Stuurt laadt de gekozen nu zien.
        return newItem;
    })

    var x_elements = d3.set(data.map(function( item ) { return item.product; } )).values(),
        y_elements = d3.set(data.map(function( item ) { return item.country; } )).values();

    var xScale = d3.scale.ordinal()
        .domain(x_elements)
        .rangeBands([0, x_elements.length * itemSize]);

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .tickFormat(function (d) {
            return d;
        })
        .orient("top");

    var yScale = d3.scale.ordinal()
        .domain(y_elements)
        .rangeBands([0, y_elements.length * itemSize]);

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .tickFormat(function (d) {
            return d;
        })
        .orient("left");

    //De grootte in afstanden worden bepaald, in hoeveel stappen. Kleuren worden hier bepaald.   
    var colorScale = d3.scale.threshold()
        .domain([0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35, 0.40, 0.45, 0.5, 0.55, 0.6, 0.66, 1.0])
        .range(["#3A00FF", "#1216FF", "#2551FF", "#307AFF", "#3999FF", "#4ABBFF", "#5BE0FF", "#7FEFFF", "#8FFFF1", "#AEFFC8", "#C3FFB4", "#D7FFA9", "#EAFF98", "#000000"]);  
      
    var svg = d3.select('.heatmap')
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var cells = svg.selectAll('rect')
        .data(data)
        .enter().append('g').append('rect')
        .attr('class', 'cell')
        .attr('width', cellSize)
        .attr('height', cellSize)
        .attr('y', function(d) { return yScale(d.country); })
        .attr('x', function(d) { return xScale(d.product); })
        .attr('fill', function(d) { return colorScale(d.value); });

            
    //labels  
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .selectAll('text')
        .attr('font-weight', 'normal');
      
      
    //positie labels  
    svg.append("g")
        .attr("class", "x axis")
        .call(xAxis)
        .selectAll('text')
        .attr('font-weight', 'normal')
        .style("text-anchor", "start")
        .attr("dx", ".8em")
        .attr("dy", ".5em")
        .attr("transform", function (d) {
            return "rotate(-65)";
        });
  });     
    
 
    
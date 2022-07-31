function scene1() {
	document.getElementById("div1").style.display = "block";
	document.getElementById("div2").style.display = "none";
	document.getElementById("scene_dataviz2").innerHTML = "";
	document.getElementById("div3").style.display = "none";
	document.getElementById("scene_dataviz3").innerHTML = "";

	var margin3 = {
			top: 10,
			right: 100,
			bottom: 60,
			left: 100
		},
		width3 = 1000 - margin3.left - margin3.right,
		height3 = 500 - margin3.top - margin3.bottom;

	var svg3 = d3.select("#scene_dataviz")
		.append("svg")
		.attr("width", width3 + margin3.left + margin3.right)
		.attr("height", height3 + margin3.top + margin3.bottom)

		.append("g")
		.attr("transform",
			"translate(" + margin3.left + "," + margin3.top + ")");

	d3.csv("https://raw.githubusercontent.com/sumanthkm/cs416narrativevisualization/main/barplot1.csv", function(data) {


		// Add X axis
		var x3 = d3.scaleLinear()
			.domain([0, 30500])
			.range([0, width3]);
		svg3.append("g")
			.attr("transform", "translate(0," + height3 + ")")
			.call(d3.axisBottom(x3))
			.selectAll("text")
			.attr("transform", "translate(-10,0)rotate(-45)")
			.style("text-anchor", "end");

		var tooltip = d3.select("body").append("div").attr("class", "toolTip");


		// Y axis
		var y3 = d3.scaleBand()
			.range([0, height3])
			.domain(data.map(function(d) {
				return d.Neighbourhood;
			}))
			.padding(.1);
		svg3.append("g")
			.call(d3.axisLeft(y3))


		// X label price
		svg3.append("text")
			.attr("class", "x label")
			.attr("text-anchor", "end")
			.attr("x", width3 - 320)
			.attr("y", height3 + 50)
			.style("fill", "purple")
			.style("font-weight", "bold")
			.text("Available Properties");
		// Y label Frequency 
		svg3.append("text")
			.attr("class", "y label")
			.attr("text-anchor", "end")
			.attr("y", -50)
			.attr("x", -160)
			.attr("transform", "rotate(-90)")
			.style("fill", "purple")
			.style("font-weight", "bold")
			.text("NYC Neighbourhood");


		var tooltip = d3.select("#scene_dataviz")
			.append("div")
			.style("opacity", 0)
			.attr("class", "tooltip")
			.style("background-color", "red")
			.style("border-radius", "5px")
			.style("padding", "10px")
			.style("color", "black")

		var showTooltip = function(d) {
			tooltip
				.transition()
				.duration(200)
			tooltip
				.style("opacity", 1)
				.html("NYC Neighbourhood : " + d.Neighbourhood +
					",  Property Available: " + d.Count)
				.style("left", "200px")
				.style("top", "200px")
		}

		var hideTooltip = function(d) {
			tooltip
				.transition()
				.duration(200)
				.style("opacity", 0)
		}

		//Bars
		svg3.selectAll("myRect")
			.data(data)
			.enter()
			.append("rect")
			.attr("x", x3(0))
			.attr("y", function(d) {
				return y3(d.Neighbourhood);
			})
			.attr("width", function(d) {
				return x3(d.Count);
			})
			.attr("height", y3.bandwidth())
			.attr("fill", "purple")
			.on("mouseover", showTooltip)
			.on("mouseleave", hideTooltip)
	});

	const annotations = [{
		note: {
			label: "",
			title: "Manhattan is the popular neighbourhood",
			wrap: 150
		},
		connector: {
			end: "dot",
			type: "curve",
			//can also add a curve type, e.g. curve: d3.curveStep
			points: [
				[100, 14],
				[190, 52]
			]
		},
		x: 500,
		y: 60,
		dy: 137,
		dx: 262
	}].map(function(d) {
		d.color = "blue";
		return d
	})

	const makeAnnotations = d3.annotation()
		.type(d3.annotationLabel)
		.annotations(annotations)

	d3.select("svg")
		.append("g")
		.attr("class", "annotation-group")
		.call(makeAnnotations)
}


function scene2() {
	var one = 0;

	document.getElementById("div2").style.display = "block";
	document.getElementById("div1").style.display = "none";
	document.getElementById("scene_dataviz").innerHTML = "";
	document.getElementById("div3").style.display = "none";
	document.getElementById("scene_dataviz3").innerHTML = "";

	// set margins of the graph
	var margin = {
			top: 10,
			right: 100,
			bottom: 60,
			left: 100
		},
		width = 1000 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;
	// append the svg object to the body of the page
	var svg = d3.select("#scene_dataviz2")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform",
			"translate(" + margin.left + "," + margin.top + ")")


	d3.csv("https://raw.githubusercontent.com/sumanthkm/cs416narrativevisualization/main/airbnb.csv", function(data) {

		// X axis
		var x = d3.scaleLinear()
			.domain([0, 1500])
			.range([0, width]);
		svg.append("g")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x));

		var histogram = d3.histogram()
			.value(function(d) {
				return d.Price;
			})
			.domain(x.domain())
			.thresholds(x.ticks(100));


		var bins = histogram(data);

		// Y axis
		var y = d3.scaleLinear()
			.range([height, 0]);
		y.domain([0, d3.max(bins, function(d) {
			return d.length;
		})]);
		svg.append("g")
			.call(d3.axisLeft(y));

		// X label price
		svg.append("text")
			.attr("class", "x label")
			.attr("text-anchor", "end")
			.attr("x", width - 300)
			.attr("y", height + 40)
			.style("fill", "purple")
			.style("font-weight", "bold")
			.text("Rental Prices per Night");
		// Y label Frequency 
		svg.append("text")
			.attr("class", "y label")
			.attr("text-anchor", "end")
			.attr("y", -50)
			.attr("x", -160)
			.attr("transform", "rotate(-90)")
			.style("fill", "purple")
			.style("font-weight", "bold")
			.text("Frequency");

		// append the bar rectangles to the svg element
		svg.selectAll("rect")
			.data(bins)
			.enter()
			.append("rect")
			.attr("x", 1)
			.attr("transform", function(d) {
				return "translate(" + x(d.x0) + "," + y(d.length) + ")";
			})
			.attr("width", function(d) {
				return x(d.x1) - x(d.x0) - 1;
			})
			.attr("height", function(d) {
				return height - y(d.length);
			})
			.style("fill", "purple");

		const annotations = [{
			note: {
				label: "",
				title: "The maximum rental price per night is around 4500$",
				wrap: 150
			},
			connector: {
				end: "dot",
				type: "line",
				//can also add a curve type, e.g. curve: d3.curveStep
				points: [
					[100, 14],
					[190, 52]
				]
			},
			x: 150,
			y: 30,
			dy: 137,
			dx: 262
		}].map(function(d) {
			d.color = "blue";
			return d
		});

		const makeAnnotations = d3.annotation()
			.type(d3.annotationLabel)
			.annotations(annotations);

		d3.select("svg")
			.append("g")
			.attr("class", "annotation-group")
			.call(makeAnnotations);
	});
}


function scene3() {

	document.getElementById("div1").style.display = "none";
	document.getElementById("scene_dataviz").innerHTML = "";
	document.getElementById("div3").style.display = "block";
	document.getElementById("div2").style.display = "none";
	document.getElementById("scene_dataviz2").innerHTML = "";

	var margin2 = {
			top: 30,
			right: 100,
			bottom: 60,
			left: 100
		},
		width2 = 1000 - margin2.left - margin2.right,
		height2 = 500 - margin2.top - margin2.bottom;
	// append the svg object to the body of the page
	var svg2 = d3.select("#scene_dataviz3")
		.append("svg")
		.attr("width", width2 + margin2.left + margin2.right)
		.attr("height", height2 + margin2.top + margin2.bottom)
		.append("g")
		.attr("transform",
			"translate(" + margin2.left + "," + margin2.top + ")")

	//Read the data
	d3.csv("https://raw.githubusercontent.com/sumanthkm/cs416narrativevisualization/main/airbnb.csv", function(data) {
		var x2 = d3.scaleLinear()
			.domain([0, 1500])
			.range([0, width2]);
		svg2.append("g")
			.attr("class", "myXaxis") // Note that here we give a class to the X axis, to be able to call it later and modify it
			.attr("transform", "translate(0," + height2 + ")")
			.call(d3.axisBottom(x2))
			.attr("opacity", "0")


		var y2 = d3.scaleLinear()
			.domain([0, 300])
			.range([height2, 0]);
		svg2.append("g")
			.call(d3.axisLeft(y2));

		svg2.append("text")
			.attr("class", "x label")
			.attr("text-anchor", "end")
			.attr("x", width2 - 330)
			.attr("y", height2 + 20)
			.style("fill", "purple")
			.style("font-weight", "bold")
			.text("Property Prices per Night");

		svg2.append("text")
			.attr("class", "y label")
			.attr("text-anchor", "end")
			.attr("y", -50)
			.attr("x", -130)
			.attr("transform", "rotate(-90)")
			.style("fill", "purple")
			.style("font-weight", "bold")
			.text("Number of Reviews");


		// Add dots
		svg2.append('g')
			.selectAll("dot")
			.data(data)
			.enter()
			.append("circle")
			.attr("cx", function(d) {
				return x2(d.Price);
			})
			.attr("cy", function(d) {
				return y2(d.num_reviews);
			})
			.attr("r", 1.5)
			.style("fill", "purple")

		
		const annotations = [{
			note: {
				label: "",
				title: "The reviews are more for lesser rental price per night",
				wrap: 150
			},
			connector: {
				end: "dot",
				type: "line",
				//can also add a curve type, e.g. curve: d3.curveStep
				points: [
					[100, 14],
					[190, 52]
				]
			},
			x: 160,
			y: 130,
			dy: 37,
			dx: 372
		}].map(function(d) {
			d.color = "blue";
			return d
		});

		const makeAnnotations = d3.annotation()
			.type(d3.annotationLabel)
			.annotations(annotations);

		d3.select("svg")
			.append("g")
			.attr("class", "annotation-group")
			.call(makeAnnotations);		
		

	})
}
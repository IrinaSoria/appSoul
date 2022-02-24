var positionStep = -1;
var positionSubStep = -1;
var stepSubStep;
var subStepList = [];
var stepList = [];
var roadmapSalida;


$("#crearRoadmap").click(function() {
	var roadmap = {
		title: $("#titleRoadmap").val(),
		description: $("#descriptionRoadmap").val(),
		steps: stepList,
		subStep: subStepList,
	};
	$.ajax({
		url: '/roadmaps/create',
		data: JSON.stringify(roadmap),
		dataType: 'json',
		contentType: "application/json",
		type: 'POST',
		success: function(data) {
			roadmapSalida = data;
			alert("se creo el rodmap");
		},
		error: function(data) {
			alert("no se creo el roadmap ni mierda");
		}
	});
});

$("#preview").click(function() {
	$.ajax({
		url: '/step/ver-steps',
		contentType: "application/json",
		type: 'GET',
		success: function(data) {
			console.log(data);
		},
		error: function(data) {
			stepList.push(data);
			console.log("no funciono");
		}
	});
});

$("#crearStep").click(function() {
	positionStep = positionStep + 1;
	var step = {
		name: $("#name").val(),
		description: $("#description").val(),
		position: positionStep,
	};
	$.ajax({
		url: '/step/add',
		data: JSON.stringify(step),
		dataType: 'json',
		contentType: "application/json",
		type: 'POST',
		success: function(data) {
			stepSubStep = data;
			stepList.push(data);
			positionSubStep = -1;
			$("#ver-steps").append("<tr><td>" + data.name + "</td></tr>")
		},
		error: function(data) {
			alert("no se creo ni mierda");
		}
	});
});

$("#crearSubStep").click(function() {
	positionSubStep = positionSubStep + 1;
	var subStep = {
		name: $("#name").val(),
		description: $("#description").val(),
		step: stepSubStep,
		position: positionSubStep,
	};
	$.ajax({
		url: '/sub-step/add',
		data: JSON.stringify(subStep),
		dataType: 'json',
		contentType: "application/json",
		type: 'POST',
		success: function(data) {
			subStepList.push(data);
			alert("se creo el subStep");
		},
		error: function(data) {
			alert("no se creo ni mierda");
		}
	});
});

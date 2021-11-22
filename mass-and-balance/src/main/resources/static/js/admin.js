$(document).ready(function(){
	$('#add_aircraft_btn').click(function(){
		addAircraft();
	});
	
	$('.act-field').change(function(){
		updateAircraft();
	});
		
	
});

function addAircraft(){
	$.ajax({url: window.location.origin+"/api/aircraft/instantiate"})
	.done(function(act){
		$('#aircraft_list').append($('<li>')
													.append($('<a>').text(act.registrationMark)
													.attr('href', window.location.origin+'/admin?actId='+act.id)));
		
	})
	.fail(function(err){
		alert('Error whil creating new aircraft');
	})
	.always();
}

function updateAircraft(){
	const act = {};
	act['id'] = $('#aircraft_container').data('actId');
	act['registrationMark'] = $('#act_registration_mark').val()
	act['emptyWeight'] = $('#act_empty_weight').val()
	act['maximumTakeOffWeight'] = $('#act_maximum_take_off_weight').val()
	act['maximumLandingWeight'] = $('#act_maximum_landing_weight').val()
	act['maximumZeroFuelWeight'] = $('#act_maximum_zero_fuel_weight').val()
	act['imageUrl'] = $('#act_image_url').val()
	console.log(act)
	$.ajax({
		url: window.location.origin+"/api/aircraft", 
		method: 'PUT',
		data: JSON.stringify(act),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json'
	}).done(function(back){
		console.log(back)
		$('#aircraft_list a.is-active').text(back.registrationMark)
	})
	.fail(function(){
		alert('It was not possible to save the changes');
	})
	
	
	
}
$(document).ready(function(){
	
	
	$('.act-card')
	.hover(function(){
		$(this).css('transform', 'scale(1.05)')
	}, function(){
		$(this).css('transform', 'scale(1.0)')
	})
	.click(function(){
		window.location.href = window.location.origin+"/mab/"+$(this).data("actId");
	});
	
});
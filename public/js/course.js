//var data = require(./public/data.json);

$(document).ready(function() {
	$('select').change(updatePeerList);
	$('.search-peer').keyup(searchFilter);

	$('.peerProfile').click(function(e) {
		ga("send", "event", "peer", "click");
	});
});

function updatePeerList(e) {
	// Prevent following link
	//e.preventDefault();

	var year = $('#year-sel').val();
	var location = $('#location-sel').val();
	var visibleTracker;

	$('#peer-list > div').each(function() {
		if ($(this).is(":visible")) {
			visibleTracker = 1;
		}
		else {
			visibleTracker = 0;
		}
	})

	if (visibleTracker) {
		$('#peer-list >').hide();
	}

	console.log(year);
	$('#peer-list .' + year + '.' + location).show();
	console.log(year);
};

function searchFilter(e) {
	var i;
	var names;
	var input = $('.search-peer').val().toUpperCase();

	$('#peer-list > div').each(function() {
		if ($(this).find('.media-heading').html().toUpperCase().indexOf(input) > -1) {
			console.log('if');
			$(this).show();
			console.log(this);
		}
		else {
			console.log('else');
			$(this).hide();
			console.log(this);
		}
	});
};

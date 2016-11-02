// Giphy app.
// Create an array of soccerPlayer. This array then needs to be displayed as buttons.
// On click, each soccerPlayer button should show 10 different giphys related to that soccerPlayer clicked.
// There should also be a form that allows the user to input a new soccerPlayer to the soccerPlayer buttons already displayed


var topics = ['ping pong','tennis','football','badminton','basketball','hockey'];

function displaySoccerPlayerGif() {

	$('#sportsGiphies').empty();

	var $sport = $(this).data('name');

	var queryURL = 'https://api.giphy.com/v1/gifs/search?q='+$sport+'&api_key=dc6zaTOxFJmzC&limit=10&rating=pg-13';

	$.ajax({url: queryURL, method: 'GET'})

	.done(function(response){

		var $results = response.data;

		for (var i=0; i<$results.length; i++) {

			var $gifDiv = $('<div class="item">');

			var $rating = $results[i].rating;

			var $p = $('<p>').text('Rating: '+$rating).addClass('rating');

			var $sportImage = $('<img id="gif">');
			$sportImage.attr('src',$results[i].images.fixed_height_still.url);
			$sportImage.attr('data-state','still');
			$sportImage.attr('data-still',$results[i].images.fixed_height_still.url);
			$sportImage.attr('data-animate',$results[i].images.fixed_height.url);

			$gifDiv.append($p);

			$gifDiv.append($sportImage);

			$('#sportsGiphies').prepend($gifDiv);

			$('#gif').on('click',function(){

			var state = $(this).attr('data-state');

	            if ( state == 'still'){
	                $(this).attr('src', $(this).data('animate'));
	                $(this).attr('data-state', 'animate');
	            }else if (state==='animate'){
	                $(this).attr('src', $(this).data('still'));
	                $(this).attr('data-state', 'still');
            	}
			});

		}
	})


}

function renderButtons() {

	$('#sportsView').empty();

	for (var i=0; i<topics.length; i++) {

		var $aButton = $('<button>');

		$aButton.addClass('sport btn btn-success');

		$aButton.attr('data-name', topics[i]);

		$aButton.text(topics[i]);

		$('#sportsView').append($aButton);
	}
}


$('#addSport').on('click',function(){

	if ($('#sport-input').val()==='') {
		alert('Player not entered');
	} else {
		var sportInput = $('#sport-input').val().trim();

		topics.push(sportInput);

		renderButtons();

		$('#sport-input').val("");

		return false;
	}
});


$(document).on('click', '.sport', displaySoccerPlayerGif);

renderButtons();



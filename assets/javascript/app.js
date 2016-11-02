// Giphy app.
// Create an array of soccerPlayer. This array then needs to be displayed as buttons.
// On click, each soccerPlayer button should show 10 different giphys related to that soccerPlayer clicked.
// There should also be a form that allows the user to input a new soccerPlayer to the soccerPlayer buttons already displayed


var topics = ['Zidane','Ronaldo','Messi ','Ronaldinho','Robinho','Sergio Ramos','Del Piero'];

function displaySoccerPlayerGif() {

	$('#soccerPlayerGifs').empty();

	var $soccerPlayer = $(this).data('name');

	var queryURL = 'http://api.giphy.com/v1/gifs/search?q='+$soccerPlayer+'&api_key=dc6zaTOxFJmzC&limit=10';

	$.ajax({url: queryURL, method: 'GET'})

	.done(function(response){

		var $results = response.data;

		for (var i=0; i<$results.length; i++) {

			var $gifDiv = $('<div class="item">');

			var $rating = $results[i].rating;

			var $p = $('<p>').text('Rating: '+$rating);

			var $soccerPlayerImage = $('<img id="gif">');
			$soccerPlayerImage.attr('src',$results[i].images.fixed_height_still.url);
			$soccerPlayerImage.attr('data-state','still');
			$soccerPlayerImage.attr('data-still',$results[i].images.fixed_height_still.url);
			$soccerPlayerImage.attr('data-animate',$results[i].images.fixed_height.url);

			$gifDiv.append($p);

			$gifDiv.append($soccerPlayerImage);

			$('#soccerPlayerGifs').prepend($gifDiv);

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


	$('#soccerPlayerView').empty();
	for (var i=0; i<topics.length; i++) {


		var $aButton = $('<button>');

		$aButton.addClass('soccerPlayer');

		$aButton.attr('data-name', topics[i]);

		$aButton.text(topics[i]);
		$('#soccerPlayerView').append($aButton);
	}
}


$('#addSoccerPlayer').on('click',function(){

	if ($('#soccerPlayer-input').val()==='') {
		alert('Player not entered');
	} else {
		var soccerPlayer = $('#soccerPlayer-input').val().trim();

		topics.push(soccerPlayer);
topics
		renderButtons();

		return false;
	}
});


$(document).on('click', '.soccerPlayer', displaySoccerPlayerGif);

renderButtons();



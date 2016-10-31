// Giphy app.
// Create an array of animals. This array then needs to be displayed as buttons.
// On click, each animal button should show 10 different giphys related to that animal clicked.
// There should also be a form that allows the user to input a new animal to the animal buttons already displayed


var animals = ['horse','wolf','turtle','dog','cat','giraffe','elephant','donkey'];

function displayAnimalGif() {

	$('#animalGifs').empty();

	var $animal = $(this).data('name');

	var queryURL = 'http://api.giphy.com/v1/gifs/search?q='+$animal+'&api_key=dc6zaTOxFJmzC&limit=10';

	$.ajax({url: queryURL, method: 'GET'})

	.done(function(response){
		
		var $results = response.data;

		for (var i=0; i<$results.length; i++) {

			var $gifDiv = $('<div class="item">');

			var $rating = $results[i].rating;

			var $p = $('<p>').text('Rating: '+$rating);

			var $animalImage = $('<img>');

			$animalImage.attr('src', $results[i].images.fixed_height_still.url);

			$gifDiv.append($p);

			$gifDiv.append($animalImage);

			$('#animalGifs').prepend($gifDiv);

		}
	})

}

function renderButtons() {

	$('#animalsView').empty();

	for (var i=0; i<animals.length; i++) {

		var $aButton = $('<button>');

		$aButton.addClass('animal');

		$aButton.attr('data-name',animals[i]);
		// $aButton.attr('data-still',animals[i].images.fixed_height_still.url);
		// $abutton.attr('data-animate',animals[i].images.fixed_height.url);

		$aButton.text(animals[i]);

		$('#animalsView').append($aButton);
	}
}

$('#addAnimal').on('click',function(){
	var animal = $('#animal-input').val().trim();

	animals.push(animal);

	renderButtons();

	return false;
})

$(document).on('click', '.animal', displayAnimalGif);

renderButtons();



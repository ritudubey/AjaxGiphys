// Initial array of movies
	var movies = ['Christmas', 'Diwali', 'Halloween', 'Hanukka', 'Holi'];

	// ========================================================

	// Generic function for displaying movie data 
	function renderButtons(){ 

		// Deletes the movies prior to adding new movies (this is necessary otherwise you will have repeat buttons)
		$("#buttonView").empty();

		// Loops through the array of movies
		for (var i = 0; i < movies.length; i++) {

			// Then dynamicaly generates buttons for each movie in the array
			var b = $("<button></button>");
			b.attr("data-festival", movies[i]);
			b.html(movies[i]);
			$("#buttonView").append(b);
		}
		
	}

	// ========================================================

	// This function handles events where one button is clicked
	$('#addMovie').on('click', function(){

		// This line of code will grab the input from the textbox
		var movie = $('#movie-input').val();

		// The movie from the textbox is then added to our array
		if(movie !== "") {
			movies.push(movie);
			// Our array then runs which handles the processing of our movie array
			renderButtons();
		}
		
		// We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
		return false;
	});

	 	$("body").on("click", 'button', function() {
	 		$("#gifsAppearHere").empty();
	 		var p = $(this).data('festival');
	 		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + p + "&api_key=dc6zaTOxFJmzC&limit=10";

	 		$.ajax({
	 			url: queryURL,
	 			method: 'GET'
	 		})
	 		.done(function(response) {
	 			var results = response.data;

	 			for (var i = 0; i < results.length; i++) {

	 				var gifDiv = $('<div class="item" style="float: left;">')

	 				var rating = results[i].rating;

	 				var p = $('<p>').text("Rating: " + rating);

	 				var personImage = $('<img>');
	 				personImage.attr('src', results[i].images.fixed_height.url);
	 				personImage.attr('data-animate', results[i].images.fixed_height.url);
	 				personImage.attr('data-still', results[i].images.fixed_height_still.url);
	 				personImage.attr('data-state', 'animate');


	 				gifDiv.append(p);
	 				gifDiv.append(personImage);

	 				gifDiv.attr('margin', '10px 10px 10px 10px');

	 				$('#gifsAppearHere').prepend(gifDiv);


	 			}
	 		});
	 	});
	 	$("body").on("click", 'img', function() {
	 		var state = $(this).attr("data-state");
	 		console.log(state);
	 		if(state == 'still') {

	 			$(this).attr('src', $(this).data('animate'));
	 			$(this).attr('data-state', 'animate');
	 		}else {
	 			$(this).attr('src', $(this).data('still'))
	 			$(this).attr('data-state', 'still')
	 		}
	 	});

	// ========================================================

	// This calls the renderButtons() function
	renderButtons();
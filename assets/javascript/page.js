// GLOBAL VARIABLES
// --------------------------------------------------------------------------
var actors = ["Tom Cruise", "Will Smith", "Matt Damon"];


// FUNCTIONS
// ---------------------------------------------------------------------------

function createButtons(){
	// empty the display 
	$("#actorsButton").empty();

	for(var i = 0; i < actors.length; i++){
		// creates a button
		var a = $("<button>");
		// create a class for CSS mods
		a.addClass("actorsButtons");
		// add atribute data name
		a.attr("data-actor", actors[i]);
		// text in button
		a.text(actors[i]);
		$("#actorsButton").append(a);
	}
}

function createGif(){

	// emtpy the div where the actors go 
	$("#actors").empty();

	// creates and stores data-actor value from button
	var actorGit = $(this).attr("data-actor");


	// construct a query url for this actor
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        actorGit + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After data comes back from the request
        .done(function(response){
        	console.log(queryURL);
        	console.log(response);

        	// create for loop to make gif
	        for(var i = 0; i <response.data.length; i++){

	        	// creates a div 
	        	var actorDiv = $("<div>");

	        	// creates paragraph for rating
	        	var p = $("<p>");
	        	p.text("Rating: " + response.data[i].rating);

	        	// creating an image tag and adding the attr
	        	var actorImage = $("<img>");
	        	actorImage.attr("src",response.data[i].images.fixed_width_small.url);
	        	actorImage.attr("data-state", "still");
	        	actorImage.addClass("gif");

	        	// appending rating and image
	        	actorDiv.append(p);
	        	actorDiv.append(actorImage);

	        	// adding the images to the page
	        	$("#actors").prepend(actorDiv);


	        }	
        });

}




// STARTING
// ---------------------------------------------------------------------------
createButtons();

$("#add-actor").on("click",function(event){
	// prevents form from submitting itself
	event.preventDefault();
	// grabs the value of what was placed in trim
	var actor = $("#actor-input").val().trim();

	// push the movie into array

	actors.push(actor);
	createButtons();

});

$(document).on("click",".actorsButtons",createGif);


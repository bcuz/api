// this function takes the question object returned by the StackOverflow request
// and returns new result to be appended to DOM

// good point for not having forecast.


$(document).ready( function() {
	var showCurrent = function(item) {

	var template = $('.templates .answers').clone();

	var userElem = template.find(".user");
	userElem.text(parseInt(item.current_observation.feelslike_f))

	var repElem = template.find(".reputation");
	repElem.text(item.current_observation.wind_dir + " @ " + item.current_observation.wind_mph + " mph")

	var scoreElem = template.find(".score")
	scoreElem.text(item.current_observation.relative_humidity)

	var postsElem = template.find(".posts")
	var custom_time = item.current_observation.observation_time.substring(16)
	postsElem.text(custom_time)

	// $("body").append("<p>hi</p>")

	return template;
}


var showForecast = function(item) {

	var template = $('.templates .forecast').clone();

	var userElem = template.find(".one_day");
	userElem.text(item.forecast.txt_forecast.forecastday[2].title + ": " + item.forecast.txt_forecast.forecastday[2].fcttext)

	var repElem = template.find(".two_day");
	repElem.text(item.forecast.txt_forecast.forecastday[4].title + ": " + item.forecast.txt_forecast.forecastday[4].fcttext)

	return template;
	// var result = $('.templates .answers').clone();

	// var userElem = result.find(".user a");
	// userElem.attr('href', user.user.link)
	// userElem.text(user.user.display_name)

	// var repElem = result.find(".reputation");
	// repElem.text(user.user.reputation)

	// var scoreElem = result.find(".score")
	// scoreElem.text(user.score)

	// var postsElem = result.find(".posts")
	// postsElem.text(user.post_count)

	// var postsElem = result.find(".type")
	// postsElem.text(user.user.user_type)

	// return result;
}

// var showQuestion = function(question) {

// 	// clone our result template code
// 	var result = $('.templates .question').clone();

// 	// Set the question properties in result
// 	var questionElem = result.find('.question-text a');
// 	questionElem.attr('href', question.link);
// 	questionElem.text(question.title);

// 	// set the date asked property in result
// 	var asked = result.find('.asked-date');
// 	var date = new Date(1000*question.creation_date);
// 	asked.text(date.toString());

// 	// set the .viewed for question property in result
// 	var viewed = result.find('.viewed');
// 	viewed.text(question.view_count);

// 	// set some properties related to asker
// 	var asker = result.find('.asker');
// 	asker.html('<p>Name: <a target="_blank" '+
// 		'href=http://stackoverflow.com/users/' + question.owner.user_id + ' >' +
// 		question.owner.display_name +
// 		'</a></p>' +
// 		'<p>Reputation: ' + question.owner.reputation + '</p>'
// 	);

// 	return result;
// };


// this function takes the results object from StackOverflow
// and returns the number of results and tags to be appended to DOM
var showSearchResults = function(query, resultNum) {
	var results = resultNum + ' results for <strong>' + query + '</strong>';
	return results;
};

// takes error string and turns it into displayable DOM element
var showError = function(error){
	var errorElem = $('.templates .error').clone();
	var errorText = '<p>' + error + '</p>';
	errorElem.append(errorText);
};

// takes a string of semi-colon separated tags to be searched
// for on StackOverflow
var getCurrent = function() {

	// the parameters we need to pass in our request to StackOverflow's API
	// var request = {
	// 	tagged: tags,
	// 	site: 'stackoverflow',
	// 	order: 'desc',
	// 	sort: 'creation'
	// };

	$.ajax({
		url: "https://api.wunderground.com/api/be93c4c3fa5780ba/geolookup/conditions/q/MI/Warren.json",
		// data: request,
		dataType: "jsonp",//use jsonp to avoid cross origin issues
		type: "GET"
	})
	.done(function(result){ //this waits for the ajax to return with a succesful promise object
		console.log(result);
		// var searchResults = showSearchResults(request.tagged, result.items.length);
		// $('.search-results').html(searchResults);
		// //$.each is a higher order function. It takes an array and a function as an argument.
		// //The function is executed once for each item in the array.
		// $.each(result.items, function(i, item) {
		// 	var question = showQuestion(item);
		// 	$('.results').append(question);

		var answer = showCurrent(result)
		$(".container").prepend(answer)


	})
	.fail(function(jqXHR, error){ //this waits for the ajax to return with an error promise object
		console.log(error);
	});
};

var getForecast = function() {

	// the parameters we need to pass in our request to StackOverflow's API
	// var request = {
	// 	tagged: tags,
	// 	site: 'stackoverflow',
	// 	order: 'desc',
	// 	sort: 'creation'
	// };

	$.ajax({
		url: "https://api.wunderground.com/api/be93c4c3fa5780ba/forecast/q/MI/Warren.json",
		// data: request,
		dataType: "jsonp",//use jsonp to avoid cross origin issues
		type: "GET"
	})
	.done(function(result){ //this waits for the ajax to return with a succesful promise object
		console.log(result);
		// var searchResults = showSearchResults(request.tagged, result.items.length);
		// $('.search-results').html(searchResults);
		// //$.each is a higher order function. It takes an array and a function as an argument.
		// //The function is executed once for each item in the array.
		// $.each(result.items, function(i, item) {
		// 	var question = showQuestion(item);
		// 	$('.results').append(question);

		var answer = showForecast(result)
		$(".container").append(answer)


	})
	.fail(function(jqXHR, error){ //this waits for the ajax to return with an error promise object
		console.log(error);
	});
};



	getCurrent();
	getForecast();
});


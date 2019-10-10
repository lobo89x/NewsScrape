// Grab the articles as a json
$.getJSON("/articles", function(data) {
  for (var i = 0; i < data.length; i++) {
    //$("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    var article = $("<div>");
    article.addClass("card");
    article.append("<h5 class='card-title'>"+data[i].title+"</h5>");
    article.append("<p class='card-text'>"+data[i].summary+"</p>");
    article.append("<a href="+data[i].link+" class='card-text'>Read It Here</a>");
    article.append("<p data-id='"+data[i]._id + "' clss='card-text' id='article-note'>Got something to say?</p>");
    $("#articles").append(article);
  }
});

$.getJSON("/podcasts", function(data) {
  for (var i = 0; i < data.length; i++) {
    //$("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    var podcast = $("<div>");
    podcast.addClass("card");
    podcast.append("<h5 class='card-title'>"+data[i].title+"</h5>");
    podcast.append("<p class='card-text'>"+data[i].summary+"</p>");
    podcast.append("<a href="+data[i].link+" class='card-text'>Read It Here</a>");
    podcast.append("<p data-id='"+data[i]._id + "' clss='card-text' id='article-note'>Got something to say?</p>");
    $("#podcasts").append(podcast);
  }
});

// Whenever someone clicks on the Article note tag
$(document).on("click", "#article-note", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        $("#notesDisplay").empty();
        // Place the title of the note in the title input
        // data.note.array.forEach(element => {
        //   console.log(element);
        // });

        // var note = $("<div>");
        // note.addClass("card");
        // note.append("<h5 clss='card-title'>"+data.note.title+"</h5>");
        // note.append("<p clss='card-text'>"+data.note.body+"</p>");
        // $("#notesDisplay").append(note);
        console.log(note);
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

//Scrape modal 
var modal = $("#ArticlesRescrapeModal");
var modal2 = $("#ArticlesRescrapeModal");
var modalBtn = $("#modalBtn");
var closeBtn = $(".closeBtn");

function scrapeArticles() {
  console.log("scraping articles");
  console.log(modal[0].style);
  modal[0].style.display = 'block';
  $.get("/scrape");
  console.log("finished scraping articles");

}
function scrapePodcasts() {
  console.log("scraping podcasts");
  console.log(modal[0].style);
  modal2[0].style.display = 'block';
  $.get("/scrape/Podcasts");
  console.log("finished scraping podcasts");

}
function closeModal() {
  console.log("closing modal");
  modal[0].style.display = 'none';
}
$(document).on("click", "#modalBtn",scrapeArticles);
$(document).on("click", "#modalBtnPodcasts",scrapePodcasts);
$(document).on("click", ".closeBtn",closeModal);
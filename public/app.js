// Grab the articles as a json
$.getJSON("/articles", function(data) {
  if (data.length > 9){
    for (var i = 0; i < 10; i++) {
      //$("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
      var article = $("<div>");
      article.addClass("card");
      article.append("<h5 class='card-title'>"+data[i].title+"</h5>");
      article.append("<p class='card-text'>"+data[i].summary+"</p>");
      article.append("<a href="+data[i].link+" class='card-text'>Read It Here</a>");
      article.append("<p data-id='"+data[i]._id + "' clss='card-text' id='article-note'>Got something to say?</p>");
      $("#articles").append(article);
    }  
  }
  else {
    
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
  }
});

$.getJSON("/podcasts", function(data) {
  if (data.length > 9){
    for (var i = 0; i < 10; i++) {
      //$("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
      var podcast = $("<div>");
      podcast.addClass("card");
      podcast.append("<h5 class='card-title'>"+data[i].title+"</h5>");
      podcast.append("<p class='card-text summary'>"+data[i].summary+"</p>");
      podcast.append("<a href="+data[i].link+" class='card-text'>Listen to It Here</a>");
      podcast.append("<p data-id='"+data[i]._id + "' clss='card-text' id='podcast-comment'>Got something to say?</p>");
      $("#podcasts").append(podcast);
    }
    
  }
  else {
    for (var i = 0; i < data.length; i++) {
      //$("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
      var podcast = $("<div>");
      podcast.addClass("card");
      podcast.append("<h5 class='card-title'>"+data[i].title+"</h5>");
      podcast.append("<p class='card-text summary'>"+data[i].summary+"</p>");
      podcast.append("<a href="+data[i].link+" class='card-text'>Listen to It Here</a>");
      podcast.append("<p data-id='"+data[i]._id + "' clss='card-text' id='podcast-comment'>Got something to say?</p>");
      $("#podcasts").append(podcast);
    }
  }
});

// Whenever someone clicks on the Article note tag
$(document).on("click", "#article-note", function() {
  $("#notes").empty();
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      $("#notes").append("<h2>" + data.title + "</h2>");
      $("#notes").append("<input id='titleinput' name='title' >");
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

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

// Whenever someone clicks on the Podcast comment tag
$(document).on("click", "#podcast-comment", function() {
  $("#comments").empty();
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the podcasts
  $.ajax({
    method: "GET",
    url: "/podcasts/" + thisId
  })
    .then(function(data) {
      console.log(data);
      $("#comments").append("<h2>" + data.title + "</h2>");
      $("#comments").append("<input id='commenttitleinput' name='title' >");
      $("#comments").append("<textarea id='commentbodyinput' name='body'></textarea>");
      $("#comments").append("<button data-id='" + data._id + "' id='savecomment'>Save Note</button>");

      if (data.comment) {
        //$("#comments").empty();
        console.log(data.comment);
        $("#commenttitleinput").val(data.comment.title);
        // Place the body of the note in the body textarea
        $("#commentbodyinput").val(data.comment.body);
      }
    });
});


// When you click the savenote button
$(document).on("click", "#savenote", function() {
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  })
    .then(function(data) {
      console.log(data);
      $("#notes").empty();
    });
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

$(document).on("click", "#savecomment", function() {
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/podcasts/" + thisId,
    data: {
      title: $("#commenttitleinput").val(),
      body: $("#commentbodyinput").val()
    }
  })
    .then(function(data) {
      console.log(data);
      $("#coments").empty();
    });
  $("#commenttitleinput").val("");
  $("#commentbodyinput").val("");
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
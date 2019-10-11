var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Requires to pull depependencies
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models");

// create port
var PORT = process.env.PORT || 9001;

// Initialize Express
var app = express();


// Use morgan logger for logging requests
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://tvtapp:root1988@ds233278.mlab.com:33278/heroku_4pcqdl7k";


// mongoose.connect("mongodb://localhost/Test002", { useNewUrlParser: true , useUnifiedTopology: true });

mongoose.connect(MONGODB_URI);

// Route definitions

// A GET route for scraping the TYT website
app.get("/scrape", function(req, res) {
  // axios.get pulls the articles from the url
  axios.get("https://tyt.com/stories/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
    //<tyt-article-view _ngcontent-c39="" _nghost-c32=""><!----><!----><!----><div _ngcontent-c32="" id="block"><div _ngcontent-c32="" id="underbox"><!----><a _ngcontent-c32="" href="/stories/4vZLCHuQrYE4uKagy0oyMA/5y5qMkorc7e4drPVloc7b2"><!----></a><!----><!----><a _ngcontent-c32="" id="franchise" href="/stories/franchise/4vZLCHuQrYE4uKagy0oyMA"><i _ngcontent-c32="" class="responsive-background" data-image-id="1098" style="background-image: url(&quot;https://images.ctfassets.net/uoaa2cfwzbej/577AIjoXa0ciyOIIuU6OQA/d686595b07bb6a1f3ffd871259be5bec/avatar_tyt_investigates.png?w=1920&quot;);"></i> TYT Investigates </a><div _ngcontent-c32="" id="metadata"><div _ngcontent-c32="" class="article-title"><!----><a _ngcontent-c32="" href="/stories/4vZLCHuQrYE4uKagy0oyMA/5y5qMkorc7e4drPVloc7b2">DHS Does ‘Victory Lap’ Over 2% Employee Morale Increase</a><!----></div><div _ngcontent-c32="" class="summary">  </div><div _ngcontent-c32="" class="article-subtext"><!----><!----><!----><strong _ngcontent-c32="">By: </strong><span _ngcontent-c32=""><!----><!----><!----><a _ngcontent-c32="" id="talent" href="/about/talent/5XgzR7Jw4MIc8IWuOkeM0g"><!---->Ken Klippenstein</a><!----><!----></span><span _ngcontent-c32="" class="divider">|</span><span _ngcontent-c32="">Sep 25, 2019</span><span _ngcontent-c32="" class="divider">|</span><tyt-comments-count _ngcontent-c32="" _nghost-c29=""><i _ngcontent-c29="" class="fas fa-comment-alt"></i><!----><span _ngcontent-c29="" class="spot-im-replies-count" data-post-id="article_5y5qMkorc7e4drPVloc7b2"></span></tyt-comments-count></div></div></div></div></tyt-article-view>
    $(".article").each(function(i, element) {
      // make a blank to receive the results
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this).find(".article-title").children("a").text();
      result.link = "https://tyt.com"+$(this).find(".article-title").children("a").attr("href");
      result.summary = $(this).find(".summary").text()

      // Create a new Article using the `result` object built from scraping
      console.log(result);
      db.Article.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
    });

    // Send a message to the client
    res.send("Scrape Complete");
  });
});

app.get("/scrape/Podcasts", function(req, res) {
  // axios.get pulls the articles from the url
  axios.get("https://tyt.com/podcasts/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
    //<tyt-article-view _ngcontent-c39="" _nghost-c32=""><!----><!----><!----><div _ngcontent-c32="" id="block"><div _ngcontent-c32="" id="underbox"><!----><a _ngcontent-c32="" href="/stories/4vZLCHuQrYE4uKagy0oyMA/5y5qMkorc7e4drPVloc7b2"><!----></a><!----><!----><a _ngcontent-c32="" id="franchise" href="/stories/franchise/4vZLCHuQrYE4uKagy0oyMA"><i _ngcontent-c32="" class="responsive-background" data-image-id="1098" style="background-image: url(&quot;https://images.ctfassets.net/uoaa2cfwzbej/577AIjoXa0ciyOIIuU6OQA/d686595b07bb6a1f3ffd871259be5bec/avatar_tyt_investigates.png?w=1920&quot;);"></i> TYT Investigates </a><div _ngcontent-c32="" id="metadata"><div _ngcontent-c32="" class="article-title"><!----><a _ngcontent-c32="" href="/stories/4vZLCHuQrYE4uKagy0oyMA/5y5qMkorc7e4drPVloc7b2">DHS Does ‘Victory Lap’ Over 2% Employee Morale Increase</a><!----></div><div _ngcontent-c32="" class="summary">  </div><div _ngcontent-c32="" class="article-subtext"><!----><!----><!----><strong _ngcontent-c32="">By: </strong><span _ngcontent-c32=""><!----><!----><!----><a _ngcontent-c32="" id="talent" href="/about/talent/5XgzR7Jw4MIc8IWuOkeM0g"><!---->Ken Klippenstein</a><!----><!----></span><span _ngcontent-c32="" class="divider">|</span><span _ngcontent-c32="">Sep 25, 2019</span><span _ngcontent-c32="" class="divider">|</span><tyt-comments-count _ngcontent-c32="" _nghost-c29=""><i _ngcontent-c29="" class="fas fa-comment-alt"></i><!----><span _ngcontent-c29="" class="spot-im-replies-count" data-post-id="article_5y5qMkorc7e4drPVloc7b2"></span></tyt-comments-count></div></div></div></div></tyt-article-view>
    $(".podcast-item").each(function(i, element) {
      // make a blank to receive the results
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this).find(".production-view").find("#underbox").children("h1").children("a").text();
      result.link = "https://tyt.com"+$(this).find(".production-view").find("#underbox").children("#items").children(".item").children(".item-content").children("summary").children("a").attr("href");
      result.summary = $(this).find(".production-view").find("#underbox").children("#items").children(".item").children(".item-content").children("summary").children("a").text();

      // Create a new Article using the `result` object built from scraping
      console.log(result);
      db.Podcast.create(result)
        .then(function(dbPodcast) {
          // View the added result in the console
          console.log(dbPodcast);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
    });
    res.send("Scrape Complete");
  });
});

// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
  db.Article.find(function(error, found) {
    if (error) {
      console.log(error);
    }
    else {
      // //console.log(found);
      // var list = [];
      // for (var i = 0; i < 10; i++) {
      //   list.append(found[i]);
      // }
      // console.log(list);
      res.json(found);
    }
  }).sort( { _id: -1 });
});

app.get("/podcasts", function(req, res) {
  db.Podcast.find(function(error, found) {
    if (error) {
      console.log(error);
    }
    else {
      //console.log("this is podcasts"+found);
      res.json(found);
    }
  }).sort( { _id: -1 });
});

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function(req, res) {
  var eid = req.params.id
  db.Article.findOne({ _id: eid })
    .populate("note")
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });


  // db.Article.find({_id: eid}, function(error, found) {
  //   if (error) {
  //     console.log(error);
  //   }
  //   else {
  //     res.json(found);
  //     db.Article.populate("note", function(err, dbArticle) {
  //       if (error) {
  //         console.log(err);
  //       }
  //       else {
  //         res.json(dbArticle);
  //       }
  //     })
  //   }
  // });
});

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function(req, res) {
  console.log(req.body);
  db.Note.create(req.body)
  .then(function(dbNote) {
    console.log(dbNote);
    return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
  })
  .then(function(dbArticle) {
    console.log(dbArticle);
    res.json(dbArticle);
  })
  .catch(function(err) {
    console.log(err);
  });
});

app.get("/podcasts/:id", function(req, res) {
  var eid = req.params.id
  console.log(eid);
  db.Podcast.findOne({ _id: eid })
    .populate("comment")
    .then(function(dbPodcast) {
      res.json(dbPodcast);
    })
    .catch(function(err) {
      res.json(err);
    });


  // db.Article.find({_id: eid}, function(error, found) {
  //   if (error) {
  //     console.log(error);
  //   }
  //   else {
  //     res.json(found);
  //     db.Article.populate("note", function(err, dbArticle) {
  //       if (error) {
  //         console.log(err);
  //       }
  //       else {
  //         res.json(dbArticle);
  //       }
  //     })
  //   }
  // });
});

app.post("/podcasts/:id", function(req, res) {
  console.log(req.body);
  db.Comment.create(req.body)
  .then(function(dbComment) {
    // View the added result in the console
    console.log(dbComment);
    return db.Podcast.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true });
  })
  .then(function(dbPodcast) {
    console.log(dbPodcast);
    res.json(dbPodcast);
  })
  .catch(function(err) {
    // If an error occurred, log it
    console.log(err);
  });
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});

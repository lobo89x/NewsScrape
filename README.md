# NewsScrape

For this app, I created a page that lets users view and leave comments on the latest news while using Mongoose DB to store the data and Cheerio to scrape news from another site.

How this works:
The basics of the page is built with a simple html that will build the display for the articles and podcasts at the top and bottom respectively. The html creates buttons that lead to the main work of the app itself. They call the Cheerio technology to scrape up the articles and podcasts and store their titles, descriptions and hyperlinks in a Mongo DB; one database for articles and one for podcasts. The server will then use express to read the database and pull the top ten most recent into a list and display those cards in in the displays, again one for articles and one for podcasts. By clicking the card, comment display is revealed and the user can comment on the data and that intern will be stored in the database. Anyone who clicks the card an subsequently view and edit that comment there after.

Please review and get you some news.

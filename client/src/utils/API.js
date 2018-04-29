import axios from "axios";

export default {
  // Gets all books
  getArticles: function(qry) {
    let query = `api-key=32adc87bd5c947cd96ced3c75b161322`
    query = query + `&q=${qry.term}`
    query = query + `&begin_date=${qry.startYear}`
    query = query +  `&end_date=${qry.endYear}`
    query = query +  `&sort=newest`
    query = query +  `&fl=headline,web_url,document_type,pub_date`
    query = query +  `&page=2`
    query = query +  `&facet_field=headline,document_type`
    query = query +  `&facet_filter=true`
    return axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?${query}`);
  },

  getSaved: function() {
    return axios.get("/api/articles/");
  },
  // Gets the book with the given id
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the book with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a book to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  }
};

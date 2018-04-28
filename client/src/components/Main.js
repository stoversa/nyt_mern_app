import React, { Component } from "react";

class Main extends Component {
  render() {
    return (
    <div className="container">

      <div className="row">
        <div className="jumbotron col-12" id="banner">
          <h1 className="text-center">
              <span >New York Times Search</span>
          </h1>
        </div>
      </div>

      <div className="row">
        <div className="card col-12">
          <div className="page-header">
            <h2>Search Parameters:</h2>
          </div>
            <form className="searchBox">

              <label for="search-terms">Search Term:</label><br />
              <div className="input-group search-form">
                <input className="form-control" type="term" id="searchTerm" placeholder="Search Term" />
              </div>

              <label for="start-year">Start Year: (optional)</label><br />
              <div className="input-group begin-year-form">
                <input  className="form-control" type="year" id="startYear" placeholder="Start Year" />
              </div>

              <label for="end-year">End Year: (optional)</label><br/>
              <div className="input-group end-year-form">
                <input className="form-control" type="year" id="endYear" placeholder="End Year" />
              </div>
                      <br />
                <button type="button" className="btn btn-primary" id="search"><span className="glyphicon glyphicon-search"></span> Search</button>
                <button type="button" className="btn btn-primary" id="clear"><span className="glyphicon glyphicon-trash"></span> Clear Results</button>
          </form>
        </div>
      </div>
      
      <div className="row">
        <div className="card col-12">
          <div className="page-header">
          <h2><span className="glyphicon glyphicon-menu-hamburger"></span>Top Articles</h2>
          </div>
          <div id="resultsHere"></div>
        </div>
      </div>

    </div>
    );
  }
}

export default Main;

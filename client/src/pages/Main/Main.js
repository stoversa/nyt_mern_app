import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/SaveBtn";
import Jumbotron from "../../components/Jumbotron";
import Modal from "../../components/Modal";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class Main extends Component {
  state = {
    searchedArticles: [],
    savedArticles: [],
    term: "",
    startYear: "",
    endYear: "",
    count: 0
  };

  componentDidMount() {
    this.loadArticles();
  }

  increment = () =>{
    let newCount = this.state.count + 1;
    this.setState({
      count: newCount
    })
  }

  loadArticles = () => {
    API.getSaved()
      .then(res =>
        this.setState({ savedArticles: res.data, term: "", startYear: "", endYear: "" })
      )
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  saveArticle = index => {
    let article = this.state.searchedArticles[index];
    console.log(article);
    API.saveArticle(article)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.term) {
      API.getArticles({
        term: this.state.term.trim(),
        startYear: typeof this.state.startYear === "number" ? this.state.startYear : '20010429',
        endYear: typeof this.state.endYear === "number" ? this.state.endYear : '20180429'
      })
        .then(res => {
          this.setState({ term: "", startYear: "", endYear: "" });
          if (res.data.response.docs.length > 1) {
            res.data.response.docs.forEach(article => {
              let newArticle = {
                title: article.headline.main,
                date: article.pub_date,
                url: article.web_url
              }
              this.setState({
                searchedArticles: [...this.state.searchedArticles, newArticle]
              }) //
            })
           }
          else {
            document.getElementById('errorModal').modal('toggle');
          }
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Article Search</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.term}
                onChange={this.handleInputChange}
                name="term"
                placeholder="Search Term (required)"
              />
              <Input
                value={this.state.startYear}
                onChange={this.handleInputChange}
                name="startYear"
                placeholder="Start Date (YYYYMMDD - optional)"
              />
              <Input
                value={this.state.endYear}
                onChange={this.handleInputChange}
                name="endYear"
                placeholder = "End Date (YYYYMMDD - optional)"
              />
              <FormBtn
                disabled={!(this.state.term)}
                onClick={this.handleFormSubmit}
              >
                Submit Search
              </FormBtn>
            </form>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Search Results</h1>
            </Jumbotron>
            {this.state.searchedArticles.length ? (
              <List>
                {this.state.searchedArticles.map((article, index) => (
                  <ListItem key={`${article.title}-${this.state.savedArticles.length}`}>
                    <a href={article.url} title={article.title} target="_blank">
                      <strong>
                        {article.title}
                      </strong>
                    </a>
                    <SaveBtn onClick={() => this.saveArticle(index)}/>
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Saved Articles</h1>
            </Jumbotron>
            {this.state.savedArticles.length ? (
              <List>
                {this.state.savedArticles.map(article => (
                  <ListItem key={article._id}>
                    <a href={article.url} title={article.title} target="_blank">
                      <strong>
                        {article.title}
                      </strong>
                    </a>
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Saved Articles to Display</h3>
              )}
          </Col>
        </Row>
        < Modal />
      </Container>
    );
  }
}

export default Main;

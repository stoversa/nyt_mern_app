import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/SaveBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class Main extends Component {
  state = {
    searchedArticles: [],
    savedArticles: [],
    term: "",
    startYear: "",
    endYear: ""
  };

  componentDidMount() {
    this.loadArticles();
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
        term: this.state.term,
        startYear: this.state.startYear || '20170429',
        endYear: this.state.endYear || '20180429'
      })
        .then(res => {
          this.setState({ term: "", startYear: "", endYear: "" });
            res.data.response.docs.forEach( article => {
            let newArticle = {
              title: article.headline.main,
              date: article.pub_date,
              url: article.web_url
            }
            this.setState({
              searchedArticles: [...this.state.searchedArticles, newArticle]
            })
          })
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
                placeholder="Start Date (optional)"
              />
              <Input
                value={this.state.endYear}
                onChange={this.handleInputChange}
                name="endYear"
                placeholder="End Date (optional)"
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
                  <ListItem key={article.title}>
                    <Link to={article.url}>
                      <strong>
                        {article.title}
                      </strong>
                    </Link>
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
                    <Link to={article.url}>
                      <strong>
                        {article.title}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Saved Articles to Display</h3>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Main;

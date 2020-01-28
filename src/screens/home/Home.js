import React, { Component } from 'react';
import Header from '../../common/header/Header';
import ImageCard from "./ImageCard";
import Container from "@material-ui/core/Container";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
      userProfileData: null,
      filterData: null,
      userMediaData: null,
      searchValue:'',
    }
  }
  componentWillMount() {
    if (this.state.loggedIn === false) {
      this.props.history.push('/');
    }


    fetch(this.props.baseUrl + '?access_token=' + sessionStorage.getItem('access-token'))
        .then(res => res.json())
        .then(
            (result) => {
console.log("result...",result);
                this.setState({userProfileData: result.data});

            },
            (error) => {
              console.log("result...",error);
            }
        )

    fetch(this.props.baseUrl + 'media/recent/?access_token=' + sessionStorage.getItem('access-token'))
        .then(res => res.json())
        .then(
            (result) => {

              this.setState({userMediaData: result.data, filterData: result.data});
            },
            (error) => {
              console.log("result recent error...",error);
            }
        )
  }
  render() {
    return (
      <div>
        <Header {...this.props} showSearchBarAndProfileIcon={true} searchChangeHandler={this.searchChangeHandler} />
        <Container maxWidth="xl">
         <ImageCard data={this.state.filterData} />
        </Container>
      </div>
    )
  }
  searchChangeHandler = event => {
    console.log("event.target.value..",event.target.value);
    this.setState({ searchValue: event.target.value });
    if (event.target.value) {
      const filterValue = this.state.filterData.filter(data => {
        if (data.caption.text.split('#')[0].indexOf(this.state.searchValue) > -1) {
          return data;
        }
      });
      console.log("filterValue..", filterValue);
      this.setState({filterData: filterValue});
    } else {
      this.setState({filterData: this.state.userMediaData});
    }
  }

}

export default Home;

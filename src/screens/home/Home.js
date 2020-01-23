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
      userMediaData: null,
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

            },
            (error) => {
              console.log("result...",error);
            }
        )

    fetch(this.props.baseUrl + 'media/recent/?access_token=' + sessionStorage.getItem('access-token'))
        .then(res => res.json())
        .then(
            (result) => {

              this.setState({userProfileData: result.data});
              console.log("result recent...",this.state.userProfileData);
            },
            (error) => {
              console.log("result recent error...",error);
            }
        )
  }
  render() {
    return (
      <div>
        <Header {...this.props} showSearchBarAndProfileIcon={true} />
        <Container maxWidth="xl">
         <ImageCard data={this.state.userProfileData}/>
        </Container>
      </div>
    )
  }
}

export default Home;

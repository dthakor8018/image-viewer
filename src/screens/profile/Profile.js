import React, { Component } from 'react';
import Header from '../../common/header/Header';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import EditIcon from '@material-ui/icons/Edit';
import './Profile.css';
import ImageGrid from "./ImageGrid";
import Fab from "@material-ui/core/Fab";
import EditUserNameModal from "./EditUserNameModal";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
      userProfileData: null,
      editUserModal: false,
      filterData: null,
      userMediaData: null,
      searchValue:'',
      viewUpdateFullName:'',
      fullname:''
    }
  }

   handleClose = () => {
    this.setState({editUserModal: false});
  };
  handleOpen = () => {
    this.setState({editUserModal: true});
  };
   updateClickHandler = (fullname) => {
     this.setState({viewUpdateFullName: fullname});
  }
  submitClickHandler = () => {
    this.setState({editUserModal: false, fullname: this.state.viewUpdateFullName});
  }
  componentWillMount() {
    if (this.state.loggedIn === false) {
      this.props.history.push('/');
    }


    fetch(this.props.baseUrl + '?access_token=' + sessionStorage.getItem('access-token'))
        .then(res => res.json())
        .then(
            (result) => {
              this.setState({userProfileData: result.data});

            },
            (error) => {
                console.log("error...", error);
            }
        )

    fetch(this.props.baseUrl + 'media/recent/?access_token=' + sessionStorage.getItem('access-token'))
        .then(res => res.json())
        .then(
            (result) => {
              this.setState({userMediaData: result.data});
            },
            (error) => {
                console.log("error...", error);
            }
        )
  }
  render() {
    return (
        <div>
            <Header {...this.props} showSearchBar={false}/>
          <Container maxWidth="xl">
            <div style={{height:'2rem'}}></div>
            <Grid container spacing={3} justify="left">
              <Grid item xs={3}/>
              <Grid item xs={2}>
                {this.state.userProfileData?<Avatar alt={this.state.userProfileData.full_name} id="profile-image"  fontSize="large" variant="circle" src={this.state.userProfileData.profile_picture} />: null}
              </Grid>
              <Grid item xs={5}>
                <Typography variant="h5" component="h2">
                  {this.state.userProfileData?this.state.userProfileData.username:null}
                </Typography>
                <Grid container spacing={3} justify="center">
                <Grid item xs={4}>
                  Posts: {this.state.userProfileData?this.state.userProfileData.counts.media: null}
                </Grid>
                <Grid item xs={4}>
                  Follows: {this.state.userProfileData?this.state.userProfileData.counts.follows: null}
                </Grid>
                <Grid item xs={4}>
                  Follows By: {this.state.userProfileData?this.state.userProfileData.counts.followed_by: null}
                </Grid>
              </Grid>
                <Typography variant="h5" component="h2">
                  {this.state.fullname? this.state.fullname: null}
                  {this.state.userProfileData&& !this.state.fullname?this.state.userProfileData.full_name: null}
                  <Fab color="secondary" id="edit-profile" aria-label="edit" onClick={this.handleOpen}>
                    <EditIcon />
                  </Fab>
                </Typography>

              </Grid>
              <Grid item xs={3}/>
            </Grid>
            <ImageGrid data={this.state.userMediaData} />
            <EditUserNameModal editUserModal={this.state.editUserModal} handleClose={this.handleClose} updateClickHandler={this.updateClickHandler} submitClickHandler={this.submitClickHandler}/>
          </Container>
        </div>
    )
  }

}

export default Profile;

import React, { Component } from 'react';
import './Header.css';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Avatar from "@material-ui/core/Avatar";

class Header extends Component {
    constructor() {
        super();
        this.state = {
            anchorEl: null,
            searchValue: '',
            userProfileData:null
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
                    this.setState({userProfileData: result.data});

                },
                (error) => {
                    console.log("error...",error);
                }
            )
    }
    menuOpenHandler = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    }
    menuCloseHandler = () => {
        this.setState({ anchorEl : null });
    }
    logoutHandler = () => {
        sessionStorage.removeItem("access-token");
        this.menuCloseHandler();
        this.props.history.push('/');
    }
    profileRedirect = () => {
        this.props.history.push('/profile');
    }
    homeRedirect = () => {
        this.props.history.push('/home');
    }
    render() {
        return (
            <div className="header">
                <div className="title" onClick={this.homeRedirect}>Image Viewer</div>

                <div className="header-right">
                    {this.props.showSearchBar === true ?
                        <div id="search-field">
                            <div className="searchIcon" >
                                <SearchIcon />
                            </div>
                            <Input className="searchInput" onChange={this.props.searchChangeHandler} disableUnderline={true} placeholder="Search..." />
                        </div> : ""}
                    <IconButton id="profile-icon" edge="start" color="inherit" aria-label="menu"
                                onClick={this.profileRedirect}>
                        {this.state.userProfileData ?
                            <Avatar alt={this.state.userProfileData.full_name} id="profile-icon" fontSize="small"
                                    ariant="circle" src={this.state.userProfileData.profile_picture}/> : null}
                    </IconButton>
                </div>

            </div>

        )
    }


}

export default Header;

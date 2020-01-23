import React, { Component } from 'react';
import './Header.css';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            anchorEl: null,
        }

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
    render() {
        return (
            <div className="header">
                <div className="title">Image Viewer</div>
                { this.props.showSearchBarAndProfileIcon === true ?
                <div className="header-right">
                    <div id="search-field">
                        <div className="searchIcon" >
                            <SearchIcon />
                        </div>
                        <Input className="searchInput" disableUnderline={true} placeholder="Search..." />
                    </div>
                    <IconButton id="profile-icon" edge="start" color="inherit" aria-label="menu"  >
                        <AccountCircleIcon onClick={this.menuOpenHandler} />
                        <Menu
                            id="simple-menu"
                            anchorEl={this.state.anchorEl}
                            keepMounted
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.menuCloseHandler}
                        >
                            <MenuItem onClick={this.menuCloseHandler}>My account</MenuItem>
                            <MenuItem onClick={this.logoutHandler}>Logout</MenuItem>
                        </Menu>
                    </IconButton>
                </div> : ""
                }
            </div>

        )
    }
}

export default Header;
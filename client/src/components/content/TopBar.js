import React, { Component, useState, Fragment } from "react";
import {
  Navbar,
  Button,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand
} from "reactstrap";
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import RegisterModal from '../auth/RegisterModal';
import LoginModal from '../auth/LoginModal';
import Logout from '../auth/Logout';

class Topbar extends Component {
    state = {
        isOpen: false,
        sideBarOpen: false
    }

    propTypes = {
        auth: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };
    
    toggleSideBar = () => {
        this.setState ({
            sideBarOpen: !this.state.sideBarOpen
        })
    } 

    render(){
        const {isAuthenticated, user} = this.props.auth;
            const authLinks = (
                <Fragment>
                    <NavItem>
                        <span className="navbar-text mr-3">
                            <strong>{user ? `Welcome ${user.name}` : ''}</strong>
                        </span>
                    </NavItem>
                    <NavItem>                        
                        <Logout/>
                    </NavItem>
                </Fragment>
            );

            const guestLinks = (
                <Fragment>
                <NavItem>
                    <RegisterModal/>                                   
                    </NavItem>
                    <NavItem>
                        <LoginModal/>
                    </NavItem>
                </Fragment>
            );
        return (       
            <Fragment>
                <Navbar
                    color="dark"
                    dark
                    className="navbar shadow-sm p-3 mb-5 bg-black rounded"
                    expand="md"
                    >
                    <NavbarBrand className="center" href="/">Workout Tracker</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                            {isAuthenticated ? authLinks : guestLinks}                    
                            </Nav>
                    </Collapse>
                </Navbar>              
            </Fragment>         
            
  )}}

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect (mapStateToProps, null)(Topbar);
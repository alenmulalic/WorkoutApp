import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faPaperPlane,
  faQuestion,
  faImage,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import {connect} from 'react-redux';


import SubMenu from './SubMenu';

class SideBar extends Component {
  submenus = [
    [
      {
        title: "Home 1",
        target: "Home-1",
      },
      {
        title: "Home 2",
        target: "Home-2",
      },
      {
        itle: "Home 3",
        target: "Home-3",
      },
    ],
    [
      {
        title: "Page 1",
        target: "Page-1",
      },
      {
        title: "Page 2",
        target: "Page-2",
      },
    ],
  ]

  render () {
    return (
      <div className={classNames("sidebar", { "is-open": true})}>
      <div className="sidebar-header">
        <span color="info" style={{ color: "#fff" }}>
          &times;
        </span>
        <h3>Bootstrap Sidebar</h3>
      </div>
      <div className="side-menu">
        <Nav vertical className="list-unstyled pb-3">
          <p>Dummy Heading</p>
          <SubMenu title="Home" icon={faHome} items={this.submenus[0]} />
          <NavItem>
            <NavLink tag={Link} to={"/about"}>
              <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
              About
            </NavLink>
          </NavItem>
          <SubMenu title="Pages" icon={faCopy} items={this.submenus[1]} />
          <NavItem>
            <NavLink tag={Link} to={"/pages"}>
              <FontAwesomeIcon icon={faImage} className="mr-2" />
              Portfolio
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={"/faq"}>
              <FontAwesomeIcon icon={faQuestion} className="mr-2" />
              FAQ
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={"/contact"}>
              <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
              Contact
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    </div>


    )
   
  }
}

  

export default connect (null)(SideBar);
import React from "react";
import { Fa, Navbar, NavbarBrand, NavbarNav, NavItem, NavLink, NavbarToggler, Collapse, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';
import auth from './../auth/auth-helper'
import {withRouter} from 'react-router-dom'

const styles = {
  logo: {
    display: 'inline-block',
    maxWidth: 150
  }
}

class Nav extends React.Component {

  state = {
      collapse: false,
      isWideEnough: false,
  };

  onClick = () => {
      this.setState({
          collapse: !this.state.collapse,
      });
  }


  isActive = (history, path) => {
    if (0 === 0)
      return {fontWeight: '600'}
    else
      return {fontWeight: '300'}
  }
  

  render(history) {
    console.log(this.props)
    return (
      <Navbar color="amber darken-2" dark expand="md" fixed="top" scrolling>
        <NavbarBrand href="/" >
          {/* <span>
          <h3 style={styles.logo}><strong>School</strong></h3><img style={styles.logo} src="" alt="logo"/>
          </span> */}
            <img style={styles.logo} src="/assets/images/schoolLogo.png" alt="logo"/>
          </NavbarBrand>
          { !this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
                        <Collapse isOpen = { this.state.collapse } navbar>
          {
            !auth.isAuthenticated() && (
            <NavbarNav right>
              <NavItem>
                <NavLink to="/register" style={this.isActive(history, "/register")}>Register</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/login" style={this.isActive(history, "/login")}>Log In</NavLink>
              </NavItem>
            </NavbarNav>)
          }
          {
            auth.isAuthenticated() && (
            <NavbarNav right>
            <NavItem>
              <NavLink to={"/"}>Hi, {auth.isAuthenticated().user.name}!</NavLink>
            </NavItem>
            <NavItem>
                <NavLink style={this.isActive(history, "/")} to={"/"}><Fa icon="dashboard"/>Dashboard</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={"/students"}>Connect</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={"/user/" + auth.isAuthenticated().user._id} style={this.isActive(history, "/user/" + auth.isAuthenticated().user._id)}>Profile</NavLink>
              </NavItem>
              <NavItem>
                <Dropdown>
                    <DropdownToggle nav caret></DropdownToggle>
                      <DropdownMenu>
                          <DropdownItem href="/courses">My Courses</DropdownItem>
                          <DropdownItem onClick={() => {auth.signout(() => history.push('/'))}}>Sign Out</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                </NavItem>
            </NavbarNav>)
          }
        </Collapse>
      </Navbar>
      );
    }
  }


export default Nav;


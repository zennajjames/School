import React, { Component } from "react";
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';

class Nav extends Component {

  state = {
    collapse: false,
    isWideEnough: false,
  };

  onClick = () => {
    this.setState({
        collapse: !this.state.collapse,
    });
  };

  renderTabs = () => {
    console.log("User logged in: "+this.props.loggedIn)
    if (this.props.loggedIn) {
      return (
          <NavbarNav right>
            <NavItem>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </NavItem>
            <NavItem>
            <Dropdown>
                <DropdownToggle nav caret>Courses</DropdownToggle>
                  <DropdownMenu>
                      <DropdownItem href="#">Action</DropdownItem>
                      <DropdownItem href="#">Another Action</DropdownItem>
                      <DropdownItem href="#">Something else here</DropdownItem>
                      <DropdownItem href="#">Something else here</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
            </NavItem>
            <NavItem>
              <NavLink to="/logout" onClick={this.props.logout} >Logout</NavLink>
            </NavItem>
          </NavbarNav>
      )
    } else {
      return (
          <NavbarNav right>
            <NavItem>
              <NavLink to="/signup">Sign Up</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/login">Login</NavLink>
            </NavItem>  
            <NavItem>
              <NavLink to="/features">About</NavLink>
            </NavItem>
          </NavbarNav> 
      )}
  }

  render() {
    const collapsed = this.state.collapsed;
    const overlay = <div id="sidenav-overlay" style={{backgroundColor: 'transparent'}}/>
    return (
      <div>
        <Navbar color="blue" dark expand="md" fixed="top" scrolling>
          <NavbarBrand href="/">
            <strong>School</strong>
          </NavbarBrand>
          {!this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
          <Collapse isOpen = {this.state.collapse} navbar>
            {this.renderTabs()}
          </Collapse>
        </Navbar>
        {collapsed && overlay}
      </div>
    )}
}

export default Nav;

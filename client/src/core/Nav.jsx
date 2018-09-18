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

  const isActive = (history, path) => {
  if (history.location.pathname === path)
    return {fontWeight: '600'}
    else
      return {fontWeight: '300'}
  }
  const Nav = withRouter(({history}) => (

      <Navbar color="amber darken-2" dark expand="md" fixed="top" scrolling>
        <NavbarBrand href="/" >
            <img style={styles.logo} src="/assets/images/schoolLogo.png" alt="logo"/>
          </NavbarBrand>
          {/* { !this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
                        <Collapse isOpen = { this.state.collapse } navbar> */}
          {
            !auth.isAuthenticated() && (
            <NavbarNav right>
              <NavItem>
                <NavLink to="/register" style={isActive(history, "/register")}>Register</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/login" style={isActive(history, "/login")}>Log In</NavLink>
              </NavItem>
            </NavbarNav>)
          }
          {
            auth.isAuthenticated() && (
            <NavbarNav right>
            <NavItem>
              <NavLink to={"/"}>Hi, {auth.isAuthenticated().user.name}!  </NavLink>
            </NavItem>
            <NavItem>
                <NavLink style={isActive(history, "/")} to={"/"}><Fa icon="dashboard"/>{auth.isAuthenticated().user.role.toUpperCase()} Dashboard</NavLink>
              </NavItem>
              <NavItem>
                <Dropdown>
                    <DropdownToggle nav caret></DropdownToggle>
                      <DropdownMenu>
                          <DropdownItem>
                            <NavLink to={"/students"}>Connect</NavLink>
                          </DropdownItem>
                          <DropdownItem>
                            <NavLink to={"/users/" + auth.isAuthenticated().user._id} style={isActive(history, "/users/" + auth.isAuthenticated().user._id)}>Profile</NavLink>
                          </DropdownItem>
                          <DropdownItem>
                            <NavLink to={"/courses"}>My Courses</NavLink>
                          </DropdownItem>
                          <DropdownItem onClick={() => {auth.signout(() => history.push('/'))}}>Sign Out</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                </NavItem>
            </NavbarNav>)
          }
        {/* </Collapse> */}
      </Navbar>
  ))


export default Nav;


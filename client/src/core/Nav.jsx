import React from "react";
import { Fa, Navbar, NavbarBrand, NavbarNav, NavItem, NavLink, NavbarToggler, Collapse, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';
import auth from './../auth/auth-helper'
import history from '../history';
import {Link} from 'react-router-dom'


  const styles = {
    logo: {
      display: 'inline-block',
      maxWidth: 150,
      role: ''
    }
  }

  class Nav extends React.Component {

    state = {
        collapse: false,
        isWideEnough: false
    };

    componentDidMount = () => {
      console.log(this.props)
      let roleParam =  auth.isAuthenticated().user.role;
      let roleCap = roleParam.charAt(0).toUpperCase() + roleParam.slice(1)
      this.setState({role: roleCap})
    }
  
    collapse = () => {
        this.setState({
            collapse: !this.state.collapse,
        });
    }
  
    isActive = (history, path) => {
    if (history.location.pathname === path)
      return {fontWeight: '600'}
      else
        return {fontWeight: '300'}
    }

    signout = () => {
      auth.signout(() => this.context.history.push('/'))
    }
    
    render() {
       return (

      <Navbar color="amber darken-2" dark expand="md" fixed="top" scrolling>
        <NavbarBrand href="/" >
            <img style={styles.logo} src="/assets/images/schoolLogo.png" alt="logo"/>
          </NavbarBrand>
          { !this.state.isWideEnough && <NavbarToggler onClick = { this.collapse } />}
                        <Collapse isOpen = { this.state.collapse } navbar>
          {
            !auth.isAuthenticated() && (
            <NavbarNav right>
              <NavItem>
                <NavLink to="/login" style={this.isActive(history, "/login")}>Log In</NavLink>
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
                <NavLink style={this.isActive(history, "/")} to={"/"}><Fa icon="dashboard"/>{this.state.role} Dashboard</NavLink>
              </NavItem>
              <NavItem>
                <Dropdown>
                    <DropdownToggle nav caret></DropdownToggle>
                      <DropdownMenu>
                          <DropdownItem>
                            <NavLink to={"/students"}>Connect</NavLink>
                          </DropdownItem>
                          <DropdownItem>
                            <NavLink to={"/users/" + auth.isAuthenticated().user._id}>Profile</NavLink>
                          </DropdownItem>
                          <DropdownItem>
                            <NavLink to={"/courses"}>My Courses</NavLink>
                          </DropdownItem>
                          <DropdownItem color="danger">
                             <Link to="/" onClick={this.signout}>Sign out</Link>
                          </DropdownItem>
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


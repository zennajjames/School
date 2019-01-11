import React from "react";
import { Fa, Navbar, NavbarBrand, NavbarNav, NavItem, NavLink, NavbarToggler, Collapse, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';
import auth from './../auth/auth-helper'
import history from '../history';
import {Link} from 'react-router-dom'

  const styles = {
    logo: {
      display: 'inline-block',
      maxWidth: 80,
      marginLeft: 3
    }
  }
  class Nav extends React.Component {

    state = {
        collapse: false,
        isWideEnough: false
    };
  
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
      console.log(this.props)
       return (

      <Navbar transparent dark expand="md" scrolling>
        <NavbarBrand style={{marginLeft: 40}} href="/" >
            <img style={styles.logo} src="/assets/images/schoolFish.png" alt="logo"/>
          </NavbarBrand>
          { !this.state.isWideEnough && <NavbarToggler onClick = { this.collapse } />}
                        <Collapse isOpen = { this.state.collapse } navbar>
          {
            !auth.isAuthenticated() && (
            <NavbarNav right>
              <NavItem style={{marginRight: 20}}>
                <NavLink to="/login" style={this.isActive(history, "/login")}>Log In</NavLink>
              </NavItem>
              <NavItem>
                    <NavLink to="/login" className="fb-ic m-0"><i className="fa fa-facebook fa-md white-text"> </i></NavLink>
              </NavItem>
              <NavItem>
                    <NavLink to="/login" className="tw-ic"><i className="fa fa-twitter fa-md white-text"> </i></NavLink>
              </NavItem>
              <NavItem style={{marginRight: 40}}>
                    <NavLink to="/login" className="tw-ic"><i className="fa fa-instagram fa-md white-text"> </i></NavLink>
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
              <NavLink style={this.isActive(history, "/students")} to={"/students"}>Connect</NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={this.isActive(history, "/")} to={"/"}><Fa icon="dashboard"/>{auth.isAuthenticated().user.role} Dashboard</NavLink>
            </NavItem>
              <NavItem style={{marginRight: 40}}>
                <Dropdown>
                    <DropdownToggle nav caret></DropdownToggle>
                      <DropdownMenu>
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


import React from "react";
import { Fa, Navbar, NavbarBrand, NavbarNav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';
import auth from './../auth/auth-helper'
import {withRouter} from 'react-router-dom'

const isActive = (history, path) => {
  if (history.location.pathname === path)
    return {fontWeight: '600'}
  else
    return {fontWeight: '300'}
}

const styles = {
  logo: {
    display: 'inline-block',
    maxWidth: 150
  }
}

const Nav = withRouter(({history}) => (
  <Navbar color="amber darken-2" dark expand="md" fixed="top" scrolling>
    <NavbarBrand href="/" style={isActive(history, "/")}>
      {/* <span>
      <h3 style={styles.logo}><strong>School</strong></h3><img style={styles.logo} src="" alt="logo"/>
      </span> */}
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
          <NavLink to={"/"}>Hi, {auth.isAuthenticated().user.name}!</NavLink>
        </NavItem>
         <NavItem>
            <NavLink style={isActive(history, "/")} to={"/"}><Fa icon="dashboard"/>Dashboard</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to={"/students"}>Connect</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to={"/user/" + auth.isAuthenticated().user._id} style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>Profile</NavLink>
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
    {/* </Collapse> */}
  </Navbar>
))



export default Nav;

// class Nav extends Component {

//   state = {
//     collapse: false,
//     isWideEnough: false,
//   };

//   onClick = () => {
//     this.setState({
//         collapse: !this.state.collapse,
//     });
//   };

//   render() {
//     console.log(this.props)
//     const collapsed = this.state.collapsed;
//     const overlay = <div id="sidenav-overlay" style={{backgroundColor: 'transparent'}}/>
//     return (
//       <div>
//         <Navbar color="blue" dark expand="md" fixed="top" scrolling>
//           <NavbarBrand href="/">
//             <strong>School</strong>
//           </NavbarBrand>
//           {!this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
//           <Collapse isOpen = {this.state.collapse} navbar>
//           {
//         !auth.isAuthenticated() && (
//           <NavbarNav right>
//             <NavItem>
//               <NavLink to="/dashboard">Dashboard</NavLink>
//             </NavItem>
//             <NavItem>
//             <Dropdown>
//                 <DropdownToggle nav caret>More</DropdownToggle>
//                   <DropdownMenu>
//                       <DropdownItem href="/feed">Newsfeed</DropdownItem>
//                       <DropdownItem href="/galleries">Galleries</DropdownItem>
//                       <DropdownItem href="/mywork">My Work</DropdownItem>
//                       <DropdownItem onClick={ () => {
//                         auth.signout()} }>Sign Out</DropdownItem>
//                   </DropdownMenu>
//                 </Dropdown>
//             </NavItem>
//           </NavbarNav>)
//         }
//         {
//           auth.isAuthenticated() && (
//           <NavbarNav right>
//             <NavItem>
//               <NavLink to="/signup">Sign Up</NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink to="/login">Login</NavLink>
//             </NavItem>  
//             <NavItem>
//             <Dropdown>
//                 <DropdownToggle nav caret>More</DropdownToggle>
//                   <DropdownMenu>
//                       <DropdownItem href="/feed">Newsfeed</DropdownItem>
//                       <DropdownItem href="/galleries">Galleries</DropdownItem>
//                       <DropdownItem href="/mywork">My Work</DropdownItem>
//                       <DropdownItem onClick={() => {auth.signout(() => history.push('/'))}}>Sign Out</DropdownItem>
//                   </DropdownMenu>
//                 </Dropdown>
//             </NavItem>
//           </NavbarNav>)
//         } 
//           </Collapse>
//         </Navbar>
//         {collapsed && overlay}
//       </div>
//     )}
// }


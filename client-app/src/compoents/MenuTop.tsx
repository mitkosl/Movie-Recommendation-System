import * as React from 'react';
import logo from './../assets/images/logo.svg';
import moviedbLogo from './../assets/images/themoviedb-green.svg';
import { NavbarBrand, NavbarToggler, Collapse, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavItem, Nav, Navbar } from 'reactstrap';
import { loginHelpers } from 'src/api/login/loginHelper';

interface State {
  isOpen: boolean;
}
export class MenuTop extends React.Component<{}, State> {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  public render() {
    return (
      <div>
        <Navbar expand="md" className="App-header">
          <NavbarBrand href="/">
            <img src={logo} className="App-logo" alt="Movie rocommendation system logo" />
            <img src={moviedbLogo} className="moviedb-logo" alt="logo" />
          </NavbarBrand>
          <h1 className="App-title">Welcome to Movie Recommendation System</h1>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem><NavLink href="/movies">Movies</NavLink></NavItem>
              <NavItem><NavLink href="/about">About</NavLink></NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <i className="fa fa-cog"></i>
                </DropdownToggle>
                <DropdownMenu right>
                <DropdownItem>
                        <NavItem><NavLink href="/profile">Profile</NavLink></NavItem>
                      </DropdownItem>
                  <DropdownItem divider />
                  {
                    loginHelpers.loggedIn() ?
                      <DropdownItem>
                        <NavItem><NavLink href="/logout">Logout</NavLink></NavItem>
                      </DropdownItem> :
                      <DropdownItem>
                        <NavItem><NavLink href="/login">Login</NavLink></NavItem>
                      </DropdownItem>
                  }
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
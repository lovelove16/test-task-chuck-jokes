import React, { Component } from 'react';
import '../../css/Nav.css'

import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
  } from '../Navbar/NavbarComponents';

class Navbar extends Component {
    render() {
        return (
            <Nav>
                <Bars />
        
                <NavMenu>
                    <NavLink to='/about' activeStyle>
                        About
                    </NavLink>
                    <NavLink to='/events' activeStyle>
                        Events
                    </NavLink>
                    <NavLink to='/annual' activeStyle>
                        Annual Report
                    </NavLink>
                    <NavLink to='/team' activeStyle>
                        Teams
                    </NavLink>
                    <NavLink to='/blogs' activeStyle>
                        Blogs
                    </NavLink>
                </NavMenu>
                <NavBtn>
                    {/* <NavBtnLink to='/signin'>Sign In</NavBtnLink> */}
                </NavBtn>
            </Nav>
        );
    }
}

export default Navbar;

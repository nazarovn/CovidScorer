import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';


const Header = (params) => {

  const { state } = params;
  const company_name = state === undefined ? "" : state.company_name;

  return (
    <div>
      <Container fluid={true}>
        <Navbar color="dark" dark expand="md" >
          <NavbarBrand href="/" > COVIDscorer {company_name.length > 0 ? "- " : ""}{company_name} </NavbarBrand>

          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/">
                Карта
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/contacts">
                Контакты
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </Container>
    </div>
  );
};


export default Header;

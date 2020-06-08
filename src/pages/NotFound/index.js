import React from 'react';
import Header from "../../components/Header";
import {Container} from "reactstrap";


const NotFoundPage = () => {
  return (
    <div>
      <Header />
      <Container fluid={true}>
        <h4> Page Not Found </h4>
      </Container>
    </div>
  );
};

export default NotFoundPage;

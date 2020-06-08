import React, { useState } from 'react';
import Header from "../../components/Header";
import {Container, Col, Row, Spinner} from "reactstrap";
import { useFormik } from 'formik';


const Contacts = () => {
  const [isFetching, set_isFetching] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      companyName: '',
      countAddresses: '',
      contacts: ''
    },
    onSubmit: values => {

      const requestOptions = {
        method: 'POST',
        body: JSON.stringify(values)
      };

      // set_isFetching(true);
      // const url = `${process.env.REACT_APP_URL_BACKEND}email`;
      // fetch(url, requestOptions)
      //   .then(response => response.json())
      //   .then(data => {
      //     set_isFetching(false);
          alert('форма отправлена')
      //   }).catch(err => {
      //     set_isFetching(false);
      //   })
    }
  });

  const size_a = 10;
  const size_b = 10;

  const formHtml = (
    <form onSubmit={formik.handleSubmit}  style={{marginTop: "1em"}}>
      <Col>
        <Row xs={size_a}>
          <text>Имя</text>
        </Row>
        <Row xs={size_b} style={{width: "100%"}}>
          <input
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.firstName}
            style={{width: "100%"}}
          />
        </Row>
        <Row xs={size_a}>
          <text>Название компании</text>
        </Row>
        <Row xs={size_b} style={{width: "100%"}}>
          <input
            id="companyName"
            name="companyName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.companyName}
            style={{width: "100%"}}
          />
        </Row>
        <Row xs={size_a}>
          <text>Количество адресов</text>
        </Row>
        <Row xs={size_b} style={{width: "100%"}}>
          <input
            id="countAddresses"
            name="countAddresses"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.countAddresses}
            style={{width: "100%"}}
          />
        </Row>
        <Row xs={size_a}>
          <text>Как с Вами связаться</text>
        </Row>
        <Row xs={size_b} style={{width: "100%"}}>
          <input
            id="contacts"
            name="contacts"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.contacts}
            style={{width: "100%"}}
          />
        </Row>
        <Row style={{marginTop: '1em'}}>
          <button type="submit">Отправить</button>
          {
            isFetching
            ? <Spinner color={"secondary"}/>
            : ""
          }
        </Row>
      </Col>
    </form>
  );


  return (
    <div>
      <Header />
      <Container fluid={false}>
        <Row>
          <Col style={{marginTop: "1em"}}>
            <h2> Контакты </h2> <br/>
            Напишите нам: <b>coronavirus.photo@gmail.com</b>  <br/>
             <br/><br/>
            Или заполните форму обратной связи, и мы обязательно свяжемся с вами
          </Col>
        </Row>

        {formHtml}
      </Container>
    </div>
  );
};

export default Contacts;

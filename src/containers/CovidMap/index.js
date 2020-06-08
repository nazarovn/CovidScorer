import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from "reactstrap";
import { useLocation } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import Header from "../../components/Header";
import FieldsAddressScore from "../../components/FieldsAddressScore";
import MapWithCircle from "../../components/MapWithCircle";
import config from "../../config";
import compony_object_score from "../../data/compony_object_score";


const CovidMap = ({isCompany}) => {
  const [state, set_state] = useState(config.defaults.state);
  const [isFetching, set_isFetching] = useState(false)

  const company_key = new URLSearchParams(useLocation().search).get('key');

  useEffect(() => {
    if (isCompany) {
      set_isFetching(true);
      const url = `${process.env.REACT_APP_URL_BACKEND}/company/${company_key}`
      fetch(url).then(response =>
        response.json()
      ).then(data => {
        const { values, company_name } = data;
        set_isFetching(false);
        set_state({...state, values: values, company_name: company_name})
      }).catch(err =>
        set_isFetching(false)
      );
    } else {
      const { values } = compony_object_score["random"];
      set_state({...state, values: values})
    }
  }, [isCompany]);

  const { values } = state;


  return (
    <div style={{height: "100vh"}}>
      <Header state={state}/>
      <Container fluid={true} style={{height: "100%"}}>
        <Row>
          <Col sm={{ size: 8, offset: 2 }} style={{marginBottom: "1em", marginTop: "1em"}}>
            <p> С помощью искусственного интеллекта оцениваем риски заражения в различных точках Москвы. </p>
          </Col>
        </Row>
        <Row style={{height: "100%"}}>
          <Col sm={8} style={{marginBottom: "1em"}}>
            <MapWithCircle state={state} isCompany={isCompany} />
          </Col>
          {
            isFetching
            ? <Spinner color="secondary" />
            : (
              values.length === 0
              ? "Нет данных"
              : (
                <Col sm={4}>
                  <FieldsAddressScore state={state} set_state={set_state} isCompany={isCompany} />
                </Col>
              )
            )
          }

        </Row>
      </Container>
    </div>
  );
};

export default CovidMap;
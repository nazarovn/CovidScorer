import React, { useState }  from "react";
import { Button, Form, FormGroup, Input, Tooltip, CustomInput, Col, Row, Label } from 'reactstrap';
import ScrollArea from 'react-scrollbar';
import config from "../../config";
import scoreToColor from "../../functions/scoreToColor";


const FieldsAddressScore = ({state, set_state}) => {
  const { top_n, values } = state;
  const { list_top_n, range_circle_size } = config;

  function compare(a, b) {
    if (a.score > b.score) return -1;
    if (b.score > a.score) return 1;
    return 0;
  }
  const values_sorted = values.sort(compare);
  const values_sorted_slice = (
    top_n === 0
    ? values_sorted
    : values_sorted.slice(0, top_n)
  );


  function setMapParams (lat, lon) {
    set_state({
      ...state,
      center: [lat + Math.random()/100000, lon + Math.random()/100000],
      zoom: 14
    })
  }

  let list_address_scores = [];
  let i = 0;
  for ( const { address, score, lat, lon } of values_sorted_slice) {
    // const color = scoreToColor(score).name;
    const color_hex = scoreToColor(score).hex;
    i += 1;
    list_address_scores.push(
      <Row style={{marginTop: 4, width: "100%"}}>
        <Col xs={11} style={{width: "100%"}}>
          <Button
            size="sm"
            block
            style={{"text-align":"left"}}
            onClick={() => setMapParams(lat, lon) }
          >
            {i}. {address}
          </Button>
        </Col>
        <Col xs={1} style={{"padding-left": 0}}>
          <Button
            // color={color}
            size="sm"
            style={{
              "text-align":"center",
              width: "3em",
              height: "100%",
              backgroundColor: color_hex,
              borderColor: color_hex
            }}
            onClick={() => setMapParams(lat, lon) }
          >
            {score.toFixed(1)}
          </Button>
        </Col>
      </Row>
    )
  }

  const [tooltipAddressOpen, setTooltipAddressOpen] = useState(false);
  const toggleAddress = () => setTooltipAddressOpen(!tooltipAddressOpen);
  const [tooltipScoreOpen, setTooltipScoreOpen] = useState(false);
  const toggleScore = () => setTooltipScoreOpen(!tooltipScoreOpen);

  const addColumnNamesHtmlEl = (
    <Row style={{width: "100%"}}>
      <Col xs={11}>
        Объект, <span style={{textDecoration: "underline", color:"blue"}} href="#" id="TooltipAddress">адрес</span>
        <Tooltip placement="top-start" isOpen={tooltipAddressOpen} target="TooltipAddress" toggle={toggleAddress}>
          Чтобы найти нужный адрес на карте, нажмите на кнопку с этим адресом.
        </Tooltip>
      </Col>
      <Col xs={1} style={{"text-align":"center", "padding-left": 0}}>
        <span style={{textDecoration: "underline", color:"blue"}} href="#" id="TooltipScore">Score</span>
        <Tooltip placement="top-start" isOpen={tooltipScoreOpen} target="TooltipScore" toggle={toggleScore}>
          Риск заражения
        </Tooltip>
      </Col>
    </Row>
  );

  const handleChangeTopN = (event) => {
    const { value } = event.target;
    const top_n = (value === "all") ? 0 : value;
    set_state({...state, top_n: top_n});
  };

  const handleChangeCircleSize = (event) => {
    const [min_value, max_value] = range_circle_size;
    const circle_size = event.target.value / 100 * (max_value - min_value) + min_value;
    set_state({...state, circle_size: circle_size});
  };


  return (
    <div>
      <Row form>
        <Col xs={6}>
          <Form style={{width: "100%"}} >
            <FormGroup>
              <Label>Показать Топ N</Label>
              <Input type="select" name="top_n" id="selectTopN" onChange={handleChangeTopN}>
                {list_top_n.map(x => <option>{x===0 ? "all" : x}</option> )}
              </Input>
            </FormGroup>
          </Form>
        </Col>
        <Col>
          <Form style={{width: "100%"}} >
            <FormGroup>
              <Label>Размер кругов</Label>
              <CustomInput type="range" name="circle_size" onChange={handleChangeCircleSize} />
            </FormGroup>
          </Form>
        </Col>
      </Row>
        {addColumnNamesHtmlEl}
        <ScrollArea
          style={{height: "67vh"}}
          speed={0.8}
          className="area"
          contentClassName="content"
          horizontal={false}
        >
          {list_address_scores}
        </ScrollArea>
    </div>
  )
};

export default FieldsAddressScore;
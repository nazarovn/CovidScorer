import React from "react";
import { Map, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import scoreToColor from "../../functions/scoreToColor";
import Legend from "../Legend";
import "leaflet/dist/leaflet.css";



const MapWithCircle = ({state}) => {

  const { circle_size, top_n, values } = state;

  const values_slice = (
    (top_n === 0)
    ? values
    : values.slice(0, top_n)
  );

  return (
    <Map
      style={{ height: "80vh", width: "100%" }}
      zoom={state.zoom}
      center={state.center}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
      {values_slice.map(({lat, lon, score, address}) => {
        return (
          <CircleMarker
            center={[lat, lon]}
            radius={circle_size}
            fillOpacity={0.3}
            stroke={true}
            color={scoreToColor(score).hex}
            title={address}
            sticky={true}
            onMouseOver={(e) => e.target.openPopup()}
            onMouseOut={(e) => e.target.closePopup()}
          >
            <Popup closeButton={false}>
              score <b>{score.toFixed(1)}</b>
              <br />{address}
            </Popup>
          </CircleMarker>
          )
      })
      }
      <Legend style={{
        "text-align": "left",
        "line-height": "18px",
        "color": "#555"
      }} />
    </Map>
  )
};

export default MapWithCircle;

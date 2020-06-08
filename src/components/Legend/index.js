import { MapControl, withLeaflet } from "react-leaflet";
import L from "leaflet";
import './index.css';
import scoreToColor from "../../functions/scoreToColor";


class Legend extends MapControl {
  createLeafletElement(props) {}

  componentDidMount() {

    const legend = L.control({ position: "topright" });

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");

      const labels = [
        '<i style="background:' + scoreToColor(9).hex + '"></i> 8-10',
        '<i style="background:' + scoreToColor(6).hex + '"></i> 5-8',
        '<i style="background:' + scoreToColor(4).hex + '"></i> 2-5',
        '<i style="background:' + scoreToColor(1).hex + '"></i> 0-2',
      ];

      div.innerHTML = labels.join("<br>");
      return div;
    };

    const { map } = this.props.leaflet;
    legend.addTo(map);
  }
}

export default withLeaflet(Legend);


const config = {
  defaults: {
    state: {
      center: [55.7538337, 37.6211812],
      zoom: 10,
      values: [],
      circle_size: 10,
      top_n: 0,
      company_name: ""
    }
  },
  list_top_n: [
    0, 10, 20, 30, 40, 50,
    100, 200, 300, 400, 500,
    1000
  ],
  range_circle_size: [0, 20],
  danger_thresholds: [6.5, 3]
};

export default config;
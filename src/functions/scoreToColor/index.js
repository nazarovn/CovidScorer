const scoreToColor = (score) => {
  if (score >= 8) {
    return {hex: "#da3545", name: 'danger'}
  } else if (score >= 5) {
    return {hex: "#F55D00", name: 'warning'}
  } else if (score >= 2) {
    return {hex: "#F5B200", name: 'primary'}
  }
  return {hex: "#7FCF00", name: 'success'}
};


export default scoreToColor;
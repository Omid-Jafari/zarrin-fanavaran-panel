const priceComma = (price, type) => {
  //type = 1 price,
  //type = 2 odometer
  if (price !== null && typeof price !== "undefined") {
    if (type === 1 || typeof type === "undefined") {
      return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00`;
    } else if (type === 2) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else if (type === 3) {
      return price
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return 0;
    }
  }
  return 0;
};
export default priceComma;

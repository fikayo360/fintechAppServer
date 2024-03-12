function hasTwoDecimalPlaces(amount:string) {
  
    // Regular expression to match a decimal with exactly two decimal places
    const decimalRegex = /^\d+(\.\d{2})?$/;
  
    // Check if the amount matches the regex
    if (decimalRegex.test(amount)) {
      return true;
    } else {
      return "error inValid amount";
    }
  }
  

  export default hasTwoDecimalPlaces
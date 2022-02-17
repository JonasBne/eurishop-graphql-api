// TODO: fix this typing later based on generated graphQL types
export function calculateTotalCostPerCartItem(cartItem: any) {
  return parseInt((cartItem.quantity * cartItem.product.price).toFixed(2), 10);
}

export function calculateTotalCartCost(cartItems: any[]) {
  const totalPerProductArray = cartItems.map((item) => calculateTotalCostPerCartItem(item));
  return totalPerProductArray.reduce((previousValue, currentValue) => previousValue + currentValue, 0).toFixed(2);
}

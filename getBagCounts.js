function getBagCounts(clientOrders, availableBagSizes) {
  try {
    // The provided orders should be in an Array
    if (!Array.isArray(clientOrders)) {
      throw new Error("The client orders should be an array");
    }

    // The provided orders should all be integers
    if (
      clientOrders &&
      clientOrders.filter(order => typeof order !== "number").length > 0
    ) {
      throw new Error("The client orders provided must all be integers");
    }

    // The provided sizes should be in an Array
    if (!Array.isArray(availableBagSizes)) {
      throw new Error("The bag sizes should be an array");
    }

    // The provided orders should all be integers
    if (
      availableBagSizes &&
      availableBagSizes.filter(size => typeof size !== "number").length > 0
    ) {
      throw new Error("The bag sizes provided must all be integers");
    }

    // The provided arrays should not be empty
    if (
      (availableBagSizes && !availableBagSizes.length) ||
      (clientOrders && !clientOrders.length)
    ) {
      throw new Error("The values should not be empty");
    }

    // Sort the availableBagSizes
    const sortedBagSizes =
      availableBagSizes && availableBagSizes.sort((a, b) => b - a);

    const sortedOrders = clientOrders && clientOrders.sort((a, b) => b - a);

    console.log(sortedBagSizes, sortedOrders);
    let modulo;
    const sizesCount = [];

    // Get the number of bags starting from the largest
    const find = () => {
      const pointer = 0;
      sortedBagSizes &&
        sortedBagSizes.map(size => {
          if (size > sortedOrders[pointer]) {
            sizesCount.push({ size, count: 0 });
          } else {
            modulo = sortedOrders[pointer] % size;
            if (modulo !== 0) {
              sizesCount.push({
                size,
                count: Math.floor(sortedOrders[pointer] / size)
              });
            } else {
              sizesCount.push({
                size,
                count: Math.floor(sortedOrders[pointer] / size)
              });
            }
          }
        });
    };
    while (sortedOrders.length) {
      find();
      sortedOrders.shift();
    }
    console.log(sizesCount);
    return sizesCount;
  } catch (error) {
    console.log("Error", error.message);
  }
}

getBagCounts([9], [1, 2, 4]);

module.exports = getBagCounts;

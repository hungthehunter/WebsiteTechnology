export const formatOrderStatus = (status) => {
    return (status ?? "").replace(/([a-z])([A-Z])/g, "$1 $2");
  };
  
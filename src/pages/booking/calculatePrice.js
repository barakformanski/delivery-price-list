export const calculatePrice = (pricePerKm, distance, pricePerMin, duration) => {
  const distanceKmFormat = distance.value * 0.001;
  const durationMinFormat = duration.value / 60;

  const price = pricePerKm * distanceKmFormat + pricePerMin * durationMinFormat;
  return price.toFixed(2);
};

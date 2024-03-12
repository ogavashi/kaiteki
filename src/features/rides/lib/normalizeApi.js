export const normalizeApi = (rawData) => {
  return {
    ...rawData,
    driver: rawData.driver?.value || rawData.driver,
    trailer: rawData.trailer?.value || rawData.trailer,
    track: rawData.track.value || rawData.track,
  };
};

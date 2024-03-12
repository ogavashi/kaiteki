export const normalize = (rawData) => {
  return {
    ...rawData,
    driver: rawData.driver ? { value: rawData.driver._id, label: rawData.driver.fullName } : null,
    trailer: { value: rawData.trailer._id, label: rawData.trailer.trailerNumber },
    track: { value: rawData.track._id, label: rawData.track.trackNumber },
  };
};

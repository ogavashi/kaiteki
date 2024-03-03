export const normalizeData = (rawData) => {
  const { data, meta } = rawData;

  const normalizedData = data.map((record) => ({ id: record._id, ...record }));

  return { tableData: normalizedData, meta };
};

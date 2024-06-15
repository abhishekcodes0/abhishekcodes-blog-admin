export const transformDate = (isoDate) => {
  const date = new Date(isoDate);

  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-GB", options);
  return formattedDate;
};

export const getDateDiff = (date) => {
  const now = new Date();
  const timeDiff = now - date;
  let FinaltimeDiff = Math.ceil(timeDiff / 1000);
  if (FinaltimeDiff < 60) return `${FinaltimeDiff} secs ago`;
  FinaltimeDiff = Math.floor(FinaltimeDiff / 60);
  if (FinaltimeDiff < 60) return `${FinaltimeDiff} mins ago`;
  FinaltimeDiff = Math.floor(FinaltimeDiff / 60);
  if (FinaltimeDiff < 24) return `${FinaltimeDiff} hrs ago`;
  FinaltimeDiff = Math.floor(FinaltimeDiff / 24);
  if (FinaltimeDiff < 7) return `${FinaltimeDiff} days ago`;
  FinaltimeDiff = Math.floor(FinaltimeDiff / 7);
  if (FinaltimeDiff < 4) return `${FinaltimeDiff} weeks ago`;
  FinaltimeDiff = Math.floor(FinaltimeDiff / 4);
  if (FinaltimeDiff < 12) return `${FinaltimeDiff} months ago`;
  FinaltimeDiff = Math.floor(FinaltimeDiff / 12);
  return `${FinaltimeDiff} years ago`;
};

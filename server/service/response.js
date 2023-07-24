export const SendCreate = (res, message, data) => {
  res.status(201).json({ status: true, message, data }); // 201 create
};
export const SendSuccess = (res, message, data) => {
  res.status(200).json({ status: true, message, data });
};
export const SendError203 = (res, message, error) => {
  res.status(203).json({ status: false, message, error, data: {} });
};
export const SendError400 = (res, message, error) => {
  res.status(400).json({ status: false, message, error, data: {} });
};
export const SendError401 = (res, message, error) => {
  res.status(401).json({ status: false, message, error, data: {} });
};
export const SendError404 = (res, message, error) => {
  res.status(404).json({ status: false, message, error, data: {} });
};
export const SendError403 = (res, message, error) => {
  res.status(403).json({ status: false, message, error, data: {} });
};
export const SendError500 = (res, message, error) => {
  res.status(500).json({ status: false, message, error, data: {} });
};

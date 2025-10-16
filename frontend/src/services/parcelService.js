import axios from "axios";

const API_URL = "https://trackify-45q3.onrender.com/api/parcels";

export const getParcels = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addParcel = async (parcelData) => {
  const res = await axios.post(API_URL, parcelData);
  return res.data;
};

export const updateParcel = async (id, updateData) => {
  const res = await axios.put(`${API_URL}/${id}`, updateData);
  return res.data;
};

export const deleteParcel = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

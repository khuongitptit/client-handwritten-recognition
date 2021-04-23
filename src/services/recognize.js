import axios from "axios"

export const recognize = (data) => {
  return axios.post('http://localhost:8088/recognize', data).then(res => res.data);
}

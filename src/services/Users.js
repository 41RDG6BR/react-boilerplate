import axios from 'src/axios'

const getAll = () => {
    return axios.get("/users");
  };
    
export default getAll;
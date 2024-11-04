import axios from "./httpRequest";

function demoGet(id) {
    return axios.get('/todos/' + id);
}

export { demoGet }
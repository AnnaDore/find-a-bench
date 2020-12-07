import axios from "axios"


class BenchService {
    constructor() {
        let service = axios.create({
            baseURL: "http://localhost:5000/",
            withCredentials: true,
          });
          this.service = service;
    }

    addBench = (lat, lng) => {
        return this.service
        .post('/addBench', { lat, lng })
        .then((response) => response.data)
        .then(console.log('bench service'))
    }

    allBenches = (data) => {
        return this.service
        .get('/', { data })
        .then(response => response.data)
        .then(console.log('all bench service'))
    }

}

export default BenchService
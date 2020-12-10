import axios from "axios";

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
      .post("/addBench", { lat, lng })
      .then((response) => response.data)
      .then(console.log("bench service"));
  };

  allBenches = (data) => {
    return this.service
      .get("/", { data })
      .then((response) => response.data)
      .then(console.log("all bench service"));
  };

  userProfile = (data, id) => {
    return this.service
      .get(`/profile/${id}`, { data })
      .then((response) => response.data)
      .then(console.log("service profile data"));
  };

  oneBenchGet = (id) => {
    // console.log(id, "bench service")
    return this.service
      .get(`/bench/${id}`)
      .then((response) => response.data)
      .then(console.log("one behcng get service"));
  };

  imageUpload = (image) => {
      return this.service.post('/bench/:id/benchAvatar', image)
      .then((response) => response.data)
      .then(console.log("upload image service"));
  }

  editBench = ( description, imageUrl, location, creator, id ) => {
    return this.service.post(`/bench/${id}/edit`, 
    {  description, imageUrl, location, creator })
    .then(response => response.data)
    .then(console.log('edit service post'))
  }
}

export default BenchService;

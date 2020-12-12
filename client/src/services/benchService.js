import axios from "axios";

class BenchService {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:5000/",
      withCredentials: true,
    });
    this.service = service;
  }

  addBench = (lat, lng, creator, description, imageUrl) => {
    return this.service
      .post("/addBench", { lat, lng, creator, description, imageUrl })
      .then((response) => response.data)
      .then(console.log("bench service"));
  };

  allBenches = (data) => {
    return this.service
      .get("/", { data })
      .then((response) => response.data)
     // .then(console.log("all bench service"));
  };

  userProfile = (id) => {
    return this.service
      .get(`/profile/${id}`)
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

  imageUpload = (image, id) => {
      return this.service.post(`/bench/${id}/benchAvatar`, image)
      .then((response) => response.data)
      .then(console.log("upload image service"));
  }

  editBench = (formBench, id) => {
    console.log(formBench, id, "service edit bench")
    const { description, locationLat, locationLng  } = formBench;
    // Dummy images so the code doesn't break
   // const imageUrl = 'http://placehold.it/100x100';

   return this.service.post(`/bench/${id}/edit`, 
    {  description, location: { lat: locationLat, lng: locationLng } })
    .then(response => response.data)
    .then(console.log('edit service post'))

  }
}

export default BenchService;

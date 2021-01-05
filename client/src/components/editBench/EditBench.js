import React, { useState, useEffect } from "react";
import BenchService from "../../services/benchService";

const EditBench = (props) => {
  let benchService = new BenchService();

  let id = props.match.params.id;
  //  const [benchInEditBench, setBenchInEditBench] = useState(null);

  const [formBench, setFormBench] = useState({
    locationLat: "",
    locationLng: "",
    description: "",
  });

  const giveMeBench = () => {
    benchService
      .oneBenchGet(id)
      .then((data) => {
        console.log(data);
        setFormBench({
          locationLat: data.location.lat,
          locationLng: data.location.lng,
          description: data.description,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    giveMeBench();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormBench(prevState => ({
      ...prevState,
      [name]: value
    }))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    benchService
      .editBench(formBench, id)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFileUpload = (e) => {
    console.log(e, "fileUpload");
    const uploadData = new FormData();
    uploadData.append("benchAvatar", e.target.files[0]);
   
    console.log(e.target.files)
    console.log(e.target.files[0])
    //here will be a route smth like below
    benchService.imageUpload(uploadData, id);
  };

  console.log(formBench)
  return (
    <form onSubmit={handleSubmit}>
      <div className="formField">
        <label htmlFor="locationLat">Latitude: </label>
        <input
          type="text"
          name="locationLat"
          onChange={handleChange}
          defaultValue={formBench.locationLat}
        />
      </div>
      <div className="formField">
        <label htmlFor="locationLng">Longtitude: </label>
        <input
          type="text"
          name="locationLng"
          onChange={handleChange}
          defaultValue={formBench.locationLng}
        />
      </div>
      <div className="formField">
        <label htmlFor="description">Description </label>
        <textarea
          name="description"
          onChange={handleChange}
          defaultValue={formBench.description}
        ></textarea>
      </div>
      <div className="formField">
        <input
            type="file"
            name="benchAvatar"
            onChange={handleFileUpload}
            // ref={register}
            placeholder="Upload the bench image!"
          />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default EditBench;

// formData.get("description"),
//         "",
//         {
//           lat: formData.get("locationLat"),
//           lng: formData.get("locationLng"),
//         },
//         id

// const [benchLocation, setBenchLocation] = useState({
//     lat: "",
//     lng: "",
//   });
//   const [benchDescription, setBenchDescription] = useState("");

// setBenchLocation({
//           lat: data.location.lat,
//           lng: data.location.lng,
//         });
//         setBenchDescription(data.description);

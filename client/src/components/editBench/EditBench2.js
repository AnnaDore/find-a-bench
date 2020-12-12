import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import BenchService from "../../services/benchService";

export default function EditBench(props) {
  let allBenches = new BenchService();

  let id = props.match.params.id;
  const [benchInEditBench, setBenchInEditBench] = useState(null);

  const giveMeBench = () => {
    console.log("giveMeBench");
    allBenches
      .oneBenchGet(id)
      .then((data) => {
        console.log(data);
        setBenchInEditBench(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("use effect in EditBench");
    giveMeBench();
  }, []);

  //updateing the bench below

  const handleFileUpload = (e) => {
    console.log(e, "fileUpload");
    const uploadData = new FormData();
    console.log(uploadData);
    uploadData.append("benchAvatar", e.target.files[0]);
    console.log(e.target.files[0])
    //here will be a route smth like below
    //this.allBenches.imageUpload(uploadData);
  };

   
 // const { register, handleSubmit } = useForm();
 const [description, setDescription] = useState("")


const  handleChange = e => {
    console.log("handleChange")
  //  const { name, value } = e.target
    console.log(e.target.value)
   // setBenchInEditBench(value)
   setDescription(e)
  }


  const handleSubmit = (e) => {
      e.preventDefault()
    console.log("submit changes");
    console.log(description);
   // const { {locationLat, locationLng},  description, benchAvatar } = data
  //  const { {location.lat, location.lng},  description, benchAvatar } = data
  //const {  description, benchAvatar } = data
  //  setBenchInEditBench(data)

    console.log(benchInEditBench)
  };

  console.log(props);
  console.log(benchInEditBench);

  return (
    <div>
      <p>Add more data about your bench! </p>
      {benchInEditBench ? (

        <form onSubmit={handleSubmit}>
          <label htmlFor="locationLat">Latitude is: </label>
          <input
            type="text"
            name="locationLat"
            value={benchInEditBench.location.lat}
            // ref={register}
          />
          <label htmlFor="locationLng">Longtitude is: </label>
          <input
            type="text"
            name="locationLng"
            value={benchInEditBench.location.lng}
            // ref={register}
          />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            // ref={register}
            placeholder="Did you like this bench? "
          />
          <input
            type="file"
            name="benchAvatar"
            onChange={(e) => handleFileUpload(e)}
            // ref={register}
            placeholder="Upload the bench image!"
          />
          <input type="submit" />
        </form>
      ) : (
        <p>"Loading" </p>
      )}
    </div>
  );
}

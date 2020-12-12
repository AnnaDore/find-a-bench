import React, { useState, useEffect } from "react";
import BenchService from "../../services/benchService";

export default function EditBench(props) {
  let allBenches = new BenchService();

  let id = props.match.params.id;
  let [benchInEditBench, setBenchInEditBench] = React.useState({});

  const giveMeBench = () => {
    allBenches
      .oneBenchGet(id)
      .then((data) => {
        console.log(data);
        //   console.log(data.location)
       // setBenchInEditBench([benchInEditBench, data]);
        setBenchInEditBench(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("use effect in EditBench");
    giveMeBench();
    console.log("use effect in EditBench");
  }, {});

  console.log(props);
  console.log(props.match.params.id);
  console.log(benchInEditBench)
 //console.log(benchInEditBench[1], "benchInEditBench");

  return (
    <div>
      <p>{props.match.params.id}</p>
      <p>
            {props.user  ? 
           
            benchInEditBench.location.lat :" There is no bench"
       
             }
             </p>   
    </div>
  );
}

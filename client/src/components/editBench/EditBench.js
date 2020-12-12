import React, { useState, useEffect } from "react";
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

  console.log(props);
  console.log(benchInEditBench);

  return (
    <div>
      {benchInEditBench ? (
        <div>

          <p>{benchInEditBench.creator}</p>
          <p>{benchInEditBench._id}</p>
          <p>{benchInEditBench.location.lat}</p>

        </div>
       
      ) : "Loading" }

    </div>
  );
}



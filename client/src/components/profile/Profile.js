import React, { useState, useEffect } from "react";
import BenchService from "../../services/benchService";

export default function Profile(user) {
 //  console.log(props, "wrong props from profile");
   //console.log(props.match.params)
   console.log(user)


  const [userInProfile, setuserInProfile] = React.useState([{}]);

  let allBenches = new BenchService();

  useEffect(() => {
  
    allBenches
      .userProfile(user.computedMatch.params.id)
      .then((data) => {
        console.log(data, "profile in profile");
        console.log(data.benches, "benches in profile");
        setuserInProfile([userInProfile, data]);
        console.log(userInProfile)
      })
      .catch((err) => {
        console.log(err);
      });
    
   }, []);
  // if(userInProfile[1]) {
  //   console.log(userInProfile[1]);
  // }
  
  // if(userInProfile[1].benches) {
  //   console.log(userInProfile[1].benches)
  // }
// console.log(userInProfile)

  return (
    <div>
      <p>User profile is here</p>
      {userInProfile[1] && (
        <div>
          <p>{userInProfile[1].username}</p>
          <p>{userInProfile[1].email}</p>
          <p>{userInProfile[1]._id}</p>

          {userInProfile[1].benches &&
            userInProfile[1].benches.map((item) => (
              <div>
                <p>{item.location.lat}</p>
                <p>{item.location.lng}</p>
               <p> <img src={item.imageUrl} alt="bench image" /></p>
              </div>
            ))}
        </div>
      )}
      {/* {userInProfile[1].benches && userInProfile[1].benches.map((item) => {
        <p>{item.benches}</p>;
      })} */}
    </div>
  );
}

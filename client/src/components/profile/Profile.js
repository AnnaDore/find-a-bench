import React from "react";

export default function Profile(props) {
  console.log(props.user, "props from profile");
  return (
    <div>
      <p>User profile is here</p>
      <p>User profile is here</p>
      <p>{props.user.username}</p>
    </div>
  );
}

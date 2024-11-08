import { useState } from "react";
import { server_url } from "../Config/API";

export const getUserHook = (id, setUser) => {
  fetch(`${server_url}/user/${id}`)
    .then((res) => res.json())
    .then((data) => {
      setUser(data.data);
    });
};

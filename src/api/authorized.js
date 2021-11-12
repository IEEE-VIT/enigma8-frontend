import { Cookies } from "react-cookie";
import enigmaAPI from "./config";

export const authorized = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  console.log("Auth token:", token);
  const config = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  };
  return new Promise((resolve, reject) => {
    enigmaAPI
      .get("/authorized", config)
      .then((res) => {
        resolve(res);
        if (res.status !== 200) {
          throw new Error("Something Went Wrong!");
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

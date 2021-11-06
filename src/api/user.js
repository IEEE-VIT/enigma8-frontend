import { Cookies } from "react-cookie";
import enigmaAPI from "./config";

export const createProfile = (username, outreach) => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const config = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  };
  return new Promise((resolve, reject) => {
    enigmaAPI
      .post(
        "/user/create",
        {
          username,
          outreach,
        },
        config
      )
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

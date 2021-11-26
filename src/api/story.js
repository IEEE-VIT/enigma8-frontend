import { Cookies } from "react-cookie";
import enigmaAPI from "./config";

export const getCurrentStory = (roomId) => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const config = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
    params: {
      roomId,
    },
  };
  return new Promise((resolve, reject) => {
    enigmaAPI
      .get("/story/currentStory", config)
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

export const getFullStory = (roomId) => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const config = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
    params: {
      roomId,
    },
  };
  return new Promise((resolve, reject) => {
    enigmaAPI
      .get("/story/fullStory", config)
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

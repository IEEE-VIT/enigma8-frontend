import { Cookies } from "react-cookie";
import enigmaAPI from "./config";

const getQuestion = (roomId) => {
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
      .get("/transact/getQuestion", config)
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

export default getQuestion;

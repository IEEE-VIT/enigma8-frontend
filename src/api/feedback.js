import { Cookies } from "react-cookie";
import enigmaAPI from "./config";

export const SubmitFeedback = (
  isVITStudent,
  gameRating,
  userExperience,
  featureIdeas,
  regNo,
  vitEmail
) => {
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
        "/feedback/submitFeedback",
        {
          isVITStudent,
          gameRating,
          userExperience,
          featureIdeas,
          regNo,
          vitEmail,
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

export const feedbackfilled = () => {
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
      .get("/feedback/feedbackFilled", config)
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

import enigmaAPI from "./config";

export const timer = () => {
  const config = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  };
  return new Promise((resolve, reject) => {
    enigmaAPI
      .get("/static/timer", config)
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

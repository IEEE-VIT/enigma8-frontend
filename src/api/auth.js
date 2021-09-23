import enigmaAPI from "./config";

export const testRoute = () => {
  return new Promise((resolve, reject) => {
    enigmaAPI
      .get("/", {})
      .then((res) => {
        resolve(res);
        if (res.status !== 200) {
          throw new Error("Something Went Wrong!");
        }
        console.log(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

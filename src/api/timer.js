import enigmaAPI from "./config";

const timer = async () => {
  try {
    const remTime = await enigmaAPI.get("/static/timer", {
      timeout: 3000,
      timeoutErrorMessage: "Connection Timeout",
    });
    return remTime.data.data.date;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

export default timer;

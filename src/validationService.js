import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;

const getJobID = async (url) => {
  try {
    const data = {
      "apiKey": apiKey,
      "urlInfo": {
        "url": url
      }
    };
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://developers.checkphish.ai/api/neo/scan',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(data)
    };
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const verifyStatus = async (jobID) => {
  try {
    const data = {
      "apiKey": apiKey,
      "jobID": jobID,
      "insights": true
    };
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://developers.checkphish.ai/api/neo/scan/status',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(data)
    };
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const checkURL = async (url) => {
  try {
    const res = await getJobID(url);
    const jobID = res['jobID'];
    let finalData = await verifyStatus(jobID);
    while (finalData.status !== 'DONE') {
      finalData = await verifyStatus(jobID);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }
    return finalData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default checkURL;
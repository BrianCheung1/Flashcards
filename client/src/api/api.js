import axios from "axios";
var bcrypt = require("bcryptjs");

//Test to see if we can connect to backend server
// const getTest = async() => {
//   try {
//     const response = await axios.get("/test")
//     return response.data

//   } catch (e) {
//     console.log(e);
//   }
// };

//front end api called to get the words from the backend which returns list of words
const getWords = async () => {
  try {
    const response = await axios.get("/words");
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

//front end api called to create a new word to backend which creates the element in the database
const createWords = async (newWords) => {
  try {
    const response = await axios.post("/words/add", newWords);

    return response;
  } catch (e) {
    console.log(e);
  }
};

//front end api called to delete a word to backend which deletes an element based on id
const deleteWords = async (wordId) => {
  try {
    await axios.delete(`/words/${wordId}`);
  } catch (e) {
    console.log(e);
  }
};

//front end api called to get a word from backend
const getWord = async (newWordId) => {
  try {
    const response = await axios.get(`/word/${newWordId}`);
    return response;
  } catch (e) {
    console.log(e);
  }
};

//front end api to update a word in the database
const updateWord = async (updatedWord) => {
  try {
    const response = await axios.post(
      `/update-word/${updatedWord._id}`,
      updatedWord
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

//front end api to add a user/pass to database
const registerUser = async (user) => {
  try {
    const response = await axios.post("/register", user);
    return response;
  } catch (e) {
    console.log(e);
  }
};

const loginUser = async (user) => {
  try {
    const response = await axios.get("/login-user", { params: user });
    let match = bcrypt.compareSync(user.password, response.data.password);
    let currentSessionId;
    if (match) {
      if (localStorage.getItem("session_id")) {
        currentSessionId = localStorage.getItem("session_id");
      } else {
        localStorage.setItem(
          "session_id",
          Math.floor(Math.random() * 100000).toString()
        );
        currentSessionId = localStorage.getItem("session_id");
      }
    }

    let info = {
      match: bcrypt.compareSync(user.password, response.data.password),
      currentSessionId: currentSessionId,
    };

    return info;
  } catch (e) {
    console.log("test", e);
  }
};

export {
  getWords,
  createWords,
  deleteWords,
  getWord,
  updateWord,
  registerUser,
  loginUser,
};

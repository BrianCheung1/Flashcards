import axios from "axios";

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
const getWords = async ()=> {
    try{
        const response = await axios.get("/words")
        return response.data
    } catch(e) {
        console.log(e)
    }
}

//front end api called to create a new word to backend which creates the element in the database
const createWords = async (newWords) => {
    try{
        const response = await axios.post("words/add", newWords)
        return response
    } catch(e) {
        console.log(e)
    }
}
export {getWords, createWords}
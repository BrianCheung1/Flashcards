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

const getWords = async ()=> {
    try{
        const response = await axios.get("/words")
        return response.data
    } catch(e) {
        console.log(e)
    }
}
export {getWords}
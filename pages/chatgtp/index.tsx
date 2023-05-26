import axios from "axios";
import { NextPage } from "next";

const ChatIndex: NextPage = () => {
  axios.get('/api/chatbot').then(res => {
    console.log('结果', res)
  })
  return (<div>111</div>)
}
export default ChatIndex
import { NextApiResponse } from "next";
type Data = {}
export default function handler(req: NextApiResponse, res: NextApiResponse<Data>) {
  console.log('访问接口了', Date.now())
  const reqest = { id: 0 }
  res.status(200).json(reqest)
}
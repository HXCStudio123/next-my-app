/*
 * @Autor: ERP
 * @Email: 邮箱
 * @Description: 
 * @CreateDate: Do not edit
 * @LastEditors: houxinchao
 */
import { NextApiResponse } from 'next';
// import openai from 'openai';
// const openai = require("openai");
type Data = Array<{}>

export default function handler(req: NextApiResponse,
  res: NextApiResponse<Data>) {
  // console.log('test', openai)
  const returnObj: Array<Object> = [{ id: '1', title: 'ceshi1' }, { id: '2', title: 'ceshi2' }]
  res.status(200).json(returnObj)
}

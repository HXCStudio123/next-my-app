/*
 * @Autor: ERP
 * @Email: 邮箱
 * @Description: 
 * @CreateDate: Do not edit
 * @LastEditors: houxinchao
 */
import { NextApiResponse } from 'next';
type Data = Array<{}>

export default function handler(req: NextApiResponse,
  res: NextApiResponse<Data>) {
    res.status(200).json([{id: '1', title: 'ceshi1'}, {id: '2', title: 'ceshi2'}])
}
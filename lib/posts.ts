export const getPosts = ()=>{
  return new Promise((resolve, reject) => {
    resolve([{id: '1', title: 'ceshi1'}, {id: '2', title: 'ceshi2'}])
  })
}
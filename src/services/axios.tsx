import axios from "axios";

const api = axios.create({
  baseURL:"https://jsonplaceholder.typicode.com"
})

export const getPost = ()=>{
  return api.get("/posts")
}

export const deletePost = (id:any)=>{
  return api.delete(`/posts/${id}`)
}

export const AddPost = (post:any)=>{
  return api.post("/posts",post)
}
export const EditPost = (post:any,id:any)=>{
  return api.put(`/posts/${id}`,post)
}
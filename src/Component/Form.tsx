import { AddPost, EditPost } from "@/services/axios"
import { useEffect, useRef, useState } from "react"
import { v4 as uid } from "uuid"

const Form = ({data,setData,EditedData,setEditedData}) => {
  const [post,setPost] = useState({
    title:"",
    body:""
  })
  const inputTitle:any = useRef();
  const inputBody:any= useRef();
  const SubmitButton:any = useRef();

  let buttonText = Object.keys(EditedData).length === 0 ?"Add":"Edit"

  useEffect(()=>{
    EditedData && setPost({
      title:EditedData.title || "",
      body:EditedData.body || ""

    })
  },[EditedData])

  const handlechange = (e)=>{

    const id = uid()

    setPost({
      ...post,
      id:id,
      [e.target.name]:e.target.value,
    })
  }
  
  const AddPostData = async(e:any)=>{
    e.preventDefault();
    if(SubmitButton.current.value==='Add'){
      const result = await AddPost(post)
      if(result.status === 201){
        setData([...data,post])
        setPost({
          title:"",
          body:""
        })
        
       
      }
    }
    else if(SubmitButton.current.value ==="Edit"){
      const result = await EditPost(post,EditedData.id)
      setData(prev=>prev.map(data=>{
        if(data.id===result.data.id){
          return post
        }
        else{
          return data
        }
      }))
      setPost({
        title:"",
        body:""
      })
      setEditedData({})
    }
    }
  return (
   <>
      <form action="_blank" onSubmit={(e)=>AddPostData(e)}>
        <input type="text" id='title' name='title' placeholder="Enter your title" ref={inputTitle} onChange={handlechange} value={post.title}/>
        <textarea name="body" id="body"  placeholder="type something...!" ref={inputBody} onChange={handlechange} value={post.body}></textarea>
        <button className='bg-green-500 text-white mx-4 rounded-lg text-2xl px-6 py-3' type="submit" value={buttonText} ref={SubmitButton}>{buttonText}</button>
      </form>
   </>
  )
}

export default Form
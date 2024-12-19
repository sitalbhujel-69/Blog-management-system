import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deletePost, getPost } from "@/services/axios";
import { useEffect } from "react";

const Post = ({data,setData,EditedData,setEditedData}) => {

  const getPostData = async()=>{
    const res = await getPost();
    setData(res.data.slice(0,15))
    console.log(res.data)
    
  }
  
  const deletePostData = async(id:any)=>{
    try {
      const result = await deletePost(id);
      console.log(result)
      if(result.status===200){
        const newData = data.filter(post=>post.id!==id)
        setData(newData)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const EditPostData = (post)=>setEditedData(post)
  useEffect(()=>{
    getPostData();
  },[])

  return (
    <ol className="grid">
      {
        data.map(post=>{
          const{id,title,body} = post
          return(
            <li key={id}>
              <Card className="border-2 border-slate-500">
        <CardHeader>
          <CardTitle className="text-4xl">{title.slice(0,15)}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{body.slice(0,60)}</p>
        </CardContent>
        <CardFooter>
          <button className="bg-green-500 text-white mx-4 rounded-lg text-2xl px-6 py-2 " onClick={()=>EditPostData(post)}>Edit</button>
          <button className="bg-red-500 text-white rounded-lg text-2xl px-6 py-2" onClick={()=>deletePostData(id)}>Delete</button>
        </CardFooter>
      </Card>

            </li>
          )
        })
      }
      
    </ol>
  );
};

export default Post;

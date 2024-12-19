
import { useState } from 'react'
import './App.css'
import Post from './Component/Post'
import Form from './Component/Form'


function App() {

  const [data,setData] = useState([]) 
  const [EditedData,setEditedData] = useState({})
  

  return (
    <div className='main-section'>
      <Form data ={data} setData={setData} EditedData={EditedData} setEditedData={setEditedData}></Form>
     <Post data ={data} setData={setData} EditedData={EditedData} setEditedData={setEditedData}></Post>
    </div>
  )
}

export default App

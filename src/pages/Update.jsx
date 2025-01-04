import React, {useState} from 'react'
import { useParams } from 'react-router-dom'

const Update = ({products, onUpdate}) => {
    const {id}=useParams()
    const crtPrd=products.find((item)=>item.id==id)
    const onChange = (e) => {
        const {name, value} = e.target
        setInputValue({...inputValue, [name]: value})
    }
        const [inputValue, setInputValue]=useState({})
    const finalUpdate=(e)=>{
        e.preventDefault()
        const updateData={...crtPrd, ...inputValue}
        onUpdate(updateData)
    }
  return (
    <div>
      <form action="" onSubmit={finalUpdate}>
        <input type="text" defaultValue={crtPrd?.name} onInput={onChange} name='name' placeholder='here' />
        <input type="text" defaultValue={crtPrd?.des} onInput={onChange} name='des' placeholder='here' />
        <input type="text" defaultValue={crtPrd?.price} onInput={onChange} name='price' placeholder='here' />
        <button type='submit'>Update</button>
      </form>
    </div>
  )
}

export default Update

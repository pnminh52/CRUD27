import React, {useState, useEffect} from 'react'
import { useNavigate, Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Update from './pages/Update'


const App = () => {
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    const [inputValue, setInputValue]=useState({})
    useEffect(()=>{
        fetch('http://localhost:3000/products')
        .then((response) => response.json())
        .then((data) => setProducts(data))
    },[])
    const onDel = (id) => {
        fetch(`http://localhost:3000/products/${id}`, {
            method: 'DELETE'
        })
        const newProductList=products.filter((item)=>item.id!=id)
        setProducts(newProductList)
    }
    const onChange = (e) => {
        const {name, value} = e.target
        setInputValue({...inputValue, [name]: value})
    }
    const onAdd = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputValue)
        })
        .then((response) => response.json())
        .then((data) => setProducts([...products, data]))
        navigate('/products/list')
    }
    const onUpdate = (product) => {
        fetch(`http://localhost:3000/products/${product.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        .then((response) => response.json())
        .then((data) => {setProducts(products.map((item)=>item.id===data.id?data:item))})
        navigate('/products/list')
    }
  return (
    <Routes>
      <Route path='/products/list' element={<List products={products} onDel={onDel}/>}/>
      <Route path='/products/add' element={<Add onAdd={onAdd} onChange={onChange}/>}/>
      <Route path='/products/:id/update' element={<Update products={products} onUpdate={onUpdate}/>}/>

    
    </Routes>
  )
}

export default App

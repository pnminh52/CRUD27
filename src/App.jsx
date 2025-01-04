import React, {useState, useEffect} from 'react'
import { useNavigate, Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Update from './pages/Update'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './ProtectedRoute';


const App = () => {
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    const [user, setUser ] = useState(null);
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
  // Xử lý đăng nhập
  const handleLogin = (userData) => {
    fetch('http://localhost:3000/users')
      .then((response) => response.json())
      .then((users) => {
        const foundUser  = users.find(
          (u) => u.username === userData.username && u.password === userData.password
        );
        if (foundUser ) {
          setUser (foundUser ); // Lưu thông tin người dùng đăng nhập
          alert('Đăng nhập thành công!');
          navigate('/products/list'); // Chuyển hướng đến trang danh sách sản phẩm
        } else {
          alert('Tên đăng nhập hoặc mật khẩu không đúng');
        }
      });
  };

  // Xử lý đăng ký
  const handleRegister = (userData) => {
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: String(Math.random()), // Tạo ID ngẫu nhiên
        username: userData.username,
        password: userData.password,
      }),
    })
      .then((response) => response.json())
      .then((newUser ) => {
        alert('Đăng ký thành công!');
        navigate('/login'); // Chuyển hướng đến trang đăng nhập
      });
  };
  const onLogout = () => {
    setUser (null); // Xóa thông tin người dùng
    navigate('/login'); // Chuyển hướng về trang đăng nhập
    alert('Đăng xuất thành công!');
  };
  return (
    <Routes>
      
     <Route element={<ProtectedRoute user={user}/>}>
     <Route path='/products/list' element={<List products={products} onDel={onDel} onLogout={onLogout}/>}/>
      <Route path='/products/add' element={<Add onAdd={onAdd} onChange={onChange}/>}/>
      <Route path='/products/:id/update' element={<Update products={products} onUpdate={onUpdate}/>}/>
     </Route>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/register" element={<Register onRegister={handleRegister} />} />
    
    </Routes>
  )
}

export default App

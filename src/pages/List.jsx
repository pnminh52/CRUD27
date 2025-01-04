import React from 'react'
import { Link } from 'react-router-dom'
const List = (props) => {
    const {products, onDel, onLogout } = props
  return (
    <div className='container mx-auto p-4'>
      <Link to={`/products/add`}><button className='px-4 py-2 border border-black mb-4'>Add products</button></Link>
      <button
          onClick={onLogout} // Gọi hàm onLogout khi nhấn nút
          className="px-4 py-2 border border-black bg-red-500 text-white"
        >
          Logout
        </button>
      <table className='border border-black '>
        <thead>
            <tr>
                <td className='px-4 py-2 bg-gray-300 border-black border text-center'>name</td>
                <td className='px-4 py-2 bg-gray-300 border-black border text-center'>des</td>
                <td className='px-4 py-2 bg-gray-300 border-black border text-center'>price</td>
                <td className='px-4 py-2 bg-gray-300 border-black border text-center'>action</td>
            </tr>
        </thead>
        <tbody>
            {products.map((prodct)=>{
                return(
                    <tr key={prodct.id}>
                        <td className='px-4 py-2 border-black border text-center'>{prodct.name}</td>
                        <td className='px-4 py-2 border-black border text-center'>{prodct.des}</td>
                        <td className='px-4 py-2 border-black border text-center'>{prodct.price}</td>
                        <td className='px-4 py-2 border-black border text-center'><Link to={`/products/${prodct.id}/update`}><button className='px-4 py-2 border border-black mb-4'>Update products</button></Link>
                        <button className='px-4 py-2 border border-black mb-4' onClick={()=>onDel(prodct.id)}>Delete products</button></td>
                    </tr>
                )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default List

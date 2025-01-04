import React from 'react'

const Add = (props) => {
    const {onAdd, onChange} = props
  return (
    <div>
      <form action="" onSubmit={onAdd}>
        <input type="text" onInput={onChange} name='name' placeholder='here' />
        <input type="text" onInput={onChange} name='des' placeholder='here' />
        <input type="text" onInput={onChange} name='price' placeholder='here' />
        <button type='submit'>Add</button>
      </form>
    </div>
  )
}

export default Add

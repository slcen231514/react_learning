
import './index.css'
import { useState } from "react";
import { useRef } from 'react';
/* function Button(){
  return <button>click me</button>
} */
const Button = () => {
  return <button>click me!</button>
}

// 声明一个react状态 -useState

// 父传子
function Son (props) {
  // props:对象，包含父组件传递过来的所有数据
  console.log(props)
  return <div>this is son, {props.name}, jsx: {props.child}, brother's: {props.brother}</div>
}
// 子传父
function SonX ({OnGetSonMsg}) {
  const sonMsg = 'this is son msg'
  return (
    <div>
      this is SonX
      <button onClick={() => OnGetSonMsg(sonMsg)}>sendMsg</button>
    </div>
  )
}

function App() {
  const name = 'This is app name'

  const [msg, setMsg] = useState('')

  const [value, setValue] = useState('')
  const[count, setCount] =  useState(0);
  const[form, setForm] = useState({name:'jack', age: 25});

  const getMsg = (msg) => {
    console.log(msg)
    setMsg(msg)
  }

  const changeForm = () => {
    setForm({...form, name:'john'});
  }

  const handleClick = () => {
    setCount(count + 1);
    console.log('clicked' + count);
  }

  const inputRef = useRef(null)
  const showDom = () =>{
    console.dir(inputRef.current)
  }
  return (
    <div className="App">
      <Button />
      <Button></Button>
      <button onClick={handleClick}>{count}</button>
      <button onClick={changeForm} style={{color: 'red', fontSize:'50px'}}>{form.name}</button>
      <span className="foo">this is foo</span>
      <input 
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type='text' />
      <div>
        <input type='text' ref={inputRef} />
        <button onClick={showDom}>获取dom</button>
      </div>
      <Son 
        name={name}
        age={18}
        isTrue={false}
        list={['vue', 'react']}
        obj={{ name: 'jack'}}
        cb={() => console.log(123)}
        child={<span>this is span</span>}
        brother={msg}
      />
      <Son>
        <span>span span span</span>
      </Son>
      {msg}
      <SonX OnGetSonMsg={getMsg} />
    </div>
  );
}

export default App;

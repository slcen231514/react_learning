
import { createContext, useContext, useState } from 'react'
import './index.css'
import { useEffect } from 'react'

// 自定义hook
function useToggle() {
  // 可复用的逻辑代码
  const [count, setCount] = useState(true)

  const toggle = () => setCount(!count)

  // 那些状态和回调函数需要在其他函数使用 return
  return{
    count,
    toggle
  }
}

const MsgContext = createContext()

const URL = 'http://geek.itheima.net/v1_0/channels'

function A () {
  useEffect(() => {
    // 渲染时开启定时器
    const timer = setInterval(() => {
      console.log("定时器执行中...")
    }, 1000)
    
    //清除副作用（组件卸载）
    return () => {
      clearInterval(timer)
    }

  }, [])
  return (
    <div>
      this is A component
      <B />
    </div>
  )
}

function B () {
  const msg = useContext(MsgContext)
  return (
    <div>
      this is B component, {msg}
    </div>
  )
}

function App() { 
  const [list, setList] = useState([])
  
  const {count, toggle} = useToggle()


  useEffect(() => {
    // 额外的操作 获取频道列表
    async function getList() {
      const res = await fetch(URL)
      const jsonRes = await res.json()
      console.log(jsonRes)
      setList(jsonRes.data.channels)
    }
    getList()

  }, [count])

  const msg = 'this is app msg'
 
  return (
    <div>
      <MsgContext.Provider value={msg}>
        this is App
        {count && <A />}
      </MsgContext.Provider>
      {count && 
        <ul>
          {list.map(item => <li key={item.id}>{item.name}</li>)}
        </ul>
      }
      
      <button onClick={toggle}>click</button>
    </div>
  )
}

export default App;

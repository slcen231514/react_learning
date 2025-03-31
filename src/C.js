import { useSelector, useDispatch } from 'react-redux';
// 导入actionCreator
import { increment, decrement, addToNumber } from './store/modules/counterStore'
import { fetchChannelList } from './store/modules/channelStore';
import { useEffect } from 'react';

function App() { 
  const {count} = useSelector(store => store.counter)
  const {channelList} = useSelector(store => store.channel)
  const dispatch = useDispatch()
  // 使用useEffect触发异步请求执行
  useEffect(() => {
    dispatch(fetchChannelList())
  }, [dispatch])
  return (
    <div className='App'>
      <button onClick={() => dispatch(decrement())}>-</button>
        {count}
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(addToNumber(10))}>add to 10</button>
      <button onClick={() => dispatch(addToNumber(20))}>add to 20</button>
      <ul>
        { channelList.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  )
}

export default App;

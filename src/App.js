
import './App.css';
import  {useRef, useState} from "react";
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

// const dummyList = [
//   {
//     id:1,
//     author:"이정환",
//     content:"하이 1",
//     emotion:5,
//     created_date: new Date().getTime()
//   },{
//     id:2,
//     author:"홍길동",
//     content:"하이 2",
//     emotion:3,
//     created_date: new Date().getTime()
//   },{
//     id:3,
//     author:"서영철",
//     content:"하이룽 1",
//     emotion:1,
//     created_date: new Date().getTime()
//   },{
//     id:4,
//     author:"전예슬",
//     content:"하이롱롱롱 1",
//     emotion:2,
//     created_date: new Date().getTime()
//   },
// ]

function App() {

  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem={
      author, content, emotion, created_date, id: dataId.current
    }
    dataId.current += 1;
    setData([newItem, ...data] );
  }
  return (
    <div className="App">
      <header className="App-header">
        <DiaryEditor onCreate={onCreate}/>
        <DiaryList diaryList={data} />
      </header>
    </div>
  );
}

export default App;

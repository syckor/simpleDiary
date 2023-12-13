
import './App.css';
import  {useRef, useState} from "react";
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

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

  const onDelete = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다.`)
    setData([...data.filter(x => x.id !== targetId)])
  }
  return (
    <div className="App">
      <header className="App-header">
        <DiaryEditor onCreate={onCreate}/>
        <DiaryList onDelete={onDelete} diaryList={data} />
      </header>
    </div>
  );
}

export default App;


import './App.css';
import  {useRef, useState, useEffect} from "react";
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
//https://jsonplaceholder.typicode.com/comments
function App() {

  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const getDate = async() => {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/comments'
    ).then((res) => res.json());
    console.log(res);

    const initData = res.slice(0,20).map((it)=>{
      return{
        author : it.email,
        content : it.body,
        emotion : Math.floor(Math.random()*5) + 1,
        create_date : new Date().getTime(),
        id : dataId.current++
      }
    });

    setData(initData);
  }

  useEffect(()=>{
    getDate();
  }, [])

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem={
      author, content, emotion, created_date, id: dataId.current
    }
    dataId.current += 1;
    setData([newItem, ...data] );
  }

  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다.`)
    setData([...data.filter(x => x.id !== targetId)])
  }

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) => 
        it.id === targetId ? {...it, content:newContent} : it
      )
    );
  };
  return (
    <div className="App">
      <header className="App-header">
        <DiaryEditor onCreate={onCreate}/>
        <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
      </header>
    </div>
  );
}

export default App;

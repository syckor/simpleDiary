
import './App.css';
import  {useRef, useState, useEffect, useMemo} from "react";
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import OptimizeTest from './OptimizeTest';

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
    setData([...data.filter(x => x.id !== targetId)])
  }

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) => 
        it.id === targetId ? {...it, content:newContent} : it
      )
    );
  };


  const getDiaryAnalysis = useMemo(
    () => {
      const goodCount = data.filter((it) => it.emotion >= 3).length;
      const badCount = data.length - goodCount;
      const goodRatio = (goodCount/data.length) * 100;
      return {goodCount, badCount, goodRatio};
    }, [data.length] //data.length가 변할 때만 해당 값들이 변경된다.
  );

  const {goodCount, badCount, goodRatio} = getDiaryAnalysis; //useMemo의 return 값은 값이다.

  return (
    <div className="App">
      <header className="App-header">
        <OptimizeTest />
        <DiaryEditor onCreate={onCreate}/>
        <div>전체 일기 : {data.length}</div>
        <div>기분 좋은 일기 개수 : {goodCount}</div>
        <div>기분 나쁜 일기 개수 : {badCount}</div>
        <div>기분 좋은 일기 비율 : {goodRatio}</div>
        
        <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
      </header>
    </div>
  );
}

export default App;

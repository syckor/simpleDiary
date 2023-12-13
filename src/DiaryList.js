import DiaryItem from "./DiaryItem";

const DiaryList = ({diaryList, onDelete}) => {
    return (
        <div className="DiaryList">
            <h2>일기 리스트</h2>
            <h4>{diaryList.length}개의 일기가 있습니다.</h4>
            <div>
                {diaryList.map((it, idx) => ( //만약 key로 쓸만한 값이 없다면 idx를 쓸 수 있지만 조심해야 한다.
                    <DiaryItem key={it.id} {...it} onDelete={onDelete} />

                ))}
            </div>
        </div>
    )
}

DiaryList.defaultProps={ //diaryList가 아예 빈 undefiend일 때 방어
    diaryList: [],
}

export default DiaryList;
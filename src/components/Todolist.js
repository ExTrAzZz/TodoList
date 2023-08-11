import { useState } from "react";
import { ButtonTodo} from "./Button/ButtonTodo";
import { StatusTodo } from "./Status/StatusTodo";
import { lostFocusTodo, onDoubleClick, resizeFrame, startResize, stopResize } from "./functionality";


export const Todolist = ({list, searchInput}) => {
    // Состояние редактируемого TODO
    const [change, setChange] = useState({changeField:null, isChange:false}) 
    const [inputState, setInputState] = useState({})
    console.log(1)
    // Состояние движения ползунка
    const [drag, setDrag] = useState({ 
        active: false,
        x: "",
    });

    // Состояние размера окна
    const [dims, setDims] = useState({
        w: 200,
        h: 30
    });
    
    // Стили блока с TODO
    const boxStyle = { 
        width: `${dims.w}px`,
        height: `${dims.h}px`
    };
    
    // Ссылка на весь список
    let [refTodoList, setRefTodoList] = useState() 

    // Ползунок для изменения размера блока с TODO
    let dragger = (
      <div className="container">
        <div className="dragger"style={{'height': refTodoList ? refTodoList.clientHeight:0}} onMouseDown={(e) => startResize(e, setDrag)}></div>
      </div>
    )
    
    // Формирования списка TODO
    let table = list.todo.reduce((res, element, i) => {
      // Проверка на совпадение между введенным словом в Search поле и элементом списка 
      if (element.descr.includes(searchInput))
        res.push(
          <div key={i} className='todo-list__content' onMouseMove={(e) => resizeFrame(e, drag, dims, setDrag, setDims)} onMouseUp={(e) => stopResize(e, {drag, setDrag})}>
              <StatusTodo /> 
              <div className='input-todo__wrapper'  style={{position:"relative"}}> 
                {
                  // Если редактируется отрисовываемое поле
                  (change.changeField === i && change.isChange) ? (
                    <input className='input-todo' style={boxStyle} onBlur={() => {lostFocusTodo(list, setChange, inputState, i)}} value={`${inputState.descr}`} onChange={(e) => {setInputState({inputState, descr: e.target.value})}} autoFocus></input>
                    ) : (
                    <div className='input-todo' style={boxStyle} onClick={(e) => (onDoubleClick(e, list, {inputState, setInputState}, {change, setChange}, i))}>{element.descr}</div>)
                }
                { // Добавление ползунка, к 1-му блоку
                  !i && dragger
                }
              </div>

              <ButtonTodo list={list} input={{inputState, setInputState}} change={{change, setChange}} index={i} />
          </div>
        ) 

      return res
    },[])
    
    return (
      <div ref={(newRef) => setRefTodoList(newRef)} className='todo-list__wrapper'>
        {table}
      </div>
    );
}
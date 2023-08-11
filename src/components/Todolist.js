import { useEffect, useState } from "react";
import { ButtonTodo} from "./ButtonTodo";
import { StatusTodo } from "./StatusTodo";
import { lostFocusTodo, onDoubleClick, resizeFrame, startResize, stopResize } from "./functionality";


export const Todolist = ({list, searchInput}) => {
  /* eslint-disable */
  useEffect(() => {
    let rect = document.querySelector('.input-todo').getBoundingClientRect()
    if (rect)
      setDrag({...drag, x: rect.x + rect.width})
  }, [])
  /* eslint-enable */
  // Состояние редактируемого TODO
  const [change, setChange] = useState({changeField:null, isChange:false}) 
  const [inputState, setInputState] = useState({})

  // Состояние движения ползунка
  const [drag, setDrag] = useState({ 
      active: false,
      x: "",
  });

  // Состояние размера окна
  const [dims, setDims] = useState({
      w: 200,
      h: 33
  });
  
  // Стили блока с TODO
  const boxStyle = { 
      width: `${dims.w}px`,
      height: `${dims.h}px`,
  };

  // Ползунок для изменения размера блока с TODO
  let dragger = (
    <div 
      className="dragger" 
      style={{'height': '100%', 'left':`${drag.x}px`}} 
      onMouseDown={(e) => startResize(e, setDrag)}
    ></div>
  )
  
  // Формирования списка TODO
  let table = list.todo.reduce((res, element, i) => {
    // Проверка на совпадение между введенным словом в Search поле и элементом списка 
    if (element.descr.includes(searchInput))
      res.push(
        <div key={i} className='todo-list__content'>
            <StatusTodo list={list} index={i} />
            <div 
              className='input-todo__wrapper'  
              style={{position:"relative"}}
            > 
              {
                // Если редактируется отрисовываемое поле
                (change.changeField === i && change.isChange) ? (
                  <input 
                    className='input-todo' 
                    style={boxStyle} 
                    onBlur={() => {lostFocusTodo(list, setChange, inputState, i)}} 
                    value={`${inputState.descr}`} 
                    onChange={(e) => {setInputState({inputState, descr: e.target.value})}} 
                    autoFocus>
                  </input>
                ) : (
                  <div 
                    className='input-todo' 
                    style={boxStyle} 
                    onClick={(e) => (onDoubleClick(e, list, {inputState, setInputState}, {change, setChange}, i))}
                  >
                    {element.descr}
                  </div>)
              }
            </div>

            <ButtonTodo 
              list={list} 
              input={{inputState, setInputState}} 
              change={{change, setChange}} 
              index={i} 
            />
        </div>
      ) 

    return res
  },[])
  
  return (
    <div className='todo-list__wrapper' 
      onMouseMove={(e) => resizeFrame(e, drag, dims, setDrag, setDims)} 
      onMouseUp={(e) => stopResize(e, {drag, setDrag})}
    >
      {dragger}
      {table}
    </div>
  );
}
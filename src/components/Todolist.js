import { useState } from "react";
import { ButtonTodo, editTodo } from "./Button/ButtonTodo";
import { StatusTodo } from "./Status/StatusTodo";

let timer;

function onDoubleClick(event, list, input, change, index) {
  clearTimeout(timer);
  
  if (event.detail === 1) {
    timer = setTimeout(() => {
      // Одиночное нажатие
    }, 200)

  } else if (event.detail === 2) { // Двойное нажатие
    editTodo(list, input, change, index) // Редактирование элемента TODO
  }
}

function startResize(e, setDrag) { // Acton зажатия по ползунку
    setDrag({
      active: true,
      x: e.clientX
    });
};

function resizeFrame(e, drag, dims, setDrag, setDims) { // Изменение размера блока с TODO
    const { active, x} = drag;
    if (active) {
    const xDiff = Math.abs(x - e.clientX);
    const newW = x > e.clientX ? dims.w - xDiff : dims.w + xDiff;
    if ((window.innerWidth - document.querySelector('.button-todo__wrapper').offsetWidth) > e.pageX+2) {
      setDrag({ ...drag, x: e.clientX});
      setDims({ w: newW });
     }
    }
  };



function lostFocusTodo(list, setChange, inputState, index) {
  if (list.todo && list.todo[index] !== inputState) { // Есть различия в поле TODO и хранимом State
    list.todo[index] = inputState // Запись данных из заполняемого поля
    list.setTodo([...list.todo])
  }
  setChange({changeField: null, isChange: false})
}

export const Todolist = ({list, searchInput}) => {
    const [change, setChange] = useState({changeField:null, isChange:false})
    const [inputState, setInputState] = useState({})

    const [drag, setDrag] = useState({ // Состояние движения ползунка
        active: false,
        x: "",
    });
    
    const [dims, setDims] = useState({ // Состояние размера окна
        w: 200,
        h: 30
    });
    
    const boxStyle = { // Стили блока с TODO
        width: `${dims.w}px`,
        height: `${dims.h}px`
    };
    
    const stopResize = e => { // Завершение изменения размера окна
        setDrag({ ...drag, active: false });
    };
    
    
    let [refTodoList, setRefTodoList] = useState() // Ссылка на весь список

    // Ползунок для изменения размера блока с TODO
    let dragger = (<div className="container">
        <div className="dragger"style={{'height': refTodoList ? refTodoList.clientHeight:0}} onMouseDown={(e) => startResize(e, setDrag)}></div>
    </div>)
    
    let table = list.todo.reduce((res, element, i) => {// Формирования списка TODO
        if (element.descr.includes(searchInput))
            res.push(
            <div key={i} className='todo-list__content' onMouseMove={(e) => resizeFrame(e, drag, dims, setDrag, setDims)} onMouseUp={stopResize}>
                <StatusTodo /> 
                <div className='input-todo__wrapper'  style={{position:"relative"}}> 

                    {(change.changeField === i && change.isChange) ? ( // Если редактируется отрисовываемое поле
                        <input className='input-todo' style={boxStyle} onBlur={() => {lostFocusTodo(list, setChange, inputState, i)}} value={`${inputState.descr}`} onChange={(e) => {setInputState({inputState, descr: e.target.value})}} autoFocus></input>
                    ) : (
                        <div className='input-todo' style={boxStyle} onClick={(e) => (onDoubleClick(e, list, {inputState, setInputState}, {change, setChange}, i))}>{element.descr}</div>)}
                    {!i && dragger /* Добавление ползунка, к 1-му блоку */}

                </div>

                <ButtonTodo list={list} input={{inputState, setInputState}} change={{change, setChange}} index={i} />
            </div>) 
        return res
    },[])
    
    return (
        <div ref={(newRef) => setRefTodoList(newRef)} className='todo-list__wrapper'>
        {table}
      </div>
    );
}
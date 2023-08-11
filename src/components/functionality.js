import { editTodo } from "./ButtonTodo";

let timer;

// Двойное нажатие по TODO
export function onDoubleClick(event, list, input, change, index) {
  clearTimeout(timer);
  
  if (event.detail === 1) {
    timer = setTimeout(() => {
      // Одиночное нажатие
    }, 200)
  } else if (event.detail === 2) { // Двойное нажатие
    editTodo(list, input, change, index) // Редактирование элемента TODO
  }
};

// Acton зажатия по ползунку
export function startResize(e, setDrag) {
    setDrag({
      active: true,
      x: e.clientX
    });
};

// Изменение размера блока с TODO
export function resizeFrame(e, drag, dims, setDrag, setDims) {
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

// Потеря фокуса из input TODO
export function lostFocusTodo(list, setChange, inputState, index) {
  if (list.todo && list.todo[index] !== inputState) { // Есть различия в поле TODO и хранимом State
    list.todo[index] = inputState // Запись данных из заполняемого поля
    list.setTodo([...list.todo])
  }
  setChange({changeField: null, isChange: false})
};

// Завершение изменения размера окна
export function stopResize(e, resize) { 
    resize.setDrag({ ...resize.drag, active: false });
};
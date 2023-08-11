import "./ButtonTodo.css"

export function editTodo(list, input, {change, setChange}, index) {
    if (change.isChange && change.changeField !== index) { // Если до этого было открыто поле (другое)
        list.todo[change.changeField] = input.inputState;
        list.setTodo([...list.todo]); // Вносим то изменение в state менеджер
    } else if (change.changeField === index) return // Нажали по полю которое уже редактируется
    setChange({changeField:index, isChange:true});
    input.setInputState(list.todo[index]);
}

export function deleteTodo(list, input, {change, setChange}, index) {
    if (change.isChange && change.changeField === index) { // Удаляемый TODO находился в режиме редактирования
        input.setInputState('')
        setChange({isChange:false, changeField:null})
    }

    list.todo.splice(index, 1); // Удалении из списка элемента по индексу
    list.setTodo([...list.todo]);
}

function orderTodo(list, place, {change, setChange}, index) {
    if (place === 'up') { // Перемещение TODO выше
        if (index) { // index != 0
            let duplicate = list.todo[index] // Изменение порядка следования TODO
            list.todo[index] = list.todo[index-1]
            list.todo[index-1] = duplicate
            if (change.isChange) // В данный момент есть поле, которое редактируется
                if (change.changeField === index) // Редактируется TODO, которое мы перемещаем
                    setChange({...change, changeField: index-1}) // Изменение редактируемого поля
                else if (change.changeField === index-1) // Дочернее поле при изменении порядка
                    setChange({change, changeField: index})
            list.setTodo([...list.todo]) // Обновление списка
        } 
    } else if (place === 'down') { // Перемещение TODO ниже
        if (list.todo && list.todo[index+1]) { // Наличие следующего TODO
            let duplicate = list.todo[index] // Изменение порядка следования TODO
            list.todo[index] = list.todo[index+1]
            list.todo[index+1] = duplicate
            if (change.isChange)
                if (change.changeField === index) {
                    setChange({...change, changeField: index+1})
                }
                else if (change.changeField === index+1)
                        setChange({change, changeField: index})
            list.setTodo([...list.todo]) 
        }
    } 
}

export const ButtonTodo = ({list, input, change, index}) => {
    return(
        <div className="button-todo__wrapper">
            <button className="change-button" onClick={() => {editTodo(list, input, change, index)}}>Изменить</button>
            <button className="delete-button" onClick={() => {deleteTodo(list, input, change, index)}}></button>
            <button className="button-order__change" onClick={() => {orderTodo(list, 'up', change, index)}}>↑</button>
            <button className="button-order__change" onClick={() => {orderTodo(list, 'down', change, index)}}>↓</button>
        </div>
    )
}
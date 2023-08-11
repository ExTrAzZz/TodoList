import { useEffect, useRef } from "react";
import "../assets/styles/StatusTodo.css"

function changeDropDown(e, list, index) {
    list.todo[index].status = e.target.value
    list.setTodo([...list.todo])
}
const status = ['Ожидает', 'В процессе', 'Выполнено']
export const StatusTodo = ({list, index}) => {
    const ref = useRef(null)
     /* eslint-disable */
    useEffect(() => {
        let color
        switch(list.todo[index].status){
            case status[1]: 
                color = "#FFB841";
                break
            case status[2]:
                color = "#48c774";
                break
            default:
                color = "#919192";
        }
        if (ref.current.parentNode && (status.indexOf(list.todo[index].status) != -1)) {
            ref.current.value = list.todo[index].status
        } else ref.current.value = status[0]
        ref.current.parentNode.parentNode.childNodes[1].style.backgroundColor = color;
        ref.current.style.color = color;
    }, [list.todo])
     /* eslint-enable */

    return (
    <div className="box">
        <select defaultValue={list.todo[index].status} ref={ref} onChange={(e) => changeDropDown(e, list, index)}>
            <option>Ожидает</option>
            <option>В процессе</option> 
            <option>Выполнено</option> 
        </select>
    </div>)
        
}
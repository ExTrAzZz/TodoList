import { useEffect, useRef } from "react";
import "../assets/styles/StatusTodo.css"

function changeDropDown(e) {
    let color
    switch(e.value){
        case "В процессе": 
            color = "#FFB841";
            break
        case "Выполнено":
            color = "#48c774";
            break
        default:
            color = "#919192";
    }
    e.parentNode.parentNode.childNodes[1].style.backgroundColor = color;
    e.style.color = color;
}

export const StatusTodo = () => {
    const ref = useRef(null)
    useEffect(() => {
        changeDropDown(ref.current)
    }, [])

    return (
    <div className="box">
        <select ref={ref} onChange={(e) => changeDropDown(e.target)}>
            <option>Ожидает</option>
            <option>В процессе</option> 
            <option>Выполнено</option> 
        </select>
    </div>)
        
}
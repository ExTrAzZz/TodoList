import "../assets/styles/StatusTodo.css"

function changeDropDown(e) {
    let color
    switch(e.target.value){
        case "В процессе": 
            color = "#FFB841";
            break
        case "Выполнено":
            color = "#48c774";
            break
        default:
            color = "#919192";
    }
    e.target.style.color = color;
}

export const StatusTodo = () => {
   
        return (
        <div className="box">
            <select onChange={(e) => changeDropDown(e)}>
                <option>Ожидает</option>
                <option>В процессе</option> 
                <option>Выполнено</option> 
            </select>
        </div>)
        
}
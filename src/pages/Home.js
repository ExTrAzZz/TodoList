import { useState } from "react";
import { InputTodo } from "../components/InputTodo";
import { Todolist } from "../components/Todolist";

function createTodo(list) {
  list.setTodo([...list.todo, {descr:' ', status:''}]); // Добавление пустых данных
}


const Home = () => {
    // Список todo
  const [todo, setTodo] = useState([{descr:'привет', status:'Выполнено'},{descr:'Home', status:'что то'}]);
  
  // Поиск
  const [searchInput, setSearchInput] = useState('')
    return (
        <>
          <h1 style={{'display':'block', 'fontSize':'42px', 'fontWeight': '600', 'textAlign':'center'}}>Список дел</h1>
          <InputTodo search={{setSearchInput, searchInput}}/>
          <Todolist 
              list={{todo, setTodo}} 
              searchInput={searchInput} 
          />
          <div 
              className="create-todo" 
              onClick={() => createTodo({todo, setTodo})}
          >
              <div className="create-todo__icon" >+</div>
              <div className='create-todo__title'>Добавить</div>
          </div>
        </>
    );
}

export default Home
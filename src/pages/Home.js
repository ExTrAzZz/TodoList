import { useState } from "react";
import { InputTodo } from "../components/InputTodo";
import { Todolist } from "../components/Todolist";

function createTodo(list) {
    if ( !list.todo.at(-1)) // Список пустой 
      list.setTodo([{descr:' ', status:''}]);
    else if (list.todo.at(-1).descr) // Последний элемент TODO заполнен
      list.setTodo([...list.todo, {descr:' ', status:''}]); // Добавление пустых данных
    else alert('Заполните последнее todo'); 
  }


const Home = () => {
    // Список todo
  const [todo, setTodo] = useState([{descr:'привет', status:'здарова'},{descr:'привет2', status:'здарова'}]);
  
  // Поиск
  const [searchInput, setSearchInput] = useState('')
    return (
        <>
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
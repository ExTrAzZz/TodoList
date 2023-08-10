import {  useState } from 'react';
import './App.css';
import { Todolist } from './components/Todolist';
import { InputTodo } from './components/Input/InputTodo';


function createTodo(list) {
  if ( !list.todo.at(-1)) // Список пустой 
    list.setTodo([{descr:' ', status:''}]);
  else if (list.todo.at(-1).descr) // Последний элемент TODO заполнен
    list.setTodo([...list.todo, {descr:' ', status:''}]); // Добавление пустых данных
  else alert('Заполните последнее todo'); 
}

function App() {
  const [todo, setTodo] = useState([{descr:'привет', status:'здарова'},{descr:'привет2', status:'здарова'}]); // Список todo
  const [searchInput, setSearchInput] = useState('') // Поиск
  
  return (
      <div className="App">
        <InputTodo search={{setSearchInput, searchInput}}/>
        <Todolist list={{todo, setTodo}} searchInput={searchInput} />
        <div className="create-todo" onClick={() => createTodo({todo, setTodo})}>
          <div className="create-todo__icon" >+</div>
          <div className=''>Добавить</div>
        </div>
      </div>
      
  );
}

export default App;

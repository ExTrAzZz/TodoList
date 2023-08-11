import "../assets/styles/InputTodo.css"

export const InputTodo = ({search}) => {
    return(
        <div className="search-input__wrapper">
            <input 
            className='input-todo__search' 
            onChange={(e) => {search.setSearchInput(e.target.value)}} 
            value={search.searchInput}
            placeholder="Введите задачу"
            ></input>
        </div>
    )
}

export const InputTodo = ({search}) => {
    return(
        <input className='input-todo__search' onChange={(e) => {search.setSearchInput(e.target.value)}} value={search.searchInput}></input>
    )
}
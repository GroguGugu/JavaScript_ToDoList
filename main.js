let todoInput //miejsce, gdzie użytkownik wpisuje treść zadania
let errorInfo //info o braku zadań / koniecznosci wpisania zadania
let addBtn //przycisk ADD - dodaje nowe elementy do listy
let ulList //lista zadań, tagi UL
let newTodo //nowo dodany LI, nowe zadanie
let popup // popup
let popupInfo //tekst w popupie, jak sie doda pusty tekst
let todoToEdit // edytowany Todo
let popupInput // input w popupie
let popupAddBtn //przycisk "zatwierdź" w popupie
let popupCloserBtn // przycisk "anuluj" w popupie
let todoToDelete // usuwany todo

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	todoInput = document.querySelector('.todo-input')
	errorInfo = document.querySelector('.error-info')
	addBtn = document.querySelector('.btn-add')
	ulList = document.querySelector('.todolist ul')
	popup = document.querySelector('.popup')
	popupInfo = document.querySelector('.popup-info')
	popupInput = document.querySelector('.popup-input')
	popupAddBtn = document.querySelector('.accept')
	popupCloserBtn = document.querySelector('.cancel')

	// pobieramy wszystkie dokumenty
}

const prepareDOMEvents = () => {
	addBtn.addEventListener('click', addNewTodo)
	ulList.addEventListener('click', checkClick)
	popupCloserBtn.addEventListener('click', closePopup)
	popupAddBtn.addEventListener('click', changeTodoText)
	todoInput.addEventListener('keyup', enterKeyCheck)

	// nadajemy nasłuchiwanie
}

const addNewTodo = () => {
	if (todoInput.value !== '') {
		newTodo = document.createElement('li')
		newTodo.textContent = todoInput.value
		createToolsArea()

		ulList.append(newTodo)

		todoInput.value = ''
		errorInfo.textContent = ''
	} else {
		errorInfo.textContent = 'Wpisz treść zadania!'
	}
}

const createToolsArea = () => {
	const toolsPanel = document.createElement('div')
	toolsPanel.classList.add('tools')
	newTodo.append(toolsPanel)

	const completeBtn = document.createElement('button')
	completeBtn.classList.add('complete')
	completeBtn.innerHTML = '<i class="fas fa-check"></i >'

	const editBtn = document.createElement('button')
	editBtn.classList.add('edit')
	editBtn.textContent = 'EDIT'

	const deleteBtn = document.createElement('button')
	deleteBtn.classList.add('delete')
	deleteBtn.innerHTML = '<i class="fas fa-times"></i>'

	toolsPanel.append(completeBtn, editBtn, deleteBtn)
}

const checkClick = e => {
	if (e.target.matches('.complete')) {
		e.target.closest('li').classList.toggle('completed')
		e.target.classList.toggle('completed')
	} else if (e.target.matches('.edit')) {
		editTodo(e)
	} else if (e.target.matches('.delete')) {
		deleteTodo(e)
	}
}

const editTodo = (e) => {
	todoToEdit = e.target.closest('li')
	popupInput.value = todoToEdit.firstChild.textContent
	popup.style.display = 'flex'
}

const closePopup = () => {
	popup.style.display = 'none'
	popupInfo.textContent = ''
}

const changeTodoText = () => {
	if (popupInput.value !== '') {
	todoToEdit.firstChild.textContent = popupInput.value
	closePopup()
	}else{
		popupInfo.textContent = 'Musisz podać jakąś treść!'
	}
	
}

const deleteTodo = (e) => {
	todoToDelete = e.target.closest('li')
	ulList.removeChild(todoToDelete)

	const allTodos = ulList.querySelectorAll('li')

	if (allTodos.length === 0) {
		errorInfo.textContent = 'Brak zadań na liście.'
	}
}

const enterKeyCheck = (e) => {
	if (e.key === 'Enter') {
		addNewTodo()
	}
}


document.addEventListener('DOMContentLoaded', main)

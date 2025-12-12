import Todo from "../components/Todo.js";
import initialTodos from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import { validationConfig as settings } from "../utils/constants.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const validator = new FormValidator(settings, addTodoForm);
validator.enableValidation();

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
  validator.resetValidation();
  addTodoForm.reset();
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const values = {
    id: crypto.randomUUID(),
    name,
    completed: false,
    date,
  };

  const todo = new Todo(values, "#todo-template");
  todosList.append(todo.getView());

  addTodoForm.reset();
  closeModal(addTodoPopup);
});

initialTodos.forEach((item) => {
  const todo = new Todo(item, "#todo-template");
  todosList.append(todo.getView());
});

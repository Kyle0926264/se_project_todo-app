class Todo {
  constructor(data, selector) {
    this.data = data;
    this.selector = selector;
  }

  _setEventListeners(todoElement) {
    const todoDeleteBtn = todoElement.querySelector(".todo__delete-btn");
    const todoCheckboxEl = todoElement.querySelector(".todo__completed");

    // delete button
    todoDeleteBtn.addEventListener("click", () => {
      todoElement.remove();
    });

    // checkbox toggle
    todoCheckboxEl.addEventListener("change", () => {
      this.data.completed = todoCheckboxEl.checked;
    });
  }

  getView() {
    // find template
    const template = document.querySelector(this.selector);
    const todoElement = template.content.querySelector(".todo").cloneNode(true);

    const todoNameEl = todoElement.querySelector(".todo__name");
    const todoCheckboxEl = todoElement.querySelector(".todo__completed");
    const todoLabel = todoElement.querySelector(".todo__label");
    const todoDate = todoElement.querySelector(".todo__date");

    // fill in name + checkbox
    todoNameEl.textContent = this.data.name;
    todoCheckboxEl.checked = this.data.completed;

    // unique ids
    todoCheckboxEl.id = `todo-${this.data.id}`;
    todoLabel.setAttribute("for", `todo-${this.data.id}`);

    // date handling
    const dueDate = new Date(this.data.date);
    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }

    // attach listeners
    this._setEventListeners(todoElement);

    // return completed element
    return todoElement;
  }
}

export default Todo;

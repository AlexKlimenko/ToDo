// Форма
// Список задач
const tasks = [
  {
    _id: "5d2ca9e2e03d40b324596aa7",
    completed: true,
    body:
      "non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu ea incididunt sunt consectetur fugiat non."
  },
  {
    _id: "5d2ca9e29c8a94090c4e88e0",
    completed: true,
    body:
      "cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    title:
      "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum."
  },
  {
    _id: "5d2ca9e2e03d40b326596aa7",
    completed: false,
    body:
      "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu ea incididunt sunt consectetur fugiat non."
  },
  {
    _id: "5d2ca9e29c8a94095c4e88e0",
    completed: false,
    body:
      "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    title:
      "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum."
  },
  {
    _id: "5d2вca9e2e03d40b324596aa7",
    completed: true,
    body:
      "non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu ea incididunt sunt consectetur fugiat non."
  }
];

(function(arrOfTasks) {
  arrOfTasks.length === 0 && messageTemplate(tasks);

  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});

  // UI Elements
  const tasksList = document.querySelector(".tasks-list-section .list-group");
  const form = document.forms["addTask"];
  const inputTitle = form.elements["title"];
  const inputBody = form.elements["body"];

  const allBtn = document.createElement("button");
  allBtn.textContent = "All tasks";
  allBtn.classList.add("btn", "btn-outline-primary", "mr-1");

  const uncompleteBtn = document.createElement("button");
  uncompleteBtn.textContent = "Uncomplete tasks";
  uncompleteBtn.classList.add("btn", "btn-outline-secondary");

  const btnGroup = document.createElement("div");
  btnGroup.classList.add("d-flex", "justify-content-center", "mt-5");

  btnGroup.appendChild(allBtn);
  btnGroup.appendChild(uncompleteBtn);

  document.body.insertBefore(btnGroup, document.body.children[1]);

  renderTasks(objOfTasks);
  form.addEventListener("submit", onFormSubmitHandler);
  tasksList.addEventListener("click", onDeleteHandler);
  tasksList.addEventListener("click", onSuccessHandler);
  tasksList.addEventListener("click", onRestoreHandler);

  allBtn.addEventListener("click", viewAllTasks);
  uncompleteBtn.addEventListener("click", viewUncompleteTasks);

  // Functions
  function renderTasks(obj) {
    const fragment = document.createDocumentFragment();

    Object.values(obj).forEach(task => {
      const li = listItemTemplate(task);

      li.matches(".list-group-item-success")
        ? fragment.appendChild(li)
        : fragment.insertBefore(li, fragment.firstChild);
    });
    tasksList.innerHTML = "";
    tasksList.appendChild(fragment);
  }

  function listItemTemplate(task) {
    const li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex",
      "align-items-center",
      "flex-wrap"
    );
    li.setAttribute("data-task-id", task._id);

    // task.completed ? li.classList.add("list-group-item-success") : null;

    const span = document.createElement("span");
    span.textContent = task.title;
    span.style.fontWeight = "bold";

    const successBtn = document.createElement("button");
    successBtn.textContent = "Done";
    successBtn.classList.add("btn", "btn-success", "ml-auto", "success-btn");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("btn", "btn-danger", "ml-2", "delete-btn");

    const restoreBtn = document.createElement("button");
    restoreBtn.textContent = "Restore";
    restoreBtn.classList.add("btn", "btn-warning", "ml-2", "delete-btn");

    const article = document.createElement("p");
    article.textContent = task.body;
    article.classList.add("mt-2", "w-100");

    li.appendChild(span);
    li.appendChild(successBtn);
    li.appendChild(deleteBtn);
    li.appendChild(article);

    if (task.completed) {
      li.classList.add("list-group-item-success");
      const restoreBtn = document.createElement("button");
      restoreBtn.textContent = "Restore";
      restoreBtn.classList.add("btn", "btn-warning", "ml-2", "restore-btn");

      !li.contains(restoreBtn) ? li.insertBefore(restoreBtn, deleteBtn) : null;
    }

    return li;
  }

  function messageTemplate() {
    const messageWarning = document.createElement("h3");
    messageWarning.textContent = "You have no tasks";
    messageWarning.classList.add("d-flex", "m-auto");

    const card = document.querySelector(".row");
    card.classList.add("flex-column");

    card.appendChild(messageWarning);

    return messageWarning;
  }

  function onFormSubmitHandler(e) {
    e.preventDefault();
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;

    if (!titleValue || !bodyValue) {
      alert("Пожалуйста введите title и body");
      return;
    }

    const task = createNewTask(titleValue, bodyValue);
    const listItem = listItemTemplate(task);
    tasksList.insertAdjacentElement("afterbegin", listItem);
    form.reset();
  }

  function createNewTask(title, body) {
    const newTask = {
      title,
      body,
      completed: false,
      _id: `task-${Math.random()}`
    };

    objOfTasks[newTask._id] = newTask;

    return { ...newTask };
  }

  function onDeleteHandler(e) {
    const { target } = e;
    if (target.classList.contains("delete-btn")) {
      const parent = target.closest("[data-task-id]");
      const id = parent.dataset.taskId;
      parent.remove();
      delete objOfTasks[id];
    }
    Object.keys(objOfTasks).length === 0 && messageTemplate(tasks);
  }

  function onSuccessHandler(e) {
    const { target } = e;
    if (target.classList.contains("success-btn")) {
      const parent = target.closest("[data-task-id]");
      parent.classList.add("list-group-item-success");

      const restoreBtn = document.createElement("button");
      restoreBtn.textContent = "Restore";
      restoreBtn.classList.add("btn", "btn-warning", "ml-2");
      // parent.insertBefore(restoreBtn, parent.children[2]);

      !parent.contains(restoreBtn)
        ? parent.insertBefore(restoreBtn, parent.children[2])
        : null;
      console.log(parent);
      const id = parent.dataset.taskId;

      objOfTasks[id].completed = true;
    }
  }

  function viewUncompleteTasks() {
    const uncompleteTasks = Object.values(objOfTasks).filter(
      task => !task.completed
    );

    const objOfUncompleteTasks = uncompleteTasks.reduce((acc, task) => {
      acc[task._id] = task;

      return acc;
    }, {});

    renderTasks(objOfUncompleteTasks);
  }

  function viewAllTasks() {
    renderTasks(objOfTasks);
  }

  function onRestoreHandler(e) {
    const { target } = e;

    if (target.classList.contains("restore-btn")) {
      const parent = target.closest("[data-task-id]");
      parent.classList.remove("list-group-item-success");
      parent.classList.add("list-group-item-restore");

      const restoreBtn = target.closest(".restore-btn");

      restoreBtn.remove();

      const id = parent.dataset.taskId;

      objOfTasks[id].completed = false;
    }
  }
})(tasks);

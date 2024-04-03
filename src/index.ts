(() => {
  enum NotifcationPlatform{
    
  }

  interface Task {
    id: string;
    dateCreated: Date;
    dateUpdated: Date;
    description: string;
    render(): string;
  }

  class Reminder implements Task {
    id: string = "";
    dateCreated: Date = new Date();
    dateUpdated: Date = new Date();
    description: string = "";

    date: Date = new Date();
    notifications: Array<string> = ["EMAIL"];

    constructor(
      description: string, 
      date: Date, 
      notifications: Array<string>) {
      this.description = description;
      this.date = date;
      this.notifications = notifications;
    }

    render(): string {
      return JSON.stringify(this);
    }
  }

  class Todo implements Task{
    id: string = "";
    dateCreated: Date = new Date();
    dateUpdated: Date = new Date();
    description: string = "";

    done: boolean = false;

    constructor(description: string){
      this.description =  description
    }

    render(): string {
      return JSON.stringify(this);
    }
  }

  const todo = new Todo("descrição");

  const reminder = new Reminder("descrição", new Date(), ["email"]);

  const taskView = {
    render(tasks: Array<Task>) {
      const tasksList = document.getElementById("tasksList");

      while (tasksList?.firstChild) {
        tasksList.removeChild(tasksList.firstChild);
      }

      tasks.forEach((task) => {
        const li = document.createElement("LI");
        const textNode = document.createTextNode(task.render());
        li.appendChild(textNode);
        tasksList?.appendChild(li);
      });
    },
  };

  const taskController = (view: typeof taskView) => {
    const tasks: Array<Task> = [todo, reminder];

    const handleEvent = (event: Event) => {
      event.preventDefault();
      view.render(tasks);
    };

    document
      .getElementById("taskForm")
      ?.addEventListener("submit", handleEvent);
  };

  taskController(taskView);
})();

"use strict";
//IIFE to preserv code scope
(function () {
    //Enums
    var NotificationPlatform;
    (function (NotificationPlatform) {
        NotificationPlatform["SMS"] = "SMS";
        NotificationPlatform["EMAIL"] = "EMAIL";
        NotificationPlatform["PUSH_NOTIFICATION"] = "PUSH_NOTIFICATION";
    })(NotificationPlatform || (NotificationPlatform = {}));
    var ViewMode;
    (function (ViewMode) {
        ViewMode["TODO"] = "TODO";
        ViewMode["REMINDER"] = "REMINDER";
    })(ViewMode || (ViewMode = {}));
    //Utils
    var DateUtils = {
        today: function () {
            return new Date();
        },
        tomorrow: function () {
            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow;
        },
        formatDate: function (date) {
            return "".concat(date.getDate(), ".").concat(date.getMonth() + 1, ".").concat(date.getFullYear());
        },
    };
    var UUID = function () {
        return Math.random().toString(32).substr(2, 9);
    };
    var Reminder = /** @class */ (function () {
        function Reminder(description, date, notifications) {
            this.id = UUID();
            this.dateCreated = DateUtils.today();
            this.dateUpdated = DateUtils.today();
            this.description = "";
            this.date = DateUtils.tomorrow();
            this.notifications = [NotificationPlatform.EMAIL];
            this.description = description;
            this.date = date;
            this.notifications = notifications;
        }
        Reminder.prototype.render = function () {
            return "\n      ---> Reminder <--- \n\n      description: ".concat(this.description, " \n\n      Notify by ").concat(this.notifications.join(" and "), " in ").concat(DateUtils.formatDate(this.date), " \n\n      Created: ").concat(DateUtils.formatDate(this.date), "\n      Last Update: ").concat(DateUtils.formatDate(this.dateUpdated), "\n      ");
        };
        return Reminder;
    }());
    var Todo = /** @class */ (function () {
        function Todo(description) {
            this.id = UUID();
            this.dateCreated = DateUtils.today();
            this.dateUpdated = DateUtils.today();
            this.description = "";
            this.done = false;
            this.description = description;
        }
        Todo.prototype.render = function () {
            var doneLabel = this.done ? "Completed" : "In Progress";
            return "\n      ---> TODO <--- \n\n      description: ".concat(this.description, " \n\n      Status: ").concat(doneLabel, " \n\n      Created: ").concat(DateUtils.formatDate(this.dateCreated), "\n      Last Update: ").concat(DateUtils.formatDate(this.dateUpdated), "\n      ");
        };
        return Todo;
    }());
    var taskView = {
        getTodo: function (form) {
            var todoDescription = form.todoDescription.value;
            form.reset();
            return new Todo(todoDescription);
        },
        getReminder: function (form) {
            var reminderNotifications = [
                form.notification.value,
            ];
            var reminderDate = new Date(form.scheduleDate.value);
            var reminderDescription = form.reminderDescription.value;
            form.reset();
            return new Reminder(reminderDescription, reminderDate, reminderNotifications);
        },
        render: function (tasks, mode) {
            // Clear view
            var tasksList = document.getElementById("tasksList");
            while (tasksList === null || tasksList === void 0 ? void 0 : tasksList.firstChild) {
                tasksList.removeChild(tasksList.firstChild);
            }
            // Render Tasks
            tasks.forEach(function (task) {
                var li = document.createElement("li");
                var textNode = document.createTextNode(task.render());
                li.appendChild(textNode);
                tasksList === null || tasksList === void 0 ? void 0 : tasksList.appendChild(li);
            });
            // Render form mode
            var todoSet = document.getElementById("todoSet");
            var reminderSet = document.getElementById("reminderSet");
            if (mode === ViewMode.TODO) {
                todoSet === null || todoSet === void 0 ? void 0 : todoSet.setAttribute("style", "display: block;");
                todoSet === null || todoSet === void 0 ? void 0 : todoSet.removeAttribute("disabled");
                reminderSet === null || reminderSet === void 0 ? void 0 : reminderSet.setAttribute("style", "display: none;");
                reminderSet === null || reminderSet === void 0 ? void 0 : reminderSet.setAttribute("disabled", "true");
            }
            else {
                reminderSet === null || reminderSet === void 0 ? void 0 : reminderSet.setAttribute("style", "display: block;");
                reminderSet === null || reminderSet === void 0 ? void 0 : reminderSet.removeAttribute("disabled");
                todoSet === null || todoSet === void 0 ? void 0 : todoSet.setAttribute("style", "display: none;");
                todoSet === null || todoSet === void 0 ? void 0 : todoSet.setAttribute("disabled", "true");
            }
        },
    };
    // Controllers
    var taskController = function (view) {
        var _a, _b;
        var tasks = [];
        var mode = ViewMode.TODO;
        var handleEvent = function (event) {
            event.preventDefault();
            var form = event.target;
            switch (mode) {
                case ViewMode.TODO:
                    tasks.push(view.getTodo(form));
                    break;
                case ViewMode.REMINDER:
                    tasks.push(view.getReminder(form));
                    break;
            }
            view.render(tasks, mode);
        };
        var handleToggleMode = function () {
            switch (mode) {
                case ViewMode.TODO:
                    mode = ViewMode.REMINDER;
                    break;
                case ViewMode.REMINDER:
                    mode = ViewMode.TODO;
                    break;
            }
            view.render(tasks, mode);
        };
        (_a = document
            .getElementById("toggleMode")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", handleToggleMode);
        (_b = document
            .getElementById("taskForm")) === null || _b === void 0 ? void 0 : _b.addEventListener("submit", handleEvent);
    };
    taskController(taskView);
})();

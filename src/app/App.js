import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      tasks: [],
    };
    this.addTask = this.addTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.editTask = this.editTask.bind(this);
  }

  //Use my post and put method that i have on my task.routes file
  addTask(e) {
    e.preventDefault();

    if (this.state._id) {
      //if the state has an id already then i fetch the data and update with the new input
      fetch(`/api/tasks/${this.state._id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: this.state.title,
          description: this.state.description,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          window.M.toast({ html: "Task Updated" });
          this.setState({ _id: "", title: "", description: "" });
          this.fetchTasks();
        });
    } else {
      fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(this.state), //i use stingify to transform the object with my state into a string
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          M.toast({ html: "Task Saved!" });
          this.setState({ title: "", description: "" });
          this.fetchTasks();
        })
        .catch((err) => console.log(err));
    }
  }

  //To run this as soon as the website renders
  componentDidMount() {
    this.fetchTasks();
  }

  //Use the method to Show a specific task that i have on task.routes
  editTask(id) {
    fetch(`/api/tasks/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          //I change the state of the variables with the data of the object that was click
          title: data.title,
          description: data.description,
          _id: data._id,
        });
      });
  }

  //Use the method get (when you dont specify a method the default method is get) that i have on my routes task.routes file
  fetchTasks() {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ tasks: data }); //I change the state by adding all of the tasks in the propertie tasks
        console.log(this.state.tasks);
      });
  }

  //Use the method delete that i have on my task.routes file
  deleteTask(id) {
    if (confirm("Are you sure you want to delete it?")) {
      fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          M.toast({ html: "Task deleted" });
          this.fetchTasks();
        });
    }
  }

  handleChange(e) {
    const { name, value } = e.target; //I obtain the name and the value of the inputs
    this.setState({
      //I change the staet of the inputs with the data that the user type in
      [name]: value,
    });
  }

  render() {
    return (
      <div>
        {/*NAVIGATION */}
        <nav className="light-blue darken-4">
          <div className="container">
            <a className="brand-logo" href="/">
              MERN Stack
            </a>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addTask}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          onChange={this.handleChange}
                          name="title"
                          type="text"
                          placeholder="Task Title"
                          value={this.state.title}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea
                          onChange={this.handleChange}
                          name="description"
                          className="materialize-textarea"
                          placeholder="Task Description"
                          value={this.state.description}
                        ></textarea>
                      </div>
                    </div>
                    <button className="btn light-blue darken-4 ">Send</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tasks.map((task) => {
                    return (
                      <tr key={task._id}>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>
                          <button
                            onClick={() => this.deleteTask(task._id)}
                            className="btn light-blue darken-4"
                          >
                            <i className="material-icons">delete</i>
                          </button>
                          <button
                            onClick={() => this.editTask(task._id)}
                            className="btn light-blue darken-4"
                            style={{ margin: "4px" }}
                          >
                            <i className="material-icons">edit</i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// npm run webpack

export default App;

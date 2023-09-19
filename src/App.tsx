import classes from "./app.module.scss";
import { Button } from "./components/button";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { TaskList } from "./components/tasks/task-list";
import { TaskListItem } from "./components/tasks/task-list-item";

export function App() {
  return (
    <div className={classes.content}>
      <Header />
      <main>
        <TaskList>
          <TaskListItem>First</TaskListItem>
          <TaskListItem>Second</TaskListItem>
          <TaskListItem>Third</TaskListItem>
        </TaskList>
        <Button>Add</Button>
      </main>
      <Footer />
    </div>
  );
}

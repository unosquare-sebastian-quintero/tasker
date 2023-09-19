import classes from "./app.module.scss";
import { Button } from "./components/button";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { TaskList } from "./components/tasks/task-list";
import { TaskListItem } from "./components/tasks/task-list-item";
import { Typography } from "./components/typography";

export function App() {
  return (
    <>
      <Header />
      <main className={classes.main}>
        <TaskList>
          <TaskListItem>
            <Typography variant="body1">First</Typography>
          </TaskListItem>
          <TaskListItem>
            <Typography variant="body1">Second</Typography>
          </TaskListItem>
        </TaskList>
        <Button>Add</Button>
      </main>
      <Footer />
    </>
  );
}

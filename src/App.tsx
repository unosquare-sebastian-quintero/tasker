import classes from "./app.module.scss";
import { Button } from "./components/button";
import { Footer } from "./components/footer";
import { Header } from "./components/header";

export function App() {
  return (
    <div className={classes.content}>
      <Header />
      <main>
        <ul>
          <li role="button"></li>
        </ul>
        <Button>Add</Button>
      </main>
      <Footer />
    </div>
  );
}

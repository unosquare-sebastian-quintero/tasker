import styles from "./main.module.scss";
import { Tasks } from "./tasks/tasks";

export function Main() {
  return (
    <main className={styles.main}>
      <Tasks />
    </main>
  );
}

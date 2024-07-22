import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <Link href="/chat">
        <button className={styles.button}>
          Go to Chats
        </button>
      </Link>
      <div className={styles.info}>
        <p>Create group chats with people and AI bots.</p>
      </div>
    </main>
  );
}

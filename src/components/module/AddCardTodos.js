import { FaPlus } from "react-icons/fa";
import styles from "./AddCardTodos.module.css";
import Link from "next/link";

function AddCardTodos() {
  return (
    <Link href="/dashboard/add" className={styles.container}>
      <h1>
        <FaPlus />
        Add New Task
      </h1>
    </Link>
  );
}

export default AddCardTodos;

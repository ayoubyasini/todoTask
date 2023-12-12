import Link from "next/link";
import Card from "../module/Card";
import AddCardTodos from "../module/AddCardTodos";
import { FiPlusCircle } from "react-icons/fi";
import styles from "./Dashboard.module.css";

async function Dashboard({data,title}) {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <h1>
          <span>{title} </span>
          Tasks
        </h1>
        <Link href="/dashboard/add">
          <FiPlusCircle />
        </Link>
      </div>
      <div className={styles.cards}>
        {data?.map((card) => (
          <Card data={card} key={card._id}/>
        ))}
        <AddCardTodos />
      </div>
    </div>
  );
}

export default Dashboard;

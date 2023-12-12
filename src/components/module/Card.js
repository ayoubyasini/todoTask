import DeleteC from "./DeleteC";
import StatusChange from "./StatusChange";
import { MdEditDocument } from "react-icons/md";
import Link from "next/link";
import { MdLabelImportant } from "react-icons/md";
import styles from "./Card.module.css";

function Card({ data }) {
  const { title, description, status, important, createAt, _id ,customDate } = data;
  return (
    <div className={styles.container}>
      <div className={styles.rowOne}>
        <h1>{title}</h1>
        {
          important ? <MdLabelImportant /> : null
        }
        <p>{description.toString()}</p>
      </div>
      <div className={styles.rowTwo}>
        <p>{customDate.toLocaleDateString()}</p>
        <div className={styles.row}>
          <StatusChange status={status} id={_id} />
          <div className={styles.button}>
            <Link href={`/dashboard/${_id}`}>
              <MdEditDocument id={_id} />
            </Link>
            <DeleteC id={_id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;

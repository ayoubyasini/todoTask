"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SignoutButton from "../module/SignoutButton";
import { FaHome } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { MdOutlineClearAll } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { usePathname } from "next/navigation";
import styles from "./MainSidebar.module.css";

function MainSidebar({ user }) {
  const { name, email } = user;
  const pathname = usePathname();
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className={styles.container}>
      <div className={openSidebar ? styles.sidebar : styles.hiddenSidebar}>
        <div className={styles.avatar}>
          <Image
            src="/images/user.png"
            width={50}
            height={50}
            alt="Picture of the author"
            priority={true}
          />
          <h6>{name ? name : email}</h6>
        </div>
        <div className={styles.navigation}>
          <ul>
            <li className={pathname == "/dashboard" ? styles.active : null}>
              <Link href="/">
                <FaHome />
                All Tasks
              </Link>
            </li>
            <li
              className={
                pathname == "/dashboard/Important" ? styles.active : null
              }
            >
              <Link href="/dashboard/Important">
                <CiBoxList />
                Important
              </Link>
            </li>
            <li
              className={
                pathname == "/dashboard/complete" ? styles.active : null
              }
            >
              <Link href="/dashboard/complete">
                <FaCheck />
                Completed!
              </Link>
            </li>
            <li
              className={
                pathname == "/dashboard/incomplete" ? styles.active : null
              }
            >
              <Link href="/dashboard/incomplete">
                <FaClipboardList />
                Do it now!
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.signout}>
          <SignoutButton />
        </div>
        <button
          className={styles.button}
          onClick={() => setOpenSidebar(!openSidebar)}
        >
          {openSidebar ? <IoMdArrowRoundBack /> : <MdOutlineClearAll />}
        </button>
      </div>
    </div>
  );
}

export default MainSidebar;

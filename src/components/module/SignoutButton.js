"use client";

import { signOut } from "next-auth/react";
import { FaSignOutAlt } from "react-icons/fa";
import styles from "./SignoutButton.module.css"


function SignoutButton() {
  return (
    <button className={styles.button} onClick={signOut}>
      <FaSignOutAlt />
      Sign Out
    </button>
  );
}

export default SignoutButton
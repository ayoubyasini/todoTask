"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import styles from "./Signup.module.css";
import ToasterC from "../module/ToasterC";

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reapetPassword, setReapetPassword] = useState("");
  const router = useRouter();

  const signupForm = async (e) => {
    e.preventDefault();

    if (!email.match(emailRegex)) {
      return toast.error("please enter valid email !");
    }
    
    if(password.length <= 8) {
      toast.error("Password must be more than 8 characters");
      return
    }else if (password !== reapetPassword) {
      toast.error("The password is not correct");
      return;
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await res.json();
    if (res.status === 201) {
      toast.success(data.message);
      router.push("/signin");
    } else {
      toast.error(data.error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.boxForm}>
        <div className={styles.boxInput}>
          <label htmlFor="email">enter your email</label>
          <input
            type="text"
            id="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.boxInput}>
          <label htmlFor="password">enter your password</label>
          <input
            type="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.boxInput}>
          <label htmlFor="reapetPassword">confirm your password</label>
          <input
            type="password"
            id="reapetPassword"
            placeholder="confirmpassword"
            value={reapetPassword}
            onChange={(e) => setReapetPassword(e.target.value)}
          />
        </div>

        <div className={styles.buttons}>
          <button type="submit" onClick={signupForm}>
            Singup
          </button>
        </div>

        <span>
          <Link href="/signin">do you hace account! signin</Link>
        </span>
      </form>

      <ToasterC />
    </div>
  );
}

export default Signup;

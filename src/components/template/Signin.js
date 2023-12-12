"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Toaster, toast } from "react-hot-toast";
import styles from "./Signup.module.css";
import ToasterC from "../module/ToasterC";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const signInhandler = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("singin success!");
      router.push("/");
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

        <div className={styles.buttons}>
          <button type="submit" onClick={signInhandler}>
            Signin
          </button>
        </div>
        <span>
          <Link href="/">create a account! signup</Link>
        </span>
      </form>
      <ToasterC />
    </div>
  );
}

export default Signin;



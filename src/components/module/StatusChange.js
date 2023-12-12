"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import styles from "./StatusChange.module.css";
import ToasterC from "./ToasterC";

function StatusChange({ status, id }) {
  const router = useRouter();
  const changeStatus = async () => {    
    const res = await fetch(`/api/dashboard/${id}`);
    const data = await res.json();
    if(data.message) {
      toast.success(data.message);
    }else {
      toast.error(data.error);
    }
    router.refresh();
  };

  return (
    <>
    <button
      onClick={changeStatus}
      className={status === "complete" ? styles.complete : styles.incomplete}
    >
      {status}
    </button>
    <ToasterC />
    </>
  );
}

export default StatusChange;

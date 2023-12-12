"use client";

import { Toaster, toast } from "react-hot-toast";
import { IoTrashBinSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import ToasterC from "./ToasterC";


function DeleteC({id}) {
  const router = useRouter();
  const deleteHandler = async () => {
    const res = await fetch(`/api/dashboard/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data)
    if (data.message) {
      toast.success(data.message);
      router.refresh();
    }
  };
  return (
    <>
      <IoTrashBinSharp onClick={deleteHandler}/>
      <ToasterC />
    </>
  );
}

export default DeleteC;

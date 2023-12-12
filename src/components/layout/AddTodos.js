"use client";

import { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import { ThreeDots } from "react-loader-spinner";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import "react-multi-date-picker/styles/colors/green.css";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import styles from "./addtask.module.css";
import ToasterC from "../module/ToasterC";

function AddTods({ title, data }) {
  // let id;
  // if(data) {
  //   id = data[0]._id;
  // }
  const [todosData, setTodosData] = useState({
    title: "",
    description: "",
    customDate: new Date(),
    status: "incomplete",
    important: false,
    checked: false,
  });

  useEffect(() => {
    if (data) {
      const { title, description, status, customDate, important } = data[0];
      console.log(important);
      setTodosData({
        title: title,
        description: description,
        status: status,
        important: important,
        customDate: customDate,
        checked: status == "complete" ? true : false,
      });
    }
  }, []);

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setTodosData({ ...todosData, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(!loading);
    const res = await fetch("/api/dashboard/todos", {
      method: "POST",
      body: JSON.stringify(todosData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (data.message) {
      toast.success(data.message);
      setLoading(false);
      router.refresh();
    } else {
      toast.error(data.error);
      setLoading(false);
    }
  };

  const changeHandler = (e) => {
    const date = new Date(e);
    setTodosData({ ...todosData, customDate: date });
  };

  const editHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    const data = await fetch(`/api/dashboard/${id}`, {
      method: "PATCH",
      body: JSON.stringify(todosData),
      headers: { "Content-Type": "application/json" },
    });

    const res = await data.json();
    if (res.message) {
      toast.success(res.message);
      setLoading(false);
      router.refresh();
    } else {
      toast.error(res.error);
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <form>
        <div className={styles.inputbox}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={todosData.title}
            onChange={onChangeHandler}
          />
        </div>

        <div className={styles.inputbox}>
          <label>description</label>
          <textarea
            type="text"
            name="description"
            value={todosData.description}
            onChange={onChangeHandler}
          ></textarea>
        </div>

        <div className={styles.inputbox}>
          <label>Date</label>
          <DatePicker
            value={todosData.customDate}
            onChange={changeHandler}
            className="green bg-dark"
          />
        </div>

        <div className={styles.boxChackbox}>
          <label htmlFor="complete">Toggle Completed</label>

          <input
            type="checkbox"
            id="complete"
            checked={todosData.status == "complete" ? "checked" : null}
            value={todosData.status}
            onChange={(e) => {
              setTodosData({
                ...todosData,
                checked: !todosData.checked,
                status: todosData.checked ? "incomplete" : "complete",
              });
            }}
          />
        </div>

        <div className={styles.boxChackbox}>
          <label htmlFor="important">Toggle Important</label>
          <input
            type="checkbox"
            id="important"
            value={todosData.important}
            checked={todosData.important ? "checked" : null}
            onChange={(e) => {
              setTodosData({ ...todosData, important: !todosData.important });
            }}
          />
        </div>

        {data ? (
          <button onClick={editHandler} className={styles.buttonSubmit}>
            {loading ? (
              <ThreeDots
                color="#fff"
                ariaLabel="three-dots-loading"
                visible={true}
                wrapperStyle={{ margin: "auto" }}
                height={45}
              />
            ) : (
              "Edit Todos"
            )}
          </button>
        ) : (
          <button onClick={submitHandler} className={styles.buttonSubmit}>
            {loading ? (
              <ThreeDots
                color="#fff"
                ariaLabel="three-dots-loading"
                visible={true}
                wrapperStyle={{ margin: "auto" }}
                height={45}
              />
            ) : (
              "Add Todos"
            )}
          </button>
        )}
      </form>
      <ToasterC />
    </div>
  );
}

export default AddTods;

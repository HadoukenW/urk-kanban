import React, { useCallback, useEffect } from "react";
import { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CreateNewBoard } from "../../../store/slices/boardSlice";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { getAllProjects } from "../../../store/slices/projectSlice";
import { CreateNewColumn } from "../../../store/slices/columnSlice";

// __________ Socket io ___________
import io from "socket.io-client";

const socket = io(`${process.env.REACT_APP_SERVER_URL}`, {
  transports: ["websocket"],
});

const CreateColumn = ({
  boardId,
  toggleCreateColumn,
  setToggleCreateColumn,
  setBoard,
  board,
}) => {
  const dispatch = useDispatch();
  const cancelButtonRef = useRef(null);

  const { loading } = useSelector((state) => state.column);

  const [columnName, setColumnName] = useState("");

  const handleCreate = async () => {
    const isExist = board?.columns.find((col) => col.name === columnName);
    if (isExist) return toast.error("Column already exist.");
    if (!columnName) return toast.error("Column name is must.");

    setBoard({
      ...board,
      columns: [...board?.columns, { name: columnName, tasks: [], boardId }],
    });
    setColumnName("");
    setToggleCreateColumn(false);
    const data = await dispatch(CreateNewColumn({ name: columnName, boardId }));

    if (data.payload) {
      socket.emit("columnCreated", data.payload);
      dispatch(getAllProjects());
    } else {
      toast.error("Something went wrong");
    }
  };

  const handleChange = useCallback((e) => {
    setColumnName(e.target.value);
  }, []);

  return (
    <>
      <Transition.Root show={toggleCreateColumn} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setToggleCreateColumn}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 dark:backdrop-blur-md dark:bg-opacity-0 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4  sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative p-8 flex flex-col justify-between gap-10 transform overflow-hidden rounded-lg bg-white shadow-xl transition-all  sm:my-8 sm:w-full max-w-3xl">
                  <h3 className=" text-3xl font-bold text-heading">
                    Создать новую колону
                  </h3>
                  <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="column-name"
                        className="text-xl font-semibold text-heading"
                      >
                        Название колоны
                      </label>
                      <input
                        type="text"
                        name="column-name"
                        id="column-name"
                        value={columnName}
                        onChange={handleChange}
                        placeholder="Введите название колоны"
                        className="border border-gray-300 rounded-md px-4 py-4 text-xl font-normal text-heading focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-5 py-4 text-xl font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={handleCreate}
                    >
                      {loading ? "Создание..." : "Создать"}
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-5 py-4 text-xl font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => {
                        setToggleCreateColumn(false);
                        setColumnName("");
                      }}
                      ref={cancelButtonRef}
                    >
                      Отменить
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default React.memo(CreateColumn);

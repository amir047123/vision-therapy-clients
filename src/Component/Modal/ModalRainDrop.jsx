import { Icon } from "@iconify/react";
import React from "react";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";

const ModalRainDrop = ({ isOpen, onRequestClose }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed z-50 inset-0 overflow-y-auto"
      aria-hidden="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              data-behavior="cancel"
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={onRequestClose}
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
              <Icon className=" text-2xl" icon="icon-park:game-three"></Icon>
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                className="text-lg leading-6  font-bold text-gray-900"
                id="modal-headline"
              >
                Instructions
              </h3>
              <div className="mt-2">
                <ul className="list-disc list-inside">
                  <li className="text-sm text-gray-500">
                    Patch your better eye.
                  </li>
                  <li className="text-sm text-gray-500">
                    Slide the white line with your mouse/mousepad such that the
                    falling drops pass through the gap between the lines.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <Link to="/userDashboard/game/rain-drop">
              {" "}
              <button
                type="button"
                data-behavior="commit"
                className="w-full inline-flex justify-center items-center gap-2 rounded-md border border-transparent shadow-sm px-4 py-2  bg-primary text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2   sm:ml-3 sm:w-auto sm:text-sm"
              >
                <Icon icon="ph:play-fill"></Icon>
                Start
              </button>
            </Link>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default ModalRainDrop;

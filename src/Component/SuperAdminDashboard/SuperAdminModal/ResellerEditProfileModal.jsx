import { Switch } from "@headlessui/react";
import { Icon } from "@iconify/react";
import bcrypt from "bcryptjs";
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { toast } from "react-toastify";
import UpdateHooks from "../../../Hooks/UpdateHooks";

const ResellerEditProfileModal = ({ resellerData, isOpen, closeModal }) => {
  const [account, setAccount] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = (event) => {
    event.preventDefault(); // Prevent the form from submitting

    // Basic password generation logic.
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let generatedPassword = "";
    for (let i = 0; i < 8; i++) {
      // Generates an 8-character password
      generatedPassword += chars[Math.floor(Math.random() * chars.length)];
    }
    setPassword(generatedPassword);
  };

  useEffect(() => {
    setAccount(resellerData?.isActive);
  }, [isOpen]);

  const handelUpdate = async (e) => {
    e.preventDefault();
    const name = e.target?.name.value;
    const email = e.target?.email.value;
    const dateOfBirth = e.target?.dateOfBirth.value;
    const phone = e.target?.phone.value;
    const hashedPassword = bcrypt.hashSync(password);

    await UpdateHooks(
      ` http://localhost:5000/api/v1/user/${resellerData?._id}`,
      {
        password: password ? hashedPassword : resellerData?.password,
        name: name,
        phone: phone,
        dateOfBirth: dateOfBirth,
        email: email,
      }
    );
    toast.success("Data updated !");
    closeModal();
  };

  const handelUpdateAccount = async () => {
    await UpdateHooks(
      ` http://localhost:5000/api/v1/user/${resellerData?._id}`,
      {
        isActive: !account,
      }
    );
    toast.success("Data updated !");
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
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
              onClick={closeModal}
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
          <div className="">
            <div className=" bg-white p-5 mt-5 rounded-md">
              {/* General Div */}

              <div>
                <div className=" flex justify-between items-center">
                  <div className="mt-2 flex items-center">
                    <Switch
                      checked={account}
                      onClick={handelUpdateAccount}
                      onChange={setAccount}
                      className={`${
                        account ? "bg-secondary/80" : "bg-secondary/30"
                      }
          relative inline-flex h-6 w-[50px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                    >
                      <span className="sr-only">Use setting</span>
                      <span
                        aria-hidden="true"
                        className={`${
                          account ? "translate-x-6" : "translate-x-0"
                        }
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                      />
                    </Switch>
                    <label
                      className="inline-block pl-2 text-lg font-semibold text-black"
                      htmlFor="flexSwitchCheckDefault"
                    >
                      Account
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {/* second div */}

            <div className=" mt-3">
              <form onSubmit={handelUpdate}>
                <div className="relative flex items-center mb-4">
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="border p-2 w-full pl-10"
                    defaultValue={resellerData?.name}
                  />
                  <Icon
                    icon="mdi:user"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                  />
                </div>

                <div className="relative flex items-center mb-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="border p-2 w-full pl-10"
                    defaultValue={resellerData?.email}
                  />
                  <Icon
                    icon="ic:baseline-email"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                  />
                </div>

                <div className="relative flex items-center mb-4">
                  <input
                    type="date"
                    name="dateOfBirth"
                    placeholder="Date of birth"
                    className="border p-2 w-full pl-10"
                    defaultValue={resellerData?.dateOfBirth}
                  />
                  <Icon
                    icon="ph:calendar-fill"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                  />
                </div>
                <div className="relative flex items-center mb-4">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    className="border p-2 w-full pl-10"
                    defaultValue={resellerData?.phone}
                  />
                  <Icon
                    icon="fluent:call-20-filled"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={password}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Type or generate password"
                    className="border p-2 w-full pl-24 pr-2"
                  />
                  <button
                    onClick={generatePassword}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-secondary text-white hover:bg-secondary/90 rounded-l-md"
                  >
                    Generate
                  </button>
                </div>

                <button
                  type="submit"
                  className="px-3 py-2 mt-6 rounded-md bg-secondary text-white hover:bg-secondary/90 hover:scale-105 duration-300 block ml-auto "
                >
                  Update !
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default ResellerEditProfileModal;

import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(" http://localhost:5000/api/v1/contacts");
        const data = await response.json();
        setContacts(data);
        setLoading(false);
      } catch (error) {
        console.log("Error", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);
  console.log(contacts);

  const deleteContact = async (_id) => {
    const userConfirmation = window.confirm(
      "Are you sure you want to delete this contact?"
    );

    if (!userConfirmation) return;

    try {
      const response = await fetch(
        ` http://localhost:5000/api/v1/contacts/${_id}`,
        {
          method: "DELETE",
        }
      );

      const responseData = await response.json();
      //   console.log("Delete Response:", responseData);n
      toast.success("Delete Successfully");

      if (response.ok) {
        const updatedContacts = contacts.filter(
          (contact) => contact._id !== _id
        );
        setContacts(updatedContacts);
      } else {
        console.error("Failed to delete contact");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };
  return (
    <div>
      <div className="w-full overflow-x-auto mt-10">
        <table
          className="w-full text-left rounded w-overflow-x-auto "
          cellSpacing="0"
        >
          <tbody>
            <tr>
              <th
                scope="col"
                className="h-16 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100"
              >
                Name
              </th>
              <th
                scope="col"
                className="h-16 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100"
              >
                Email
              </th>
              <th
                scope="col"
                className="h-16 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100"
              >
                City
              </th>
              <th
                scope="col"
                className="h-16 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100"
              >
                Phone
              </th>

              <th
                scope="col"
                className="h-16 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100"
              >
                Message
              </th>
              <th
                scope="col"
                className="h-16 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100"
              >
                Action
              </th>
            </tr>
            {contacts.map((contact) => (
              <tr key={contact.id} className="shadow">
                <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500">
                  {contact.name}
                </td>
                <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500">
                  {contact.email}
                </td>
                <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500">
                  {contact.city}
                </td>
                <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500">
                  {contact.phonenumber}
                </td>
                <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500">
                  {contact.message}
                </td>
                <td className="h-16 px-6  transition duration-300 border-slate-200  text-secondary text-lg flex gap-2 items-center cursor-pointer">
                  <button
                    aria-label="Open delete confirmation"
                    className="border border-secondary py-2 px-3 rounded-md hover:bg-secondary/10 duration-300"
                    onClick={() => deleteContact(contact._id)}
                  >
                    <Icon icon="material-symbols:delete-outline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactsList;

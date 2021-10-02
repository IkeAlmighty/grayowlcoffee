import { useEffect, useState } from "react";
import Authorized from "../../components/Authorized";
import MongoField from "../../components/MongoField";
import styles from "./styles.module.css";

export default function Admin() {
  const [admins, setAdmins] = useState([]);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  async function addAdmin() {
    if (newName === "" || newEmail === "") return;
    let document = { name: newName, email: newEmail };

    //TODO do not add if the user is already in the list
    setAdmins([document, ...admins]);

    setNewEmail("");
    setNewName("");

    await fetch(`/api/db/mongodb`, {
      method: "POST",
      body: JSON.stringify({
        query: { email: newEmail },
        document,
        collection: "admin-users",
      }),
    });
  }

  async function removeAdmin(query) {
    const res = await fetch(`/api/db/mongodb`, {
      method: "DELETE",
      body: JSON.stringify({ collection: "admin-users", document: query }),
    });

    const json = await res.json();

    setAdmins(admins.filter((a) => a.email !== json.email));
  }

  async function getAdmins() {
    const res = await fetch(`/api/db/mongodb?collection=admin-users`);
    const json = await res.json();
    return json;
  }

  useEffect(async () => {
    let res = await getAdmins();
    setAdmins(res);
  }, []);

  return (
    <Authorized>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addAdmin();
        }}
      >
        <input
          id="newName"
          type="text"
          placeholder="name"
          value={newName}
          onChange={(e) => {
            setNewName(e.target.value);
          }}
        />
        <input
          type="email"
          placeholder="email"
          value={newEmail}
          onChange={(e) => {
            setNewEmail(e.target.value);
          }}
        />
        <input type="submit" value="Add Admin" />
      </form>
      {admins.map((admin) => {
        let query = { email: admin.email };
        return (
          <div key={admin.email} className={styles.adminInfo}>
            <div className={styles.adminFormElement}>
              <MongoField
                initial={admin.name}
                collection="admin-users"
                query={query}
                field="name"
              />
            </div>
            |
            <div className={styles.adminFormElement}>
              <MongoField
                initial={admin.email}
                collection="admin-users"
                query={query}
                field="email"
              />
            </div>
            <div className={styles.adminFormElement}>
              <input
                type="button"
                value="Delete"
                onClick={() => {
                  removeAdmin(admin);
                }}
              />
            </div>
          </div>
        );
      })}
    </Authorized>
  );
}

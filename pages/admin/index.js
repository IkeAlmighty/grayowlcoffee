import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Authorized from "../../components/Authorized";
import MongoField from "../../components/MongoField";
import S3Upload from "../../components/S3Upload";
import S3Image from "../../components/S3Image";
import styles from "./index.module.css";
import Link from "next/link";

export default function Admin({ session }) {
  const [admins, setAdmins] = useState([]);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const [showAdminPanel, setShowAdminPanel] = useState(false);

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

  useEffect(() => {
    async function fetchAndSetAdmins() {
      let res = await getAdmins();
      setAdmins(res);
    }

    fetchAndSetAdmins();
  }, []);

  return (
    <Authorized>
      <div className="container my-3">
        <h2>
          Welcome to the ADMINISTRATION console, Barista-
          {session?.user.name.split(" ")[1]}
        </h2>
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
        {showAdminPanel &&
          admins.map((admin) => {
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
        <input
          onClick={() => setShowAdminPanel(!showAdminPanel)}
          type="button"
          value={`${showAdminPanel ? "Hide" : "Show"} Users`}
        />
        <hr />

        <S3Upload
          label="Choose Marquee Image"
          onUpload={(val) => {
            console.log(val);
          }}
        />
        <span className="text-white bg-danger mx-2">
          (make sure to name the file &apos;marqueeimg.jpeg&apos;, until Isaac
          fixes this)
        </span>
        <div style={{ maxWidth: "400px", margin: "10px" }}>
          <S3Image imageKey="marqueeimg.jpeg" />
        </div>

        <hr />

        <S3Upload
          label="Choose Catering Image"
          onUpload={(val) => {
            console.log(val);
          }}
        />
        <span className="text-white bg-danger mx-2">
          (make sure to name the file &apos;catering-img.jpeg&apos;, until Isaac
          fixes this)
        </span>
        <div style={{ maxWidth: "400px", margin: "10px" }}>
          <S3Image imageKey="catering-img.jpeg" />
        </div>

        <div className="m-2">
          <Link href="/admin/events">
            <a>
              <h3>Click Here to Manage Shop Events</h3>
            </a>
          </Link>
        </div>
      </div>
    </Authorized>
  );
}

export async function getServerSideProps(context) {
  return { props: { session: await getSession(context) } };
}

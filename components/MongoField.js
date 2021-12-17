import { useSession } from "next-auth/client";
import { useEffect, useState } from "react";

export default function MongoField({
  initial,
  collection,
  field,
  query,
  className,
  style,
}) {
  const [value, setValue] = useState(undefined);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [session, loading] = useSession();

  async function updateDatabaseValue(e) {
    e.preventDefault();
    setEditModalVisible(false);
    try {
      // hit up mongodb and update the value!
      await fetch(`/api/db/mongodb`, {
        method: "POST",
        body: JSON.stringify({
          collection,
          value,
          field,
          query,
        }),
      });
    } catch (error) {}
  }

  async function readDatabaseValue(collection, field, query) {
    let res = await fetch(
      `/api/db/mongodb?query=${JSON.stringify(
        query
      )}&field=${field}&collection=${collection}`,
      {
        method: "GET",
      }
    );

    let json = await res.json();

    return json;
  }

  useEffect(async () => {
    if (!initial) {
      const val = await readDatabaseValue(collection, field, query);
      setValue(val);
    } else {
      setValue(initial);
    }
  }, []);

  if (session && session.isAdmin) {
    return (
      <>
        <span
          className={className}
          style={style ? style : { cursor: "pointer", color: "blue" }}
          onClick={() => {
            setEditModalVisible(true);
          }}
        >
          {value}
        </span>
        {editModalVisible && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100vh",
              backgroundColor: "black",
              opacity: 0.8,
            }}
          >
            <div
              style={{
                position: "fixed",
                top: "20%",
                left: 0,
                width: "100%",
                textAlign: "center",
              }}
            >
              <form onSubmit={(e) => updateDatabaseValue(e)}>
                <input
                  type="text"
                  placeholder={value ? value : "Loading..."}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                />
                <input type="submit" value="Submit Change" />
                <input
                  type="button"
                  value="Cancel"
                  onClick={() => {
                    setEditModalVisible(false);
                  }}
                />
              </form>
            </div>
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        <span className={className}>{value}</span>
      </>
    );
  }
}

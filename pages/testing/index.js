import MongoDoc from "../../components/MongoDoc";

export default function Testing() {
  return (
    <MongoDoc
      collection="admin-users"
      field="name"
      query={{ email: "isaacyates7@gmail.com" }}
    />
  );
}

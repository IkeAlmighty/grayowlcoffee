import { connectToDatabase } from "../../../lib/mongodb";
import { getSession } from "next-auth/client";
import { ObjectID } from "mongodb";

export default async (req, res) => {
  const session = await getSession({ req });

  const { db } = await connectToDatabase();

  if (req.method === "POST") {
    if (session && session.isAdmin) {
      let { collection, query, document, field, value } = JSON.parse(req.body);
      // reinitialize the _id field since it is not parsed correctly:
      if (query?._id) {
        let objectId = ObjectID(query._id);
        query._id = objectId;
      }

      if (!field || !value) {
        await db
          .collection(collection)
          .updateOne(query, { $set: document }, { upsert: true });
      } else {
        let res = await db
          .collection(collection)
          .updateOne(query, { $set: { [field]: value } }, { upsert: true });
      }
    } else {
      // not signed in as an admin
      res.status(401).end();
    }
  } else if (req.method === "GET") {
    const { query, field, collection } = req.query;
    // delete the _id field since it is never parsed correctly:
    if (query) delete query._id;

    // if no collection is defined, then 401
    if (!collection) {
      res.status(401).send("Collection must be defined");
      return;
    }

    if (!query) {
      if (!field) {
        // return a list of all docs in collection
        let mongores = await db.collection(collection).find({}).toArray();
        res.json(mongores);
      } else {
        // return a list of all of 'field'
        // from all docs in collection
        let mongores = await db.collection(collection).find({}).toArray();
        let fieldlist = mongores.map((doc) => doc[field]);
        res.json(fieldlist);
      }
    } else {
      if (!field) {
        // return all docs matching the query
        let mongores = await db.collection(collection).find(query).toArray();
        res.json(mongores);
      } else {
        // return all of 'field' from all docs
        // matching the query
        let mongores = await db.collection(collection).find(query).toArray();
        let fieldlist = mongores.map((doc) => doc[field]);
        res.json(fieldlist);
      }
    }
  } else if (req.method === "DELETE") {
    if (session && session.isAdmin) {
      const { document, collection } = JSON.parse(req.body);

      // since this is not parsed correctly, it needs removed
      // before mongo can read the delete filter:
      if (document) delete document._id;

      if (!document || !collection) {
        res.status(400).send("collection and document must be specified");
      } else {
        // grab the doc that is being deleted to return it:
        let deletedDoc = await db.collection(collection).findOne(document);
        await db.collection(collection).deleteOne(document);
        res.json(deletedDoc);
      }
    } else {
      res.status(401).send("not authorized");
    }
  }

  res.status(202).end();
};

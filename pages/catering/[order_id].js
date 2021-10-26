import { connectToDatabase } from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import Authorized from "../../components/Authorized";
import GrayOwlHeader from "../../components/GrayOwlHeader";
import MongoField from "../../components/MongoField";

export default function Order({ order }) {
  return (
    <Authorized>
      {/* <GrayOwlHeader /> */}
      <div className="with-header go-container p-1">
        <div className="d-block">
          <span className="mx-3">Order: </span>
          <MongoField
            collection="catering-orders"
            query={{ _id: order._id }}
            field="order"
          />
        </div>
      </div>
    </Authorized>
  );
}

export async function getServerSideProps(context) {
  const { order_id } = context.params;

  const { db } = await connectToDatabase();

  let order = await db
    .collection("catering-orders")
    .findOne({ _id: new ObjectId(order_id) });

  // convert the id field to a string so that it can be serialized:
  order._id = order_id;

  return { props: { order } };
}

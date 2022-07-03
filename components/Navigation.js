import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navigation({ session }) {
  return (
    <div className="header">
      <span className="text-3xl float-left m-3">Gray Owl Coffee</span>
      {session && (
        <span className="text-sm m-2 float-right">
          <Link href="/api/auth/signout">
            <a>Sign Out</a>
          </Link>
        </span>
      )}
    </div>
  );
}

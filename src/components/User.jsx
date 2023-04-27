import React from "react";

export default function User({ user: { photoURL, displayName } }) {
  return (
    <>
      <img
        src={photoURL}
        alt={displayName}
        className="w-8 h-8 rounded-full mr-2 shrink"
        referrerPolicy="no-referrer"
      />
    </>
  );
}

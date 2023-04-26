import React from "react";

export default function User({ user: { photoURL, displayName } }) {
  return (
    <div className="flex items-center pl-2 shrink-0">
      <img
        src={photoURL}
        alt={displayName}
        className="w-10 h-10 rounded-full mr-2 shrink"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

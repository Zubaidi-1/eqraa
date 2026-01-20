"use client";

import { deleteListing } from "@/actions/listing/listingActions";
import { useState } from "react";

export default function DeleteListing({ listing }) {
  const [errorMessage, setErrorMessage] = useState();

  const deletes = async (listing) => {
    const { error } = await deleteListing(listing);
    if (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="mt-3">
      <button
        onClick={() => deletes(listing)}
        className="w-full rounded-lg border border-red-600 text-red-600 py-2 text-sm font-semibold
                   hover:bg-red-600 hover:text-white transition duration-200
                   focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        إزالة الإعلان
      </button>

      {errorMessage && (
        <p className="mt-2 text-red-500 text-xs text-center">{errorMessage}</p>
      )}
    </div>
  );
}

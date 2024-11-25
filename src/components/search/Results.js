import React from "react";
import ProfileHeader from "../utils/ProfileHeader";
import Link from "next/link";
import Post from "../utils/Post";
import LoadingIcon from "../icons/Loading";

const types = {
  all: 0,
  users: 1,
};

const Results = ({
  results,
  type,
  userSearchClickHandler,
  noResults,
  loading,
}) => {
  if (loading) {
    return (
      <div className="mt-8 text-center text-gray-400 flex justify-center items-center">
        <LoadingIcon />
      </div>
    );
  }

  if (noResults) {
    return (
      <div className="mt-8 text-center text-gray-400">
        Start typing to search...
      </div>
    );
  }
  if (results.users.length === 0 && results.posts.length === 0) {
    return (
      <div className="mt-8 text-center text-gray-400">No results found...</div>
    );
  }
  return (
    <div>
      {type === types.all && (
        <div className="flex flex-col gap-4 mt-8">
          {results.users.slice(0, 4).map((user, i) => (
            <ProfileHeader key={i} user={user} />
          ))}

          {results.users.length > 4 && (
            <Link
              href="#"
              className="text-center text-gray-400"
              onClick={(e) => {
                e.preventDefault();
                userSearchClickHandler();
              }}
            >
              See more...
            </Link>
          )}

          <div className="p-2" />

          {results.posts.map((post, i) => (
            <Post key={i} postData={post} />
          ))}
        </div>
      )}

      {type === types.users && (
        <div className="flex flex-col gap-4 mt-8">
          {results.users.map((user, i) => (
            <ProfileHeader key={i} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Results;

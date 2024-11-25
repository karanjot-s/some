import Results from "@/components/search/Results";
import SearchBar from "@/components/utils/SearchBar";
import SelectionBox from "@/components/utils/SelectionBox";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const types = {
  all: 0,
  users: 1,
};

const Search = () => {
  // TODO: add pagination

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [prevQuery, setPrevQuery] = useState(query);
  const [results, setResults] = useState({ users: [], posts: [] });
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(types.all);

  // add search to query
  const router = useRouter();
  const { q, t } = router.query;

  useEffect(() => {
    console.log("useEffect 1");
    if (q) {
      setQuery(q);
    }

    if (t === "u") {
      setType(types.users);
    }
  }, [q, t]);

  const userSearchClickHandler = () => {
    setType(types.users);
    router.push(`/search?q=${debouncedQuery}&t=u`);
  };

  // debounce the query
  useEffect(() => {
    console.log("useEffect 2");
    if (query !== prevQuery) {
      const handler = setTimeout(() => {
        setDebouncedQuery(query);
        setPrevQuery(query);
      }, 300);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [query, prevQuery]);

  useEffect(() => {
    console.log("useEffect 3");
    if (debouncedQuery) {
      router.push(
        `/search?q=${debouncedQuery}${type === types.users ? "&t=u" : ""}`,
        undefined,
        { shallow: true }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  // fetch the results
  useEffect(() => {
    console.log("useEffect 4");
    if (!debouncedQuery) {
      setResults({ users: [], posts: [] });
      return;
    }

    const fetchResults = async () => {
      // set the URL based on the type
      const url = type === types.all ? "/all" : "/users";
      const server = process.env.NEXT_PUBLIC_SERVER_URL + "/search";

      setLoading(true);
      try {
        await axios.get(server + url + `?q=${debouncedQuery}`).then((res) => {
          console.log(res.data);
          setResults(res.data);
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    // fetch the results
    fetchResults();
  }, [debouncedQuery, type]);

  return (
    <div className="pt-8 mx-auto w-full md:w-[35rem]">
      <SearchBar
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="!w-full"
      />

      <SelectionBox
        item={type}
        allItems={[
          { text: "All", value: types.all },
          { text: "Users", value: types.users },
        ]}
        changeItem={setType}
        className={"w-full !bg-transparent !py-2 !mt-10 !px-0"}
      />

      <Results
        results={results}
        type={type}
        userSearchClickHandler={userSearchClickHandler}
        noResults={
          results.posts.length === 0 &&
          results.users.length === 0 &&
          debouncedQuery.length === 0
        }
        loading={loading}
      />
    </div>
  );
};

export default Search;

import { useState } from "react";

import styleSearch from "./search.module.css";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // console.log(query); 
    
    // const response = await fetch(`https://api.example.com/search?q=${query}`);
    // const data = await response.json();
    // setResults(data.results);
  };

  return (
    <form className={styleSearch.searchForm} onSubmit={handleSubmit}>
      <input className={styleSearch.searchInput} placeholder="Buscar" type="text" value={query} onChange={(event) => setQuery(event.target.value)} />
      {/* <button className={styleSearch.searchButton} type="submit">Buscar</button> */}
      {/* {results.map((result) => (
        <div key={result.id}>
          <h2>{result.title}</h2>
          <p>{result.description}</p>
        </div>
      ))} */}
    </form>
  );
}

export default Search;

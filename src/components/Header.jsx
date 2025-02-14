import React, { useState } from "react";

const Header = (props) => {
  const [searchId, setSearchId] = useState("");
  const handleChange = (e) => {
    setSearchId(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSearch(searchId);
    console.log(searchId);
  };
  return (
    <div>
      <header>
        <h1>Let's do it.</h1>
        <div>
          <form id="searchform" onSubmit={handleSubmit}>
            <input
              type="text"
              value={searchId}
              placeholder="Search by Id"
              onChange={handleChange}
              required
            />
            <button type="submit">
              <i class="fa fa-search"></i>
            </button>
          </form>
        </div>
      </header>
    </div>
  );
};

export default Header;

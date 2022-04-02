import React from "react";
import { useState } from "react";
import { Search } from "@chatscope/chat-ui-kit-react";
import * as api from "../../mocks/api/WazzupServerLib.js";

const UserSearch = (props) => {
  const searchUser = (v) => {
    setValue(v);
    let user = api.searchUser(value);
    console.log(user);
    props.setUsers([user]);
  };

  const [value, setValue] = useState("");
  return <Search placeholder="Search..." value={value} onChange={searchUser} onClearClick={() => setValue("")} />;
};

export default UserSearch;

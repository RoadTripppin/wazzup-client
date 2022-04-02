import React from "react";
import { Search } from "@chatscope/chat-ui-kit-react";
import * as api from "../../mocks/api/WazzupServerLib.js";
import * as _ from "lodash";

const UserSearch = (props) => {
  const searchUser = () => {
    let user = api.searchUser(value);
    props.setUsers([]);
    () => setValue("");
  };

  const [value, setValue] = useState("Search ...");
  return <Search placeholder="Search..." value={value} onChange={(v) => setValue(v)} onClearClick={searchUser} />;
};

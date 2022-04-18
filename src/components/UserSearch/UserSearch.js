import React from "react";
import { useState } from "react";
import { Search } from "@chatscope/chat-ui-kit-react";
import * as api from "../../mocks/api/WazzupServerLib.js";
import * as _ from "lodash";

const UserSearch = (props) => {
  const searchUser = (v) => {
    setValue(v);
    let user = api.searchUser(value);
    if (!_.isNull(props.users) && _.isArray(props.users)) {
      props.setUsers([user, ...props.users]);
    }
  };

  const [value, setValue] = useState("");
  return <Search placeholder="Search..." value={value} onChange={searchUser} onClearClick={() => setValue("")} />;
};

export default UserSearch;

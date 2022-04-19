import React from "react";
import { useState } from "react";
import { Search } from "@chatscope/chat-ui-kit-react";
import * as api from "../../mocks/api/WazzupServerLib.js";
import * as _ from "lodash";

const UserSearch = (props) => {
  const searchUser = async (v) => {
    setValue(v);
    let response = api.searchUser(value);
    if (!_.isNull(props.users) && _.isArray(props.users) && _.size(response.users) == 1) {
      let user = response.users[0];
      await api.initChatRoom(user.id);
      props.setUsers([user, ...props.users]);
    }
  };

  const [value, setValue] = useState("");
  return <Search placeholder="Search..." value={value} onChange={searchUser} onClearClick={() => setValue("")} />;
};

export default UserSearch;

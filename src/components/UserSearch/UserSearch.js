import React from "react";
import * as api from "../../mocks/api/WazzupServerLib.js";
import * as _ from "lodash";

const UserSearch = () => {
  const [value, setValue] = useState("Search ...");
  return <Search placeholder="Search..." value={value} onChange={(v) => setValue(v)} onClearClick={searchUser} />;
};

const searchUser = () => {
  let user = api.searchUser(value);
  let chat_id = api.initChat(_.get(user, "user_id"));
  () => setValue("");
};

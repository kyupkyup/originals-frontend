import ProfilePresenter from "./ProfilePresenter";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useQuery, useMutation } from "react-apollo-hooks";
import { GET_USER, LOG_OUT } from "./ProfileQueries";

export default withRouter(
  ({
    match: {
      params: { email }
    }
  }) => {
    const { refetch, data, loading } = useQuery(GET_USER, {
      variables: { email }
    });
    const [logUserOut] = useMutation(LOG_OUT);
    const [action, setAction] = useState("bulletin");
    const [editAction, setEditAction] = useState("Profile");
    const [update, setUpdate] = useState(false);

    const editProfile = async () => {
      if (editAction === "Profile") {
        await setEditAction("Edit");
      } else if (editAction === "Edit") {
        await setEditAction("Profile");
      }
    };

    return (
      <ProfilePresenter
        loading={loading}
        logOut={logUserOut}
        data={data}
        action={action}
        setAction={setAction}
        editAction={editAction}
        editProfile={editProfile}
        update={update}
        setUpdate={setUpdate}
        refetch={refetch}
      />
    );
  }
);

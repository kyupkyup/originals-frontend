import ProfilePresenter from "./ProfilePresenter";
import React from "react";
import { withRouter } from "react-router-dom";
import { useQuery, useMutation } from "react-apollo-hooks";
import { GET_USER, LOG_OUT } from "./ProfileQueries";

export default withRouter(
  ({
    match: {
      params: { email }
    }
  }) => {
    const { data, loading } = useQuery(GET_USER, {
      variables: { email }
    });
    const [logUserOut] = useMutation(LOG_OUT);
    return (
      <ProfilePresenter loading={loading} logOut={logUserOut} data={data} />
    );
  }
);

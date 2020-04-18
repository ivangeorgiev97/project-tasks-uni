import { useEffect } from "react";
import { connect } from "react-redux";
import { useStore } from "react-redux";
import { useHistory } from 'react-router-dom';
import { setCurrentUser } from "../../../store/users/actions";

const Logout = ({ dispatch }) => {
    const store = useStore();
    const currentActiveUser = store.getState().users.currentUser;
    const history = useHistory();

    useEffect(() => {
        // Check if user is logged in and redicrect to login page if the user is not logged
        if (currentActiveUser && Object.keys(currentActiveUser).length === 0) {
          // Redirect user to login page
          history.push('/login')
        }
      });

      dispatch(setCurrentUser({}));
      // Redirect user to login
      window.location.reload()

      return (
         null
      );
}

export default connect()(Logout);

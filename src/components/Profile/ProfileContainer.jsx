import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getUserProfile, getStatus, updateStatus } from "../../redux/profile-reducer";
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';
import { compose } from 'redux';


class ProfileContainer extends React.Component {


   componentDidMount() {
      let userId = this.props.router.params.userId;
      if (!userId) {
         userId = this.props.authorizedUserId;
      }
      // if (!userId) {

      //    this.props.navigate('/login');

      // }
      this.props.getUserProfile(userId);
      this.props.getStatus(userId)
   }

   componentDidUpdate(prevProps) {
      let userId = this.props.router.params.userId;
      if (prevProps.router.params.userId !== userId) {
         userId = this.props.authorizedUserId;
      }
      this.props.getUserProfile(userId);
      this.props.getStatus(userId)
   }

   render() {
      return (
         <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} />
      )
   }
}

export const withNavigate = (Component) => {
   let RedirectTo = (props) => {
      return < Component {...props} navigate={useNavigate()} />
   }
   return RedirectTo;
}


function withRouter(Component) {
   function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
         <Component
            {...props}
            router={{ location, navigate, params }}
         />
      );
   }

   return ComponentWithRouterProp;

}

let mapStateToProps = (state) => ({
   profile: state.profilePage.profile,
   status: state.profilePage.status,
   authorizedUserId: state.auth.userId,
   isAuth: state.auth.isAuth
})


export default compose(connect(mapStateToProps, { getUserProfile, getStatus, updateStatus }), withNavigate, withRouter, withAuthNavigate)(ProfileContainer);

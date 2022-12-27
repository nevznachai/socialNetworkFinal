import React from 'react';
import Preloader from '../../Common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = ({ profile, status, updateStatus }) => {

  if (!profile) {
    return (
      <Preloader />
    )
  }

  return (
    <div className={s.item}>
      {/* <img src='https://s5s6c2i4.stackpathcdn.com/wp-content/uploads/2021/08/img_testata_pag_beach_villa-1.jpg' /> */}
      <div className={s.descriptionBlock}>
        < img src={profile.photos.large} />
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
    </div>
  )
}


export default ProfileInfo;
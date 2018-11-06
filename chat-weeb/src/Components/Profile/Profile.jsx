import React from 'react';
import moment from 'moment';

const Profile = ({profile, online}) => {
    return (
        <div>
            {online ? <img src={profile.avatarUrl} style={{borderRadius:"25px", width:"50px", height:"50px", borderWidth:"unset", borderColor:"aqua", borderStyle:"solid"}} alt="avatarUrl" />
            : <img src={profile.avatarUrl} style={{borderRadius:"25px", width:"50px", height:"50px"}} alt="avatarUrl" /> }
            <div className="about">
                <div className="name">{profile.displayName}</div>
                <div className="status">
                {online ? <i className="fa fa-circle online" />: <i className="fa fa-circle offline" />}
                {online ? 'online': 'online ' + moment(profile.lastOnline).fromNow()}
                </div>
            </div>
        </div>
    )
}

export default Profile
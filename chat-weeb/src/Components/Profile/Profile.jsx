import React from 'react';


const Profile = ({profile}) => {
    return (
        <div>
            <img src={profile.avatar} style={{borderRadius:"25px", width:"50px", height:"50px"}} alt="avatar" />
            <div className="about">
                <div className="name">{profile.username}</div>
                <div className="status">
                    <i className="fa fa-circle online" /> online
                </div>
            </div>
        </div>
    )
}

export default Profile
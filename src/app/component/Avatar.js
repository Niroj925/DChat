import React from 'react';

const Avatar = ({ src, alt}) => {
  return (
    <div className="avatar">
      <img src={src} alt={alt} />

      <style jsx>{`
        .avatar {
          width: 75px;
          height: 75px;
          border-radius: 50%;
          overflow: hidden;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
};

export default Avatar;

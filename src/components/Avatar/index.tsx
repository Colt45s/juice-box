import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { AvatarWrapper } from './avatarWrapper';

type Props = {
  src?: string;
  size: number;
};

export function Avatar(props: Props) {
  return (
    <AvatarWrapper size={props.size}>
      {props.src ? (
        <img
          style={{
            maxWidth: '100%',
            width: props.size,
            height: props.size
          }}
          src={props.src}
        />
      ) : (
        <FontAwesomeIcon icon={faUserCircle} style={{ fontSize: props.size }} />
      )}
    </AvatarWrapper>
  );
}

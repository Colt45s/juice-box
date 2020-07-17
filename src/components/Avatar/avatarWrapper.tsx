import React, { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  size: number;
};

export function AvatarWrapper(props: Props) {
  return (
    <div
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        width: props.size,
        height: props.size
      }}
    >
      {props.children}
    </div>
  );
}

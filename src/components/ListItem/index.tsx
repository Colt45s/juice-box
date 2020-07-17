import React, { ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
  key: string | number;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

export function ListItem(props: Props) {
  return <StyledListItem {...props} />;
}

const StyledListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5em;

  ${(props: any) =>
    typeof props.onClick === 'undefined'
      ? ''
      : `cursor: pointer;
         &:hover {
          > div:not(:first-child) {
            font-weight: bold;
            color: #106ba3;
          }
        }`}
`;

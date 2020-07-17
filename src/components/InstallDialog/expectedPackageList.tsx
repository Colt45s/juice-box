import React from 'react';
import { Package } from '../../hooks/useNpmPackageSearcher';
import { AuthorAvatar } from './authorAvator';
import ReactList from 'react-list';
import { ListItem } from '../ListItem';
import styled from 'styled-components';

type Props = {
  packageList: Package[];
  handleSelectPackage: (packageInfo: any) => void;
};

export function ExpectedPackageList(props: Props) {
  return (
    <ListWrapper>
      <ReactList
        itemRenderer={(index: number, key: any) => {
          const packageInfo = props.packageList[index];
          return (
            <ListItem
              key={key}
              onClick={() => props.handleSelectPackage(packageInfo)}
            >
              <AuthorAvatar repository={packageInfo.repository} />
              <div style={{ padding: '0 1em' }}>
                <span>
                  {packageInfo.name}@{packageInfo.version}
                </span>
              </div>
            </ListItem>
          );
        }}
        length={props.packageList.length}
        type="uniform"
      />
    </ListWrapper>
  );
}

const ListWrapper = styled.div`
  max-height: 270px;
  margin: 1em 0;
  overflow: auto;
`;

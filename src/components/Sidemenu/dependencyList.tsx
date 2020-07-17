import React from 'react';
import styled from 'styled-components';

type Props = {
  installedPackages: Map<string, { version: string; latest: string }>;
};

export function DependencyList(props: Props) {
  return (
    <ListWrapper>
      {Array.from(props.installedPackages.keys()).map(
        (packageName: string, index: number) => {
          const value = props.installedPackages.get(packageName);
          const name = value ? `${packageName}@${value.version}` : packageName;
          return (
            <div key={index} style={{ color: '#dfb07a' }}>
              {name}
            </div>
          );
        }
      )}
    </ListWrapper>
  );
}

const ListWrapper = styled.div`
  max-height: 320px;
  margin: 1em 0;
  overflow: auto;
`;

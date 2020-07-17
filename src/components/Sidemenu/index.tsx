import React from 'react';
import { DependencyList } from './dependencyList';
import { Button, Switch, Alignment, Divider } from '@blueprintjs/core';
import styled from 'styled-components';

type Props = {
  isDarkMode: boolean;
  installedPackages: Map<string, { version: string; latest: string }>;
  handleShowDialog: () => void;
  handleChangeTheme: () => void;
};

export function SideMenu(props: Props) {
  return (
    <SideMenuContent isDarkMode={props.isDarkMode}>
      <Switch
        alignIndicator={Alignment.RIGHT}
        large={true}
        labelElement={'Light Mode'}
        innerLabelChecked="ON"
        innerLabel="OFF"
        onChange={props.handleChangeTheme}
      />
      <Divider />
      <div>
        <h3>Dependencies</h3>
        <DependencyList installedPackages={props.installedPackages} />
      </div>
      <div>
        <Button style={{ width: '100%' }} onClick={props.handleShowDialog}>
          Add Dependency
        </Button>
      </div>
    </SideMenuContent>
  );
}

const SideMenuContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px;
  background-color: ${(props: { isDarkMode: boolean }) =>
    props.isDarkMode ? '#394b59' : '#fff'};
`;

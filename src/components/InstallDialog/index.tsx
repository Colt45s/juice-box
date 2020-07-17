import React, { ChangeEvent } from 'react';
import { Dialog, Classes, Button } from '@blueprintjs/core';
import { SearchInput } from './searchInput';
import { ExpectedPackageList } from './expectedPackageList';
import { Package } from '../../hooks/useNpmPackageSearcher';
import styled from 'styled-components';

type Props = {
  isDarkMode: boolean;
  isOpen: boolean;
  handleCloseDialog: () => void;
  handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSelectPackage: (packageInfo: any) => void;
  expectedPackages: Package[];
  foundPackagesCount: number;
  currentSearchValue: string;
};

const dialogState = {
  autoFocus: true,
  canEscapeKeyClose: true,
  canOutsideClickClose: true,
  enforceFocus: true,
  usePortal: true
};

export function InstallDialog(props: Props) {
  return (
    <Dialog
      className={props.isDarkMode ? Classes.DARK : ''}
      isOpen={props.isOpen}
      title="Install Dependencies"
      onClose={props.handleCloseDialog}
      {...dialogState}
    >
      <div className={Classes.DIALOG_BODY}>
        <SearchInput
          currentSearchValue={props.currentSearchValue}
          onChangeHandler={props.handleChangeInput}
        />
        <ExpectedPackageList
          packageList={props.expectedPackages}
          handleSelectPackage={props.handleSelectPackage}
        />
      </div>
      <StyledFooter className={Classes.DIALOG_FOOTER}>
        <Button onClick={props.handleCloseDialog} intent="none" text="Close" />
        {props.foundPackagesCount ? (
          <div>Found {props.foundPackagesCount} Packages</div>
        ) : null}
      </StyledFooter>
    </Dialog>
  );
}

const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

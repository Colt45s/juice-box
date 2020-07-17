import React, { useRef, useState, useCallback } from 'react';
import { Editor } from './editor';
import styled from 'styled-components';
import { SideMenu } from './Sidemenu';
import { InstallDialog } from './InstallDialog';
import { useNpmPackageSearcher } from '../hooks/useNpmPackageSearcher';
import { Classes } from '@blueprintjs/core';
import { useNpmInstaller } from '../hooks/useNpmInstaller';
import NotificationSystem, {
  System,
  Notification
} from 'react-notification-system';
import { Preview } from './Preview';

export function App() {
  const [code, setState] = useState('');
  const [isOpen, setDialogState] = useState(false);
  const [isDarkMode, setMode] = useState(true);

  const notificationSystem = useRef<System>(null);

  const addNotification = useCallback(
    (notification: {
      title: string;
      message: string;
      level: Notification['level'];
    }) => {
      // event.preventDefault();
      if (notificationSystem.current) {
        notificationSystem.current.addNotification({
          ...notification,
          position: 'bl'
        });
      }
    },
    []
  );

  const handleChangeCode = useCallback((value: string) => {
    setState(value);
  }, []);

  const handleShowDialog = useCallback(() => {
    setDialogState(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogState(false);
  }, []);

  const handleChangeTheme = useCallback(() => {
    setMode(prev => !prev);
  }, []);

  const {
    searchValue,
    expectedPackages,
    foundPackagesCount,
    handleChangeInput
  } = useNpmPackageSearcher();

  const { installedPackages, handleSelectPackage } = useNpmInstaller(
    addNotification
  );

  return (
    <div className={isDarkMode ? Classes.DARK : ''}>
      <Grid>
        <SideMenu
          isDarkMode={isDarkMode}
          installedPackages={installedPackages}
          handleShowDialog={handleShowDialog}
          handleChangeTheme={handleChangeTheme}
        />
        <Editor
          code={code}
          language={'javascript'}
          theme={isDarkMode ? 'vs-dark' : 'vs'}
          width={'50vw'}
          handleChangeCode={handleChangeCode}
        />
        <Preview code={code} packages={installedPackages} />
      </Grid>
      <InstallDialog
        isDarkMode={isDarkMode}
        isOpen={isOpen}
        currentSearchValue={searchValue}
        expectedPackages={expectedPackages}
        foundPackagesCount={foundPackagesCount}
        handleCloseDialog={handleCloseDialog}
        handleChangeInput={handleChangeInput}
        handleSelectPackage={handleSelectPackage}
      />
      <NotificationSystem ref={notificationSystem} />
    </div>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr 1fr;
  height: 100vh;
`;

import { useState, useCallback, useReducer } from 'react';
import { Package } from './useNpmPackageSearcher';
import { Notification } from 'react-notification-system';

export function useNpmInstaller(
  addNotification: (notification: {
    title: string;
    message: string;
    level: Notification['level'];
  }) => void
) {
  const [installedPackages, updateInstalledPackages] = useState<
    Map<string, { version: string; latest: string }>
  >(new Map());
  const [, forceRender] = useReducer(s => s + 1, 0);

  const handleSelectPackage = useCallback(async (packageInfo: Package) => {
    const { name, version, latest } = packageInfo;

    // addNotification({
    //   title: 'Install',
    //   message: `${name}@${version}`,
    //   level: 'info'
    // });

    addNotification({
      title: 'Add Package',
      message: `${name}@${version}`,
      level: 'info'
    });

    updateInstalledPackages(installedPackages.set(name, { version, latest }));
    forceRender({});
    // try {
    //   // fetch package from unpkg
    //   // const response = await fetch(latest);

    //   if (response.ok) {
    //     addNotification({
    //       title: 'Install Succeeded!',
    //       message: `${name}@${version}`,
    //       level: 'success'
    //     });

    //     const raw = await response.text();

    //     // update
    //     updateInstalledPackages(installedPackages.set(name, { version, raw }));
    //     forceRender({});
    //   } else {
    //     addNotification({
    //       title: 'Install Failed!',
    //       message: `${name}@${version}`,
    //       level: 'error'
    //     });
    //   }
    // } catch (error) {
    //   addNotification({
    //     title: 'Install Failed!',
    //     message: `${name}@${version}`,
    //     level: 'error'
    //   });
    // }
  }, []);

  return {
    installedPackages,
    handleSelectPackage
  };
}

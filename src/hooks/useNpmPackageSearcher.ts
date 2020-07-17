import { ChangeEvent, useState, useCallback } from 'react';
// import searchNpmRegistry from 'search-npm-registry';
import { useLayoutDebounce } from './useLayoutDebounce';

export type Package = {
  description: string;
  latest: string;
  repository?: {
    type: string;
    url: string;
  };
  name: string;
  version: string;
};

// export type Packagies = Package[];

export function useNpmPackageSearcher() {
  const [expectedPackages, setExpectedPackages] = useState<Package[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [foundPackagesCount, setFoundPackagesCount] = useState<number>(0);

  useLayoutDebounce(
    () => {
      const searchPackages = async (searchValue: string) => {
        if (!searchValue.length) {
          setExpectedPackages([]);
          setFoundPackagesCount(0);
          return;
        }

        const response = await fetch(
          `https://api.cdnjs.com/libraries?search=${searchValue}&fields=version,description,repository`
        );

        if (response.ok) {
          const body: {
            results: Package[];
            total: number;
          } = await response.json();

          setExpectedPackages(body.results);
          setFoundPackagesCount(body.total);
        }
      };

      searchPackages(searchValue);
    },
    0,
    [searchValue]
  );

  const handleChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);
  }, []);

  return {
    searchValue,
    expectedPackages,
    foundPackagesCount,
    handleChangeInput
  };
}

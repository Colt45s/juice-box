import React, { ChangeEvent } from 'react';
import { InputGroup } from '@blueprintjs/core';

type Props = {
  currentSearchValue: string;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function SearchInput(props: Props) {
  return (
    <InputGroup
      disabled={false}
      leftIcon="filter"
      placeholder={'Filter dependency...'}
      value={props.currentSearchValue}
      onChange={props.onChangeHandler}
    />
  );
}

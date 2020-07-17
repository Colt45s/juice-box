import React from 'react';
import { Package } from '../../hooks/useNpmPackageSearcher';
import { Avatar } from '../Avatar';

const regex = new RegExp('https://github.com/([^/]+)/');

type Props = {
  repository: Package['repository'];
};

export function AuthorAvatar(props: Props) {
  if (!props.repository) {
    return <Avatar size={40} />;
  }

  if (props.repository.type !== 'git') {
    return <Avatar size={40} />;
  }

  const matched = props.repository.url.match(regex);

  if (!matched) {
    return <Avatar size={40} />;
  }

  const author = matched[1];

  if (!author) {
    return <Avatar size={40} />;
  }

  return (
    <Avatar
      src={`https://avatars.githubusercontent.com/${author}?v=4&s=40`}
      size={40}
    />
  );
}

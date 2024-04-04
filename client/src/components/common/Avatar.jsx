import { useCallback } from 'react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import PropTypes from 'prop-types'

const CommonAvatar = ({userName , className=''}) => {
  const getName = useCallback(() => {
    const getUserName = (userName) => {
      const names = userName.split(' ');
      const firstLetters = names
        .map((name) => name[0])
        .join('')
        .toUpperCase();
      return firstLetters.substring(0, 2);
    };
    return getUserName(userName) 
  }, [userName]);
  return (
    <>
      <Avatar className={`border-2 hover:brightness-90 transition-all cursor-pointer ${className}`}>
        <AvatarFallback>{getName()}</AvatarFallback>
      </Avatar>
    </>
  );
};

CommonAvatar.propTypes = {
  userName : PropTypes.string,
  className : PropTypes.string,
}

export default CommonAvatar;

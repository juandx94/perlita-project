import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const COOKIE_NAME= 'accept_cookies_Terms_Privacy';

export const useAcceptCookies = () => {
  const [acceptedCookies, setAcceptedCookies] = useState(true);


  useEffect(()=> {
    if(!Cookies.get(COOKIE_NAME)) {
      setAcceptedCookies(false)
    }
  }, [])

  const acceptCookies = () => {
    setAcceptedCookies(true);
    Cookies.set(COOKIE_NAME, 'accepted', {expires: 350})
  }

  return {
    acceptedCookies,
    onAcceptCookies: acceptCookies,
  }
}


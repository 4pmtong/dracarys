import Cookies from 'js-cookie';

export const getUidByCookie = () => {
  const cookie_user_info = Cookies.get('user_info');
  const userInfo = !!cookie_user_info ? JSON.parse(cookie_user_info) : {};

  console.log(userInfo, cookie_user_info);
  if (!userInfo || !userInfo.uid) {
    window.location.href = '/google/login';
    return -1;
  }

  return userInfo.uid;
};

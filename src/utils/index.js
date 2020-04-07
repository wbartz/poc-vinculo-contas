import Cookie from 'js-cookie';

const inOneWeek = new Date(new Date().getTime() + 3600000 * 24 * 7);

const getCookie = cname => Cookie.get(cname);

const setCookie = (name, value, attr) =>
  Cookie.set(name, value, {
    path: '/',
    expires: inOneWeek,
    ...attr,
  });

const removeCookie = (name, attr) => {
  const hasCookie = getCookie(name) || false;
  if (hasCookie) {
    Cookie.remove(name, {
      path: '/',
      ...attr,
    });
  }
};

export { getCookie, setCookie, removeCookie };


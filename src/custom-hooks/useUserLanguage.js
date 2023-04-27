import { useSelector } from 'react-redux';
import i18n from '../i18n';

export default function useUserLanguage() {
  const user = useSelector((state) => state.user);
  const language = user?.language || 'ar';
  // language setter.
  function setUserLanguage(lang = 'en') {
    i18n.changeLanguage(lang);
    localStorage.setItem('langugae', lang);
    if (user?.language !== lang) {
      // dispatch(updateUser(user?._id, {language : lang}));
    }
  }
  return {
    language,
    setUserLanguage,
  };
}

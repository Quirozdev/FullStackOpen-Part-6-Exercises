import { useContext, useEffect, useRef } from 'react';
import NotificationContext from '../contexts/NotificationContext';

const Notification = () => {
  const [notification, dispatch] = useContext(NotificationContext);

  const timerRef = useRef(null);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' });
    }, 5000);

    return () => clearTimeout(timerRef.current);
  }, [notification]);

  if (!notification) return null;

  return <div style={style}>{notification}</div>;
};

export default Notification;

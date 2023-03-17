import { useSelector } from 'react-redux';

export default function Notification() {
  const notification = useSelector(state => state.notification);
  const style =
    notification === ''
      ? { display: 'none' }
      : {
          border: 'solid',
          padding: 10,
          borderWidth: 1,
          marginBottom: 10
        };
  return <div style={style}>{notification}</div>;
}

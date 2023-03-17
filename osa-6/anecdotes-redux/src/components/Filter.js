import { useDispatch } from 'react-redux';
import { filterChange } from '../reducers/filterReducer';

export default function Filter() {
  const dispatch = useDispatch();

  function handleChange(e) {
    dispatch(filterChange(e.target.value));
  }

  const style = {
    marginBottom: 10
  };

  return (
    <div style={style}>
      filter <input type="text" onChange={handleChange} />
    </div>
  );
}

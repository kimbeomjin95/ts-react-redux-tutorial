import {useDispatch, useSelector} from 'react-redux';
import Counter from '../components/Counter';
import {RootState} from '../modules';
import {decrease, increase, increaseBy} from '../modules/counter';

function CounterContainer() {
  // redux안에 있는 상태조회 및 dispatch 가져오기
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch();

  const onIncrease = () => {
    dispatch(increase());
  };

  const onDecrease = () => {
    dispatch(decrease());
  };

  const onIncreaseBy = (diff: number) => {
    dispatch(increaseBy(diff));
  };

  return (
    <Counter
      count={count}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onIncreaseBy={onIncreaseBy}
    />
  );
}

export default CounterContainer;

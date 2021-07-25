import { ActionType } from 'typesafe-actions';
import { GithubProfile } from '../../api/github';
import * as actions from './actions';
import {AsyncState} from "../../lib/reducerUtils";

export type GithubAction = ActionType<typeof actions>;
// 리듀서에서 사용할 상태 타입
export type GithubState = {
  userProfile: AsyncState<GithubProfile, Error>; // 기존에 직접 객체를 작성한 것을 1줄로 리팩토링
};

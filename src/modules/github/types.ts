import { ActionType } from 'typesafe-actions';
import { GithubProfile } from '../../api/github';
import * as actions from './actions';

export type GithubAction = ActionType<typeof actions>;
// 리듀서에서 사용할 상태 타입
export type GithubState = {
  userProfile: {
    loading: boolean;
    data: GithubProfile | null;
    error: Error | null;
  };
};

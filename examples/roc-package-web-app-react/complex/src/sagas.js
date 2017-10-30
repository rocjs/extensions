import { put, call, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'

export function* incrementAsync() {
    yield call(delay, 1000)
    yield put({type: 'CLICKED'})
}

export default function* rootSaga() {
    yield* takeEvery('CLICKED_ASYNC', incrementAsync)
}

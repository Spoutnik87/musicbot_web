import { Injectable } from '@angular/core';
import { ofType, Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { BotService } from 'src/app/services';
import {
  ClearQueueCommand,
  ClearQueueCommandFail,
  ClearQueueCommandSuccess,
  CLEAR_QUEUE_COMMAND,
  FetchServerStatus,
  FetchServerStatusFail,
  FetchServerStatusSuccess,
  FETCH_SERVER_STATUS,
  PauseCommand,
  PlayContentCommand,
  PlayContentCommandFail,
  PlayContentCommandSuccess,
  PAUSE_COMMAND,
  PLAY_CONTENT_COMMAND,
  ResumeCommand,
  RESUME_COMMAND,
  SetPositionCommand,
  SetPositionCommandFail,
  SetPositionCommandSuccess,
  StopContentCommand,
  StopContentCommandFail,
  StopContentCommandSuccess,
  SET_POSITION_COMMAND,
  STOP_CONTENT_COMMAND,
} from '../actions';

@Injectable()
export class BotEffects {
  constructor(private action$: Actions, private botService: BotService) {}

  @Effect()
  fetchServerStatus$ = this.action$.pipe(
    ofType(FETCH_SERVER_STATUS),
    switchMap((action: FetchServerStatus) =>
      this.botService.getStatus(action.payload).pipe(
        mergeMap(status => [new FetchServerStatusSuccess(action.payload, status)]),
        catchError(error => of(new FetchServerStatusFail(action.payload, error)))
      )
    )
  );

  @Effect()
  playContentCommand$ = this.action$.pipe(
    ofType(PLAY_CONTENT_COMMAND),
    switchMap((action: PlayContentCommand) =>
      this.botService.postPlayCommand(action.payload.contentId).pipe(
        mergeMap(status => [new PlayContentCommandSuccess(action.payload.serverId, status)]),
        catchError(error => of(new PlayContentCommandFail(action.payload.serverId, action.payload.contentId, error)))
      )
    )
  );

  @Effect()
  stopContentCommand$ = this.action$.pipe(
    ofType(STOP_CONTENT_COMMAND),
    switchMap((action: StopContentCommand) =>
      this.botService.postStopCommand(action.payload.contentId, action.payload.uid).pipe(
        mergeMap(status => [new StopContentCommandSuccess(action.payload.serverId, status)]),
        catchError(error => of(new StopContentCommandFail(action.payload.serverId, action.payload.contentId, error)))
      )
    )
  );

  @Effect()
  clearQueueCommand$ = this.action$.pipe(
    ofType(CLEAR_QUEUE_COMMAND),
    switchMap((action: ClearQueueCommand) =>
      this.botService.postClearCommand(action.payload).pipe(
        mergeMap(status => [new ClearQueueCommandSuccess(action.payload, status)]),
        catchError(error => of(new ClearQueueCommandFail(action.payload, error)))
      )
    )
  );

  @Effect()
  setPositionCommand$ = this.action$.pipe(
    ofType(SET_POSITION_COMMAND),
    switchMap((action: SetPositionCommand) =>
      this.botService.postSetPositionCommand(action.payload.contentId, action.payload.position).pipe(
        mergeMap(status => [new SetPositionCommandSuccess(action.payload.serverId, status)]),
        catchError(error => of(new SetPositionCommandFail(action.payload.serverId, action.payload.contentId, error)))
      )
    )
  );

  @Effect()
  pauseCommand$ = this.action$.pipe(
    ofType(PAUSE_COMMAND),
    switchMap((action: PauseCommand) =>
      this.botService.postPauseCommand(action.payload).pipe(
        mergeMap(status => [new ClearQueueCommandSuccess(action.payload, status)]),
        catchError(error => of(new ClearQueueCommandFail(action.payload, error)))
      )
    )
  );

  @Effect()
  resumeCommand$ = this.action$.pipe(
    ofType(RESUME_COMMAND),
    switchMap((action: ResumeCommand) =>
      this.botService.postResumeCommand(action.payload).pipe(
        mergeMap(status => [new ClearQueueCommandSuccess(action.payload, status)]),
        catchError(error => of(new ClearQueueCommandFail(action.payload, error)))
      )
    )
  );
}

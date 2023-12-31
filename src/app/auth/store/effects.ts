import { inject } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
// import { Actions } from "rxjs/internal/scheduler/Action";
import { AuthService } from "../services/auth.service";
import { authActions } from "./actions";
import { switchMap, map, catchError, of } from "rxjs";
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface';
import { HttpErrorResponse } from "@angular/common/http";

export const registerEffect = createEffect((
    actions$ = inject(Actions),
    authService = inject(AuthService)) => {
    return actions$.pipe(
        ofType(authActions.register),
        switchMap(({request}) => {
            return authService.register(request).pipe(
                map((currentUser: CurrentUserInterface) => {
                    return authActions.registerSuccess({currentUser})
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(authActions.registerFailure({
                        errors: errorResponse.error.errors,
                    }))
                })
            )
        })
    )
}, {functional: true})
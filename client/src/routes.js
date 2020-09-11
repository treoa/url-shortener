import React from "react"
import {Switch, Route, Redirect} from 'react-router-dom'
import {MainScreen} from "./screens/MainScreen";
import {CreateLink} from "./screens/CreateLink";
import {StatsScreen} from "./screens/StatsScreen";
import {AuthPage} from "./screens/AuthPage";

export const useRoutes = isAuth => {
    if(isAuth) {
        return (
            <Switch>
                <Route path="/links" exact>
                    <MainScreen />
                </Route>
                <Route path="/create" exact>
                    <CreateLink />
                </Route>
                <Route path="/detail/:id" exact>
                    <StatsScreen />
                </Route>
                <Redirect to="/create" />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}
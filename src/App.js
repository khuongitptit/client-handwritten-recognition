import React from 'react'
import routes from './routes'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import MenuContainer from './containers/MenuContainer'
import 'antd/dist/antd.css'
import './App.scss'
const App = () => {
    const mapRoutes = () => {
        return routes.map((route, index) => {
            return (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                />
            )
        })
    }
    return (
        <div className="app">
            <BrowserRouter>
                <MenuContainer />
                <Switch>{mapRoutes()}</Switch>
            </BrowserRouter>
        </div>
    )
}
export default App

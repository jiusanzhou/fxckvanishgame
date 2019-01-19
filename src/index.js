import React from 'react';
import dva from 'dva';
import { connect } from 'dva';

import App from './App';
import Models from './models';

const app = dva();

Models.map(_=>app.model(_))

const appid = '__container_'

app.router(()=>React.createElement(connect((props)=>({...props, appid: appid}))(App)));

const root = document.createElement('section')
root.setAttribute('id', appid)
document.body.appendChild(root)
app.start(`#${appid}`)
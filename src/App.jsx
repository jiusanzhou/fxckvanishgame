/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';

import 'marble/build/marble.css';

import Game from './components/Game';

import checkSecret from './utils/fuck';

import apis from './utils/request';

export default class App extends React.Component {

    constructor () {
        super()
        this.state = {
            floor: undefined,
            games: [],
            user: '',
            adminUser: '',
            userInfo: {},
            adminUserInfo: {},
        }
    }

    style = () => {
        const style = css`{
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            header.appBaner {
                display: flex;
                height: 400px;
                width: 100%;
                background: hotpink;
                text-align: center;
                align-items: center;
                justify-content: center;
                margin-bottom: 20px;
                h2 {
                    font-size: 48px;
                    font-family: fantasy;
                }
            }
            section.userInfo {
                width: 80%;
                display: flex;
                justify-content: space-around;
                align-items: center;
                input {
                    width: 200px;
                }
            }
            section.gameListContainer {
                margin-top: 20px;
                nav.gameFilter {
                    display: flex;
                    justify-content: space-around;
                    ul {
                        display: flex;
                        justify-content: flex-start;
                        flex-wrap: wrap;
                        margin: 0;
                        padding: 0;

                        li[actived] a:not(.disabled):not([disabled]), li[actived]  a:hover:not(.disabled):not([disabled]), li[actived] a:focus:not(.disabled):not([disabled]) {
                            color: rgba(0,174,85,0.9);
                        }
                        li.fitler-item {
                            line-height: 24px;
                            list-style: none;
                            margin: 0 10px;
                            a {
                                cursor: pointer;
                            }
                        }
                    }
                    ul, li {
                        
                    }
                }
                section.gameList {           
                    display: flex;
                    flex-wrap: wrap;
                }
            }
        }`

        return style
    }

    componentWillMount () {
        this.allgames().then(resp=>{
            resp.json().then(data=>{
                this.setState({ games: data.data })
            })
        })
    }

    allgames = () => {
        return apis.request({ c: 'floor', m: 'index' })
    }

    getuserinfo = ({ user }) => {
        return apis.request({ c: 'home', m: 'index', user: `${user}` })
    }

    startgame = ( { user, type, gameId } ) => {
        return apis.request({ c: 'home', m: 'scanCode', user, type, gameId })
    }

    addscore = ({ user, admin, gameId, score }) => {
        return apis.request({user, gameId, score, c: 'home', type: 'gameScoreCode', m: 'scanCode', adminUser: `${admin}`})
    }

    checkuserandadmin = () => {
        this.getuserinfo({ user: this.state.user }).then(resp=>{
            resp.json().then(data=>{
                console.log(data)
            })
        })
    }

    render () {
        let { floor, games } = this.state
        let _floors = floor?games.filter(g=>g.num===floor):games
        let _floor = _floors.length>0?_floors[0]:{}
        return <main css={ this.style() }>
            <header className={ 'appBaner' }>
                <h2>Fxck the Vanish Game!</h2>
            </header>
            <section className={ 'userInfo' }>
                    <input id="____user" onChange={ ( { target: { value } } )=>{ this.setState({ user: value }) } } value={ this.state.user } className="form-control" type="text" placeholder="玩家" />
                    <input id="____adminUser" onChange={ ( { target: { value } } )=>{ this.setState({ adminUser: value }) } } value={ this.state.adminUser } className="form-control" type="text" placeholder="积分管理员" />
                    <button onClick={ this.checkuserandadmin } className="btn btn-primary">确认</button>
            </section>
            <section className={ 'gameListContainer' }>
                <nav className={ 'gameFilter' }><ul>{ games.map((g, index)=><li actived={ g.num===floor?'':null } key={ index } className={ 'fitler-item' }><a className="btn btn-sm" onClick={ ()=>{ this.setState({ floor: g.num }) } }>{ g.num }</a></li>) }</ul></nav>
                <section className={ 'gameList' }>{ _floor.itemList && _floor.itemList.map(item=><Game key={ item.id } game={ item } />) }</section>
            </section>
        </main>
    }
}
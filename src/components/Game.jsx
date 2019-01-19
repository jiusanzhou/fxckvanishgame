/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import PropTypes from 'prop-types';

import QRCode from 'qrcode.react';


class Game extends React.Component {

    style = () => {
        const style = css`{
            margin: 20px;
            padding: 20px;
            background-clip: padding-box;
            background-color: #fff;
            box-shadow: 0 0 0 0.65px rgba(14,20,26,0.1), 0 1.65px 8px -2px rgba(14,20,26,0.18);
            transition: box-shadow 0.333s;
            h3 {
                margin: 0;
                margin-bottom: 20px;
            }
        }`

        return style
    }

    render () {
        let { game } = this.props
        return <section css={ this.style() } className={ 'gameItem' }>
            <h3>{ game.name }</h3>
            <QRCode value={ `${this._prefix}${ encodeURIComponent(`${this.scan_game}?type=begin&gameId=${ game.id }`) }` } />
            <section className={ 'actionBtn' }></section>
        </section>
    }
}

Game.propTypes = {
    css: PropTypes.string,
    game: PropTypes.object,
}

Game.defaultProps = {
    css: '',
    game: {}
}

export default Game
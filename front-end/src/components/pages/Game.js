import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './game.css';
import axios from 'axios';

class Game extends Component{
    constructor(){
        super()
        this.state = {
            game: {}
        }
    }

    componentDidMount(){
        console.log(this.props.match.params.id);
        const gid = this.props.match.params.id
        const gameResponse = axios.get(`${window.apiHost}/games/${gid}`);
        gameResponse.then((response)=>{
            const gameData = response.data[0];
            this.setState({
                game: gameData
            })
        })
    }

    render(){
        console.log(this.state.game);
        let image = "";
        if(this.state.game.screenshot_url){
            image = this.state.game.screenshot_url.split(',')[0];
            image = image.replace('t_thumb','t_cover_big')
        }
        return(
            <div className="game-container">
                <div className="row">
                    <div className="col s12 m4">
                        <img src={image} alt="" className="game-pic" />
                    </div>
                    <div className="col s12 m8">
                        <div className="row">
                            <h3 className="game-title">{this.state.game.name}</h3>
                            <div className="game-desc">
                                <p>{this.state.game.summary}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s1">
                                <span>Qty:</span>
                            </div>
                            <div className="col s8">
                                <input type="text" name="quantity"/>
                            </div>
                            <div className="col s2">
                                <button>ADD</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Game;
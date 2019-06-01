import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import {Typography} from '@material-ui/core';
import SvgIcon from '@material-ui/core/SvgIcon';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class GameView extends Component{
    constructor(props){
        super(props);
        this.state = {
            gameData : {},
            id : this.props.match.params.id,
            isLoading : true,
        }
    }
    componentWillMount() {
        let self = this;
        axios.get('/data.json')
            .then((res)=>{
                let index = res.data.findIndex((row)=>{
                    return row.Rank == self.state.id
                });
                this.setState({
                    gameData : res.data[index],
                    isLoading : false
                })
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    render(){
        if(this.state.isLoading){
            return (
                <div className="loading">Loading&#8230;</div>
            )
        }
        return (
            <div>
                <Fab href='/' component={Link} to={'/'} color={'primary'} className={'home-icon'}>
                    <SvgIcon >
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                    </SvgIcon>
                </Fab>
                <Card style={{maxWidth: '600px', width: '100%',margin:'auto'}}>
                    <CardContent>
                        <i style={{width:'40%',display:'block',margin:'auto'}} color={'primary'}>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}} viewBox="0 0 24 24"><path fill="none" d="M0 0v24h24V0H0zm23 16c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h18c1.1 0 2 .9 2 2v8z"/><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
                        </i>
                        <Typography variant={'h5'} style={{textAlign:'center'}}>
                            {this.state.gameData.Name}
                        </Typography>
                        <Typography variant={'h6'} style={{textAlign:'center'}}>
                            {'Rank - '+this.state.gameData.Rank}
                        </Typography>
                        <Typography variant={'h6'} style={{textAlign:'center'}}>
                            {'Platform - '+this.state.gameData.Platform}
                        </Typography>
                        <Typography variant={'h6'} style={{textAlign:'center'}}>
                            {'Publisher - '+this.state.gameData.Publisher}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default GameView;
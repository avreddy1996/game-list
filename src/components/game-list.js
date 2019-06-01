import React, {Component} from 'react';
import EnhancedTable from './enhanced-table';
import axios from "axios";

class GameList extends Component{
    constructor(props){
        super(props);
        this.state = {
            csvData : {},
            isLoading : true,
        }
    }
    componentDidMount() {
        this.setState({
            isLoading : true
        });
        axios.get('./data.json')
            .then((res)=>{
                this.setState({
                    csvData : res.data,
                    isLoading : false
                })
            })
            .catch((err)=>{
                this.setState({
                    isLoading : false
                });
                console.log(err)
            })
    }

    render() {
        if(this.state.isLoading){
            return (
                <div className="loading">Loading&#8230;</div>
            )
        }
        return (
            <EnhancedTable rows={this.state.csvData} />
        );
    }
}

export default GameList;
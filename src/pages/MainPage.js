import moment from 'moment';
import React, { Component } from 'react';
import { Oval } from 'react-loader-spinner';
import Navbar from '../components/Navbar/Navbar';
import { request } from '../constants/constants';
import '../css/MainPage.css';

class MainPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            jokes: [],
            total_jokes: 0,
            noOfElement: 10,
            isLoading: true
        }
    }

    getJokes = () => {
        return request('GET', '/jokes/search?query=all', {}, true);
    }

    componentDidMount() {

        this.getJokes().then(res => {

            const jokes = res.data.result.map(val => ({
                category: val.categories[0],
                created_date: val.created_at,
                value: val.value
            }))

            this.setState({
                jokes,
                total_jokes: jokes.length,
                isLoading: false
            })

        }).catch(err => {
            console.error(err.response);
            this.setState({
                isLoading: false
            })
        })

    }

    loadMore = () => {
        let currentNoOfElement = 0;
        currentNoOfElement = this.state.noOfElement + this.state.noOfElement
        this.setState({
            noOfElement: currentNoOfElement
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    search = () => {
        this.setState({
            isLoading: true,
            jokes: []   
        })

        request('GET', `/jokes/search?query=${this.state.search}`, {}, true).then(res => {

            console.log("search", res)
            if(res.data.total == 0){
                this.setState({
                    jokes: [],
                    isLoading: false
                })
            } else {
                
                const jokes = res.data.result.map(val => ({
                    category: val.categories[0],
                    created_date: val.created_at,
                    value: val.value
                }))

                this.setState({
                    jokes,
                    total_jokes: jokes.length,
                    isLoading: false
                })

            }

        }).catch(err => {
            console.error(err.response);
            this.setState({
                isLoading: false
            })
        })

    }

    render() {

        const slice = this.state.jokes.slice(0, this.state.noOfElement)

        return (
            <div>
                <Navbar />
                <div className="parallax"></div>
                <div className='container-body'>
                    <div class="row">
                    <div className="topnav">
                        <div className="search-container">
                            <input type="text" onChange={this.onChange} placeholder="Search.." name="search" />
                            <button onClick={this.search} type="submit"><i class="fa fa-search"></i></button>
                        </div>
                    </div>
                        {
                            this.state.isLoading ? 
                                (
                                    <div className='center'>
                                        <Oval
                                            height="100"
                                            width="100"
                                            color='white'
                                            ariaLabel='loading'
                                        />
                                    </div>
                                ) : 
                                (
                                    <div className="container">
                                        {

                                            slice.length > 0 ? (
                                                <React.Fragment>
                                                    {
                                                        slice.map(val => {
                                                            return <React.Fragment>
                                                                <div className="col">
                                                                    <div className="date">
                                                                        {moment(val.created_date).format('L')}
                                                                    </div>
                                                                    <div className="category">
                                                                        {val.category}
                                                                    </div>
                                                                    <p>{val.value}</p>
                                                                </div>
                                                            </React.Fragment>
                                                        })
                                                        
                                                    }
                                                    <button className="button" onClick={this.loadMore}>Load More . . .</button>
                                                </React.Fragment>
                                                
                                            ) : (
                                                <p>No results for {this.state.search}</p>
                                            )
                            
                                            
                                        }
                                        
                                        
                                    </div>
                                )

                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default MainPage;

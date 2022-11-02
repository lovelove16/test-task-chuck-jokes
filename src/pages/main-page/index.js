import moment from 'moment';
import  React, { useState, useEffect } from 'react';
import { Oval } from 'react-loader-spinner';
import Navbar from '../../components/nav-bar';
import { getCategories, getJokes, getJokesByCategory, searchJokes } from '../../server';
import './index.css';
import Select from 'react-select'
import Footer from '../../components/footer';

const MainPage = () => { 
    const [jokes, setJokes] = useState([]);
    const [totalJokes, setTotalJokes] = useState(0);
    const [noOfElements, setNoOfElements] = useState(10);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [slice, setSlice] = useState(0);
    const [categories, setCategories] = useState([]);
    

    useEffect(() => {

        getJokes().then(res => {
            const jokes = res.data.result.map(val => ({
                category: val.category,
                created_date: val.created_at,
                value: val.value
            }))

            const slice = jokes.slice(0, noOfElements)

            setSlice(slice)
            setJokes(jokes)
            setTotalJokes(res.data.total)
            setIsLoading(false)

        }).catch(err => {
            console.error(err.response);
            setIsLoading(false)
        })

        getCategories().then(res => {
            const categories = res.data.map(val => ({
                value: val,
                label: val.charAt(0).toUpperCase() + val.slice(1)
            }))
            setCategories(categories)
    
        }).catch(err => {
            console.error(err.response);
            setIsLoading(false)
        })

    }, []);

    useEffect(() => {
        const slice = jokes.slice(0, noOfElements)
        setSlice(slice)
     }, [noOfElements]);

    const loadMore = () => {
        let currentNoOfElement = 0;
        currentNoOfElement = noOfElements + noOfElements
        setNoOfElements(currentNoOfElement)
    }

    const onChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const search = () => {
        setNoOfElements(10)
        searchJokes(searchTerm).then(res => {
            if(res.data.total === 0){
                setJokes([])
                setTotalJokes(0)
                setIsLoading(false)
            } else {
                
                const jokes = res.data.result.map(val => ({
                    category: val.categories[0],
                    created_date: val.created_at,
                    value: val.value
                }))

                setJokes(jokes)
                setTotalJokes(jokes.length)
                setIsLoading(false)

            }

        }).catch(err => {
            console.error(err.response);
            setIsLoading(false)
        })
    }

    const onSelectCategory = (e) => {
        console.log("onSelectCategory is hit");
        setIsLoading(true)
        setJokes([])
        setJokes(jokes => []);

        getJokesByCategory(e.value).then(res => {
            console.log("res", res);
            let jokeArray = []
            if(res.status === 200){

                let jokeObject = {
                    category: e.value,
                    created_date: res.data.created_at,
                    value: res.data.value
                }
                jokeArray.push(jokeObject)
                console.log("jokeArray", jokeArray);
                setJokes(jokeArray);
                console.log("curJokes", jokes);
                
            }
            setIsLoading(false)
        }).catch(err => {
            console.log(err)
            setIsLoading(false)
        })
     
    }

    return (
        <>
            <div>
                <Navbar />
                <div className="parallax">
                    <div className="parallax-content">
                        <h1> The Joke Bible </h1>
                        <p>Daily Laughs for you and yours</p>
                    </div>
                    <div className="wrap">
                        <div className="search">
                            <input type="text" className="searchTerm" onChange={onChange} placeholder="Search.." name="search" />
                            <button class="searchButton" onClick={search} type="submit">
                                <i class="fa fa-search" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className='container-body'>
                    <div className="row">
                        <div className="categories">
                            <Select className="select-category" options={categories} onChange={onSelectCategory} placeholder="Select Category"/>
                        </div>
                        {
                            isLoading ? 
                                (
                                    <div className='center'>
                                        <Oval
                                            height="100"
                                            width="100"
                                            color='white'
                                            ariaLabel='loading'
                                        />
                                    </div>
                                ) : (
                                    <div className="container">
                                        
                                        {
                                                jokes.length === 0 ? <p>No Jokes Available</p> : <>
                                                <div className="grid-container">
                                                        {
                                                            slice.map(val => {
                                                                return <>
                                                                
                                                                        <div class="grid-item">
                                                                            <p className="category-name">
                                                                                {val.category ? val.category.toUpperCase() : "UNCATEGORIZED"}
                                                                                {/* {moment(val.created_date).format('L')} */}
                                                                            </p>
                                                                            <p className="joke-sentence">{val.value}</p>
                                                                        </div>

                                                                </>
                                                            })
                                                        }
                                                </div>
                                            {
                                                noOfElements < jokes.length ? <button className="button" onClick={loadMore}>Load More . . .</button> : ""
                                            }
                                           </>
                                        }
                                            
                                    </div>
                                )

                        }
                    </div>
                </div>
                <Footer />
            </div>
        </>
        
    );

 

}


export default MainPage;

import React, { useEffect } from 'react'
import Card from './Card';
import Pokeinfo from './Pokeinfo';
import axios from 'axios';
import { useState } from 'react';
import Footer from './Footer';

const Inicio = () => {

    const [pokeData, setPokeData] = useState([])
    const [loading, setLoading] = useState(true)
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/")
    const [nextUrl, setNextUrl] = useState()
    const [prevUrl, setPrevUrl] = useState()
    const [pokeDex, setPokeDex] = useState()

    const pokeFun = async () => {

        setLoading(true);
        const res = await axios.get(url)
        // console.log(res.data.results)
        setNextUrl(res.data.next)
        setPrevUrl(res.data.previous)
        getPokemon(res.data.results)
        setLoading(false)
        //console.log(pokeData)
    }

    const getPokemon = async (res) => {

        res.map(async (item) => {
            // console.log(item.url)
            const result = await axios.get(item.url)
            //console.log(result.data)
            setPokeData(state => {
                state = [...state, result.data]
                state.sort((a, b) => a.id > b.id ? 1 : -1)
                return state
            })
        })
    }

    useEffect(() => {
        pokeFun()
    }, [url])

    return (
        <>
            <div className="titulo">POKEMONES</div>
            <div className="container">

                <div className="left-content">
                    <Card pokemon={pokeData} loading={loading} infoPokemon={poke => setPokeDex(poke)} />

                    <div className="btn-group">
                        {prevUrl && <button onClick={() => {
                            setPokeData([])
                            setUrl(prevUrl)
                        }}> ⏪ Previous</button>}

                        {nextUrl && <button onClick={() => {
                            setPokeData([])
                            setUrl(nextUrl)
                        }}>Next ⏩</button>}
                    </div>
                </div>

                <div className="right-content">
                    <h3>CARACTERISTICAS:</h3>
                    <Pokeinfo data={pokeDex} />
                </div>
            </div>
            <Footer />
        </>

    )
}

export default Inicio;

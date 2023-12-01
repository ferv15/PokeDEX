import { useSelector } from "react-redux"
import useFetch from "../hooks/useFetch"
import { useEffect, useRef, useState } from "react"
import PokeCard from "../components/PokeDexPage/PokeCard"
import SelectType from "../components/PokeDexPage/SelectType"
import './style/PokedexPage.css'

const PokedexPage = () => {

    const [inputValue, setInputValue] = useState('')
    const [selectValue, setSelectValue] = useState('allPokemons')

    const trainerName = useSelector( store => store.trainerName)

    const url = 'https://pokeapi.co/api/v2/pokemon?limit=9999999&offset=0'
    const [ pokemons , getPokemons, getByTypePokemons] = useFetch(url)

    useEffect(() => {
        if(selectValue === 'allPokemons'){
            getPokemons()
        }else {
            getByTypePokemons(selectValue)
        }
    }, [selectValue])
    
    const inputSearch = useRef()

    const handleSubmit = e =>{
        e.preventDefault()
        setInputValue(inputSearch.current.value.toLowerCase().trim())
        inputSearch.current.value = ''
    }
    
    const cbFilter = (poke) => {
        const nameFilter = poke.name.includes( inputValue)
        return nameFilter
    }
    
    return (
        <div className="poke_app">
            <p className="poke_app_title">Welcome <span>{ trainerName }</span>, here you can find your favorite pokemon. let's go</p>
            <form className="poke_app_form" onSubmit={handleSubmit}>
                <input className="poke_btnn" ref={inputSearch} type="text" />
                <button className="poke_btn">Atrapalo</button>
            </form>
            <SelectType 
                setSelectValue = {setSelectValue}
            />
            <div className="poke_poke">
                {
                    pokemons?.results.filter(cbFilter).map ( poke =>(
                        <PokeCard 
                        key={poke.url}
                        url={poke.url}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default PokedexPage
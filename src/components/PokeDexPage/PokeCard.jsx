import { useEffect } from "react"
import useFetch from "../../hooks/useFetch"
import { useNavigate } from "react-router-dom"


const PokeCard = ({url}) => {

    const [ infoPoke, getInfopoke ] = useFetch(url)

    useEffect(() => {
        getInfopoke()
    }, [])


    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate(`/pokedex/${infoPoke.id}`)
    }


    return (
        <article onClick={handleNavigate}>
            <header>
                <img src={infoPoke?.sprites.other["official-artwork"].front_default} alt="" />
            </header>
            <section>
                <h3>{infoPoke?.name}</h3>
                <ul>
                    {
                        infoPoke?.types.map ( infotype => (
                            <li key = {infotype.type.url}>{infotype.type.name}</li>
                        ))
                    }
                </ul>
                <hr />
                <ul>
                    {
                        infoPoke?.stats.map(infoStat => (
                            <li key={infoStat.stat.url}>
                                <span>{infoStat.stat.name}</span>
                                <span>{infoStat.base_stat}</span>
                            </li>
                        ))
                    }
                </ul>
            </section>
        </article>
    )
}

export default PokeCard
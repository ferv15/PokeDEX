import { useRef } from "react"
import { setTrainerName } from "../store/slices/trainerName.slice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import './style/homePages.css'


const HomePages = () => {

    const dispach = useDispatch()

    const navigate = useNavigate()

    const inputName = useRef()
    const handleSubmit = e => {
        e.preventDefault()
        dispach(setTrainerName(inputName.current.value.trim()))
        navigate('/pokedex')
    }
    return (
        <div className="poke_home">
            <h1 className="poke_title">Pokedex</h1>
            <h2 className="poke_trainer">Hi Trainer</h2>
            <p className="poke_message">To Star, Please Give Me You Trainer Name </p>
            <form onSubmit={handleSubmit}>
                <input className="poke_btnn" type="text" ref={inputName} />
                <button className="poke_btn">Catch Them All!!!</button>
            </form>
        </div>
    )
}

export default HomePages
import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"



const Registrar = () => {

    const [nombre, setNombre ] = useState('')
    const [email, setEmail ] = useState('')
    const [password, setPassword ] = useState('')
    const [repetirPassword, setRepetirPassword ] = useState('')
    const [alerta, setAlerta ] = useState({})



    const handleSubmit = async e => {
        e.preventDefault();

        if([nombre, email, password, repetirPassword].includes('')){
            setAlerta({
                msg:"Todos los campos son obligatorios",
                error: true
            })
            return
        }

        if(password !== repetirPassword){
            setAlerta({
                msg:"Los password no coinciden",
                error: true
            })
            return
        }

        if(password.length < 6){
            setAlerta({
                msg:"Su password es muy corto, agrege mínimo 6 caracteres",
                error: true
            })
            return
        }
        setAlerta({})

        //Ahora creamos el usuario en la API

        try {
            const { data } = await clienteAxios.post(`/usuarios`, { nombre, email, password })
                setAlerta({
                    msg: data.msg,
                    error: false
                })

                setNombre('')
                setEmail('')
                setPassword('')
                setRepetirPassword('')
        } catch (error) {
            //Error.response nos dice qué esta fallando
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = alerta
  return (
    <>
    <h1 className="text-sky-700 font-black text-5xl capitalize"> Crea tu cuenta y administra tus   {""}
        <span className="text-slate-700">Proyectos</span> 
    </h1>

    {msg && <Alerta alerta={alerta} />}
    <form 
        className="my-10 bg-white shadow rounded-lg px10 py-10"
        onSubmit={handleSubmit}
        >
        <div className="my-5 ">
                <label 
                    className="uppercase text-gray-600 block text-l font-bold"
                    htmlFor="nombre"
                >Nombre</label>
                <input 
                    id="nombre"
                    type="text"
                    placeholder="Tu nombre"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-200"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
        </div>
        <div className="my-5 ">
            <label 
                className="uppercase text-gray-600 block text-l font-bold"
                htmlFor="email"
            >Email</label>
            <input 
                id="email"
                type="email"
                placeholder="Email de Registro"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-200"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
        </div>
        <div className="my-5 ">
            <label 
                className="uppercase text-gray-600 block text-l font-bold"
                htmlFor="password"
            >Password</label>
            <input 
                id="password"
                type="password"
                placeholder="Password de Registro"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-200"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
        </div>
        <div className="my-5 ">
            <label 
                className="uppercase text-gray-600 block text-l font-bold"
                htmlFor="password2"
            >Repetir Password</label>
            <input 
                id="password2"
                type="password"
                placeholder="Repetir tu password"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-200"
                value={repetirPassword}
                onChange={e => setRepetirPassword(e.target.value)}
            />
        </div>

        <input 
            type="submit"
            value="Crear cuenta"
            className="bg-sky-600 mb-5 w-full py-3 text-white uppercase font-bold rounded-xl 
            hover:cursor-pointer hover:bg-sky-900 transition-colors"
        />
    </form>
    <nav className="lg:flex lg:justify-between">
        <Link
            to="/"
            className="block text-center my-5 text-slate-500 uppercase text-sm"
        >¿Ya tienes una cuenta? Inicia Sesión </Link>
        <Link
            to="/olvide-password"
            className="block text-center my-5 text-slate-500 uppercase text-sm"
        >Olvidé mi password </Link>
    </nav>
</>
  )
}

export default Registrar

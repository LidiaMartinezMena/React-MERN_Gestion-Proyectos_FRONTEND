import { useState, useEffect } from "react"
import { Link, useParams } from 'react-router-dom'
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"


const NuevoPassword = () => {

  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  const [tokenValido, setTokenValido] = useState(false)
  const [ passwordModificado, setPasswordModificado] = useState(false)

  const params = useParams()
  const { token } = params

  useEffect(() => {
      const comprobarToken = async () => {
          try {
            await clienteAxios.get(`/usuarios/olvide-password/${token}`)

            setTokenValido(true)

          } catch (error) {
            setAlerta({
              msg: error.response.data.msg,
              error:true
            })
          }
      }
      comprobarToken()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async e => {
    e.preventDefault();

    if(password.length < 6 ) {
      setAlerta({
        msg: 'El password debe tener mínimo seis caracteres',
        error:true
      })
      return
    }
    try {
      const url = `/usuarios/olvide-password/${token}`

      const { data } = await clienteAxios.post(url, { password })
      setAlerta({
        msg: data.msg,
        error:false
      })
      setPasswordModificado(true)
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error:true
      })
    }
  }

  const { msg } = alerta

  return (
    <>
      <h1 className="text-sky-700 font-black text-5xl capitalize"> Restablece tu password  
      </h1>
      
      {msg && <Alerta alerta={alerta} />}

      { tokenValido &&  (
            <form 
              className="my-10 bg-white shadow rounded-lg px10 py-10"
              onSubmit={handleSubmit}
            >
            <div className="my-5 ">
                <label 
                    className="uppercase text-gray-600 block text-l font-bold"
                    htmlFor="password"
                >Nuevo Password</label>
                <input 
                    id="password"
                    type="password"
                    placeholder="Escribe tu nuevo password"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-200"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>

            <input 
                type="submit"
                value="Guardar nuevo password"
                className="bg-sky-600 mb-5 w-full py-3 text-white uppercase font-bold rounded-xl 
                hover:cursor-pointer hover:bg-sky-900 transition-colors"
            />
        </form>
      )}

          {passwordModificado && (
            <Link
                to="/"
                className="block text-center my-5 text-slate-500 uppercase text-sm"
            >Inicia Sesión </Link>
          )}
    </>
  )
}

export default NuevoPassword

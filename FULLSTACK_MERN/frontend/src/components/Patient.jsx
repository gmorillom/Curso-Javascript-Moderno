import usePatient from "../hooks/usePatient"

function Patient({data}) {
    const { updatePatient, removePatient } = usePatient()
    const { _id, name, phonenumber, owner, date, email, issues } = data

    const dateFormat = () => {
        if(!date) return
        const _date = new Date(date.split('T')[0] + 'T00:00:00')
        return Intl.DateTimeFormat('es-VE',{ dateStyle: 'long'}).format(_date)
    }
    
    return (
        <div className="bg-gray-100 my-10 md:mx-5 px-5 py-7 rounded-lg shadow-lg">
            <p className="uppercase font-bold text-indigo-700">
                Nombre: {""} <span className="font-normal normal-case text-black">{name}</span>
            </p>
            <p className="uppercase font-bold text-indigo-700">
                Dueño: {""} <span className="font-normal normal-case text-black">{owner}</span>
            </p>
            <p className="uppercase font-bold text-indigo-700">
                Teléfono: {""} <span className="font-normal normal-case text-black">{phonenumber}</span>
            </p>
            
            <p className="uppercase font-bold text-indigo-700">
                Correo electrónico: {""} <span className="font-normal normal-case text-black">{email}</span>
            </p>
            <p className="uppercase font-bold text-indigo-700">
                Fecha de alta: {""} <span className="font-normal normal-case text-black">{dateFormat()}</span>
            </p>
            <p className="uppercase font-bold text-indigo-700">
                Síntomas: {""} <span className="font-normal normal-case text-black">{issues}</span>
            </p>

            <div className="flex justify-between mt-5 p-1">
                <button 
                    type="button"
                    className="btn bg-indigo-600 p-3 uppercase text-white font-bold rounded-lg hover:bg-indigo-700 hover:cursor-pointer"
                    onClick={(e) => { updatePatient(data) }}
                >
                    Editar
                </button>

                <button 
                    type="button"
                    className="btn bg-red-600 p-3 uppercase text-white font-bold rounded-lg hover:bg-red-700 hover:cursor-pointer"
                    onClick={(e) => {removePatient(_id)}}
                >
                    Eliminar
                </button>
            </div>
        </div>
    )
}

export default Patient
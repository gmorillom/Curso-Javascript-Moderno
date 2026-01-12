function alert({props}) {
  return (
    <div className={`rounded-lg text-white text-lg font-bold text-center p-5 mb-5 ${props.error ? 'bg-red-600' : 'bg-green-600'}`}>
        {props.msg}
    </div>
  )
}

export default alert
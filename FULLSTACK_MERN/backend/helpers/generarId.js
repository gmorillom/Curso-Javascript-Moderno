// Definimos una funcion que nos generará tokens aleatorios
export default () => {
    return Date.now().toString(32) + Math.random().toString(32).substring(2)
}
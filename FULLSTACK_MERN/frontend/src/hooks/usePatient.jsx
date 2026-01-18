import PatientContext from "../context/PatientProvider";
import { useContext } from "react"

function usePatient() {
  return useContext(PatientContext)
}

export default usePatient
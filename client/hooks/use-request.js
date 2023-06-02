import axios from "axios";
import { useState } from "react"

const useRequest = ({ url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState(null)
    const doRequest = async () => {
        try {
            setErrors(null)
            const response = await axios[method](url, body)
            if(onSuccess){
                onSuccess(response.data)
            }
            return response.data
        } catch (error) {
            console.log(error)
            const errorList = error.response.data.errors
            setErrors(
                <div className="alert alert-danger">
                    <h4>Error</h4>
                    <ul className="my-o">
                        {errorList.map(err => <li key={err.message}>{err.message}</li>)}
                    </ul>
                </div>
            )
        }
    }
    return [doRequest, errors]
}

export default useRequest
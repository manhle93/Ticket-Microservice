import { useState } from 'react'
import Router from 'next/router'
import useRequest from '../../hooks/use-request'
const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [doRequest, errors] = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: { email, password },
        onSuccess: () => Router.push('/auth/signin')
    })
    const onSubmit = async (e) => {
        e.preventDefault()
        doRequest()
    }
    return (
        <form onSubmit={onSubmit}>
            <h1>Sing up</h1>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Input password" />
            </div>
            {errors}
            <button type="submit" className="btn btn-primary">Sign up</button>
        </form>
    )
}
export default Signup
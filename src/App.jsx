import './App.css'
import { useState, useCallback, useEffect } from 'react'

export default function App() {

  const [lenght, setLenght] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordgenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+=[]{}~`"

    for (let i = 1; i <= lenght; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [lenght, numberAllowed, charAllowed, setPassword])

  useEffect(() => {
    passwordgenerator()
  }, [lenght, numberAllowed, charAllowed, passwordgenerator])

const handlecopy = () =>{
  navigator.clipboard.writeText(password);
  alert('Text Copied');
}

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
          ></input>

          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={handlecopy}>Copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={100}
              value={lenght}
              className='cursor-pointer'
              onChange={(e) => { setLenght(e.target.value) }}
            />
            <label>Lenght: {lenght}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={(e) => {
                setCharAllowed((prev) => !prev)
                setPassword(e.target.value)
              }}
            />
            <label>Symbols</label>
          </div>
        </div>
      </div>
    </>
  )
}

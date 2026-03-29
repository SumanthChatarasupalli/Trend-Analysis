import { useState } from "react"

const InputBox=(props)=>{

    const [value,setvalue]=useState("");

    const changefn=(e)=>{
        setvalue(e.target.value);
        const arr = e.target.value.split(",").map(Number);
        props.setNums(arr);
    }
    return (
        <div className="mx-auto mt-8 w-full max-w-xl rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <label className="mb-2 block text-sm font-medium text-gray-700">
                Numbers
            </label>
            <input
                type="text"
                value={value}
                placeholder="Enter numbers (e.g. 10, 20, 30)"
                onChange={changefn}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
        </div>
    )
}


export default InputBox;
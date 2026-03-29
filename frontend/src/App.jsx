import Header from './components/Header'
import InputBox from './components/InputBox'
import Button from './components/Button'
import { useState } from 'react'
import axios from 'axios';


function App() {
  const [nums,setNums]=useState([]);
  const [result, setResult] = useState(null);
  const getdetails=async()=>{
   //api call
   try {
    const [ngeRes, profitRes] = await Promise.all([
      axios.post("http://localhost:3001/api/stock/nextgreater", { nums }),
      axios.post("http://localhost:3001/api/stock/maxprofit", { nums })
    ]);

    setResult({
      nextGreater: ngeRes.data.nge,
      maxProfit: profitRes.data.maxProfit,
    });

  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      const message = "Wrong Input.Please enter valid numbers."
      alert(message)
      return
    }
  }
  }
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-indigo-900 to-slate-800 px-4 py-10 sm:px-6">
      <main className="mx-auto w-full max-w-4xl rounded-2xl border border-white/10 bg-white/95 p-6 shadow-2xl backdrop-blur-sm sm:p-10">
        <Header />
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-gray-600 sm:text-base">
          Enter comma-separated values to explore trends.
        </p>
        <InputBox setNums={setNums}/>
        <Button onClick={getdetails} />

        {result && (
  <div className="mt-6 rounded-lg bg-gray-100 p-4">
    <h3 className="text-lg font-semibold">Results:</h3>

    <p className="mt-2">
      <b>Next Greater:</b> {Array.isArray(result.nextGreater) ? result.nextGreater.join(", ") : "No data"}
    </p>

    <p className="mt-2">
      <b>Max Profit:</b> {result.maxProfit}
    </p>
  </div>
)}
      </main>
    </div>
  )
}

export default App

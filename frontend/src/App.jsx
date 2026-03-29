import Header from './components/Header'
import InputBox from './components/InputBox'
import Button from './components/Button'
import { useState } from 'react'
import axios from 'axios';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'


function App() {
  const [nums,setNums]=useState([]);
  const [result, setResult] = useState(null);
  const chartData = nums
    .filter((value) => Number.isFinite(value))
    .map((value, index) => ({
      point: index + 1,
      value,
    }))

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

        {chartData.length > 0 && (
          <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            <h3 className="text-lg font-semibold text-gray-800">Input Trend Graph</h3>
            <p className="mt-1 text-sm text-gray-500">
              Values are plotted in the same order as your input.
            </p>
            <div className="mt-4 h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" />
                  <XAxis dataKey="point" label={{ value: 'Location', position: 'insideBottom', offset: -5 }} />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#4f46e5"
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

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

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
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-10 sm:px-6 sm:py-14">
      <div className="pointer-events-none absolute -left-28 top-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-12 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

      <main className="relative mx-auto w-full max-w-5xl rounded-3xl border border-white/15 bg-white/95 p-6 shadow-2xl backdrop-blur-sm sm:p-10">
        <div className="space-y-8">
          <section className="rounded-2xl border border-slate-200 bg-linear-to-r from-slate-50 to-indigo-50 p-6 sm:p-8">
            <Header />
            <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-slate-600 sm:text-base">
              Enter comma-separated values and instantly view trend insights, next greater elements, and max profit.
            </p>
            <div className="mt-6">
              <InputBox setNums={setNums}/>
              <Button onClick={getdetails} />
            </div>
          </section>

          {chartData.length > 0 && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800">Input Trend Graph</h3>
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                  {chartData.length} points
                </span>
              </div>
              <p className="text-sm text-slate-500">
                Values are plotted in the same order as your input.
              </p>
              <div className="mt-5 h-72 w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50/60 p-2">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={240}>
                  <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" />
                    <XAxis dataKey="point" label={{ value: 'Position', position: 'insideBottom', offset: -5 }} />
                    <YAxis />
                    <Tooltip
                      contentStyle={{ borderRadius: '12px', borderColor: '#cbd5e1' }}
                      labelStyle={{ color: '#334155' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#4f46e5"
                      strokeWidth={3}
                      dot={{ r: 4, strokeWidth: 2, fill: '#4f46e5' }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>
          )}

          {result && (
            <section className="rounded-2xl border border-emerald-100 bg-linear-to-br from-emerald-50 to-teal-50 p-5 shadow-sm sm:p-6">
              <h3 className="text-lg font-semibold text-slate-800">Computed Results</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-medium text-slate-500">Next Greater</p>
                  <p className="mt-2 text-sm text-slate-800">
                    {Array.isArray(result.nextGreater) ? result.nextGreater.join(", ") : "No data"}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-medium text-slate-500">Max Profit</p>
                  <p className="mt-2 text-xl font-bold text-emerald-700">{result.maxProfit}</p>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  )
}

export default App

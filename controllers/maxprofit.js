function maxprofitfn(prices) {
  if (prices.length === 0) return 0;
  let min = prices[0];
  let profit = 0;
  for (let i = 1; i < prices.length; i++) {
    profit = Math.max(profit, prices[i] - min);
    min = Math.min(min, prices[i]);
  }
  return profit;
}


export function maxprofit(req , res){
    const {nums}=req.body;

    if(!Array.isArray(nums) || nums.length === 0){
        return res.status(400).json({msg:"Please pass the Array"});
    }

    if(!nums.every((x)=> typeof x === "number" && Number.isFinite(x))){
        return res.status(400).json({msg:"Numbers haven't been passed"});
    }

    const maxProfitVal=maxprofitfn(nums);

  return res.status(200).json({ maxProfit: maxProfitVal });
}
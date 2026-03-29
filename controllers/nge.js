function ngefn(nums) {
    const n = nums.length;
    const out = new Array(n).fill(-1);
    const stack = [];
    for (let i = 0; i < n; i++) {
      while (stack.length && nums[stack[stack.length - 1]] < nums[i]) {
        out[stack.pop()] = nums[i];
      }
      stack.push(i);
    }
    return out;
  }

export function nextgreaterelement(req,res){
    const {nums}=req.body;

    if(!Array.isArray(nums) || nums.length === 0){
        return res.status(400).json({msg:"Please pass the Array"});
    }

    if(!nums.every((x)=> typeof x === "number" && Number.isFinite(x))){
        return res.status(400).json({msg:"Numbers haven't been passed"});
    }

    const nge=ngefn(nums);

    return res.status(200).json({ nge });
};
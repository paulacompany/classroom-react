import { LOGIN } from "../env/config";

async function count(setCount){
    let res = await fetch(`${LOGIN}?mode=count`)
    let data = await res.text()
    setCount(data)
}

export default count
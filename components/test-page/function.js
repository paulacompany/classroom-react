import { TEST_URL, LOGIN } from "../../env/config";
import { useRouter } from "next/router";
const router = useRouter()

async function getMyTestList(email, password, myTestListRef){
    if(!email && !password){
        location.href = '/login'
        return
    }
    let res = await fetch(`${LOGIN}?email=${email}&password=${password}&mode=gettest`)
    let data = await res.text()
    if(data == 'error'){
        alert('error')
        router.push('/test')
    }else{
        myTestListRef.current = data.split(',')
    }
}

async function getTheTestClass(setTestJson, setLoadState) {
    let formData = new FormData()
    formData.append('mode', 'getClass')
    let res = await fetch(TEST_URL, {
        method: 'POST',
        body: formData
    })
    let data = await res.json()
    setTestJson(data)
    setLoadState(true)
}

async function getTheQuestionId(className, myTestListRef) {
    let formData = new FormData()
    formData.append('classname', className)
    formData.append('mode', 'getClassQu')
    let res = await fetch(TEST_URL, {
        method: 'POST',
        body: formData
    })
    let data = await res.text()
    let formatArray = data.split(',')
    let redirectState = true
    formatArray.map((item, number)=>{
        console.log('hi');
        if(!myTestListRef.current.includes(item) && redirectState){
            redirectState = false
            location.href = `/test/question?class=${className}&id=${formatArray[number]}`
        }
    })
    if(redirectState){
        router.push('/')
    }
}

export { getMyTestList, getTheTestClass, getTheQuestionId }
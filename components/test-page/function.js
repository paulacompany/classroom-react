import { TEST_URL, LOGIN } from "../../env/config";
import Answer from "../../components/test-page/Answer"

function redirectURL(formatArray, myTestListRef, questionId, currentURL, classListName, router) {
    let redirectState = true
    console.log(formatArray);
    formatArray.map(item => {
        let isSame = myTestListRef.current.includes(item)
        console.log(isSame);
        if ((Number(item) > Number(questionId.current)) && !isSame && redirectState) {
            redirectState = false
            location.href = currentURL.current + `?class=${classListName.current}&id=${item}`
        }
    })
    if (redirectState) {
        router.push('/test')
    }
}

async function getMyTestList(email, password, myTestListRef, router){
    if(!email && !password){
        location.href = '/login'
        return
    }
    let res = await fetch(`${LOGIN}?email=${email}&password=${password}&mode=gettest`)
    let data = await res.text()
    if(data == 'error'){
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

async function getTheQuestionId(className, myTestListRef, router) {
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

async function getQuestion(questionId, setTestJson, setLoadState) {
    let formData = new FormData()
    formData.append('number', questionId.current)
    formData.append('mode', 'getValue')
    let res = await fetch(TEST_URL, {
        method: 'POST',
        body: formData
    })
    let data = await res.json()
    setTestJson(data)
    setLoadState(true)
}

function renderNext(wrongAnswerClickState, myTestListRef, questionId, currentURL, classListName, formatArray, router) {
    if (wrongAnswerClickState) {
        return (
            <div className="d-flex mt-5">
                <button
                    className="btn btn-warning mx-2"
                    onClick={() => {
                        redirectURL(formatArray.current, myTestListRef, questionId, currentURL, classListName, router)
                    }}
                >skip
                </button>
            </div>
        )
    } else {
        return ''
    }
}



function renderFunction(clickState, wrongAnswerClickState, setClickState, setWrongAnswerClickState, setAnswerPreview, formatArray, testJson, answer, setAnswer, answerPreview, setAlert, loadState, classListName, email, password, questionId, myTestListRef, currentURL, router) {

    function renderButton() {

        async function clickCheck() {
            let formData = new FormData()
            formData.append('classname', classListName.current)
            formData.append('mode', 'getClassQu')
            let res = await fetch(TEST_URL, {
                method: 'POST',
                body: formData
            })
            let data = await res.text()
            formatArray.current = data.split(',')
            if (answer == testJson.answer) {
                setClickState(true)
                setAlert('CORRECT')
            } else {
                setWrongAnswerClickState(true)
                setAnswerPreview(() => {
                    return 'Answer: ' + testJson.answer
                })
                setAlert('WRONG')
            }
        }
    
        if (clickState || wrongAnswerClickState) {
            return ''
        } else {
            return (
                <button
                    className="btn btn-danger mt-5 mb-5 mx-2"
                    onClick={()=>{
                        clickCheck()
                    }}
                >check</button>
            )
        }
    }

    function renderClean() {

        async function addTheCleanList() {
            let res = await fetch(`${LOGIN}?email=${email}&password=${password}&mode=addtest&number=${questionId.current}`)
            let data = await res.text()
            if (data == 'error') {
                router.push('/test')
            } else {
                redirectURL(formatArray.current, myTestListRef, questionId, currentURL, classListName, router)
            }
        }
    
        if (clickState) {
            return (
                <div className="d-flex mt-5">
                    <button
                        className="btn btn-success mx-2"
                        onClick={addTheCleanList}
                    >clean</button>
                    <button
                        className="btn btn-warning mx-2"
                        onClick={() => {
                            redirectURL(formatArray.current, myTestListRef, questionId, currentURL, classListName, router)
                        }}
                    >skip
                    </button>
                </div>
            )
        } else {
            return ''
        }
    }

    if (loadState) {
        return (
            <div>
                <h1 className="fw-bold">{testJson.name}</h1>
                <img src={testJson.imageURL} className="test-question-img mt-5" />
                <p className="text-secondary">by : {testJson.userName}</p>
                <p className="fw-bold fs-4 mt-2">{testJson.des}</p>
                <p className="display-6 fw-bold text-danger">{answerPreview}</p>
                <Answer setAnswer={setAnswer} />
                {renderButton()}
                {renderClean()}
            </div>
        )
    } else {
        return ''
    }
}

export { getMyTestList, getTheTestClass, getTheQuestionId, getQuestion, renderNext, renderFunction }
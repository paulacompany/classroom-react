import React from "react";
import { tify } from "chinese-conv";
import { subjectText, doingText, bookText } from "../../common/global/resouces.js"
import useEditorFunction from "../../common/private/useEditorFunction";
import { useSelector } from "react-redux";

export default function Content() {

    let pages = useSelector(state => state.editor.pages)
    let des = useSelector(state => state.editor.des)
    let password = useSelector(state => state.editor.password)

    const FunctionBase = useEditorFunction()

    let {
        addSubject,
        addBook,
        addDoing,
        addDate,
        addDes,
        addPassword,
        addPages,
        sendDataBase 
    } = new FunctionBase()

    return (
        <>
            <div>
                <p className="d-block h2 m-3">科目:</p>
                <div className="d-flex flex-row flex-wrap">
                    {
                        subjectText.map(item => {
                            return (
                                <button
                                    className="btn btn-primary m-2"
                                    onClick={
                                        () => addSubject(item)
                                    }>
                                    {item}
                                </button>
                            )
                        })
                    }
                </div>
            </div>
            <div>
                <p className="d-block h2 m-3">動作: </p>
                <div className="d-flex flex-row flex-wrap">
                    {
                        doingText.map((item) => {
                            return (
                                <button
                                    className="btn btn-dark m-2 text-white"
                                    onClick={() => {
                                        addDoing(item)
                                    }}>
                                    {item}
                                </button>
                            )

                        })
                    }
                </div>
            </div>
            <div>
                <p className="d-block h2 m-3">書:</p>
                <div className="d-flex flex-row flex-wrap">
                    {
                        bookText.map(item => {
                            return (
                                <button
                                    className="btn btn-primary m-2"
                                    onClick={() => {
                                        addBook(item)
                                    }}>
                                    {item}
                                </button>
                            )
                        })
                    }
                </div>
            </div>
            <div>
                <p className="d-block h2 m-3">日期:</p>
                <input
                    type={'date'}
                    className="m-4 form-control"
                    onChange={e => addDate(e.target.value)}
                />
            </div>
            <div>
                <p className="d-block h2 m-3">頁數:</p>
                <input
                    type={'text'}
                    className="m-4 form-control"
                    placeholder="p.1 - p.5"
                    onChange={e => addPages(tify(e.target.value))}
                    value={pages} />
            </div>
            <div>
                <p className="d-block h2 m-3">補充:</p>
                <textarea
                    className="m-4 p-2 form-control"
                    placeholder="記得要帶"
                    onChange={e => addDes(tify(e.target.value))}
                />
            </div>
            <div>
                <p className="d-block h2 m-3">密碼:</p>
                <input
                    type={'password'}
                    className="m-4 form-control"
                    placeholder="password"
                    onChange={e => addPassword(e.target.value)}
                    value={password}
                />
            </div>
            <div>
                <button
                    className="btn btn-warning btn-lg m-4"
                    onClick={sendDataBase}
                >
                    送出
                </button>
            </div>
        </>
    )
}
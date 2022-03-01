import Link from "next/link";
import React from "react";

export default function Footer() {

    return (
        <>
            <footer className="bg-dark text-white w-100 d-flex flex-row align-items-center p-3 flex-wrap">
                <div className="d-flex flex-column align-items-center col">
                    <p className="text-light m-2 h3">Author</p>
                    <div className="m-0">
                        <p className="d-inline h6">Fish: </p>
                        <a href="mailto:uiuxweb0857@gmail.com" className="text-secondary d-inline h6">uiuxweb0857@gmail.com</a>
                        <p className="text-secondary h6">一UI UX</p>
                    </div>
                    <div className="m-0">
                        <p className="d-inline h6">Paul: </p>
                        <a href="mailto:letterpaulsand@gmail.com" className="text-secondary d-inline h6">letterpaulsand@gmail.com</a>
                        <p className="text-secondary h6">一front end</p>
                    </div>
                    <div className="m-0">
                        <p className="d-inline h6">Sam: </p>
                        <a href="mailto:sam0512@gmail.com" className="text-secondary d-inline h6">sam0512@gmail.com</a>
                        <p className="text-secondary h6">一back end</p>
                    </div>
                    <div className="m-0">
                        <p className="d-inline h6">Eric: </p>
                        <a href="mailto:eric09580245@gmail.com" className="text-secondary d-inline h6">eric09580245@gmail.com</a>
                        <p className="text-secondary h6">一DevOp</p>
                    </div>
                </div>
                <div className="d-flex flex-column align-items-center col">
                    <p className="text-light m-1 h3">Contact</p>
                    <div className="m-1">
                        <p className="d-inline h6">Email: </p>
                        <a href="mailto:letterpaulsand@gmail.com" className="text-secondary d-inline h6">letterpaulsand@gmail.com</a>
                    </div>
                    <div className="m-1">
                        <p className="d-inline h6">Line: </p>
                        <a href="https://google.com" className="text-secondary d-inline h6">@robot0609</a>
                    </div>
                    <div className="m-1">
                        <p className="d-inline h6">Twiter: </p>
                        <a href="https://google.com" className="text-secondary d-inline h6">@letterpaulweb</a>
                    </div>
                    <div className="m-1">
                        <p className="d-inline h6">Github: </p>
                        <a href="https://google.com" className="text-secondary d-inline h6">@letterpaulsand</a>
                    </div>
                    <div className="m-1">
                        <p className="d-inline h6">Gitlab: </p>
                        <a href="https://google.com" className="text-secondary d-inline h6">@letterpaulsand</a>
                    </div>
                </div>
                <div className="d-flex flex-column align-items-center col">
                    <p className="text-light m-2 h3">Help</p>
                    <div className="m-1">
                        <p className="d-inline h6">Email: </p>
                        <a href="mailto:letterpaulsand@gmail.com" className="text-secondary d-inline h6">letterpaulsand@gmail.com</a>
                    </div>
                    <div className="m-1">
                        <p className="d-inline h6">Line: </p>
                        <a href="https://google.com" className="text-secondary d-inline h6">@robot0609</a>
                    </div>
                    <div className="m-1">
                        <p className="d-inline h6">Twiter: </p>
                        <a href="https://google.com" className="text-secondary d-inline h6">@letterpaulweb</a>
                    </div>
                    <div className="m-1">
                        <p className="d-inline h6">Github: </p>
                        <a href="https://google.com" className="text-secondary d-inline h6">@letterpaulsand</a>
                    </div>
                    <div className="m-1">
                        <p className="d-inline h6">Gitlab: </p>
                        <a href="https://google.com" className="text-secondary d-inline h6">@letterpaulsand</a>
                    </div>
                </div>
                <div className="d-flex flex-column align-items-center col">
                    <p className="text-light m-2 h3">Service</p>
                    <div className="m-1">
                        <p className="d-inline h6">Editor: </p>
                        <p className="text-secondary d-inline h6">Write down everything in anywhere.</p>
                    </div>
                    <div className="m-1">
                        <p className="d-inline h6">Look: </p>
                        <p className="text-secondary d-inline h6">You can see what you write down.</p>
                    </div>
                    <div className="m-1">
                        <p className="d-inline h6">Setting: </p>
                        <p className="text-secondary d-inline h6">Login and write down the words.</p>
                    </div>
                    <div className="m-1">
                        <p className="d-inline h6">About: </p>
                        <p className="text-secondary d-inline h6">See the history about us.</p>
                    </div>
                    <div className="m-1">
                        <p className="d-inline h6">Index: </p>
                        <p className="text-secondary d-inline h6">See the beautiful Home page.</p>
                    </div>
                </div>
                <div className="d-flex flex-column align-items-center col">
                    <p className="text-light m-2 h3">Address</p>
                    <div className="m-1">
                        <p className="d-inline h6">台灣 台北市信義區福德路四段50號</p>
                    </div>
                    <div className="m-1">
                        <p className="d-inline h6">未註冊</p>
                    </div>
                    <div className="m-1">
                        <p className="d-inline h6">未註冊</p>
                    </div>
                    <div className="m-1">
                        <p className="d-inline h6">未註冊</p>
                    </div>
                </div>

            </footer>
            <main className="w-100 bg-secondary d-flex justify-content-center align-items-center">
                <p className="m-3 h5 text-white">Classroom 2022 TW</p>
            </main>
        </>
    )
}
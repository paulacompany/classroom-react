import React from "react";

export default function Ckeckload({ loadState }) {

    if (loadState) {
        return ''
    } else {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border spinner-border-lg" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

}
import React from "react";

const Spinner = ({ admin }) => {
    return (
        <div id="preloader">
            <span className={`loader ${admin ? "loader--admin" : ""}`}></span>
        </div>
    );
};

export default Spinner;

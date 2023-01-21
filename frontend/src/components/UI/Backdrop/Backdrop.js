import React from 'react';

const Backdrop = ({show, clicked}) => {
    return show ? <div className="backdrop" onClick={clicked} /> : null;
};

export default Backdrop;
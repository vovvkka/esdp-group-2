import React from 'react';
import {
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton, VKIcon, VKShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from "react-share";

const Share = ({url}) => {
    return (
        <div className='share'>
            <p>Поделитесь с друзьями:</p>
            <WhatsappShareButton url={url}>
                <WhatsappIcon round={true} size={35}/>
            </WhatsappShareButton>
            <TelegramShareButton url={url}>
                <TelegramIcon round={true} size={35}/>
            </TelegramShareButton>
            <TwitterShareButton url={url}>
                <TwitterIcon round={true} size={35}/>
            </TwitterShareButton>
            <VKShareButton url={url}>
                <VKIcon round={true} size={35}/>
            </VKShareButton>
        </div>
    );
};

export default Share;
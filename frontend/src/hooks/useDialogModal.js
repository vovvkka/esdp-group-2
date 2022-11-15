import React, {useCallback, useState} from 'react';

const UseDialogModal = (Component) => {
    const [open, setOpen] = useState(false);

    const openDialog = useCallback(() => {
        setOpen(true);
    }, []);

    const DialogComponent = useCallback(
        ({...props}) => {
            if (!open) return null;

            if (Component) {
                return (
                    <Component open={open} onClose={() => setOpen(false)} {...props} />
                );
            }
        },
        [open, Component]
    );

    return [DialogComponent, openDialog];
};

export default UseDialogModal;
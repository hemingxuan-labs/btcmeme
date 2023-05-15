import * as React from 'react'
import Snackbar from '@mui/material/Snackbar'

export const SimpleSnackbarRef = React.createRef()
export default function SimpleSnackbar() {
    const [state, setState] = React.useState({
        open: false,
        message: 'message',
    })
    const { message, open } = state
    const handleClick = (newState) => {
        setState({ ...newState, open: true })
        console.log(state, 'statestate')
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setState({ ...state, open: false })
    }
    return (
        <React.Fragment>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                message={message}
                key={message}
            />
        </React.Fragment>
    )
}

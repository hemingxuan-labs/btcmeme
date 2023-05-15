import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Snackbar from '@/components/sbackbar'
const AppBox = styled.div`
    background-color: #09090b;
    min-height: calc(100vh);
`
function App() {
    const [open, setOpen] = React.useState(false)
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }
    return (
        <AppBox>
            <Snackbar />
            <Header></Header>
            <Outlet />
            <Footer></Footer>
        </AppBox>
    )
}

export default App

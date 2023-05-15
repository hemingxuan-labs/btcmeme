import * as React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import home15 from '@/assets/image/home15.png'
import './index.scss'
import { MyButton } from '@/assets/mui-css/mui-css.js'
import web3Wallet from '@/utils/web3-wallet.js'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Drawer from '@mui/material/Drawer'

const MySnackbar = styled(Snackbar)`
    .MuiSnackbarContent-message {
        color: #f7931c !important;
    }
`
export default function PrimarySearchAppBar() {
    const navigate = useNavigate()
    const web3WalletNow = new web3Wallet()
    const menuList = [
        {
            title: 'AirDrop',
            path: 'mint'
        },
        {
            title: 'About',
            path: 'about'
        },
        {
            title: 'Economics',
            path: 'economics'
        },
        {
            title: 'Staking',
            path: '/staking'
        }
    ]
    const walletAddress = useSelector((state) => state.wallet.walletAddress)
    const showWalletAddress = useSelector((state) => state.wallet.showWalletAddress)
    const scrollToAnchor = (anchorName) => {
        if (anchorName) {
            let anchorElement = document.getElementById(anchorName)
            if (anchorElement) {
                anchorElement.scrollIntoView()
            }
        }
    }
    const [openSnackbar, setOpenSnackbar] = React.useState(false)
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpenSnackbar(false)
    }
    const [opentTggleDrawer, setOpentTggleDrawer] = React.useState(false)
    const toggleDrawer = () => {
        setOpentTggleDrawer(false)
    }
    const action = (
        <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )
    return (
        <div>
            <MySnackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                open={openSnackbar}
                autoHideDuration={2500}
                onClose={handleClose}
                message="Coming Soon"
                action={action}
            />
            <React.Fragment>
                <Drawer
                    anchor="left"
                    open={opentTggleDrawer}
                    onClose={() => {
                        toggleDrawer()
                    }}>
                    <div
                        className="px-4 pt-5"
                        style={{ width: 220, height: '100%', backgroundColor: '#09090b' }}>
                        {menuList.map((item) => {
                            return (
                                <div
                                    key={item.title}
                                    className="header-item text-nowrap py-3"
                                    style={{ color: '#fff' }}
                                    onClick={() => {
                                        toggleDrawer()
                                        if (item.path === '/staking') {
                                            setOpenSnackbar(true)
                                            return
                                        }
                                        scrollToAnchor(item.path)
                                    }}>
                                    {item.title}
                                </div>
                            )
                        })}
                    </div>
                </Drawer>
            </React.Fragment>
            <header className="header-box webkit-scrollbar-none pb-0">
                <div className="logo-box d-flex-center">
                    <img
                        className="me-4"
                        src={home15}
                        style={{
                            width: 44
                        }}
                        alt=""
                    />
                    <span className="d-none d-md-block text-white" style={{ color: '#fffff' }}>
                        BTCMEME
                    </span>
                    <div
                        className="d-block d-md-none me-3"
                        onClick={() => {
                            setOpentTggleDrawer(true)
                        }}>
                        <svg
                            t="1684145061413"
                            className="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="6944"
                            width="32"
                            height="32">
                            <path
                                d="M133.310936 296.552327l757.206115 0c19.781623 0 35.950949-16.169326 35.950949-35.950949 0-19.781623-15.997312-35.950949-35.950949-35.950949L133.310936 224.650428c-19.781623 0-35.950949 16.169326-35.950949 35.950949C97.359987 280.383 113.529313 296.552327 133.310936 296.552327z"
                                fill="#fff"
                                p-id="6945"></path>
                            <path
                                d="M890.51705 476.135058 133.310936 476.135058c-19.781623 0-35.950949 16.169326-35.950949 35.950949 0 19.781623 16.169326 35.950949 35.950949 35.950949l757.206115 0c19.781623 0 35.950949-16.169326 35.950949-35.950949C926.467999 492.304384 910.298673 476.135058 890.51705 476.135058z"
                                fill="#fff"
                                p-id="6946"></path>
                            <path
                                d="M890.51705 727.447673 133.310936 727.447673c-19.781623 0-35.950949 15.997312-35.950949 35.950949s16.169326 35.950949 35.950949 35.950949l757.206115 0c19.781623 0 35.950949-15.997312 35.950949-35.950949S910.298673 727.447673 890.51705 727.447673z"
                                fill="#fff"
                                p-id="6947"></path>
                        </svg>
                    </div>
                </div>

                <div className="header-item-box d-none d-md-flex">
                    {menuList.map((item) => {
                        return (
                            <div
                                key={item.title}
                                className="header-item text-nowrap"
                                onClick={() => {
                                    if (item.path === '/staking') {
                                        setOpenSnackbar(true)
                                        return
                                    }
                                    scrollToAnchor(item.path)
                                }}>
                                {item.title}
                            </div>
                        )
                    })}
                </div>
                <div className="header-button">
                    {!walletAddress ? (
                        <MyButton
                            className="text-nowrap px-3"
                            onClick={() => {
                                web3WalletNow.requestSignature()
                            }}>
                            Connect Wallet
                        </MyButton>
                    ) : (
                        <div className="text-white">{showWalletAddress}</div>
                    )}
                </div>
            </header>
        </div>
    )
}

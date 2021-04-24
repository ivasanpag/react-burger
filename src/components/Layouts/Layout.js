import React, {useState} from 'react';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import styles from './Layout.module.css'

const Layout = (props) => {

    const [showSideDrawer, setSideDrawer] = useState(false)

    const sideDrawerClosedHandler = () => {
        console.log('[Layout.js] sideDrawerClosedHandler')
        setSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        console.log('[Layout.js] sideDrawerToggleHandler')
        setSideDrawer(!showSideDrawer);
    }

    return (
    <React.Fragment>
        <Toolbar drawerToggleClicked={sideDrawerToggleHandler} />
        <SideDrawer
                    open={showSideDrawer}
                    closed={sideDrawerClosedHandler} />
        <main className={styles.Content}>
            {props.children}
        </main>
    </React.Fragment>
    )
}

export default Layout;
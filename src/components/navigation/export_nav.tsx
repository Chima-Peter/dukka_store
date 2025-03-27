import DesktopNav from './desktop_nav'
import NavigationProvider from '../../context/navigation_context'
import MobileBottomNav from './mobile_bottom_nav'
import MobileTopNav from './mobile_top_nav'


interface PropTypes { 
  userLocation: string 
  flag: string
  currency: string
  language: string
}

const ExportNav = ({ userLocation, flag, currency, language }: PropTypes) => {
  return (
    <NavigationProvider>
        <MobileTopNav userLocation={userLocation} />
        <MobileBottomNav />
        <DesktopNav userLocation={userLocation} currency={currency} flag={flag} language={language} />
    </NavigationProvider>
  )
}

export default ExportNav
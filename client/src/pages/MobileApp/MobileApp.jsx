import './MobileApp.css'
import DownloadImage from '../../assets/appDownload.svg'
const MobileApp = () => {
  return (
    <div className="mobile-app">
      <h2>Mobile App Coming Soon!</h2>
      <div className="mobile-download">
        <img src={DownloadImage} alt="" />
      </div>
    </div>
  )
}

export default MobileApp

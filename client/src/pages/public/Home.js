import { Button } from 'rsuite'
import bgVideo from '../../assets/bg.gif'

const Home = ({ handleScroll }) => {
  return (
    <div className="hero">
      <div className="cover">
        <div className="banner-logo">
          <img
            src="https://d2zapy0kvendcq.cloudfront.net/assets/logo.png"
            alt=""
          />
          <Button
            appearance="primary"
            size="lg"
            onClick={() => handleScroll('/gallery')}
          >
            Gallery
          </Button>
        </div>
      </div>
      <div className="banner-wrapper">
        <img alt="" src={bgVideo} />
      </div>
    </div>
  )
}

export default Home

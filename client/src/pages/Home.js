import { Button } from 'rsuite'
import bgVideo from '../assets/bg.mp4'

const Home = () => {
  return (
    <div style={{ height: '100vh', width: '100%', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          height: '100vh',
          width: '100%',
          backgroundColor: 'rgba(255,255,255,0.3)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{ textAlign: 'center', width: '20%' }}>
          <img
            src="https://d2zapy0kvendcq.cloudfront.net/assets/logo.png"
            style={{ maxWidth: '50%', margin: 'auto' }}
          />
          <Button color="blue" size="lg" style={{ width: '100%' }}>
            Gallery
          </Button>
        </div>
      </div>
      <video
        src={bgVideo}
        autoPlay
        loop
        controls={false}
        style={{ objectFit: 'cover' }}
      />
    </div>
  )
}

export default Home

import { Icon, Footer as FooterContent } from 'rsuite'
import { Grid } from 'semantic-ui-react'

const Footer = ({ toggleModal }) => {
  return (
    <FooterContent>
      <Grid columns={3} padded relaxed stackable>
        <Grid.Column verticalAlign="middle">
          <div className="icon-wrapper">
            <a
              className="anchor-social-link"
              href="https://www.instagram.com/emilymperes_design/"
              rel="noopener noreferrer"
              target="__blank"
            >
              <div>
                <Icon icon="instagram" size="2x" />
              </div>
              <div>Instagram</div>
            </a>
            <a
              className="anchor-social-link"
              href="https://www.linkedin.com/in/emily-peres-8a04b7188/"
              rel="noopener noreferrer"
              target="__blank"
            >
              <div>
                <Icon icon="linkedin-square" size="2x" />
              </div>
              <div>Linked In</div>
            </a>
          </div>
        </Grid.Column>
        <Grid.Column textAlign="center" verticalAlign="bottom">
          <p>Copyright &copy; 2020 Emily Peres</p>
        </Grid.Column>
        <Grid.Column textAlign="right">
          <div className="policy-links">
            <a onClick={() => toggleModal(true)}>Privacy Policy</a>
          </div>
        </Grid.Column>
      </Grid>
    </FooterContent>
  )
}

export default Footer

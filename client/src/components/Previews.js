import { Grid } from 'semantic-ui-react'

const Previews = ({ assets, files }) => {
  let images = []
  if (files.length) {
    images = files.map((f) => URL.createObjectURL(f))
  }
  const previews = [...assets, ...images]
  return (
    <Grid columns={4} stackable padded>
      {previews.map((i) => {
        let src = typeof i === 'string' ? i : i.metadata.src
        return (
          <Grid.Column>
            <img src={src} style={{ width: '100%' }} />
          </Grid.Column>
        )
      })}
    </Grid>
  )
}

export default Previews
